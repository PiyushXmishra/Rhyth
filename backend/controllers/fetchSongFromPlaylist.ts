import axios from "axios";

export const fetchSongsFromPlaylist = async (playlistId: string) => {
    const songs: Array<{ title: string; videoId: string; thumbnail: string }> = [];

    const response = await axios.get(`https://www.googleapis.com/youtube/v3/playlistItems`, {
        params: {
            part: 'snippet',
            playlistId: playlistId,
            maxResults: 500,
            key: process.env.YOUTUBE_API_KEY,
        },
    });
    
    response.data.items.forEach((item: any) => {
        songs.push({
            title: item.snippet.title,
            videoId: item.snippet.resourceId.videoId,
            thumbnail: item.snippet.thumbnails, // Change this to the default thumbnail
        });
    });

    return songs;
};