// controllers/userController.ts
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const registerUser = async (req: Request, res: Response) => {
 
};
export const loginUser = async (req: Request, res: Response): Promise<any> => {
  
};
