"use client"
import React from 'react';
import Link from 'next/link';
import { useTracks } from './contexts/TracksContext'; // Import the custom hook
import LoadingSkeleton from '@/components/loaders/TrendingLoader';
import { motion } from 'framer-motion'; // Import motion from framer-motion

const TrendingTracks: React.FC = () => {
  const { tracks, loading } = useTracks(); // Use the context

  // Function to truncate the title to the first four words
  const truncateTitle = (title: string, maxChars: number = 21) => {
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
    <div className='flex flex-col px-2 h-full'>
      <h1 className='text-xl font-semibold text-muted-foreground p-4 pb-0'>Trending Tracks</h1>
      <div className='overflow-y-auto'>
        {loading ? ( // Check if loading
          <LoadingSkeleton count={10} />
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 px-2 pt-4'> {/* Use grid for layout */}
            {tracks.length > 0 ? (
              tracks.map((track) => (
                <Link key={track.id} href={`/playlist/${track.id}?title=${track.name}`} passHref>

                  <motion.div 
                  whileHover={{scale : 1.05}}
                   className='rounded-xl bg-accent p-2 flex flex-col items-center space-y-2 cursor-pointers'>
                    {/* Add motion.div for animation but keep img layout the same */}
                    <motion.div
                      initial="hidden" // Start animation in hidden state
                      animate="visible" // Animate to visible state
                      variants={imageVariants} // Apply curtain animation variants
                      className='relative w-full h-44 overflow-hidden rounded-xl' // Ensure image size consistency
                    >
                      <img 
                        src={track.thumbnails?.maxres?.url} // Use medium thumbnail
                        alt={track.name} 
                        className='absolute top-0 left-0 w-full h-full object-cover' // Absolute positioning for animation
                      />
                    </motion.div>
                    <h2 className='font-semibold text-muted-foreground text-center'>
                      {truncateTitle(track.name)}
                    </h2>
                  </motion.div>
                </Link>
              ))
            ) : (
              <p>No trending tracks available.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default TrendingTracks;
