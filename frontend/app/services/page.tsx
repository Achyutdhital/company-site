import { getServices } from '../../lib/api'
import Link from 'next/link'
import { Service } from '../../lib/types'
import { ArrowRight, ShieldCheck, Zap, Globe2 } from 'lucide-react'

export const metadata = {
  title: 'Services — EliteTech',
  description: 'Web development, SEO, App development, UI/UX, and security.'
}

export default async function ServicesPage() {
  let services: Service[] = []
  try {
    services = await getServices()
  } catch (e) {
    console.error('Failed to fetch services', e)
  }

  return (
    <main className="pt-32 pb-24 px-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[480px] h-[480px] bg-brand-primary/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[480px] h-[480px] bg-brand-accent/10 blur-[120px] rounded-full translate-y-1/3 -translate-x-1/4" />

      <section className="max-w-7xl mx-auto relative z-10 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 items-end">
          <div>
            <p className="text-sm font-bold tracking-[0.4em] text-brand-primary uppercase mb-6">Services</p>
            <h1 className="text-5xl md:text-7xl font-outfit font-bold leading-tight tracking-tight">
              Strategy, design, development, and growth under one roof.
            </h1>
            <p className="mt-6 text-xl text-text-secondary max-w-3xl leading-relaxed">
              We help teams launch faster, look premium, and keep improving after launch with a focused set of services built for modern businesses.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Globe2, label: 'Web & product build' },
              { icon: Zap, label: 'Growth-ready SEO' },
              { icon: ShieldCheck, label: 'Security-first delivery' },
              { icon: ArrowRight, label: 'Faster launch cycles' },
            ].map((item) => {
              const Icon = item.icon
              return (
                <div key={item.label} className="glass-card rounded-3xl p-5 min-h-32 flex flex-col justify-between">
                  <Icon className="h-5 w-5 text-brand-accent" />
                  <div className="text-sm text-text-secondary mt-10">{item.label}</div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {services.length === 0 && <div className="text-text-secondary">No services found.</div>}
          {services.map((s, index) => (
            <article key={s.id} className="glass-card p-7 rounded-[2rem] group relative overflow-hidden">
              <div className="absolute top-5 right-5 text-xs text-text-muted">0{index + 1}</div>
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-tr from-brand-primary to-brand-secondary flex items-center justify-center mb-5 text-white text-xl shadow-lg">
                {s.name.charAt(0)}
              </div>
              <h2 className="text-2xl font-outfit font-bold mb-3">{s.name}</h2>
              <p className="text-text-secondary leading-relaxed mb-6">{s.shortDescription}</p>
              <div className="space-y-3 text-sm text-text-secondary mb-6">
                <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-brand-accent" /> Premium deliverables</div>
                <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-brand-primary" /> Clear communication</div>
                <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-brand-secondary" /> Built to convert</div>
              </div>
              <Link href={`/services/${s.slug}`} className="inline-flex items-center gap-2 text-brand-accent font-medium group-hover:translate-x-1 transition-transform">
                Explore service <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
