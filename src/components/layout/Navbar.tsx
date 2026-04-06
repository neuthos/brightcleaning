'use client'

import { useEffect, useRef, useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { siteConfig } from '@/data'

const navLinks = [
  { href: '#services', label: 'Services' },
  { href: '#why-us', label: 'Why Us' },
  { href: '#testimonials', label: 'Reviews' },
  { href: '/blog', label: 'Blog' },
  { href: '#faq', label: 'FAQ' },
  { href: '#contact', label: 'Contact' },
]

const locationLinks = [
  { href: '/cleaning-services-adelaide', label: 'Adelaide' },
  { href: '/cleaning-services-perth', label: 'Perth' },
  { href: '/cleaning-services-sydney', label: 'Sydney' },
  { href: '/cleaning-services-melbourne', label: 'Melbourne' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [locationsOpen, setLocationsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setLocationsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white ${
        scrolled ? 'shadow-md' : 'shadow-sm'
      }`}
    >
      <nav className="section-container flex items-center justify-between py-3 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 no-underline shrink-0">
          <Image
            src="/brightcleanlogo.jpg"
            alt="Bright Clean - Excellent Cleaning Service"
            width={140}
            height={40}
            className="h-9 sm:h-10 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-bold no-underline text-gray-600 transition-colors hover:text-primary"
            >
              {link.label}
            </a>
          ))}

          {/* Locations Dropdown */}
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setLocationsOpen(!locationsOpen)}
              className="flex items-center gap-1 text-sm font-bold text-gray-600 hover:text-primary transition-colors bg-transparent border-none cursor-pointer py-1"
            >
              📍 Locations
              <svg
                className={`w-4 h-4 transition-transform ${locationsOpen ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {locationsOpen && (
              <div className="absolute top-full right-0 mt-2 w-52 bg-white rounded-xl shadow-xl shadow-gray-200/80 border border-gray-100 py-2 z-50">
                {locationLinks.map((loc) => (
                  <Link
                    key={loc.href}
                    href={loc.href}
                    onClick={() => setLocationsOpen(false)}
                    className="block px-4 py-2.5 text-sm text-gray-700 hover:text-primary hover:bg-primary/5 no-underline transition-colors"
                  >
                    {loc.label} Cleaners
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Email CTA */}
          <a
            href={`mailto:${siteConfig.email}`}
            className="bg-primary hover:bg-primary-dark text-white text-sm font-semibold px-5 py-2.5 rounded-full no-underline transition-all hover:shadow-lg hover:shadow-primary/30 ml-2"
          >
            ✉️ Email Us
          </a>
        </div>

        {/* Mobile — Email + Menu */}
        <div className="flex lg:hidden items-center gap-3">
          <a
            href={`mailto:${siteConfig.email}`}
            className="bg-primary text-white text-xs font-semibold px-3 py-2 rounded-full no-underline"
          >
            ✉️ Email
          </a>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col gap-1.5 p-2 bg-transparent border-none cursor-pointer"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-5 h-0.5 bg-dark transition-all ${
                menuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-dark transition-all ${
                menuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-dark transition-all ${
                menuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden bg-white shadow-xl transition-all duration-300 overflow-hidden ${
          menuOpen ? 'max-h-[500px] py-4' : 'max-h-0'
        }`}
      >
        <div className="px-4 sm:px-6 flex flex-col gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-gray-700 text-base font-bold no-underline py-3 border-b border-gray-100 hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}

          {/* Mobile Locations */}
          <div className="py-3 border-b border-gray-100">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">
              📍 Our Locations
            </span>
            <div className="flex flex-wrap gap-2 mt-2">
              {locationLinks.map((loc) => (
                <Link
                  key={loc.href}
                  href={loc.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm text-gray-600 bg-gray-50 hover:bg-primary/10 hover:text-primary px-3 py-1.5 rounded-full no-underline transition-colors border border-gray-200"
                >
                  {loc.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile email CTA */}
          <a
            href={`mailto:${siteConfig.email}`}
            className="bg-primary text-white text-center font-semibold py-3 rounded-full no-underline mt-3"
          >
            ✉️ Email Us
          </a>
        </div>
      </div>
    </header>
  )
}
