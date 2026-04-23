import { whyChooseUs } from '@/data'
import type { USPIconKey } from '@/data/why-choose-us'
import { Shield, CheckCircle2, Star, Leaf, UserCheck, Wrench } from 'lucide-react'
import type { ReactNode } from 'react'

const USP_ICONS: Record<USPIconKey, ReactNode> = {
  shield: <Shield className="w-10 h-10" />,
  check: <CheckCircle2 className="w-10 h-10" />,
  star: <Star className="w-10 h-10" />,
  leaf: <Leaf className="w-10 h-10" />,
  user: <UserCheck className="w-10 h-10" />,
  wrench: <Wrench className="w-10 h-10" />,
}

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="py-20 bg-white">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">
            Why Choose Us
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-dark mt-3 mb-4">
            Why Families Trust Bright Clean
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            We go above and beyond to deliver exceptional cleaning services you
            can rely on.
          </p>
        </div>

        {/* USP Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {whyChooseUs.map((usp, i) => (
            <div
              key={i}
              className="group p-8 rounded-2xl bg-gray-50 hover:bg-gradient-to-br hover:from-primary hover:to-primary-dark transition-all duration-300 cursor-default"
            >
              <div className="text-primary group-hover:text-white mb-5 group-hover:scale-110 transition-all">
                {USP_ICONS[usp.iconKey]}
              </div>
              <h3 className="text-xl font-bold text-dark group-hover:text-white mb-3 transition-colors">
                {usp.title}
              </h3>
              <p className="text-gray-500 group-hover:text-white/80 text-sm leading-relaxed transition-colors m-0">
                {usp.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
