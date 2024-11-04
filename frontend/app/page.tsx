import Greeting from "@/components/Greeting";
import TrendingTracks from "@/components/Trending";
import UserPlaylists from "@/components/UserPlaylists";
const Home: React.FC = () => {
  return (
    <>
      <div className="z-50 flex lg:max-h-[calc(100vh-8rem)] lg:min-h-[calc(100vh-8rem)] w-full lg:bg-secondary rounded-3xl lg:pb-4 flex-col ">
        <Greeting/>  
        <TrendingTracks />
      </div>
      <div className="lg:hidden ">
        <UserPlaylists />
      </div>
    </>
  );
};

export default Home;
