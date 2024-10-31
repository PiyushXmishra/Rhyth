"use client";

import React, { useEffect, useRef, useState } from "react";
import YouTube from "react-youtube";
import { usePlayer } from "../contexts/PlayerContext";
import StickyControls from "../controls/StickyControls";
import { motion } from "framer-motion"; 
import { usePlayerControl } from "../contexts/ControlContext";
export default function YoutubePlayer({ videoId }: { videoId: string }) {
  const {isPlaying , setIsPlaying , elapsedTime ,setElapsedTime ,duration ,setDuration ,onSeekChange} = usePlayerControl();
  //@ts-ignore
  const playerRef = useRef<YT.Player | null>(null);
  const [volume, setVolume] = useState(100);
  const [isMuted] = useState(true);
  const [hidden, setHidden] = useState(false);
  const { playNextSong } = usePlayer();

  const opts = {
    height: "303.75",
    width: "540",
    playerVars: {
      autoplay: 1,
      controls: 0,
      mute: 0,
      rel: 0,
    },
  };

  const onReady = (event: any) => {
    playerRef.current = event.target;
    playerRef.current.setVolume(volume);
    playerRef.current.playVideo();
  };

  const onStateChange = (event: any) => {
    if (event.data === YouTube.PlayerState.PLAYING) {
      setIsPlaying(true);
    } else if (event.data === YouTube.PlayerState.PAUSED) {
      setIsPlaying(false);
    } else if (event.data === YouTube.PlayerState.ENDED) {
      setIsPlaying(false);
      playNextSong();
    }
  };

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.setVolume(volume);
      console.log(`Volume set to ${volume}`);
    }
  }, [volume]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (playerRef.current) {
        const currentTime = playerRef.current.getCurrentTime();
        setElapsedTime(currentTime);
        setDuration(playerRef.current.getDuration());
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isMuted]);

  const handlePlayPause = () => {
    if (isPlaying) {
      playerRef.current?.pauseVideo();
      setIsPlaying(false);
    } else {
      playerRef.current?.playVideo();
      setIsPlaying(true);
    }
  };
  useEffect(() => {
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.playVideo();
      } else {
        playerRef.current.pauseVideo();
      }
    }
  }, [isPlaying]);
  

  const handleSeekChange = (seekTime: number) => {
    if (playerRef.current) {
      playerRef.current.seekTo(seekTime, true);
      onSeekChange(seekTime);
    }
  };

  // Use useEffect to listen for changes in elapsedTime from the context
  useEffect(() => {
    if (playerRef.current && Math.abs(playerRef.current.getCurrentTime() - elapsedTime) > 1) {
      handleSeekChange(elapsedTime);
    }
  }, [elapsedTime]);

  

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      const isInputField =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable;

      if (!isInputField && event.code === "Space") {
        event.preventDefault();
        handlePlayPause();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isPlaying]);

  function ToggleOnlyMusic(): void {
    setHidden(!hidden);
  }

  return (
    <div
      className="flex flex-col items-start lg:bg-accent w-max rounded-2xl">
      <motion.div
      className="hidden lg:flex"
        initial={{ height: "303.75px", opacity: 1 }} // Initial state
        animate={{
          height: hidden ? 0 : "303.75px", // Animate height when hidden
          opacity: hidden ? 0 : 1, // Animate opacity
        }}
        transition={{
          duration: 0.4, 
          ease: "easeInOut",
        }}
        style={{ position: "relative", width: "540px", overflow: "hidden" }}
      >
        <YouTube
          iframeClassName="rounded-xl"
          videoId={videoId}
          opts={opts}
          onReady={onReady}
          onStateChange={onStateChange}
        />
        {/* Transparent Overlay */}
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

      {/* Sticky Controls */}
      <StickyControls
        volume={volume}
        onVolumeChange={setVolume}
        onHide={ToggleOnlyMusic}
      />
    </div>
  );
}
