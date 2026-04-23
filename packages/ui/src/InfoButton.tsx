import type { CSSProperties, ReactNode, ButtonHTMLAttributes } from "react";
import { padding, radius, typography } from "@wds/tokens";

/**
 * WDS Info Button — purple accent confirm button used in info callouts.
 *
 * Figma: Components / 우리가 홈_ETC Button / Info-Button (node `22200:320`,
 * catalogued under `20995:786`)
 *
 * Purple purple-600 fill with white bold sm text; compact (py-8 / px-10),
 * 8px radius. Used on info/notice overlays where the CTA is informational
 * rather than primary.
 */

export interface InfoButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "disabled"> {
  children: ReactNode;
  disabled?: boolean;
}

/** Primitive purple-600 — Figma `purple/purple-600`, not aliased in V2. */
const PURPLE_600 = "#4A54E1";

export function InfoButton({
  children,
  disabled = false,
  className,
  style: styleProp,
  ...rest
}: InfoButtonProps) {
  const style: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
    paddingBlock: padding.xs,          //  8
    paddingInline: 10,                  // Figma: `px-[10px]` — not an aliased step
    borderRadius: radius.xs,            //  8
    border: "1px solid transparent",
    backgroundColor: PURPLE_600,
    color: "#FFFFFF",
    fontFamily: typography.fontFamily,
    fontSize: typography.size.sm,
    lineHeight: "16px",                 // Figma: `leading-[16px]`
    fontWeight: typography.weight.B,
    letterSpacing: typography.letterSpacing,
    cursor: disabled ? "not-allowed" : "pointer",
    appearance: "none",
    WebkitAppearance: "none",
    opacity: disabled ? 0.5 : 1,
    ["--wds-focus-ring" as string]: "rgba(74, 84, 225, 0.45)",
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
