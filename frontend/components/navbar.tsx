'use client'

import { useState } from "react"
import { ArrowLeft, History, Search, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import SearchBar from "./SearchBar"
import { useSearchContext } from "@/components/contexts/searchContext"
import Link from "next/link"
import Logo from "@/public/NavbarImage.png"
import Logo2 from "@/public/web-android icon.png"
import User from "./User"
import { useRouter } from "next/navigation"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const { isSearching } = useSearchContext()
  const [isSearchActive, setIsSearchActive] = useState(false)
  const toggleSearch = () => {
    setIsSearchActive(!isSearchActive);

    if(isSearchActive && pathname === '/search') {
      router.back();
    }
  }

  return (
    <div
      className={`lg:p-4 px-4 sticky top-0 z-10 bg-card lg:bg-card/70 lg:backdrop-blur-lg ${
        isSearching ? "lg:backdrop-blur-lg" : ""
      }`}
    >
      <div className="hidden lg:flex mx-auto items-center justify-between">
        <div className="flex items-center text-3xl font-bold pl-4">
          <Link href={"/"}>
          Rhyth.
          </Link>
        </div>
        <SearchBar />
        <div>
        </div>
        <User />
      </div>

      <div className="lg:hidden relative h-12 overflow-hidden">
        <div className={`flex items-center justify-between absolute inset-0 transition-transform duration-300 ease-in-out ${isSearchActive ? '-translate-x-full' : 'translate-x-0'}`}>

        <div className="flex items-center gap-x-8 ">
          <User />
          </div>
          
          <button onClick={toggleSearch} aria-label="Search" className="">
            <Search className="h-6 w-6" />
          </button>
         
          
        </div>

        <div className={`flex items-center w-full absolute inset-0 transition-transform duration-300 ease-in-out ${isSearchActive ? 'translate-x-0' : 'translate-x-full'}`}>
          
            <div onClick={toggleSearch} className="">
              <ArrowLeft className="h-6 w-6" />
            </div>
      
          <div className="flex-grow pl-4">
            <SearchBar />
          </div>
        </div>
      </div>
    </div>
  )
}