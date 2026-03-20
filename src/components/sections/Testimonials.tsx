'use client'

import { useState, useEffect } from 'react'
import { testimonials as allTestimonials } from '@/data'
import type { Testimonial } from '@/data/testimonials'

interface TestimonialsProps {
  testimonials?: Testimonial[]
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`text-lg ${star <= rating ? 'text-secondary' : 'text-gray-300'}`}
        >
          ★
        </span>
      ))}
    </div>
  )
}

export default function Testimonials({ testimonials: propTestimonials }: TestimonialsProps) {
  const items = propTestimonials && propTestimonials.length > 0 ? propTestimonials : allTestimonials
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [items.length])

  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-dark mt-3 mb-4">
            Loved by Families Across Australia
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Don&apos;t just take our word for it — hear what our happy customers
            have to say.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((t, i) => (
            <div
              key={i}
              className={`bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border-2 cursor-pointer ${
                activeIndex === i
                  ? 'border-primary shadow-lg scale-[1.02]'
                  : 'border-transparent hover:border-primary/20'
              }`}
              onClick={() => setActiveIndex(i)}
            >
              <StarRating rating={t.rating} />
              <p className="text-gray-600 mt-4 mb-6 leading-relaxed text-sm">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white font-bold text-sm">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-dark text-sm m-0">
                    {t.name}
                  </p>
                  <p className="text-gray-400 text-xs m-0">
                    {t.location} · {t.service}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Rating summary */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-3 bg-white rounded-full px-6 py-3 shadow-sm">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <span key={s} className="text-secondary text-xl">★</span>
              ))}
            </div>
            <span className="text-dark font-bold">5.0</span>
            <span className="text-gray-400 text-sm">
              · Based on {items.length}+ reviews
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
