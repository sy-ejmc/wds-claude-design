# WDS — Agent Handoff (Phase 2)

**Last updated:** 2026-04-23 (commit `fd2cac1`)
**Audience:** a fresh AI agent picking up Phase 2 component implementation.
**Read this top-to-bottom once, then skim before each work session.**

---

## 0. 30-second resume

- **Project:** WDS — 우리가 Design System. Target = Korean elderly-focused service.
- **Repo:** https://github.com/sy-ejmc/wds-claude-design (local at `/Users/kimsuyeon/ejmc/wds-claude-design`).
- **Phase:** 2 — component coverage expansion. Phase 1 MVP is closed (user explicitly scoped V4 Screen + dev-server deploy OUT).
- **Method:** implement Figma components one node at a time via the `claude_ai_Figma` MCP. **Do not port Claude Design's JSX catalogue;** read Figma source directly.
- **Blocker:** Claude Design session limit won't reset until next week. The user and this agent work alone until then.

**Before you resume any work, read:**
1. This file (`docs/AGENT_HANDOFF.md`).
2. `README.md` (root).
3. `packages/ui/src/BlockButton.tsx` — reference implementation for the MCP→TS translation pattern.

---

## 1. Completed components (as of commit `fd2cac1`)

### Primitives — WDS-invented, not in Figma
| Component | File | Notes |
|---|---|---|
| `Stack` | `packages/ui/src/Stack.tsx` | flex wrapper with token-aware gap |
| `Heading` | `packages/ui/src/Heading.tsx` | h1–h6, level→size map (5xl → lg) |
| `Text` | `packages/ui/src/Text.tsx` | `as="p"/"span"/"div"`, size/weight/color |

### Buttons — 5 of 8 Figma component nodes done
| Component | Figma node | File | Appearance summary |
|---|---|---|---|
| `BlockButton` | `5015:28584` | `BlockButton.tsx` | full-width CTA; L(56)/M(48) × primary/secondary/neutral × default/outline/disabled |
| `SocialButton` | `5015:28836` | `SocialButton.tsx` | brand-stamped auth (Google/Apple/Kakao/Naver); icon as prop |
| `ButtonFixed` | `5015:29032` | `ButtonFixed.tsx` | screen-bottom slot with white top-gradient fade |
| `TextButton` | `5015:29032 (inner)` | `TextButton.tsx` | underlined inline minor action |
| `FloatingActionButton` | `5015:29164` | `FloatingActionButton.tsx` | circular icon-only, L(56)/S(40) × primary/secondary/tertiary |
| `InlineButton` | `5014:27362` | `InlineButton.tsx` | compact in-content; flattened 9-state appearance enum |

### Forms / Input-ish — written earlier (pre-MCP)
| Component | File | Notes |
|---|---|---|
| `Input` | `Input.tsx` | pre-MCP; **may need Figma-accurate rewrite** when the Forms catalogue starts |
| `Card` | `Card.tsx` | pre-MCP; basic flat surface, `tinted` variant |
| `ScaleSwitcher` | `ScaleSwitcher.tsx` | DS-C3 control; full WAI-ARIA Tabs pattern (←/→, Home/End, roving tabindex) |

**Total:** 12 components shipped + 3 primitives + 1 a11y a11y-specific control.

---

## 2. Remaining components (11 nodes in 3 groups)

Source file: `/Users/kimsuyeon/.omc/research/figma-refs.md` (full catalogue + status table).

### Button (3 remaining)

| id | node | URL |
|---|---|---|
| B6 | `7021:2044` | https://www.figma.com/design/7FIuz015lUzocnw6oSHSoM/WDS_%EC%9A%B0%EB%A6%AC%EA%B0%80-%EB%94%94%EC%9E%90%EC%9D%B8%EC%8B%9C%EC%8A%A4%ED%85%9C?node-id=7021-2044&m=dev |
| B7 | `20820:2068` | https://www.figma.com/design/7FIuz015lUzocnw6oSHSoM/WDS_%EC%9A%B0%EB%A6%AC%EA%B0%80-%EB%94%94%EC%9E%90%EC%9D%B8%EC%8B%9C%EC%8A%A4%ED%85%9C?node-id=20820-2068&m=dev |
| B8 | `20995:786` | https://www.figma.com/design/7FIuz015lUzocnw6oSHSoM/WDS_%EC%9A%B0%EB%A6%AC%EA%B0%80-%EB%94%94%EC%9E%90%EC%9D%B8%EC%8B%9C%EC%8A%A4%ED%85%9C?node-id=20995-786&m=dev |

### Forms (5)

| id | node |
|---|---|
| F1 | `5015:33512` |
| F2 | `5015:33570` |
| F3 | `10164:15189` |
| F4 | `7317:45573` |
| F5 | `5015:33627` |

### Lists (4)

| id | node |
|---|---|
| L1 | `5015:33424` |
| L2 | `5015:33255` |
| L3 | `5015:33367` |
| L4 | `5015:34536` |

---

## 3. Figma MCP workflow

```
mcp__claude_ai_Figma__get_design_context({
  fileKey: "7FIuz015lUzocnw6oSHSoM",
  nodeId:  "<the node id, e.g. 7021:2044>",
  clientFrameworks: "react,nextjs",
  clientLanguages:  "typescript",
})
```

**Confirmed behavior (2026-04-22):** the tool works from URL parameters alone. The user does **not** need to have the node selected in the Figma desktop app. (`get_variable_defs` does need selection; don't confuse the two.)

The response contains:
1. Generated React+Tailwind code for reference (**ignore the Tailwind and the `data-node-id` attributes when writing your TSX**).
2. A screenshot. Look at this before coding so you render visually, not lexically.
3. A "These styles are contained in the design" block with concrete type / color / shadow tokens.
4. A "Component descriptions" block with the designer's intent in Korean — use this for JSDoc copy.

---

## 4. DS rules — never violate

| # | Rule | Why |
|---|------|-----|
| **DS-C1** | Spacing / padding / margin / radius in **px** | Elderly UI needs absolute, predictable layout |
| **DS-C2** | Font-size / line-height in **rem** | Required for DS-C3 tier switching |
| **DS-C3** | Three typography tiers: 일반 보기 / 크게 보기 / 더 크게 보기 | Core accessibility feature |
| **DS-C3a** | Never hardcode `html { font-size: 16px }` | Overrides user's own system font preference — anti-pattern |
| **DS-C4** | Prefer `minHeight` over `height` on controls with text | At 크게/더크게 tier or a raised system font, fixed heights clip the glyph |

---

## 5. Implementation conventions

### Styling
- **No Tailwind.** Inline styles fed from `@wds/tokens`.
- **No Radix.** No shadcn/ui. No Headless UI. Phase 2 is DIY.
  - Rationale: the user avoided Radix due to known bugs. shadcn/Tailwind don't fit our token-first approach.
  - Exception may come in Phase 3+ when Dialog/Select/Combobox need heavy a11y work; evaluate React Aria Components or Headless UI then.
- **a11y pseudo-states in `packages/ui/src/ui.css`.** Every interactive component:
  - sets `className="wds-block-button"` (the shared class — yes, also on non-"block" buttons)
  - sets a `--wds-focus-ring` inline CSS custom property for the halo tint

### Token usage
```ts
import { color, padding, margin, radius, height, shadow, typography } from "@wds/tokens";
```
- Colors follow Figma groups verbatim: `color.primary.normal`, `color.background["bg-white"]`, `color.label.neutral`, `color.line.normal`, etc.
- Whenever Figma references a primitive with **no V2 alias** (most commonly `gray-100`, `gray-200`, `gray-500`, `gray-900`, `green-600`, `blue-50`, `blue-600`, `red-50`), inline the hex with a comment like `// gray-500 — no V2 alias`. Do **not** expose `primitive` from the tokens index.
- `typography.weight.B/SB/M/R/L` = 700/600/500/400/300. Mirror Figma's `Font-Weight-B/SB/M/R/L` naming.

### Typical component file
```tsx
import type { CSSProperties, ReactNode, ButtonHTMLAttributes } from "react";
import { color, radius, typography } from "@wds/tokens";

/**
 * WDS XxxButton — <one-line intent>.
 *
 * Figma: <component name> (node `NNNN:MMMM`)
 * "<Korean description from Figma>"
 */

export interface XxxButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "disabled"> {
  // ... props
}

export function XxxButton({ ...props }: XxxButtonProps) {
  // resolve chrome
  // build style object with inline CSS custom prop --wds-focus-ring
  return (
    <button
      type="button"
      className={["wds-block-button", className].filter(Boolean).join(" ")}
      style={style}
      {...rest}
    >
      {children}
    </button>
  );
}
```

### Icons
- `@wds/ui` ships **no icons**. Every component that needs an icon accepts `icon: ReactNode` (or `leadingIcon` / `trailingIcon`).
- Consumers (currently `apps/playground`) can install `lucide-react` or any other library.

---

## 6. Ops cheatsheet

```bash
# always from repo root
cd /Users/kimsuyeon/ejmc/wds-claude-design

# type-check everything before every commit
(cd packages/tokens && npx tsc --noEmit) \
  && (cd packages/ui && npx tsc --noEmit) \
  && (cd apps/playground && npx tsc --noEmit)

# dev server
cd apps/playground && pnpm dev
```

### Commit conventions
- **Style:** Conventional Commits. `feat(ui)`, `feat(tokens)`, `fix(ui)`, `chore`, `docs`.
- **Footer:** `Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>`.
- **Batching:** 3–5 related components per commit. Do not commit per-component.
- **Flow:** `git add -A` → commit → `git push origin main`.

### User policy (from saved memory)
- **Never push/commit without explicit user OK** for the first commit of a session. (Later batching within the same session, where the intent was already confirmed, is fine.)
- Keep the working tree on `main`; no long-lived branches right now.

---

## 7. Known loose ends

| Item | Status | Action |
|---|---|---|
| V4 Screen (breakpoints 3종) | intentionally skipped | MVP is single desktop breakpoint. Don't add. |
| Legacy `Button.tsx` | exists, re-exports BlockButton | Can delete next housekeeping pass. |
| Font triplication — `fonts/`, `packages/assets/fonts/`, `preview/assets/fonts/` | ~40MB redundant | Kept because Claude Design generated it; clean up during Phase 3. |
| Figma-side typos | known | Pass to designer: `primary-nomal` → `primary-normal`, remove whitespace in `fill- strong` and `Alpha-colors- neutralA-*`. Code side is already normalized. |
| Inlined hex (gray-100, gray-500, gray-200, gray-900, green-600, blue-50, blue-600, red-50) | flagged in code comments | Opportunity to extend the V2 alias layer with `color.neutral.soft/bold`, `color.status.info/warning`, etc. |
| `Input.tsx` pre-MCP | written before Figma MCP rewrite-to-source pattern | When starting the Forms catalogue, Figma-align `Input.tsx` via MCP first, then tackle new ones. |
| npm package publish | not done | Decide Phase 3 whether to publish `@wds/tokens` and `@wds/ui` to a registry so real apps can consume. |

---

## 8. Reference artifacts

Outside the repo — consult when in doubt:

- **`/Users/kimsuyeon/.omc/specs/deep-interview-ds-to-claude-design.md`** — the original spec (Phase 0).
- **`/Users/kimsuyeon/.omc/plans/ds-to-claude-design.md`** — the phased implementation plan (read its current-state section).
- **`/Users/kimsuyeon/.omc/research/figma-refs.md`** — full Figma catalogue.
- **`/Users/kimsuyeon/.omc/research/claude-design-api-notes.md`** — what we learned about Claude Design during the Phase 0-pre spike.

Inside the repo:
- `README.md` — brand guide + DS principles.
- `packages/ui/README.md` — consumption pattern for apps.
- `packages/tokens/src/primitive.ts` — canonical V1 palette.
- `packages/tokens/src/alias.ts` — canonical V2/V3/V4/V5 aliases.
- `packages/tokens/src/scale.css` — DS-C3 tier switching.
- `packages/ui/src/ui.css` — shared focus-visible / active / disabled rules.
- `apps/playground/app/page.tsx` — a live demo wiring it all together.

---

## 9. First action on resume

```
1. Verify the repo is clean: `git status`.
2. Read this file.
3. Confirm MCP access: call
   mcp__claude_ai_Figma__get_design_context({
     fileKey: "7FIuz015lUzocnw6oSHSoM",
     nodeId:  "7021:2044",
     clientFrameworks: "react,nextjs",
     clientLanguages:  "typescript",
   })
   — this fetches B6 and proves the MCP is reachable.
4. Implement B6 following the BlockButton.tsx template.
5. Typecheck, update index.ts, move to B7.
6. Batch-commit after B6–B8 together ("feat(ui): add <names>").
7. Continue with Forms F1–F5, then Lists L1–L4.
```

Good luck.
