"use client"

import React from 'react'
import { Slider } from "@/components/ui/slider"
import { usePlayerControl } from '../contexts/ControlContext'
interface SeekBarProps {
  elapsedTime: number
  duration: number
  onSeekChange: (value: number) => void
}

export default function SeekBar() {
  const {elapsedTime ,duration , onSeekChange } = usePlayerControl();
  return (
    <div className=" items-center w-full ">
      <div className='flex space-x-4 justify-center' >
      <span>{formatTime(elapsedTime)}</span>
      <Slider
        value={[elapsedTime]}
        min={0}
        max={duration}
        step={5}
        onValueChange={(value: number[]) => onSeekChange(value[0])}
        className="flex items-center lg:max-w-[220px] lg:min-w-[180px]"
      />
     <span>{formatTime(duration)}</span>
     </div>
    </div>
  )
}

const formatTime = (time: number) => {
  if (isNaN(time) || time < 0) {
    return "0:00"; // Fallback for invalid time
  }
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}