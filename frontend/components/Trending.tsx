"use client"

import React from 'react'
import Link from 'next/link'
import { useTracks } from './contexts/TracksContext'
import LoadingSkeleton from '@/components/loaders/TrendingLoader'
import { motion } from 'framer-motion'
import { usePlayerControl } from './contexts/ControlContext'
import { useGradient } from './contexts/GradientContext'
const TrendingTracks: React.FC = () => {
  const { hidden } = usePlayerControl();
  const { tracks, loading } = useTracks();
  const {extractColorFromImage} = useGradient();

  const truncateTitle = (title: string, maxChars: number = 18) => {
    return title.length > maxChars ? title.slice(0, maxChars) + '..' : title
  }

  return (
    <div className='flex flex-row w-full'>
      <div className=' w-full'>
        {loading || tracks.length === 0 ? (
          <LoadingSkeleton count={6} />
        ) : (
          <motion.div 
            layout
            transition={{ duration: 0.5 }}
          className={`grid gap-4 pt-2 grid-cols-2 w-full ${
            hidden ? 'lg:grid-cols-4' : 'lg:grid-cols-2'
          }`}
          > 
            {tracks.map((track) => (
              <Link key={track.id} href={`/playlist/${track.id}?title=${track.name}`} passHref>
                <motion.div 
                  whileHover={{scale: 1.01}}
                  onClick={()=> extractColorFromImage(`${track.thumbnails?.maxres?.url}?not-from-cache-please`)}
                  className='rounded-md  bg-secondary flex flex-row  items-center cursor-pointer'
                >
                  <div
                    className='relative w-16 h-14 overflow-hidden rounded-l-md '
                  >
                    <img 
                      src={track.thumbnails?.maxres?.url}
                      alt={track.name} 
                      className='absolute top-0 left-0 w-full h-full object-cover'
                    />
                  </div>
                  <h2 className='flex-1 pl-3 sm:pl-2 font-bold   text-sm lg:text-base text-white text-start line-clamp-2 lg:line-clamp-none'>
                    {truncateTitle(track.name)}
                  </h2>
                </motion.div>
              </Link>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default TrendingTracks