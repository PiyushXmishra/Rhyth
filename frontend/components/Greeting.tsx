"use client"
import React, { useEffect, useState } from 'react'
import { Skeleton } from './ui/skeleton';

function Greeting() {
    const [greeting, setGreeting] = useState("");

    const getGreeting = () => {
        const currentHour = new Date().getHours();
      
        if (currentHour < 12) {
          return "Good morning";
        } else if (currentHour < 18) {
          return "Good afternoon";
        } else {
          return "Good evening";
        }
      };
      
    useEffect(() => {
      const timer = setTimeout(() => {
        setGreeting(getGreeting());
      }, 50)
    }, [])

  return (
    <div>
      {greeting ? (
          <h1 className="flex lg:hidden text-2xl p-2   font-bold text-white text-start">
            {greeting}
             </h1>
        ) :(
          <Skeleton className="lg:hidden w-2/4 p-2 h-10"/>
        )}
       
    </div>
  )
}

export default Greeting
