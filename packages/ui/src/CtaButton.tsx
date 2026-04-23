import type { CSSProperties, ReactNode, ButtonHTMLAttributes } from "react";
import { color, radius, typography } from "@wds/tokens";

/**
 * WDS CTA Button — product-specific call-to-action used on the Wooriga
 * home surface.
 *
 * Figma: Components / 우리가 홈_ETC Button / Cta (catalogued under `20995:786`)
 *
 * Two variants:
 *   mobile  — gradient-green fill with glossy highlight + branded drop shadow,
 *             white label. Used as the primary mobile chat entry point.
 *   desktop — green-tinted fill (#rgba 24,161,154,0.16) with `primary.strong`
 *             label. Used as the "더보기" affordance on the web recommended
 *             posts surface.
 *
 * Sizing is intentionally not tokenized here — CTA buttons live inside a
 * fixed-layout hero and the Figma spec is absolute.
 */

export type CtaVariant = "mobile" | "desktop";

export interface CtaButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "disabled"> {
  variant?: CtaVariant;
  leadingIcon?: ReactNode;
  children: ReactNode;
  disabled?: boolean;
}

/** Figma: MO_CHAT gradient — pale highlight over brand green. */
const MOBILE_GRADIENT =
  `linear-gradient(84.9deg, rgba(255, 255, 255, 0.24) 1%, rgba(255, 255, 255, 0) 40%), ` +
  `linear-gradient(90deg, ${color.primary.normal} 0%, ${color.primary.normal} 100%)`;

/** Figma: MO_CHAT drop shadow — branded green elevation. */
const MOBILE_SHADOW = "0 4px 8px 0 rgba(24, 161, 154, 0.2)";

/** Figma: PC_추천글 fill — 16% brand alpha, not aliased. */
const DESKTOP_FILL = "rgba(24, 161, 154, 0.16)";

export function CtaButton({
  variant = "mobile",
  leadingIcon,
  children,
  disabled = false,
  className,
  style: styleProp,
  ...rest
}: CtaButtonProps) {
  const isMobile = variant === "mobile";

  const style: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
    minHeight: 48,                    // Figma: h-[48px] — min so text can grow
    paddingBlock: 14,                 // Figma: `py-[14px]`
    paddingInline: 16,                // Figma: `px-[16px]`
    borderRadius: radius.s,           // 12px, Figma: `rounded-[12px]`
    border: isMobile
      ? "1px solid transparent"
      : `1px solid ${DESKTOP_FILL}`,
    backgroundImage: isMobile ? MOBILE_GRADIENT : undefined,
    backgroundColor: isMobile ? color.primary.normal : DESKTOP_FILL,
    color: isMobile ? color.label.white : color.primary.strong,
    boxShadow: isMobile ? MOBILE_SHADOW : undefined,
    fontFamily: typography.fontFamily,
    fontSize: typography.size.md,
    lineHeight: typography.lineHeight.md,
    fontWeight: typography.weight.B,
    letterSpacing: typography.letterSpacing,
    cursor: disabled ? "not-allowed" : "pointer",
    appearance: "none",
    WebkitAppearance: "none",
    opacity: disabled ? 0.5 : 1,
    ["--wds-focus-ring" as string]: "rgba(24, 161, 154, 0.5)",
    ...styleProp,
  };

  const iconStyle: CSSProperties = {
    display: "inline-flex",
    width: 20,
    height: 20,
    flexShrink: 0,
    color: "currentColor",
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
