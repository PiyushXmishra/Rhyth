import React from 'react'
import { signOut, useSession , signIn} from 'next-auth/react'
import { Button } from './ui/button';
import { ChevronUp, LogIn, LogInIcon, LogOut, UserRound } from 'lucide-react';
import Image from 'next/image';
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import Link from 'next/link';
import AccountDropdown from './AccountDropdown';
function User() {
    const {data:session} = useSession();
  return (
    <div>
      { session ? (
<AccountDropdown/>
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
       <LogInIcon
       onClick={()=>signIn("google")}
       />
      </div>
      </>
      )}
    </div>
  )
}

export default User
