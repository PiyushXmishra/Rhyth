'use client'

import React, { useEffect, useRef, useState } from "react"
import YouTube from "react-youtube"
import { usePlayer } from "../contexts/PlayerContext"
import StickyControls from "../controls/StickyControls"
import { motion } from "framer-motion"
import { usePlayerControl } from "../contexts/ControlContext"

export default function YoutubePlayer() {
  const { isPlaying, setIsPlaying, elapsedTime, setElapsedTime, duration, setDuration, onSeekChange } = usePlayerControl()
  const playerRef = useRef<YT.Player | null>(null)
  const [volume, setVolume] = useState(100)
  const [isMuted] = useState(true)
  const [isPlayerReady, setIsPlayerReady] = useState(false)
  const [hidden, setHidden] = useState(false)
  const { playNextSong, videoId } = usePlayer()
  const [currentVideoId, setCurrentVideoId] = useState(videoId)

  console.log("Current videoId:", videoId)

  const opts = {
    height: "303.75",
    width: "540",
    playerVars: {
      autoplay: 1,
      controls: 0,
      mute: 0,
      rel: 0,
    },
  }

  const onReady = (event: YT.PlayerEvent) => {
    playerRef.current = event.target
    playerRef.current.setVolume(volume)
    playerRef.current.playVideo()
    setIsPlayerReady(true)
    console.log("Player ready, videoId:", currentVideoId)
  }

  const onStateChange = (event: YT.OnStateChangeEvent) => {
    if (event.data === YouTube.PlayerState.PLAYING) {
      setIsPlaying(true)
      setIsPlayerReady(true)
      console.log("Video playing, videoId:", currentVideoId)
    } else if (event.data === YouTube.PlayerState.PAUSED) {
      setIsPlaying(false)
    } else if (event.data === YouTube.PlayerState.ENDED) {
      setIsPlaying(false)
      playNextSong()
    } else if (event.data === YouTube.PlayerState.UNSTARTED) {
      setIsPlayerReady(false)
      console.log("Video unstarted")
    }
  }

  useEffect(() => {
    if (videoId !== currentVideoId) {
      console.log("VideoId changed from", currentVideoId, "to", videoId)
      setCurrentVideoId(videoId)
      setIsPlayerReady(false)
      if (playerRef.current) {
        playerRef.current.loadVideoById(videoId)
      }
    }
  }, [videoId, currentVideoId])

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.setVolume(volume)
      console.log(`Volume set to ${volume}`)
    }
  }, [volume])

  useEffect(() => {
    const interval = setInterval(() => {
      if (playerRef.current && isPlayerReady) {
        const currentTime = playerRef.current.getCurrentTime()
        setElapsedTime(currentTime)
        setDuration(playerRef.current.getDuration())
      }
    }, 100)

    return () => clearInterval(interval)
  }, [setElapsedTime, setDuration, isPlayerReady])

  const handlePlayPause = () => {
    if (isPlaying) {
      playerRef.current?.pauseVideo()
      setIsPlaying(false)
    } else {
      playerRef.current?.playVideo()
      setIsPlaying(true)
    }
  }

  useEffect(() => {
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.playVideo()
      } else {
        playerRef.current.pauseVideo()
      }
    }
  }, [isPlaying])

  const handleSeekChange = (seekTime: number) => {
    if (!playerRef.current || !isPlayerReady) {
      console.log('YouTube player not ready yet')
      return
    }
    try {
      playerRef.current.seekTo(seekTime, true)
      onSeekChange(seekTime)
    } catch (error) {
      console.error("Error seeking video:", error)
    }
  }

  useEffect(() => {
    if (playerRef.current && isPlayerReady) {
      try {
        if (Math.abs(playerRef.current.getCurrentTime() - elapsedTime) > 1) {
          handleSeekChange(elapsedTime)
        }
      } catch (error) {
        console.error("Error handling elapsed time change:", error)
      }
    }
  }, [elapsedTime, isPlayerReady])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement
      const isInputField =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable

      if (!isInputField && event.code === "Space") {
        event.preventDefault()
        handlePlayPause()
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isPlaying])

  function ToggleOnlyMusic(): void {
    setHidden(!hidden)
  }

  return (
    <div className="flex flex-col items-start lg:bg-accent w-max rounded-2xl">
      <motion.div
        className="hidden lg:flex"
        initial={{ height: "303.75px", opacity: 1 }}
        animate={{
          height: hidden ? 0 : "303.75px",
          opacity: hidden ? 0 : 1,
        }}
        transition={{
          duration: 0.4,
          ease: "easeInOut",
        }}
        style={{ position: "relative", width: "540px", overflow: "hidden" }}
      >
        <YouTube
          key={currentVideoId}
          iframeClassName="rounded-xl"
          videoId={currentVideoId}
          opts={opts}
          onReady={onReady}
          onStateChange={onStateChange}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: isPlaying
              ? "rgba(255, 255, 255, 0)"
              : "rgba(255, 255, 255, 0.01)",
            backdropFilter: isPlaying ? "none" : "blur(15px)",
            pointerEvents: "all",
          }}
          className="rounded-xl"
        />
      </motion.div>

      <StickyControls
        volume={volume}
        onVolumeChange={setVolume}
        onHide={ToggleOnlyMusic}
      />
    </div>
  )
}