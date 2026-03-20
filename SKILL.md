---
name: project-codebase-patterns
description: Self-learning codebase patterns document — updated as the project evolves
---

# Codebase Patterns & Conventions

> **This file is auto-maintained.** The AI agent updates this document as it learns the codebase.
> It serves as institutional memory so new chat sessions don't lose context.

---

## 1. Folder Structure — Current State

<!-- Agent fills this after scanning the project -->
```
src/
├── app/                # Pages/routes
├── components/
│   ├── ui/             # Atomic components (buttons, cards, modals)
│   ├── sections/       # Page sections (hero, features, testimonials)
│   └── layout/         # Layout components (navbar, footer)
├── data/               # Static data constants — ALL data lives here
├── lib/                # Utilities, API helpers, configs
├── hooks/              # Custom React hooks
├── types/              # TypeScript type definitions
└── i18n/               # Internationalization config
```

---

## 2. Component Pattern

<!-- Agent documents the established component pattern after first implementation -->

```tsx
// Template — agent fills with actual pattern from codebase
"use client";

import { useTranslations } from "next-intl"; // if using i18n

export default function ComponentName() {
  const t = useTranslations("ComponentKey");
  
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Content */}
      </div>
    </section>
  );
}
```

### Key rules:
- [ ] Agent fills these after observing patterns
- [ ] ...

---

## 3. Data / Constants Pattern

<!-- Agent documents data patterns after seeing src/data/ -->

```typescript
// Template — agent fills with actual pattern
export interface EntityType {
  id: string;
  slug: string;
  // ...
}

export const entities: EntityType[] = [
  // ...
];

export function getEntityBySlug(slug: string): EntityType | undefined {
  return entities.find((e) => e.slug === slug);
}
```

---

## 4. i18n Pattern

<!-- Agent fills after seeing messages/*.json structure -->

---

## 5. Image Handling

<!-- Agent fills with project-specific image workflow -->

---

## 6. Styling Conventions

<!-- Agent documents color system, typography, component classes -->

- **Primary framework**: (from PROJECT_VARS.md)
- **Section headings**: (observed pattern)
- **Typography**: (observed pattern)
- **Colors**: (from PROJECT_VARS.md)
- **Mobile-first**: Always

---

## 7. API / Data Flow

<!-- Agent documents API routes, data fetching patterns -->

---

## 8. Navigation / Routing

<!-- Agent documents routing patterns -->

---

## 9. Adding a New [Section/Page/Feature] — Checklist

<!-- Agent builds this checklist after implementing a few features -->

1. ☐ Step 1
2. ☐ Step 2
3. ☐ ...

---

## 10. Common Gotchas

<!-- Agent adds gotchas as they're discovered during development -->

- (Agent fills as issues are encountered)

---

## 11. Changelog

<!-- Agent appends entries as patterns are updated -->

| Date | Change | Context |
|------|--------|---------|
| | Initial setup | Created by onboarding |
