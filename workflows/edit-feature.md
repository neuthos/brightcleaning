---
description: Workflow for editing or modifying existing features
---

# Edit Feature Workflow

// turbo-all

## Context
Read `AGENTS.md` at the project root before doing anything. This gives you the full project context.

## Steps

### 1. Understand the Change
- Ask clarifying questions if the edit request is vague
- Identify: What exactly needs to change? What should the result look like?
- Determine scope: Is this a visual change? Logic change? Data change? Or all of the above?

### 2. Analyze Current Implementation
- Read the affected file(s) thoroughly
- Understand the current data flow: data source → component props → rendered UI
- Map out which files depend on the component/page being edited
- Note any shared components or hooks that might be affected by the change

### 3. Create Edit Plan
Write a concise plan:

```markdown
## Edit: [Feature Name] — [Brief Description of Change]

### Affected Files
- List files that will be modified

### Changes Summary
- For each file, describe what specifically changes

### Impact Check
- List other files/components that depend on the changed files
- Confirm they won't break
```

Present the plan to the user for approval if the change is significant (more than 1-2 files).
For small changes (styling tweaks, text changes), proceed directly.

### 4. Implement Changes
- Make targeted changes — don't restructure or refactor beyond the scope
- Follow existing code patterns in the file
- Maintain mobile-first responsive approach
- If updating data shapes in `src/data/`, update corresponding types
- If the edit affects shared components, verify all usages still work
- If the edit changes user-facing text, update ALL i18n locale files

### 5. Verify
- Run build command to ensure no type/build errors
- Check the edited feature in browser (mobile + desktop viewports)
- Spot-check pages that use shared components you modified
- Ensure visual consistency with the rest of the app

### 6. Update SKILL.md
If the edit established a new pattern or revealed a gotcha, add it to `SKILL.md`.

## Rules
- ALWAYS understand the full scope of impact before making changes
- NEVER change data shapes without updating corresponding TypeScript types
- Keep changes surgical — edit what's asked, don't refactor the world
- For small changes (1 file, styling only), skip the formal plan and just implement
- For larger changes (multiple files, logic changes), always present a plan first
- If an edit reveals a deeper issue, flag it and ask the user whether to address it now or later
