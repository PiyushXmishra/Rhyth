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
      <div className="hidden lg:flex">  
       <div className="flex flex-col bg-secondary rounded-3xl p-4 max-h-[calc(100vh-8rem)] min-h-[calc(100vh-8rem)] lg:max-w-min lg:gap-y-2">
      <div>
        <YoutubePlayer />
      </div>
      <div className="lg:overflow-y-scroll mt-2 gap-y-4 space-y-2 ">
        <div>
          <CurrentVideo/>
        </div>
        <div className="hidden lg:block">
          <BraveSupportBanner />
        </div>
      </div>
    </div>
    </div>
  )
}
</>
)}

export default PlayerWrapper;
