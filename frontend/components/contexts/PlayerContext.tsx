// PlayerContext.tsx
"use client"
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface PlayerContextType {
  videoId: string;
  setVideoId: (videoId: string) => void;
  playlist: string[]; 
  currentSongIndex: number;
  playNextSong: () => void;
  setPlaylist: (playlist: string[]) => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
};

interface PlayerProviderProps {
  children: ReactNode; 
}

export const PlayerProvider: React.FC<PlayerProviderProps> = ({ children }) => {
  const [playlist, setPlaylist] = useState<string[]>([]);
  const [videoId, setVideoId] = useState<string>("");
  const [currentSongIndex, setCurrentSongIndex] = useState<number>(0);

  useEffect(() => {
    const lastVidId = window.localStorage.getItem("LastVidId");
    if (lastVidId) {
      setVideoId(lastVidId);
    } else {
      setVideoId("liTfD88dbCo"); 
    }
  }, []);

  const playNextSong = () => {
    if (currentSongIndex < playlist.length - 1) { 
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
