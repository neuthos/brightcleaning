'use client'

import { siteConfig } from '@/data'
import QuoteWizard from './QuoteWizard'

interface HeroProps {
  city?: string
  state?: string
  suburbs?: string[]
}

export default function Hero({ city, state, suburbs }: HeroProps) {
  const locationText = city ? `in ${city}` : 'in Australia'
  const subtitleText = city
    ? `Bonded & insured cleaners serving ${city}${state ? `, ${state}` : ''}. NDIS approved, end of lease specialists.`
    : 'Bonded & insured cleaners, NDIS approved, end of lease specialists. Servicing Adelaide, Perth, Sydney & Melbourne.'

  return (
    <section
      id="hero"
      className="relative pt-28 pb-16 sm:pt-32 sm:pb-20 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #f8fcfd 0%, #e8f7fa 40%, #f0f9fb 100%)',
      }}
    >
      {/* Subtle decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/5 rounded-full translate-y-1/3 -translate-x-1/4 blur-3xl" />

      <div className="relative z-10 section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left — Content */}
          <div className="pt-4">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-primary text-sm font-medium">
                Trusted by 500+ families across Australia
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-[3.25rem] font-extrabold text-dark leading-tight mb-5">
              Professional House Cleaning{' '}
              <span className="text-primary">{locationText}</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-gray-600 mb-8 max-w-xl leading-relaxed">
              {subtitleText}{' '}
              <span className="text-primary font-semibold">
                Get a free quote today!
              </span>
            </p>

            {/* City suburb tags (for location pages) */}
            {city && suburbs && suburbs.length > 0 && (
              <div className="mb-8">
                <p className="text-sm text-gray-500 mb-3 font-medium">Where are you looking for a cleaner?</p>
                <div className="flex flex-wrap gap-2">
                  {suburbs.slice(0, 8).map((suburb) => (
                    <span
                      key={suburb}
                      className="inline-block bg-white border border-gray-200 text-gray-700 text-sm px-3 py-1.5 rounded-full hover:border-primary hover:text-primary transition-colors cursor-default"
                    >
                      {suburb}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Trust badges */}
            <div className="flex flex-wrap gap-5 pt-6 border-t border-gray-200">
              {[
                { icon: '🛡️', text: 'Fully Insured' },
                { icon: '✅', text: 'NDIS Registered' },
                { icon: '⭐', text: '100% Guarantee' },
                { icon: '🌿', text: 'Eco-Friendly' },
              ].map((badge) => (
                <div key={badge.text} className="flex items-center gap-2">
                  <span className="text-lg">{badge.icon}</span>
                  <span className="text-gray-600 text-sm font-medium">
                    {badge.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Quick call CTA */}
            <div className="mt-8 flex items-center gap-4">
              <a
                href={`tel:${siteConfig.phoneRaw}`}
                className="inline-flex items-center gap-2 bg-dark hover:bg-dark-lighter text-white text-sm font-semibold px-6 py-3 rounded-full no-underline transition-all hover:shadow-lg"
              >
                📞 Call {siteConfig.phone}
              </a>
              <span className="text-sm text-gray-400 hidden sm:inline">or use the wizard →</span>
            </div>
          </div>

          {/* Right — Quote Wizard */}
          <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/60 border border-gray-100 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-dark mb-1 text-center">
              Get an Instant Quote
            </h2>
            <p className="text-gray-400 text-sm mb-4 text-center">
              Quick & easy — takes 30 seconds
            </p>
            <QuoteWizard defaultCity={city || ''} />
          </div>
        </div>
      </div>
    </section>
  )
}
