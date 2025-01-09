// StickyControls.tsx
import React from 'react';
import PlayPauseButton from './PlayPauseButton';
import SeekBar from './SeekBar';
import VolumeControl from './VolumeControl';
import { Music2 } from 'lucide-react';
import { Button } from '../ui/button';
import { usePlayerControl } from '../contexts/ControlContext';

const StickyControls = () => {
  const {onHide} = usePlayerControl();
  return (
    <div className="flex w-full px-4 space-x-10 items-center ">
      <div className=' flex flex-col w-3/5'>
      <div className=' flex justify-center items-center pb-2'>
      <PlayPauseButton />
      </div>
      <SeekBar />
      </div>
      <div className=' flex '>
      <VolumeControl/>
      </div>
      <div className='flex items-end'>
      <button
        onClick={onHide}
        className="flex "
      >
        <Music2 size={20}/>
      </button>
      </div>
      
    </div>
  );
};

export default StickyControls;
