'use client'

import { useState } from 'react'
import { siteConfig } from '@/data'

export default function FloatingContact() {
  const [open, setOpen] = useState(false)

  const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    `Hi Bright Clean! I'd like to enquire about your cleaning services.`
  )}`
  const messengerUrl = `https://m.me/${siteConfig.messengerUsername}`

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Expanded Options */}
      <div
        className={`flex flex-col gap-3 transition-all duration-300 ${
          open
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        {/* WhatsApp */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 bg-[#25D366] hover:bg-[#1da851] text-white rounded-full px-5 py-3 shadow-lg no-underline transition-all hover:scale-105 text-sm font-medium"
        >
          💬 WhatsApp
        </a>

        {/* Messenger */}
        <a
          href={messengerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 bg-[#0084FF] hover:bg-[#006acc] text-white rounded-full px-5 py-3 shadow-lg no-underline transition-all hover:scale-105 text-sm font-medium"
        >
          💬 Messenger
        </a>

        {/* Phone */}
        <a
          href={`tel:${siteConfig.phoneRaw}`}
          className="flex items-center gap-3 bg-primary hover:bg-primary-dark text-white rounded-full px-5 py-3 shadow-lg no-underline transition-all hover:scale-105 text-sm font-medium"
        >
          📞 Call Us
        </a>

        {/* Email */}
        <a
          href={`mailto:${siteConfig.email}`}
          className="flex items-center gap-3 bg-gray-700 hover:bg-gray-800 text-white rounded-full px-5 py-3 shadow-lg no-underline transition-all hover:scale-105 text-sm font-medium"
        >
          ✉️ Email
        </a>
      </div>

      {/* Main FAB */}
      <button
        onClick={() => setOpen(!open)}
        className={`w-16 h-16 rounded-full bg-primary hover:bg-primary-dark text-white text-2xl shadow-xl cursor-pointer border-none transition-all duration-300 animate-pulse-glow hover:scale-110 ${
          open ? 'rotate-45' : ''
        }`}
        aria-label="Contact us"
      >
        {open ? '✕' : '💬'}
      </button>
    </div>
  )
}
