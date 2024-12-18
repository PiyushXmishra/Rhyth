import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/navbar";
import SideBar from "@/components/SideBar";
import { SearchProvider } from "@/components/contexts/searchContext";
import { PlayerProvider } from "@/components/contexts/PlayerContext";
import PlayerWrapper from "@/components/player/PlayerWrapper";
import { TracksProvider } from "@/components/contexts/TracksContext";
import SessionProviderWrapper from "./SessionProvider";
import { PlayerControlProvider } from "@/components/contexts/ControlContext";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 600 700 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 600 700 900",
});

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <PlayerControlProvider>
      <SessionProviderWrapper>
      <TracksProvider>
        <SearchProvider>
          <PlayerProvider>
            <Navbar />
            <div className="px-4 lg:px-6 lg:pt-5 min-h-[calc(100vh-4.5rem)]  lg:max-h-[calc(100vh-8rem)] lg:min-h-[calc(100vh-8rem)] flex lg:block ">
              <div className="flex flex-col lg:flex-row justify-between  w-full lg:gap-10">
                <div className="hidden lg:flex w-1/12 bg-secondary rounded-3xl max-h-[calc(100vh-8rem)] min-h-[calc(100vh-8rem)] p-4">
                  <SideBar />
                </div>
                {children}
                <PlayerWrapper />
              </div>
            </div>
          </PlayerProvider>
        </SearchProvider>
      </TracksProvider>
      </SessionProviderWrapper>
      </PlayerControlProvider>
    </div>
  );
}
