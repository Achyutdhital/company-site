"use client"
import TypeAnimationClient from '../components/home/TypeAnimationClient'
import ServicesSection from '../components/home/ServicesSection'
import ClientsSection from '../components/home/ClientsSection'
import StatsSection from '../components/home/StatsSection'
import ProcessSection from '../components/home/ProcessSection'
import TestimonialsSection from '../components/home/TestimonialsSection'
import TeamSection from '../components/home/TeamSection'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Home() {

  return (
    <main className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-20 px-6 overflow-hidden">
        {/* Decorative Background Image */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] opacity-20 pointer-events-none blur-3xl">
          <Image 
            src="/hero_abstract_tech.png" 
            alt="Hero Background" 
            fill
            className="object-cover"
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 border border-white/10"
          >
            <span className="flex h-2 w-2 rounded-full bg-brand-accent animate-pulse" />
            <span className="text-xs font-medium tracking-wider uppercase text-brand-accent">Nepal's Premier Tech Agency</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl font-outfit font-bold tracking-tight leading-none mb-8"
          >
            Engineering the <br />
            <span className="gradient-text">Next Generation</span>
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-2xl md:text-3xl font-light text-text-secondary mb-10 max-w-3xl mx-auto leading-relaxed"
          >
            We build digital{' '}
            <span className="text-text-primary font-medium underline decoration-brand-primary/30 decoration-4 underline-offset-8">
              <TypeAnimationClient />
            </span>
            {' '}that redefine industry standards.
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <button className="group relative px-8 py-4 rounded-full bg-brand-primary font-semibold text-white overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(99,102,241,0.4)]">
              <span className="relative z-10">Start Your Digital Journey</span>
              <div className="absolute inset-0 bg-gradient-to-r from-brand-secondary to-brand-primary opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <button className="px-8 py-4 rounded-full border border-white/10 bg-white/5 font-medium backdrop-blur-sm hover:bg-white/10 transition-all flex items-center gap-2 group">
              View Our Portfolio
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </motion.div>
        </div>

      </section>


      <ServicesSection />
      <ClientsSection />
      <ProcessSection />
      <TeamSection />
      <StatsSection />
      <TestimonialsSection />
    </main>
  )
}
