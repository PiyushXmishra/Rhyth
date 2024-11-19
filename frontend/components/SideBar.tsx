import React from "react";
import { House, ListMusic, Download, Settings, Heart, History } from "lucide-react";
import Link from "next/link";

function SideBar() {
  return (
    <div className="hidden lg:flex flex-col justify-between">
      <div className="flex flex-col space-y-8 p-4">
        <Link href={"/"}>
          <House className="w-8 h-8" />
        </Link>

        <Link href={"/yourplaylists"}>
          <ListMusic className="w-8 h-8" />
        </Link>

        <Link href={"/history"}>
          <History className="w-8 h-8" />
        </Link>

        <Link href={"/download"}>
          <Download className="w-8 h-8" />
        </Link>
      </div>
      <div className="flex flex-col space-y-8 p-4">
        <Link href={"/settings"}>
          <Settings className="w-8 h-8" />
        </Link>
      </div>
    </div>
  );
}

export default SideBar;
