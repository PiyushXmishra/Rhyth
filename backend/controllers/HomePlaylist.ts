import { Request, Response } from 'express';
import { fetchPlaylistInfo } from './fetchPlaylistInfo';
import redisClient from '../redis/redisclient';

export const HomePlaylists = async (req: Request, res: Response) => {
        const playlistIds: string[] = req.body.playlistIds;
        const playlists: Array<{ id: string; name: string; thumbnails: any }> = [];
    
        for (const playlistId of playlistIds) {
            // Check Redis for playlist info
            const cachedPlaylist = await redisClient.get(`playlist:${playlistId}`);
            if (cachedPlaylist) {
                playlists.push(JSON.parse(cachedPlaylist));
            } else {
                // Fetch from YouTube API
                const playlistInfo = await fetchPlaylistInfo(playlistId);
                const playlist = { id: playlistId, name: playlistInfo.title, thumbnails: playlistInfo.thumbnails };
                playlists.push(playlist);
    
                // Store in Redis
                await redisClient.set(`playlist:${playlistId}`, JSON.stringify(playlist), 'EX', 86400); // Cache for 1 day
            }
        }
    
        res.json(playlists);
    };
