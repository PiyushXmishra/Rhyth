import { Router } from 'express';
import { searchSongs } from '../controllers/songcontroller';
import {getHistory , UpdateHistory} from  "../controllers/usercontroller"
import authMiddleware from '../middlewares/middleware';
const router = Router();

// Use the route handlers
router.post("/gethistory", authMiddleware, getHistory)
router.post("/updatehistory", authMiddleware , UpdateHistory)

export default router;
