import Playlist from "@/components/playlist";
import YoutubePlayer from '../components/YoutubePlayer';
import Trending from "@/components/Trending";

const Home: React.FC = () => {

  return (
      <div className="flex h-min w-5/12 bg-secondary rounded-3xl p-4">
        <Trending/>
      </div>
  );
}


// // pages/index.tsx


// const Home: React.FC = () => {
//   return (
//     <div className="bg-gray-100">
//       <h1 className="text-3xl font-bold text-center mt-10">Custom YouTube Player</h1>
//      
//     </div>
//   );
// };

export default Home;
