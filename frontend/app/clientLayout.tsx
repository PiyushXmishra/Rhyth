"use client";
import "./globals.css";
import Navbar from "@/components/navbar";
import SideBar from "@/components/SideBar";
import { SearchProvider } from "@/components/contexts/searchContext";
import { PlayerProvider } from "@/components/contexts/PlayerContext";
import PlayerWrapper from "@/components/player/PlayerWrapper";
import { TracksProvider } from "@/components/contexts/TracksContext";
import SessionProviderWrapper from "./SessionProvider";
import { PlayerControlProvider } from "@/components/contexts/ControlContext";
import CurrentVideo from "@/components/player/CurrentVideo";
import StickyControls from "@/components/controls/StickyControls";
import MobileFooter from "@/components/MobileFooter";
import { GradientProvider } from "@/components/contexts/GradientContext";
import { CurrentVidColorProvider } from "@/components/contexts/CurrentVidColorContext";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
     <PlayerControlProvider>
     <SessionProviderWrapper>
       <TracksProvider>
         <SearchProvider>
          <CurrentVidColorProvider>
          <GradientProvider>
           <PlayerProvider>
             <Navbar />
             <div className="flex px-3 lg:px-0">
               <div className=" flex w-full">
                 <div className="flex flex-col lg:flex-row justify-between w-full lg:gap-10">
                   <div className="hidden lg:flex justify-center items-center">
                     <SideBar />
                   </div>

                   {children}
                   <PlayerWrapper />
                 </div>
               </div>
               <div className="fixed bottom-0 hidden lg:flex w-full flex-row bg-card/50 backdrop-blur-md">
                 <div className="min-w-max">
                   <CurrentVideo />
                 </div>
                 <StickyControls />
               </div>
             </div>
             <MobileFooter />
           </PlayerProvider>
           </GradientProvider>
           </CurrentVidColorProvider>
         </SearchProvider>
         
       </TracksProvider>
     </SessionProviderWrapper>
   </PlayerControlProvider>
    </>
  );
}
