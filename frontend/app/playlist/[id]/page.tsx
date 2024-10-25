'use client'

import React, { useEffect, useState } from "react"
import axios from "axios"
import { usePlayer } from "@/components/contexts/PlayerContext"
import SkeletonLoading from "@/components/loaders/PlaylistLoading"
import { motion } from "framer-motion"

interface Song {
  title: string
  videoId: string
  thumbnail: {
    default: { url: string; width: number; height: number }
    medium: { url: string; width: number; height: number }
    high: { url: string; width: number; height: number }
    standard: { url: string; width: number; height: number }
    maxres: { url: string; width: number; height: number }
  }
}

export default function SongDetails({
  params,
  searchParams,
}: {
  params: { id: string }
  searchParams: { title: string }
}) {
  const [songs, setSongs] = useState<Song[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [playlistTitle, setPlaylistTitle] = useState<string>("")
  const [playlistImage, setPlaylistImage] = useState<string>("")

  const { setVideoId, setPlaylist } = usePlayer()

  const handleVideoSelect = (videoId: string) => {
    setVideoId(videoId)
  }

  useEffect(() => {
    const fetchSongDetails = async () => {
      try {
        const response = await axios.get<Song[]>(
          `${process.env.NEXT_PUBLIC_URL}/api/songs/${params.id}`
        )
        const TrackResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_URL}/api/playlist/homeplaylists`,
          {
            playlistIds: [`${params.id}`],
          }
        )

        setPlaylistImage(TrackResponse.data[0].thumbnails?.maxres?.url)
        setSongs(response.data)
        const videoIds = response.data.map((song) => song.videoId)
        setPlaylist(videoIds)
        setLoading(false)
      } catch (error) {
        setError("Failed to fetch song details")
        console.error(error)
        setLoading(false)
      }
    }
    fetchSongDetails()

    setPlaylistTitle(searchParams.title.split(" ").slice(0, 6).join(" "))
  }, [params.id, searchParams.title, setPlaylist])

  if (loading) {
    return (
      <div className="z-50 flex flex-col max-h-[calc(100vh-8rem)] min-h-[calc(100vh-8rem)] w-full md:bg-secondary rounded-md md:rounded-3xl md:p-4">
        <SkeletonLoading count={20} />
      </div>
    )
  }

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  const truncateTitle = (title: string, maxLength: number) => {
    if (title.length > maxLength) {
      return title.slice(0, maxLength) + "..."
    }
    return title
  }

  return (
    <div className="flex flex-col max-h-[calc(100vh-8rem)] min-h-[calc(100vh-8rem)] md:bg-secondary rounded-md md:rounded-3xl md:p-4">
      <div className="overflow-y-auto">
        <div className="flex flex-col items-center text-xl text-muted-foreground font-semibold font-sans mb-2 px-2 shadow-lg">
          <img
            src={playlistImage}
            alt={playlistTitle}
            className="h-32 w-32 object-cover rounded-lg"
          />
          <h1 className="text-muted-foreground text-base md:text-xl mt-2 md:mt-0 self-start">
            {playlistTitle}
          </h1>
        </div>
        {songs.map((song) => (
          <motion.div
            whileHover={{
              scale: 1.03,
              transition: { duration: 0.01 },
            }}
            whileTap={{ scale: 0.9 }}
            key={song.videoId}
            onClick={() => handleVideoSelect(song.videoId)}
            className="flex items-center p-2 cursor-pointer transition duration-200 ease-in-out md:bg-accent rounded-xl md:m-2"
          >
            <img
              src={song.thumbnail.high.url}
              alt={song.title}
              className="w-16 h-12 md:w-20 md:h-16 rounded-lg object-cover"
            />
            <div className="ml-4">
              <h3 className="text-xs md:text-base font-semibold font-sans">
                {truncateTitle(song.title, 60)}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}