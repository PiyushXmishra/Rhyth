"use client";
import React, { useEffect, useRef, useState } from 'react';
import YouTube from 'react-youtube';
import StickyControls from './sliderFooter'; // Assuming you have this component

const YoutubePlayer: React.FC<{ videoId: string }> = ({ videoId }) => {
  //@ts-ignore
  const playerRef = useRef<YT.Player | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(100); // Default volume set to 100%
  const [elapsedTime, setElapsedTime] = useState(0); // Track elapsed time
  const [duration, setDuration] = useState(0); // Track video duration
  const [isMuted, setIsMuted] = useState(true); // State to track muting

  // YouTube player options with 16:9 aspect ratio
  const opts = {
    height: '303.75', // Maintain 16:9 ratio
    width: '540', // Base width
    playerVars: {
      autoplay: 1, // Autoplay enabled
      controls: 0, // Hide YouTube default controls
      mute: 1, // Start muted
      rel: 0,
    },
  };

  // Handle player ready
  const onReady = (event: any) => {
    playerRef.current = event.target;
    playerRef.current.setVolume(volume);
    playerRef.current.playVideo(); // Start video on load
    console.log("Player is ready. Video started playing.");
  };

  // Handle state change
  const onStateChange = (event: any) => {
    if (event.data === YouTube.PlayerState.PLAYING) {
      setIsPlaying(true);
      console.log("Video is now playing.");
    } else if (event.data === YouTube.PlayerState.PAUSED) {
      setIsPlaying(false);
      console.log("Video is paused.");
    } else if (event.data === YouTube.PlayerState.ENDED) {
      setIsPlaying(false);
      console.log("Video has ended.");
    }
  };

  // Update volume
  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.setVolume(volume);
      console.log(`Volume set to ${volume}`);
    }
  }, [volume]);

  // Update elapsed time and duration
  useEffect(() => {
    const interval = setInterval(() => {
      if (playerRef.current) {
        const currentTime = playerRef.current.getCurrentTime();
        setElapsedTime(currentTime);
        setDuration(playerRef.current.getDuration());
        console.log(`Elapsed time: ${currentTime}, Duration: ${duration}`);

        // Unmute the video if elapsed time is greater than 0.1 seconds (100 ms)
        if (isMuted && currentTime > 0.1) {
          playerRef.current.unMute();
          setIsMuted(false); // Update the mute state
          console.log("Video unmuted after elapsed time exceeded 100 ms.");
        }
      }
    }, 100); // Update every 100 ms

    return () => clearInterval(interval);
  }, [isMuted]); // Depend on isMuted to re-run when it changes

  // Play/Pause video
  const handlePlayPause = () => {
    if (isPlaying) {
      playerRef.current.pauseVideo();
      setIsPlaying(false);
      console.log("Video paused by user.");
    } else {
      playerRef.current.playVideo();
      setIsPlaying(true); // Update state when playing
      console.log("Video played by user.");
    }
  };

  // Handle seek bar change
  const handleSeekChange = (seekTime: number) => {
    if (playerRef.current) {
      playerRef.current.seekTo(seekTime, true);
      setElapsedTime(seekTime); // Update elapsed time state
      console.log(`Seeked to: ${seekTime}`);
    }
  };

  // Keyboard control for play/pause
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      const isInputField =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable;

      if (!isInputField && event.code === "Space") {
        event.preventDefault(); // Prevent spacebar from scrolling the page
        handlePlayPause();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isPlaying]); // Re-run this effect when play state changes

  return (
    <div className="flex flex-col items-start bg-accent pb-3 w-max rounded-2xl gap-y-5" style={{ width: "540px" }}>
      {/* YouTube Video */}
      <div style={{ position: 'relative', width: '540px', height: '303.75px' }}>
        <YouTube
          iframeClassName="rounded-xl"
          videoId={videoId}
          opts={opts}
          onReady={onReady}
          onStateChange={onStateChange}
        />

        {/* Transparent Overlay to Disable Interaction */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '303.75px',
            backgroundColor: isPlaying ? 'rgba(255, 255, 255, 0)' : 'rgba(255, 255, 255, 0.01)', // Change background based on isPlaying
            backdropFilter: isPlaying ? 'none' : 'blur(15px)', // Apply blur when not playing
            pointerEvents: 'all', // Capture all pointer events
          }} className='rounded-xl'
        />
      </div>

      {/* Sticky Controls */}
      <StickyControls
        isPlaying={isPlaying}
        elapsedTime={elapsedTime}
        duration={duration}
        volume={volume}
        onPlayPause={handlePlayPause}
        onSeekChange={handleSeekChange}
        onVolumeChange={setVolume}
      />
    </div>
  );
};

export default YoutubePlayer;
