# WDS — Agent Handoff (Phase 2 → Phase 3)

**Last updated:** 2026-04-23 (commit `ed1fa77`)
**Audience:** a fresh AI agent picking up work after Phase 2 component coverage.
**Read this top-to-bottom once, then skim before each work session.**

---

## 0. 30-second resume

- **Project:** WDS — 우리가 Design System. Target = Korean elderly-focused service.
- **Repo:** https://github.com/sy-ejmc/wds-claude-design (local at `/Users/kimsuyeon/ejmc/wds-claude-design`).
- **Phase status:** **Phase 2 component catalogue is SHIPPED.** All seven published category frames (Cards / Filters / Navigation / Feedback / Media / Banner / Popup) are implemented. Phase 1 MVP is closed (V4 Screen + dev-server deploy were explicitly scoped OUT).
- **Method:** implement Figma components one node at a time via the `claude_ai_Figma` MCP. **Do not port Claude Design's JSX catalogue;** read Figma source directly.

**Before you resume any work, read:**
1. This file (`docs/AGENT_HANDOFF.md`).
2. `README.md` (root).
3. `packages/ui/src/BlockButton.tsx` — reference implementation for the MCP→TS translation pattern.

---

## 1. Completed components (as of commit `ed1fa77`)

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
| `Accordion` | `5015:34536` | `Accordion.tsx` | controlled or uncontrolled disclosure; `line` / `wrapper` variants, optional Badge next to title |

### Navigation — all 3 Figma navigation nodes
| Component | Figma node | File | Notes |
|---|---|---|---|
| `NavigationBar` | `3001:19633` | `NavigationBar.tsx` | 8-variant Figma matrix collapsed to 4 props (`onBack` / `title` / `large` / `transparent` + free `actions` trailing slot) |
| `SearchBar` | `3001:19687` | `SearchBar.tsx` | Default / Back / Cancel × Default / Filled. `onClear` fires close-big affordance when filled |
| `TabBar` | `3001:19725` | `TabBar.tsx` | bottom nav, consumer controls via `activeKey` + `items[]`. Optional 28px `activeIcon` per tab. Home indicator pill toggle |

### Cards + Filters — all 8 nodes
| Component | Figma node | File | Notes |
|---|---|---|---|
| `CardLayout` | `3001:19150` | `CardLayout.tsx` | image+text card, 4 variants (featured / half / third / slide). Distinct from the generic pre-MCP `Card` surface |
| `Tabs` | `3001:20034` + `3001:20023` | `Tabs.tsx` | in-page tablist, default / space-between / flexible grids. APG keyboard (arrows / Home / End). Tab-item filter cell composed inside |
| `Chip` | `3001:20067` / `7317:47247` | `Chip.tsx` | 5 states (default / active / active_neutral / selected / disabled), optional leading / trailing icon + trailing chevron |
| `Checkbox` | `3001:19447` | `Checkbox.tsx` | multi-select; label color shifts off→on per Figma spec |
| `Radio` | `3001:19447` | `Radio.tsx` | single-select; standard row OR `scoreMode` (label above indicator) for rating scales |
| `GridSettings` | `5018:38664` | `GridSettings.tsx` | list/grid segmented toggle with section title. Icons supplied by consumer |
| `AlignmentTool` | `3001:20087` | `AlignmentTool.tsx` | sort trigger + optional filter toggle; primary.normal tint when `checked` |

### Feedback — all 5 nodes shipped; `Empty-graphic` illustrations intentionally deferred
| Component | Figma node | File | Notes |
|---|---|---|---|
| `Spinner` | `3001:20289` | `Spinner.tsx` | Replaces Figma's 3 static animation frames with a single CSS-animated SVG. M(48) / S(20) sizes. Respects `prefers-reduced-motion` (slows to 2.4s/rev). `@keyframes wds-spin` lives in `ui.css` |
| `EmptyMessage` | `21474:3298` | `EmptyMessage.tsx` | 96px graphic slot + title + description + optional brand-tinted footnote (Figma `점검시간` variant) |
| `Progress` | `3001:20203` | `Progress.tsx` | Supersedes Figma's 4 discrete steps — accepts continuous 0-100; `line` (280×4 fluid) or `circle` (48px ring). Full aria-progressbar |
| `Tooltip` | `7238:79859` | `Tooltip.tsx` | Alpha-80 dark tip bubble with 4-direction tail. Visual-only; positioning is the consumer's job per Phase 2 DIY |
| `Badge` | `3001:20108` | `Badge.tsx` | **Expanded** from the initial 5-tone shortcut to the full Figma matrix: `appearance` (fill / ghost / neutral) × `size` (S/M/L) × `tone` (default/color/white/info/warning/error/attribute/done) × `shape` (pill / square). Legacy tone aliases kept for back-compat |

### Media — all 4 Figma media nodes
| Component | Figma node | File | Notes |
|---|---|---|---|
| `Avatar` | `3001:20249` | `Avatar.tsx` | 7 sizes (XL-120 / L-96 / M-64 / S-48 / XS-36 / XS28 / XXS-24), `round` / `circle` shapes, image `src` or `name` monogram fallback, optional `badge` slot |
| `AvatarBadge` | `7002:6143` | `AvatarBadge.tsx` | `icon` / `online` / `offline` types × L/M/S sizes. Composes on top of Avatar via its `badge` slot |
| `Image` | `3001:20264` | `Image.tsx` | radius (none / small / medium / medium-top / full) × img or placeholder. Accepts number or `{width, height, aspectRatio}` |
| `MapMarker` | `3001:20187` | `MapMarker.tsx` | 6 published types (startMarker / geoPoint / numberedPin / currentLocation / locationInfo / location). Pin silhouettes rendered as inline SVG so tints re-skin cleanly |

### Banner + Popup — all 4 shipped (1 node genuinely empty + scoped out)
| Component | Figma node | File | Notes |
|---|---|---|---|
| `CarouselIndicator` | `7022:29271` (also exposed via `5018:35099`) | `CarouselIndicator.tsx` | bar / circle / activeLine / numeric types × color / dark / light themes. Consumer passes `total` + `active`; the active cell is styled per type (bar: opaque rect; circle: opaque dot; activeLine: expanded pill) |
| `Modal` | `14348:16114` | `Modal.tsx` | centered confirmation dialog. Two patterns collapse to one: `confirm` (title + description + 2-button row) vs `content` (long-form body + single full-width confirm). Scrim + Escape fire `onClose` |
| `BottomSheet` | `15694:14426` / `18029:6837` | `BottomSheet.tsx` | bottom-anchored mobile sheet, rounded-top 20px. Four Figma header variants covered by `title` + `subtitle` + `showClose` props; body is a free slot |
| `Toast` | `21327:981` (mobile) / `22268:5740` (PC) | `Toast.tsx` | alpha-60 pill with warning / info / neutral tones × mobile / desktop sizing. Visual only — positioning + auto-dismiss is the consumer's job |

### Pre-MCP holdouts (not rewritten from Figma)
| Component | File | Notes |
|---|---|---|
| `Card` | `Card.tsx` | pre-MCP; basic flat surface, `tinted` variant. **Kept** as the generic container (playground consumes it). Distinct from `CardLayout`, which is the Figma image+text card. Decision deferred: keep as a non-Figma primitive, or rename to `Surface` to separate roles explicitly. |
| `ScaleSwitcher` | `ScaleSwitcher.tsx` | DS-C3 control; full WAI-ARIA Tabs pattern. Not a Figma-published component. Leave as-is. |

**Total shipped as of `ed1fa77`:** 44 Figma-catalogued components + 3 primitives + 2 non-Figma primitives (`Card`, `ScaleSwitcher`).

---

## 2. Phase 2 status — DONE

All 7 category frames from `figma-refs.md` (cards / filters / navigation / feedback / media / banner / popup) are shipped across 6 commits:

| Batch | Commit | Components added |
|---|---|---|
| Navigation | `f9fda92` | NavigationBar, SearchBar, TabBar |
| Cards + Filters | `e9bb0c1` | CardLayout, Tabs, Chip, Checkbox, Radio, GridSettings, AlignmentTool |
| Feedback | `8c1745d` | Spinner, EmptyMessage, Progress, Tooltip + Badge matrix expansion |
| Media | `afc04f9` | Avatar, AvatarBadge, Image, MapMarker |
| Banner | `89bbca7` | CarouselIndicator |
| Popup | `ed1fa77` | Modal, BottomSheet, Toast |

**Intentionally not shipped:**

| Item | Reason |
|---|---|
| `Empty-graphic` — 16 illustrations (`3003:17078`) | The illustrations are marketing assets, not UI primitives. `EmptyMessage` accepts a `graphic` slot; consumers pass whichever artwork is relevant. Revisit if/when brand ships an official SVG set. |
| Banner Ads (`7232:23009`) | User-confirmed empty frame at the catalogue level — host-app composition, not a published DS component. |
| `system OS` (`3001:19025`) | StatusBar / HomeIndicator / CellularConnection are Figma mock aids, not app-consumer components. User confirmed skip. |

**If a new category frame appears later:** the MCP workflow below still applies. Fetch `get_metadata` on the top-level node to enumerate, then implement each published sub-node in the normal batch pattern.

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
| `Card.tsx` vs `CardLayout.tsx` | both shipped and distinct | `Card` is a generic container, `CardLayout` is the Figma image+text card. Decide Phase 3 whether to rename `Card` → `Surface` for clarity, or leave as-is. |
| Font triplication — `fonts/`, `packages/assets/fonts/`, `preview/assets/fonts/` | ~40MB redundant | Kept because Claude Design generated it; clean up during Phase 3. |
| Figma-side typos | known | Pass to designer: `primary-nomal` → `primary-normal`, remove whitespace in `fill- strong` and `Alpha-colors- neutralA-*`. Code side is already normalized. |
| Inlined hex (gray-100, gray-200, gray-500, gray-900, green-600, blue-50, blue-500, blue-600, red-50, orange-400, orange-50, purple-50, purple-500, purple-600, coolgray-30) | flagged in code comments | Opportunity to extend the V2 alias layer with `color.neutral.soft/bold`, `color.status.info/warning`, `color.accent.purple/blue`, etc. |
| Playground showcase not updated | `apps/playground/app/page.tsx` still demos only Input + BlockButton + Card | Add visual smoke tests for the ~40 newly-shipped components so tier-switching and interactions can be eyeballed in the browser. |
| Focus-trap + portals in Modal / BottomSheet | deliberately DIY | Phase 2 intentionally skipped focus-trap / portal / scroll-lock. When these dialogs hit production pages with interactive content behind them, either add a lightweight focus-trap hook or adopt React Aria Components's `FocusScope` + `OverlayContainer` for just the overlay layer. |
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

Phase 2 catalogue coverage is complete. Default path is **no new Figma work** — check what the user actually asked for, then route:

```
1. Verify the repo is clean: `git status`.
2. Read this file (§1 Completed + §7 Known loose ends).
3. Branch on the user's intent:

   a) "Add component X from Figma" — user pasted a new node URL.
      → Normal MCP workflow: fetch `get_design_context` →
        implement → typecheck both packages → update `index.ts`
        → commit. Confirm first commit of session before pushing.

   b) "Update the showcase" / "demo it in the browser" /
      "verify in Next.js"
      → Edit `apps/playground/app/page.tsx` to add visual smoke
        tests for shipped components. Start the dev server with
        `(cd apps/playground && pnpm dev)`. Exercise DS-C3 tier
        switching (`ScaleSwitcher`) while checking layouts.

   c) "Housekeeping" / "cleanup" — pick from §7.
      Most impactful: (i) delete `Button.tsx` re-export; (ii) resolve
      the Card vs CardLayout naming question; (iii) extend the V2
      alias layer with the inlined hexes flagged in component files.

   d) "Phase 3" — no specific component. Likely topics:
      npm publish of `@wds/tokens` + `@wds/ui`, a proper docs site,
      focus-trap / portal refactor for Modal + BottomSheet,
      `Input.tsx` clear-button icon refactor, or font dedup.

4. Every code edit: typecheck both packages before commit.
     (cd packages/ui && npx tsc --noEmit) \
       && (cd apps/playground && npx tsc --noEmit)

5. First commit of the session requires explicit user OK.
   Subsequent batch commits within the same session can proceed.
```

Good luck.
