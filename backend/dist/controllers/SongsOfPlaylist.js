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
exports.SongsOfPlaylist = void 0;
const redisclient_1 = __importDefault(require("../redis/redisclient"));
const fetchSongFromPlaylist_1 = require("./fetchSongFromPlaylist");
const SongsOfPlaylist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const playlistId = req.params.playlistId;
    // Check Redis for songs
    const cachedSongs = yield redisclient_1.default.get(`playlist:${playlistId}:songs`);
    if (cachedSongs) {
        return res.json(JSON.parse(cachedSongs));
    }
    // Fetch songs from YouTube API
    const songs = yield (0, fetchSongFromPlaylist_1.fetchSongsFromPlaylist)(playlistId);
    // Store songs in Redis
    yield redisclient_1.default.set(`playlist:${playlistId}:songs`, JSON.stringify(songs), 'EX', 86400); // Cache for 1 day
    res.json(songs);
});
exports.SongsOfPlaylist = SongsOfPlaylist;
