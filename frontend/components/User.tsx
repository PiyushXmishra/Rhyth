import React from 'react'
import { signOut, useSession , signIn} from 'next-auth/react'
import { Button } from './ui/button';
import { ChevronUp, LogIn, LogOut, UserRound } from 'lucide-react';
import Image from 'next/image';
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import Link from 'next/link';
function User() {
    const {data:session} = useSession();
  return (
    <div>
      { session?(
<div>
<DropdownMenu>
        <DropdownMenuTrigger asChild className="w-full">
          <div className="group flex w-full items-center rounded-full text-sm font-semibold leading-6 text-foreground hover:bg-textcolour lg:gap-x-3 lg:rounded-md lg:p-2 ">
            {session?.user?.image ? (
              <Image
                className="h-7 w-7 rounded-full bg-secondary"
                src={session?.user?.image}
                width={30}
                height={30}
                alt={`Profile picture of ${session?.user?.name}`}
                loading="lazy"
              />
            ) : (
              <UserRound className="h-7 w-7 rounded-full bg-secondary p-1 ring-1 ring-muted-foreground/50" />
            )}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-2 px-0 pb-2 w-56 bg-secondary rounded-2xl border-gray-800 text-white">
          {session ? (
            <>
              <DropdownMenuLabel className="mt-2 truncate !py-[3px] px-3 text-sm text-muted-foreground">
                {session?.user?.email}
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="!my-2" />
              <Link
                onClick={() =>
                  signOut({
                    callbackUrl: `${window.location.origin}`,
                  })
                }
                className="flex items-center px-3 py-2 text-sm duration-200 "
                href={""}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Link>
            </>
          ) : null}
        </DropdownMenuContent>
      </DropdownMenu>
</div>
      ): (
        <>
        <div className="hidden md:flex items-center space-x-2 gap-4">
        <Button
          variant="outline"
          onClick={()=>signIn("google")}
          className="bg-secondary text-md font-medium text-secondary-foreground rounded-full py-6 px-5"
        >
          Sign In
        </Button>
      </div>
      <div className='flex md:hidden'>
        <Button 
         onClick={()=>signIn("google")}
        >
        <LogIn/>
        </Button>

      </div>
      </>
      )}
    </div>
  )
}

export default User
