import type { CSSProperties, ReactNode, ButtonHTMLAttributes } from "react";
import { color, margin, radius, typography } from "@wds/tokens";

/**
 * WDS Social Login Button — brand-stamped authentication control.
 *
 * Figma: Components / Social login (node `5015:28836`)
 * "구글, 네이버, 애플 등 다양한 소셜 로그인 버튼입니다."
 *
 * One brand per button. Chrome (background, border, text color, and
 * default Korean label) is prescribed by each vendor's brand guide;
 * WDS aliases are used for the neutral variants (Google/Apple) and
 * brand-literal hex values for the vendor-colored variants (Kakao,
 * Naver), each annotated with the reason. The icon must be supplied
 * by the caller so @wds/ui stays icon-library-agnostic.
 */

export type SocialBrand = "google" | "apple" | "kakao" | "naver";

export interface SocialButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "disabled"> {
  brand: SocialBrand;
  /**
   * The brand icon, 24×24. Supplied by the consumer (official press-kit
   * SVG) so @wds/ui doesn't ship vendor logos in its bundle.
   */
  icon: ReactNode;
  /** Override the default Korean label for this brand. */
  children?: ReactNode;
  disabled?: boolean;
  /** Size the button by content instead of filling the parent. */
  inline?: boolean;
}

/* ── Brand chrome (from Figma) ───────────────────────────────────── */

/**
 * Brand-prescribed chrome. Kakao yellow (#FAE100) and Naver green
 * (#00D03F) are official brand color hex values (not part of the WDS
 * palette) — they are the single exception to the "aliases only" rule
 * because each vendor's brand guide mandates these exact colors.
 */
function brandChrome(brand: SocialBrand): {
  bg: string;
  fg: string;
  border: string;
} {
  switch (brand) {
    case "google":
    case "apple":
      return {
        bg:     color.background["bg-white"],
        fg:     color.label.strong,
        border: color.line.normal,
      };
    case "kakao":
      return {
        bg:     "#FAE100", // Kakao brand yellow — mandated by Kakao design guide.
        fg:     color.label.strong,
        border: "transparent",
      };
    case "naver":
      return {
        bg:     "#00D03F", // Naver brand green — mandated by Naver design guide.
        fg:     color.label.white,
        border: "transparent",
      };
  }
}

const DEFAULT_LABEL: Record<SocialBrand, string> = {
  google: "구글로 로그인",
  apple:  "Apple로 로그인",
  kakao:  "카카오로 3초만에 시작하기",
  naver:  "네이버로 로그인",
};

/* ── Component ───────────────────────────────────────────────────── */

export function SocialButton({
  brand,
  icon,
  children,
  disabled = false,
  inline = false,
  className,
  style: styleProp,
  ...rest
}: SocialButtonProps) {
  const pal = brandChrome(brand);

  const style: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: margin.s, // 8px between icon and label
    position: "relative",
    width: inline ? undefined : "100%",
    // Figma uses `height: 56`. We use minHeight so 3-tier typography
    // doesn't clip text on 크게 / 더 크게.
    minHeight: 56,
    paddingBlock: 16,
    paddingInline: 16,
    // shape — Figma: radius-xs (8px)
    borderRadius: radius.xs,
    border: `1px solid ${pal.border}`,
    // chrome
    backgroundColor: pal.bg,
    color: pal.fg,
    // type — Figma: Button L = md / line-height md / weight B
    fontFamily: typography.fontFamily,
    fontSize: typography.size.md,
    lineHeight: typography.lineHeight.md,
    fontWeight: typography.weight.B,
    letterSpacing: typography.letterSpacing,
    cursor: disabled ? "not-allowed" : "pointer",
    appearance: "none",
    WebkitAppearance: "none",
    // Focus ring hookup — neutral halo on white surfaces, white halo on
    // brand-colored surfaces so the ring stays visible on the fill.
    ["--wds-focus-ring" as string]:
      brand === "kakao" || brand === "naver"
        ? "rgba(0, 0, 0, 0.25)"
        : "rgba(51, 52, 56, 0.4)",
    ...styleProp,
  };

  const iconStyle: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    // Figma: left 15-16px, vertically centered.
    left: 16,
    top: "50%",
    transform: "translateY(-50%)",
    width: 24,
    height: 24,
    flexShrink: 0,
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
      <span>{children ?? DEFAULT_LABEL[brand]}</span>
    </button>
  );
}
