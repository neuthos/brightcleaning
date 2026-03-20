'use client'

import { useState } from 'react'
import { faqItems } from '@/data'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="py-20 bg-gray-50">
      <div className="section-container">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">
              FAQ
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-dark mt-3 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-500">
              Everything you need to know about our cleaning services.
            </p>
          </div>

          {/* Accordion */}
          <div className="space-y-3">
            {faqItems.map((item, i) => {
              const isOpen = openIndex === i
              return (
                <div
                  key={i}
                  className={`bg-white rounded-xl border transition-all duration-200 ${
                    isOpen ? 'border-primary/30 shadow-md' : 'border-gray-100'
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 cursor-pointer bg-transparent border-none"
                  >
                    <span
                      className={`font-semibold transition-colors ${
                        isOpen ? 'text-primary' : 'text-dark'
                      }`}
                    >
                      {item.question}
                    </span>
                    <span
                      className={`text-2xl text-gray-400 transition-transform duration-200 shrink-0 ${
                        isOpen ? 'rotate-45' : ''
                      }`}
                    >
                      +
                    </span>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      isOpen ? 'max-h-60 pb-5' : 'max-h-0'
                    }`}
                  >
                    <p className="px-6 text-gray-500 text-sm leading-relaxed m-0">
                      {item.answer}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* CTA */}
          <div className="text-center mt-12 bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <p className="text-dark font-semibold text-lg mb-2">
              Still have questions?
            </p>
            <p className="text-gray-500 text-sm mb-4">
              We&apos;re here to help. Reach out to us anytime.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 rounded-full no-underline transition-all hover:shadow-lg hover:shadow-primary/30"
            >
              Contact Us →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
