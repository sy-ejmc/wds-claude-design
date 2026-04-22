# WDS — 우리가 Design System

**WDS (우리가 Design System)** is the canonical design system for an **elderly-focused Korean service**. The product is internally referenced as **우리가 (Wooriga)** — "we / us together" — reinforcing the warm, communal tone of the brand.

This project is a design-companion rendering of the live codebase at [`sy-ejmc/wds-claude-design`](https://github.com/sy-ejmc/wds-claude-design) (v1.2.0, 2026-04-22). The repo is the **source of truth**: a pnpm workspace with `@wds/tokens` (primitive → alias) and `@wds/ui` (React components).

> **Phase 0-pre spike.** The DS exists in code; production apps have not yet migrated. `Button` is the only shipped component.

## Sources

| Source | Location | What it is |
|---|---|---|
| Codebase | `sy-ejmc/wds-claude-design` (GitHub) | Token + component monorepo. **Source of truth.** |
| Figma — Primitive var-set | `3003:11976` (104 values) | Raw palette + spacing |
| Figma — Alias var-set | `3003:11912` | Semantic color/spacing/radius/height/typography |
| Figma — Typography collection | var-set `3003:12040` | 3-tier type scale |

## Index

| File | What it contains |
|---|---|
| `README.md` | This file. |
| `colors_and_type.css` | All CSS variables mirroring the alias layer, plus 3-tier scale. Import from any HTML/JSX artifact. |
| `packages/tokens/src/*` | Authoritative source — `primitive.ts`, `alias.ts`, `scale.css`, `reset.css`. |
| `packages/ui/src/*` | Authoritative source — `Button.tsx`. |
| `preview/` | Design System tab cards (colors, type, spacing, components). |
| `ui_kits/playground/` | Hi-fi interactive mock (login → home → family/health/settings). |
| `SKILL.md` | Agent Skills manifest. |

## Core brand identity

- **Audience.** 65+ Korean users. DS is built around accessibility (DS-C3 typography tiers) and absolute-spacing predictability (DS-C1).
- **Name.** 우리가 — "we / together". Tone is communal, gentle, plain.
- **Language.** Korean-first UI.
- **Typeface.** Pretendard (mandated by the DS).
- **Brand color.** **Teal/green** — `color.primary.normal` = `#18A19A` (green-500). Replaces the earlier blue placeholder.

## The three rules

| # | Rule | Why |
|---|------|-----|
| DS-C1 | Spacing / padding / margin / radius are **px** | Elderly UI needs absolute, predictable layout. |
| DS-C2 | Font-size is **rem** | Required for DS-C3 + respects user OS font-size. |
| DS-C3 | 3-tier typography scale: **일반 / 크게 / 더 크게** | Core accessibility feature. |

Set `<html data-typography-scale="normal|large|x-large">`; every `var(--font-size-*)` / `var(--line-height-*)` swaps automatically.

## Token naming — preserved from Figma

The alias layer keeps Figma group → variable names verbatim:

- **Color.** `color.primary.normal|light|alternative|strong|heavy`, `color.background["bg-white"|"bg-50"|"bg-100"|"bg-200"]`, `color.label.strong|normal|neutral|alternative|assistive|disable|white`, `color.fill.normal|strong|alternative`, `color.line.normal|neutral|alternative`, `color.interaction.inactive|disable`, `color.icon.strong|default|alternative|disable|white`, `color.status.success|warning|error|info`.
- **Spacing primitives.** `spacing-1 … spacing-20` (4px → 80px in 4px steps).
- **Semantic spacing.** `padding.xxs|xs|s|m|l|xl`, `margin.xs|s|sm|m|l|xl|xxl`, `radius.none|xxs|xs|s|m|l|full`, `height.s|m|l`.
- **Type weights.** `B|SB|M|R|L` (700/600/500/400/300).

Known Figma normalizations: `primary-nomal` → `primary.normal`, `fill- strong` → `fill.strong`.

---

## CONTENT FUNDAMENTALS

**Korean-first.** English in UI is a smell — use only standard loanwords (앱, 버튼, 이메일).

### Voice
- **Gentle imperative.** CTAs use `-기` gerund or `-세요` polite form: `시작하기`, `확인`, `다음으로 가기`. Never `Submit`, never `눌러!`.
- **Communal "we".** "우리가" is in the product name; copy leans inclusive: `함께`, `같이`, `우리`.
- **Plain over clever.** No puns, no internet-speak, no marketing-ese. If a 70-year-old would pause, the word is wrong.

### Casing & punctuation
- Korean has no casing. English fragments (docs, tech) use **sentence case**.
- `.` in body copy; not in button labels.

### Size-tier labels (user-facing)

| In code | In Korean UI |
|---|---|
| `normal` | `일반 보기` |
| `large` | `크게 보기` |
| `x-large` | `더 크게 보기` |

### Voice examples

| ✅ In voice | ❌ Out of voice |
|---|---|
| `시작하기` | `Let's go!` |
| `글씨 크게 보기` | `Big text mode` |
| `확인` | `Got it 👍` |
| `로그인` | `Sign in now` |
| `설정` | `Preferences⚙️` |

### Emoji
**Not used** in first-party UI copy. Utility service for elderly users — emoji add cognitive load. Acceptable in internal docs.

---

## VISUAL FOUNDATIONS

### Color

A multi-hue palette (blue/red/orange/green/navy/purple × 10 steps) with **green as the brand primary** and full neutral + coolgray + alpha scales for surfaces, text, borders, and overlays.

- **Brand.** `primary.normal` = `#18A19A` (green-500). Calm teal, not a saturated tech-blue. `primary.strong` / `primary.heavy` for hover/press/emphasis.
- **Text (label).** `label.strong` (pure black), `label.normal` (#161618), `label.neutral` (#48494C), `label.alternative` (#868688), `label.assistive` (#C6C7C8), `label.disable` (#E0E0E1).
- **Surfaces.** `bg-white`, `bg-50`, `bg-100`, `bg-200` — very subtle steps from white.
- **Fills (chips, segmented).** `fill.alternative/normal/strong` — coolgray 99 / 98 / 96. Near-white tints.
- **Lines.** `line.normal/neutral/alternative` — coolgray 95 / 97 / 99. Always 1px.
- **Status.** `success` green · `warning` orange · `error` red · `info` pale green.
- **Alpha overlays.** 9 black-alpha stops (10%–90%) for scrims and modal backdrops.

**No gradients.** No glassmorphism. Flat surfaces; steps via coolgray hierarchy.

### Typography
- **Family.** Pretendard Variable.
- **Weights.** `L 300` · `R 400` · `M 500` · `SB 600` · `B 700`. No italics (Korean doesn't italicize).
- **Scale.** 9 sizes (xs → 5xl) via `var(--font-size-*)`, tier-swapped. Line-heights designer-defined per tier (not a multiplier).
- **Letter-spacing.** `0px` always.

### Spacing — tokens and grid
- **Primitive grid.** 4px steps, `spacing-1 (4)` → `spacing-20 (80)`. Never invent a 2px or 6px.
- **Semantic padding.** xxs 4 · xs 8 · s 12 · m 16 · l 24 · xl 32.
- **Semantic margin.** xs 4 · s 8 · sm 12 · m 16 · l 24 · xl 40 · xxl 80.

### Radius
7 stops: `none 0` · `xxs 4` · `xs 8` · `s 12` · `m 20` · `l 24` · `full 999`. Default for buttons/cards is `m` (20) unless the repo says otherwise — Button.tsx uses `radius.m`.

### Height tokens
`height.s 24` · `height.m 36` · `height.l 48` — used for chip/input/button line-height equivalents.

### Backgrounds
- Flat white surface + subtle bg-50/100/200 regions.
- No full-bleed imagery, hand-drawn illustration, texture, or grain.
- Phase 1 may define illustration; do not invent now.

### Animation
- Repo ships no animation system. Prefer short, calm transitions — 150-200ms `ease-out`. No bounces/overshoots.
- Default easing: `cubic-bezier(0.2, 0, 0, 1)` or plain `ease-out`.

### Hover / press
Button.tsx uses `opacity: 0.5` for `disabled`. For hover/press:
- **Hover (primary).** Background → `primary.strong`.
- **Hover (secondary).** Background → `fill.alternative`.
- **Press.** `scale(0.985)`, 80ms — no color punch.
- **Disabled.** `opacity: 0.5` (matches Button.tsx).

### Borders & shadows
- **1px solid** borders in `line.normal` (coolgray-95) by default. Never 2px.
- **No elevation system defined.** For mocks use `0 1px 2px rgba(0,0,0,0.06), 0 2px 4px rgba(0,0,0,0.04)` and flag as "prototype-only".

### Transparency & blur
No `backdrop-filter`. Modal scrims use `neutralA-50` (`#00000080`).

### Cards
- **Flat.** `bg-white` + 1px `line.normal` + `radius.m` (20px). Padding `padding.l` (24px).

### Layout rules
- Single-column on mobile.
- Tap targets ≥ 44px (reaches 48+ at x-large tier).
- Fixed bottom CTA OK; fixed top micro-icon bars not OK.

---

## ICONOGRAPHY

The repo **does not ship an icon system** in Phase 0-pre. Known gap.
- No bundled icon font or SVGs.
- Emoji **not used** in product UI.
- Unicode symbols (→, ×, ✓) acceptable for ornament only.

### Substitute (flagged)
[**Lucide**](https://lucide.dev) via CDN — 2px stroke, rounded caps, geometric. Matches the calm Pretendard / flat-color feel.

> ⚠️ **Not the final icon choice.** Confirm Phase 1 intent (Phosphor / Material Symbols Rounded / custom).

### Rules when using Lucide
- Stroke 2.
- Size 20 inline, 24 standalone; bump to 24/28 at x-large tier.
- Inherit `currentColor`; no multi-color icons.
- Never decorate — icons must carry an action.

---

## Font substitution flag
Pretendard is mandated and loads from the official jsdelivr CDN. For offline work, grab the variable woff2 from [orioncactus/pretendard](https://github.com/orioncactus/pretendard) and drop into `fonts/`.

---

## Open questions for the user

1. **Icon system** — Lucide substitute. Phase 1 final choice?
2. **Shadow / elevation tokens** — not in repo. Confirm intended elevation scale.
3. **Animation tokens** — not in repo. Duration / easing values?
4. **Dark mode** — coolgray scale suggests plans. Confirm scope.
5. **Playground screens** — are the flows I built (login/home/family/health/settings) on track?
6. **Real copy** — if you share product-copy samples I can refine the voice section.
