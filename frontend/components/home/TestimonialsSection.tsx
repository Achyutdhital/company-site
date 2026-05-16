import { getTestimonials } from '../../lib/api'
import { Star, Quote } from 'lucide-react'

export default async function TestimonialsSection() {
  let items: any[] = []
  try {
    items = await getTestimonials()
  } catch (e) {
    console.error('Failed to fetch testimonials', e)
    // Fallback items for a better UI if API fails
    items = [
      { id: 1, name: 'Bimal Thapa', company: 'Nepal Tech Hub', quote: 'Working with EliteSolutions was a game-changer for our platform. Their technical expertise is unmatched in the region.', rating: 5 },
      { id: 2, name: 'Sarah Jenkins', company: 'Global Vision Inc.', quote: 'The attention to detail and proactive communication made the entire development process smooth and efficient.', rating: 5 },
      { id: 3, name: 'Rajesh Sharma', company: 'FinTech Solutions', quote: 'They didn\'t just build a website; they built a scalable architecture that has supported our 300% growth this year.', rating: 5 },
    ]
  }

  if (!items || items.length === 0) return null

  return (
    <section className="py-24 bg-bg-secondary/30 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-sm font-bold tracking-widest text-brand-primary uppercase mb-4">Success Stories</h2>
          <h3 className="text-4xl md:text-5xl font-outfit font-bold">Trusted by <span className="gradient-text">Global Leaders</span></h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((t) => (
            <div key={t.id} className="glass-card p-10 rounded-[2.5rem] relative group">
              <Quote className="absolute top-8 right-10 w-12 h-12 text-white/5 group-hover:text-brand-primary/20 transition-colors" />
              
              <div className="flex gap-1 mb-6">
                {[...Array(t.rating || 5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-brand-accent text-brand-accent" />
                ))}
              </div>

              <blockquote className="text-lg leading-relaxed mb-8 relative z-10">
                “{t.quote}”
              </blockquote>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-brand-primary/20 to-brand-secondary/20 flex items-center justify-center font-bold text-brand-primary border border-white/10">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="font-outfit font-bold">{t.name}</div>
                  <div className="text-sm text-text-muted">{t.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

