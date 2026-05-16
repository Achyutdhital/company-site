import { getClients } from '../../lib/api'

export default async function ClientsSection() {
  let clients: any[] = []
  try {
    clients = await getClients()
  } catch (error) {
    console.error('Failed to fetch client logos', error)
    clients = [
      { id: 1, name: 'TechFlow' },
      { id: 2, name: 'DigitalWave' },
      { id: 3, name: 'CloudSync' },
      { id: 4, name: 'DataCore' },
      { id: 5, name: 'StreamLine' },
      { id: 6, name: 'NexGen' },
    ]
  }

  return (
    <section className="py-20 bg-bg-primary relative overflow-hidden border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <p className="text-center text-xs font-bold uppercase tracking-[0.4em] text-text-muted">
          Powering the world's most ambitious teams
        </p>
      </div>
      
      <div className="flex overflow-hidden group">
        <div className="flex animate-marquee whitespace-nowrap py-4">
          {[...clients, ...clients].map((client, i) => (
            <div 
              key={`${client.id}-${i}`} 
              className="mx-12 text-3xl md:text-4xl font-outfit font-black text-white/20 hover:text-brand-primary transition-colors cursor-default select-none"
            >
              {client.name}
            </div>
          ))}
        </div>
        {/* Duplicate for seamless loop */}
        <div className="flex absolute top-0 left-0 animate-marquee2 whitespace-nowrap py-4">
          {[...clients, ...clients].map((client, i) => (
            <div 
              key={`dup-${client.id}-${i}`} 
              className="mx-12 text-3xl md:text-4xl font-outfit font-black text-white/20 hover:text-brand-primary transition-colors cursor-default select-none"
            >
              {client.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

