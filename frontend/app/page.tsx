import TrendingTracks from "@/components/Trending";
const Home: React.FC = () => {

  return (
    <div className="z-50 flex flex-col max-h-[calc(100vh-8rem)] min-h-[calc(100vh-8rem)] w-5/12 bg-secondary rounded-3xl pb-4 ">
        <TrendingTracks />
    </div>

  );
}

export default Home;
