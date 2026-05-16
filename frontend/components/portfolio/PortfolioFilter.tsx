'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { ExternalLink, Github } from 'lucide-react'

export default function PortfolioFilter({ initialProjects }: { initialProjects?: any[] }) {
  const [filter, setFilter] = useState<'all' | string>('all')
  const projects = initialProjects || []
  
  // Enhanced fallback if no projects
  const items = projects.length > 0 ? projects : [
    { id: 1, title: 'HealthFlow Platform', description: 'Enterprise health management system for regional hospitals.', category: 'Web App', image: '/portfolio_project_placeholder.png' },
    { id: 2, title: 'NepalEats Delivery', description: 'Next-gen food delivery ecosystem with real-time tracking.', category: 'Mobile', image: '/portfolio_project_placeholder.png' },
    { id: 3, title: 'FinGuard AI', description: 'AI-powered fraud detection system for banking institutions.', category: 'AI/ML', image: '/portfolio_project_placeholder.png' },
    { id: 4, title: 'CloudStore E-commerce', description: 'High-performance headless commerce solution.', category: 'E-commerce', image: '/portfolio_project_placeholder.png' },
  ]

  const categories = ['all', ...Array.from(new Set(items.map(p => p.category))).filter(Boolean)]

  const visible = filter === 'all' ? items : items.filter(p => p.category === filter)

  return (
    <div className="space-y-12">
      <div className="flex flex-wrap gap-4 justify-center">
        {categories.map(c => (
          <button 
            key={c} 
            onClick={() => setFilter(c)} 
            className={`
              px-8 py-3 rounded-full font-bold text-sm transition-all duration-300
              ${filter === c 
                ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20 scale-105' 
                : 'bg-white/5 text-text-muted hover:text-white border border-white/5 hover:border-white/10'}
            `}
          >
            {c.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <AnimatePresence mode="popLayout">
          {visible.map((p, idx) => (
            <motion.article 
              key={p.id} 
              layout 
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-card p-4 rounded-[2.5rem] group"
            >
              <div className="relative aspect-[16/10] rounded-[2rem] overflow-hidden mb-6 bg-bg-tertiary">
                <Image 
                  src={p.image || '/portfolio_project_placeholder.png'} 
                  alt={p.title} 
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-between p-8">
                   <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:bg-brand-accent hover:text-white transition-colors cursor-pointer">
                         <ExternalLink className="w-5 h-5" />
                      </div>
                      <div className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer">
                         <Github className="w-5 h-5" />
                      </div>
                   </div>
                   <div className="px-4 py-1 rounded-full glass text-xs font-bold uppercase tracking-widest">
                      {p.category}
                   </div>
                </div>
              </div>
              <div className="px-4 pb-4">
                <h3 className="text-2xl font-outfit font-bold mb-2 group-hover:text-brand-accent transition-colors">{p.title}</h3>
                <p className="text-text-secondary leading-relaxed line-clamp-2">
                   {p.description}
                </p>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

