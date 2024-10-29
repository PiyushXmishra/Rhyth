'use client'

import { useState } from "react"
import { ArrowLeft, Search, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import SearchBar from "./SearchBar"
import { useSearchContext } from "@/components/contexts/searchContext"
import Link from "next/link"
import Logo from "@/public/android-launchericon-512-512.png"
import Logo2 from "@/public/android-launchericon-192-192.png"
import User from "./User"

export default function Navbar() {
  const { isSearching } = useSearchContext()
  const [isSearchActive, setIsSearchActive] = useState(false)
  const toggleSearch = () => {
    setIsSearchActive(!isSearchActive)
  }

  return (
    <nav
      className={`p-2 lg:p-4 px-6 sticky top-0 z-10 bg-background/30 rounded-b-xl backdrop-blur-md ${
        isSearching ? "backdrop-blur-lg" : ""
      }`}
    >
      <div className="hidden lg:flex max-w-7xl mx-auto items-center justify-between">
        <div className="flex items-center">
          <Image
            src={Logo2}
            alt="Logo"
            height={50}
            width={50}
          />
        </div>
        <SearchBar />
       <User/>
      </div>

      <div className="lg:hidden relative h-12">
        <div className="flex items-center justify-between absolute inset-0">
          {isSearchActive ? (
            <div className="flex items-center w-full">
              <Link href="/">
                <div onClick={toggleSearch} className="p-2">
                  <ArrowLeft className="h-6 w-6" />
                </div>
              </Link>
              <div className="flex-grow">
                <SearchBar />
              </div>
            </div>
          ) : (
            <>
              <button onClick={toggleSearch} aria-label="Search" className="p-2">
                <Search className="h-6 w-6" />
              </button>
              <Image
                src={Logo}
                alt="Logo"
                width={70}
                height={70}
                className=""
              />
             <User/>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}