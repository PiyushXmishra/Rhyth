import React, { useEffect } from "react";
import { Play, Pause } from "lucide-react";
import { usePlayerControl } from "../contexts/ControlContext";

const PlayPauseButton: React.FC = () => {
  const { isPlaying, setIsPlaying } = usePlayerControl();

  const handlePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  return (
    <button
      onClick={handlePlayPause}
      className="bg-secondary lg:bg-white rounded-3xl p-2 justify-center items-center flex outline-none"
    >
      {isPlaying ? (
        <Pause
          size={24}
          strokeWidth={0.5}
          className=" fill-white lg:fill-black"
        />
      ) : (
        <Play
          size={24}
          strokeWidth={0.5}
          className="fill-white lg:fill-black  pl-0.5 rounded-sm"
        />
      )}
    </button>
  );
};

export default PlayPauseButton;
