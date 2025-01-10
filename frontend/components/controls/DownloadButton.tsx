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
import { useToken } from '@/components/contexts/TokenContext';

export function Dropdown({ videoId, videoTitle }: { videoId: string; videoTitle: string }) {
  const { sessionToken } = useToken(); 
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Function to handle downloading the song
  const DownloadSong = async (videoId: string) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_SONG_DOWNLAOD_URL}/${videoId}`, {
        responseType: 'blob',
        headers: {
          'ngrok-skip-browser-warning': 'true', 
        },
      });
      const url = URL.createObjectURL(response.data);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${videoTitle}.m4a`; 
      link.click();
      URL.revokeObjectURL(url); 
    } catch (error) {
      console.error("Download error:", error);
    }
  };

  const fetchPlaylists = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/playlist/getplaylist`, {
        withCredentials: true,
        headers: {
          'session-token': sessionToken || '', 
        },
      });
      setPlaylists(response.data); 
    } catch (error) {
      console.error("Error fetching playlists:", error);
    } finally {
      setLoading(false);
    }
  };

  const addToPlaylist = async (playlistId: number) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/api/playlist/addsongtoplaylist/${playlistId}`,
        { videoId },
        {
          withCredentials: true, 
          headers: {
            'session-token': sessionToken || '', 
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
