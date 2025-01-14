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
        <div className="lg:hidden sticky bottom-11 left-0 right-0 -mx-2 flex items-center justify-between bg-card/70 backdrop-blur-xl rounded-lg mt-auto">
          <CurrentVideoMobile/>
          <MobileWrapper/>
          <div className=" flex py-2 px-2">
         <PlayPauseButton/>
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
