'use client'
import { useEffect, useState } from 'react'

export default function AnimatedCounter({ value }: { value: number }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let raf: number
    const start = performance.now()
    const duration = 800
    const animate = (t: number) => {
      const progress = Math.min((t - start) / duration, 1)
      setCount(Math.floor(progress * value))
      if (progress < 1) raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [value])

  return <span>{count}</span>
}
