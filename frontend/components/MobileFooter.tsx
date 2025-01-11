import { House, ListMusic, History, Download } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import User from './User'

function MobileFooter() {
  return (
    <div className='flex lg:hidden sticky bottom-0 w-full bg-card mt-auto '>
      <div className="flex flex-row justify-between px-8 py-2 items-center w-full">
        <Link href={"/"}>
          <House size={28} />
        </Link>

        <Link href={"/yourplaylists"}>
          <ListMusic size={28}/>
        </Link>

        <Link href={"/history"}>
          <History size={28} />
        </Link>

        <Link href={"/download"}>
          <Download size={28} />
        </Link>

      

      </div>
    </div>
  )
}

export default MobileFooter
