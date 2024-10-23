"use client";
import React from "react";
import { usePlayer } from "../contexts/PlayerContext";
import YoutubePlayer from "./YoutubePlayer";
import BraveSupportBanner from "../PromotionalBanner";
import CurrentVideo from "./CurrentVideo";

const PlayerWrapper: React.FC = () => {
const { videoId } = usePlayer(); 
  

  return (
    <div className="flex flex-col bg-secondary rounded-3xl p-4 max-h-[calc(100vh-8rem)] min-h-[calc(100vh-8rem)] md:max-w-min md:gap-y-2">
      <div>
        <YoutubePlayer videoId={videoId} />
      </div>
      <div className="md:overflow-y-scroll mt-2 gap-y-4 space-y-2 ">
        <div>
          <CurrentVideo/>
        </div>
        <div className="hidden md:block">
          <BraveSupportBanner />
        </div>
      </div>
    </div>
  );
};

export default PlayerWrapper;
