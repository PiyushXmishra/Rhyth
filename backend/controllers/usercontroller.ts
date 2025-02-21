import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import redisClient from '../redis/redisclient';

const prisma = new PrismaClient();

export const getHistory = async (req: Request, res: Response): Promise<any> => {
  //@ts-ignore
  const UserId = req.user?.id;
  const { date } = req.query;
  const {page} = req.query
  const pageSize = 50;
  const cacheKey = `user:history:${UserId}:page:${page}`;

  if (!UserId) {
      return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    console.log(page)
      const cachedHistory = await redisClient.get(cacheKey);
      if (cachedHistory) {
          console.log(`Returning cached history for page ${page}`);
          const history = JSON.parse(cachedHistory);

          if (date) {
              const groupedHistory = groupHistoryByDate(history);
              const sortedGroupedHistory = sortGroupedHistoryByDate(groupedHistory);
              return res.status(200).json(filterHistoryByDate(sortedGroupedHistory, date as string));
          }

          return res.status(200).json(history);
      }

      // Fetch history from database with pagination
      const history = await prisma.history.findMany({
          where: { UserId },
          orderBy: { listenedAt: 'desc' },
          skip: page ? (Number(page) - 1) * pageSize : 0,
          take: pageSize,
      });

      // Enrich history with YouTube metadata
      const enrichedHistory = await Promise.all(history.map(async (entry) => {
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
          } catch (error: unknown) {
              if (error instanceof Error) {
                  console.error(`Failed to fetch details for videoId: ${entry.videoId}`, error.message);
              } else {
                  console.error(`Failed to fetch details for videoId: ${entry.videoId}`, 'Unknown error');
              }
              return { videoId: entry.videoId, listenedAt: entry.listenedAt, error: 'Failed to fetch video details' };
          }
      }));

      const groupedHistory = groupHistoryByDate(enrichedHistory);
      const sortedGroupedHistory = sortGroupedHistoryByDate(groupedHistory);

      // Cache the paginated result
      await redisClient.setex(cacheKey, 3600, JSON.stringify(sortedGroupedHistory));

      if (date) {
          return res.status(200).json(filterHistoryByDate(sortedGroupedHistory, date as string));
      }

      return res.status(200).json(sortedGroupedHistory);
  } catch (error: any) {
      console.error('Failed to fetch user history:', error.message);
      return res.status(500).json({ error: 'Failed to fetch user history' });
  }
};


const groupHistoryByDate = (history: any[]) => {
  return history.reduce((acc, entry) => {
      const date = new Date(entry.listenedAt).toLocaleDateString('en-GB');
      if (!acc[date]) {
          acc[date] = [];
      }
      acc[date].push(entry);
      return acc;
  }, {});
};

const sortGroupedHistoryByDate = (groupedHistory: any) => {
  const sortedKeys = Object.keys(groupedHistory).sort((a, b) => {
      const dateA = new Date(a.split('/').reverse().join('-'));
      const dateB = new Date(b.split('/').reverse().join('-'));
      return dateB.getTime() - dateA.getTime();
  });

  const sortedHistory = {};
  sortedKeys.forEach((key) => {
    //@ts-ignore
      sortedHistory[key] = groupedHistory[key];
  });

  return sortedHistory;
};

const filterHistoryByDate = (groupedHistory: any, date: string) => {
  return groupedHistory[date] || [];
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
  