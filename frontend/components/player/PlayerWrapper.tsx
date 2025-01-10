"use client";
import React from "react";
import YoutubePlayer from "./YoutubePlayer";
import BraveSupportBanner from "../PromotionalBanner";
import CurrentVideo from "./CurrentVideo";
import useMediaQuery from "../hooks/useMediaQuery";
import CurrentVideoMobile from "./CurrentVideoMobile";
import MobileWrapper from "./MobileWrapper";
import PlayPauseButton from "../controls/PlayPauseButton";

const PlayerWrapper: React.FC = () => {
  const isMobile = useMediaQuery("(max-width: 1023px)");

  return (
    <>
    {isMobile ? (
      <div className="lg:hidden">
        <div className="flex items-center justify-between bg-secondary rounded-lg">
          <CurrentVideoMobile/>
          <MobileWrapper/>
          <div className=" items-center justify-between px-4 py-2">
         <PlayPauseButton/>
         </div>
        </div>
      </div>
    ) : (
      <div className="hidden lg:flex bg-card justify-center items-center">  
      <div>
        <YoutubePlayer />
      </div>
     
    </div>
  )
}
</>
)}

export default PlayerWrapper;
