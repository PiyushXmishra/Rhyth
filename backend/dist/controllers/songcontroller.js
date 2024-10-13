"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchSongs = exports.addSongToPlaylist = void 0;
const prismaclient_1 = __importDefault(require("../models/prismaclient"));
const axios_1 = __importDefault(require("axios"));
// Add Song to Playlist
const addSongToPlaylist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { playlistId, videoId, title, thumbnail } = req.body;
    const song = yield prismaclient_1.default.song.create({
        data: {
            videoId,
            title,
            thumbnail,
            playlists: { connect: { id: playlistId } },
        },
    });
    res.status(201).json(song);
});
exports.addSongToPlaylist = addSongToPlaylist;
const searchSongs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { query } = req.query;
    try {
        const response = yield axios_1.default.get(`https://www.googleapis.com/youtube/v3/search`, {
            params: {
                part: 'snippet',
                q: query,
                type: 'video',
                maxResults: 20,
                key: process.env.YOUTUBE_API_KEY,
            },
        });
        res.json(response.data.items);
    }
    catch (error) {
        res.status(500).json({ error: 'Song search failed' });
    }
});
exports.searchSongs = searchSongs;
