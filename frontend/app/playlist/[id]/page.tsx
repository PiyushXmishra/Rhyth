"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { usePlayer } from "@/components/contexts/PlayerContext";
import SkeletonLoading from "@/components/loaders/PlaylistLoading";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { DotPattern } from "@/components/ui/dot-pattern";
import { EllipsisVertical } from "lucide-react";
import { Dropdown } from "@/components/controls/DownloadButton";
import { useGradient } from "@/components/contexts/GradientContext";
import Image from "next/image";
import rhyth from "@/public/NavbarImage.png";
interface Song {
  title: string;
  videoId: string;
  thumbnail: {
    default: { url: string; width: number; height: number };
    medium: { url: string; width: number; height: number };
    high: { url: string; width: number; height: number };
    standard: { url: string; width: number; height: number };
    maxres: { url: string; width: number; height: number };
  };
}

export default function SongDetails({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { title: string };
}) {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [playlistTitle, setPlaylistTitle] = useState<string>("");
  const [playlistDesc, setPlaylistDesc] = useState<string>("");
  const [playlistImage, setPlaylistImage] = useState<string>("");

  const { setVideoId, setPlaylist } = usePlayer();
  const { gradient, extractColorFromImage, isLoading } = useGradient();

  const handleVideoSelect = (videoId: string) => {
    setVideoId(videoId);
  };

  useEffect(() => {
    const fetchSongDetails = async () => {
      try {
        const response = await axios.get<Song[]>(
          `${process.env.NEXT_PUBLIC_URL}/api/songs/${params.id}`
        );
        const TrackResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_URL}/api/playlist/homeplaylists`,
          {
            playlistIds: [`${params.id}`],
          }
        );

        setPlaylistImage(TrackResponse.data[0].thumbnails?.maxres?.url);
        setPlaylistDesc(TrackResponse.data[0].description);
        extractColorFromImage(TrackResponse.data[0].thumbnails?.maxres?.url);
        setSongs(response.data);
        const videoIds = response.data.map((song) => song.videoId);
        setPlaylist(videoIds);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch song details");
        console.error(error);
        setLoading(false);
      }
    };
    fetchSongDetails();

    setPlaylistTitle(searchParams.title.split(" ").slice(0, 6).join(" "));
  }, [params.id, searchParams.title, setPlaylist]);

  if (loading) {
    return (
      <div className=" flex flex-col h-full w-full rounded-md lg:rounded-3xl lg:p-4">
        <SkeletonLoading count={20} />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  const truncateTitle = (title: string, maxLength: number) => {
    if (title.length > maxLength) {
      return title.slice(0, maxLength) + "...";
    }
    return title;
  };

  return (
    <div className="flex flex-col h-full rounded-md lg:rounded-3xl w-full">
      <div
        className="absolute lg:hidden top-[-3rem] w-full -ml-3 pointer-events-none  transition-all duration-1000 ease-in-out"
        style={{
          background: gradient,
          transition: "background 0.5s ease-in-out",
          height: "25rem",
        }}
      />
      <div className="overflow-y-auto relative">
        <div className="flex flex-col lg:flex-row lg:space-x-4 items-center mb-2 p-2 lg:pt-6 h-max">
          <img
            src={playlistImage}
            alt={playlistTitle}
            className="h-64 lg:h-52 object-cover rounded-xl shadow-[0px_0px_5px_4px_rgba(0,_0,_0,_0.1)]"
          />
          <div className="flex flex-col items-center">
            <h1 className={`hidden lg:flex text-white font-bold  mt-2 self-start ${playlistTitle.length > 20 ? "text-2xl" : "text-5xl" } `}>
              {playlistTitle}
            </h1>

            <h1 className="text-xs text-muted-foreground font-semibold mt-4 lg:mt-6 self-start">
              {playlistDesc.length < 120 ? playlistDesc : playlistDesc.slice(0,120).concat("...")}
            </h1>

            <div className="self-start flex flex-row items-center space-x-1 pt-1 select-none">
              <Image src={rhyth} alt={"rhyth"} width={30} height={20} />
              <h1 className="text-white font-semibold text-xs  flex ">Rhyth</h1>
              <h1 className="text-white font-semibold text-base flex mb-2 ">.</h1>
              <h1 className="text-xs font-bold text-white items-center">
                {`${songs.length} songs`}
              </h1>
            </div>
          </div>
        </div>

    <hr className="mt-3 lg:mt-5 " />
        {songs.map((song,index) => (
          <motion.div
            whileHover={{
              scale: 1.01,
              transition: { duration: 0.01 },
            }}
            whileTap={{ scale: 0.9 }}
            key={song.videoId}
            className="flex items-center p-2 cursor-pointer transition duration-200 ease-in-out  rounded-xl lg:m-2 justify-between "
          >
            
            <div
              className="flex items-center w-full"
              onClick={() => handleVideoSelect(song.videoId)}
            >
              <h1 className="text-xs lg:text-sm pr-4 lg:pr-5 text-muted-foreground font-semibold ">{index+1}</h1>
              <img
                src={song.thumbnail.high.url}
                alt={song.title}
                className="w-16 h-12 lg:w-20 lg:h-16 rounded-lg object-cover"
              />
              <div className="mx-4 lg:ml-4">
                <h3 className="text-xs lg:text-base  font-bold  ">
                  {truncateTitle(song.title, 60)}
                </h3>
              </div>
            </div>
            <div className="flex">
              <Dropdown videoId={song.videoId} videoTitle={song.title} />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
