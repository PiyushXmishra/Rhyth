import React from "react";
import { House, ListMusic, Download, Settings, Heart, History } from "lucide-react";
import Link from "next/link";
import { usePathname } from 'next/navigation'

function SideBar() {
    const pathname = usePathname() 
  
    const getLinkClass = (path:any) => {
      return pathname === path 
        ? ''
        : 'text-gray-400';  
    }
  
  return (
    <div className="hidden lg:flex bg-secondary  rounded-r-3xl p-2 flex-col justify-between " >
      <div className="flex flex-col space-y-8 p-4">
        <Link href={"/"} className={getLinkClass('/')}>
          <House className="w-8 h-8" />
        </Link>

        <Link href={"/yourplaylists"} className={getLinkClass('/yourplaylists')}>
          <ListMusic className="w-8 h-8" />
        </Link>

        <Link href={"/history"} className={getLinkClass('/history')}>
          <History className="w-8 h-8" />
        </Link>

        <Link href={"/download"} className={getLinkClass('/download')}>
          <Download className="w-8 h-8" />
        </Link>
      </div>
      
    </div>
  );
}

export default SideBar;
