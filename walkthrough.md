# BrightClean Project — Session Summary

## Tech Stack
- **Next.js 15** (App Router) + **PayloadCMS 3.0** + **SQLite** + **Tailwind CSS v4**
- Project path: `/home/neuthos/Neuthos/brightclean`
- Dev command: `npm run devsafe`

## What Was Done This Session

### Phase 3.5: UI Redesign ✅
- **Hero** → Light theme, two-column layout, inline **multi-step QuoteWizard** (like Maid2Match)
  - 4 dynamic steps: Service → Bedrooms/Bathrooms → Frequency → Contact
  - Steps are conditionally shown based on service type
  - File: [Hero.tsx](file:///\\wsl.localhost\Ubuntu\home\neuthos\Neuthos\brightclean\src\components\sections\Hero.tsx), [QuoteWizard.tsx](file:///\\wsl.localhost\Ubuntu\home\neuthos\Neuthos\brightclean\src\components\sections\QuoteWizard.tsx)
- **Navbar** → Always white, **Locations dropdown**, mobile padding fix, **BrightClean logo** integrated
  - File: [Navbar.tsx](file:///\\wsl.localhost\Ubuntu\home\neuthos\Neuthos\brightclean\src\components\layout\Navbar.tsx)
- **ContactForm** → Restyled to light theme
- **Dynamic City Pages** → `/cleaning-services-adelaide`, `-perth`, `-sydney`, `-melbourne`
  - Uses `[slug]` catch-all route (not `cleaning-services-[city]` — Next.js doesn't support partial dynamic segments)
  - `/cleaners-{city}` redirects to `/cleaning-services-{city}`
  - Files: [slug page](file:///\\wsl.localhost\Ubuntu\home\neuthos\Neuthos\brightclean\src\app\(frontend)\[slug]\page.tsx), [service-areas.ts](file:///\\wsl.localhost\Ubuntu\home\neuthos\Neuthos\brightclean\src\data\service-areas.ts)

### Phase 4: Blog CMS ✅
- **PayloadCMS Articles collection** — title, slug, excerpt, rich text (Lexical), featured image, category, tags, author, status, publish date
  - File: [Articles.ts](file:///\\wsl.localhost\Ubuntu\home\neuthos\Neuthos\brightclean\src\collections\Articles.ts)
  - Registered in [payload.config.ts](file:///\\wsl.localhost\Ubuntu\home\neuthos\Neuthos\brightclean\src\payload.config.ts)
- `/blog` listing page — fetches published articles, empty state fallback
- `/blog/[slug]` detail page — rich text rendering, tags, related articles, CTA
- **BlogPreview section** on landing page — integrated with PayloadCMS (shows real articles or placeholders)
- **Prose CSS styles** added for rich text h1-h6, ul/ol, blockquote, code, tables
  - File: [styles.css](file:///\\wsl.localhost\Ubuntu\home\neuthos\Neuthos\brightclean\src\app\(frontend)\styles.css)

### Phase 5: SEO ✅
- **JSON-LD structured data** — LocalBusiness, FAQPage, Services, Breadcrumb, WebSite
  - File: [JsonLd.tsx](file:///\\wsl.localhost\Ubuntu\home\neuthos\Neuthos\brightclean\src\components\seo\JsonLd.tsx)
  - Injected on homepage and all city pages
- **sitemap.xml** + **robots.txt** — at `src/app/` root (NOT inside [(frontend)](file://wsl.localhost/Ubuntu/home/neuthos/Neuthos/brightclean/src/data/why-choose-us.ts#1-6))
  - Files: [sitemap.ts](file:///\\wsl.localhost\Ubuntu\home\neuthos\Neuthos\brightclean\src\app\sitemap.ts), [robots.ts](file:///\\wsl.localhost\Ubuntu\home\neuthos\Neuthos\brightclean\src\app\robots.ts)

## Remaining
- **Phase 6: Deploy to Railway** — not started
- **Cleanup:** Delete old files in [(frontend)/](file://wsl.localhost/Ubuntu/home/neuthos/Neuthos/brightclean/src/data/why-choose-us.ts#1-6): [robots.ts](file://wsl.localhost/Ubuntu/home/neuthos/Neuthos/brightclean/src/app/robots.ts), [sitemap.ts](file://wsl.localhost/Ubuntu/home/neuthos/Neuthos/brightclean/src/app/sitemap.ts), `cleaning-services-[city]/`, `cleaners-[city]/`

## Key Gotchas
1. [robots.ts](file://wsl.localhost/Ubuntu/home/neuthos/Neuthos/brightclean/src/app/robots.ts) / [sitemap.ts](file://wsl.localhost/Ubuntu/home/neuthos/Neuthos/brightclean/src/app/sitemap.ts) must be at `src/app/` root, not inside [(frontend)](file://wsl.localhost/Ubuntu/home/neuthos/Neuthos/brightclean/src/data/why-choose-us.ts#1-6) route group
2. Next.js **doesn't support** partial dynamic segments like `cleaning-services-[city]` — use `[slug]` and parse the slug
3. PayloadCMS type errors resolve after `payload generate:types` runs (happens on dev server restart)
4. Tailwind CSS v4 resets all browser styles — `.prose` class needed for rich text content
