"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
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
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import LoginPage from "./Login";
import { useToken } from "@/components/contexts/TokenContext";
import axios from "axios";
import { Disc, Plus } from "lucide-react";
import { motion } from "framer-motion";

type Playlist = {
  id: number;
  name: string;
};

export default function UserPlaylists() {
  const { data: session } = useSession();
  const { sessionToken } = useToken();
  const [playlistName, setPlaylistName] = useState<string>("");
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_URL,
  });

  axiosInstance.interceptors.request.use((config) => {
    if (sessionToken) {
      config.headers["session-token"] = sessionToken;
    }
    return config;
  });

  const createPlaylist = async () => {
    if (session) {
      try {
        const response = await axiosInstance.post(
          "/api/playlist/createplaylist",
          {
            name: playlistName,
          }
        );
        const data = response.data;
        setPlaylists((prev) => [...prev, data]);
        setPlaylistName("");
      } catch (error) {
        console.error("Failed to create playlist", error);
      }
    }
  };

  useEffect(() => {
    if (session) {
      const fetchPlaylists = async () => {
        try {
          const response = await axiosInstance.get("/api/playlist/getplaylist");
          const data = response.data;
          setPlaylists(data);
          setIsLoading(false);
        } catch (error) {
          console.error("Failed to fetch playlists", error);
          setIsLoading(false);
        }
      };
      fetchPlaylists();
    }
  }, [session, sessionToken]);

  const PlaylistSkeleton = () => (
    <Skeleton className="flex flex-col animate-pulse items-center h-40 w-full">
      <Skeleton className="h-24 w-24 rounded-full" />
      <Skeleton className="h-4 w-3/4 mt-2" />
    </Skeleton>
  );

  const PlaylistItem = ({ playlist }: { playlist: Playlist }) => (
    <div className="flex flex-col items-center p-4 bg-secondary/80 rounded-lg">
      <Disc size={80} className="stroke-muted-foreground" />
      <h3 className="lg:hidden text-sm font-semibold text-center pt-2 overflow-hidden text-ellipsis whitespace-nowrap w-full">
        {playlist.name}
      </h3>
    </div>
  );

  return (
    <div className="z-50 flex lg:max-h-[calc(100vh-8rem)] lg:min-h-[calc(100vh-8rem)] bg-secondary/50 border lg:border-none p-4 lg:p-0 w-full lg:bg-secondary rounded-xl lg:rounded-3xl lg:pb-4 flex-col ">
      <h2 className="text-2xl text-white font-semibold font-sans mb-4 lg:text-xl  lg:p-4 lg:pb-0">
        Your Library
      </h2>

      {session ? (
        <>
          {/* Mobile View */}
          <div className="lg:hidden">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full mx-auto"
            >
              <CarouselContent>
                {isLoading ? (
                  <CarouselItem className="basis-full p-2">
                    <div className="grid grid-cols-2 gap-6">
                      {[...Array(2)].map((_, index) => (
                        <PlaylistSkeleton key={index} />
                      ))}
                    </div>
                  </CarouselItem>
                ) : playlists.length > 0 ? (
                  Array.from({ length: Math.ceil(playlists.length / 2) }).map(
                    (_, index) => (
                      <CarouselItem key={index} className="basis-full p-2">
                        <div className="grid grid-cols-2 gap-6">
                          {playlists
                            .slice(index * 2, index * 2 + 2)
                            .map((playlist) => (
                              <Link key={playlist.id} href={`/yourplaylists/${playlist.id}`}>
                                <PlaylistItem
                                  key={playlist.id}
                                  playlist={playlist}
                                />
            
                              </Link>
                            ))}
                        </div>
                      </CarouselItem>
                    )
                  )
                ) : (
                  <CarouselItem className="basis-full">
                    <h1 className="font-semibold font-sans w-full text-center">
                      Create Your First Playlist
                    </h1>
                  </CarouselItem>
                )}
              </CarouselContent>
            </Carousel>
          </div>

          {/* Desktop View */}

          <div className="hidden lg:flex flex-col px-2 h-full w-full overflow-y-auto">
            <div className=" w-full">
              {isLoading ? (
                <div className="grid grid-cols-2 gap-4 px-2 pt-4 w-full">
                  {[...Array(6)].map((_, index) => (
                    <PlaylistSkeleton key={index} />
                  ))}
                </div>
              ) : playlists.length > 0 ? (
                <div className="grid grid-cols-2 gap-4 px-2 pt-4 w-full">
                  {playlists.map((playlist) => (
                    <Link key={playlist.id} href={`/yourplaylists/${playlist.id}`}>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="rounded-md lg:rounded-xl bg-accent lg:p-2 flex flex-row lg:flex-col items-center lg:space-y-2 cursor-pointer"
                      >
                        <div className="relative w-16 h-max lg:w-full overflow-hidden rounded-l-md lg:rounded-xl">
                          <PlaylistItem key={playlist.id} playlist={playlist} />
                          
                        </div>
                        <h3 className="text-lg font-semibold text-center overflow-hidden text-ellipsis whitespace-nowrap w-full">
        {playlist.name}
      </h3>
                      </motion.div>
                    </Link>
                  ))}
                </div>
              ) : (
                <h1 className="font-semibold font-sans w-full lg:text-lg text-center">
                  Create Your First Playlist
                </h1>
              )}
            </div>
          </div>

          {/* Create Playlist Dialog */}
          <Dialog>
            <div className="flex justify-center mt-4">
              <DialogTrigger asChild>
                <Button variant="outline" className="bg-muted px-2 gap-x-1">
                  <Plus />
                  <p className="font-semibold font-sans">Create Playlist</p>
                </Button>
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
      ) : (
        <LoginPage />
      )}
    </div>
  );
}
