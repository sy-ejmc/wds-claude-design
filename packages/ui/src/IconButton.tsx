import type { CSSProperties, ReactNode, ButtonHTMLAttributes } from "react";
import { color, radius } from "@wds/tokens";

/**
 * WDS Icon Button — icon-only action control.
 *
 * Figma: Components / Icon Button (node `7021:2044`)
 * "아이콘만을 포함하는 버튼 컴포넌트로, 최소한의 UI 요소로 조작이 필요한 경우 사용됩니다."
 *
 * Matrix from Figma:
 *   size     L (56)   · M (36) · S (32)
 *   variant  Primary  · Secondary · Tertiary
 *   state    Default  · Disabled
 *
 * Only the Primary variant publishes a Disabled state; Secondary and
 * Tertiary fall back to Default so callers can't crash by asking for
 * an undefined combination. Radius is radius-xs (8px) across the matrix.
 */

export type IconButtonSize    = "L" | "M" | "S";
export type IconButtonVariant = "primary" | "secondary" | "tertiary";
export type IconButtonState   = "default" | "disabled";

export interface IconButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "disabled"> {
  size?: IconButtonSize;
  variant?: IconButtonVariant;
  state?: IconButtonState;
  /** The only visible content. Supplied by the consumer — @wds/ui ships no icons. */
  icon: ReactNode;
  /**
   * Screen-reader name. REQUIRED because the control has no visible label;
   * without it the button is unlabelled to assistive tech.
   */
  "aria-label": string;
}

/**
 * Figma encodes "L" with a fixed 56×56 frame + padding-m (16), so glyph
 * is 56 − 2·16 = 24 visually but Figma's inner size is 32 to compensate
 * for centered overflow. M/S have no frame size — they're padding-xs (8)
 * around a 20/16 glyph, yielding 36 and 32 respectively.
 */
const sizeSpec = {
  L: { pad: 16, icon: 32, box: 56 }, // Figma: `size-[56px]` + `padding-m`
  M: { pad: 8,  icon: 20, box: 36 }, // Figma: `padding-xs` + 20px glyph
  S: { pad: 8,  icon: 16, box: 32 }, // Figma: `padding-xs` + 16px glyph
} as const;

/** Primitive gray-100 — Figma neutral/disabled fill, not aliased in V2. */
const NEUTRAL_FILL = "#F3F4F5";
/** Primitive gray-500 — Figma disabled-glyph color, not aliased in V2. */
const DISABLED_GLYPH = "#B0B3BA";

function resolveChrome(variant: IconButtonVariant, state: IconButtonState) {
  if (state === "disabled") {
    return {
      bg:     NEUTRAL_FILL,
      fg:     DISABLED_GLYPH,
      border: "transparent",
    };
  }
  if (variant === "primary") {
    return {
      bg:     color.primary.normal,
      fg:     color.label.white,
      border: "transparent",
    };
  }
  if (variant === "secondary") {
    return {
      bg:     color.primary.light,   // green-100
      fg:     color.primary.normal,  // green-500
      border: "transparent",
    };
  }
  // tertiary
  return {
    bg:     color.background["bg-white"],
    fg:     color.label.neutral,
    border: color.line.normal,
  };
}

export function IconButton({
  size = "L",
  variant = "primary",
  state = "default",
  icon,
  className,
  style: styleProp,
  ...rest
}: IconButtonProps) {
  const spec = sizeSpec[size];
  const pal  = resolveChrome(variant, state);
  const isDisabled = state === "disabled";

  const style: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    // `minWidth`/`minHeight` rather than fixed `width`/`height` so that a
    // system font bump can grow the hit target. Padding is fixed so the
    // glyph stays centered inside the minimum frame.
    minWidth: spec.box,
    minHeight: spec.box,
    padding: spec.pad,
    borderRadius: radius.xs,
    border: `1px solid ${pal.border}`,
    backgroundColor: pal.bg,
    color: pal.fg,
    cursor: isDisabled ? "not-allowed" : "pointer",
    appearance: "none",
    WebkitAppearance: "none",
    ["--wds-focus-ring" as string]:
      variant === "primary"
        ? "rgba(24, 161, 154, 0.5)"
        : "rgba(51, 52, 56, 0.4)",
    ...styleProp,
  };

  const iconStyle: CSSProperties = {
    display: "inline-flex",
    width: spec.icon,
    height: spec.icon,
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
      <span style={iconStyle} data-icon-slot aria-hidden>
        {icon}
      </span>
    </button>
  );
}
