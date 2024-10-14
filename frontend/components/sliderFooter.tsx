// StickyControls.tsx
import React from 'react';
import PlayPauseButton from './PlayPauseButton';
import SeekBar from './SeekBar';
import VolumeControl from './VolumeControl';

interface StickyControlsProps {
  isPlaying: boolean;
  elapsedTime: number;
  duration: number;
  volume: number;
  onPlayPause: () => void;
  onSeekChange: (time: number) => void;
  onVolumeChange: (volume: number) => void;
}

const StickyControls: React.FC<StickyControlsProps> = ({
  isPlaying,
  elapsedTime,
  duration,
  volume,
  onPlayPause,
  onSeekChange,
  onVolumeChange,
}) => {
  return (
    <div className="flex w-full gap-x-10 px-5">
      <div className='flex-none '>
      <PlayPauseButton isPlaying={isPlaying} onClick={onPlayPause} />
      </div>
      <div className='flex-1'>
        <SeekBar elapsedTime={elapsedTime} duration={duration} onSeekChange={onSeekChange} />
      </div>
      <div className='flex-initial'>
        <VolumeControl volume={volume} onVolumeChange={onVolumeChange} />
      </div>
    </div>
  );
};

export default StickyControls;
