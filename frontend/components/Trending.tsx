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

  const imageVariants = {
    hidden: { clipPath: 'inset(0% 0 100% 0)' },
    visible: { 
      clipPath: 'inset(0% 0 0% 0)',
      transition: { duration: 0.4, ease: 'easeInOut' }
    },
  }

  return (
    <div className='flex flex-row md:flex-col md:px-2 h-full w-full'>
      <h1 className='hidden md:flex text-xl font-semibold font-sans text-muted-foreground p-4 pb-0'>Trending Tracks</h1>
      <div className='overflow-y-auto w-full'>
        {loading || tracks.length === 0 ? (
          <LoadingSkeleton count={6} />
        ) : (
          <div className='grid grid-cols-2 gap-4 md:px-2 pt-2 md:pt-4 w-full'> 
            {tracks.map((track) => (
              <Link key={track.id} href={`/playlist/${track.id}?title=${track.name}`} passHref>
                <motion.div 
                  whileHover={{scale: 1.05}}
                  className='rounded-md md:rounded-xl bg-accent md:p-2 flex flex-row md:flex-col items-center md:space-y-2 cursor-pointer'
                >
                  <div
                    className='relative w-16 h-14 md:h-44 md:w-full overflow-hidden rounded-l-md md:rounded-xl'
                  >
                    <img 
                      src={track.thumbnails?.maxres?.url}
                      alt={track.name} 
                      className='absolute top-0 left-0 w-full h-full object-cover'
                    />
                  </div>
                  <h2 className='flex-1 pl-3 sm:pl-2 md:pl-0 font-semibold font-sans text-sm md:text-base text-white text-start line-clamp-2 md:line-clamp-none'>
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