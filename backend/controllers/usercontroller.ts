import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import redisClient from '../redis/redisclient';

const prisma = new PrismaClient();

export const getHistory = async (req: Request, res: Response): Promise<any> => {
    //@ts-ignore
    const UserId = req.user?.id;
  
    if (!UserId) {
      return res.status(400).json({ error: 'User ID is required' });
    }
  
    try {
      const cachedHistory = await redisClient.get(`user:history:${UserId}`);
  
      if (cachedHistory) {
        console.log('Returning cached history');
        return res.status(200).json(JSON.parse(cachedHistory));
      }
  
      const history = await prisma.history.findMany({
        where: { UserId },
        orderBy: { listenedAt: 'desc' },
      });

      const enrichedHistory = await Promise.all(
        history.map(async (entry) => {
          try {
            const youtubeResponse = await axios.get(
              `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${entry.videoId}&format=json`
            );
            return {
              videoId: entry.videoId,
              listenedAt: entry.listenedAt,
              name: youtubeResponse.data.title,    
              thumbnail: youtubeResponse.data.thumbnail_url, 
            };
          } catch (error:any) {
            console.error(`Failed to fetch details for videoId: ${entry.videoId}`, error.message);
            return { videoId: entry.videoId, listenedAt: entry.listenedAt, error: 'Failed to fetch video details' };
          }
        })
      );
  
      await redisClient.setex(`user:history:${UserId}`, 3600, JSON.stringify(enrichedHistory));
  
      return res.status(200).json(enrichedHistory);
    } catch (error: any) {
      console.error('Failed to fetch user history:', error.message);
      return res.status(500).json({ error: 'Failed to fetch user history' });
    }
  };
 
  
  export const UpdateHistory = async (
    req: Request<{ playlistId: string }>,
    res: Response
  ): Promise<any> => {
    //@ts-ignore
    const userId = req.user?.id;
    const videoId = req.body.videoId;
    const listenedAt = req.body.listenedAt
    if (!userId || !videoId) {
      return res.status(400).json({ error: 'User ID and video ID are required' });
    }

   const existingHistory = await prisma.history.findFirst({
    where: {
      UserId: userId,
      videoId: videoId,
      listenedAt: listenedAt, 
    },
  });
   

  if (existingHistory) {
   return res.json({message : "song already listened today"})
  } else {
    try {
        await prisma.history.create({
          data: {
            videoId,
            user: { connect: { id: userId } },
            listenedAt
          },
        });
    
        const cacheKey = `user:history:${userId}`;
        try {
          await redisClient.del(cacheKey);
          console.log(`Cache invalidated for key: ${cacheKey}`);
        } catch (cacheError) {
          console.warn(
            `Warning: Could not invalidate cache for key ${cacheKey}:`,
            cacheError
          );
        }
    
        return res.status(201).json({ message: 'History updated successfully' });
      } catch (error: any) {
        console.error('Failed to add to history:', error.message);
        return res.status(500).json({ error: 'Failed to add to history' });
      }
  }
  };
  