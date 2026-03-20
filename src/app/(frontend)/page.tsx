import React from 'react'

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
  WebsiteJsonLd,
} from '@/components/seo/JsonLd'

export const metadata = {
  title: 'Professional House Cleaning Australia | Trusted Cleaners Near You | Bright Clean',
  description:
    'Trusted house cleaning services in Adelaide, Perth, Sydney & Melbourne. Bonded & insured cleaners, NDIS approved, end of lease cleaning. Get a free quote today! ☎ 0428 948 776',
  keywords:
    'house cleaning, cleaners, home cleaning, end of lease cleaning, bond cleaning, office cleaning, NDIS cleaning, deep cleaning, Adelaide, Perth, Sydney, Melbourne',
  openGraph: {
    title: 'Professional House Cleaning | Bright Clean Australia',
    description:
      'Trusted house cleaning services across Australia. Bonded & insured, NDIS approved. Get a free quote today!',
    url: 'https://bright-clean.au',
    siteName: 'Bright Clean',
    type: 'website',
  },
}

export default function HomePage() {
  return (
    <>
      {/* SEO Structured Data */}
      <LocalBusinessJsonLd />
      <FAQJsonLd />
      <ServicesJsonLd />
      <WebsiteJsonLd />

      <Navbar />
      <main>
        <Hero />
        <Testimonials />
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

