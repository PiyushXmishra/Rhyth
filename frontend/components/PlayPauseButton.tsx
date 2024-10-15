import React from 'react';
import { Play, Pause } from 'lucide-react'; // Importing Play and Pause icons
import { Button } from './ui/button';

interface PlayPauseButtonProps {
  isPlaying: boolean;
  onClick: () => void;
}

const PlayPauseButton: React.FC<PlayPauseButtonProps> = ({ isPlaying, onClick }) => {
  return (
    <Button
    variant="ghost"
    size="icon" 
    onClick={onClick}
    className="hover:bg-secondary">
    {isPlaying ? <Pause size={24} /> : <Play size={24} />}
    </Button>
  );
};

export default PlayPauseButton;
