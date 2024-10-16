import React from 'react';
import { usePlayer } from './contexts/PlayerContext';

interface SearchResult {
  snippet: any;
  id: { videoId: string }; // Include id in the SearchResult type
  title: string;
  artist: string;
}

interface SearchResultsProps {
  results: SearchResult[];
  onClose: () => void; // Function to close results
}

const SearchResults: React.FC<SearchResultsProps> = ({ results, onClose }) => {
  const { setVideoId } = usePlayer();

  const truncateTitle = (title: string, maxLength: number) => {
    if (title.length > maxLength) {
      return title.slice(0, maxLength) + "...";
    }
    return title;
  };

  // Function to handle video selection
  const handleVideoSelect = (videoId: string) => {
    setVideoId(videoId); // Update the video ID in the context
  };

  return (
    <div className="w-full h-full rounded-lg shadow-lg">
      <div className="h-full overflow-y-auto">
        {results.length > 0 ? (
          results.map((result, index) => (
            <div
              key={index}
              className="flex items-center p-2 cursor-pointer transition duration-200 ease-in-out bg-accent rounded-xl m-2"
              onClick={() => handleVideoSelect(result.id.videoId)} // Set onClick handler
            >
              {/* Image on the left */}
              <img
                src={result.snippet.thumbnails.high.url}
                alt={result.snippet.title}
                className="w-20 h-16 rounded-lg object-cover" // Adjust the size of the image here
              />

              {/* Text on the right */}
              <div className="ml-4">
                <h3 className="text-md font-semibold">
                  {truncateTitle(result.snippet.title, 60)} {/* Max 40 characters */}
                </h3>
                {/* Optional: display artist info */}
                {/* <p className="text-sm text-gray-600">{result.artist}</p> */}
              </div>
            </div>
          ))
        ) : (
          <div className="p-4 text-muted-foreground">No results found.</div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
function useSearchContext(): { searchTerm: any; setSearchTerm: any; results: any; isSearching: any; clearResults: any; } {
  throw new Error('Function not implemented.');
}

