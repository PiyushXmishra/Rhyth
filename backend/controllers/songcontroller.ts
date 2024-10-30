// controllers/songController.ts
import { Request, Response } from 'express';
import prisma from '../models/prismaclient';
import axios from 'axios';
import { decode } from "html-entities";

import redisClient from '../redis/redisclient';

export const addSongToPlaylist = async (req: Request<{ playlistId: string }>, res: Response):Promise<any> => {
  const playlistId: string = req.params.playlistId;
  const { videoId }: { videoId: string } = req.body; // Get the videoId from the request body

  try {
      // Get the user ID from the request (assuming you are using some authentication middleware)
      //@ts-ignore
      const userId = req.user?.id; // Modify this line according to how you are retrieving the user ID

      // Find the playlist that belongs to the user
      const playlist = await prisma.playlist.findUnique({
          where: {
              id: playlistId, // Convert playlistId to a number
          },
      });

      // Check if the playlist exists and belongs to the user
      if (!playlist || playlist.userId !== userId) {
          return res.status(404).json({ message: 'Playlist not found or does not belong to the user.' });
      }

      // Check if the song already exists
      const existingSong = await prisma.song.findUnique({
          where: {
              videoId: videoId, // Check if the song exists by videoId
          },
      });

      let songId: number;

      if (existingSong) {
          songId = existingSong.id; // If the song exists, get its ID
      } else {
          // If the song does not exist, create it
          const newSong = await prisma.song.create({
              data: {
                  videoId: videoId,
              },
          });
          songId = newSong.id; // Get the new song's ID
      }

      // Add the song to the playlist
      await prisma.playlist.update({
          where: {
              id: playlistId,
          },
          data: {
              songs: {
                  connect: { id: songId }, // Connect the song to the playlist
              },
          },
      });

      const cacheKey = `UserPlaylist:${playlistId}`;
      try {
          await redisClient.del(cacheKey); // Attempt to delete cache key
      } catch (cacheError) {
          console.warn(`Warning: Could not invalidate cache for key ${cacheKey}:`, cacheError);
      }


      return res.status(200).json({ message: 'Song added to playlist successfully.' });
      
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
  }
};




export const deleteSongFromPlaylist = async (req: Request<{ playlistId: string }>, res: Response):Promise<any> => {
  const playlistId: string = req.params.playlistId;
  const { videoId }: { videoId: string } = req.body; // Get the videoId from the request body

  try {
      // Get the user ID from the request (assuming you are using some authentication middleware)
//@ts-ignore
      const userId = req.user?.id; // Modify this line according to how you are retrieving the user ID

      // Find the playlist that belongs to the user
      const playlist = await prisma.playlist.findUnique({
          where: {
              id: playlistId, // Convert playlistId to a number
          },
      });

      // Check if the playlist exists and belongs to the user
      if (!playlist || playlist.userId !== userId) {
          return res.status(404).json({ message: 'Playlist not found or does not belong to the user.' });
      }

      // Check if the song exists in the playlist
      const song = await prisma.song.findUnique({
          where: {
              videoId: videoId, // Check if the song exists by videoId
          },
      });

      if (!song) {
          return res.status(404).json({ message: 'Song not found.' });
      }

      // Remove the song from the playlist
      await prisma.playlist.update({
          where: {
              id: playlistId
          },
          data: {
              songs: {
                  disconnect: { id: song.id }, // Disconnect the song from the playlist
              },
          },
      });
      
      const cacheKey = `UserPlaylist:${playlistId}`;
      try {
          await redisClient.del(cacheKey); // Attempt to delete cache key
      } catch (cacheError) {
          console.warn(`Warning: Could not invalidate cache for key ${cacheKey}:`, cacheError);
      }


      return res.status(200).json({ message: 'Song removed from playlist successfully.' });
      
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
  }
};





export const searchSongs = async (req: Request, res: Response): Promise<any> => {
    console.log(req.query);
    const { query } = req.query;
  
    // Check Redis cache for search results
    const cachedResults = await redisClient.get(query as string);
  
    if (cachedResults) {
      console.log("Returning cached results");
      return res.json(JSON.parse(cachedResults));
    }
  
    try {
      // Fetch from YouTube API if not in cache
      const response = await axios.get("https://www.googleapis.com/youtube/v3/search", {
        params: {
          part: "snippet",
          q: query,
          type: "video",
          maxResults: 10,
          key: process.env.YOUTUBE_API_KEY,
        },
      });
  
      // Decode HTML entities in the titles
      const decodedItems = response.data.items.map((item: any) => ({
        ...item,
        snippet: {
          ...item.snippet,
          title: decode(item.snippet.title), // Decode title
        },
      }));
  
      // Cache the decoded results in Redis
      await redisClient.set(query as string, JSON.stringify(decodedItems), "EX", 86400);
  
      res.json(decodedItems);
    } catch (error) {
        //@ts-ignore
      res.status(500).json({ error: error.message });
    }
  };
  