"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const songcontroller_1 = require("../controllers/songcontroller");
const SongsOfPlaylist_1 = require("../controllers/SongsOfPlaylist");
const router = (0, express_1.Router)();
// Use the route handlers
router.get('/search', songcontroller_1.searchSongs);
router.post('/addsongtoplaylist', songcontroller_1.addSongToPlaylist);
router.get('/:playlistId', SongsOfPlaylist_1.SongsOfPlaylist);
exports.default = router;
