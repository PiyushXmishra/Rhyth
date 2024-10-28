import axios from 'axios';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { PlusCircle } from "lucide-react"; // Importing PlusCircle icon for the button

type Playlist = {
  id: number;
  name: string;
};

function UserPlaylists() {
  const { data: session } = useSession();
  const [playlistName, setPlaylistName] = useState<string>('');
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [hasFetchedPlaylists, setHasFetchedPlaylists] = useState<boolean>(false);
  const [isCreatingPlaylist, setIsCreatingPlaylist] = useState<boolean>(false); // State to toggle input visibility

  // Function to create a new playlist
  async function createPlaylist() {
    if (session) {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_URL}/api/playlist/createplaylist`,
          { name: playlistName },
          { withCredentials: true }
        );
        setPlaylists((prev) => [...prev, response.data]); // Add the new playlist to the list
        setPlaylistName(''); // Reset input after creation
        setIsCreatingPlaylist(false); // Hide the input box after creation
      } catch (error) {
        console.error('Failed to create playlist', error);
      }
    }
  }

  // Fetch playlists only once when session is active
  useEffect(() => {
    if (session && !hasFetchedPlaylists) {
      const fetchPlaylists = async () => {
        try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/playlist/getplaylist`, {
            withCredentials: true,
          });
          setPlaylists(response.data);
          setHasFetchedPlaylists(true); // Prevents re-fetching playlists
        } catch (error) {
          console.error('Failed to fetch playlists');
        }
      };
      fetchPlaylists();
    }
  }, [session, hasFetchedPlaylists]); // Add hasFetchedPlaylists as a dependency

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Your Playlists</h2>
      
      {/* Playlists Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {playlists.length > 0 ? (
          playlists.map((playlist) => (
            <Link key={playlist.id} href={`/yourplaylists/${playlist.id}`}>
              <div className="p-4 border rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="text-lg font-medium">{playlist.name}</h3>
              </div>
            </Link>
          ))
        ) : (
          <p>No playlists available</p>
        )}
      </div>

      {/* Button to Create New Playlist */}
      <div className="flex items-center mb-4">
        <button 
          onClick={() => setIsCreatingPlaylist(!isCreatingPlaylist)} 
          className="flex items-center text-blue-500 hover:underline">
          <PlusCircle className="mr-2" />
          <span>{isCreatingPlaylist ? "Cancel" : "Create New Playlist"}</span>
        </button>
      </div>

      {/* Input to Create New Playlist */}
      {isCreatingPlaylist && (
        <div className="flex">
          <input
            type="text"
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
            placeholder="Enter playlist name"
            className="border rounded-lg p-2 flex-1 mr-2"
          />
          <button 
            onClick={createPlaylist} 
            className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 transition">
            Create
          </button>
        </div>
      )}
    </div>
  );
}

export default UserPlaylists;
