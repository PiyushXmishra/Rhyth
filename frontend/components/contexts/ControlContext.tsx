// contexts/PlayerContext.tsx
"use client";

import React, { createContext, useContext, useState } from 'react';

// Define the context types
interface PlayerContextProps {
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>; // Include the setter type
  elapsedTime:number
  setElapsedTime : React.Dispatch<React.SetStateAction<number>>;
  duration :number
  setDuration : React.Dispatch<React.SetStateAction<number>>;
  onSeekChange: (seekTime:number) => void;
  volume: number;
  setVolume: React.Dispatch<React.SetStateAction<number>>;
  onVolumeChange: (volume: number) => void;
  hidden: boolean;
  setHidden: React.Dispatch<React.SetStateAction<boolean>>;
  onHide: () => void;
  isFullscreen: boolean;
  toggleFullscreen: () => void;
  setIsFullscreen: React.Dispatch<React.SetStateAction<boolean>>;

}

// Create Context
const PlayerControlContext = createContext<PlayerContextProps | undefined>(undefined);

// Player Provider
export const PlayerControlProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(100);
  const [hidden, setHidden] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

const onHide = ()=>{
  setHidden(!hidden);
}

  const onVolumeChange = (volume: number) => {
    setVolume(volume);
  }
 const onSeekChange =( seekTime: number)=>{
setElapsedTime(seekTime);
  }



  return (
    <PlayerControlContext.Provider
      value={{
        isPlaying,
        setIsPlaying, // Provide the setter function
        elapsedTime,
        setElapsedTime,
        duration,
        setDuration,
        onSeekChange,
        volume,
        setVolume,
        onVolumeChange,
        hidden,
        setHidden,
        onHide,
        isFullscreen,
        toggleFullscreen,
        setIsFullscreen
      }}>
      {children} {/* Render children within the provider */}
    </PlayerControlContext.Provider>
  );
};

// Custom hook to use the PlayerContext
export const usePlayerControl = () => {
  const context = useContext(PlayerControlContext);
  if (context === undefined) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
};
