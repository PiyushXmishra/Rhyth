"use client"

import Greeting from "@/components/Greeting";
import RecentlyPlayed from "@/components/RecentlyPlayed";
import TrendingTracks from "@/components/Trending";
import { useGradient } from "@/components/contexts/GradientContext";
const Home: React.FC = () => {

  const { gradient } = useGradient();
  return (
    <>
   
    <div className="relative flex h-full w-full lg:pb-4 flex-col overflow-y-auto">
        <Greeting/>  
        <TrendingTracks />
        <RecentlyPlayed/>
      </div>
     
    </>
  );
};

export default Home;
