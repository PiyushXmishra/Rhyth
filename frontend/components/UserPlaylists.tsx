'use client'

import axios from 'axios';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import playistlogo from "@/public/playlist.png";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import LoginPage from './Login';

type Playlist = {
  id: number;
  name: string;
};

export default function UserPlaylists() {
  const { data: session } = useSession();
  const [playlistName, setPlaylistName] = useState<string>('');
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  async function createPlaylist() {
    if (session) {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_URL}/api/playlist/createplaylist`,
          { name: playlistName },
          { withCredentials: true }
        );
        setPlaylists((prev) => [...prev, response.data]);
        setPlaylistName('');
      } catch (error) {
        console.error('Failed to create playlist', error);
      }
    }
  }

  useEffect(() => {
    if (session) {
      const fetchPlaylists = async () => {
        try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/playlist/getplaylist`, {
            withCredentials: true,
          });
          setPlaylists(response.data);
          setIsLoading(false);
        } catch (error) {
          console.error('Failed to fetch playlists');
          setIsLoading(false);
        }
      };
      fetchPlaylists();
    }
  }, [session]);

  const PlaylistSkeleton = () => (
    <Card className="flex flex-col items-center h-20 w-full">
      <CardContent className="flex flex-row items-center justify-start p-4 h-full w-full space-x-4">
        <Skeleton className="h-12 w-full rounded-full" />
        {/* <Skeleton className="h-4 w-3/4" /> */}
      </CardContent>
    </Card>
  );

  return (
    <div className="mx-auto p-4 bg-secondary lg:bg-none rounded-2xl w-full">
      <h2 className="text-2xl font-semibold mb-4">Your Playlists</h2>

{ session ? (
  <>
  {/* Carousel for Playlists */}
  <Carousel
  opts={{
    align: "start",
    loop: true,
  }}
  className="w-full  mx-auto"
>
  <CarouselContent>
    {isLoading ? (
      // Loader
      <CarouselItem className="basis-full p-2">
        <div className="grid grid-cols-2 gap-6">
          {[...Array(2)].map((_, index) => (
            <PlaylistSkeleton key={index} />
          ))}
        </div>
      </CarouselItem>
    ) : playlists.length > 0 ? (
      // Playlists
      Array.from({ length: Math.ceil(playlists.length / 2) }).map((_, index) => (
        <CarouselItem key={index} className="basis-full p-2">
          <div className="grid grid-cols-2 gap-6">
            {playlists.slice(index * 2, index * 2 + 2).map((playlist) => (
              <Link key={playlist.id} href={`/yourplaylists/${playlist.id}`}>
                <Card className="flex flex-col items-center h-20 w-full">
                  <CardContent className="flex flex-row items-center justify-start p-4 h-full w-full space-x-4">
                    <Image
                      src={playistlogo}
                      alt="Playlist logo"
                      height={48}
                      width={48}
                      className="rounded-full"
                    />
                    <h3 className="text-lg font-semibold overflow-hidden text-ellipsis whitespace-nowrap max-w-[calc(100%-3rem)]">
                      {playlist.name}
                    </h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </CarouselItem>
      ))
    ) : (
      <p>No playlists available</p>
    )}
  </CarouselContent>
</Carousel>

{/* Dialog for Creating a New Playlist */}
<Dialog>
  <div className="flex justify-center mt-4">
    <DialogTrigger asChild>
      <Button variant="outline">Create Playlist</Button>
    </DialogTrigger>
  </div>
  <DialogContent className="sm:max-w-[425px]">
    <DialogHeader>
      <DialogTitle>New Playlist</DialogTitle>
    </DialogHeader>
    <div className="grid gap-4 py-4">
      <Input
        id="text"
        className="rounded-sm"
        value={playlistName}
        onChange={(e) => setPlaylistName(e.target.value)}
        placeholder="Enter playlist name"
      />
    </div>
    <DialogFooter>
      <DialogClose asChild>
        <Button onClick={createPlaylist}>Create</Button>
      </DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>
</>
):(

  <LoginPage/>
) }
    
    </div>
  );
}