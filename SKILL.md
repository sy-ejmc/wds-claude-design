---
name: wds-design
description: Use this skill to generate well-branded interfaces and assets for WDS (우리가 Design System) — a Korean elderly-focused service — either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.

Key files:
- `README.md` — brand context, content fundamentals, visual foundations, iconography
- `colors_and_type.css` — all CSS vars + 3-tier typography scale + semantic elements
- `packages/tokens/src/*` — source-of-truth tokens (primitive.ts, alias.ts, scale.css)
- `packages/ui/src/Button.tsx` — canonical Button (only shipped component)
- `ui_kits/playground/` — hi-fi mobile mock with reusable JSX components
- `preview/` — design-system cards (colors, type, spacing, components)

Critical DS rules to respect:
- **DS-C1** Spacing is **px** (4/8/16/24/32/48). Absolute, predictable.
- **DS-C2** Font-size is **rem**. Never hardcode `html { font-size: 16px }`.
- **DS-C3** 3-tier typography scale (일반 / 크게 / 더 크게) via `<html data-typography-scale="normal|large|x-large">`. Components read `var(--font-size-*)` / `var(--line-height-*)`; never branch on tier.

Brand voice: Korean-first, communal, plain. Use `-기` gerund or `-세요` polite-request forms for CTAs (`시작하기`, `확인`). No emoji in product UI. Typeface: Pretendard.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. Import `colors_and_type.css` for tokens.
If working on production code, import from `@wds/tokens` (alias layer) and `@wds/ui`. Never inline hex codes.
If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.
