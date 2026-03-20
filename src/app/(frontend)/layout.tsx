import React from 'react'
import './styles.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'Professional House Cleaning Australia | Bright Clean',
    template: '%s | Bright Clean',
  },
  description:
    'Trusted house cleaning services in Adelaide, Perth, Sydney & Melbourne. Bonded & insured cleaners, NDIS approved. Get a free quote today!',
  metadataBase: new URL('https://bright-clean.au'),
  openGraph: {
    type: 'website',
    siteName: 'Bright Clean',
    locale: 'en_AU',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  )
}
