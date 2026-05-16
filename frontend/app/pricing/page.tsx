import { getPricing } from '../../lib/api'
import PricingCards from '../../components/pricing/PricingCards'
import { MessageCircle, ShieldCheck, Sparkles, Globe2, Headphones, Zap } from 'lucide-react'

export const metadata = {
  title: 'Premium Solutions Pricing | EliteSolutions Nepal',
  description: 'Enterprise-grade software and SEO packages tailored for the Nepali and global markets.'
}

export default async function PricingPage() {
  let plans: any[] = []
  try {
    plans = await getPricing()
  } catch (e) {
    console.error('Failed to fetch pricing', e)
    plans = [
      { id: 1, name: 'Standard', slug: 'standard', category: 'seo', price: 'Rs 20,000/mo', tagline: 'Preferred for small businesses', featureGroups: [{ name: 'Initial website analysis', features: [{ text: 'Upto 10 Keyword Ranking', isIncluded: true }, { text: 'Site Audit', isIncluded: true }] }] },
      { id: 2, name: 'Professional', slug: 'professional', category: 'seo', price: 'Rs 25,000/mo', isPopular: true, tagline: 'Preferred for mid size businesses', featureGroups: [{ name: 'Initial website analysis', features: [{ text: 'Upto 20 Keyword Ranking', isIncluded: true }, { text: 'Site Audit', isIncluded: true }] }] },
      { id: 3, name: 'Premium', slug: 'premium', category: 'seo', price: 'Rs 30,000/mo', tagline: 'Preferred for large businesses', featureGroups: [{ name: 'Initial website analysis', features: [{ text: 'Upto 40 Keyword Ranking', isIncluded: true }, { text: 'Site Audit', isIncluded: true }] }] },
      { id: 4, name: 'Premium Plus', slug: 'premium-plus', category: 'seo', price: 'Contact Sales', tagline: 'Preferred for highly competitive businesses', featureGroups: [{ name: 'Initial website analysis', features: [{ text: 'Upto 60 Keyword Ranking', isIncluded: true }, { text: 'Site Audit', isIncluded: true }] }] }
    ]
  }

  const seoPlans = plans.filter((plan) => plan.category === 'seo')
  const socialPlans = plans.filter((plan) => plan.category === 'social')

  if (seoPlans.length > 1) seoPlans[1].isPopular = true
  if (socialPlans.length > 0) socialPlans[0].isPopular = true

  return (
    <main className="pt-40 md:pt-48 pb-24 px-6 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-brand-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-brand-accent/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/4" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-5xl mx-auto mb-16 pt-4">
          <p className="text-sm font-bold tracking-[0.4em] text-brand-primary uppercase mb-6">Service Packages</p>
          <h1 className="text-5xl md:text-7xl font-outfit font-bold mb-8 tracking-tight">
            Pick the package that matches <br />
            <span className="gradient-text">your growth stage</span>
          </h1>
          <p className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-3xl mx-auto">
            Clear packages for search growth and social media growth, with structured deliverables and no guesswork.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a href="#seo-packages" className="rounded-full border border-bg-border bg-bg-secondary/70 px-5 py-3 text-sm font-medium text-text-primary hover:border-brand-primary/30 hover:bg-brand-primary/10 transition-colors">SEO Packages</a>
            <a href="#social-packages" className="rounded-full border border-bg-border bg-bg-secondary/70 px-5 py-3 text-sm font-medium text-text-primary hover:border-brand-primary/30 hover:bg-brand-primary/10 transition-colors">Social Media Packages</a>
            <a href="/contact" className="rounded-full border border-brand-primary/30 bg-brand-primary/10 px-5 py-3 text-sm font-medium text-brand-primary hover:bg-brand-primary/20 transition-colors">Request custom quote</a>
          </div>
        </div>

        <section id="seo-packages" className="space-y-8 scroll-mt-40">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-4">
            <div>
              <p className="text-sm font-bold tracking-[0.35em] text-brand-accent uppercase mb-3">SEO Packages</p>
              <h2 className="text-3xl md:text-4xl font-outfit font-bold">Full search growth packages</h2>
            </div>
            <p className="max-w-2xl text-text-secondary">From initial website analysis to monthly reporting, each package is laid out in clear groups so clients can compare value quickly.</p>
          </div>
          <PricingCards plans={seoPlans} />
        </section>

        <section id="social-packages" className="space-y-8 mt-24 scroll-mt-40">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-4">
            <div>
              <p className="text-sm font-bold tracking-[0.35em] text-brand-accent uppercase mb-3">Social Media Packages</p>
              <h2 className="text-3xl md:text-4xl font-outfit font-bold">Content and growth packages</h2>
            </div>
            <p className="max-w-2xl text-text-secondary">Built for brands that need consistent content, reels, engagement, and monthly reporting with a steady growth system.</p>
          </div>
          <PricingCards plans={socialPlans} />
        </section>

        <div className="mt-8 text-center text-sm text-text-muted">
          * All packages are exclusive of VAT. Contract: minimum 6 months.
        </div>

        <div className="mt-6 flex justify-center">
          <a href="https://wa.me/9779867512535" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm text-text-primary hover:bg-white/5 transition-colors">
            <MessageCircle className="h-4 w-4" /> Quick Enquiry on WhatsApp
          </a>
        </div>

        {/* Nepali Market Trust Section */}
        <div className="mt-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 border-t border-bg-border pt-24">
          <div className="space-y-4">
            <Globe2 className="w-10 h-10 text-brand-primary" />
            <h4 className="text-xl font-bold font-outfit">Local Expertise</h4>
            <p className="text-text-muted text-sm leading-relaxed">Headquartered in Kathmandu, we understand the local market nuances and challenges.</p>
          </div>
          <div className="space-y-4">
            <ShieldCheck className="w-10 h-10 text-brand-accent" />
            <h4 className="text-xl font-bold font-outfit">Quality Guaranteed</h4>
            <p className="text-text-muted text-sm leading-relaxed">We adhere to international coding standards to ensure your product is world-class.</p>
          </div>
          <div className="space-y-4">
            <Headphones className="w-10 h-10 text-brand-secondary" />
            <h4 className="text-xl font-bold font-outfit">24/7 Local Support</h4>
            <p className="text-text-muted text-sm leading-relaxed">Never worry about time zones. Our support team is always available for our Nepali clients.</p>
          </div>
          <div className="space-y-4">
            <Zap className="w-10 h-10 text-amber-500" />
            <h4 className="text-xl font-bold font-outfit">Rapid Delivery</h4>
            <p className="text-text-muted text-sm leading-relaxed">We use agile methodologies to ship your product faster without compromising quality.</p>
          </div>
        </div>

        {/* Custom Solution Callout */}
        <div className="mt-32 glass-card p-12 rounded-[3rem] text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
             <Globe2 className="w-64 h-64 -rotate-12" />
          </div>
          <h3 className="text-3xl md:text-4xl font-outfit font-bold mb-6">Need a custom solution?</h3>
          <p className="text-text-secondary mb-10 max-w-2xl mx-auto">
            Sometimes your needs don't fit into a box. We specialize in building custom enterprise software from the ground up. Let's discuss your specific requirements.
          </p>
          <a 
            href="/contact" 
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-bold hover:bg-brand-accent hover:text-white transition-all group"
          >
            Schedule a Strategy Call
            <Zap className="w-4 h-4 group-hover:scale-125 transition-transform" />
          </a>
        </div>
      </div>
    </main>
  )
}

