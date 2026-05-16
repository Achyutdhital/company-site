const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1'

async function handleJSON(res: Response) {
  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || res.statusText)
  }
  const data = await res.json()
  // unwrap DRF paginated responses
  if (data && typeof data === 'object' && 'results' in data) return data.results
  return data
}

export async function getServices() {
  const res = await fetch(`${API_BASE}/services/`, { cache: 'no-store' })
  return handleJSON(res)
}

export async function getSiteSettings() {
  const res = await fetch(`${API_BASE}/settings/`, { cache: 'no-store' })
  return handleJSON(res)
}

export async function getClients() {
  const res = await fetch(`${API_BASE}/clients/`, { cache: 'no-store' })
  return handleJSON(res)
}

export async function getServiceBySlug(slug: string) {
  const res = await fetch(`${API_BASE}/services/${slug}/`, { cache: 'no-store' })
  return handleJSON(res)
}

export async function getPricing() {
  const res = await fetch(`${API_BASE}/pricing/`, { cache: 'no-store' })
  return handleJSON(res)
}

export async function getPortfolio(category?: string) {
  const url = new URL(`${API_BASE}/portfolio/`)
  if (category) url.searchParams.set('category', category)
  const res = await fetch(url.toString(), { cache: 'no-store' })
  return handleJSON(res)
}

export async function getProjects() {
  const res = await fetch(`${API_BASE}/portfolio/`, { cache: 'no-store' })
  return handleJSON(res)
}

export async function getBlogList() {
  const res = await fetch(`${API_BASE}/blog/`, { cache: 'no-store' })
  return handleJSON(res)
}

export async function getBlogBySlug(slug: string) {
  const res = await fetch(`${API_BASE}/blog/${slug}/`, { cache: 'no-store' })
  return handleJSON(res)
}

export async function getTestimonials() {
  const res = await fetch(`${API_BASE}/testimonials/`, { cache: 'no-store' })
  return handleJSON(res)
}

export async function getTeam() {
  const res = await fetch(`${API_BASE}/team/`, { cache: 'no-store' })
  return handleJSON(res)
}

export async function getProjectBySlug(slug: string) {
  const res = await fetch(`${API_BASE}/portfolio/${slug}/`, { cache: 'no-store' })
  return handleJSON(res)
}

export async function submitContact(payload: any) {
  const res = await fetch(`${API_BASE}/contact/submit/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  return handleJSON(res)
}

export default { getServices, getServiceBySlug, getPricing, submitContact }
