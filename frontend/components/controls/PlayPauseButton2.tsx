import React, { useEffect } from "react";
import { Play, Pause } from "lucide-react";
import { usePlayerControl } from "../contexts/ControlContext";

const PlayPauseButton2: React.FC = () => {
  const { isPlaying, setIsPlaying } = usePlayerControl();

  const handlePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  return (
    <button
      onClick={handlePlayPause}
      className="bg-white rounded-3xl  justify-center items-center flex outline-none"
    >
      {isPlaying ? (
        <Pause
          size={28}
          strokeWidth={0.5}
          className="fill-black"
        />
      ) : (
        <Play
          size={28}
          strokeWidth={0.5}
          className="fill-black pl-0.5 rounded-sm"
        />
      )}
    </button>
  );
};

export default PlayPauseButton2;
