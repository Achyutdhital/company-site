"use client"

import { MoonStar, SunMedium } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return <button className="h-10 w-10 rounded-full border border-bg-border bg-bg-secondary/80" aria-label="Toggle theme" />
  }

  const isDark = theme !== 'light'

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="h-10 w-10 rounded-full border border-bg-border bg-bg-secondary/80 flex items-center justify-center text-text-primary hover:border-brand-primary/50 hover:bg-brand-primary/10 transition-colors"
      aria-label="Toggle color theme"
    >
      {isDark ? <SunMedium className="h-4 w-4" /> : <MoonStar className="h-4 w-4" />}
    </button>
  )
}
