// contexts/PlayerContext.tsx
"use client";

import React, { createContext, useContext, useState } from 'react';

// Define the context types
interface PlayerContextProps {
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>; // Include the setter type
}

// Create Context
const PlayerControlContext = createContext<PlayerContextProps | undefined>(undefined);

// Player Provider
export const PlayerControlProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <PlayerControlContext.Provider
      value={{
        isPlaying,
        setIsPlaying, // Provide the setter function
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
