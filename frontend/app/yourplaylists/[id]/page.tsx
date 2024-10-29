"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import SkeletonLoading from '@/components/loaders/SearchLoader';
import { usePlayer } from '@/components/contexts/PlayerContext';
import { useToken } from '@/components/contexts/TokenContext'; // Import your TokenContext

function Page({ params }: { params: { id: string } }) {
  const [songs, setSongs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { setVideoId } = usePlayer();
  const { sessionToken } = useToken(); // Get the session token from context
  const playlistId = params.id;

  useEffect(() => {
    console.log(sessionToken)
    const fetchSongs = async () => {
      try {
        // Set the session token in the headers for this request
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_URL}/api/playlist/getsongsofuserplaylist/${playlistId}`,
          {},
          {
            headers: {
              'Content-Type': 'application/json',
              ...(sessionToken ? { 'session-token': sessionToken } : {}), // Include token if available
            },
            withCredentials: true,
          }
        );
        setSongs(response.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, [playlistId, sessionToken]); // Added sessionToken to dependencies

  const truncateTitle = (title: string, maxLength: number) => {
    return title.length > maxLength ? title.slice(0, maxLength) + "..." : title;
  };

  const handleVideoSelect = (videoId: string) => {
    setVideoId(videoId);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col max-h-[calc(100vh-8rem)] min-h-[calc(100vh-8rem)] w-full lg:bg-secondary rounded-md lg:rounded-3xl pt-2 lg:p-4">
      <div className="flex flex-row justify-between text-xl text-white underline underline-offset-4 decoration-muted-foreground font-semibold font-sans mb-2 px-2">
        <h1 className="text-base lg:text-xl">Songs</h1>
      </div>
      <div className="h-full overflow-y-auto">
        {loading ? (
          <SkeletonLoading count={10} />
        ) : (
          songs.map((song, index) => (
            <motion.div
              whileHover={{
                scale: 1.03,
                transition: { duration: 0.01 },
              }}
              whileTap={{ scale: 0.9 }}
              key={index}
              className="flex items-center p-2 cursor-pointer transition duration-200 ease-in-out lg:bg-accent rounded-xl lg:m-2 justify-between"
            >
              <div className="flex items-center w-full" onClick={() => handleVideoSelect(song.videoId)}>
                <img
                  src={song.thumbnail}
                  alt={song.title}
                  className="w-16 h-12 lg:w-20 lg:h-16 rounded-lg object-cover"
                />

                <div className="ml-4 mr-2 lg:ml-4 lg:mr-0">
                  <h3 className="text-xs lg:text-base font-semibold font-sans">
                    {truncateTitle(song.title, 60)}
                  </h3>
                  {/* Optional: display additional song info, e.g., artist */}
                  {/* <p className="text-xs font-sans font-semibold text-muted-foreground">{song.artist}</p> */}
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}

export default Page;
