'use client'
import * as Accordion from '@radix-ui/react-accordion'
import { useState } from 'react'
import { PricingPlan } from '../../lib/types'

export default function PricingAccordion({ plans }: { plans?: PricingPlan[] }) {
  const items = plans && plans.length ? plans : []
  const [open, setOpen] = useState<string | null>(items[0]?.slug || null)

  return (
    <Accordion.Root type="single" value={open || undefined} onValueChange={(v) => setOpen(v)} className="space-y-4">
      {items.map((p) => (
        <Accordion.Item key={p.id} value={p.slug} className="glass p-4 rounded">
          <Accordion.Header>
            <Accordion.Trigger className="w-full text-left flex justify-between items-center">
              <div>
                <div className="text-lg font-semibold">{p.name}</div>
                <div className="text-text-secondary">{p.tagline}</div>
              </div>
              <div className="text-2xl font-bold">{p.price || 'Contact'}</div>
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="mt-4">
            <div className="space-y-2">
              {p.featureGroups?.map((g, gi) => (
                <div key={gi}>
                  <div className="font-medium">{g.name}</div>
                  <ul className="mt-2 space-y-1 text-text-secondary">
                    {g.features.map((f, fi) => (
                      <li key={fi} className={`flex items-center gap-2 ${f.isIncluded ? '' : 'opacity-50'}`}>
                        <span className={`w-4 h-4 rounded-full ${f.isIncluded ? 'bg-brand-accent' : 'bg-white/10'}`} />
                        <span>{f.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <div className="mt-4">
                <a href={`/contact?plan=${encodeURIComponent(p.name)}`} className="px-4 py-2 rounded-full bg-gradient-to-r from-brand-primary to-brand-secondary">Select Plan</a>
              </div>
            </div>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  )
}
