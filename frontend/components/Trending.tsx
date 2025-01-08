"use client"

import React from 'react'
import Link from 'next/link'
import { useTracks } from './contexts/TracksContext'
import LoadingSkeleton from '@/components/loaders/TrendingLoader'
import { motion } from 'framer-motion'

const TrendingTracks: React.FC = () => {
  const { tracks, loading } = useTracks()

  const truncateTitle = (title: string, maxChars: number = 18) => {
    return title.length > maxChars ? title.slice(0, maxChars) + '..' : title
  }

  return (
    <div className='flex flex-row lg:flex-col lg:px-2 h-full w-full'>
      <h1 className='hidden lg:flex text-xl  font-bold   text-white p-4 pb-0'>Trending Tracks</h1>
      <div className='overflow-y-auto w-full'>
        {loading || tracks.length === 0 ? (
          <LoadingSkeleton count={6} />
        ) : (
          <div className='grid grid-cols-2 gap-4 lg:px-2 pt-2 lg:pt-4 w-full'> 
            {tracks.map((track) => (
              <Link key={track.id} href={`/playlist/${track.id}?title=${track.name}`} passHref>
                <motion.div 
                  whileHover={{scale: 1.05}}
                  className='rounded-md lg:rounded-xl bg-secondary lg:bg-accent lg:p-2 flex flex-row lg:flex-col items-center lg:space-y-2 cursor-pointer'
                >
                  <div
                    className='relative w-16 h-14 lg:h-44 lg:w-full overflow-hidden rounded-l-md lg:rounded-xl'
                  >
                    <img 
                      src={track.thumbnails?.maxres?.url}
                      alt={track.name} 
                      className='absolute top-0 left-0 w-full h-full object-cover'
                    />
                  </div>
                  <h2 className='flex-1 pl-3 sm:pl-2 lg:pl-0  font-bold   text-sm lg:text-base text-white text-start line-clamp-2 lg:line-clamp-none'>
                    {truncateTitle(track.name)}
                  </h2>
                </motion.div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default TrendingTracks