import { Mail, Phone, MapPin, Clock, MessageSquare, Send } from 'lucide-react'
import ContactForm from '../../components/shared/ContactForm'

export const metadata = {
  title: 'Start Your Project | EliteSolutions Contact',
  description: 'Get in touch with Nepal\'s premier software company. We are ready to scale your business.'
}

export default function ContactPage({ searchParams }: { searchParams?: Record<string, string> }) {
  const plan = searchParams?.plan || ''

  return (
    <main className="pt-32 pb-24 px-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-accent/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          
          <div className="space-y-12">
            <div>
              <h1 className="text-sm font-bold tracking-[0.4em] text-brand-primary uppercase mb-6">Connect with us</h1>
              <h2 className="text-5xl md:text-6xl font-outfit font-bold mb-8 tracking-tight">
                Let's Build Something <br />
                <span className="gradient-text">Exceptional</span>
              </h2>
              <p className="text-xl text-text-secondary leading-relaxed">
                Whether you have a fully-fledged RFP or just a rough idea, we're here to help you navigate the digital landscape.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="glass-card p-6 rounded-3xl group">
                <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Mail className="w-6 h-6 text-brand-primary" />
                </div>
                <div className="text-xs font-bold text-text-muted uppercase tracking-widest mb-1">Email us</div>
                <div className="font-outfit font-bold text-lg">hello@elitesolutions.com</div>
              </div>
              <div className="glass-card p-6 rounded-3xl group">
                <div className="w-12 h-12 rounded-2xl bg-brand-accent/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Phone className="w-6 h-6 text-brand-accent" />
                </div>
                <div className="text-xs font-bold text-text-muted uppercase tracking-widest mb-1">Call us</div>
                <div className="font-outfit font-bold text-lg">+977 9867512535</div>
              </div>
              <div className="glass-card p-6 rounded-3xl group">
                <div className="w-12 h-12 rounded-2xl bg-brand-secondary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <MapPin className="w-6 h-6 text-brand-secondary" />
                </div>
                <div className="text-xs font-bold text-text-muted uppercase tracking-widest mb-1">Visit us</div>
                <div className="font-outfit font-bold text-lg">Kathmandu, Nepal</div>
              </div>
              <div className="glass-card p-6 rounded-3xl group">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Clock className="w-6 h-6 text-amber-500" />
                </div>
                <div className="text-xs font-bold text-text-muted uppercase tracking-widest mb-1">Hours</div>
                <div className="font-outfit font-bold text-lg">Mon-Fri, 9am-6pm</div>
              </div>
            </div>

            <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-brand-primary/20 to-transparent border border-white/5">
               <div className="flex items-center gap-4 mb-4">
                  <div className="flex -space-x-3">
                     {[1,2,3].map(i => (
                        <div key={i} className="w-10 h-10 rounded-full border-2 border-bg-primary bg-bg-tertiary flex items-center justify-center text-xs font-bold">
                           {i}
                        </div>
                     ))}
                  </div>
                  <div className="text-sm font-medium">Join 50+ companies scaling with us</div>
               </div>
               <p className="text-text-secondary text-sm italic">
                 "They delivered our fintech app 2 weeks ahead of schedule. Highly recommended for complex projects." — Local Client
               </p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-brand-primary/10 blur-3xl rounded-full opacity-50" />
            <div className="relative glass-card p-10 rounded-[3rem] border-white/10 shadow-2xl">
               <div className="flex items-center gap-3 mb-8">
                  <MessageSquare className="w-6 h-6 text-brand-accent" />
                  <h3 className="text-2xl font-outfit font-bold">Project Inquiry</h3>
               </div>
               <ContactForm defaultPlan={plan} />
            </div>
          </div>

        </div>
      </div>
    </main>
  )
}

