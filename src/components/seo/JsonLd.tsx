import { siteConfig } from '@/data/site-config'
import { faqItems } from '@/data/faq'
import { services } from '@/data/services'
import { serviceAreas } from '@/data/service-areas'

/**
 * LocalBusiness JSON-LD structured data
 * Helps Google show rich business info in search results
 */
export function LocalBusinessJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `https://${siteConfig.domain}`,
    name: siteConfig.name,
    description: siteConfig.tagline,
    url: `https://${siteConfig.domain}`,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    image: `https://${siteConfig.domain}/brightcleanlogo.jpg`,
    logo: `https://${siteConfig.domain}/brightcleanlogo.jpg`,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.state,
      addressCountry: siteConfig.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -34.9285, // Adelaide
      longitude: 138.6007,
    },
    areaServed: serviceAreas.map((area) => ({
      '@type': 'City',
      name: area.city,
      addressRegion: area.state,
    })),
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '07:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '08:00',
        closes: '16:00',
      },
    ],
    sameAs: [
      siteConfig.social.facebook,
      siteConfig.social.instagram,
      siteConfig.social.google,
    ].filter(Boolean),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: '500',
      bestRating: '5',
      worstRating: '1',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

/**
 * FAQPage JSON-LD structured data
 * Enables FAQ rich snippets in Google search
 */
export function FAQJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

/**
 * Service JSON-LD structured data
 * Lists all services for Google
 */
export function ServicesJsonLd() {
  const jsonLd = services.map((service) => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: service.title,
    provider: {
      '@type': 'LocalBusiness',
      name: siteConfig.name,
      url: `https://${siteConfig.domain}`,
    },
    description: service.description,
    areaServed: serviceAreas.map((area) => ({
      '@type': 'City',
      name: area.city,
    })),
  }))

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

/**
 * BreadcrumbList JSON-LD for city pages
 */
export function BreadcrumbJsonLd({ city, slug }: { city: string; slug: string }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `https://${siteConfig.domain}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: `Cleaning Services in ${city}`,
        item: `https://${siteConfig.domain}/cleaning-services-${slug}`,
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

/**
 * WebSite JSON-LD with search action
 */
export function WebsiteJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: `https://${siteConfig.domain}`,
    description: `${siteConfig.name} - ${siteConfig.tagline}`,
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `https://${siteConfig.domain}/brightcleanlogo.jpg`,
      },
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
