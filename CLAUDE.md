# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 + Payload CMS 3 application for BrightClean, a cleaning service business in Adelaide, SA. The project uses SQLite for the database and is deployed on Railway with Docker.

**Tech Stack:**
- Next.js 15 with App Router
- Payload CMS 3.79.0 (headless CMS)
- SQLite database (`@payloadcms/db-sqlite`)
- Tailwind CSS 4
- TypeScript with strict mode
- Testing: Vitest (integration) + Playwright (E2E)

## Development Commands

```bash
# Install dependencies
pnpm install

# Development server (standard)
pnpm dev

# Development server (clean start - removes .next cache)
pnpm devsafe

# Build for production
pnpm build

# Start production server
pnpm start

# Generate TypeScript types from Payload schema
pnpm generate:types

# Generate import map
pnpm generate:importmap

# Linting
pnpm lint

# Testing
pnpm test              # Run all tests
pnpm test:int          # Run integration tests (Vitest)
pnpm test:e2e          # Run E2E tests (Playwright)

# Direct Payload CLI access
pnpm payload
```

**IMPORTANT:** After modifying Payload collection/field schemas, always run `pnpm generate:types` to update `src/payload-types.ts`.

## Environment Variables

Required environment variables (see `.env.example`):
- `DATABASE_URL` - SQLite database path (e.g., `file:./data/database.db`)
- `PAYLOAD_SECRET` - Secret key for Payload CMS authentication

## Code Architecture

### Directory Structure

```
src/
├── app/
│   ├── (frontend)/          # Public-facing website routes
│   │   ├── api/enquiry/     # Contact form API endpoint
│   │   ├── blog/            # Blog listing and article pages
│   │   └── [slug]/          # Dynamic pages
│   ├── (payload)/           # Payload CMS admin panel routes
│   │   └── admin/           # Admin UI at /admin
│   └── my-route/            # Custom API routes
├── collections/             # Payload CMS collection schemas
│   ├── Articles.ts          # Blog articles collection
│   ├── Media.ts             # File uploads
│   └── Users.ts             # Admin users (auth-enabled)
├── components/
│   ├── layout/              # Navbar, Footer, FloatingContact
│   ├── sections/            # Homepage sections (Hero, Services, etc.)
│   └── seo/                 # JsonLd structured data
├── data/                    # Static site content (services, FAQs, etc.)
└── payload.config.ts        # Main Payload CMS configuration
```

### Key Architectural Patterns

**1. Next.js Route Groups**
- `(frontend)` - Public website with shared layout
- `(payload)` - Payload admin panel (completely separate routing)

**2. Payload CMS Integration**
- Collections defined in `src/collections/` are imported into `payload.config.ts`
- TypeScript types auto-generated to `src/payload-types.ts`
- Admin panel accessible at `/admin`
- API endpoints auto-generated at `/api/*`

**3. Data Fetching Pattern**
Server Components fetch data directly from Payload:

```typescript
import { getPayload } from 'payload'
import config from '@payload-config'

const payload = await getPayload({ config })
const { docs } = await payload.find({ collection: 'articles' })
```

**4. Static Content Management**
Non-CMS content (services, FAQs, testimonials) stored as typed constants in `src/data/` and exported via `src/data/index.ts`.

## Payload CMS Critical Rules

### Backend Field Naming Convention
**IMPORTANT:** All backend fields must use `snake_case` (e.g., `published_at`, `featured_image`). This is a project-wide standard.

### Security Patterns (CRITICAL)

**1. Local API Access Control**
When using Local API with a user context, ALWAYS set `overrideAccess: false`:

```typescript
// ❌ WRONG - Bypasses access control
await payload.find({ collection: 'posts', user: req.user })

// ✅ CORRECT - Enforces permissions
await payload.find({
  collection: 'posts',
  user: req.user,
  overrideAccess: false
})
```

**2. Transaction Safety in Hooks**
ALWAYS pass `req` to nested operations in hooks:

```typescript
// ✅ CORRECT - Maintains transaction atomicity
hooks: {
  afterChange: [
    async ({ doc, req }) => {
      await req.payload.create({
        collection: 'audit-log',
        data: { docId: doc.id },
        req, // Required for transaction safety
      })
    },
  ]
}
```

**3. Prevent Infinite Hook Loops**
Use `req.context` flags to prevent recursive hook execution:

```typescript
hooks: {
  afterChange: [
    async ({ doc, req, context }) => {
      if (context.skipHooks) return

      await req.payload.update({
        collection: 'posts',
        id: doc.id,
        data: { views: doc.views + 1 },
        context: { skipHooks: true },
        req,
      })
    },
  ]
}
```

## Testing

**Integration Tests (Vitest)**
- Located in `tests/int/`
- Pattern: `*.int.spec.ts`
- Run with `pnpm test:int`
- Uses jsdom environment

**E2E Tests (Playwright)**
- Located in `tests/e2e/`
- Pattern: `*.e2e.spec.ts`
- Run with `pnpm test:e2e`
- Automatically starts dev server on `http://localhost:3000`

## Deployment (Railway)

The application is containerized using Docker and deployed on Railway.

**Build Process:**
1. `railway.json` specifies Dockerfile-based build
2. Multi-stage build creates optimized production image
3. Build uses temporary SQLite DB (`build.db`) for static generation
4. Runtime uses persistent volume at `/data` for production DB and media

**Required Railway Environment Variables:**
- `PAYLOAD_SECRET` (build arg + runtime)
- `DATABASE_URL` (runtime only - points to `/data/database.db` on persistent volume)

**Volume Mount:**
- Railway volume mounted at `/data`
- Contains SQLite database and uploaded media files
- Symlinked to `/app/media` via entrypoint script

## Path Aliases

TypeScript path aliases configured in `tsconfig.json`:
- `@/*` → `./src/*`
- `@payload-config` → `./src/payload.config.ts`

## Additional Resources

For comprehensive Payload CMS patterns, see:
- `.cursor/rules/payload-overview.md` - Quick reference and core principles
- `.cursor/rules/security-critical.mdc` - Critical security patterns
- `.cursor/rules/collections.md` - Collection configuration patterns
- `.cursor/rules/fields.md` - Field type reference
- `.cursor/rules/hooks.md` - Hook patterns and usage
- `.cursor/rules/access-control.md` - Access control patterns
- `.cursor/rules/queries.md` - Query API patterns
