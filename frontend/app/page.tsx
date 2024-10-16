"use client"
import Playlist from "@/components/playlist";
import YoutubePlayer from '../components/YoutubePlayer';
import TrendingTracks from "@/components/Trending";
import { useSearchContext } from "@/components/contexts/searchContext";
import SearchResults from "@/components/SearchResults";

const Home: React.FC = () => {
  const { searchTerm, setSearchTerm, results, isSearching, clearResults } = useSearchContext();
  const showResults = results.length > 0 && isSearching;

  return (
    <div className="z-50 flex flex-col max-h-[calc(100vh-8rem)] min-h-[calc(100vh-8rem)] w-5/12 bg-secondary rounded-3xl p-4">
        <TrendingTracks />
    </div>
  );
}

export default Home;
