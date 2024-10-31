// StickyControls.tsx
import React from 'react';
import PlayPauseButton from './PlayPauseButton';
import SeekBar from './SeekBar';
import VolumeControl from './VolumeControl';
import { Music2 } from 'lucide-react';
import { Button } from '../ui/button';

interface StickyControlsProps {
  volume: number;
  onVolumeChange: (volume: number) => void;
  onHide:()=>void
}

const StickyControls: React.FC<StickyControlsProps> = ({
  volume,
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
        <SeekBar />
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
