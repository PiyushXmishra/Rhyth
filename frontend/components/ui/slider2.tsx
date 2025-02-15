"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

const Slider2 = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center cursor-not-allowed",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-0.5 w-full grow overflow-hidden rounded-full bg-transparent cursor-not-allowed">
      
      <SliderPrimitive.Range className="absolute h-full rounded-lg bg-white/80 cursor-not-allowed" />
    </SliderPrimitive.Track>
    
  </SliderPrimitive.Root>
))
Slider2.displayName = SliderPrimitive.Root.displayName

export { Slider2 }
