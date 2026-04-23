'use client'

import { useState } from 'react'
import { siteConfig } from '@/data'
import { Phone, ClipboardList, Mail, MessageCircle, X } from 'lucide-react'

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false)

  const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    `Hi Bright Clean! I'd like to enquire about your cleaning services.`
  )}`

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsOpen(false)
    }
  }

  const handleWhatsApp = () => {
    window.open(whatsappUrl, '_blank')
    setIsOpen(false)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Expandable Menu */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden min-w-[220px] animate-fadeIn">
          {/* Book Now Option */}
          <button
            onClick={() => scrollToSection('hero')}
            className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors cursor-pointer border-none bg-white flex items-center gap-3"
          >
            <ClipboardList className="w-5 h-5 text-primary" />
            <span className="font-semibold text-dark text-sm">Get a Quote</span>
          </button>

          {/* Divider */}
          <div className="border-t border-gray-200" />

          {/* Contact Us On Email Option */}
          <button
            onClick={() => scrollToSection('contact')}
            className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors cursor-pointer border-none bg-white flex items-center gap-3"
          >
            <Mail className="w-5 h-5 text-primary" />
            <span className="font-semibold text-dark text-sm">Contact Us On Email</span>
          </button>

          {/* WhatsApp Option */}
          <button
            onClick={handleWhatsApp}
            className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors cursor-pointer border-none bg-white flex items-center gap-3"
          >
            <MessageCircle className="w-5 h-5 text-green-500" />
            <span className="font-semibold text-dark text-sm">WhatsApp</span>
          </button>
        </div>
      )}

      {/* Main Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white rounded-full px-6 py-4 shadow-2xl transition-all hover:scale-105 font-bold text-base cursor-pointer border-none"
        aria-label="Contact options"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Phone className="w-5 h-5" />}
        <span>Book Now!</span>
      </button>
    </div>
  )
}
