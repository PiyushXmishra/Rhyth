// express.d.ts
import * as express from 'express';
import { User } from '@prisma/client'; // Adjust based on your User model location

declare global {
  namespace Express {
    interface Request {
      user?: any // or whatever structure you have for user
    }
  }
}


declare global {
  namespace Express {
    interface Request {
      user?: any; // or whatever type your user object is
    }
  }
}
