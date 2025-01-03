import { Request, Response } from 'express';
import { fetchPlaylistInfo } from './fetchPlaylistInfo';
import redisClient from '../redis/redisclient';

export const HomePlaylists = async (req: Request, res: Response) => {
        const playlistIds: string[] = req.body.playlistIds;
        const playlists: Array<{ id: string; name: string; thumbnails: any }> = [];
    
        for (const playlistId of playlistIds) {
            const cachedPlaylist = await redisClient.get(`playlist:${playlistId}`);
            if (cachedPlaylist) {
                console.log("returning cached tracks")
                playlists.push(JSON.parse(cachedPlaylist));
            } else {
                const playlistInfo = await fetchPlaylistInfo(playlistId);
                const playlist = { id: playlistId, name: playlistInfo.title, thumbnails: playlistInfo.thumbnails };
                playlists.push(playlist);
    
                await redisClient.set(`playlist:${playlistId}`, JSON.stringify(playlist), 'EX', 3600); 
            }
        }
        res.json(playlists);
    };
