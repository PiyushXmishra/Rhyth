"use client";
import CurrentVideo from "@/components/player/CurrentVideo";
import PlayerWrapper from "@/components/player/PlayerWrapper";
import YoutubePlayer from "@/components/player/YoutubePlayer";
import TrendingTracks from "@/components/Trending";
import { usePlayer } from "@/components/contexts/PlayerContext";
const Home: React.FC = () => {
  const { videoId } = usePlayer();
  return (
    <div className="z-50 flex md:max-h-[calc(100vh-8rem)] md:min-h-[calc(100vh-8rem)] w-full md:bg-secondary rounded-3xl pb-4 flex-col justify-between ">
      <TrendingTracks />
      <div className="md:hidden">
        <div className="bg-secondary rounded-lg">

        </div>
      </div>
    </div>
  );
};

export default Home;
