import Link from 'next/link'
import { getSiteSettings, getClients } from '../../lib/api'
import { Award, Users, Target, Rocket, ArrowRight } from 'lucide-react'
import Image from 'next/image'

export const metadata = {
  title: 'Our Story | EliteSolutions Nepal',
  description: 'Learn how we became Nepal\'s leading design-led engineering studio.'
}

export default async function AboutPage() {
  const [settings, clients] = await Promise.all([
    getSiteSettings().catch(() => null),
    getClients().catch(() => []),
  ])

  return (
    <main className="pt-32 pb-24 px-6 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-primary/5 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-accent/5 blur-[150px] rounded-full translate-y-1/2 -translate-x-1/3" />

      <div className="max-w-7xl mx-auto relative z-10">
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
          <div className="space-y-8">
            <div className="inline-block px-4 py-2 rounded-full glass border border-white/10 text-xs font-bold uppercase tracking-widest text-brand-accent">
              Our Legacy
            </div>
            <h1 className="text-5xl md:text-7xl font-outfit font-bold leading-tight tracking-tight">
              Crafting the <br />
              <span className="gradient-text">Digital Backbone</span> <br />
              of Nepal
            </h1>
            <p className="text-xl text-text-secondary leading-relaxed max-w-xl">
              {settings?.aboutSummary || 'We are a group of obsessed engineers and designers who believe that Nepal can lead the global tech revolution. We don\'t just build software; we build the future.'}
            </p>
            <div className="flex flex-wrap gap-6">
              <Link href="/contact" className="px-8 py-4 rounded-full bg-brand-primary text-white font-bold hover:bg-brand-secondary transition-all shadow-lg shadow-brand-primary/20">
                Start Your Journey
              </Link>
              <Link href="/portfolio" className="px-8 py-4 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 font-bold transition-all flex items-center gap-2">
                View Our Impact <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-tr from-brand-primary to-brand-accent opacity-20 blur-2xl rounded-[3rem] group-hover:opacity-30 transition-opacity" />
            <div className="relative glass-card p-10 rounded-[3rem] overflow-hidden">
               <div className="grid grid-cols-2 gap-6">
                  <div className="p-8 rounded-3xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                     <div className="text-4xl font-outfit font-black text-brand-primary mb-2">{settings?.yearsExperience || 10}+</div>
                     <div className="text-xs font-bold uppercase tracking-widest text-text-muted">Years of Excellence</div>
                  </div>
                  <div className="p-8 rounded-3xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                     <div className="text-4xl font-outfit font-black text-brand-accent mb-2">{settings?.projectsCompleted || 120}+</div>
                     <div className="text-xs font-bold uppercase tracking-widest text-text-muted">Projects Shipped</div>
                  </div>
                  <div className="p-8 rounded-3xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                     <div className="text-4xl font-outfit font-black text-brand-secondary mb-2">{settings?.countriesServed || 5}</div>
                     <div className="text-xs font-bold uppercase tracking-widest text-text-muted">Global Markets</div>
                  </div>
                  <div className="p-8 rounded-3xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                     <div className="text-4xl font-outfit font-black text-white mb-2">{settings?.rating || 5.0}</div>
                     <div className="text-xs font-bold uppercase tracking-widest text-text-muted">Client Satisfaction</div>
                  </div>
               </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-32">
           <div className="space-y-6">
              <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center">
                 <Target className="w-8 h-8 text-indigo-500" />
              </div>
              <h3 className="text-2xl font-outfit font-bold">Our Mission</h3>
              <p className="text-text-secondary leading-relaxed">To empower businesses through cutting-edge technology, helping them navigate the complexities of the digital age with ease and excellence.</p>
           </div>
           <div className="space-y-6">
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center">
                 <Rocket className="w-8 h-8 text-cyan-500" />
              </div>
              <h3 className="text-2xl font-outfit font-bold">Our Vision</h3>
              <p className="text-text-secondary leading-relaxed">To be the global benchmark for design-led engineering, originating from the heart of Nepal and serving the most ambitious brands worldwide.</p>
           </div>
           <div className="space-y-6">
              <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center">
                 <Users className="w-8 h-8 text-purple-500" />
              </div>
              <h3 className="text-2xl font-outfit font-bold">Our Core Values</h3>
              <p className="text-text-secondary leading-relaxed">Integrity, innovation, and impact. We believe in building products that don't just look good, but work exceptionally well.</p>
           </div>
        </section>

        <section className="glass-card p-16 rounded-[4rem] relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
             <Award className="w-96 h-96" />
          </div>
          <div className="max-w-3xl">
             <h2 className="text-4xl font-outfit font-bold mb-8">Trusted by the best in the industry</h2>
             <p className="text-text-secondary mb-12 leading-relaxed">
               We have partnered with companies ranging from local startups to international giants. Our commitment to quality remains the same regardless of the project scale.
             </p>
             <div className="flex flex-wrap gap-8 items-center opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
               {clients.slice(0, 4).map((client: any) => (
                 <div key={client.id} className="text-xl font-outfit font-black text-white/50">{client.name}</div>
               ))}
             </div>
          </div>
        </section>
      </div>
    </main>
  )
}

