// routes/playlistRoutes.ts
import { Router } from 'express';
import { createPlaylist, getUserPlaylists } from '../controllers/playlistcontroller';

const router = Router();

router.post('/', createPlaylist);
router.get('/:userId', getUserPlaylists);

export default router;
