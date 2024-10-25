"use client";
import TrendingTracks from "@/components/Trending";
import UserPlaylists from "@/components/UserPlaylists";
const Home: React.FC = () => {
  return (
    <div className="z-50 flex md:max-h-[calc(100vh-8rem)] md:min-h-[calc(100vh-8rem)] w-full md:bg-secondary rounded-3xl md:pb-4 pt-4 md:pt-0 flex-col ">
      <TrendingTracks />
      
    </div>
  );
};

export default Home;
