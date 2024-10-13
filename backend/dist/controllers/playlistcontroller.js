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
exports.getUserPlaylists = exports.createPlaylist = void 0;
const prismaclient_1 = __importDefault(require("../models/prismaclient"));
// Create Playlist
const createPlaylist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    const userId = req.user.id; // Assuming user ID is stored in req.user after auth
    const playlist = yield prismaclient_1.default.playlist.create({
        data: {
            name,
            user: { connect: { id: userId } },
        },
    });
    res.status(201).json(playlist);
});
exports.createPlaylist = createPlaylist;
// Get User Playlists
const getUserPlaylists = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    const playlists = yield prismaclient_1.default.playlist.findMany({
        where: { userId },
    });
    res.json(playlists);
});
exports.getUserPlaylists = getUserPlaylists;
