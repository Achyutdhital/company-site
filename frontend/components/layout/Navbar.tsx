'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X, ArrowRight, ChevronDown } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<'services' | 'pricing' | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
  ]

  const serviceLinks = [
    { name: 'Web Development', href: '/services/web-development' },
    { name: 'UI/UX Design', href: '/services/ui-ux-design' },
    { name: 'App Development', href: '/services/app-development' },
    { name: 'SEO & Marketing', href: '/services/seo-marketing' },
    { name: 'Web Security', href: '/services/web-security' },
    { name: 'Cloud Solutions', href: '/services/cloud-solutions' },
  ]

  const pricingLinks = [
    { name: 'SEO Packages', href: '/pricing#seo-packages', description: 'Analysis, on-page, technical, local, and monthly reports' },
    { name: 'Social Media Packages', href: '/pricing#social-packages', description: 'Content, reels, community, and growth planning' },
    { name: 'Custom Quote', href: '/contact', description: 'Need a larger scope? Talk to us directly' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 transition-all duration-300">
      <nav className={`
        flex items-center justify-between px-6 py-3 transition-all duration-500
        ${scrolled 
          ? 'w-[95%] md:w-[85%] max-w-6xl glass rounded-full shadow-2xl' 
          : 'w-full md:w-[95%] max-w-7xl rounded-none bg-transparent'}
      `}>
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-primary to-brand-secondary flex items-center justify-center text-white font-bold group-hover:rotate-12 transition-transform">
            E
          </div>
          <span className="font-outfit font-bold text-xl tracking-tight">
            Elite<span className="text-brand-accent">Solutions</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-6">
            {navLinks.slice(0, 1).map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
              >
                {link.name}
              </Link>
            ))}

            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('services')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">
                Services <ChevronDown className="h-3.5 w-3.5" />
              </button>
              <div className={`absolute left-0 top-full pt-4 transition-all duration-200 ${activeDropdown === 'services' ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
                <div className="w-72 rounded-3xl border border-bg-border bg-bg-secondary/95 p-3 shadow-2xl backdrop-blur-xl">
                  <Link href="/services" className="block rounded-2xl px-4 py-3 text-sm font-semibold text-text-primary hover:bg-brand-primary/10 hover:text-brand-primary transition-colors">
                    View all services
                  </Link>
                  <div className="my-2 h-px bg-bg-border" />
                  {serviceLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="block rounded-2xl px-4 py-3 text-sm text-text-secondary hover:bg-brand-primary/10 hover:text-text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('pricing')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">
                Pricing <ChevronDown className="h-3.5 w-3.5" />
              </button>
              <div className={`absolute left-0 top-full pt-4 transition-all duration-200 ${activeDropdown === 'pricing' ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
                <div className="w-80 rounded-3xl border border-bg-border bg-bg-secondary/95 p-3 shadow-2xl backdrop-blur-xl">
                  {pricingLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="block rounded-2xl px-4 py-3 hover:bg-brand-primary/10 transition-colors"
                    >
                      <div className="text-sm font-semibold text-text-primary">{link.name}</div>
                      <div className="text-xs text-text-muted mt-1 leading-relaxed">{link.description}</div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {navLinks.slice(1).map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="h-6 w-px bg-bg-border mx-2" />
          <ThemeToggle />
          <Link 
            href="/contact" 
            className="group px-5 py-2.5 rounded-full bg-text-primary text-bg-primary text-sm font-bold flex items-center gap-2 hover:bg-brand-accent hover:text-white transition-all active:scale-95"
          >
            Work with us
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2 text-text-primary"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-bg-primary/95 backdrop-blur-xl md:hidden pt-24 px-8 overflow-y-auto">
          <div className="flex flex-col gap-8 pb-10">
            <Link
              href="/"
              className="text-3xl font-outfit font-bold"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>

            <div className="space-y-4">
              <div className="text-xs font-bold uppercase tracking-[0.35em] text-text-muted">Services</div>
              <div className="grid gap-3">
                <Link href="/services" className="text-lg font-medium text-text-primary" onClick={() => setMobileMenuOpen(false)}>All Services</Link>
                {serviceLinks.map((link) => (
                  <Link key={link.name} href={link.href} className="text-lg font-medium text-text-secondary" onClick={() => setMobileMenuOpen(false)}>
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="text-xs font-bold uppercase tracking-[0.35em] text-text-muted">Pricing</div>
              <div className="grid gap-3">
                {pricingLinks.map((link) => (
                  <Link key={link.name} href={link.href} className="text-lg font-medium text-text-secondary" onClick={() => setMobileMenuOpen(false)}>
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            {navLinks.slice(1).map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className="text-3xl font-outfit font-bold"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link 
              href="/contact" 
              className="mt-4 px-6 py-4 rounded-2xl bg-brand-primary text-center font-bold"
              onClick={() => setMobileMenuOpen(false)}
            >
              Get in touch
            </Link>
            <div className="pt-4">
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

