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

export default function Navbar() {
  const { isSearching } = useSearchContext()
  const [isSearchActive, setIsSearchActive] = useState(false)
  const toggleSearch = () => {
    setIsSearchActive(!isSearchActive)
  }

  return (
    <div
      className={`lg:p-4 px-4 sticky top-0 z-10 bg-card/70 backdrop-blur-xl rounded-lg ${
        isSearching ? "backdrop-blur-lg" : ""
      }`}
    >
      <div className="hidden lg:flex mx-auto items-center justify-between">
        <div className="flex items-center text-3xl font-bold pl-4">
          Rhyth.
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
          <Link href="/">
            <div onClick={toggleSearch} className="">
              <ArrowLeft className="h-6 w-6" />
            </div>
          </Link>
          <div className="flex-grow">
            <SearchBar />
          </div>
        </div>
      </div>
    </div>
  )
}