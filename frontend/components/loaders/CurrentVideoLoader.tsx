import React from 'react'
import { Skeleton } from '../ui/skeleton'

function CurrentVideoLoader() {
  return (
    <div className="flex items-center">
    {/* Skeleton for thumbnail */}
    <Skeleton className="w-20 h-16 rounded-lg mr-4 bg-muted-foreground/30" />

    {/* Skeleton for title and author */}
    <div>
      <Skeleton className="h-4 w-[380px] mb-2 bg-muted-foreground/30" />{" "}
      {/* Title skeleton */}
      <Skeleton className="h-4 w-[270px] mb-2 bg-muted-foreground/30" />
      <Skeleton className="h-2 w-44 bg-muted-foreground/30" />{" "}
      {/* Author name skeleton */}
    </div>
  </div>
  )
}

export default CurrentVideoLoader
