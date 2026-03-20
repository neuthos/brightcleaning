---
description: First-time project setup — collects project variables and configures AI context
---

# Onboarding Workflow

## When to Use
Run this workflow when `PROJECT_VARS.md` has empty fields. This is typically the FIRST interaction with the AI on a new project.

## Steps

### 1. Greet & Explain

Introduce yourself and explain the variable system:

> "Hey! I see this is a new project. Before we start coding, I need to understand your project so I can maintain consistent code style, design, and architecture across all our conversations. I'll ask you a few questions to fill in `PROJECT_VARS.md`."

### 2. Collect Core Identity (REQUIRED)

Ask these questions — ALL are required:

```
1. What's the name of your app?
2. In 1-2 sentences, what does this app do and who is it for?
3. What type of app is this? (e.g., B2C web app, SaaS, portfolio, e-commerce, blog)
4. Who is your target audience? (e.g., "travelers visiting Indonesia", "small business owners")
```

### 3. Collect Brand & Design (REQUIRED)

```
5. Describe your brand personality in 3-5 words (e.g., "playful, authentic, friendly")
6. Are there any words/tone we should NEVER use? (e.g., "luxury, premium")
7. What are your brand colors? 
   - Primary color (hex): 
   - Secondary color (hex):
   - Accent color (hex):
   - Dark background (hex, default: #1a1a1a):
8. What fonts do you want? (or I can suggest: Outfit + Lora is a great combo)
9. Any design style preference? (e.g., minimalist, glassmorphism, dark mode, vibrant)
10. Any reference websites for design inspiration? (optional)
```

### 4. Collect Tech Stack (REQUIRED)

```
11. What framework? (e.g., Next.js App Router, Vite + React, SvelteKit)
12. TypeScript or JavaScript?
13. Styling approach? (e.g., Tailwind + DaisyUI, Vanilla CSS, Chakra UI)
14. Database? (e.g., PostgreSQL + Prisma, Supabase, MongoDB, "none for MVP")
15. Authentication? (e.g., Google OAuth via NextAuth, Firebase Auth, "none")
16. Payment integration? (e.g., Stripe, Xendit, "none")
17. Where will this be deployed? (e.g., Vercel, Netlify, Cloudflare Pages)
```

### 5. Collect i18n Preferences

```
18. What languages should the app support? (e.g., "English only", "English + Indonesian + Chinese")
19. i18n library preference? (e.g., next-intl, react-i18next, "none")
```

### 6. Collect Architecture Preferences

```
20. Data strategy: static JSON for MVP or full backend API?
21. State management: React Context, Zustand, Redux, or keep it simple?
22. Any specific features you already know you need? (list them so we can track progress)
```

### 7. Collect Team & Contact Info (OPTIONAL)

```
23. Who's on the team? (names, roles)
24. Contact email/phone for the project?
25. Domain name? (if known)
```

### 8. Fill PROJECT_VARS.md

After collecting answers:
1. Update `PROJECT_VARS.md` with all collected values
2. Update `AGENTS.md` — replace all `{{PLACEHOLDER}}` values with actual values
3. Initialize the feature checklist based on the answers

### 9. Scaffold SKILL.md

Start `SKILL.md` with:
- Folder structure (detect from project or set default)
- Styling conventions from the chosen tech stack
- Component pattern template

### 10. Confirm & Start

Present a summary:

```markdown
## Project Setup Complete ✅

**App**: {{APP_NAME}} — {{ELEVATOR_PITCH}}
**Stack**: {{FRAMEWORK}} + {{STYLING}} + {{LANGUAGE}}
**Brand**: {{BRAND_PERSONALITY}} | Colors: 🟦 {{PRIMARY}} 🟩 {{SECONDARY}}
**Locales**: {{LOCALES}}

### Ready to build! Here's what I recommend starting with:
1. Project scaffolding (if needed)
2. Landing page with hero section
3. Navigation (Navbar + Footer)

What would you like to work on first?
```

## Rules
- NEVER start coding before PROJECT_VARS.md is filled
- Ask all REQUIRED questions — don't skip any
- If user gives vague answers, follow up for specifics
- Batch related questions to minimize back-and-forth
- Be conversational, not robotic — this sets the tone for the whole project
- After filling vars, ALWAYS read the project folder to detect existing code before suggesting scaffolding
