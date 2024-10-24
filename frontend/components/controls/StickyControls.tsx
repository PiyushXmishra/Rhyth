// StickyControls.tsx
import React from 'react';
import PlayPauseButton from './PlayPauseButton';
import SeekBar from './SeekBar';
import VolumeControl from './VolumeControl';
import { Music2, ToggleLeft } from 'lucide-react';
import { Button } from '../ui/button';

interface StickyControlsProps {
  isPlaying: boolean;
  elapsedTime: number;
  duration: number;
  volume: number;
  onPlayPause: () => void;
  onSeekChange: (time: number) => void;
  onVolumeChange: (volume: number) => void;
  onHide:()=>void
}

const StickyControls: React.FC<StickyControlsProps> = ({
  isPlaying,
  elapsedTime,
  duration,
  volume,
  onPlayPause,
  onSeekChange,
  onVolumeChange,
  onHide
}) => {
  return (
    <div className="flex w-full items-center justify-between px-4 py-2">
      <div className=''>
      <PlayPauseButton isPlaying={isPlaying} onClick={onPlayPause} />
      </div>
      <div className='hidden md:flex'>
        <VolumeControl volume={volume} onVolumeChange={onVolumeChange} />
      </div>
      <div className='hidden md:flex items-center'>
        <SeekBar elapsedTime={elapsedTime} duration={duration} onSeekChange={onSeekChange} />
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={onHide}
        className="hover:bg-secondary hidden md:flex "
      >
        <Music2/>
      </Button>
      
    </div>
  );
};

export default StickyControls;
