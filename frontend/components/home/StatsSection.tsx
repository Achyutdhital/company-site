import AnimatedCounter from '../shared/AnimatedCounter'

export default function StatsSection() {
  const stats = [
    { label: 'Years of Excellence', value: 10, suffix: '+' },
    { label: 'Successful Projects', value: 120, suffix: '+' },
    { label: 'Global Clients', value: 45, suffix: '' },
    { label: 'Industry Awards', value: 12, suffix: '' },
  ]

  return (
    <section className="py-24 relative">
      {/* Decorative background blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 h-2/3 bg-brand-primary/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <div key={i} className="glass-card p-10 rounded-3xl text-center group">
              <div className="text-5xl md:text-6xl font-outfit font-black mb-4 gradient-text group-hover:scale-110 transition-transform duration-500">
                <AnimatedCounter value={s.value} />{s.suffix}
              </div>
              <div className="text-sm font-medium tracking-widest uppercase text-text-muted group-hover:text-text-secondary transition-colors">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

