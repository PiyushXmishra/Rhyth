import axios from "axios";

export const fetchPlaylistInfo = async (playlistId: string) => {
    const response = await axios.get(`https://www.googleapis.com/youtube/v3/playlists?part=snippet&id=${playlistId}&key=${process.env.YOUTUBE_API_KEY}`);
    const playlistSnippet = response.data.items[0].snippet;
    return {
        title: playlistSnippet.title,
        thumbnails: playlistSnippet.thumbnails, 
    };
};