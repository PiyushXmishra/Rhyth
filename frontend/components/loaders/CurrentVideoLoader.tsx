import React from 'react'
import { Skeleton } from '../ui/skeleton'

function CurrentVideoLoader() {
  return (
    <div className="flex items-center">
    
    <Skeleton className="w-14 h-10 lg:w-20 lg:h-16 rounded-lg mr-4 bg-muted-foreground/30" />

    <div>
      <Skeleton className="h-2 lg:h-4 w-[100px] lg:w-[280px] mb-2 bg-muted-foreground/30" />{" "}
     
      <Skeleton className="h-2 w-40 lg:w-30 bg-muted-foreground/30" />{" "}
      {/* Author name skeleton */}
    </div>
  </div>
  )
}

export default CurrentVideoLoader
