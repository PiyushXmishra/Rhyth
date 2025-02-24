import { Router  } from 'express';
import { addSongToPlaylist, searchSongs } from '../controllers/songcontroller';
import { SongsOfPlaylist } from '../controllers/SongsOfPlaylist';

const router = Router();
router.get('/search',searchSongs)
router.get('/:playlistId', SongsOfPlaylist )
export default router;
