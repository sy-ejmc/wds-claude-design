/**
 * WDS Alias Tokens (V2, Figma var-set `3003:11912`) — 33 color aliases
 * + V3 Spacing & Sizing aliases (padding / margin / radius / height) — 23
 * + V4 Shadow (Effect Styles) — 4
 * + V5 Typography (size / lineHeight / weight / letterSpacing / fontFamily)
 *
 * PUBLIC INTERFACE for components. Aliases preserve the Figma group →
 * variable structure verbatim (e.g. `color.primary.normal`,
 * `color.background["bg-white"]`, `padding.m`, `radius.full`).
 *
 * DS-C1: spacing/padding/margin/radius are **px** (absolute, elderly-friendly
 *        layout predictability). Sourced from the Primitive(spacing) steps.
 * DS-C2: typography sizes/line-heights are **rem** (propagate via tier-swapped
 *        CSS vars). Source values are px in Figma; converted with 1rem = 16px.
 * DS-C3: 3-tier scale — see ./scale.css. Typography tokens here are
 *        `var(--font-size-*)` / `var(--line-height-*)` references.
 *
 * Figma naming is preserved. Minor typo normalizations noted inline:
 *   - `primary-nomal` → `primary.normal` (Figma typo)
 *   - `fill- strong` → `fill.strong` (Figma whitespace artifact)
 *   - `Alpha-colors- neutralA-*` → `primitive.color.neutralA.*` (same)
 *
 * Source of truth: Figma v1.2.0 variable generator export, 2026-04-22.
 */
import { primitive } from "./primitive";

/* ------------------------------------------------------------------ */
/* V2. Alias Token (color)                                            */
/* ------------------------------------------------------------------ */

export const color = {
  /** Brand / CTA — driven by green palette. */
  primary: {
    normal:      primitive.color.green[500],   // Figma: `primary-nomal` (typo)
    light:       primitive.color.green[100],
    alternative: primitive.color.green[100],   // alias of `.light`; matches Claude Design's vocabulary for "secondary primary fill"
    strong:      primitive.color.green[700],
    heavy:       primitive.color.green[900],
  },

  /** Background surfaces. */
  background: {
    "bg-white": primitive.color.gray.white,
    "bg-50":    primitive.color.gray[50],
    "bg-100":   primitive.color.gray[100],
    "bg-200":   primitive.color.gray[200],
  },

  /** Text / label layer. */
  label: {
    strong:      primitive.color.gray.black,
    normal:      primitive.color.gray[1000],
    neutral:     primitive.color.gray[800],
    alternative: primitive.color.gray[700],
    assistive:   primitive.color.gray[400],
    disable:     primitive.color.gray[300], // Figma: `label-disabled` — code-side normalizes to .disable for consistency with interaction/icon
    white:       primitive.color.gray.white, // Figma chain: label-white → Icon-white → gray.white
  },

  /** Fill (muted surfaces for chips, segmented controls, etc.). */
  fill: {
    normal:      primitive.color.coolgray[98], // Figma: `fill/nomal`
    strong:      primitive.color.coolgray[96],
    alternative: primitive.color.coolgray[99],
  },

  /** Line / border. */
  line: {
    normal:      primitive.color.coolgray[95],
    neutral:     primitive.color.coolgray[97],
    alternative: primitive.color.coolgray[99],
  },

  /** Interaction states. Figma capitalizes (`Interaction-Inactive`); code-side lowercases for a consistent alias-key style. */
  interaction: {
    inactive: primitive.color.coolgray[70],
    disable:  primitive.color.coolgray[98],
  },

  /** Icon layer. Figma caps (`Icon-Disable`) normalized to lowercase. */
  icon: {
    strong:      primitive.color.gray[1000],
    default:     primitive.color.gray[800],
    alternative: primitive.color.gray[700],
    disable:     primitive.color.gray[600],
    white:       primitive.color.gray.white,
  },

  /** Status colors. */
  status: {
    success: primitive.color.green[500],
    warning: primitive.color.orange[500],
    error:   primitive.color.red[500],
    info:    primitive.color.green[100],
  },

  /** OS chrome. */
  "OS-Indicator": primitive.color.gray[1000],
} as const;

/* ------------------------------------------------------------------ */
/* V3. Spacing & Sizing                                               */
/* ------------------------------------------------------------------ */

/**
 * Primitive spacing steps (20 values). 4px → 80px in 4px increments.
 * Figma group: `Primitive(spacing)`. Keys match the Figma names.
 * Prefer the semantic aliases below (padding/margin/radius/height).
 */
export const spacing = {
  "spacing-1":  "4px",
  "spacing-2":  "8px",
  "spacing-3":  "12px",
  "spacing-4":  "16px",
  "spacing-5":  "20px",
  "spacing-6":  "24px",
  "spacing-7":  "28px",
  "spacing-8":  "32px",
  "spacing-9":  "36px",
  "spacing-10": "40px",
  "spacing-11": "44px",
  "spacing-12": "48px",
  "spacing-13": "52px",
  "spacing-14": "56px",
  "spacing-15": "60px",
  "spacing-16": "64px",
  "spacing-17": "68px",
  "spacing-18": "72px",
  "spacing-19": "76px",
  "spacing-20": "80px",
} as const;

export const padding = {
  xxs: spacing["spacing-1"], //  4
  xs:  spacing["spacing-2"], //  8
  s:   spacing["spacing-3"], // 12
  m:   spacing["spacing-4"], // 16
  l:   spacing["spacing-6"], // 24
  xl:  spacing["spacing-8"], // 32
} as const;

export const margin = {
  xs:  spacing["spacing-1"],  //  4
  s:   spacing["spacing-2"],  //  8
  sm:  spacing["spacing-3"],  // 12
  m:   spacing["spacing-4"],  // 16
  l:   spacing["spacing-6"],  // 24
  xl:  spacing["spacing-10"], // 40
  xxl: spacing["spacing-20"], // 80
} as const;

export const radius = {
  none: "0px",
  xxs:  spacing["spacing-1"], //  4
  xs:   spacing["spacing-2"], //  8
  s:    spacing["spacing-3"], // 12
  m:    spacing["spacing-5"], // 20
  l:    spacing["spacing-6"], // 24
  full: "999px",
} as const;

export const height = {
  s: spacing["spacing-6"],  // 24
  m: spacing["spacing-9"],  // 36
  l: spacing["spacing-12"], // 48
} as const;

/* ------------------------------------------------------------------ */
/* V4. Shadow (Effect Styles — Figma group `Shadows`)                 */
/* ------------------------------------------------------------------ */

/**
 * Shadow tokens. Figma Effect Styles group `Shadows` ships 4 steps.
 *
 * Progression is **not** strictly monotonic in opacity — Shadow-2 is a
 * softer, flatter shadow (5% alpha) intentionally lighter than Shadow-1,
 * while Shadow-3/4 grow in spread + y-offset for lifted surfaces (modals,
 * popovers, floating sheets).
 *
 * Usage guide:
 *   shadow[1] — pressed / resting card edge
 *   shadow[2] — subtle hover lift on fills
 *   shadow[3] — floating elements (popovers, dropdowns)
 *   shadow[4] — modals, sheets, highest elevation
 */
export const shadow = {
  1: "0 2px 4px 0 rgba(0, 0, 0, 0.10)",
  2: "0 4px 5px 0 rgba(0, 0, 0, 0.05)",
  3: "0 8px 24px 0 rgba(0, 0, 0, 0.10)",
  4: "0 12px 48px 0 rgba(0, 0, 0, 0.10)",
} as const;

/* ------------------------------------------------------------------ */
/* V5. Typography (tier-dependent sizes/line-heights via CSS vars)    */
/* ------------------------------------------------------------------ */

/**
 * Typography (DS-C2 / DS-C3).
 *
 * `size` and `lineHeight` resolve to CSS custom properties whose values are
 * tier-dependent (see ./scale.css). A component that writes
 *   fontSize: typography.size["5xl"]
 * is automatically 36px at 일반보기, 40px at 크게보기, 44px at 더크게보기,
 * multiplied by the user's own system font-size preference (rem).
 *
 * `weight` / `letterSpacing` / `fontFamily` are tier-invariant static values.
 */
export const typography = {
  size: {
    "5xl": "var(--font-size-5xl)",
    "4xl": "var(--font-size-4xl)",
    "3xl": "var(--font-size-3xl)",
    "2xl": "var(--font-size-2xl)",
    xl:    "var(--font-size-xl)",
    lg:    "var(--font-size-lg)",
    md:    "var(--font-size-md)",
    sm:    "var(--font-size-sm)",
    xs:    "var(--font-size-xs)",
  },
  lineHeight: {
    "5xl": "var(--line-height-5xl)",
    "4xl": "var(--line-height-4xl)",
    "3xl": "var(--line-height-3xl)",
    "2xl": "var(--line-height-2xl)",
    xl:    "var(--line-height-xl)",
    lg:    "var(--line-height-lg)",
    md:    "var(--line-height-md)",
    "md-1":"var(--line-height-md-1)",
    sm:    "var(--line-height-sm)",
    xs:    "var(--line-height-xs)",
  },
  /** Figma: Font Weights group — tier-invariant. */
  weight: {
    B:  700, // Figma: `Font-Weight-B`  (Bold)
    SB: 600, // Figma: `Font-Weight-SB` (Semibold)
    M:  500, // Figma: `Font-Weight-M`  (Medium)
    R:  400, // Figma: `Font-Weight-R`  (Regular)
    L:  300, // Figma: `Font-Weight-L`  (Light)
  },
  /** Figma: Letter Spacing group — tier-invariant, single 0 value. */
  letterSpacing: "0px",
  /** Figma: Font Family group — tier-invariant. */
  fontFamily: '"Pretendard", -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", sans-serif',
} as const;

/* ------------------------------------------------------------------ */
/* V6. Brand                                                          */
/* ------------------------------------------------------------------ */

/**
 * Brand — WOORIGA CI.
 *
 * The brand system consists of a symbol (house + person mark) and a
 * wordmark ("WOORIGA"). Both can be used independently but pair best
 * together with the clearspace rule below.
 *
 *   brand.symbol       — SVG asset path (ships as /assets/wooriga-symbol.svg)
 *   brand.symbolColor  — canonical fill (Primary Normal #009688)
 *   brand.wordmark     — type spec for the text wordmark
 *   brand.clearspace   — minimum padding around the full lockup,
 *                        expressed as a ratio of the symbol's height
 *                        (x = 0.5h per the CI doc).
 *   brand.minSize      — smallest legible render (symbol height in px)
 */
export const brand = {
  symbol: "/assets/wooriga-symbol.svg",
  symbolColor: color.primary.normal, // #009688
  wordmark: {
    family: '"Pretendard", -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
    weight: 800,
    tracking: "-0.04em",
  },
  clearspace: 0.5, // ratio of symbol height
  minSize: {
    symbol:   20, // px
    wordmark: 14, // px cap height
    lockup:   24, // px symbol height when paired
  },
} as const;
