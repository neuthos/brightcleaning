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

### Phase 6: Railway Deployment ✅ (code-ready)
- **`output: 'standalone'`** added to `next.config.mjs` for Docker builds
- **Dockerfile** rewritten with `/data` volume mount for persistent SQLite DB + media uploads
  - Entrypoint script symlinks `/data/media` → `/app/media` at runtime
  - File: [Dockerfile](file:///home/neuthos/Neuthos/brightclean/Dockerfile)
- **`railway.json`** added — Dockerfile builder, restart on failure
  - File: [railway.json](file:///home/neuthos/Neuthos/brightclean/railway.json)
- **Build verified** locally — 0 errors, standalone output generated

#### Railway Setup (manual steps)
1. Create project on [railway.app](https://railway.app) → Deploy from GitHub → `neuthos/brightcleaning` (branch `develop`)
2. Add **Volume** → mount path: `/data`
3. Set **Environment Variables**:
   - `DATABASE_URL` = `file:///data/database.db`
   - `PAYLOAD_SECRET` = *(new secure string)*
   - `NEXT_PUBLIC_SERVER_URL` = `https://your-app.up.railway.app`
4. Deploy → open `/admin` → create first admin user

## Remaining
- **Cleanup:** Delete old files in `(frontend)/`: duplicate `robots.ts`, `sitemap.ts`, `cleaning-services-[city]/`, `cleaners-[city]/`

## Key Gotchas
1. `robots.ts` / `sitemap.ts` must be at `src/app/` root, not inside `(frontend)` route group
2. Next.js **doesn't support** partial dynamic segments like `cleaning-services-[city]` — use `[slug]` and parse the slug
3. PayloadCMS type errors resolve after `payload generate:types` runs (happens on dev server restart)
4. Tailwind CSS v4 resets all browser styles — `.prose` class needed for rich text content
5. Railway filesystem is **ephemeral** — SQLite DB and media must live on the Volume (`/data`)
6. `PAYLOAD_SECRET` in `.env` is in git history — use a **different** secret in Railway
