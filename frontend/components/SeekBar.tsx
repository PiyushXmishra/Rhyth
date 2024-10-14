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
    <div className="w-full pt-2">
      <Slider
        value={[elapsedTime]}
        min={0}
        max={duration}
        step={5}
        onValueChange={(value: number[]) => onSeekChange(value[0])}
        className="w-full"
      />
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>{formatTime(elapsedTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  )
}

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}