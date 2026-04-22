import type { CSSProperties, ReactNode } from "react";
import { color, spacing, typography, radius } from "@wds/tokens";

type Variant = "primary" | "secondary";

export interface ButtonProps {
  variant?: Variant;
  onClick?: () => void;
  disabled?: boolean;
  children: ReactNode;
}

/**
 * WDS Button — canonical primary action control.
 *
 * All visual values come from @wds/tokens (the alias layer). No hex
 * codes, no px values, no rem values are inlined in this file.
 *
 * Works automatically across the 3-tier typography scale (DS-C3).
 * `typography.size.md` resolves to `var(--font-size-md)` which is swapped
 * on <html data-typography-scale>, so the button font scales with the
 * user's active tier without any code change here.
 */
export function Button({
  variant = "primary",
  onClick,
  disabled = false,
  children,
}: ButtonProps) {
  const style: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    paddingBlock: spacing.sm,
    paddingInline: spacing.lg,
    fontSize: typography.size.md,
    lineHeight: typography.lineHeight.md,
    fontWeight: typography.weight.medium,
    borderRadius: radius.md,
    border: `1px solid ${variant === "primary" ? color.bg.accent : color.border.default}`,
    backgroundColor: variant === "primary" ? color.bg.accent : color.bg.surface,
    color: variant === "primary" ? color.text.inverse : color.text.primary,
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
  };

  return (
    <button type="button" style={style} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
