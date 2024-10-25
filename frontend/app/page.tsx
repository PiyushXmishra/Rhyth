"use client";
import TrendingTracks from "@/components/Trending";
const Home: React.FC = () => {
  return (
    <div className="z-50 flex md:max-h-[calc(100vh-8rem)] md:min-h-[calc(100vh-8rem)] w-full md:bg-secondary rounded-3xl pb-4 pt-4 md:pt-0 flex-col justify-between ">
      <TrendingTracks />
      <div className="md:hidden">
        <div className="bg-secondary rounded-lg">
        </div>
      </div>
    </div>
  );
};

export default Home;
