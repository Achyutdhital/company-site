import { getBlogBySlug } from '../../../lib/api'
import ReadingProgress from '../../../components/blog/ReadingProgress'

export async function generateStaticParams() {
  try {
    const posts = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1'}/blog/`).then(async r => {
      const data = await r.json()
      return data.results || data
    })
    return posts.map((p: any) => ({ slug: p.slug }))
  } catch (e) {
    return []
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  let post: any = null
  try {
    post = await getBlogBySlug(params.slug)
  } catch (e) {
    console.error(e)
  }

  if (!post) return <div className="max-w-4xl mx-auto px-6 py-24">Post not found.</div>

  return (
    <article className="max-w-4xl mx-auto px-6 py-24">
      <ReadingProgress />
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-text-secondary mb-8">By {post.author} — {new Date(post.publishedAt || post.published_at || Date.now()).toLocaleDateString()}</p>
      <div className="prose prose-invert" dangerouslySetInnerHTML={{ __html: post.body }} />
    </article>
  )
}
