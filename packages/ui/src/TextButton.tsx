import type { CSSProperties, ReactNode, ButtonHTMLAttributes } from "react";
import { color, typography } from "@wds/tokens";

export interface TextButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "disabled"> {
  children: ReactNode;
  disabled?: boolean;
  /** Visual weight. Defaults to `subtle` (small gray underlined link). */
  tone?: "subtle" | "brand";
  /**
   * Font size. Defaults to `sm` (14 at 일반보기). Use `md` for body-sized
   * CTAs like "더 보기" embedded in a content block.
   */
  size?: "sm" | "md";
}

/**
 * WDS Text Button — inline underlined text action.
 *
 * Figma: Components / Button-fixed (node `5015:29032`) — inner text_btn
 * "나중에 할게요" pattern at gray-600, Pretendard Regular, border-bottom
 * as the underline.
 *
 * Use for minor / escape-hatch actions that should stay visually
 * subordinate to block buttons (e.g. "나중에 할게요", "건너뛰기"). For
 * brand-colored emphasis links (e.g. "비밀번호 찾기"), pass `tone="brand"`.
 */
export function TextButton({
  children,
  disabled = false,
  tone = "subtle",
  size = "sm",
  className,
  style: styleProp,
  ...rest
}: TextButtonProps) {
  const isSubtle = tone === "subtle";
  const isSm = size === "sm";

  const fg = isSubtle
    ? color.label.alternative            // gray-700 neighborhood
    : color.primary.normal;              // brand green

  const style: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    paddingBlock: 2,
    // No left/right padding — the border-bottom should hug the text.
    background: "transparent",
    border: "none",
    borderBottom: `1px solid currentColor`,
    color: fg,
    // type — sm = 14px, md = 16px, both regular weight per Figma
    fontFamily: typography.fontFamily,
    fontSize: isSm ? typography.size.sm : typography.size.md,
    lineHeight: isSm ? typography.lineHeight.sm : typography.lineHeight.md,
    fontWeight: typography.weight.R,
    letterSpacing: typography.letterSpacing,
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
    appearance: "none",
    WebkitAppearance: "none",
    // Focus ring — thin halo that hugs the underline edge
    ["--wds-focus-ring" as string]:
      isSubtle ? "rgba(51, 52, 56, 0.35)" : "rgba(24, 161, 154, 0.5)",
    ...styleProp,
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
      {children}
    </button>
  );
}
