---
description: Workflow for diagnosing and fixing bugs
---

# Fix Bug Workflow

// turbo-all

## Context
Read `AGENTS.md` at the project root before doing anything. This gives you the full project context.

## Steps

### 1. Understand the Bug
- Ask clarifying questions if the bug description is vague
- Identify: What is the expected behavior? What is the actual behavior?
- Determine which screen/component/page is affected

### 2. Reproduce & Locate
- Find the relevant files based on the folder structure in `AGENTS.md`
- Read the affected file(s) carefully to understand the current logic
- Check for related files that might be contributing to the bug (imports, shared hooks, data files)
- Check `SKILL.md` → "Common Gotchas" for known issues

### 3. Root Cause Analysis
- Identify the exact root cause before making changes
- Explain the root cause clearly in a brief summary
- If there are multiple potential causes, list them and explain which is most likely and why

### 4. Create Implementation Plan
- Write a concise plan of what files need to change and why
- Present the plan to the user for approval before making changes
- Keep changes minimal — fix the bug, don't refactor unrelated code

### 5. Implement Fix
- Make the minimal change needed to fix the bug
- Follow project conventions from `AGENTS.md` and `SKILL.md`
- TypeScript strict typing (no `any`)
- If the fix touches data files, only modify files in `src/data/`

### 6. Verify
- Run build command to verify no build/type errors
- Check that the bug is resolved
- Verify no visual regressions on mobile viewport
- If the fix touches multiple pages, check all affected pages

### 7. Update SKILL.md
If this bug revealed a gotcha or pattern issue, add it to `SKILL.md` → "Common Gotchas" section.

## Rules
- NEVER introduce new dependencies without asking the user first
- NEVER refactor code outside the scope of the bug
- ALWAYS explain what was wrong and how you fixed it
- If the bug is in static data (`src/data/`), fix the data — don't add workarounds in components
- If the same type of bug has happened before, check if there's a systemic issue
