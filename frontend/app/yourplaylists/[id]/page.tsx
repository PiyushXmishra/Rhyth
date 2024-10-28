"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Page({ params }: { params: { id: string } }) {
  const [songs, setSongs] = useState<any[]>([]); // State to hold the songs
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState<string | null>(null); // State to manage errors

  // Get the playlistId from params
  const playlistId = params.id;

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        // Fetch the songs from the updated API endpoint
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_URL}/api/playlist/getsongsofuserplaylist/${playlistId}`,
          {},
          {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true, // Include credentials (cookies)
          }
        );

        // Set the songs with video details directly
        setSongs(response.data); // Now response.data contains detailed song objects
      } catch (err: any) {
        setError(err.message); // Set the error message if any error occurs
      } finally {
        setLoading(false); // Set loading to false after the fetch
      }
    };

    fetchSongs(); // Call the fetch function
  }, [playlistId]); // Run effect when playlistId changes

  // Render loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render error state
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Render the list of songs
  return (
    <div>
      <h2>Songs in Playlist</h2>
      <ul>
        {songs.map((song) => (
          <li key={song.videoId} className="flex items-center mb-4">
            <img src={song.thumbnail} alt={song.title} className="w-16 h-16 mr-2" />
            <div>
              <h3 className="font-semibold">{song.title}</h3>
              {/* You can add more details if needed */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Page;
