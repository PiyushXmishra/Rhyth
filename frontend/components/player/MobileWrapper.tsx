"use client";
import React from "react";
import { usePlayer } from "../contexts/PlayerContext";
import YoutubePlayer from "./YoutubePlayer";
import BraveSupportBanner from "../PromotionalBanner";
import CurrentVideo from "./CurrentVideo";

const MobileWrapper: React.FC = () => {
const { videoId } = usePlayer(); 
  

  return (
        <YoutubePlayer videoId={videoId} />  
  );
};

export default MobileWrapper;
