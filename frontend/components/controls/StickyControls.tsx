// StickyControls.tsx
import React from 'react';
import PlayPauseButton from './PlayPauseButton';
import SeekBar from './SeekBar';
import VolumeControl from './VolumeControl';
import { Music2 } from 'lucide-react';
import { Button } from '../ui/button';

interface StickyControlsProps {
  elapsedTime: number;
  duration: number;
  volume: number;
  onSeekChange: (time: number) => void;
  onVolumeChange: (volume: number) => void;
  onHide:()=>void
}

const StickyControls: React.FC<StickyControlsProps> = ({
  elapsedTime,
  duration,
  volume,
  onSeekChange,
  onVolumeChange,
  onHide
}) => {
  return (
    <div className=" hidden lg:flex w-full items-center justify-between px-4 py-2">
      <div className='hidden lg:flex'>
      <PlayPauseButton />
      </div>
      <div className='hidden lg:flex'>
        <VolumeControl volume={volume} onVolumeChange={onVolumeChange} />
      </div>
      <div className='hidden lg:flex items-center'>
        <SeekBar elapsedTime={elapsedTime} duration={duration} onSeekChange={onSeekChange} />
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={onHide}
        className="hover:bg-secondary hidden lg:flex "
      >
        <Music2/>
      </Button>
      
    </div>
  );
};

export default StickyControls;
