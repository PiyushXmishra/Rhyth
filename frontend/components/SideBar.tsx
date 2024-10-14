import React from 'react';
import { House, ListMusic, Download , Settings} from 'lucide-react';
import Link from 'next/link';

function SideBar() {
  return (
    <div className="flex flex-col space-y-8 p-4">
    <Link href={"/"}>
      <House className="w-8 h-8" />
    </Link>

    <Link href={"/playlist"}>
      <ListMusic className="w-8 h-8" />
    </Link>

    <Link href={"/download"}>
      <Download className="w-8 h-8" />
    </Link>

    <Link href={"/settings"}>
      <Settings className="w-8 h-8" />
    </Link>
    </div>
  );
}

export default SideBar;
