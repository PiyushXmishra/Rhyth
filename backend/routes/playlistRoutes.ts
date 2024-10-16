// routes/playlistRoutes.ts
import { Router } from 'express';
import { createPlaylist, getUserPlaylists } from '../controllers/playlistcontroller';
import { HomePlaylists } from '../controllers/HomePlaylist';

const router = Router();

router.post('/homeplaylists', HomePlaylists)
router.post('/', createPlaylist);
router.get('/:userId', getUserPlaylists);

export default router;
