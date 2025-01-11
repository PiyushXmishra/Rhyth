import Greeting from "@/components/Greeting";
import RecentlyPlayed from "@/components/RecentlyPlayed";
import TrendingTracks from "@/components/Trending";
import UserPlaylists from "@/components/UserPlaylists";
const Home: React.FC = () => {
  return (
    <>
      <div className="flex h-full w-full lg:pb-4 flex-col overflow-y-auto">
        <Greeting/>  
        <TrendingTracks />
        <RecentlyPlayed/>
      </div>
     
    </>
  );
};

export default Home;
