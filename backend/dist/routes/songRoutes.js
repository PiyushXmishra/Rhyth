"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const songcontroller_1 = require("../controllers/songcontroller");
const router = (0, express_1.Router)();
// Use the route handlers
router.get('/search', songcontroller_1.searchSongs);
router.post('/addsongtoplaylist', songcontroller_1.addSongToPlaylist);
exports.default = router;
