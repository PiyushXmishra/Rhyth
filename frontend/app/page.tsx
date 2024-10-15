"use client"
import Playlist from "@/components/playlist";
import YoutubePlayer from '../components/YoutubePlayer';
import Trending from "@/components/Trending";
import { useSearchContext } from "@/components/contexts/searchContext";
import SearchResults from "@/components/SearchResults";

const Home: React.FC = () => {
  const { searchTerm, setSearchTerm, results, isSearching, clearResults } = useSearchContext();
  const showResults = results.length > 0 && isSearching;

  return (
    <div className="flex max-h-[calc(100vh-8rem)] min-h-[calc(100vh-8rem)] w-5/12 bg-secondary rounded-3xl p-4">
        <Trending />
    </div>
  );
}



// // pages/index.tsx


// const Home: React.FC = () => {
//   return (
//     <div className="bg-gray-100">
//       <h1 className="text-3xl font-bold text-center mt-10">Custom YouTube Player</h1>
//      
//     </div>
//   );
// };

export default Home;
