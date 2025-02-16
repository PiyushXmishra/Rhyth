"use client"
import { House, ListMusic, History, Download } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

function MobileFooter() {
  const pathname = usePathname() 

  const getLinkClass = (path:any) => {
    return pathname === path 
      ? 'stroke-primary scale-105'
      : 'text-muted-foreground';  
  }

  return (
    <div className='flex lg:hidden sticky bottom-0 w-full mt-auto bg-card/60'>
      <div className="flex flex-row justify-between px-8 py-2 items-center w-full bg-gradient-to-t from-custom-black via-custom-custom-transparent to-transparent">
        <Link href={"/"} className={getLinkClass('/')}>
          <House size={28} />
        </Link>

        <Link href={"/yourplaylists"} className={getLinkClass('/yourplaylists')}>
          <ListMusic size={28} />
        </Link>

        <Link href={"/history"} className={getLinkClass('/history')}>
          <History size={28} />
        </Link>

        <Link href={"/download"} className={getLinkClass('/download')}>
          <Download size={28} />
        </Link>
      </div>
    </div>
  )
}

export default MobileFooter
