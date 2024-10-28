// express.d.ts
import * as express from 'express';
import { User } from '@prisma/client'; // Adjust based on your User model location

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;         // Ensure this matches your actual user id type
        email: string;      // Ensure this matches your actual email type
        name: string;       // Ensure this matches your actual name type
        picture?: string;   // Optional field
      };
    }
  }
}


