"use client";
import React from "react";
import { usePlayer } from "../contexts/PlayerContext";
import YoutubePlayer from "./YoutubePlayer";

const MobileWrapper: React.FC = () => {
const { videoId } = usePlayer(); 
  return (
        <YoutubePlayer videoId={videoId} />  
  );
};

export default MobileWrapper;
