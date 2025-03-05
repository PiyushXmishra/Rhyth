"use client"
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

interface Track {
    id: string;  
    name: string; 
    thumbnails: {
      default?: { url: string; width: number; height: number };
      medium?: { url: string; width: number; height: number };
      high?: { url: string; width: number; height: number };
      standard?: { url: string; width: number; height: number };
      maxres?: { url: string; width: number; height: number };
    };
  }

interface TracksContextType {
  tracks: Track[]; 
  loading: boolean; 
}

const TracksContext = createContext<TracksContextType | undefined>(undefined);

const trackIds = [
  "RDCLAK5uy_n9Fbdw7e6ap-98_A-8JYBmPv64v-Uaq1g",
  "RDCLAK5uy_kuo_NioExeUmw07dFf8BzQ64DFFTlgE7Q",
  "RDCLAK5uy_lj-zBExVYl7YN_NxXboDIh4A-wKGfgzNY",
  "RDCLAK5uy_n17q7_2dwfDqWckpccDyTTkZ-g03jXuII",
  "RDCLAK5uy_mOvRWCE7v4C98UgkSVh5FTlD3osGjolas", 
  "RDCLAK5uy_mUvTtdERIHEiVAHIkV3GRndrY-H4M2nnA"
];

export const TracksProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tracks, setTracks] = useState<Track[]>([]); 
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTrendingTracks = async () => {
      try {
        if (tracks.length === 0) {
          const response = await axios.post<Track[]>(`${process.env.NEXT_PUBLIC_URL}/api/playlist/homeplaylists`, {
            playlistIds: trackIds
          });
          setTracks(response.data); 
        }
      } catch (error) {
        console.error('Failed to fetch tracks:', error);
      } finally {
        setLoading(false); 
      }
    };

    fetchTrendingTracks();
  }, [tracks.length]); 

  return (
    <TracksContext.Provider value={{ tracks, loading }}>
      {children}
    </TracksContext.Provider>
  );
};

export const useTracks = () => {
  const context = useContext(TracksContext);
  if (!context) {
    throw new Error('useTracks must be used within a TracksProvider');
  }
  return context;
};
