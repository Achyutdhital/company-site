import { getTeam } from '../../lib/api'
import { Github, Linkedin, Twitter } from 'lucide-react'
import Image from 'next/image'

export default async function TeamSection() {
  let team: any[] = []
  try {
    team = await getTeam()
  } catch (e) {
    console.error('Failed to fetch team', e)
    team = [
      { id: 1, name: 'Achyut Poudel', role: 'CEO & Lead Architect', image: '/team_member_placeholder.png' },
      { id: 2, name: 'Suman Sharma', role: 'Senior AI Engineer', image: '/team_member_placeholder.png' },
      { id: 3, name: 'Priya Rai', role: 'Lead UI/UX Designer', image: '/team_member_placeholder.png' },
      { id: 4, name: 'Kiran Thapa', role: 'Full Stack Developer', image: '/team_member_placeholder.png' },
    ]
  }

  if (!team || team.length === 0) return null

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-sm font-bold tracking-widest text-brand-primary uppercase mb-4">Our Talents</h2>
            <h3 className="text-4xl md:text-5xl font-outfit font-bold">Meet the <span className="gradient-text">Visionaries</span></h3>
          </div>
          <p className="text-text-secondary max-w-sm">
            A diverse team of world-class engineers and designers dedicated to your success.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map(member => (
            <div key={member.id} className="glass-card p-6 rounded-[2rem] group overflow-hidden">
              <div className="relative aspect-square rounded-2xl overflow-hidden mb-6 bg-bg-tertiary">
                <Image 
                  src={member.image || '/team_member_placeholder.png'} 
                  alt={member.name} 
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                  <div className="flex gap-4">
                    <Linkedin className="w-5 h-5 text-white hover:text-brand-accent cursor-pointer transition-colors" />
                    <Twitter className="w-5 h-5 text-white hover:text-brand-accent cursor-pointer transition-colors" />
                    <Github className="w-5 h-5 text-white hover:text-brand-accent cursor-pointer transition-colors" />
                  </div>
                </div>
              </div>
              <h4 className="text-xl font-outfit font-bold mb-1">{member.name}</h4>
              <p className="text-brand-accent text-sm font-medium tracking-wide">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

