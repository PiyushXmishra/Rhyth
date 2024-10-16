// src/components/TrendingTracks.tsx

import React from 'react';
import Link from 'next/link';
import { useTracks } from './contexts/TracksContext'; // Import the custom hook

const TrendingTracks: React.FC = () => {
  const { tracks, loading } = useTracks(); // Use the context

  // Function to truncate the title to the first four words
  const truncateTitle = (title: string, maxChars: number = 21) => {
    return title.length > maxChars ? title.slice(0, maxChars) + '..' : title; // Add '...' if more than maxChars
  };

  return (
    <div className='flex flex-col px-2 h-full'>
      <h1 className='text-xl text-muted-foreground font-semibold'>Trending Tracks</h1>
      <div className='overflow-y-auto'>
        {loading ? ( // Check if loading
          <div className="flex items-center justify-center h-40">
            <p className="text-lg text-gray-500">Loading...</p>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 pt-4'> {/* Use grid for layout */}
            {tracks.length > 0 ? (
              tracks.map((track) => (
                <Link key={track.id} href={`/playlist/${track.id}?title=${track.name}`} passHref>
                  <div className='rounded-xl bg-accent'>
                    <div className='p-2 flex flex-col items-center space-y-2 cursor-pointer'> {/* Stack items vertically */}
                      <img 
                        src={track.thumbnails?.maxres?.url} // Use medium thumbnail
                        alt={track.name} 
                        className='w-48 h-44 object-cover object-center rounded-xl' // Tailwind classes for styling
                      />
                      <h2 className='font-semibold text-muted-foreground text-center'>{truncateTitle(track.name)}</h2> {/* Use truncate function */}
                    </div>
                  </div>
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
