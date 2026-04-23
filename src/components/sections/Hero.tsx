'use client'

import { Leaf, Mail, Shield, Star, UserCheck } from 'lucide-react'

import QuoteWizard from './QuoteWizard'
import { siteConfig } from '@/data'

interface HeroProps {
  city?: string
  state?: string
  suburbs?: string[]
}

export default function Hero({ city, state, suburbs }: HeroProps) {
  const locationText = city ? `in ${city}` : 'in Australia'
  const subtitleText = city
    ? `Trusted and Insured cleaners, housekeeper, NDIS and End of Lease Specialist serving ${city}${state ? `, ${state}` : ''}.`
    : 'Trusted and Insured cleaners, housekeeper, NDIS and End of Lease Specialist.'

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
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-[3.75rem] font-extrabold text-dark leading-tight mb-5">
              Professional House Cleaning <span className="text-primary">{locationText}</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-gray-600 mb-8 max-w-xl leading-relaxed">
              {subtitleText}{' '}
              <span className="text-primary font-semibold">Get a free quote today!</span>
            </p>

            {/* City suburb tags (for location pages) */}
            {city && suburbs && suburbs.length > 0 && (
              <div className="mb-8">
                <p className="text-sm text-gray-500 mb-3 font-medium">
                  Where are you looking for a cleaner?
                </p>
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
                { icon: <Shield className="w-5 h-5 text-primary" />, text: 'Fully Insured' },
                {
                  icon: <UserCheck className="w-5 h-5 text-primary" />,
                  text: 'Same Cleaners and Time',
                },
                { icon: <Star className="w-5 h-5 text-primary" />, text: 'Satisfaction Guarantee' },
                { icon: <Leaf className="w-5 h-5 text-primary" />, text: 'Eco Friendly Products' },
              ].map((badge) => (
                <div key={badge.text} className="flex items-center gap-2">
                  {badge.icon}
                  <span className="text-gray-700 text-sm font-bold">{badge.text}</span>
                </div>
              ))}
            </div>

            {/* Quick email CTA */}
            <div className="mt-8 flex items-center gap-4">
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex items-center gap-2 bg-dark hover:bg-dark-lighter text-white text-sm font-semibold px-6 py-3 rounded-full no-underline transition-all hover:shadow-lg"
              >
                <Mail className="w-4 h-4" />
                <p>Email Us</p>
              </a>
              <span className="text-sm text-gray-400 hidden sm:inline">or use the wizard →</span>
            </div>
          </div>

          {/* Right — Quote Wizard */}
          <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/60 border border-gray-100 p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-dark mb-6 text-center">
              Get a Quote
            </h2>
            <QuoteWizard />
          </div>
        </div>
      </div>
    </section>
  )
}
