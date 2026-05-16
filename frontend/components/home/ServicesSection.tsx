import Link from 'next/link'
import { Code2, Cpu, Globe, Layout, Smartphone, Rocket, Zap, Database } from 'lucide-react'

const serviceIcons: Record<string, any> = {
  'Web Development': Globe,
  'AI & Machine Learning': Cpu,
  'UI/UX Design': Layout,
  'Mobile Apps': Smartphone,
  'Cloud Solutions': Database,
  'Performance Optimization': Zap
}


export default function ServicesSection({ services }: { services?: any[] }) {
  const fallback = [
    { id: 1, name: 'Web Development', shortDescription: 'Architecting high-performance, scalable web applications with cutting-edge frameworks.', color: 'from-blue-500/20 to-indigo-500/20' },
    { id: 2, name: 'AI & Machine Learning', shortDescription: 'Integrating intelligent algorithms and predictive models into your business workflow.', color: 'from-purple-500/20 to-pink-500/20' },
    { id: 3, name: 'UI/UX Design', shortDescription: 'Crafting immersive digital experiences focused on user-centric design principles.', color: 'from-cyan-500/20 to-blue-500/20' },
    { id: 4, name: 'Mobile Apps', shortDescription: 'Building native and cross-platform mobile solutions that users love.', color: 'from-emerald-500/20 to-teal-500/20' },
    { id: 5, name: 'Cloud Solutions', shortDescription: 'Seamless migration and management of robust cloud infrastructures.', color: 'from-orange-500/20 to-red-500/20' },
    { id: 6, name: 'Performance Optimization', shortDescription: 'Fine-tuning your digital products for maximum speed and efficiency.', color: 'from-indigo-500/20 to-violet-500/20' },
  ]

  const items = services && services.length ? services : fallback

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-sm font-bold tracking-widest text-brand-primary uppercase mb-4">Our Expertise</h2>
            <h3 className="text-4xl md:text-5xl font-outfit font-bold">Solutions that drive <span className="gradient-text">Innovation</span></h3>
          </div>
          <p className="text-text-secondary max-w-sm">
            We leverage the latest technologies to build software that gives your business a competitive edge.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((s, idx) => {
            const Icon = serviceIcons[s.name] || Code2
            return (
              <div 
                key={s.id} 
                className={`glass-card p-8 rounded-3xl group flex flex-col justify-between min-h-[320px] ${idx === 0 || idx === 3 ? 'md:col-span-1 lg:col-span-2' : ''}`}
              >
                <div>
                  <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${s.color || 'from-brand-primary/20 to-brand-secondary/20'} mb-8 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform duration-500`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-outfit font-bold mb-4">{s.name}</h3>
                  <p className="text-text-secondary leading-relaxed mb-8">{s.shortDescription}</p>
                </div>
                
                <Link 
                  href={`/services/${s.slug || s.id}`} 
                  className="flex items-center gap-2 text-sm font-semibold text-brand-accent group/link"
                >
                  Explore Service 
                  <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

