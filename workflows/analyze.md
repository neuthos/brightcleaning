---
description: Workflow for analyzing reference HTML/CSS code and creating implementation plans
---

# Analyze Reference Code Workflow

## Context

Read `AGENTS.md` at the project root before doing anything. This gives you the full project context.

## When to Use

User sends raw HTML and/or CSS as reference code from a design, template, or another website. The goal is to analyze that code and produce an implementation plan to recreate/adapt it in our project.

## Steps

### 1. Analyze the Reference Code

Thoroughly read the provided HTML/CSS and extract:

- **Layout structure**: Grid system, flexbox patterns, container widths, spacing
- **Components identified**: Cards, navbars, hero sections, forms, modals, etc.
- **Color palette**: Note colors but adapt to our brand colors from `PROJECT_VARS.md`
- **Typography**: Font families, sizes, weights, line heights
- **Responsive behavior**: Media queries, breakpoints, mobile vs desktop differences
- **Animations/Transitions**: Any CSS animations, hover effects, transitions
- **Images/Assets**: What images/icons are used and where
- **Interactive elements**: Buttons, dropdowns, forms, toggles

### 2. Map to Our Tech Stack

For each identified element, determine the translation based on `PROJECT_VARS.md`:

| Reference          | Our Implementation                                |
| ------------------ | ------------------------------------------------- |
| Raw HTML           | Framework-specific component                      |
| CSS classes        | Our styling approach (Tailwind, CSS modules, etc) |
| Custom CSS colors  | Brand colors from PROJECT_VARS                    |
| CSS Grid/Flexbox   | Framework utility classes                         |
| Media queries      | Responsive breakpoints                            |
| CSS animations     | Animation utilities or custom CSS                 |

### 3. Produce Implementation Plan

Create a structured plan:

```markdown
# Analysis: [Description of what was analyzed]

## Visual Summary
Brief description of what the reference looks like.

## Component Breakdown

### [Component 1 Name]
- **Location**: `src/components/[category]/[ComponentName].tsx`
- **Key styling**: List the main classes/styles needed
- **Props interface**: TypeScript interface
- **Mobile behavior**: How it looks on mobile
- **Desktop behavior**: How it differs on desktop

## Data Requirements
- Any new data constants needed
- Any new types needed

## Page Integration
- Which page(s) will use these components
- Layout and ordering

## Implementation Order
1. First: ...
2. Then: ...
3. Finally: ...

## Notes
- Deviations from the reference and why
- Mobile adaptations
```

### 4. Present for Review

- Present the implementation plan to the user
- Wait for approval or adjustments before proceeding
- If user approves, switch to `/new-feature` or `/edit-feature` workflow to implement

## Rules
- NEVER just copy-paste raw HTML — always convert to framework components
- NEVER use inline styles — always use the project's styling approach
- ALWAYS analyze mobile-first
- ALWAYS check if UI framework components can be reused before custom solutions
- ALWAYS extract reusable components — don't create monolithic pages
- ALWAYS adapt colors to brand palette from PROJECT_VARS.md
- Flag any accessibility issues in the reference and propose fixes
