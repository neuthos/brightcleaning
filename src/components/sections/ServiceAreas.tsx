import { serviceAreas } from '@/data'
import { MapPin } from 'lucide-react'

export default function ServiceAreas() {
  return (
    <section id="areas" className="py-20 bg-dark text-white">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">
            Where We Operate
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold mt-3 mb-4">
            Our Service Areas
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Professional cleaning services across Australia&apos;s major cities
            and surrounding suburbs.
          </p>
        </div>

        {/* City Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {serviceAreas.map((area) => (
            <div
              key={area.city}
              className="bg-dark-lighter rounded-2xl p-6 hover:bg-dark-surface border border-white/5 hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-5">
                <MapPin className="w-6 h-6 text-primary" />
                <div>
                  <h3 className="text-xl font-bold m-0">{area.city}</h3>
                  <span className="text-primary text-xs font-medium">
                    {area.state}
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {area.suburbs.map((suburb) => (
                  <span
                    key={suburb}
                    className="inline-block bg-white/5 text-gray-400 text-xs px-2.5 py-1 rounded-lg hover:bg-primary/10 hover:text-primary transition-colors cursor-default"
                  >
                    {suburb}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-400 mb-4">
            Don&apos;t see your suburb? Contact us — we may still service your
            area!
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 rounded-full no-underline transition-all hover:shadow-lg hover:shadow-primary/30"
          >
            Check Your Area →
          </a>
        </div>
      </div>
    </section>
  )
}
