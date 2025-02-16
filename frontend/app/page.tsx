"use client"

import Greeting from "@/components/Greeting";
import RecentlyPlayed from "@/components/RecentlyPlayed";
import TrendingTracks from "@/components/Trending";
import { useGradient } from "@/components/contexts/GradientContext";
const Home: React.FC = () => {

  const { gradient, generateGradient } = useGradient();
  return (
    <>
     <div
        className="absolute lg:hidden top-[-3rem] w-full -ml-3 h-40 pointer-events-none"
        style={{ background: gradient, zIndex: -1 , opacity:0.8 }}
      />
    <div className="relative flex h-full w-full lg:pb-4 flex-col overflow-y-auto">
        <Greeting/>  
        <TrendingTracks />
        <RecentlyPlayed/>
      </div>
     
    </>
  );
};

export default Home;
