"use client"
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the types for the context
interface PlayerContextProps {
  videoId: string;
  setVideoId: (id: string) => void;
}

// Create context with initial undefined values
const PlayerContext = createContext<PlayerContextProps | undefined>(undefined);

// Custom hook to use the PlayerContext
export const usePlayer = (): PlayerContextProps => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
};

// PlayerProvider component that wraps children
export const PlayerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [videoId, setVideoId] = useState<string>('c_VrTcIY8kA'); // Initial video ID

  return (
    <PlayerContext.Provider value={{ videoId, setVideoId }}>
      {children}
    </PlayerContext.Provider>
  );
};
