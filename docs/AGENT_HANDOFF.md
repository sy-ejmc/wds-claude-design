# WDS — Agent Handoff (Phase 2)

**Last updated:** 2026-04-23 (commit `e7ece3e`)
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

## 1. Completed components (as of commit `e7ece3e`)

### Primitives — WDS-invented, not in Figma
| Component | File | Notes |
|---|---|---|
| `Stack` | `packages/ui/src/Stack.tsx` | flex wrapper with token-aware gap |
| `Heading` | `packages/ui/src/Heading.tsx` | h1–h6, level→size map (5xl → lg) |
| `Text` | `packages/ui/src/Text.tsx` | `as="p"/"span"/"div"`, size/weight/color |

### Buttons — all 8 Figma button nodes done
| Component | Figma node | File | Appearance summary |
|---|---|---|---|
| `BlockButton` | `5015:28584` | `BlockButton.tsx` | full-width CTA; L(56)/M(48) × primary/secondary/neutral × default/outline/disabled |
| `SocialButton` | `5015:28836` | `SocialButton.tsx` | brand-stamped auth (Google/Apple/Kakao/Naver); icon as prop |
| `ButtonFixed` | `5015:29032` | `ButtonFixed.tsx` | screen-bottom slot with white top-gradient fade |
| `TextButton` | `5015:29032 (inner)` | `TextButton.tsx` | underlined inline minor action |
| `FloatingActionButton` | `5015:29164` | `FloatingActionButton.tsx` | circular icon-only, L(56)/S(40) × primary/secondary/tertiary |
| `InlineButton` | `5014:27362` | `InlineButton.tsx` | compact in-content; flattened 9-state appearance enum |
| `IconButton` | `7021:2044` | `IconButton.tsx` | icon-only, L(56)/M(36)/S(32) × primary/secondary/tertiary × default/disabled |
| `SegmentedControl` | `20820:2068` | `SegmentedControl.tsx` | single-choice cell, L/M/S × default/active/inactive, optional radio |
| `InfoButton` / `CtaButton` / `GnbButton` | `20995:786` | `InfoButton.tsx` / `CtaButton.tsx` / `GnbButton.tsx` | three product-specific buttons (purple confirm / brand gradient CTA / pill nav) |

### Forms — all 5 Figma form nodes done
| Component | Figma node | File | Notes |
|---|---|---|---|
| `Input` | `5015:33512` + `10164:15189` | `Input.tsx` | line input (bottom border); label above md/SB, helper below xs/M/16px |
| `TextField` | `5015:33570` | `TextField.tsx` | boxed input with leading/trailing slots, timer, char counter, validation |
| `Textarea` | `7317:45573` | `Textarea.tsx` | 128px box; char counter at absolute bottom-right, tints red on overflow |
| `SelectMenu` | `5015:33627` | `SelectMenu.tsx` | custom ARIA combobox; full keyboard (arrows / Home / End / Enter / Escape); click-outside close |

### Lists / Surfaces — all 4 Figma list nodes + supporting atoms
| Component | Figma node | File | Notes |
|---|---|---|---|
| `MenuList` | `5015:33424` | `MenuList.tsx` | discriminated-variant row (default / switch / radio / head / text) |
| `Switch` | `3001:19614` | `Switch.tsx` | iOS-style 40×24 toggle; branded green track when on |
| `Separator` | `3001:19884` | `Separator.tsx` | line (1px) or space (8px) divider |
| `SectionHeader` | `5015:33255` | `SectionHeader.tsx` | page section title + optional action text / chevron / trailing slot |
| `NotificationList` | `5015:33367` | `NotificationList.tsx` | unread / read / text / highlight variants; leading icon + title/subtext + trailingTime + category\|time meta |
| `Badge` | `3001:20108` | `Badge.tsx` | neutral / primary / success / warning / error tones. **NOTE**: Figma publishes a much larger variant matrix (Fill/Ghost/Neutral × S/M/L × 7 states × Square/Default) — current impl is a subset; expand during the Feedback batch. |
| `Accordion` | `5015:34536` | `Accordion.tsx` | controlled or uncontrolled disclosure; `line` / `wrapper` variants, optional Badge next to title |

### Pre-MCP holdouts (not yet rewritten from Figma)
| Component | File | Notes |
|---|---|---|
| `Card` | `Card.tsx` | pre-MCP; basic flat surface, `tinted` variant. Figma publishes `Card Layouts` as a full catalogue (`3001:19150`, 4 variants). **Rewrite during the Cards batch.** |
| `ScaleSwitcher` | `ScaleSwitcher.tsx` | DS-C3 control; full WAI-ARIA Tabs pattern. Not a Figma-published component. Leave as-is. |

**Total shipped as of `e7ece3e`:** 22 Figma-catalogued components + 3 primitives + 1 a11y control + `Card` (pre-MCP).

---

## 2. Remaining components (7 category frames, ~25 sub-nodes)

The full design system has far more components than the initial `figma-refs.md` subset. The user has now pointed us at 7 additional category frames. Enumerated 2026-04-23 via `get_metadata`; one category (`popup`) failed with a session-expired MCP error and still needs enumeration.

### Batch plan (ordered by user-visible priority)

#### 1. Navigation batch — `5014:27496`
| id | Name | Figma node | Variants |
|---|---|---|---|
| N1 | `Navigation Bar` | `3001:19633` | 8 variants — Back-Text-Confirm / Back-Text-Actions / Text-Tab / Text-Actions × Title Default/Large × Style Default/Transparent |
| N2 | `Search Bars` | `3001:19687` | Default / Back / Cancel × Default / Filled |
| N3 | `Tab Bars` | `3001:19725` | Type 01–05 (bottom tab bar variants) + `Tab-item` (Default / Active) |

#### 2. Cards + Filters batch — `5013:27199`, `5013:27196`
| id | Name | Figma node | Variants |
|---|---|---|---|
| C1 | `Card Layouts` | `3001:19150` | Type 1단 / 2단 / 3단 / 슬라이드형. **Rewrite existing `Card.tsx` here.** |
| T1 | `Tabs` | `3001:20034` | Grid Default / Space-between / Flexible / No-line |
| T2 | `Tab-item` (filter cells) | `3001:20023` | States Default / Active × Color Light / Primary (top-tab cells) |
| T3 | `Chips` | `7317:47247` | Layout Default / Neutral / Wrap |
| T4 | `Chip-item` | `3001:20067` | State active / active_neutral / selected / default / disabled |
| T5 | `Checkboxes & Radio Buttons` | `3001:19447` | Check(On/Off) + Radio(On/Off) + Radio_score(On/Off). Radio partial already inside `SegmentedControl`/`MenuList`; extract into a first-class `Checkbox` + `Radio` here. |
| T6 | `GridSettings` | `5018:38664` | List / Grid segmented control |
| T7 | `Alignment Tool` | `3001:20087` | States Default / Checked |

#### 3. Feedback batch — `5014:27498`
| id | Name | Figma node | Variants |
|---|---|---|---|
| FB1 | `Loading-circle` | `3001:20289` | Property 1/2/3 × Size M (48px) / S (20px) — 3 animation phases |
| FB2 | `Empty-message` | `21474:3298` | Default / 점검시간 message layouts |
| FB3 | `Empty-graphic` | `3003:17078` | 16 illustration variants (Cloud, ConnectionError, NoPicture, survey, end, ...). Ship as an asset-only component that accepts `variant` and renders inline SVG or `<img>`. |
| FB4 | `linear-progress-indicator` | `3001:20203` | Line (25/50/75/100%) + Circle (25/50/75/100%) |
| FB5 | `Badge` expansion | `3001:20108` | **Replace current simple Badge with full matrix:** Style Fill/Ghost/Neutral × Size S/M/L × State Default/Color/White/info/Warning/Error/Attribute/Done × Square Default/Square. This supersedes the minimal Badge shipped in the L4 batch. |
| FB6 | `Tooltip` | `7238:79859` | Tail Up / Left / Right / Down. Phase 2 DIY — no Radix; use simple absolute positioning with `aria-describedby`. |

#### 4. Media batch — `5015:34218`
| id | Name | Figma node | Variants |
|---|---|---|---|
| M1 | `Avatar` | `3001:20249` | Size XL(120)/L(96)/M(64)/S(48)/XS(36)/XS(28)/XXS(24) × Round (square-ish w/ big radius) / Circle × Image / Name (2-letter monogram fallback) |
| M2 | `Avatar-Badge` | `7002:6143` | Icon / Color dot Online / Color dot Offline × Size L/M/S. Renders on top of an Avatar via absolute positioning — expose as a separate atom so it can be composed. |
| M3 | `Image` | `3001:20264` | radius None/Small/Medium/Medium-Top/50% × img / img-placeholder. Thin wrapper around `<img>` with aspect-ratio + radius props. |
| M4 | `Map Markers` | `3001:20187` | StartMarker / GeoPoint / NumberedPin / CurrentLocation / LocationInfo / Location. These are SVG-heavy; may live in `packages/ui` only as typed wrappers with the inline SVG shipped as a const. |

#### 5. Banner + Popup batch — `5015:34713`, `11331:9987`
| id | Name | Figma node | Variants |
|---|---|---|---|
| BN1 | `carousel-indicator` | `7022:29271` | Type Bar / Circle / activeLine × Theme Color / Dark / Light, plus Numeric Indicator |
| BN2 | Banner Ads | `7232:23009` | Frame appears to be an empty container at the catalogue level — verify before implementing. May be a host-app composition rather than a published DS component. |
| P?? | Popup (TBD) | `11331:9987` | **Not yet enumerated — MCP `get_metadata` failed twice with session-expired.** Retry first thing in the next session. From other batches we saw popup-specific sub-components referenced (`Label` inside Filters category — `12463:14344` — appears to belong here). |

### Category URLs (for copy-paste into `get_design_context`)

| Category | Top-level node | URL |
|---|---|---|
| Cards | `5013:27199` | https://www.figma.com/design/7FIuz015lUzocnw6oSHSoM/WDS_%EC%9A%B0%EB%A6%AC%EA%B0%80-%EB%94%94%EC%9E%90%EC%9D%B8%EC%8B%9C%EC%8A%A4%ED%85%9C?node-id=5013-27199&m=dev |
| Filters/Checkbox/Chip/Tab | `5013:27196` | https://www.figma.com/design/7FIuz015lUzocnw6oSHSoM/WDS_%EC%9A%B0%EB%A6%AC%EA%B0%80-%EB%94%94%EC%9E%90%EC%9D%B8%EC%8B%9C%EC%8A%A4%ED%85%9C?node-id=5013-27196&m=dev |
| Navigation | `5014:27496` | https://www.figma.com/design/7FIuz015lUzocnw6oSHSoM/WDS_%EC%9A%B0%EB%A6%AC%EA%B0%80-%EB%94%94%EC%9E%90%EC%9D%B8%EC%8B%9C%EC%8A%A4%ED%85%9C?node-id=5014-27496&m=dev |
| Feedback | `5014:27498` | https://www.figma.com/design/7FIuz015lUzocnw6oSHSoM/WDS_%EC%9A%B0%EB%A6%AC%EA%B0%80-%EB%94%94%EC%9E%90%EC%9D%B8%EC%8B%9C%EC%8A%A4%ED%85%9C?node-id=5014-27498&m=dev |
| Media | `5015:34218` | https://www.figma.com/design/7FIuz015lUzocnw6oSHSoM/WDS_%EC%9A%B0%EB%A6%AC%EA%B0%80-%EB%94%94%EC%9E%90%EC%9D%B8%EC%8B%9C%EC%8A%A4%ED%85%9C?node-id=5015-34218&m=dev |
| Banner | `5015:34713` | https://www.figma.com/design/7FIuz015lUzocnw6oSHSoM/WDS_%EC%9A%B0%EB%A6%AC%EA%B0%80-%EB%94%94%EC%9E%90%EC%9D%B8%EC%8B%9C%EC%8A%A4%ED%85%9C?node-id=5015-34713&m=dev |
| Popup | `11331:9987` | https://www.figma.com/design/7FIuz015lUzocnw6oSHSoM/WDS_%EC%9A%B0%EB%A6%AC%EA%B0%80-%EB%94%94%EC%9E%90%EC%9D%B8%EC%8B%9C%EC%8A%A4%ED%85%9C?node-id=11331-9987&m=dev |

**Explicitly OUT of Phase 2:** `system OS` (`3001:19025`) — StatusBar / HomeIndicator / CellularConnection etc. are Figma mock aids, not app-consumer components. Skip unless user overrides.

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
2. Read this file (especially §1 for what's shipped and §2 for the batch plan).
3. Confirm MCP access: call
   mcp__claude_ai_Figma__get_design_context({
     fileKey: "7FIuz015lUzocnw6oSHSoM",
     nodeId:  "3001:19633",
     clientFrameworks: "react,nextjs",
     clientLanguages:  "typescript",
   })
   — this fetches `Navigation Bar` (N1) and proves the MCP is reachable.
4. If Popup was still un-enumerated when you opened the file, retry
   `get_metadata` for `11331:9987` first and fold the result into §2 Batch 5.
5. Work through the batches in the §2 order:
     Batch 1 (Navigation)  — N1 N2 N3
     Batch 2 (Cards/Filters) — C1 T1 T2 T3 T4 T5 T6 T7
     Batch 3 (Feedback)    — FB1 FB2 FB3 FB4 FB5 FB6
     Batch 4 (Media)       — M1 M2 M3 M4
     Batch 5 (Banner/Popup) — BN1 BN2 P??
6. Per-component: fetch via MCP → implement → `npx tsc --noEmit` for
   `packages/ui` and `apps/playground` → update `packages/ui/src/index.ts`.
7. Commit per-batch (3–8 components per commit). Ask for explicit user OK
   on the **first** commit of each new session, then subsequent batch
   commits within the same session are fine.
```

Good luck.
