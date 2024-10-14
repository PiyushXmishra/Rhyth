// VolumeControl.tsx
"use client"
import React from 'react';


interface VolumeControlProps {
  volume: number;
  onVolumeChange: (value: number) => void;
}

const VolumeControl: React.FC<VolumeControlProps> = ({ volume, onVolumeChange }) => {
  // Function to handle volume icon click
  const handleVolumeClick = () => {
    if (volume > 0) {
      onVolumeChange(0); // Set volume to 0
    } else {
      onVolumeChange(50); // Restore to a default volume (change this value if needed)
    }
  };

  return (
    <div className='flex items-center space-x-2'>
      {/* Show VolumeIcon if volume is 0, otherwise show Volume2Icon */}
      {volume === 0 ? (
        <VolumeIcon className="h-6 w-6 cursor-pointer" onClick={handleVolumeClick} />
      ) : (
        <Volume2Icon className="h-6 w-6 cursor-pointer" onClick={handleVolumeClick} />
      )}
      
      <input
        type="range"
        min="0"
        max="100"
        value={volume}
        onChange={(e) => onVolumeChange(Number(e.target.value))}
        className="flex-1" // Allow the input to take the remaining space
      />
    </div>
  );
};

export default VolumeControl;

// VolumeIcon.tsx
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

// Volume2Icon.tsx
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
