// middlewares/authMiddleware.ts

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'; // If you're using it somewhere else, keep it; otherwise, you can remove it
import prisma from '../models/prismaclient';
import { jwtDecrypt } from "jose";
import hkdf from '@panva/hkdf';

const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET || '';

// Derive encryption key for decryption
async function getDerivedEncryptionKey(keyMaterial: string, salt: string) {
  return await hkdf(
    "sha256",
    keyMaterial,
    salt,
    `NextAuth.js Generated Encryption Key${salt ? ` (${salt})` : ""}`,
    32
  );
}

// Decrypt token using derived encryption key
async function decryptToken(token: string, secret: string) {
  const encryptionKey = await getDerivedEncryptionKey(secret, "");
  const { payload } = await jwtDecrypt(token, encryptionKey);
  return payload;
}

// Middleware for user authentication
const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const sessionToken = req.headers['session-token'] as string; // Get the session token from the header
  console.log('Session Token:', sessionToken);

  // Check if token exists
  if (!sessionToken) {
    console.error('No token provided in headers:', req.headers);
    res.status(401).json({ message: 'Unauthorized: No token provided' });
    return; // Stop execution
  }

  try {
    // Decrypt token to extract payload
    const result = await decryptToken(sessionToken, NEXTAUTH_SECRET);

    // Extract user data from payload
    const { email, name, picture } = result as { email?: string; name?: string; picture?: string };

    if (email) {
      // Check if user already exists
      let user = await prisma.user.findUnique({
        where: { email },
      });

      if (user) {
        console.log("User found:", user);
      }

      // Create a new user if not found
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

      // Attach user data to request object
      //@ts-ignore
      req.user = {
        id: user.id,
        email: user.email || "",
        name: user.name || "",
        picture: user.image || "",
      };

      // Continue to next middleware or route
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
