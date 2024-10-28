'use client'

import { useState } from "react"
import { ArrowLeft, Search, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import SearchBar from "./SearchBar"
import { useSearchContext } from "@/components/contexts/searchContext"
import Link from "next/link"
import Logo from "@/public/android-launchericon-512-512.png"

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
            src={Logo}
            alt="Logo"
            width={100}
            height={100}
          />
        </div>
        <SearchBar />
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
              <button className="p-2">
                <Settings className="h-6 w-6" />
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}