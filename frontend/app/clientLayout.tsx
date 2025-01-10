"use client"
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
import BraveSupportBanner from "@/components/PromotionalBanner";
import StickyControls from "@/components/controls/StickyControls";
import SeekBar from "@/components/controls/SeekBar";
import PlayPauseButton from "@/components/controls/PlayPauseButton";
import VolumeControl from "@/components/controls/VolumeControl";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen">
      <PlayerControlProvider>
        <SessionProviderWrapper>
          <TracksProvider>
            <SearchProvider>
              <PlayerProvider>
                <Navbar />
                <div className="px-4 lg:px-0  min-h-[calc(100vh-4.5rem)]  lg:max-h-[calc(100vh-8rem)] lg:min-h-[calc(100vh-8rem)] flex lg:block">
                  <div className="flex flex-col lg:flex-row justify-between  w-full lg:gap-10">
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
                  <StickyControls/>
               </div>
              </PlayerProvider>
            </SearchProvider>
          </TracksProvider>
        </SessionProviderWrapper>
      </PlayerControlProvider>
    </div>
  );
}
