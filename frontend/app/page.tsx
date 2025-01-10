import Greeting from "@/components/Greeting";
import RecentlyPlayed from "@/components/RecentlyPlayed";
import TrendingTracks from "@/components/Trending";
import UserPlaylists from "@/components/UserPlaylists";
const Home: React.FC = () => {
  return (
    <>
      <div className="flex lg:max-h-[calc(100vh-8rem)] lg:min-h-[calc(100vh-8rem)] w-full  lg:pb-4 flex-col overflow-y-auto">
        <Greeting/>  
        <TrendingTracks />
        <RecentlyPlayed/>
      </div>
     
    </>
  );
};

export default Home;
