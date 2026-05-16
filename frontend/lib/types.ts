export interface Service {
  id: number
  name: string
  slug: string
  iconClass?: string
  shortDescription: string
  fullDescription?: string
  metaDescription?: string
  thumbnail?: string
  order?: number
}

export interface PricingPlan {
  id: number
  name: string
  slug: string
  category?: string
  price: string | null
  priceLabel?: string
  billingPeriod?: string
  tagline?: string
  isFeatured?: boolean
  hasProjectManager?: boolean
  featureGroups?: {
    name: string
    features: { text: string; isIncluded: boolean }[]
  }[]
}

export interface BlogPost {
  id: number
  title: string
  slug: string
  author: string
  category: string
  thumbnail?: string
  excerpt?: string
  body?: string
  metaDescription?: string
  publishedAt?: string
  readTime?: number
}

export interface Project {
  id: number
  title: string
  slug: string
  category: string
  description?: string
  thumbnail?: string
  liveUrl?: string
  isFeatured?: boolean
}

export interface TeamMember {
  id: number
  name: string
  role: string
  photo?: string
  bio?: string
  facebookUrl?: string
  linkedinUrl?: string
}

export interface ContactFormData {
  name: string
  email: string
  phone?: string
  serviceInterest?: string
  pricingPlan?: string
  message: string
}

export interface SiteSettings {
  id: number
  companyName: string
  tagline: string
  heroTitle: string
  heroSubtitle: string
  aboutSummary: string
  email: string
  phone: string
  whatsappNumber: string
  address: string
  hours: string
  yearsExperience: number
  projectsCompleted: number
  countriesServed: number
  rating: number
  ceoName: string
  ceoRole: string
  ceoMessage: string
  googleMapsEmbedUrl: string
}

export interface ClientLogo {
  id: number
  name: string
  logoUrl: string
  websiteUrl: string
  order: number
  isActive: boolean
}
