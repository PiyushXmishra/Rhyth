import React, { useEffect } from 'react';
import { Play, Pause } from 'lucide-react'; // Importing Play and Pause icons
import { Button } from '../ui/button';
import { usePlayerControl } from '../contexts/ControlContext';

const PlayPauseButton: React.FC = () => {
  const {isPlaying ,setIsPlaying} = usePlayerControl()

 const handlePlayPause =()=>{
setIsPlaying((prev) => !prev);
 }
  
  return (
    <Button
    variant="ghost"
    size="icon" 
    onClick={handlePlayPause}
    className="hover:bg-secondary">
    {isPlaying ? <Pause size={24} /> : <Play size={24} />}
    </Button>
  );
};

export default PlayPauseButton;
