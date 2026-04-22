/**
 * WDS Alias Tokens (V2, Figma var-set `3003:11912`)
 *
 * PUBLIC INTERFACE for components. Components should import these.
 * Aliases reference primitives (colors) or CSS custom properties
 * (typography) so tier/theme changes happen outside the component tree.
 *
 * DS-C1: spacing is px-based (absolute, elderly-friendly layout predictability).
 * DS-C2: typography sizes are rem-based (propagate via tier-swapped CSS vars).
 * DS-C3: 3-tier scale — see ./scale.css. Typography tokens here are
 *        `var(--font-size-*)` / `var(--line-height-*)` references;
 *        their actual values switch when `<html data-typography-scale>` changes.
 */
import { primitive } from "./primitive";

export const color = {
  text: {
    primary: primitive.color.gray[900],
    secondary: primitive.color.gray[700],
    inverse: primitive.color.white,
    accent: primitive.color.blue[700],
  },
  bg: {
    surface: primitive.color.white,
    subtle: primitive.color.gray[50],
    accent: primitive.color.blue[500],
    accentHover: primitive.color.blue[700],
  },
  border: {
    default: primitive.color.gray[200],
    accent: primitive.color.blue[500],
  },
} as const;

/** Spacing in px (DS-C1). */
export const spacing = {
  xs: "4px",
  sm: "8px",
  md: "16px",
  lg: "24px",
  xl: "32px",
  "2xl": "48px",
} as const;

/**
 * Typography (DS-C2 / DS-C3).
 *
 * `size` and `lineHeight` resolve to CSS custom properties whose values are
 * tier-dependent (see ./scale.css). A component that writes
 *   fontSize: typography.size["5xl"]
 * is automatically 36px at 일반보기, 40px at 크게보기, 44px at 더크게보기,
 * multiplied by the user's own system font-size preference (rem).
 *
 * `weight` and `family` are static for now — Phase 0.1 will finalize once
 * the Font Weights and Font Family groups are audited.
 */
export const typography = {
  size: {
    "5xl": "var(--font-size-5xl)",
    "4xl": "var(--font-size-4xl)",
    "3xl": "var(--font-size-3xl)",
    "2xl": "var(--font-size-2xl)",
    xl: "var(--font-size-xl)",
    lg: "var(--font-size-lg)",
    md: "var(--font-size-md)",
    sm: "var(--font-size-sm)",
    xs: "var(--font-size-xs)",
  },
  lineHeight: {
    "5xl": "var(--line-height-5xl)",
    "4xl": "var(--line-height-4xl)",
    "3xl": "var(--line-height-3xl)",
    "2xl": "var(--line-height-2xl)",
    xl: "var(--line-height-xl)",
    lg: "var(--line-height-lg)",
    md: "var(--line-height-md)",
    "md-1": "var(--line-height-md-1)",
    sm: "var(--line-height-sm)",
    xs: "var(--line-height-xs)",
  },
  /** Font weights are tier-invariant (Figma Font Weights group). */
  weight: {
    bold: 700,      // Figma: Font Weight B
    semibold: 600,  // Figma: Font Weight SB
    medium: 500,    // Figma: Font Weight M
    regular: 400,   // Figma: Font Weight R
    light: 300,     // Figma: Font Weight L
  },
  /** Letter spacing is tier-invariant; DS defines a single 0 value. */
  letterSpacing: "0",
  /** Font family is tier-invariant; DS mandates Pretendard. */
  fontFamily: '"Pretendard", -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", sans-serif',
} as const;

export const radius = {
  sm: "4px",
  md: "8px",
  lg: "12px",
  full: "9999px",
} as const;
