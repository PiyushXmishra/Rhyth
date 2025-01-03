import { Request, Response } from 'express';
import prisma from '../models/prismaclient';

export const createPlaylist = async (req: Request, res: Response) => {
  const { name } = req.body;
  //@ts-ignore
  const userId = req.user.id; 

  const playlist = await prisma.playlist.create({
    data: {
      name,
      user: { connect: { id: userId } },
    },
  });

  res.status(201).json(playlist);
};

export const getUserPlaylists = async (req: Request, res: Response) => {
  //@ts-ignore
  const userId = req.user.id;

  const playlists = await prisma.playlist.findMany({
    where: { userId },
  });

  res.json(playlists);
};
