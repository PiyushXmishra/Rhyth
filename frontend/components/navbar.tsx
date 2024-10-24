"use client";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Search, SearchIcon, Settings } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import SearchBar from "./SearchBar";
import { useSearchContext } from "@/components/contexts/searchContext";
import Link from "next/link";
import { div } from "framer-motion/client";

export default function Navbar() {
  const { isSearching } = useSearchContext();

  const [isSearchActive, setIsSearchActive] = useState(false);

  const toggleSearch = () => {
    setIsSearchActive(!isSearchActive);
  };

  return (
    <nav
      className={`p-4 px-6 sticky top-0 overflow-auto bg-background/30 rounded-b-xl backdrop-blur-md ${
        isSearching ? "backdrop-blur-lg" : ""
      }`}
    >
      <div className="hidden md:flex max-w-7xl mx-auto items-center justify-between">
        <div className="flex items-center">
          <Image
            src="https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Primary_Logo_RGB_Green.png"
            alt="Logo"
            width={50}
            height={50}
          />
        </div>
        <SearchBar /> {/* Pass setIsSearching through context */}
        <div className="flex items-center space-x-2 gap-4">
          <Button
            variant="outline"
            className="bg-secondary text-md font-medium text-secondary-foreground rounded-full py-6 px-5"
          >
            Sign In
          </Button>
          <Button
            variant="default"
            className="bg-primary text-md font-medium text-secondary-foreground rounded-full py-6 px-5"
          >
            Sign Up
          </Button>
        </div>
      </div>

      <div className="flex md:hidden items-center justify-between  bg-background">
        {isSearchActive ? (
          <div className="flex items-center">

            <Link href={"/"}>
            <div onClick={toggleSearch}>
              <ArrowLeft />
            </div>
            </Link>
            <SearchBar />
          </div>
        ) : (
          <>
            <button onClick={toggleSearch} aria-label="Search">
              <Search className="h-6 w-6" />
            </button>
            <div>
              <Settings className="h-6 w-6" />
            </div>
          </>
        )}
      </div>
    </nav>
  );
}
