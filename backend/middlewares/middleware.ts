
import { Request, Response, NextFunction } from 'express';
import prisma from '../models/prismaclient';
import { jwtDecrypt } from "jose";
import hkdf from '@panva/hkdf';

const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET || '';

async function getDerivedEncryptionKey(keyMaterial: string, salt: string) {
  return await hkdf(
    "sha256",
    keyMaterial,
    salt,
    `NextAuth.js Generated Encryption Key${salt ? ` (${salt})` : ""}`,
    32
  );
}

async function decryptToken(token: string, secret: string) {
  const encryptionKey = await getDerivedEncryptionKey(secret, "");
  const { payload } = await jwtDecrypt(token, encryptionKey);
  return payload;
}

const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const sessionToken = req.headers['session-token'] as string; 
  console.log('Session Token:', sessionToken);

  if (!sessionToken) {
    console.error('No token provided in headers:', req.headers);
    res.status(401).json({ message: 'Unauthorized: No token provided' });
    return; 
  }

  try {
    const result = await decryptToken(sessionToken, NEXTAUTH_SECRET);

    const { email, name, picture } = result as { email?: string; name?: string; picture?: string };

    if (email) {
      let user = await prisma.user.findUnique({
        where: { email },
      });

      if (user) {
        console.log("User found:", user);
      }

      if (!user) {
        user = await prisma.user.create({
          data: {
            email,
            name,
            image: picture,
          },
        });
        console.log("User created successfully");
      }

      //@ts-ignore
      req.user = {
        id: user.id,
        email: user.email || "",
        name: user.name || "",
        picture: user.image || "",
      };

      next();
    } else {
      res.status(401).json({ message: 'Unauthorized: No email in token payload' });
      return;
    }
  } catch (error) {
    console.error('Token decryption error:', error);
    res.status(401).json({ message: 'Unauthorized: Invalid token' });
    return;
  }
};

export default authMiddleware;
