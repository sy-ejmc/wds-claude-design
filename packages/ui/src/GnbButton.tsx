import type { CSSProperties, ReactNode, ButtonHTMLAttributes } from "react";
import { color, margin, padding, typography } from "@wds/tokens";

/**
 * WDS GNB Button — pill-shaped header nav action.
 *
 * Figma: Components / 우리가 홈_ETC Button / GnbBtn (catalogued under `20995:786`)
 *
 * Three published variants:
 *   login   — fill/alternative background, neutral label
 *   logout  — white background, assistive hairline border
 *   search  — primary/light tinted fill, primary/normal label (icon expected)
 *
 * All share: 8/16 padding, 34px radius pill, sm/sb/line-height-sm type.
 */

export type GnbButtonVariant = "login" | "logout" | "search";

export interface GnbButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "disabled"> {
  variant?: GnbButtonVariant;
  /** 18×18 glyph, typically provided alongside `variant="search"`. */
  leadingIcon?: ReactNode;
  children: ReactNode;
  disabled?: boolean;
}

function resolveChrome(variant: GnbButtonVariant) {
  if (variant === "search") {
    return {
      bg:     color.primary.light,     // green-100
      fg:     color.primary.normal,
      border: "transparent",
    };
  }
  if (variant === "logout") {
    return {
      bg:     color.background["bg-white"],
      fg:     color.label.neutral,
      border: color.label.assistive,   // gray-400 hairline
    };
  }
  // login
  return {
    bg:     color.fill.alternative,
    fg:     color.label.neutral,
    border: "transparent",
  };
}

export function GnbButton({
  variant = "login",
  leadingIcon,
  children,
  disabled = false,
  className,
  style: styleProp,
  ...rest
}: GnbButtonProps) {
  const pal = resolveChrome(variant);

  const style: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: margin.xs,                     //  4
    paddingBlock: padding.xs,           //  8
    paddingInline: padding.m,           // 16
    // Figma: `rounded-[34px]` — a literal value, not `radius.full`. Kept
    // so the corner arc matches the mock exactly even when the control
    // grows past the arc diameter.
    borderRadius: 34,
    border: `1px solid ${pal.border}`,
    backgroundColor: pal.bg,
    color: pal.fg,
    fontFamily: typography.fontFamily,
    fontSize: typography.size.sm,
    lineHeight: typography.lineHeight.sm,
    fontWeight: typography.weight.SB,
    letterSpacing: typography.letterSpacing,
    cursor: disabled ? "not-allowed" : "pointer",
    appearance: "none",
    WebkitAppearance: "none",
    opacity: disabled ? 0.5 : 1,
    ["--wds-focus-ring" as string]:
      variant === "search"
        ? "rgba(24, 161, 154, 0.5)"
        : "rgba(51, 52, 56, 0.4)",
    ...styleProp,
  };

  const iconStyle: CSSProperties = {
    display: "inline-flex",
    width: 18,
    height: 18,
    flexShrink: 0,
    color: pal.fg,
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
      {leadingIcon && (
        <span style={iconStyle} data-icon-slot aria-hidden>
          {leadingIcon}
        </span>
      )}
      <span>{children}</span>
    </button>
  );
}
