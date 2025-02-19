"use client"

import React, { useEffect, useState } from 'react'
import { Slider } from "@/components/ui/slider"
import { usePlayerControl } from '../contexts/ControlContext'
import axios from 'axios';
import { useToken } from '../contexts/TokenContext';
import { usePlayer } from '../contexts/PlayerContext';
import { useSession } from 'next-auth/react';
export default function SeekBar() {
  const {videoId} = usePlayer()
  const { data: session } = useSession();
  const { sessionToken } = useToken();
  const [isUpdated , setIsUpdated] = useState(false);

  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_URL,
  });

  axiosInstance.interceptors.request.use((config) => {
    if (sessionToken) {
      config.headers["session-token"] = sessionToken;
    }
    return config;
  });
    
  const {elapsedTime ,duration , onSeekChange } = usePlayerControl();
  const date = new Date;
  const istDateString = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(date);

  async function updatehistory(){
   
      await axiosInstance.post(`${process.env.NEXT_PUBLIC_URL}/api/users/updatehistory`, {
       videoId : videoId,
       listenedAt : istDateString
      })
      setIsUpdated(true)
     }

useEffect(() => {
 if((duration - elapsedTime) < 10 && duration > 0 && isUpdated == false && session ){
  updatehistory()
  setIsUpdated(true)
 }
}, [formatTime(elapsedTime) , videoId])

useEffect(() => {
 setIsUpdated(false)
}, [videoId])

  return (
    <div className=" items-center w-full ">
      <div className='flex space-x-2 justify-center' >
      <span className='text-xs'>{formatTime(elapsedTime)}</span>
      <Slider
        value={[elapsedTime]}
        min={0}
        max={duration}
        step={5}
        onValueChange={(value: number[]) => onSeekChange(value[0])}
        className="flex items-center w-full"
      />
     <span className='text-xs'>{formatTime(duration)}</span>
     </div>
    </div>
  )
}

const formatTime = (time: number) => {
  if (isNaN(time) || time < 0) {
    return "0:00";
  }
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}