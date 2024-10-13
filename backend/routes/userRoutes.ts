import { Router } from 'express';
import { registerUser, loginUser } from '../controllers/usercontroller';
import { searchSongs } from '../controllers/songcontroller';

const router = Router();

// Use the route handlers
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/search', searchSongs);

export default router;
