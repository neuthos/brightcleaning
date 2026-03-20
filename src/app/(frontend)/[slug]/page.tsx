import { notFound, redirect } from 'next/navigation'
import type { Metadata } from 'next'

import { serviceAreas } from '@/data/service-areas'
import { testimonials } from '@/data/testimonials'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import FloatingContact from '@/components/layout/FloatingContact'

import Hero from '@/components/sections/Hero'
import Testimonials from '@/components/sections/Testimonials'
import WhyChooseUs from '@/components/sections/WhyChooseUs'
import Services from '@/components/sections/Services'
import CleaningChecklist from '@/components/sections/CleaningChecklist'
import ServiceAreas from '@/components/sections/ServiceAreas'
import BlogPreview from '@/components/sections/BlogPreview'
import FAQ from '@/components/sections/FAQ'
import ContactForm from '@/components/sections/ContactForm'

import {
  LocalBusinessJsonLd,
  FAQJsonLd,
  ServicesJsonLd,
  BreadcrumbJsonLd,
} from '@/components/seo/JsonLd'

interface PageProps {
  params: Promise<{ slug: string }>
}

// Map slugs to service area data
function getSlugMapping(slug: string) {
  // cleaning-services-{city} → primary route
  const csMatch = slug.match(/^cleaning-services-(.+)$/)
  if (csMatch) {
    const area = serviceAreas.find((a) => a.slug === csMatch[1])
    return area ? { area, isRedirect: false } : null
  }

  // cleaners-{city} → redirect to primary
  const clMatch = slug.match(/^cleaners-(.+)$/)
  if (clMatch) {
    const area = serviceAreas.find((a) => a.slug === clMatch[1])
    return area ? { area, isRedirect: true } : null
  }

  return null
}

export async function generateStaticParams() {
  const params: { slug: string }[] = []
  for (const area of serviceAreas) {
    params.push({ slug: `cleaning-services-${area.slug}` })
    params.push({ slug: `cleaners-${area.slug}` })
  }
  return params
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const mapping = getSlugMapping(slug)

  if (!mapping || mapping.isRedirect) {
    return { title: 'Redirecting...' }
  }

  const { area } = mapping
  return {
    title: `Cleaning Services in ${area.city} ${area.state} | Trusted House Cleaners | Bright Clean`,
    description: `Professional house cleaning services in ${area.city}. Bonded & insured cleaners, NDIS approved, end of lease specialists. Servicing ${area.suburbs.slice(0, 5).join(', ')} and more. Get a free quote today!`,
    keywords: [
      `cleaning services ${area.city}`,
      `cleaners ${area.city}`,
      `house cleaning ${area.city}`,
      `end of lease cleaning ${area.city}`,
      `office cleaning ${area.city}`,
      `NDIS cleaning ${area.city}`,
      ...area.suburbs.slice(0, 5).map((s) => `cleaning ${s}`),
    ].join(', '),
    openGraph: {
      title: `Professional Cleaning Services in ${area.city} | Bright Clean`,
      description: area.description,
      url: `https://bright-clean.au/cleaning-services-${area.slug}`,
    },
  }
}

export default async function CityPage({ params }: PageProps) {
  const { slug } = await params
  const mapping = getSlugMapping(slug)

  if (!mapping) {
    notFound()
  }

  // Redirect cleaners-{city} → cleaning-services-{city}
  if (mapping.isRedirect) {
    redirect(`/cleaning-services-${mapping.area.slug}`)
  }

  const { area } = mapping

  // Filter testimonials for this city
  const cityTestimonials = testimonials.filter(
    (t) => t.location.includes(area.city) || t.location.includes(area.state)
  )

  return (
    <>
      {/* SEO Structured Data */}
      <LocalBusinessJsonLd />
      <FAQJsonLd />
      <ServicesJsonLd />
      <BreadcrumbJsonLd city={area.city} slug={area.slug} />

      <Navbar />
      <main>
        <Hero
          city={area.city}
          state={area.state}
          suburbs={area.suburbs}
        />

        {/* City-specific intro section */}
        <section className="py-16 bg-white">
          <div className="section-container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-dark mb-4">
                Professional Cleaning Services in {area.city}
              </h2>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-8">
                {area.description}
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {area.suburbs.map((suburb) => (
                  <span
                    key={suburb}
                    className="inline-block bg-gray-50 border border-gray-200 text-gray-600 text-sm px-3 py-1.5 rounded-full"
                  >
                    {suburb}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Testimonials testimonials={cityTestimonials.length > 0 ? cityTestimonials : undefined} />
        <WhyChooseUs />
        <Services />
        <CleaningChecklist />
        <ServiceAreas />
        <BlogPreview />
        <FAQ />
        <ContactForm />
      </main>
      <Footer />
      <FloatingContact />
    </>
  )
}
