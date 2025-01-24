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
          <h1 className="flex text-3xl lg:text-4xl p-3 pl-1 lg:pl-0 lg:p-4 font-extrabold bg-white text-transparent bg-clip-text text-start">
            {greeting}
          </h1>
        ) :(
          <Skeleton className="p-3 lg:p-4 lg:pl-0 w-2/4  h-8"/>
        )}
       
    </div>
  )
}

export default Greeting
