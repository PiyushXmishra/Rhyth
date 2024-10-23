"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { X } from 'lucide-react';
import { usePlayer } from '@/components/contexts/PlayerContext';
import SkeletonLoading from '../../../components/loaders/PlaylistLoading';
import { motion } from 'framer-motion';
// Define a type for the song details
interface Song {
  title: string;
  videoId: string;
  thumbnail: {
    default: { url: string; width: number; height: number; };
    medium: { url: string; width: number; height: number; };
    high: { url: string; width: number; height: number; };
    standard: { url: string; width: number; height: number; };
    maxres: { url: string; width: number; height: number; };
  };
}

export default function SongDetails({ params, searchParams }: { params: { id: string }; searchParams: { title: string } }) {

  const [songs, setSongs] = useState<Song[]>([]); // State to hold song data
  const [loading, setLoading] = useState<boolean>(true); // State to track loading status
  const [error, setError] = useState<string | null>(null); // State to hold error message
  const [playlistTitle, setPlaylistTitle] = useState<string>(''); // State for playlist title
  const { setVideoId, setPlaylist } = usePlayer();

   // Function to handle video selection
   const handleVideoSelect = (videoId: string) => {
    setVideoId(videoId); // Update the video ID in the context
  };


  useEffect(() => {
    const fetchSongDetails = async () => {
      try {
        const response = await axios.get<Song[]>(`http://localhost:3000/api/songs/${params.id}`);
        setSongs(response.data);
        const videoIds = response.data.map(song => song.videoId);
        setPlaylist(videoIds); // Set playlist in context
        setLoading(false); // Set loading to false
      } catch (error) {
        setError('Failed to fetch song details'); // Set error message
        setLoading(false); // Set loading to false
      }
    };

    fetchSongDetails();

    // Set the playlist title from searchParams
    setPlaylistTitle(searchParams.title.split(' ').slice(0, 6).join(' ')); // Use searchParams instead of params
  }, [params.id, searchParams.title]); // Use searchParams.title in the dependency array

  // Loading state
  if (loading) {
    return (
      <div className="z-50 flex flex-col max-h-[calc(100vh-8rem)] min-h-[calc(100vh-8rem)] w-5/12 bg-secondary rounded-3xl p-4">
   <SkeletonLoading count={20}/>
    </div>
    );
  }

  // Error state
  if (error) {
    return <div>{error}</div>;
  }

  const truncateTitle = (title: string, maxLength: number) => {
    if (title.length > maxLength) {
      return title.slice(0, maxLength) + "...";
    }
    return title;
  };

  // Render song details
  return (
    <div className="z-50 flex flex-col max-h-[calc(100vh-8rem)] min-h-[calc(100vh-8rem)] w-5/12 bg-secondary rounded-3xl p-4">
      <div className="flex flex-row justify-between text-xl text-muted-foreground font-semibold mb-2 px-2">
        <h1 className='text-muted-foreground'>{playlistTitle}</h1> 
        <div className="flex items-center">
          <Link href={"/"}>
            <X className="cursor-pointer"/>
          </Link>
        </div>
      </div>
      <div className='overflow-y-auto'>
        {songs.map((song) => (
          <motion.div 
          whileHover={{
            scale: 1.03,
            transition: { duration: 0.01 },
          }}
          whileTap={{ scale: 0.9 }}
          key={song.videoId}  onClick={() => handleVideoSelect(song.videoId)}
               className="flex items-center p-2 cursor-pointer transition duration-200 ease-in-out bg-accent rounded-xl m-2">
            <img
              src={song.thumbnail.default.url}
              alt={song.title}
              className="w-20 h-16 rounded-lg object-cover" 
            />
            <div className="ml-4">
              <h3 className="text-md font-semibold">
                {truncateTitle(song.title, 60)} {/* Max 40 characters */}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
