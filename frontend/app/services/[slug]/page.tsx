import { getServiceBySlug } from '../../../lib/api'
import { getServices } from '../../../lib/api'
import { Service } from '../../../lib/types'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles, Layers, Zap } from 'lucide-react'

export async function generateStaticParams() {
  try {
    const services: Service[] = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1'}/services/`).then(async r => {
      const data = await r.json()
      return data.results || data
    })
    return services.map((s) => ({ slug: s.slug }))
  } catch (e) {
    return []
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const service = await getServiceBySlug(params.slug).catch(() => null)
  return {
    title: service ? `${service.name} — EliteTech` : 'Service — EliteTech',
    description: service?.metaDescription || service?.shortDescription || ''
  }
}

export default async function ServicePage({ params }: { params: { slug: string } }) {
  let service: Service | null = null
  let relatedServices: Service[] = []
  try {
    service = await getServiceBySlug(params.slug)
    relatedServices = (await getServices()).filter((item: Service) => item.slug !== params.slug).slice(0, 3)
  } catch (e) {
    console.error(e)
  }

  if (!service) {
    return <div className="max-w-4xl mx-auto px-6 py-32">Service not found.</div>
  }

  return (
    <article className="max-w-7xl mx-auto px-6 pt-40 pb-24">
      <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-12 items-start">
        <div className="space-y-8">
          <div>
            <p className="text-sm font-bold tracking-[0.35em] text-brand-accent uppercase mb-4">Service Detail</p>
            <h1 className="text-5xl md:text-7xl font-outfit font-bold tracking-tight leading-tight">{service.name}</h1>
            <p className="mt-6 text-xl text-text-secondary max-w-3xl leading-relaxed">{service.shortDescription}</p>
          </div>

          <div className="glass-card rounded-[2rem] p-8 space-y-6">
            <div className="flex items-center gap-3 text-brand-accent font-semibold uppercase tracking-[0.3em] text-xs">
              <Sparkles className="h-4 w-4" /> Why this service matters
            </div>
            <p className="text-text-secondary leading-relaxed text-lg">
              {service.fullDescription || 'Detailed information coming soon.'}
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                'Tailored to your brand and goals',
                'Built for performance and responsiveness',
                'Optimized for user experience and conversion',
                'Delivered with clear communication and scope',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl border border-bg-border bg-bg-secondary/60 p-4">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-text-primary text-sm leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {[
              { icon: Layers, title: 'Discovery & Planning', text: 'We map goals, user needs, and implementation scope before production work begins.' },
              { icon: Zap, title: 'Build & Iterate', text: 'We ship in focused stages so you can review, refine, and move faster.' },
              { icon: ShieldCheck, title: 'Quality & Security', text: 'Deliverables are tested for quality, accessibility, and safe deployment.' },
              { icon: ArrowRight, title: 'Launch & Support', text: 'We support the handoff and continue improving after launch when needed.' },
            ].map((step) => {
              const Icon = step.icon
              return (
                <div key={step.title} className="glass-card rounded-[1.75rem] p-6">
                  <Icon className="h-5 w-5 text-brand-primary mb-4" />
                  <h2 className="text-xl font-outfit font-bold mb-2">{step.title}</h2>
                  <p className="text-text-secondary leading-relaxed text-sm">{step.text}</p>
                </div>
              )
            })}
          </div>
        </div>

        <aside className="space-y-6 lg:sticky lg:top-32">
          <div className="glass-card rounded-[2rem] p-8 space-y-5">
            <p className="text-sm font-bold tracking-[0.3em] text-brand-accent uppercase">Overview</p>
            <div className="space-y-3 text-text-secondary text-sm leading-relaxed">
              <div><span className="text-text-primary font-semibold">Service:</span> {service.name}</div>
              <div><span className="text-text-primary font-semibold">Slug:</span> {service.slug}</div>
              <div><span className="text-text-primary font-semibold">Meta:</span> {service.metaDescription || 'No meta description yet.'}</div>
            </div>
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-brand-primary px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-secondary">
              Request a quote <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="glass-card rounded-[2rem] p-8 space-y-4">
            <p className="text-sm font-bold tracking-[0.3em] text-brand-accent uppercase">Related services</p>
            <div className="space-y-3">
              {relatedServices.map((related) => (
                <Link key={related.id} href={`/services/${related.slug}`} className="block rounded-2xl border border-bg-border bg-bg-secondary/60 p-4 hover:border-brand-primary/30 hover:bg-brand-primary/10 transition-colors">
                  <div className="font-semibold text-text-primary">{related.name}</div>
                  <div className="mt-1 text-sm text-text-secondary">{related.shortDescription}</div>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </article>
  )
}
