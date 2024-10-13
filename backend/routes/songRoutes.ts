import { Router } from 'express';
import { addSongToPlaylist, searchSongs } from '../controllers/songcontroller';

const router = Router();
// Use the route handlers
router.get('/search',searchSongs)
router.post('/addsongtoplaylist' , addSongToPlaylist)

export default router;
