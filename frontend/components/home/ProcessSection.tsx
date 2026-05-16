import { CheckCircle2, MessageSquare, Paintbrush, Rocket, Settings } from 'lucide-react'

export default function ProcessSection() {
  const steps = [
    { 
      title: 'Discovery & Strategy', 
      desc: 'We dive deep into your business goals, target audience, and technical requirements to map out a winning strategy.',
      icon: MessageSquare,
      color: 'bg-blue-500'
    },
    { 
      title: 'Design & Prototyping', 
      desc: 'Our designers craft intuitive, high-fidelity prototypes that bring your vision to life before a single line of code is written.',
      icon: Paintbrush,
      color: 'bg-purple-500'
    },
    { 
      title: 'Agile Development', 
      desc: 'Our engineers build your product using modern tech stacks, maintaining transparency with regular updates and sprints.',
      icon: Settings,
      color: 'bg-cyan-500'
    },
    { 
      title: 'Deployment & Launch', 
      desc: 'We handle the technical complexities of launching your product, ensuring a smooth transition to your live environment.',
      icon: Rocket,
      color: 'bg-indigo-500'
    },
  ]

  return (
    <section className="py-24 bg-bg-secondary/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-sm font-bold tracking-widest text-brand-primary uppercase mb-4">How We Work</h2>
          <h3 className="text-4xl md:text-5xl font-outfit font-bold">A proven path to <span className="gradient-text">Success</span></h3>
        </div>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-y-1/2" />
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <div key={i} className="relative group">
                <div className="glass-card p-8 rounded-3xl h-full relative z-10 hover:shadow-[0_0_30px_rgba(99,102,241,0.1)]">
                  <div className={`w-14 h-14 rounded-2xl ${s.color} bg-opacity-20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 border border-white/5`}>
                    <s.icon className={`w-7 h-7 text-white`} />
                  </div>
                  <div className="absolute top-8 right-8 text-6xl font-outfit font-black text-white/5 group-hover:text-white/10 transition-colors">
                    0{i+1}
                  </div>
                  <h4 className="text-xl font-outfit font-bold mb-4">{s.title}</h4>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 flex justify-center">
          <div className="inline-flex items-center gap-4 px-6 py-3 rounded-full glass border border-white/5 text-sm text-text-secondary">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            Standard agile methodology followed for all projects.
          </div>
        </div>
      </div>
    </section>
  )
}

