"use client"
import { MessageCircle } from 'lucide-react'

export default function WhatsAppButton() {
  const phoneNumber = '9865542336' // Replace with actual number
  const message = 'Hello EliteSolutions, I am interested in your services.'
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

  return (
    <a 
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-[100] group"
    >
      <div className="absolute inset-0 bg-emerald-500 rounded-full blur-lg opacity-40 group-hover:opacity-60 transition-opacity animate-pulse" />
      <div className="relative w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300">
        <MessageCircle className="w-8 h-8 fill-white" />
        <div className="absolute right-full mr-4 bg-white text-emerald-600 px-4 py-2 rounded-xl font-bold shadow-xl opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all whitespace-nowrap pointer-events-none">
          Contact Support
        </div>
      </div>
    </a>
  )
}
