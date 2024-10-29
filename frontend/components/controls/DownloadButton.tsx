import {
  Download,
  EllipsisVertical,
  ListMusic,
  PlusCircle,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useEffect, useState } from "react";
import axios from "axios";
import { useToken } from '@/components/contexts/TokenContext'; // Import your TokenContext

export function Dropdown({ videoId, videoTitle }: { videoId: string; videoTitle: string }) {
  const { sessionToken } = useToken(); // Get the session token from context
  const [playlists, setPlaylists] = useState<any[]>([]); // State to hold playlists
  const [loading, setLoading] = useState(true); // State to manage loading state

  // Function to handle downloading the song
  const DownloadSong = async (videoId: string) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_SONG_DOWNLAOD_URL}/${videoId}`, {
        responseType: 'blob',
        headers: {
          'ngrok-skip-browser-warning': 'true', // Set the custom header
        },
      });
      const url = URL.createObjectURL(response.data);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${videoTitle}.m4a`; // or appropriate file name
      link.click();
      URL.revokeObjectURL(url); // Clean up
    } catch (error) {
      console.error("Download error:", error);
    }
  };

  // Fetch playlists when the dropdown is opened
  const fetchPlaylists = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/playlist/getplaylist`, {
        withCredentials: true,
        headers: {
          'session-token': sessionToken || '', // Include session token if available
        },
      });
      setPlaylists(response.data); // Assuming the response contains the playlists
    } catch (error) {
      console.error("Error fetching playlists:", error);
    } finally {
      setLoading(false); // Set loading to false after the fetch
    }
  };

  // Function to handle adding the song to a playlist
  const addToPlaylist = async (playlistId: number) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/api/playlist/addsongtoplaylist/${playlistId}`,
        { videoId },
        {
          withCredentials: true, // Include credentials for auth
          headers: {
            'session-token': sessionToken || '', // Include session token if available
          },
        }
      );

      if (response.status === 200) {
        console.log("Song added to playlist successfully!");
      }
    } catch (error) {
      console.error("Error adding song to playlist:", error);
    }
  };

  return (
    <DropdownMenu onOpenChange={fetchPlaylists}>
      <DropdownMenuTrigger asChild>
        <EllipsisVertical className="fill-white" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => DownloadSong(videoId)}>
            <Download />
            <span className="ml-2">Download Song</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <ListMusic />
              <span className="ml-2">Add to Playlist</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                {loading ? (
                  <DropdownMenuItem disabled>
                    Loading playlists...
                  </DropdownMenuItem>
                ) : (
                  playlists.map((playlist) => (
                    <DropdownMenuItem key={playlist.id} onClick={() => addToPlaylist(playlist.id)}>
                      <PlusCircle />
                      <span className="ml-2">{playlist.name}</span>
                    </DropdownMenuItem>
                  ))
                )}
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
