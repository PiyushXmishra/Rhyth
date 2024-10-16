"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { usePlayer } from "./contexts/PlayerContext";
import YoutubePlayer from "./YoutubePlayer";

interface SongInfo {
  title: string;
  author_name: string;
  thumbnail_url: string;
}

const PlayerWrapper: React.FC = () => {
  const { videoId } = usePlayer(); // Access the current videoId from context
  const [songInfo, setSongInfo] = useState<SongInfo | null>(null); // State to store song info
  const [loading, setLoading] = useState(true); // Loading state for async request

  // Function to truncate the title
  const truncateTitle = (title: string, maxLength: number) => {
    return title.length > maxLength ? `${title.slice(0, maxLength)}...` : title;
  };

  useEffect(() => {
    const fetchSongInfo = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
        );
        setSongInfo(response.data); // Set the fetched song info
      } catch (error) {
        console.error("Error fetching song info:", error);
        setSongInfo(null); // Handle error case
      } finally {
        setLoading(false);
      }
    };

    if (videoId) {
      fetchSongInfo();
    }
  }, [videoId]); // Fetch song info when videoId changes

  return (
    <div className="flex-1 bg-secondary rounded-3xl p-4 max-h-[calc(100vh-8rem)] min-h-[calc(100vh-8rem)]">
      <YoutubePlayer videoId={videoId}/> {/* Pass the dynamic videoId */}

      {/* Display song info below the player */}
      <div className="mt-2 p-3 bg-accent rounded-xl">
        {loading ? (
          <p>Loading song info...</p>
        ) : songInfo ? (
          <div className="flex items-center">
            <img
              src={songInfo.thumbnail_url}
              alt={songInfo.title}
              className="w-20 h-16 rounded-lg mr-4"
            />
            <div>
              <h3 className=" text-base font-semibold">
                {truncateTitle(songInfo.title, 90)} {/* Truncate title to 50 chars */}
              </h3>
              <p className="text-sm text-muted-foreground">
                By {songInfo.author_name}
              </p>
            </div>
          </div>
        ) : (
          <p>No song info available.</p>
        )}
      </div>
    </div>
  );
};

export default PlayerWrapper;
