import { getPayload } from 'payload'
import config from '@payload-config'
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Cleaning Tips & Blog | Bright Clean',
  description:
    'Expert cleaning tips, home organisation advice, and industry insights from the Bright Clean team. Learn how to keep your home spotless.',
}

const categoryLabels: Record<string, string> = {
  'cleaning-tips': 'Cleaning Tips',
  'home-organisation': 'Home Organisation',
  'end-of-lease': 'End of Lease',
  'ndis-support': 'NDIS Support',
  'office-cleaning': 'Office Cleaning',
  news: 'News & Updates',
}

export default async function BlogPage() {
  const payload = await getPayload({ config })

  let articles: any[] = []
  try {
    const result = await payload.find({
      collection: 'articles',
      where: {
        status: { equals: 'published' },
      },
      sort: '-publishedAt',
      limit: 20,
    })
    articles = result.docs
  } catch {
    // DB may not have tables yet (first deploy)
    articles = []
  }

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16 min-h-screen bg-gray-50">
        <div className="section-container">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">
              Our Blog
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-dark mt-3 mb-4">
              Cleaning Tips & Insights
            </h1>
            <p className="text-gray-500 max-w-xl mx-auto">
              Expert advice from our professional cleaners to help you maintain a spotless home.
            </p>
          </div>

          {/* Articles Grid */}
          {articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article) => (
                <Link
                  key={article.id}
                  href={`/blog/${article.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 no-underline border border-gray-100"
                >
                  {/* Image */}
                  <div className="aspect-[16/10] bg-gray-100 overflow-hidden relative">
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
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
                        <span className="text-4xl">📝</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {article.category && (
                      <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                        {categoryLabels[article.category] || article.category}
                      </span>
                    )}
                    <h2 className="text-lg font-bold text-dark mt-2 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {article.title}
                    </h2>
                    <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">
                        {article.publishedAt
                          ? new Date(article.publishedAt).toLocaleDateString('en-AU', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })
                          : ''}
                      </span>
                      <span className="text-primary text-sm font-medium group-hover:translate-x-1 transition-transform inline-block">
                        Read more →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <span className="text-5xl block mb-4">📝</span>
              <h2 className="text-xl font-bold text-dark mb-2">Coming Soon!</h2>
              <p className="text-gray-500 max-w-md mx-auto">
                We&apos;re working on helpful cleaning tips and guides. Check back soon!
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
