'use client'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react'

export default function AnimateOnScroll({ children, variants, className }: { children: React.ReactNode, variants?: any, className?: string }) {
  const [ref, inView] = useInView({ triggerOnce: true, rootMargin: '-100px' })

  useEffect(() => {}, [inView])

  return (
    <motion.div ref={ref as any} variants={variants} initial="hidden" animate={inView ? 'visible' : 'hidden'} className={className}>
      {children}
    </motion.div>
  )
}
