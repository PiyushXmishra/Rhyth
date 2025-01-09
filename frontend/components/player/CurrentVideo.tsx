"use client";
import { usePlayer } from "../contexts/PlayerContext";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CurrentVideoLoader from "../loaders/CurrentVideoLoader";

interface SongInfo {
    title: string;
    author_name: string;
    thumbnail_url: string;
  }

  const CurrentVideo: React.FC = () => {
    const { videoId } = usePlayer(); 
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
        setLoading(false)
      } catch (error) {
        console.error("Error fetching song info:", error);
        setSongInfo(null); // Handle error case
      } finally {
        setLoading(false);
      }
    };

    if (videoId) {
      fetchSongInfo();
      localStorage.setItem("LastVidId", videoId)
    }
  }, [videoId]); // Fetch song info when videoId changes


    return (
      <div className="p-2 lg:p-3 rounded-t-xl">
          {/* Song info at the bottom */}
          {loading ? (
            <CurrentVideoLoader/>
          ) : songInfo ? (
            <div className="flex items-center">
              <div className="w-14 h-10 lg:w-20 object-cover lg:h-16 bg-cover rounded-lg mr-4">

             
              <img
                src={songInfo.thumbnail_url.replace("hqdefault", "maxresdefault")}
                alt={songInfo.title}
                className="h-full w-full object-cover rounded-lg mr-4"
              />
               </div>
              <div>
                <h3 className="hidden lg:flex text-md font-bold">
                  {truncateTitle(songInfo.title, 35)}{" "}
                </h3>
                <h3 className="lg:hidden text-sm  font-bold  ">
                  {truncateTitle(songInfo.title, 20)}{" "}
                </h3>
                <p className="text-xs lg:text-sm text-muted-foreground">
                  By {songInfo.author_name}
                </p>
              </div>
              
            </div>
          ) : (
           <CurrentVideoLoader/>
          )}
        </div>
    )
  }
  
  export default CurrentVideo
  