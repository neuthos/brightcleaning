import type { MetadataRoute } from 'next'
import { serviceAreas } from '@/data/service-areas'

const BASE_URL = 'https://bright-clean.au'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
  ]

  // Dynamic city pages
  const cityPages: MetadataRoute.Sitemap = serviceAreas.map((area) => ({
    url: `${BASE_URL}/cleaning-services-${area.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }))

  return [...staticPages, ...cityPages]
}
