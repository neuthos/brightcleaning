import { services } from '@/data'
import type { ServiceIconKey } from '@/data/services'
import { Home, KeyRound, Building2, Accessibility, Sparkles, Flame, Check } from 'lucide-react'
import type { ReactNode } from 'react'

const SERVICE_ICONS: Record<ServiceIconKey, ReactNode> = {
  home: <Home className="w-12 h-12" />,
  key: <KeyRound className="w-12 h-12" />,
  building: <Building2 className="w-12 h-12" />,
  accessibility: <Accessibility className="w-12 h-12" />,
  sparkles: <Sparkles className="w-12 h-12" />,
  flame: <Flame className="w-12 h-12" />,
}

export default function Services() {
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">
            Our Services
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-dark mt-3 mb-4">
            Professional Cleaning Services
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            From regular house cleaning to specialised cleaning services — we have
            everything covered for your home and office.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-primary/30"
            >
              {/* Icon Header */}
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-6 flex justify-center text-primary group-hover:from-primary group-hover:to-primary-dark group-hover:text-white transition-all duration-300">
                <span className="group-hover:scale-110 inline-block transition-transform">
                  {SERVICE_ICONS[service.iconKey]}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-dark mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-5">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 list-none p-0 m-0">
                  {service.features.map((f, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-gray-600"
                    >
                      <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href="#hero"
                  className="inline-flex items-center gap-1 text-primary font-semibold text-sm mt-6 no-underline hover:gap-2 transition-all"
                >
                  Get a Quote →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
