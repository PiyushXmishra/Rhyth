import { Request, Response } from 'express';
import prisma from '../models/prismaclient';
import axios from 'axios';
import { decode } from "html-entities";

import redisClient from '../redis/redisclient';

export const addSongToPlaylist = async (req: Request<{ playlistId: string }>, res: Response):Promise<any> => {
  const playlistId: string = req.params.playlistId;
  const { videoId }: { videoId: string } = req.body; 

  try {
      //@ts-ignore
      const userId = req.user?.id; 

      const playlist = await prisma.playlist.findUnique({
          where: {
              id: playlistId, 
          },
      });

      if (!playlist || playlist.userId !== userId) {
          return res.status(404).json({ message: 'Playlist not found or does not belong to the user.' });
      }

      const existingSong = await prisma.song.findUnique({
          where: {
              videoId: videoId, 
          },
      });

      let songId: number;

      if (existingSong) {
          songId = existingSong.id; 
      } else {
          const newSong = await prisma.song.create({
              data: {
                  videoId: videoId
              },
          });
          songId = newSong.id;
      }

      await prisma.playlist.update({
          where: {
              id: playlistId,
          },
          data: {
              songs: {
                  connect: { id: songId }, 
              },
          },
      });

      const cacheKey = `UserPlaylist:${playlistId}`;
      try {
          await redisClient.del(cacheKey); 
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
  const { videoId }: { videoId: string } = req.body; 
  try {
//@ts-ignore
      const userId = req.user?.id; 

      const playlist = await prisma.playlist.findUnique({
          where: {
              id: playlistId, 
          },
      });

      if (!playlist || playlist.userId !== userId) {
          return res.status(404).json({ message: 'Playlist not found or does not belong to the user.' });
      }

      const song = await prisma.song.findUnique({
          where: {
              videoId: videoId, 
          },
      });

      if (!song) {
          return res.status(404).json({ message: 'Song not found.' });
      }

      await prisma.playlist.update({
          where: {
              id: playlistId
          },
          data: {
              songs: {
                  disconnect: { id: song.id }, 
              },
          },
      });
      
      const cacheKey = `UserPlaylist:${playlistId}`;
      try {
          await redisClient.del(cacheKey); 
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
  
    const cachedResults = await redisClient.get(query as string);
  
    if (cachedResults) {
      console.log("Returning cached results");
      return res.json(JSON.parse(cachedResults));
    }
  
    try {
      const response = await axios.get("https://www.googleapis.com/youtube/v3/search", {
        params: {
          part: "snippet",
          q: query ,
          type: "video",
          maxResults: 20,
          topicId:"/m/04rlf",
          key: process.env.YOUTUBE_API_KEY,
        },
      });
  
      const decodedItems = response.data.items.map((item: any) => ({
        ...item,
        snippet: {
          ...item.snippet,
          title: decode(item.snippet.title), 
        },
      }));
  
      await redisClient.set(query as string, JSON.stringify(decodedItems), "EX", 86400);
  
      res.json(decodedItems);
    } catch (error) {
        //@ts-ignore
      res.status(500).json({ error: error.message });
    }
  };
  