"use client"
import { Check, X, Sparkles } from 'lucide-react'
import Link from 'next/link'

export default function PricingCards({ plans }: { plans: any[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch">
      {plans.map((plan, idx) => (
        <div 
          key={plan.id} 
          className={`relative glass-card p-6 rounded-[2rem] flex flex-col overflow-hidden ${plan.isPopular ? 'border-brand-primary bg-white/5 ring-1 ring-brand-primary shadow-[0_0_40px_rgba(99,102,241,0.15)]' : ''}`}
        >
          {plan.isPopular && (
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-primary text-white px-4 py-1 rounded-full text-xs font-bold flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> MOST POPULAR
            </div>
          )}
          
          <div className="mb-6">
            <p className="text-xs uppercase tracking-[0.35em] text-brand-accent mb-3">
              {plan.category === 'social' ? 'Social Media Package' : 'SEO Package'}
            </p>
            <h3 className="text-2xl font-outfit font-bold mb-2">{plan.name}</h3>
            <p className="text-text-muted text-sm min-h-[2.5rem]">{plan.tagline}</p>
          </div>

          <div className="mb-6">
            <div className="flex items-baseline gap-1 flex-wrap">
              <span className="text-3xl font-outfit font-black">{plan.price || 'Contact Sales'}</span>
              {plan.price && <span className="text-text-muted text-sm">/ mon</span>}
            </div>
            <p className="mt-2 text-sm text-text-muted">{plan.hasProjectManager ? 'Dedicated Project Manager' : 'No Dedicated Project Manager'}</p>
          </div>

          <div className="flex-grow space-y-5 mb-8">
            {plan.featureGroups?.map((group: any, gi: number) => (
              <div key={gi} className="rounded-2xl bg-black/10 border border-white/5 p-4">
                <div className="text-xs font-bold text-brand-accent uppercase tracking-widest mb-3">{group.name}</div>
                <ul className="space-y-2">
                  {group.features.map((feature: any, fi: number) => (
                    <li key={fi} className="flex items-start gap-3 text-sm leading-snug">
                      {feature.isIncluded ? (
                        <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                      ) : (
                        <X className="w-5 h-5 text-text-muted shrink-0 opacity-30" />
                      )}
                      <span className={feature.isIncluded ? 'text-text-primary' : 'text-text-muted line-through opacity-50'}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <Link 
            href={`/contact?plan=${encodeURIComponent(plan.name)}`}
            className={`w-full py-4 rounded-2xl font-bold text-center transition-all ${
              plan.isPopular 
                ? 'bg-brand-primary text-white hover:bg-brand-secondary shadow-lg' 
                : 'bg-bg-secondary/80 border border-bg-border text-text-primary hover:bg-brand-primary/10 hover:border-brand-primary/30'
            }`}
          >
            Select Plan
          </Link>
        </div>
      ))}
    </div>
  )
}
