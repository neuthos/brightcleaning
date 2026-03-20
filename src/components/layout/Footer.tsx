import { siteConfig } from '@/data'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-dark text-white">
      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-extrabold mb-4">
              <span className="text-primary">Bright</span>Clean
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              {siteConfig.tagline}. Professional, trusted, and reliable
              cleaning services across Australia.
            </p>
            <div className="flex gap-4">
              {siteConfig.social.facebook && (
                <a
                  href={siteConfig.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-dark-lighter flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all no-underline"
                  aria-label="Facebook"
                >
                  f
                </a>
              )}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-primary mb-4">
              Services
            </h4>
            <ul className="space-y-3 list-none p-0 m-0">
              {[
                'House Cleaning',
                'End of Lease Cleaning',
                'Office Cleaning',
                'NDIS Cleaning',
                'Deep Cleaning',
                'Carpet Cleaning',
              ].map((s) => (
                <li key={s}>
                  <a
                    href="#services"
                    className="text-gray-400 text-sm hover:text-primary transition-colors no-underline"
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-primary mb-4">
              Service Areas
            </h4>
            <ul className="space-y-3 list-none p-0 m-0">
              {['Adelaide', 'Perth', 'Sydney', 'Melbourne'].map((c) => (
                <li key={c}>
                  <a
                    href="#areas"
                    className="text-gray-400 text-sm hover:text-primary transition-colors no-underline"
                  >
                    Cleaning {c}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-primary mb-4">
              Contact Us
            </h4>
            <div className="space-y-4">
              <a
                href={`tel:${siteConfig.phoneRaw}`}
                className="flex items-center gap-3 text-gray-400 text-sm hover:text-primary transition-colors no-underline"
              >
                📞 {siteConfig.phone}
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-3 text-gray-400 text-sm hover:text-primary transition-colors no-underline"
              >
                ✉️ {siteConfig.email}
              </a>
              <p className="text-gray-400 text-sm">
                🕐 {siteConfig.hours.weekdays}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs m-0">
            © {currentYear} Bright Clean. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-gray-500 text-xs hover:text-primary transition-colors no-underline"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-500 text-xs hover:text-primary transition-colors no-underline"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
