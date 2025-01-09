"use client"

import React, { useState } from 'react'
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Volume2, VolumeX } from "lucide-react"
import { usePlayerControl } from '../contexts/ControlContext'




export default function VolumeControl() {
  const {volume , onVolumeChange} = usePlayerControl();
  const [lastVolume, setLastVolume] = useState<number>(volume)
  const [isMuted, setIsMuted] = useState<boolean>(volume === 0)

  const handleVolumeClick = () => {
    if (isMuted) {
      onVolumeChange(lastVolume)
    } else {
      setLastVolume(volume)
      onVolumeChange(0)
    }
    setIsMuted(!isMuted)
  }

  const handleSliderChange = (newVolume: number[]) => {
    const volumeValue = newVolume[0]
    onVolumeChange(volumeValue)
    if (volumeValue > 0) {
      setIsMuted(false)
    }
  }


 return (
  <div className="flex items-center space-x-2">
    <button
      onClick={handleVolumeClick}    >
      {isMuted ? (
        <VolumeX size={20} />
      ) : (
        <Volume2 size={20} />
      )}
      <span className="sr-only">{isMuted ? 'Unmute' : 'Mute'}</span>
    </button>
    <div className="relative">
  
  <Slider
    min={0}
    max={100}
    step={1}
    value={[isMuted ? 0 : volume]}
    onValueChange={handleSliderChange}
    className="relative w-[100px] z-10 pointer-events-auto"
  />
</div>
  </div>
)
}