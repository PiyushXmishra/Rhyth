// controllers/userController.ts
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const registerUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  
  try {
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
    res.json(newUser);
  } catch (error) {
    res.status(500).json({ error: "User registration failed." });
  }
};
export const loginUser = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;

  // Fetch user by email
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
      return res.status(404).json({ error: "User not found." });
  }

  // Compare password
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid credentials." });
  }

  // Respond with user data
  return res.json(user);
};
