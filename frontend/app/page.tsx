"use client";
import PlayPauseButton from "@/components/controls/PlayPauseButton";
import TrendingTracks from "@/components/Trending";
import UserPlaylists from "@/components/UserPlaylists";
import { useSession } from "next-auth/react";

const getGreeting = () => {
  const currentHour = new Date().getHours();

  if (currentHour < 12) {
    return "Good morning";
  } else if (currentHour < 18) {
    return "Good afternoon";
  } else {
    return "Good evening";
  }
};

const Home: React.FC = () => {
  
  const { data: session } = useSession();
  const userName = session ? session.user?.name?.split(" ")[0] : "User";
  const greeting = getGreeting();

  return (
    <>
      <div className="z-50 flex lg:max-h-[calc(100vh-8rem)] lg:min-h-[calc(100vh-8rem)] w-full lg:bg-secondary rounded-3xl lg:pb-4 flex-col ">
        <h1 className="flex lg:hidden text-xl p-2 font-sans font-bold text-white text-start">
        {greeting}, {userName}!
        </h1>
        <TrendingTracks />
      </div>
      <div className="lg:hidden">
        <UserPlaylists />
      </div>
    </>
  );
};

export default Home;
