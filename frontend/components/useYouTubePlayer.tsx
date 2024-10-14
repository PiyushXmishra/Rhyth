// hooks/useYouTubePlayer.ts
"use client"
import { useEffect, useRef } from 'react';

export default function useYouTubePlayer(videoId: string) {
  const playerRef = useRef<YT.Player | null>(null);
  const userHasInteracted = useRef<boolean>(false); // Track user interaction

  useEffect(() => {
    // Load the YouTube IFrame API if it hasn't been loaded yet
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      window.document.body.appendChild(tag);
    }

    // Function called when the API is ready
    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player('player', {
        videoId,
        playerVars: {
          autoplay: 0, // Autoplay off initially
          controls: 0, // Hide YouTube default controls
          mute: 0, // Start unmuted
          rel: 0,
        },
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange,
        },
      });
    };

    const onPlayerReady = (event: YT.OnReadyEvent) => {
      triggerPlayWithDelay(event.target); // Trigger delayed play
    };

    const onPlayerStateChange = (event: YT.OnStateChangeEvent) => {
      if (event.data === YT.PlayerState.PLAYING) {
        userHasInteracted.current = true; // User has interacted
      }
    };

    // Function to play the video with a delay of 0.5 seconds
    const triggerPlayWithDelay = (player: YT.Player) => {
      setTimeout(() => {
        if (!userHasInteracted.current) {
          player.playVideo(); // Play the video
          player.unMute(); // Unmute the video
          userHasInteracted.current = true; // Prevent further triggering
        }
      }, 500); // 0.5-second delay
    };

    // Cleanup on component unmount
    return () => {
      if (playerRef.current) {
        playerRef.current.destroy(); // Destroy the player on unmount
      }
    };
  }, [videoId]);

  // Return player reference to control the player externally
  return {
    playerRef,
    playVideo: () => playerRef.current?.playVideo(),
    pauseVideo: () => playerRef.current?.pauseVideo(),
    setVolume: (volume: number) => {
      if (playerRef.current) {
        try {
          playerRef.current.setVolume(volume); // Ensure the method is called safely
        } catch (error) {
          console.error('Error setting volume:', error);
        }
      }
    },
  };
}
