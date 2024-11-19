import { Router } from 'express';
import { searchSongs } from '../controllers/songcontroller';
import {getHistory , UpdateHistory} from  "../controllers/usercontroller"
const router = Router();

// Use the route handlers
router.post("/gethistory", getHistory)
router.post("/updatehistory", UpdateHistory)

export default router;
