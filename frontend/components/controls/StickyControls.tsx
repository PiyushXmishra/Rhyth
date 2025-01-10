// StickyControls.tsx
import React, { useEffect } from 'react';
import PlayPauseButton from './PlayPauseButton';
import SeekBar from './SeekBar';
import VolumeControl from './VolumeControl';
import {  Headphones, Maximize, Music2 } from 'lucide-react';
import { usePlayerControl } from '../contexts/ControlContext';

const StickyControls = () => {
  const { hidden , onHide, toggleFullscreen } = usePlayerControl();

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement
      const isInputField =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      if (!isInputField && event.key === 'f' || event.key === 'F') {
        toggleFullscreen();
      }
    };
    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [toggleFullscreen]);

  return (
    <div className="flex w-full px-4 space-x-10 items-center ">
      <div className="flex flex-col w-3/5">
        <div className="flex justify-center items-center pb-2">
          <PlayPauseButton />
        </div>
        <SeekBar />
      </div>
      <div className="flex">
        <VolumeControl />
      </div>
      <div className="flex items-end">
        <button onClick={onHide} className="flex p-1 ">
          {hidden ? <Music2 size={20} /> : <Headphones size={20} />}
        </button>
      </div>
      <div className="flex items-end">
        <button onClick={toggleFullscreen} className="p-1">
          <Maximize size={20} />
        </button>
      </div>
    </div>
  );
};

export default StickyControls;
