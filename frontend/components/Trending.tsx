"use client"
import React from 'react';
import Link from 'next/link';
import { useTracks } from './contexts/TracksContext'; // Import the custom hook
import LoadingSkeleton from '@/components/loaders/TrendingLoader';
import { motion } from 'framer-motion'; // Import motion from framer-motion

const TrendingTracks: React.FC = () => {
  const { tracks, loading } = useTracks(); // Use the context

  // Function to truncate the title to the first four words
  const truncateTitle = (title: string, maxChars: number = 18) => {
    return title.length > maxChars ? title.slice(0, maxChars) + '..' : title; // Add '...' if more than maxChars
  };

  // Animation variants for the curtain effect (top to bottom)
  const imageVariants = {
    hidden: { clipPath: 'inset(0% 0 100% 0)' }, // Start fully visible from the top
    visible: { 
      clipPath: 'inset(0% 0 0% 0)', // Fully visible
      transition: { duration: 0.4, ease: 'easeInOut' } // Smooth transition
    },
  };                                                                                          
  return (
    <div className='flex flex-row md:flex-col md:px-2 h-full w-full'>
      <h1 className='hidden md:flex text-xl font-semibold text-muted-foreground p-4 pb-0'>Trending Tracks</h1>
      <div className='overflow-y-auto'>
        {loading || tracks.length === 0 ? ( // Check if loading
          <LoadingSkeleton count={10} />
        ) : (
          <div className='grid grid-cols-2 gap-4 md:px-2 md:pt-4 w-full'> 
            {(
              tracks.map((track) => (
                <Link key={track.id} href={`/playlist/${track.id}?title=${track.name}`} passHref>

                  <motion.div 
                  whileHover={{scale : 1.05}}
                   className='rounded-md md:rounded-xl bg-accent md:p-2 flex flex-row md:flex-col items-center md:space-y-2 cursor-pointers'>
                    {/* Add motion.div for animation but keep img layout the same */}
                    <motion.div
                      initial="hidden" // Start animation in hidden state
                      animate="visible" // Animate to visible state
                      variants={imageVariants} // Apply curtain animation variants
                      className='relative w-14 h-12 md:h-44 md:w-full overflow-hidden rounded-l-md md:rounded-xl' // Ensure image size consistency
                    >
                      <img 
                        src={track.thumbnails?.maxres?.url} // Use medium thumbnail
                        alt={track.name} 
                        className='absolute top-0 left-0 w-full h-full object-cover' // Absolute positioning for animation
                      />
                    </motion.div>
                    <h2 className='pl-2 md:pl-0 font-semibold text-sm md:text-base text-muted-foreground text-center'>
                      {truncateTitle(track.name)}
                    </h2>
                  </motion.div>
                </Link>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default TrendingTracks;
