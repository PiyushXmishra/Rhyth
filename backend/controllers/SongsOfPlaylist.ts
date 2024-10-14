import { Request, Response } from 'express';
import redisClient from "../redis/redisclient";
import { fetchSongsFromPlaylist } from "./fetchSongFromPlaylist";

export const SongsOfPlaylist = async (req: Request<{ playlistId: string }>, res: Response) :Promise<any>=> {

    const playlistId: string = req.params.playlistId;

    // Check Redis for songs
    const cachedSongs = await redisClient.get(`playlist:${playlistId}:songs`);
    if (cachedSongs) {
        return res.json(JSON.parse(cachedSongs));
    }

    // Fetch songs from YouTube API
    const songs = await fetchSongsFromPlaylist(playlistId);

    // Store songs in Redis
    await redisClient.set(`playlist:${playlistId}:songs`, JSON.stringify(songs), 'EX', 86400); // Cache for 1 day

    res.json(songs);
};
