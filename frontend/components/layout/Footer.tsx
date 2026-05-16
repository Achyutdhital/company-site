'use client'
import Link from 'next/link'
import { Facebook, Twitter, Instagram, Linkedin, Github, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="mt-24 relative overflow-hidden bg-bg-secondary/70 pt-20 border-t border-bg-border">
      <div className="max-w-7xl mx-auto px-6 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-primary to-brand-secondary flex items-center justify-center text-white font-bold">
                E
              </div>
              <span className="font-outfit font-bold text-2xl tracking-tight text-text-primary">
                Elite<span className="text-brand-accent">Solutions</span>
              </span>
            </Link>
            <p className="text-text-secondary leading-relaxed max-w-xs">
              Architecting the digital future with precision, passion, and purpose. Nepal's leading software engineering firm.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center text-text-secondary hover:text-brand-accent hover:border-brand-accent/50 transition-all">
                <Linkedin className="w-5 h-5" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center text-text-secondary hover:text-brand-accent hover:border-brand-accent/50 transition-all">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center text-text-secondary hover:text-brand-accent hover:border-brand-accent/50 transition-all">
                <Github className="w-5 h-5" />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-outfit font-bold text-text-primary mb-6 uppercase tracking-widest text-xs">Expertise</h4>
            <ul className="space-y-4 text-text-secondary">
              <li><Link href="/services" className="hover:text-brand-primary transition-colors">Web Applications</Link></li>
              <li><Link href="/services" className="hover:text-brand-primary transition-colors">Mobile Solutions</Link></li>
              <li><Link href="/services" className="hover:text-brand-primary transition-colors">AI & Data Science</Link></li>
              <li><Link href="/services" className="hover:text-brand-primary transition-colors">Cloud Architecture</Link></li>
              <li><Link href="/services" className="hover:text-brand-primary transition-colors">UI/UX Design</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-outfit font-bold text-text-primary mb-6 uppercase tracking-widest text-xs">Resources</h4>
            <ul className="space-y-4 text-text-secondary">
              <li><Link href="/about" className="hover:text-brand-primary transition-colors">About Our Agency</Link></li>
              <li><Link href="/portfolio" className="hover:text-brand-primary transition-colors">Recent Projects</Link></li>
              <li><Link href="/blog" className="hover:text-brand-primary transition-colors">Tech Insights</Link></li>
              <li><Link href="/pricing" className="hover:text-brand-primary transition-colors">Service Packages</Link></li>
              <li><Link href="/contact" className="hover:text-brand-primary transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-outfit font-bold text-text-primary mb-6 uppercase tracking-widest text-xs">Get in Touch</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-text-secondary">
                <Mail className="w-5 h-5 text-brand-primary shrink-0" />
                <span>hello@elitesolutions.com</span>
              </li>
              <li className="flex items-start gap-3 text-text-secondary">
                <Phone className="w-5 h-5 text-brand-primary shrink-0" />
                <span>+977 9867512535</span>
              </li>
              <li className="flex items-start gap-3 text-text-secondary">
                <MapPin className="w-5 h-5 text-brand-primary shrink-0" />
                <span>Kathmandu, Nepal <br /> Bagmati Province</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-bg-border py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-text-muted">
          <p>© {new Date().getFullYear()} EliteSolutions. Crafted with excellence in Nepal.</p>
          <div className="flex gap-8">
            <Link href="/privacy" className="hover:text-brand-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-brand-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

