"use client"

import React from 'react'
import { Slider } from "@/components/ui/slider"

interface SeekBarProps {
  elapsedTime: number
  duration: number
  onSeekChange: (value: number) => void
}

export default function SeekBar({ elapsedTime, duration, onSeekChange }: SeekBarProps) {
  return (
    <div className=" items-center flex space-x-4">
       {/* <div className="flex justify-between text-sm text-muted-foreground">
        
        
      </div> */}
      <span>{formatTime(elapsedTime)}</span>
      <Slider
        value={[elapsedTime]}
        min={0}
        max={duration}
        step={5}
        onValueChange={(value: number[]) => onSeekChange(value[0])}
        className="flex items-center min-w-[160px]"
      />
     <span>{formatTime(duration)}</span>
    </div>
  )
}

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}