# Project Variables
# Fill this once — all AI workflows and rules reference these values.

## App Identity
- **App Name**: Bright Clean
- **Tagline**: "Excellent Cleaning Service at Your Home"
- **Domain**: bright-clean.au
- **App Type**: B2C landing page + Blog CMS for cleaning service business
- **Target Audience**: Parents aged 25–50 in Australia who value simplicity and ease-of-use
- **Elevator Pitch**: Bright Clean is a professional home & commercial cleaning service operating in Adelaide, Perth, Sydney, and Melbourne. The website serves as a lead-generation landing page with SEO-optimised content, an interactive booking/enquiry system (WhatsApp, Messenger, Email), and a blog CMS for content marketing.

## Brand & Design
- **Brand Personality**: Trustworthy, professional, approachable, simple, reliable
- **Brand Voice Keywords**: "trusted, professional, reliable, spotless, easy, hassle-free"
- **Forbidden Words**: "cheap, budget, discount" (we use "affordable" instead)
- **Primary Color**: #0dc0df
- **Secondary Color**: #ffde59
- **Accent Color**: #0a9ab3 (darker shade of primary for hover/active states)
- **Dark Background**: #1a1a2e
- **Font Primary**: Inter (clean, highly readable, great for older audiences)
- **Font Accent**: none
- **Design Style**: Clean, minimal, high-contrast, large text, mobile-first. Prioritise readability and ease-of-use over flashy aesthetics.
- **Design Reference URLs**: https://www.calibrecleaning.com.au/ , https://www.maid2match.com.au/cleaners-adelaide/

## Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **CMS**: PayloadCMS 3.0 (for blog admin dashboard)
- **Database**: SQLite (native, via @payloadcms/db-sqlite) — persistent on Railway volume storage
- **Auth**: PayloadCMS built-in auth (admin only)
- **Payment**: none (Get a Quote model)
- **Deployment**: Railway (free tier: 0.5GB RAM, 0.5GB volume, 1 vCPU)
- **Package Manager**: npm

## i18n (Internationalization)
- **Locales**: ["en"]
- **Default Locale**: "en"
- **i18n Library**: none (English only)

## Architecture
- **Data Strategy**: Static data constants in src/data/ for landing page content. PayloadCMS + SQLite for blog articles.
- **State Management**: React useState + useReducer (for booking form multi-step)
- **API Style**: Next.js API Routes (enquiry form, backup endpoint)
- **Image Strategy**: next/image for automatic optimisation + WebP conversion

## Folder Structure
```
src/
├── app/                    # Pages/routes (Next.js App Router)
│   ├── (frontend)/         # Public-facing pages
│   │   ├── page.tsx        # Landing page
│   │   └── blog/           # Blog pages
│   ├── (payload)/          # PayloadCMS admin routes
│   └── api/                # API routes
├── components/
│   ├── ui/                 # Atomic components (Button, Card, Input)
│   ├── sections/           # Page sections (Hero, Services, FAQ, etc.)
│   └── layout/             # Navbar, Footer, FloatingContact
├── data/                   # Static data constants — ALL editable content here
│   ├── site-config.ts      # Phone, email, ABN, hours, WhatsApp (VARIABLES)
│   ├── services.ts         # 6 cleaning services
│   ├── service-areas.ts    # Cities + suburbs (easy to expand)
│   ├── testimonials.ts     # Customer reviews (placeholder)
│   ├── why-choose-us.ts    # 6 USPs
│   ├── checklist.ts        # Cleaning checklists
│   ├── faq.ts              # FAQ items
│   └── index.ts            # Barrel export
├── lib/                    # Utilities
│   ├── whatsapp.ts         # WhatsApp message builder
│   ├── messenger.ts        # Clipboard + m.me redirect
│   └── email.ts            # Email sender
├── hooks/                  # Custom React hooks
├── types/                  # TypeScript type definitions
└── payload/                # PayloadCMS collections & config
```

## Team & Contacts
- **Founder/Owner**: (variable in site-config.ts)
- **Developer(s)**: AI-assisted development
- **Contact Email**: brightclean.2020@gmail.com (variable)
- **Contact Phone**: 📞 0426 946 776 (variable)

## Feature Checklist
- [ ] Landing Page (all 11 sections)
- [ ] Navigation (Navbar + Footer + Floating Contact)
- [ ] Booking/Enquiry System (WhatsApp, Messenger clipboard, Email)
- [ ] Blog & CMS (PayloadCMS admin dashboard)
- [ ] SEO & Performance (target 100/100 mobile + desktop)
- [ ] Deployment to Railway

## Key Business Decisions
- **Pricing**: "Get a Quote" model only — no prices displayed on website
- **Service Areas**: Variable-driven, currently Adelaide, Perth, Sydney, Melbourne
- **Messenger Flow**: User fills form → copies generated message to clipboard → Messenger button unlocks → opens m.me/BrightCleanOZ
- **Database Backup**: API endpoint at /api/backup returns SQLite dump as JSON
- **Stock Images**: Using stock images for now, all image paths stored as variables for easy replacement
- **Testimonials**: Placeholder data for now, stored in variables for easy editing
