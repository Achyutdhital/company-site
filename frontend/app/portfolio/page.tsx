import { getProjects } from '../../lib/api'
import PortfolioFilter from '../../components/portfolio/PortfolioFilter'

export const metadata = {
  title: 'Portfolio — EliteTech',
  description: 'Selected projects and case studies.'
}

export default async function PortfolioPage() {
  let projects: any[] = []
  try {
    projects = await getProjects()
  } catch (e) {
    console.error('Failed to fetch projects', e)
  }

  return (
    <main className="pt-32 pb-24 px-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-brand-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-sm font-bold tracking-[0.4em] text-brand-primary uppercase mb-6">Our Work</h1>
          <h2 className="text-5xl md:text-7xl font-outfit font-bold mb-8 tracking-tight">
            Selected <br />
            <span className="gradient-text">Case Studies</span>
          </h2>
          <p className="text-xl text-text-secondary leading-relaxed">
            From regional market leaders to global innovators, we've helped companies transform their digital presence and scale their operations.
          </p>
        </div>
        
        <PortfolioFilter initialProjects={projects} />
      </div>
    </main>
  )
}

