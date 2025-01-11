"use client";

import React, { useEffect, useState } from "react";
import { usePlayerControl } from "./contexts/ControlContext";
import { PlayIcon } from "lucide-react";
import { motion } from "framer-motion";
import { usePlayer } from "./contexts/PlayerContext";
import { useRouter } from "next/navigation";

interface Song {
  id: string;
  title: string;
  artist: string;
  thumbnail_url?: string;
}

const RecentlyPlayed: React.FC = () => {
  const [recentSongs, setRecentSongs] = useState<Song[]>([]);
  const { hidden } = usePlayerControl();
  const { setVideoId } = usePlayer();
  const router = useRouter();

  const fetchYoutubeDetails = async (videoId: string) => {
    try {
      const response = await fetch(
        `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch YouTube details");
      }
      const data = await response.json();
      return {
        title: data.title,
        thumbnail_url: data.thumbnail_url,
        artist: data.author_name || "Unknown Artist",
      };
    } catch (error) {
      console.error(`Error fetching details for video ${videoId}:`, error);
      return null;
    }
  };

  useEffect(() => {
    const fetchSongDetails = async () => {
      try {
        const videoIds: string[] = JSON.parse(
          localStorage.getItem("last5Songs") || "[]"
        );
        if (videoIds.length === 0) return;

        const songsWithDetails = await Promise.all(
          videoIds.map(async (videoId: string) => {
            const details = await fetchYoutubeDetails(videoId);
            return details
              ? {
                  id: videoId,
                  ...details,
                }
              : null;
          })
        );
        setRecentSongs(songsWithDetails.filter((song) => song !== null));
      } catch (error) {
        console.error("Error loading recent songs:", error);
      }
    };

    fetchSongDetails();
  }, []);

  const handleShowAll = () => {
    router.push("/history");
  };

  return (
    <div className="pt-4">
      <div className="flex justify-between items-center">
        <div className=" flex text-xl lg:text-2xl p-2 pl-0 lg:p-4 lg:pl-0 font-bold">
          Recently Played
        </div>

        <div className="flex items-center justify-center cursor-pointer" onClick={handleShowAll}>
              <p className="text-sm font-bold">Show All</p>
            </div>
      </div>
      <div
        className={`grid grid-cols-2 gap-6 
         ${hidden ? "lg:grid-cols-4" : "lg:grid-cols-2"} 
         ${hidden ? "xl:grid-cols-4" : "xl:grid-cols-3"}`}
      >
        {recentSongs.length > 0 ? (
          <>
            {recentSongs.map((song) => (
              <motion.div
                key={song.id}
                className="group flex flex-col max-w-48 xl:max-w-56 items-start shadow-lg rounded-lg overflow-hidden lg:p-2"
                whileHover={{
                  backgroundColor: "rgba(255, 255, 255, 0.1)", 
                }}
                transition={{
                  type: "spring",
                  damping: 20,
                  duration: 0.2,
                }}
              >
                {song.thumbnail_url && (
                  <div className="relative">
                    <img
                      src={song.thumbnail_url.replace(
                        "hqdefault.jpg",
                        "maxresdefault.jpg"
                      )}
                      alt={song.title}
                      className={`object-cover rounded ${
                        hidden ? "w-52 h-48" : "w-48 h-40"
                      }`}
                    />
                    <button
                      className="lg:hidden block group-hover:block absolute bottom-2 right-2 bg-white/40 backdrop-blur-md rounded-full p-3 focus:outline-none"
                      onClick={() => setVideoId(song.id)}
                    >
                      <PlayIcon fill="black" stroke="black" size={20} />
                    </button>
                  </div>
                )}
                <div className="mt-2 text-start">
                  <p className="text-sm font-bold">
                    {song.title.slice(0, 18).concat("...")}
                  </p>
                  <p className="text-sm font-bold text-muted-foreground mt-1">{song.artist}</p>
                </div>
              </motion.div>
            ))}
          </>
        ) : (
          <p className="text-gray-500 text-sm col-span-full text-center">
            No songs recently played.
          </p>
        )}
      </div>
    </div>
  );
};

export default RecentlyPlayed;
