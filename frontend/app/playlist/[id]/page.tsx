'use client'

import React, { useEffect, useState } from "react"
import axios from "axios"
import { usePlayer } from "@/components/contexts/PlayerContext"
import SkeletonLoading from "@/components/loaders/PlaylistLoading"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils";
import { DotPattern } from "@/components/ui/dot-pattern";
import { EllipsisVertical } from "lucide-react"
import { Dropdown } from "@/components/controls/DownloadButton"

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
      <div className=" flex flex-col h-full w-full rounded-md lg:rounded-3xl lg:p-4">
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
    <div className="flex flex-col h-full rounded-md lg:rounded-3xl w-full">
      <div className="overflow-y-auto relative">
     
        <div className="flex flex-col items-center text-xl text-muted-foreground  font-bold mb-2 p-2 h-max">
        <DotPattern
        className={cn(
          "[mask-image:radial-gradient(green,transparent)] inset-auto h-max -z-10 ",
        )}
      />
          <img
            src={playlistImage}
            alt={playlistTitle}
            className="h-48 object-contain rounded-xl "
          />
          <h1 className="text-white shadow-lg underline underline-offset-4 decoration-muted-foreground text-base lg:text-xl mt-4 self-start">
            {playlistTitle}
          </h1>
        </div>
        {songs.map((song) => (
          <motion.div
            whileHover={{
              scale: 1.01,
              transition: { duration: 0.01 },
            }}
            whileTap={{ scale: 0.9 }}
            key={song.videoId}
            className="flex items-center p-2 cursor-pointer transition duration-200 ease-in-out  rounded-xl lg:m-2 justify-between"
          >
            <div className="flex items-center " onClick={() => handleVideoSelect(song.videoId)}>
            <img
              src={song.thumbnail.high.url}
              alt={song.title}
              className="w-16 h-12 lg:w-20 lg:h-16 rounded-lg object-cover"
            />
            <div className="mx-4 lg:ml-4">
              <h3 className="text-xs lg:text-base  font-bold  ">
                {truncateTitle(song.title, 60)}
              </h3>
            </div>
            </div>
            <div className="flex">
            <Dropdown videoId={song.videoId} videoTitle={song.title}/>
              </div>
          </motion.div>
        ))}
      </div>
  </div>
  )
}