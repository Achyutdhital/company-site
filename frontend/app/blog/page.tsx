import { getBlogList } from '../../lib/api'
import Link from 'next/link'

export const metadata = {
  title: 'Blog — EliteTech',
  description: 'Insights on development, design, and growth.'
}

export default async function BlogPage() {
  let posts: any[] = []
  try {
    posts = await getBlogList()
  } catch (e) {
    console.error('Failed to fetch blog list', e)
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      <h2 className="text-3xl font-semibold mb-6">Blog</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.length === 0 && <div className="text-text-secondary">No posts yet.</div>}
        {posts.map(p => (
          <article key={p.id} className="glass p-6 rounded">
            <h3 className="font-semibold text-lg mb-2"><Link href={`/blog/${p.slug}`}>{p.title}</Link></h3>
            <p className="text-text-secondary">{p.excerpt}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
