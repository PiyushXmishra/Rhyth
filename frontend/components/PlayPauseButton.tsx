import React from 'react';
import { Play, Pause } from 'lucide-react'; // Importing Play and Pause icons

interface PlayPauseButtonProps {
  isPlaying: boolean;
  onClick: () => void;
}

const PlayPauseButton: React.FC<PlayPauseButtonProps> = ({ isPlaying, onClick }) => {
  return (
    <button onClick={onClick} className=" text-white rounded flex item-start pb-1">
      {isPlaying ? <Pause size={24} /> : <Play size={24} />}
    </button>
  );
};

export default PlayPauseButton;
