import { getProjectBySlug } from '../../../lib/api'

export async function generateStaticParams() {
  try {
    const projects = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1'}/portfolio/`).then(async r => {
      const data = await r.json()
      return data.results || data
    })
    return projects.map((p: any) => ({ slug: p.slug }))
  } catch (e) {
    return []
  }
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  let project: any = null
  try {
    project = await getProjectBySlug(params.slug)
  } catch (e) {
    console.error(e)
  }

  if (!project) return <div className="max-w-4xl mx-auto px-6 py-24">Project not found.</div>

  return (
    <article className="max-w-4xl mx-auto px-6 py-24">
      <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
      <p className="text-text-secondary mb-6">{project.category}</p>
      <div className="glass p-6 rounded">{project.description}</div>
      {project.live_url && <div className="mt-6"><a href={project.live_url} className="text-brand-accent">View live</a></div>}
    </article>
  )
}
