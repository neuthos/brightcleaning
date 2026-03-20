'use client'

import { useState } from 'react'
import { cleaningChecklists } from '@/data'

export default function CleaningChecklist() {
  const [activeTab, setActiveTab] = useState(0)
  const checklist = cleaningChecklists[activeTab]

  return (
    <section id="checklist" className="py-20 bg-white">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">
            Our Standards
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-dark mt-3 mb-4">
            What We Clean — Every Time
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Transparency matters. Here&apos;s exactly what&apos;s included in
            every clean.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-3 mb-12">
          {cleaningChecklists.map((cl, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className={`px-6 py-3 rounded-full font-medium text-sm cursor-pointer border-none transition-all ${
                activeTab === i
                  ? 'bg-primary text-white shadow-lg shadow-primary/30'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cl.title}
            </button>
          ))}
        </div>

        {/* Checklist Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {checklist.categories.map((cat, i) => (
            <div key={i} className="bg-gray-50 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-dark mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">
                  {i + 1}
                </span>
                {cat.category}
              </h3>
              <ul className="space-y-3 list-none p-0 m-0">
                {cat.items.map((item, j) => (
                  <li
                    key={j}
                    className="flex items-start gap-2 text-sm text-gray-600"
                  >
                    <span className="text-primary shrink-0 mt-0.5">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
