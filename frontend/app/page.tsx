"use client";
import TrendingTracks from "@/components/Trending";
import UserPlaylists from "@/components/UserPlaylists";
const Home: React.FC = () => {
  return (
    <>
    <div className="z-50 flex lg:max-h-[calc(100vh-8rem)] lg:min-h-[calc(100vh-8rem)] w-full lg:bg-secondary rounded-3xl lg:pb-4 flex-col ">
      <h1 className="flex lg:hidden text-2xl p-2  font-sans font-bold text-white text-start ">Hey User !</h1>
      <TrendingTracks />
    </div>
    <div className="lg:hidden">
       <UserPlaylists/>
      </div>
    </>
  );
};

export default Home;
