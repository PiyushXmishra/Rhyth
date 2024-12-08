import { Request, Response } from 'express';
import prisma from '../models/prismaclient';
import axios from 'axios';
import redisClient from '../redis/redisclient';

export const getSongsOfUserPlaylist = async (req: Request<{ playlistId: string }>, res: Response): Promise<any> => {
    const playlistId: string = req.params.playlistId;

    try {
        //@ts-ignore
        const userId = req.user?.id;

        const cacheKey = `UserPlaylist:${playlistId}`;

        const cachedData = await redisClient.get(cacheKey);
        if (cachedData) {
            return res.json(JSON.parse(cachedData));
        }


        const playlist = await prisma.playlist.findUnique({
            where: { id: playlistId },
            include: { songs: true },
        });

        if (!playlist || playlist.userId !== userId) {
            return res.status(404).json({ message: 'Playlist not found or does not belong to the user.' });
        }

        const songsArray = playlist.songs;

        const detailedSongs = await Promise.all(songsArray.map(async (song) => {
            try {
                const youtubeResponse = await axios.get(
                    `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${song.videoId}&format=json`
                );
                return {
                    videoId: song.videoId,
                    title: youtubeResponse.data.title,
                    thumbnail: youtubeResponse.data.thumbnail_url,
                };
            } catch (youtubeError) {
                console.error('Error fetching video details:', youtubeError);
                return {
                    videoId: song.videoId,
                    title: 'Unknown Title', 
                    thumbnail: 'https://via.placeholder.com/150', 
                };
            }
        }));

        await redisClient.set(cacheKey, JSON.stringify(detailedSongs),"EX" , 3600);

        return res.json(detailedSongs);
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
