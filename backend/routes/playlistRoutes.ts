// routes/playlistRoutes.ts
import { Router } from 'express';
import { createPlaylist, getUserPlaylists } from '../controllers/playlistcontroller';
import { HomePlaylists } from '../controllers/HomePlaylist';
import authMiddleware from '../middlewares/middleware';
import {createUser } from "../controllers/createUser";
import { getSongsOfUserPlaylist } from '../controllers/getSongsOfUserPlaylist';
import { addSongToPlaylist, deleteSongFromPlaylist } from '../controllers/songcontroller';
import cookieParser from 'cookie-parser';
const router = Router();
router.use(cookieParser());
router.post('/homeplaylists', HomePlaylists)
router.post('/createuser', authMiddleware , createUser)
router.post('/createplaylist', authMiddleware, createPlaylist);
router.get('/getplaylist',authMiddleware, getUserPlaylists);
router.post('/getsongsofuserplaylist/:playlistId',authMiddleware , getSongsOfUserPlaylist)
router.post('/addsongtoplaylist/:playlistId' , authMiddleware , addSongToPlaylist)
router.post('/deletesongfromplaylist/:playlistId', authMiddleware,deleteSongFromPlaylist)
export default router;
