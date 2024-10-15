// VolumeControl.tsx
"use client"
import React, { useState } from 'react';


interface VolumeControlProps {
  volume: number;
  onVolumeChange: (value: number) => void;
}

const VolumeControl: React.FC<VolumeControlProps> = ({ volume, onVolumeChange }) => {
  const [lastVolume, setLastVolume] = useState<number>(volume); // Track last volume before muting
  const [isMuted, setIsMuted] = useState<boolean>(volume === 0); // Set mute state based on initial volume

  // Function to handle volume icon click
  const handleVolumeClick = () => {
    if (isMuted) {
      // Restore the last volume when unmuting
      onVolumeChange(lastVolume);
    } else {
      // Save current volume and mute
      setLastVolume(volume);
      onVolumeChange(0); // Mute the volume
    }
    setIsMuted(!isMuted); // Toggle mute state
  };

  // Function to handle slider change
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);
    onVolumeChange(newVolume); // Change the volume without affecting mute state
    if (newVolume > 0) {
      setIsMuted(false); // Unmute if volume is above 0
    }
  };

  return (
    <div className='flex items-center space-x-2'>
      {/* Show VolumeIcon if muted, otherwise show Volume2Icon */}
      {isMuted ? (
        <VolumeIcon className="h-6 w-6 cursor-pointer" onClick={handleVolumeClick} />
      ) : (
        <Volume2Icon className="h-6 w-6 cursor-pointer" onClick={handleVolumeClick} />
      )}
      
      <input
        type="range"
        min="0"
        max="100"
        value={isMuted ? 0 : volume} // Set slider value to 0 if muted
        onChange={handleSliderChange} // Handle volume change through slider
        className="flex-1" // Allow the input to take the remaining space
      />
    </div>
  );
};

export default VolumeControl;

// VolumeIcon.tsx (no changes needed here)
function VolumeIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    </svg>
  );
}

// Volume2Icon.tsx (no changes needed here)
function Volume2Icon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  );
}
