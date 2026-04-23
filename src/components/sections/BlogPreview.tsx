import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'
import Image from 'next/image'
import { FileText } from 'lucide-react'

const categoryLabels: Record<string, string> = {
  'cleaning-tips': 'Cleaning Tips',
  'home-organisation': 'Home Organisation',
  'end-of-lease': 'End of Lease',
  'ndis-support': 'NDIS Support',
  'office-cleaning': 'Office Cleaning',
  news: 'News & Updates',
}

export default async function BlogPreview() {
  let articles: {
    id: number
    title: string
    slug: string
    excerpt: string
    category?: string | null
    publishedAt?: string | null
    featuredImage?: { url?: string | null; alt: string } | number | null
  }[] = []

  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'articles',
      where: { status: { equals: 'published' } },
      sort: '-publishedAt',
      limit: 3,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    articles = result.docs as any[]
  } catch {
    // Payload might not be ready yet (migration pending), use placeholders
  }

  // Don't render the section if there are no real articles
  if (articles.length === 0) return null

  return (
    <section id="blog" className="py-20 bg-white">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">
            Blog
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-dark mt-3 mb-4">
            Cleaning Tips & Guides
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Expert advice, practical tips, and insider knowledge to keep your
            space spotless.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/blog/${article.slug}`}
              className="group bg-gray-50 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-primary/20 no-underline"
            >
              {/* Image */}
              <div className="h-48 bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center relative overflow-hidden">
                {article.featuredImage &&
                typeof article.featuredImage === 'object' &&
                article.featuredImage.url ? (
                  <Image
                    src={article.featuredImage.url}
                    alt={article.featuredImage.alt || article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <FileText className="w-16 h-16 text-primary/30" />
                )}
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  {article.category && (
                    <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                      {categoryLabels[article.category] || article.category}
                    </span>
                  )}
                  {article.publishedAt && (
                    <span className="text-xs text-gray-400">
                      {new Date(article.publishedAt).toLocaleDateString('en-AU', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-bold text-dark mb-2 group-hover:text-primary transition-colors leading-snug">
                  {article.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed m-0">
                  {article.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary-dark transition-colors no-underline"
          >
            View all articles →
          </Link>
        </div>
      </div>
    </section>
  )
}
