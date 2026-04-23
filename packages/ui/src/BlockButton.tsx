import type { CSSProperties, ReactNode, ButtonHTMLAttributes } from "react";
import { color, margin, padding, radius, typography } from "@wds/tokens";

/**
 * WDS Block Button — primary action control.
 *
 * Figma: Components / Block Button (node `5015:28584`)
 * "가로 전체를 차지하는 블록 형태의 버튼으로, 주요 CTA에 적합합니다."
 *
 * The matrix from Figma:
 *
 *   variant     Primary · Secondary · Neutral
 *   state       Default · Outline   · Disabled
 *   size        L (56)  · M (48)
 *
 * Not every combination exists in Figma. Secondary ships only in
 * Default; Primary and Neutral ship all three states. Asking for an
 * undefined combination falls back to the closest published one so
 * consumers never crash.
 */

export type ButtonVariant = "primary" | "secondary" | "neutral";
export type ButtonState   = "default" | "outline" | "disabled";
export type ButtonSize    = "L" | "M";

export interface BlockButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "disabled"> {
  variant?: ButtonVariant;
  state?: ButtonState;
  size?: ButtonSize;
  /** Size the button by content instead of filling the parent. */
  inline?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  children: ReactNode;
}

/* ── Size spec (from Figma) ──────────────────────────────────────── */

/**
 * Figma uses `height` per size. We adopt the Figma value as `minHeight`
 * so that a tier bump or a user-raised system font can grow the button
 * instead of clipping the glyph. Vertical padding is computed so that
 * at the 일반보기 tier with a 16px system root, minHeight matches the
 * Figma floor exactly (L: 16+24+16 = 56; M: 12+24+12 = 48).
 */
const sizeSpec = {
  L: {
    height:     56,            // Figma: `h-[56px]`
    padX:       16,            // Figma: `p-[var(--padding/padding-m,16px)]`
    padY:       16,
    gap:        8,             // Figma: `gap-[var(--margin/margin-s,8px)]`
    iconSize:   24,            // Figma: `size-[24px]`
    fontSize:   typography.size.lg,        // Figma: `--primitive(font-size)/lg`
    lineHeight: typography.lineHeight.lg,  // Figma: `--line-height/line-height-lg`
  },
  M: {
    height:     48,            // Figma: `h-[48px]`
    padX:       16,            // Figma: `px-[var(--padding/padding-m,16px)]`
    padY:       12,            //        `py-[var(--padding/padding-s,12px)]`
    gap:        8,
    iconSize:   24,
    fontSize:   typography.size.md,        // Figma: `--primitive(font-size)/md`
    lineHeight: typography.lineHeight.md,  // Figma: `--line-height/line-height-md`
  },
} as const;

/* ── Chrome resolver (from Figma) ────────────────────────────────── */

/**
 * Disabled button text uses primitive gray-500 (#B0B3BA) in Figma —
 * there is no V2 alias for "muted label on a disabled control", so we
 * reference the primitive value inline and document the exception here.
 */
const DISABLED_TEXT = "#B0B3BA";
/** Primitive gray-100 — Figma uses this for Neutral/Disabled button fill, also not aliased in V2. */
const NEUTRAL_FILL = "#F3F4F5";
/** Primitive gray-200 — Figma uses this for Neutral-Outline border, not aliased in V2. */
const NEUTRAL_LINE = "#EEEFF1";

function resolveChrome(variant: ButtonVariant, state: ButtonState) {
  // Disabled overrides every variant's chrome.
  if (state === "disabled") {
    return {
      bg:     NEUTRAL_FILL,
      fg:     DISABLED_TEXT,
      border: "transparent",
    };
  }

  if (variant === "primary") {
    if (state === "outline") {
      return {
        bg:     color.background["bg-white"],
        fg:     color.primary.normal,
        border: color.primary.normal,
      };
    }
    // default
    return {
      bg:     color.primary.normal,
      fg:     color.label.white,
      border: "transparent",
    };
  }

  if (variant === "secondary") {
    // Figma only publishes Secondary-Default. Outline / Disabled fall
    // back to Default so callers don't crash asking for the impossible.
    return {
      bg:     color.primary.light,   // green-100 (#EEF7F6)
      fg:     color.primary.normal,  // green-500
      border: "transparent",
    };
  }

  // neutral
  if (state === "outline") {
    return {
      bg:     color.background["bg-white"],
      fg:     color.label.neutral,   // gray-800 — Figma text color on neutral-outline
      border: NEUTRAL_LINE,
    };
  }
  // default
  return {
    bg:     NEUTRAL_FILL,
    fg:     color.label.neutral,
    border: "transparent",
  };
}

/* ── Radius (from Figma) ─────────────────────────────────────────── */

/**
 * Only the Neutral-Outline variant uses radius-s (12px). Every other
 * combination uses radius-xs (8px). Figma's design intent — outlined
 * neutral chips are a slightly softer silhouette than the filled CTAs.
 */
function resolveRadius(variant: ButtonVariant, state: ButtonState): string {
  if (variant === "neutral" && state === "outline") return radius.s;
  return radius.xs;
}

/* ── Component ───────────────────────────────────────────────────── */

export function BlockButton({
  variant = "primary",
  state = "default",
  size = "L",
  inline = false,
  leadingIcon,
  trailingIcon,
  children,
  className,
  style: styleProp,
  ...rest
}: BlockButtonProps) {
  const spec = sizeSpec[size];
  const pal  = resolveChrome(variant, state);
  const rad  = resolveRadius(variant, state);
  const isDisabled = state === "disabled";

  const style: CSSProperties = {
    // layout
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: margin.s, // 8px — Figma: `--margin/margin-s`
    width: inline ? undefined : "100%",
    // `minHeight`, not `height`: grows with tier or raised system font.
    minHeight: spec.height,
    paddingBlock: spec.padY,
    paddingInline: spec.padX,
    // shape
    borderRadius: rad,
    border: `1px solid ${pal.border}`,
    // chrome
    backgroundColor: pal.bg,
    color: pal.fg,
    // type
    fontFamily: typography.fontFamily,
    fontSize: spec.fontSize,
    lineHeight: spec.lineHeight,
    fontWeight: typography.weight.B,
    letterSpacing: typography.letterSpacing,
    // interaction
    cursor: isDisabled ? "not-allowed" : "pointer",
    // kill the native button chrome
    appearance: "none",
    WebkitAppearance: "none",
    // Keyboard focus ring hookup (ui.css). Neutral/outline uses a neutral
    // halo; primary/secondary use the brand halo.
    ["--wds-focus-ring" as string]:
      variant === "neutral" ? "rgba(51, 52, 56, 0.4)" : "rgba(24, 161, 154, 0.5)",
    ...styleProp,
  };

  const iconStyle: CSSProperties = {
    display: "inline-flex",
    width: spec.iconSize,
    height: spec.iconSize,
    flexShrink: 0,
    color: pal.fg,
  };

  // `padding` from tokens is unused directly in this component but is
  // exported from the same module — silence TS's noUnusedLocals if enabled.
  void padding;

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

/** Legacy alias — earlier exports of <Button/> map to BlockButton. */
export { BlockButton as Button };
