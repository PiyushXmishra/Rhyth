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
exports.HomePlaylists = void 0;
const fetchPlaylistInfo_1 = require("./fetchPlaylistInfo");
const redisclient_1 = __importDefault(require("../redis/redisclient"));
const HomePlaylists = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const playlistIds = req.body.playlistIds;
    const playlists = [];
    for (const playlistId of playlistIds) {
        // Check Redis for playlist info
        const cachedPlaylist = yield redisclient_1.default.get(`playlist:${playlistId}`);
        if (cachedPlaylist) {
            console.log("returning cached tracks");
            playlists.push(JSON.parse(cachedPlaylist));
        }
        else {
            // Fetch from YouTube API
            const playlistInfo = yield (0, fetchPlaylistInfo_1.fetchPlaylistInfo)(playlistId);
            const playlist = { id: playlistId, name: playlistInfo.title, thumbnails: playlistInfo.thumbnails };
            playlists.push(playlist);
            // Store in Redis
            yield redisclient_1.default.set(`playlist:${playlistId}`, JSON.stringify(playlist), 'EX', 3600); // Cache for 1 hr
        }
    }
    res.json(playlists);
});
exports.HomePlaylists = HomePlaylists;
