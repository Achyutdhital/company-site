import Link from 'next/link'
import { getSiteSettings } from '../../../lib/api'

export const metadata = {
  title: 'CEO Message — EliteTech',
  description: 'A note from the founder on how EliteTech approaches design, engineering, and growth.'
}

export default async function CeoMessagePage() {
  const settings = await getSiteSettings().catch(() => null)

  return (
    <main className="max-w-5xl mx-auto px-6 py-24">
      <section className="glass rounded-3xl p-10 md:p-14 space-y-6">
        <p className="text-brand-accent uppercase tracking-[0.35em] text-sm">CEO Message</p>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">{settings?.ceoName || 'Achu Dev'} on building trust through design and delivery</h1>
        <p className="text-text-secondary text-lg leading-relaxed">
          {settings?.ceoMessage || 'We build the kind of digital presence that makes businesses feel inevitable.'}
        </p>
        <p className="text-text-secondary leading-relaxed">
          At EliteTech, our standard is simple: the work should feel premium, load fast, and convert. We combine strategy,
          design, and engineering so our clients do not have to stitch together separate teams to get something exceptional.
        </p>
        <div className="pt-4 flex flex-wrap gap-4 items-center">
          <div>
            <div className="font-semibold text-text-primary">{settings?.ceoName || 'Achu Dev'}</div>
            <div className="text-text-secondary">{settings?.ceoRole || 'Founder & CEO'}</div>
          </div>
          <Link href="/contact" className="px-5 py-3 rounded-full bg-gradient-to-r from-brand-primary to-brand-secondary ml-auto">
            Talk to us
          </Link>
        </div>
      </section>
    </main>
  )
}
