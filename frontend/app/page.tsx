"use client";
import TrendingTracks from "@/components/Trending";
import UserPlaylists from "@/components/UserPlaylists";
const Home: React.FC = () => {
  return (
    <>
    <div className="z-50 flex md:max-h-[calc(100vh-8rem)] md:min-h-[calc(100vh-8rem)] w-full md:bg-secondary rounded-3xl md:pb-4 pt-2 md:pt-0 flex-col ">
      <h1 className="flex md:hidden text-2xl p-2 pt-0 font-bold text-white text-start ">Hey User !</h1>
      <TrendingTracks />
    </div>
    <div className="md:hidden">
       <UserPlaylists/>
      </div>
    </>
  );
};

export default Home;
