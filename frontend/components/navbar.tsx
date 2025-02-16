'use client'

import { useState, useEffect } from "react"
import { ArrowLeft, Search } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import SearchBar from "./SearchBar"
import { useSearchContext } from "@/components/contexts/searchContext"
import User from "./User"

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { isSearching } = useSearchContext();
  
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleSearch = () => {
    setIsSearchActive(!isSearchActive);

    if (isSearchActive && pathname === '/search') {
      router.back();
    }
  };

  return (
    <div
      className={`lg:p-4 px-4 sticky top-0 z-10 transition-all duration-300 ${
        isScrolled ? "bg-card/70 backdrop-blur-lg" : "bg-transparent"
      }`}
    >
      <div className="hidden lg:flex mx-auto items-center justify-between">
        <div className="flex items-center text-3xl font-bold pl-4">
          <Link href={"/"}>Rhyth.</Link>
        </div>
        <SearchBar />
        <User />
      </div>

      <div className="lg:hidden relative h-12 overflow-hidden">
        <div className={`flex items-center justify-between absolute inset-0 transition-transform duration-300 ease-in-out ${isSearchActive ? '-translate-x-full' : 'translate-x-0'}`}>
          <div className="flex items-center gap-x-8">
            <User />
          </div>
          <button onClick={toggleSearch} aria-label="Search">
            <Search className="h-6 w-6" />
          </button>
        </div>

        <div className={`flex items-center w-full absolute inset-0 transition-transform duration-300 ease-in-out ${isSearchActive ? 'translate-x-0' : 'translate-x-full'}`}>
          <div onClick={toggleSearch}>
            <ArrowLeft className="h-6 w-6" />
          </div>
          <div className="flex-grow ">
            <SearchBar />
          </div>
        </div>
      </div>
    </div>
  );
}
