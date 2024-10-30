'use client'

import { LogOut, UserRound } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import useMediaQuery from './hooks/useMediaQuery'

function AccountContent({ onClose }: { onClose: () => void }) {
  const { data: session } = useSession()

  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="flex flex-col items-center space-y-4">
        {session?.user?.image ? (
          <Image
            className="h-24 w-24 rounded-full"
            src={session.user.image}
            width={96}
            height={96}
            alt={`Profile picture of ${session.user.name}`}
            loading="lazy"
          />
        ) : (
          <UserRound className="h-24 w-24 rounded-full bg-secondary p-4" />
        )}
        {session?.user?.name && (
          <p className="text-lg font-semibold">{session.user.name}</p>
        )}
        {session?.user?.email && (
          <p className="text-sm text-muted-foreground">{session.user.email}</p>
        )}
      </div>
      <Separator />
      <nav className="space-y-2">
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={() => {
            signOut({ callbackUrl: `${window.location.origin}` })
            onClose()
          }}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </nav>
    </div>
  )
}

export default function AccountMenu() {
  const isMobile = useMediaQuery("(max-width: 768px)")
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useState(false)

  const triggerContent = session?.user?.image ? (
    <Image
      className="h-8 w-8 rounded-full"
      src={session.user.image}
      width={32}
      height={32}
      alt={`Profile picture of ${session.user.name}`}
      loading="lazy"
    />
  ) : (
    <UserRound className="h-6 w-6" />
  )

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger asChild>
            {triggerContent}
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="text-center">
            <DrawerTitle>Account</DrawerTitle>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <AccountContent onClose={() => setIsOpen(false)} />
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className='cursor-pointer' >
         {triggerContent}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="px-2 py-1.5">
          <AccountContent onClose={() => {}} />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}