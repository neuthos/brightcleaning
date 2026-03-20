# Multi-stage Dockerfile for Next.js + PayloadCMS + SQLite
# Requires `output: 'standalone'` in next.config.mjs

FROM node:22.17.0-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
COPY .npmrc* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

# Build-time env vars for Payload static page generation
# Use a TEMPORARY local DB during build (the /data volume doesn't exist during docker build)
# At runtime, Railway's env vars will override these with the real paths
ARG PAYLOAD_SECRET
ENV PAYLOAD_SECRET=${PAYLOAD_SECRET}
ENV DATABASE_URL=file:./build.db

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Create data directory for Railway Volume mount
# This will be the mount point for persistent storage (SQLite DB + media)
RUN mkdir -p /data/media
RUN chown -R nextjs:nodejs /data

# Copy public assets
COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Copy standalone output
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Create entrypoint script for volume initialization
RUN printf '#!/bin/sh\n\
# Symlink media directory to persistent volume\n\
ln -sfn /data/media /app/media\n\
\n\
# Start the server\n\
HOSTNAME="0.0.0.0" node server.js\n' > /app/entrypoint.sh && chmod +x /app/entrypoint.sh

USER nextjs

EXPOSE 3000

ENV PORT=3000

CMD ["/app/entrypoint.sh"]
