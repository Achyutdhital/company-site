"use client"
import { TypeAnimation } from 'react-type-animation'

export default function TypeAnimationClient({ className }: { className?: string }) {
  return (
    <TypeAnimation
      sequence={["Solutions", 1500, "Experiences", 1500, "Products", 1500, "Futures", 1500]}
      wrapper="span"
      cursor={true}
      repeat={Infinity}
      className={className}
    />
  )
}
