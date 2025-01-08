// src/context/TracksContext.tsx
"use client"
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

interface Track {
    id: string;   // Track ID
    name: string; // Track name
    thumbnails: {
      default?: { url: string; width: number; height: number };
      medium?: { url: string; width: number; height: number };
      high?: { url: string; width: number; height: number };
      standard?: { url: string; width: number; height: number };
      maxres?: { url: string; width: number; height: number };
    };
  }

// Define the type for the context
interface TracksContextType {
  tracks: Track[]; // State to hold track data
  loading: boolean; // Loading state
}

// Create a context
const TracksContext = createContext<TracksContextType | undefined>(undefined);

// Define track IDs outside of the component
const trackIds = [
  "RDCLAK5uy_n9Fbdw7e6ap-98_A-8JYBmPv64v-Uaq1g",
  "RDEMj0weLcfSL_fmHFYGkc7UEQ",
  "PL9bw4S5ePsEG_nRuruWzLzfXeqNIWOtHe",
  "RDCLAK5uy_kuo_NioExeUmw07dFf8BzQ64DFFTlgE7Q",
  "PLO7-VO1D0_6M1xUjj8HxTxskouWx48SNw",
  "RDCLAK5uy_lj-zBExVYl7YN_NxXboDIh4A-wKGfgzNY"
];

export const TracksProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tracks, setTracks] = useState<Track[]>([]); // State to hold track data
  const [loading, setLoading] = useState<boolean>(true); // State to track loading status

  useEffect(() => {
    const fetchTrendingTracks = async () => {
      try {
        // Fetch only if tracks are empty
        if (tracks.length === 0) {
          const response = await axios.post<Track[]>(`${process.env.NEXT_PUBLIC_URL}/api/playlist/homeplaylists`, {
            playlistIds: trackIds
          });
          setTracks(response.data); // Set the tracks
        }
      } catch (error) {
        console.error('Failed to fetch tracks:', error);
      } finally {
        setLoading(false); // Ensure loading is set to false after the API call
      }
    };

    fetchTrendingTracks();
  }, [tracks.length]); // Run only if tracks length is 0

  return (
    <TracksContext.Provider value={{ tracks, loading }}>
      {children}
    </TracksContext.Provider>
  );
};

// Custom hook to use TracksContext
export const useTracks = () => {
  const context = useContext(TracksContext);
  if (!context) {
    throw new Error('useTracks must be used within a TracksProvider');
  }
  return context;
};
