"use client"

import React, { useState } from 'react'
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Volume2, VolumeX } from "lucide-react"

interface VolumeControlProps {
  volume: number
  onVolumeChange: (value: number) => void
}

export default function VolumeControl({ volume, onVolumeChange }: VolumeControlProps) {
  const [lastVolume, setLastVolume] = useState<number>(volume)
  const [isMuted, setIsMuted] = useState<boolean>(volume === 0)
  const [isHovered, setIsHovered] = useState<boolean>(false)

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
    <div 
      className="flex items-center space-x-2 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={handleVolumeClick}
        className="hover:bg-secondary"
      >
        {isMuted ? (
          <VolumeX className="h-6 w-6" />
        ) : (
          <Volume2 className="h-6 w-6" />
        )}
        <span className="sr-only">{isMuted ? 'Unmute' : 'Mute'}</span>
      </Button>
      <div 
        className={`transition-all duration-700 ease-in-out ${
          isHovered ? 'w-[100px] opacity-100' : 'w-0 opacity-0'
        }`}
      >
        <Slider
          min={0}
          max={100}
          step={1}
          value={[isMuted ? 0 : volume]}
          onValueChange={handleSliderChange}
          className="w-[100px]"
        />
      </div>
    </div>
  )
}