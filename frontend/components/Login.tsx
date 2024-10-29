'use client'

import { use, useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { signIn } from "next-auth/react"
export default function LoginPage() {

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
  }

  // Handle Google Sign-in on button click
  function handleSignin() {
    signIn("google", { callbackUrl: `${window.location.origin}` });
  }

  return (
    <div className="w-full">
      <Card className="w-full bg-accent">
        <CardHeader className="space-y-1">
          <CardTitle className="text-xl font-sans font-semibold ">Sign in & Customize your playlist</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Button variant="secondary" type="button" onClick={handleSignin}>
            Google
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}