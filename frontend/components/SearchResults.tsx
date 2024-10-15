import React from 'react';

interface SearchResult {
  snippet: any;
  title: string;
  artist: string;
}

interface SearchResultsProps {
  results: SearchResult[];
  onClose: () => void; // Function to close results
}

const SearchResults: React.FC<SearchResultsProps> = ({ results, onClose }) => {

  const truncateTitle = (title: string, maxLength: number) => {
    if (title.length > maxLength) {
      return title.slice(0, maxLength) + "...";
    }
    return title;
  };

  return (
    <div className="w-full h-full mt-2 rounded-lg shadow-lg">
      <div className="h-full overflow-y-auto">
        {results.length > 0 ? (
          results.map((result, index) => (
            <div
              key={index}
              className="flex items-center p-2 cursor-pointer transition duration-200 ease-in-out"
            >
              {/* Image on the left */}
              <img
                src={result.snippet.thumbnails.high.url}
                alt={result.snippet.title}
                className="w-20 h-16 rounded-md object-cover" // Adjust the size of the image here
              />

              {/* Text on the right */}
              <div className="ml-4">
                <h3 className="text-md font-medium">
                  {truncateTitle(result.snippet.title, 40)} {/* Max 20 characters */}
                </h3>
                {/* <p className="text-sm text-gray-600">Video ID: {result.id.videoId}</p> */}
              </div>
            </div>
          ))
        ) : (
          <div className="p-4 text-gray-500">No results found.</div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
