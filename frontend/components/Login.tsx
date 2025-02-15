'use client'

import { signIn } from "next-auth/react"
import Image from "next/image"
import rhyth from "@/public/NavbarImage.png"
import google from "@/public/pngimg.com - google_PNG19635.png"

export default function LoginPage() {
  
  function handleSignin() {
    signIn("google", { callbackUrl: `${window.location.origin}` });
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center ">
      <Image src={rhyth} alt="Rhyth." width={120}  className="max-h-min" />

      <div className="text-xl lg:text-3xl text-center font-semibold text-white">
        Log in to Rhyth
      </div>

      <button 
        onClick={handleSignin} 
        className="flex gap-3 p-2 px-5 rounded-full border border-gray-400 hover:border-white bg-transparent shadow-md items-center justify-center mt-6"
      >
        <Image src={google} alt="Google Logo" width={24} height={24} />
        <span className="text-white font-medium text-base">
          Continue with Google
        </span>
      </button>
    </div>
  )
}
