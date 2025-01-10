'use client'

import React, { useEffect, useRef, useState } from "react"
import YouTube from "react-youtube"
import { usePlayer } from "../contexts/PlayerContext"
import StickyControls from "../controls/StickyControls"
import { motion } from "framer-motion"
import { usePlayerControl } from "../contexts/ControlContext"

const getLast5Songs = () => {
  const storedSongs = localStorage.getItem('last5Songs');
  return storedSongs ? JSON.parse(storedSongs) : [];
}

const setLast5Songs = (songs: any) => {
  localStorage.setItem('last5Songs', JSON.stringify(songs));
}

export default function YoutubePlayer() {
  const { isPlaying, setIsPlaying, elapsedTime, setElapsedTime, duration, setDuration, onSeekChange, volume, hidden, isFullscreen } = usePlayerControl()
  const playerRef = useRef<YT.Player | null>(null)
  const [isMuted] = useState(true)
  const [isPlayerReady, setIsPlayerReady] = useState(false)
  const { playNextSong, videoId } = usePlayer()
  const [currentVideoId, setCurrentVideoId] = useState(videoId)

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
    const updateLast5Songs = (newVideoId: string) => {
      const currentSongs = getLast5Songs();
      if (currentSongs.includes(newVideoId)) {
        console.log(`Video ID ${newVideoId} already exists in the last 5 songs.`);
        return; 
      }
      currentSongs.unshift(newVideoId);
      if (currentSongs.length > 6) {
        currentSongs.pop();
      }
      setLast5Songs(currentSongs);
    };

    if (videoId !== currentVideoId) {
      console.log("VideoId changed from", currentVideoId, "to", videoId);
      updateLast5Songs(videoId);

      setCurrentVideoId(videoId)
      setElapsedTime(0)
      setIsPlayerReady(false)
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
        console.log(currentTime)
        setDuration(playerRef.current.getDuration())
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [setElapsedTime, setDuration, isPlayerReady])

  const handlePlayPause = () => {
    if (isPlaying && isPlayerReady) {
      playerRef.current.pauseVideo()
      setIsPlaying(false)
    } else {
      playerRef.current?.playVideo()
      setIsPlaying(true)
    }
  }

  useEffect(() => {
    if (!playerRef.current || !isPlayerReady) {
      console.log('YouTube player not ready yet')
      return
    }

    try {
      if (playerRef.current && isPlayerReady) {
        if (isPlaying) {
          playerRef.current.playVideo()
        } else {
          playerRef.current.pauseVideo()
        }
      }
    } catch (error) {
      console.error("Error playing / pausing video:", error)
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

  useEffect(() => {
    const iframe = playerRef.current?.getIframe();
    const handleFullscreen = () => {
      if (isFullscreen && iframe) {
        if (iframe.requestFullscreen) {
          iframe.requestFullscreen();
        } else if (iframe?.mozRequestFullScreen) {
          iframe?.mozRequestFullScreen(); // Firefox
        } else if (iframe?.webkitRequestFullscreen) {
          iframe?.webkitRequestFullscreen(); // Chrome and Safari
        } else if (iframe?.msRequestFullscreen) {
          iframe?.msRequestFullscreen(); // Edge
        }
      } else {
        if (document.fullscreenElement) {
          document.exitFullscreen();
        } else if ((document as any).mozCancelFullScreen) {
          (document as any).mozCancelFullScreen(); // Firefox
        } else if ((document as any).webkitExitFullscreen) {
          (document as any).webkitExitFullscreen(); // Chrome, Safari
        } else if ((document as any).msExitFullscreen) {
          (document as any).msExitFullscreen(); // Edge
        }
      }
    };
    handleFullscreen();
    return () => {
        document.removeEventListener("fullscreenchange", handleFullscreen);
    };
  }, [isFullscreen]);

  return (
    <div className="hidden lg:flex bg-card flex-col items-start  w-max ">
      <motion.div
        className="hidden lg:flex pointer-events-none"
        initial={{ width: "540px", opacity: 1 }}
        animate={{
          width: hidden ? 0 : "540px",
          opacity: hidden ? 0 : 1,
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        style={{ position: "relative", width: "540px", overflow: "hidden" }}
      >
        <YouTube
          key={currentVideoId}
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
        />
      </motion.div>

    </div>
  )
}
