import {
    Download,
    EllipsisVertical,
    ListMusic,
    Mail,
    MessageSquare,
    PlusCircle,
  } from "lucide-react"
  
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { use, useEffect } from "react"
import axios from "axios"
  
  export function Dropdown({ videoId , videoTitle}: { videoId: string , videoTitle:string }) {

    async function DownloadSong(videoId: string) {
        try {
        const response =   await axios.get(`${process.env.NEXT_PUBLIC_SONG_DOWNLAOD_URL}/${videoId}`, {
            responseType: 'blob',
            headers: {
                'ngrok-skip-browser-warning': 'true', // Set the custom header
            }, 
          })
          const url = URL.createObjectURL(response.data)
          const link = document.createElement('a')
          link.href = url
          link.download = `${videoTitle}.m4a` // or appropriate file name
          link.click()
          URL.revokeObjectURL(url) // Clean up
        } catch (error) {
          console.error("Download error:", error)
        }
      }

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
        <EllipsisVertical className="fill-white" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => DownloadSong(videoId)}>
             <Download/>
              <span className="ml-2">Download Song</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <ListMusic />
                <span className="ml-2">Add to PlayList</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>
                    <Mail />
                    <span>Email</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <MessageSquare />
                    <span>Message</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <PlusCircle />
                    <span>More...</span>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
  