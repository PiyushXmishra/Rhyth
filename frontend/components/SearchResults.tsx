import React from "react";
import { usePlayer } from "./contexts/PlayerContext";
import { motion } from "framer-motion";
import { EllipsisVertical } from "lucide-react";
import { Dropdown } from "./controls/DownloadButton";

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

  const handleVideoSelect = (videoId: string) => {
    setVideoId(videoId);
  };

  return (
    <div className="w-full h-full rounded-lg shadow-lg">
      <div className="h-full overflow-y-auto overflow-x-hidden">
        {results.length > 0 ? (
          results.map((result, index) => (
            <motion.div
              whileHover={{
                scale: 1.01,
                transition: { duration: 0.01 },
              }}
              whileTap={{ scale: 0.9 }}
              key={index}
              className="flex items-center py-2 cursor-pointer transition duration-200 ease-in-out lg:my-2 justify-between"  
            >
              <div className="flex items-center w-full" onClick={() => handleVideoSelect(result.id.videoId)} >
                <img
                  src={result.snippet.thumbnails.high.url}
                  alt={result.snippet.title}
                  className="w-16 h-12 lg:w-20 lg:h-16 rounded-lg object-cover"
                />

                <div className="ml-4 mr-2 lg:ml-4 lg:mr-0">
                  <h3 className="text-xs lg:text-base  font-bold  ">
                    {truncateTitle(result.snippet.title, 60)}
                  </h3>
                  {/* Optional: display artist info */}
                  {/* <p className="text-xs    font-bold text-muted-foreground">{result.snippet.channelTitle}</p> */}
                </div>
              </div>
              <div className="flex">
                <Dropdown videoId={result.id.videoId} videoTitle={result.snippet.title}/>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="p-4 text-muted-foreground"></div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
function useSearchContext(): {
  searchTerm: any;
  setSearchTerm: any;
  results: any;
  isSearching: any;
  clearResults: any;
} {
  throw new Error("Function not implemented.");
}
