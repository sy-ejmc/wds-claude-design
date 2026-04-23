import type { CSSProperties, ReactNode, ButtonHTMLAttributes } from "react";
import { color, radius, shadow } from "@wds/tokens";

export type FabSize = "L" | "S";
export type FabVariant = "primary" | "secondary" | "tertiary";

export interface FloatingActionButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "disabled"> {
  size?: FabSize;
  variant?: FabVariant;
  /** 24×24 glyph. Supplied by the consumer — @wds/ui ships no icons. */
  icon: ReactNode;
  /**
   * Screen-reader name. REQUIRED because the FAB has no visible label;
   * without this, the control is unlabelled to assistive tech.
   */
  "aria-label": string;
  disabled?: boolean;
}

/**
 * WDS Floating Action Button — circular icon-only control elevated
 * above the content layer with a soft drop shadow.
 *
 * Figma: Components / Floating Action Button (node `5015:29164`)
 * "화면 위에 떠 있는 플로팅 버튼 컴포넌트입니다."
 *
 * Sizes follow the Figma spec exactly:
 *   L  → 56×56   (prominent / single-focus actions)
 *   S  → 40×40   (secondary / dense layouts)
 *
 * Variants:
 *   primary    — brand green fill, white glyph
 *   secondary  — green-100 tinted fill, brand-green glyph
 *   tertiary   — white fill, neutral glyph
 *
 * The elevation is `shadow[3]` (Figma Shadow/Shadow-3:
 * `0 8px 24px rgba(0,0,0,0.1)`).
 */
export function FloatingActionButton({
  size = "L",
  variant = "primary",
  icon,
  disabled = false,
  className,
  style: styleProp,
  ...rest
}: FloatingActionButtonProps) {
  const dim = size === "L" ? 56 : 40;

  const bg =
    variant === "primary"
      ? color.primary.normal
      : variant === "secondary"
        ? color.primary.light
        : color.background["bg-white"];

  const fg =
    variant === "primary"
      ? color.label.white
      : variant === "secondary"
        ? color.primary.normal
        : color.label.neutral;

  const style: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    // Perfect circle: equal width/height + full radius. No minHeight
    // override here because FAB has no text to grow with the tier.
    width: dim,
    height: dim,
    flexShrink: 0,
    padding: 0,
    border: "none",
    borderRadius: radius.full,
    background: bg,
    color: fg,
    // Figma Shadow/Shadow-3
    boxShadow: shadow[3],
    cursor: disabled ? "not-allowed" : "pointer",
    appearance: "none",
    WebkitAppearance: "none",
    opacity: disabled ? 0.5 : 1,
    ["--wds-focus-ring" as string]:
      variant === "primary"
        ? "rgba(24, 161, 154, 0.5)"
        : "rgba(51, 52, 56, 0.4)",
    ...styleProp,
  };

  const iconStyle: CSSProperties = {
    display: "inline-flex",
    width: 24,
    height: 24,
    flexShrink: 0,
    color: fg,
  };

  return (
    <button
      type="button"
      disabled={disabled}
      aria-disabled={disabled || undefined}
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
