"use client"

import React, { useEffect, useState } from 'react'
import CurrentVideo from './CurrentVideo'
import { Button } from "@/components/ui/button"
import { usePlayer } from "../contexts/PlayerContext"

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "@/components/ui/drawer"
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import PlayPauseButton from '../controls/PlayPauseButton'
import SeekBar from '../controls/SeekBar'

interface SongInfo {
  title: string
  author_name: string
  thumbnail_url: string
}

function CurrentVideoMobile() {
  const { videoId } = usePlayer()
  const [songInfo, setSongInfo] = useState<SongInfo | null>(null)
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const truncateTitle = (title: string, maxLength: number) => {
    return title.length > maxLength ? `${title.slice(0, maxLength)}...` : title;
  }

  useEffect(() => {
    const fetchSongInfo = async () => {
      try {
        setLoading(true)
        const response = await axios.get(
          `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
        )
        setSongInfo(response.data)

        // Check if maxresdefault thumbnail is available
        const maxResUrl = response.data.thumbnail_url.replace("hqdefault", "maxresdefault")
        const img = new Image()
        img.src = maxResUrl
        img.onload = () => {
          if (img.width > 120) { // Assume placeholder is 120px width
            setThumbnailUrl(maxResUrl)
          } else {
            setThumbnailUrl(response.data.thumbnail_url) // fallback to hqdefault
          }
        }
        img.onerror = () => {
          setThumbnailUrl(response.data.thumbnail_url) // fallback to hqdefault
        }

      } catch (error) {
        console.error("Error fetching song info:", error)
        setSongInfo(null)
      } finally {
        setLoading(false)
      }
    }

    if (videoId) {
      fetchSongInfo()
      localStorage.setItem("LastVidId", videoId)
    }
  }, [videoId])

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <div className="cursor-pointer">
          <CurrentVideo />
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm pb-16">
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : songInfo ? (
            <div className="p-4 pb-0">
              <div className="space-y-4">
                <div className="flex flex-col ">
                  {thumbnailUrl && (
                    <img
                      src={thumbnailUrl}
                      alt={songInfo.title}
                      className="rounded-xl"
                    />
                  )}
                  <div className='pt-2'>
                    <h2 className="text-white text-base  font-bold  ">
                      {truncateTitle(songInfo.title, 70)}{" "}
                    </h2>
                    <p className="text-sm text-muted-foreground">By {songInfo.author_name}</p>
                  </div>
                </div>
                <div className="w-full flex-col justify-center flex">
                  <div className='flex py-4'>
                  <SeekBar/>
                  </div>
                  <div className="justify-center flex  rounded-full">
                    <div className='w-max bg-secondary rounded-full p-2'>
                    <PlayPauseButton/>
                    </div>
                    
                  </div>
                 
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 pb-0 text-center text-muted-foreground">
              Failed to load video information.
            </div>
          )}
       
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default CurrentVideoMobile
