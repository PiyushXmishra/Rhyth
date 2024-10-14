"use client";
import React, { useEffect, useRef, useState } from 'react';
import YouTube from 'react-youtube';
import SeekBar from './SeekBar';
import PlayPauseButton from './PlayPauseButton';
import VolumeControl from './VolumeControl';
import StickyControls from './sliderFooter';

const YoutubePlayer: React.FC<{ videoId: string }> = ({ videoId }) => {
  //@ts-ignore
  const playerRef = useRef<YT.Player | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(100); // Default volume set to 100%
  const [elapsedTime, setElapsedTime] = useState(0); // Track elapsed time
  const [duration, setDuration] = useState(0); // Track video duration

  // YouTube player options
  const opts = {
    height: '300',
    width: '540',
    playerVars: {
      autoplay: 1, // Autoplay off
      controls: 0, // Hide YouTube default controls
      mute: 0, // Start muted
      rel: 0,
    },
  };

  // Handle player ready
  const onReady = (event: any) => {
    playerRef.current = event.target;
    playerRef.current.setVolume(volume);
    playerRef.current.playVideo(); // Start video on load
    playerRef.current.getDuration(); // Get video duration
  };

  // Handle state change
  const onStateChange = (event: any) => {
    if (event.data === YouTube.PlayerState.PLAYING) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  };

  // Update volume
  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.setVolume(volume);
    }
  }, [volume]);

  // Update elapsed time and duration
  useEffect(() => {
    const interval = setInterval(() => {
      if (playerRef.current) {
        const currentTime = playerRef.current.getCurrentTime();
        setElapsedTime(currentTime);
        setDuration(playerRef.current.getDuration());
      }
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, []);

  // Play/Pause video
  const handlePlayPause = () => {
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  };

  // Handle seek bar change
  const handleSeekChange = (seekTime: number) => {
    playerRef.current.seekTo(seekTime, true);
    setElapsedTime(seekTime); // Update elapsed time state
  };

  return (
    <div className="flex flex-col items-start bg-accent pb-3 w-max rounded-2xl gap-y-5 " style={{width:"540px"}}>
      <YouTube
        iframeClassName="rounded-xl"
        videoId={videoId}
        opts={opts}
        onReady={onReady}
        onStateChange={onStateChange}
      />

      <StickyControls isPlaying={isPlaying} elapsedTime={elapsedTime} duration={duration} volume={volume} onPlayPause={handlePlayPause} onSeekChange={handleSeekChange} onVolumeChange={setVolume}/>

      
    </div>
  );
};

export default YoutubePlayer;
