// PlayerContext.tsx
"use client"
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

// Define the shape of your context
interface PlayerContextType {
  videoId: string;
  setVideoId: (videoId: string) => void;
  playlist: string[]; // Array of videoIds in the playlist
  currentSongIndex: number;
  playNextSong: () => void;
  setPlaylist: (playlist: string[]) => void;
}

// Create the context
const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

// Custom hook to use the PlayerContext
export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
};

// Define the props for the PlayerProvider component
interface PlayerProviderProps {
  children: ReactNode; // Define children prop type
}

// Create the PlayerProvider component
export const PlayerProvider: React.FC<PlayerProviderProps> = ({ children }) => {
  const [playlist, setPlaylist] = useState<string[]>([]);
  const [videoId, setVideoId] = useState<string>(""); // Initialize with an empty string
  const [currentSongIndex, setCurrentSongIndex] = useState<number>(0);

  useEffect(() => {
    const lastVidId = window.localStorage.getItem("LastVidId");
    if (lastVidId) {
      setVideoId(lastVidId); // Set videoId from local storage
    } else {
      setVideoId("Tb3x5I0ulCg"); // Set default videoId
    }
  }, []); // This will run only once on mount

  const playNextSong = () => {
    if (currentSongIndex < playlist.length - 1) { // Check to prevent out-of-bounds error
      const nextIndex = currentSongIndex + 1;
      setCurrentSongIndex(nextIndex);
      setVideoId(playlist[nextIndex]);
    }
  };

  return (
    <PlayerContext.Provider
      value={{ videoId, setVideoId, playlist, setPlaylist, currentSongIndex, playNextSong }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
