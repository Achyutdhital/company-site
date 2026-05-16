'use client'
import { useEffect, useState } from 'react'

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    function onScroll() {
      const scrolled = window.scrollY
      const height = document.body.scrollHeight - window.innerHeight
      const pct = height > 0 ? (scrolled / height) * 100 : 0
      setProgress(Math.min(100, Math.max(0, pct)))
    }
    window.addEventListener('scroll', onScroll)
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 4, zIndex: 9999 }}>
      <div style={{ width: `${progress}%`, height: '100%', background: 'linear-gradient(90deg,#6366F1,#8B5CF6)' }} />
    </div>
  )
}
