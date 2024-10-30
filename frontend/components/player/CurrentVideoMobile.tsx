"use client"

import React, { useEffect, useState } from 'react'
import CurrentVideo from './CurrentVideo'
import { Button } from "@/components/ui/button"
import { usePlayer } from "../contexts/PlayerContext"
import Image from 'next/image'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import MobileWrapper from './MobileWrapper'
import PlayPauseButton from '../controls/PlayPauseButton'

interface SongInfo {
  title: string
  author_name: string
  thumbnail_url: string
}

function CurrentVideoMobile() {
  const { videoId } = usePlayer()
  const [songInfo, setSongInfo] = useState<SongInfo | null>(null)
  const [loading, setLoading] = useState(true)

  const truncateTitle = (title: string, maxLength: number) => {
    return title.length > maxLength ? `${title.slice(0, maxLength)}...` : title;
  };

  useEffect(() => {
    const fetchSongInfo = async () => {
      try {
        setLoading(true)
        const response = await axios.get(
          `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
        )
        setSongInfo(response.data)
        console.log(response.data)
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
        <div className="mx-auto w-full max-w-sm ">
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : songInfo ? (
            <div className="p-4 pb-0">
              <div className="space-y-4">
                <div className="flex flex-col items-center">
                  {songInfo.thumbnail_url && (
                    <img
                      src={songInfo.thumbnail_url.replace("hqdefault","maxresdefault")}
                      alt={songInfo.title}
                      className="rounded-xl pb-2 "
                    />
                  )}
                  <div>
                    <h2 className="font-semibold font-sans text-base "> {truncateTitle(songInfo.title, 70)}{" "}</h2>
                    <p className="text-sm text-muted-foreground">{songInfo.author_name}</p>
                  </div>
                </div>
                <div className='w-full justify-center flex'>
                  <div className='p-2 bg-secondary rounded-full'>
                <PlayPauseButton/>
                </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 pb-0 text-center text-muted-foreground">
              Failed to load video information.
            </div>
          )}
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline" className="w-full">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default CurrentVideoMobile