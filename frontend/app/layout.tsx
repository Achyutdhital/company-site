import '../styles/globals.css'
import { Inter, Outfit } from 'next/font/google'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import dynamic from 'next/dynamic'
import WhatsAppButton from '../components/shared/WhatsAppButton'
import ThemeProvider from '../components/layout/ThemeProvider'

const PageTransition = dynamic(() => import('../components/PageTransition'), { ssr: false })

export const metadata = {
  title: 'Elite IT Solutions | Premium Software Development & Digital Services',
  description: 'Transforming businesses with cutting-edge software, AI solutions, and stunning digital experiences. Nepal\'s premier IT solutions company.'
}

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' })


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} font-sans`} suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider>
          <div className="mesh-bg" />
          <div className="noise-overlay" />
          <Navbar />
          <main className="relative">
            <PageTransition>{children}</PageTransition>
          </main>
          <WhatsAppButton />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}

