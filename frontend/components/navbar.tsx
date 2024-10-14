"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Image from "next/image"


export default function Navbar() {
  return (
    <nav className="p-4 px-6 sticky top-0 overflow-hidden bg-background/30 rounded-b-xl backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Image
          src="https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Primary_Logo_RGB_Green.png"
            alt="Logo"
            width={50}
            height={50}
          />
        </div>
        <div className="flex-grow mx-4 max-w-lg">
        <div className="relative">
        <Input 
        type="search" 
        placeholder="Search"
        className=" block w-full pl-5 bg-secondary text-md"
         />
         </div>
         </div>
      
        
        <div className="flex items-center space-x-2 gap-4">
          <Button variant="outline" className="bg-secondary text-md font-medium  text-secondary-foreground rounded-full py-6 px-5">
            Sign In
          </Button>
          <Button variant="default" className="bg-primary text-md font-medium text-secondary-foreground rounded-full py-6 px-5">
            Sign Up
          </Button>
          
        </div>
      </div>
    </nav>
  )
}