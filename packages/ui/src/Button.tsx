import type { CSSProperties, ReactNode } from "react";
import { color, padding, radius, typography } from "@wds/tokens";

type Variant = "primary" | "secondary";

export interface ButtonProps {
  variant?: Variant;
  onClick?: () => void;
  disabled?: boolean;
  children: ReactNode;
}

/**
 * WDS Button — canonical action control.
 *
 * Every visual value comes from @wds/tokens (the alias layer). No hex,
 * no px, no rem are inlined in this file. Primary variant uses the
 * brand `color.primary` palette (green in WDS). Secondary uses a
 * neutral surface with a line border.
 *
 * Works across the 3-tier typography scale (DS-C3) automatically:
 * `typography.size.md` and `typography.lineHeight.md` are CSS custom
 * properties that the root swaps per tier (see @wds/tokens/scale.css).
 */
export function Button({
  variant = "primary",
  onClick,
  disabled = false,
  children,
}: ButtonProps) {
  const isPrimary = variant === "primary";

  const style: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    paddingBlock: padding.xs,
    paddingInline: padding.l,
    fontFamily: typography.fontFamily,
    fontSize: typography.size.md,
    lineHeight: typography.lineHeight.md,
    fontWeight: typography.weight.M,
    letterSpacing: typography.letterSpacing,
    borderRadius: radius.m,
    border: `1px solid ${isPrimary ? color.primary.normal : color.line.normal}`,
    backgroundColor: isPrimary
      ? color.primary.normal
      : color.background["bg-white"],
    color: isPrimary ? color.label.white : color.label.normal,
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
  };

  return (
    <button type="button" style={style} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
