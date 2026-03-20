import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { RichText } from '@payloadcms/richtext-lexical/react'

interface PageProps {
  params: Promise<{ slug: string }>
}

const categoryLabels: Record<string, string> = {
  'cleaning-tips': 'Cleaning Tips',
  'home-organisation': 'Home Organisation',
  'end-of-lease': 'End of Lease',
  'ndis-support': 'NDIS Support',
  'office-cleaning': 'Office Cleaning',
  news: 'News & Updates',
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'articles',
    where: {
      slug: { equals: slug },
      status: { equals: 'published' },
    },
    limit: 1,
  })

  const article = docs[0]
  if (!article) return { title: 'Article Not Found' }

  return {
    title: `${article.title} | Bright Clean Blog`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.publishedAt || undefined,
      url: `https://bright-clean.au/blog/${article.slug}`,
      images:
        article.featuredImage &&
        typeof article.featuredImage === 'object' &&
        article.featuredImage.url
          ? [article.featuredImage.url]
          : [],
    },
  }
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'articles',
    where: {
      slug: { equals: slug },
      status: { equals: 'published' },
    },
    limit: 1,
  })

  const article = docs[0]
  if (!article) notFound()

  // Get related articles (same category, different article)
  const { docs: relatedArticles } = await payload.find({
    collection: 'articles',
    where: {
      status: { equals: 'published' },
      category: { equals: article.category },
      id: { not_equals: article.id },
    },
    limit: 3,
    sort: '-publishedAt',
  })

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16 min-h-screen">
        {/* Article Header */}
        <div className="bg-gray-50 py-12">
          <div className="section-container">
            <div className="max-w-3xl mx-auto">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
                <Link href="/" className="hover:text-primary no-underline text-gray-400">
                  Home
                </Link>
                <span>›</span>
                <Link href="/blog" className="hover:text-primary no-underline text-gray-400">
                  Blog
                </Link>
                <span>›</span>
                <span className="text-gray-600 truncate">{article.title}</span>
              </div>

              {/* Category */}
              {article.category && (
                <span className="inline-block text-xs font-semibold text-primary uppercase tracking-wider bg-primary/10 px-3 py-1 rounded-full mb-4">
                  {categoryLabels[article.category] || article.category}
                </span>
              )}

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-dark leading-tight mb-4">
                {article.title}
              </h1>

              {/* Meta */}
              <p className="text-gray-500 text-base mb-0">
                {article.publishedAt &&
                  new Date(article.publishedAt).toLocaleDateString('en-AU', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
              </p>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        {article.featuredImage &&
          typeof article.featuredImage === 'object' &&
          article.featuredImage.url && (
            <div className="section-container -mt-0">
              <div className="max-w-3xl mx-auto">
                <div className="aspect-[16/9] rounded-2xl overflow-hidden relative my-8 shadow-lg">
                  <Image
                    src={article.featuredImage.url}
                    alt={article.featuredImage.alt || article.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          )}

        {/* Article Content */}
        <div className="section-container">
          <article className="max-w-3xl mx-auto prose prose-lg prose-gray">
            {article.content && <RichText data={article.content} />}
          </article>
        </div>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="section-container mt-8">
            <div className="max-w-3xl mx-auto flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-block bg-gray-100 text-gray-600 text-xs px-3 py-1.5 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="section-container mt-12">
          <div className="max-w-3xl mx-auto bg-primary/5 border border-primary/10 rounded-2xl p-8 text-center">
            <h3 className="text-xl font-bold text-dark mb-2">
              Need a professional clean?
            </h3>
            <p className="text-gray-500 text-sm mb-4">
              Get a free, no-obligation quote in just 30 seconds.
            </p>
            <Link
              href="/#hero"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 rounded-full no-underline transition-all"
            >
              Get a Free Quote →
            </Link>
          </div>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="section-container mt-16">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-xl font-bold text-dark mb-6">Related Articles</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedArticles.map((related) => (
                  <Link
                    key={related.id}
                    href={`/blog/${related.slug}`}
                    className="group bg-white rounded-xl p-4 border border-gray-100 hover:shadow-md transition-all no-underline"
                  >
                    <h3 className="text-sm font-semibold text-dark group-hover:text-primary transition-colors line-clamp-2 mb-1">
                      {related.title}
                    </h3>
                    <p className="text-xs text-gray-400 line-clamp-2">
                      {related.excerpt}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}
