---
description: Auto-update SKILL.md by scanning the codebase for patterns and conventions
---

# Learn Codebase Workflow

// turbo-all

## When to Use

Run this to scan the current codebase and auto-populate or update `SKILL.md`. Useful after:
- Initial project setup
- Major refactors
- When SKILL.md feels outdated
- Periodically to catch new patterns

## Steps

### 1. Scan Project Structure

```bash
find src -type f -name "*.tsx" -o -name "*.ts" | head -50
```

Update the folder structure section in `SKILL.md` with the actual current state.

### 2. Analyze Component Patterns

Read 3-5 existing components to identify:
- Import style (absolute paths? aliases?)
- Component declaration style (default export? named?)
- Props pattern (interface? type? inline?)
- Hooks usage (custom hooks? which state management?)
- Styling approach (className pattern? CSS modules?)
- i18n integration (which hook? which library?)

Document the established pattern in `SKILL.md` → "Component Pattern" section.

### 3. Analyze Data Patterns

Read files in `src/data/` to identify:
- Data structure conventions (interfaces, types)
- Helper function patterns (getById, getBySlug, etc.)
- Multilingual data handling
- Export patterns

Document in `SKILL.md` → "Data Pattern" section.

### 4. Analyze Styling Conventions

Scan components for:
- Common class patterns (container widths, padding, etc.)
- Color usage (theme colors vs custom)
- Typography patterns (heading styles, body text)
- Responsive breakpoints used

Document in `SKILL.md` → "Styling Conventions" section.

### 5. Analyze Routing & Navigation

Check:
- Page file structure
- Link component usage
- Route patterns (dynamic routes, groups, etc.)
- Layout structure

Document in `SKILL.md` → "Navigation / Routing" section.

### 6. Check for Gotchas

Review:
- Any TODO/FIXME/HACK comments in code
- ESLint/TypeScript warnings
- Known issues from git log
- Environment-specific behavior

Add to `SKILL.md` → "Common Gotchas" section.

### 7. Update Changelog

Add entry to `SKILL.md` changelog:

```markdown
| [today's date] | Scanned codebase and updated patterns | /learn-codebase |
```

## Rules
- DO NOT modify any source code — this is a READ-ONLY scan
- Always MERGE new findings with existing SKILL.md content — don't overwrite
- Be specific in pattern documentation — include actual code examples from the codebase
- If patterns conflict (inconsistent code), note the inconsistency and recommend the better pattern
