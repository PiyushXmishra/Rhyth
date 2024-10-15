// controllers/songController.ts
import { Request, Response } from 'express';
import prisma from '../models/prismaclient';
import axios from 'axios';


// Add Song to Playlist
export const addSongToPlaylist = async (req: Request, res: Response) => {
  const { playlistIds, videoId, title, thumbnail } = req.body; // Accepting an array of playlist IDs

  // First, check if the song already exists
  let song = await prisma.song.findUnique({
    where: { videoId },
  });

  // If the song does not exist, create it
  if (!song) {
    song = await prisma.song.create({
      data: {
        videoId,
        title,
        thumbnail,
      },
    });
  }

  // Connect the song to each specified playlist
  const updatePlaylistPromises = playlistIds.map((playlistId: any) => 
    prisma.playlist.update({
      where: { id: playlistId },
      data: {
        songs: {
          //@ts-ignore
          connect: { id: song.id }, // Connect the song to the playlist
        },
      },
    })
  );

  // Wait for all the updates to finish
  await Promise.all(updatePlaylistPromises);

  res.status(201).json(song); // Return the song object
};

export const searchSongs = async (req: Request, res: Response) => { 
  console.log(req.query)
  const { query } = req.query; // Destructure the 'query' parameter
  try {
    const response = await axios.get("https://www.googleapis.com/youtube/v3/search", {
      params: {
        part: 'snippet',
        q: query,
        type: 'video',
        maxResults: 10,
        key: process.env.YOUTUBE_API_KEY,
      },
    });
    res.json(response.data.items);
  } catch (error) {
    res.status(500).json({ error });
  }
};
