"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// routes/playlistRoutes.ts
const express_1 = require("express");
const playlistcontroller_1 = require("../controllers/playlistcontroller");
const router = (0, express_1.Router)();
router.post('/', playlistcontroller_1.createPlaylist);
router.get('/:userId', playlistcontroller_1.getUserPlaylists);
exports.default = router;
