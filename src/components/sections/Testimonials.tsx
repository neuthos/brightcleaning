'use client'

import { Star } from 'lucide-react'
import type { Testimonial } from '@/data/testimonials'
import { testimonials as allTestimonials } from '@/data'

interface TestimonialsProps {
  testimonials?: Testimonial[]
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${star <= rating ? 'text-secondary fill-secondary' : 'text-gray-300'}`}
        />
      ))}
    </div>
  )
}

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div className="flex-shrink-0 w-[350px] bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <StarRating rating={t.rating} />
      <p className="text-gray-600 mt-3 mb-5 leading-relaxed text-sm line-clamp-4">
        &ldquo;{t.text}&rdquo;
      </p>
      <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white font-bold text-sm shrink-0">
          {t.name.charAt(0)}
        </div>
        <div>
          <p className="font-semibold text-dark text-sm m-0">{t.name}</p>
          <p className="text-gray-400 text-xs m-0">
            {t.location} · {t.service}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function Testimonials({ testimonials: propTestimonials }: TestimonialsProps) {
  const items = propTestimonials && propTestimonials.length > 0 ? propTestimonials : allTestimonials
  // Duplicate items for seamless loop
  const doubled = [...items, ...items]

  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-dark mt-3 mb-4">
            Loved by Families Across Australia
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Don&apos;t just take our word for it. hear what our happy customers have to say.
          </p>
        </div>
      </div>

      {/* Marquee Banner */}
      <div className="relative overflow-hidden py-3">
        {/* Gradient fades on edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />

        <div className="flex gap-6 animate-marquee hover:[animation-play-state:paused]">
          {doubled.map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>
      </div>

      <div className="section-container">
        {/* Rating summary */}
        <div className="text-center mt-10">
          <div className="inline-flex items-center gap-3 bg-white rounded-full px-6 py-3 shadow-sm">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-5 h-5 text-secondary fill-secondary" />
              ))}
            </div>
            <span className="text-dark font-bold">5.0</span>
            <span className="text-gray-400 text-sm">· Based on {items.length}+ reviews</span>
          </div>
        </div>

        {/* Facebook CTA */}
        <div className="text-center mt-6">
          <a
            href="https://www.facebook.com/BrightCleanOZ/reviews"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-semibold text-sm no-underline transition-colors"
          >
            Read more reviews on Facebook →
          </a>
        </div>
      </div>
    </section>
  )
}
