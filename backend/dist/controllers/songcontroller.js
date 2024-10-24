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
const redisclient_1 = __importDefault(require("../redis/redisclient"));
// Add Song to Playlist
const addSongToPlaylist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { playlistIds, videoId, title, thumbnail } = req.body; // Accepting an array of playlist IDs
    // First, check if the song already exists
    let song = yield prismaclient_1.default.song.findUnique({
        where: { videoId },
    });
    // If the song does not exist, create it
    if (!song) {
        song = yield prismaclient_1.default.song.create({
            data: {
                videoId,
                title,
                thumbnail,
            },
        });
    }
    // Connect the song to each specified playlist
    const updatePlaylistPromises = playlistIds.map((playlistId) => prismaclient_1.default.playlist.update({
        where: { id: playlistId },
        data: {
            songs: {
                //@ts-ignore
                connect: { id: song.id }, // Connect the song to the playlist
            },
        },
    }));
    // Wait for all the updates to finish
    yield Promise.all(updatePlaylistPromises);
    res.status(201).json(song); // Return the song object
});
exports.addSongToPlaylist = addSongToPlaylist;
const searchSongs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.query);
    const { query } = req.query; // Destructure the 'query' parameter
    // Check Redis cache for search results
    const cachedResults = yield redisclient_1.default.get(query); // Cast query to string
    if (cachedResults) {
        // If cache exists, return cached results
        console.log('Returning cached results');
        return res.json(JSON.parse(cachedResults));
    }
    try {
        // If not in cache, fetch from YouTube API
        const response = yield axios_1.default.get("https://www.googleapis.com/youtube/v3/search", {
            params: {
                part: 'snippet',
                q: query,
                type: 'video',
                maxResults: 10,
                key: process.env.YOUTUBE_API_KEY,
            },
        });
        // Cache the results in Redis with an expiration time of one day (86400 seconds)
        yield redisclient_1.default.set(query, JSON.stringify(response.data.items), 'EX', 86400);
        res.json(response.data.items);
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
exports.searchSongs = searchSongs;
