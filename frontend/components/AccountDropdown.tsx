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
import { Separator } from "@/components/ui/separator"

export default function AccountDrawer() {
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
          {session?.user?.image ? (
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
          )}
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader className="text-center">
            <DrawerTitle>Account</DrawerTitle>
          </DrawerHeader>
          <div className="p-4 pb-0">
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
            <Separator className="my-4" />
            <nav className="space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => {
                  signOut({ callbackUrl: `${window.location.origin}` })
                  setIsOpen(false)
                }}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </nav>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}