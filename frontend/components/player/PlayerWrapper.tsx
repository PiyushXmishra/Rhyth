"use client";
import React from "react";
import YoutubePlayer from "./YoutubePlayer";
import BraveSupportBanner from "../PromotionalBanner";
import CurrentVideo from "./CurrentVideo";
import useMediaQuery from "../hooks/useMediaQuery";
import CurrentVideoMobile from "./CurrentVideoMobile";
import MobileWrapper from "./MobileWrapper";
import PlayPauseButton from "../controls/PlayPauseButton";
import { Slider2 } from "../ui/slider2";
import { usePlayerControl } from "../contexts/ControlContext";
import { useGradient } from "../contexts/CurrentVidColorContext";
const PlayerWrapper: React.FC = () => {
  const { elapsedTime, duration, onSeekChange } = usePlayerControl();
  const { backgroundColor } = useGradient();
  const isMobile = useMediaQuery("(max-width: 1023px)");

  return (
    <>
      {isMobile ? (
        <>
          <div className="lg:hidden sticky bottom-11 left-0 right-0 -mx-2 flex flex-col justify-between rounded-lg mt-auto overflow-hidden" style={{backgroundColor:backgroundColor }}>
            <div className="flex flex-row justify-between  ">
              <CurrentVideoMobile />
              <MobileWrapper />
              <div className="flex py-2 px-2">
                <PlayPauseButton />
              </div>
            </div>
            <Slider2
              value={[elapsedTime]}
              min={0}
              max={duration}
              className="flex items-center"
            />
          </div>
        </>
      ) : (
        <div className="hidden lg:flex bg-card justify-center items-center">
          <div>
            <YoutubePlayer />
          </div>
        </div>
      )}
    </>
  );
};

export default PlayerWrapper;
