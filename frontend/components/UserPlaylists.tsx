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
    <Skeleton className="flex flex-col animate-pulse items-center w-full p-4 ">
      <Skeleton className="h-24 w-24 rounded-full mt-2" />
      <Skeleton className="hidden lg:flex h-3 w-3/4 mt-2" />
    </Skeleton>
  );

  const PlaylistItem = ({ playlist }: { playlist: Playlist }) => (
    <div className="flex flex-col  items-center p-4 bg-secondary/80 rounded-lg">
      <Disc size={80} className="stroke-muted-foreground" />
      <h3 className=" text-sm  font-bold   text-center pt-2 overflow-hidden text-ellipsis whitespace-nowrap w-full">
        {playlist.name}
      </h3>
    </div>
  );

  return (
    <div className="flex  py-4 px-1  lg:p-0 w-full h-full lg:pb-4 flex-col ">
      <h2 className="text-3xl text-white font-bold mb-2 lg:mb-0 lg:mx-2 lg:p-4 lg:pb-0">
        Your Library
      </h2>

      {session ? (
        <>
          {/* <div className="lg:hidden">
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
                    <h1 className=" font-bold   w-full text-center">
                      Create Your First Playlist
                    </h1>
                  </CarouselItem>
                )}
              </CarouselContent>
            </Carousel>
          </div> */}


          <div className="flex flex-col h-full w-full overflow-y-auto">
            <div className=" flex w-full h-full ">
              {isLoading ? (
                <div className="grid grid-cols-2 gap-4 px-2 pt-4 w-full">
                  {[...Array(6)].map((_, index) => (
                    <PlaylistSkeleton key={index} />
                  ))}
                </div>
              ) : playlists.length > 0 ? (
                <div className="grid grid-cols-2 gap-4  pt-4 w-full">
                  {playlists.map((playlist) => (
                    <Link key={playlist.id} href={`/yourplaylists/${playlist.id}`}>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="rounded-xl  p-2 flex flex-col items-center space-y-2 cursor-pointer"
                      >
                        <div className="relative h-max w-full overflow-hidden rounded-xl">
                          <PlaylistItem key={playlist.id} playlist={playlist} />
                          
                        </div>
              
                      </motion.div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="flex w-full h-full items-center justify-center">
                <h1 className=" font-bold   w-full lg:text-lg text-center">
                  Create Your First Playlist
                </h1>
                </div>
              )}
            </div>
          </div>

          {/* Create Playlist Dialog */}
          <Dialog>
            <div className="flex justify-center mt-4">
              <DialogTrigger asChild>
                <Button variant="outline" className="bg-muted px-2 gap-x-1">
                  <Plus />
                  <p className=" font-bold  ">Create Playlist</p>
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
