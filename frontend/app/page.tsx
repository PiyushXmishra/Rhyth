import CurrentVideo from "@/components/player/CurrentVideo";
import PlayerWrapper from "@/components/player/PlayerWrapper";
import TrendingTracks from "@/components/Trending";
const Home: React.FC = () => {
  return (
    <div className="z-50 flex md:max-h-[calc(100vh-8rem)] md:min-h-[calc(100vh-8rem)] w-full md:bg-secondary rounded-3xl pb-4 flex-col justify-between ">
      <TrendingTracks />
      <div className="md:hidden">
        <div className="h-10 bg-secondary rounded-lg">

        </div>
        <div className="h-10 bg-secondary rounded-lg">
       <CurrentVideo/>
        </div>
      </div>
    </div>
  );
};

export default Home;
