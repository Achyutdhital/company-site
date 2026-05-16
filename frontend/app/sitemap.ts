import { MetadataRoute } from 'next'
import { getServices, getProjects, getBlogList } from '../lib/api'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const services = await getServices().catch(() => [])
  const projects = await getProjects().catch(() => [])
  const posts = await getBlogList().catch(() => [])

  const routes: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date() },
    { url: `${base}/about`, lastModified: new Date() },
    { url: `${base}/about/ceo-message`, lastModified: new Date() },
    { url: `${base}/services`, lastModified: new Date() },
    { url: `${base}/pricing`, lastModified: new Date() },
    { url: `${base}/portfolio`, lastModified: new Date() },
    { url: `${base}/blog`, lastModified: new Date() },
  ]

  routes.push(...services.map((s: any) => ({ url: `${base}/services/${s.slug}`, lastModified: new Date() })))
  routes.push(...projects.map((p: any) => ({ url: `${base}/portfolio/${p.slug}`, lastModified: new Date() })))
  routes.push(...posts.map((p: any) => ({ url: `${base}/blog/${p.slug}`, lastModified: new Date() })))

  return routes
}
