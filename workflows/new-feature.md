---
description: Workflow for implementing new features
---

# New Feature Workflow

// turbo-all

## Context

Read `AGENTS.md` at the project root before doing anything. This gives you the full project context.

**IMPORTANT**: Also read `.agents/skills/SKILL.md` — this contains all established coding patterns. You MUST follow these patterns to maintain consistency.

## Steps

### 1. Understand Requirements

- Ask clarifying questions until the feature scope is 100% clear
- Identify: What user problem does this solve? What screens/pages are involved?
- Determine if this feature needs new data in `src/data/`, new API routes, or new components
- Reference `PROJECT_VARS.md` for brand voice, colors, and tech stack

### 2. Research & Plan

- Check existing code for similar patterns to follow
- Check `src/components/` for reusable components that can be leveraged
- Check `src/data/` to understand existing data shapes
- Check if your UI framework has built-in components that fit

### 3. Create Implementation Plan

Write a detailed plan following this structure:

```markdown
## Feature: [Name]

### Overview
Brief description of what the feature does and why.

### New Files
- List of new files to create with their purpose

### Modified Files
- List of existing files to modify and what changes

### Data Changes
- Any new data constants needed in `src/data/`
- Any new TypeScript types

### UI/UX
- Mobile-first layout description
- Key interactions and animations

### Implementation Order
1. Types & data first
2. Components second
3. Page integration third
4. i18n translations (if applicable)
5. Polish last
```

Present the plan to the user for approval before implementing.

### 4. Implement — Types & Data

- Define TypeScript interfaces/types
- Add any new static data in `src/data/` following existing patterns
- Export from barrel files

### 5. Implement — Components

- Build components following patterns in `SKILL.md`
- Follow mobile-first approach
- Every component must have TypeScript props interface
- Keep components focused — single responsibility principle

### 6. Implement — Page Integration

- Create or update page files
- Wire up components, data, and any new hooks
- Add i18n translations to ALL locale files if applicable

### 7. Polish & Verify

- Run build command to verify no type/build errors
- Check mobile viewport
- Check desktop viewport
- Verify smooth transitions and micro-animations

### 8. Update SKILL.md

After implementing, update `SKILL.md` with any new patterns or conventions established.

## Rules

- ALWAYS build mobile-first — never desktop-first
- NEVER put data constants outside `src/data/`
- ALWAYS use TypeScript interfaces for component props and data shapes
- NEVER skip the planning step — always present plan before implementing
- Follow the linear approach: finish one feature completely before moving to the next
- If a feature requires a new npm package, ask the user first
- After completing a feature, update `SKILL.md` with new patterns discovered
