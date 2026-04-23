import type { CSSProperties, ReactNode, ButtonHTMLAttributes } from "react";
import { color, margin, radius, typography } from "@wds/tokens";

/**
 * WDS Inline Button — compact button used inline within content.
 *
 * Figma: Components / Inline Button (node `5014:27362`)
 * "다양한 상황에서 인라인 형태로 사용할 수 있는 버튼 컴포넌트입니다."
 *
 * Size × chrome matrix (flattened into a single `appearance` enum for
 * clarity; Figma crosses `variant` with `state`, but several "states"
 * are really tone variants — we list them explicitly):
 *
 *   appearance
 *     primary               — brand fill, white text
 *     primary-outline       — white bg, brand border + text
 *     primary-disabled      — gray-100 bg, muted gray text
 *     secondary             — green-100 bg, green-600 text
 *     secondary-info        — blue-50 bg, blue-600 text
 *     secondary-warning     — red-50 bg, red-500 text
 *     neutral               — gray-100 bg, gray-200 border, gray-800 text
 *     neutral-outline       — transparent bg, gray-200 border, gray-900 text
 *     neutral-white         — white bg, gray-200 border, gray-900 text
 *
 *   size: L (Button L, md type) / M (Button M, sm type) / S / XS
 */

export type InlineButtonSize = "L" | "M" | "S" | "XS";
export type InlineButtonAppearance =
  | "primary"
  | "primary-outline"
  | "primary-disabled"
  | "secondary"
  | "secondary-info"
  | "secondary-warning"
  | "neutral"
  | "neutral-outline"
  | "neutral-white";

export interface InlineButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "disabled"> {
  appearance?: InlineButtonAppearance;
  size?: InlineButtonSize;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  children: ReactNode;
  /** Shortcut for `appearance="primary-disabled"` + native disabled attr. */
  disabled?: boolean;
}

/* ── Size spec (from Figma) ──────────────────────────────────────── */

const sizeSpec: Record<
  InlineButtonSize,
  {
    padBlock: number;
    padInline: number;
    gap: number;
    iconSize: number;
    fontSize: string;
    lineHeight: string;
  }
> = {
  // Figma: padding-m (16), margin-xs (4), icon 24, Button L font (md / lh md)
  L:  { padBlock: 16, padInline: 16, gap: 4, iconSize: 24, fontSize: typography.size.md, lineHeight: typography.lineHeight.md },
  // Figma: padding-xs (8), margin-xs (4), icon 20, Button M font (sm / lh sm)
  M:  { padBlock: 8,  padInline: 8,  gap: 4, iconSize: 20, fontSize: typography.size.sm, lineHeight: typography.lineHeight.sm },
  // Figma uses a tight literal 16px line-height at S (not line-height-sm=20).
  // Our scale's xs lineHeight resolves to that value, so we reuse it.
  S:  { padBlock: 8,  padInline: 8,  gap: 2, iconSize: 16, fontSize: typography.size.sm, lineHeight: typography.lineHeight.xs },
  XS: { padBlock: 6,  padInline: 6,  gap: 2, iconSize: 14, fontSize: typography.size.xs, lineHeight: typography.lineHeight.xs },
};

// `margin` is re-exported for consistency from the same module but not
// consumed here (numeric px literals above match Figma exactly).
void margin;

/* ── Chrome resolver (from Figma) ────────────────────────────────── */

/**
 * Some values below are inlined primitives (gray-100, gray-500, gray-200,
 * gray-900, green-600, blue-50, blue-600, red-50, red-500). Each is a
 * Figma token that has no corresponding V2 alias in our current layer —
 * flagged with an inline comment so future alias expansion can find them.
 */
function resolveChrome(appearance: InlineButtonAppearance) {
  switch (appearance) {
    case "primary":
      return { bg: color.primary.normal, fg: color.label.white, border: "transparent" };
    case "primary-outline":
      return { bg: color.background["bg-white"], fg: color.primary.normal, border: color.primary.normal };
    case "primary-disabled":
      return { bg: "#F3F4F5", fg: "#B0B3BA", border: "transparent" }; // gray-100 / gray-500
    case "secondary":
      return { bg: color.primary.light, fg: "#168B88", border: "transparent" }; // green-600 — between primary.normal (500) and primary.strong (700)
    case "secondary-info":
      return { bg: "#EEF7FF", fg: "#0062E5", border: "transparent" }; // blue-50 / blue-600
    case "secondary-warning":
      return { bg: "#FFF5F5", fg: color.status.error, border: "transparent" }; // red-50 / red-500 (= color.status.error)
    case "neutral":
      return { bg: "#F3F4F5", fg: color.label.neutral, border: "#EEEFF1" }; // gray-100 / gray-800 / gray-200
    case "neutral-outline":
      return { bg: "transparent", fg: "#292929", border: "#EEEFF1" }; // gray-900 / gray-200
    case "neutral-white":
      return { bg: color.background["bg-white"], fg: "#292929", border: "#EEEFF1" };
  }
}

/* ── Component ───────────────────────────────────────────────────── */

export function InlineButton({
  appearance = "primary",
  size = "L",
  leadingIcon,
  trailingIcon,
  children,
  disabled = false,
  className,
  style: styleProp,
  ...rest
}: InlineButtonProps) {
  const effectiveAppearance: InlineButtonAppearance = disabled
    ? "primary-disabled"
    : appearance;
  const spec = sizeSpec[size];
  const pal  = resolveChrome(effectiveAppearance);
  const isDisabled = disabled || effectiveAppearance === "primary-disabled";

  const style: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: spec.gap,
    minHeight: undefined, // inline; size is content-driven
    paddingBlock: spec.padBlock,
    paddingInline: spec.padInline,
    borderRadius: radius.xs, // 8px — all inline buttons
    border: `1px solid ${pal.border}`,
    backgroundColor: pal.bg,
    color: pal.fg,
    fontFamily: typography.fontFamily,
    fontSize: spec.fontSize,
    lineHeight: spec.lineHeight,
    fontWeight: typography.weight.B,
    letterSpacing: typography.letterSpacing,
    cursor: isDisabled ? "not-allowed" : "pointer",
    appearance: "none",
    WebkitAppearance: "none",
    whiteSpace: "nowrap",
    // Halo color tracks the foreground for visibility on every fill.
    ["--wds-focus-ring" as string]: halo(effectiveAppearance),
    ...styleProp,
  };

  const iconStyle: CSSProperties = {
    display: "inline-flex",
    width: spec.iconSize,
    height: spec.iconSize,
    flexShrink: 0,
    color: pal.fg,
  };

  return (
    <button
      type="button"
      disabled={isDisabled}
      aria-disabled={isDisabled || undefined}
      className={["wds-block-button", className].filter(Boolean).join(" ")}
      style={style}
      {...rest}
    >
      {leadingIcon  && <span style={iconStyle} data-icon-slot aria-hidden>{leadingIcon}</span>}
      <span>{children}</span>
      {trailingIcon && <span style={iconStyle} data-icon-slot aria-hidden>{trailingIcon}</span>}
    </button>
  );
}

function halo(a: InlineButtonAppearance): string {
  switch (a) {
    case "primary":
    case "primary-outline":
    case "secondary":
      return "rgba(24, 161, 154, 0.5)";    // brand halo
    case "secondary-info":
      return "rgba(0, 98, 229, 0.45)";     // blue-600 halo
    case "secondary-warning":
      return "rgba(239, 43, 42, 0.45)";    // red-500 halo
    default:
      return "rgba(51, 52, 56, 0.4)";      // neutral halo
  }
}
