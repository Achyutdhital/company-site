"use client"

import * as Tabs from '@radix-ui/react-tabs'
import PricingAccordion from './PricingAccordion'
import { PricingPlan } from '../../lib/types'

export default function PricingTabs({ plans }: { plans: PricingPlan[] }) {
  const seoPlans = plans.filter((plan) => plan.category === 'seo')
  const socialPlans = plans.filter((plan) => plan.category === 'social')

  return (
    <Tabs.Root defaultValue="seo" className="space-y-8">
      <Tabs.List className="inline-flex p-1 rounded-full bg-bg-tertiary border border-bg-border">
        <Tabs.Trigger value="seo" className="px-4 py-2 rounded-full data-[state=active]:bg-brand-primary data-[state=active]:text-white">
          SEO Packages
        </Tabs.Trigger>
        <Tabs.Trigger value="social" className="px-4 py-2 rounded-full data-[state=active]:bg-brand-primary data-[state=active]:text-white">
          Social Media Packages
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="seo">
        <PricingAccordion plans={seoPlans} />
      </Tabs.Content>
      <Tabs.Content value="social">
        <PricingAccordion plans={socialPlans} />
      </Tabs.Content>
    </Tabs.Root>
  )
}
