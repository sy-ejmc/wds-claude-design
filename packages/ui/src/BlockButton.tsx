import type { CSSProperties, ReactNode, ButtonHTMLAttributes } from "react";
import { color, radius, typography } from "@wds/tokens";

/**
 * WDS Block Button — primary action control.
 *
 * Figma: `Button / Block-Button` (node 3001:19498 and siblings)
 * Variants × States × Sizes matrix, all tokens resolved from @wds/tokens:
 *
 *   variants   Primary · Secondary · Neutral
 *   states     default · outline · disabled
 *   sizes      L(56) · M(36) · S(32) · XS(28)
 *
 * Block buttons fill their container by default (width:100%); pass
 * `inline` to opt out and size by content.
 */

export type ButtonVariant = "primary" | "secondary" | "neutral";
export type ButtonState   = "default" | "outline" | "disabled";
export type ButtonSize    = "L" | "M" | "S" | "XS";

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

/* ── Spec tables ─────────────────────────────────────────────────── */

const sizeSpec: Record<ButtonSize, {
  height: number;
  padX: number;
  gap: number;
  iconSize: number;
  fontSize: string;
  lineHeight: string;
}> = {
  L:  { height: 56, padX: 16, gap: 4, iconSize: 24, fontSize: typography.size.md,  lineHeight: typography.lineHeight.md  },
  M:  { height: 36, padX: 12, gap: 4, iconSize: 16, fontSize: typography.size.sm,  lineHeight: typography.lineHeight.sm  },
  S:  { height: 32, padX: 8,  gap: 2, iconSize: 16, fontSize: typography.size.sm,  lineHeight: typography.lineHeight.xs  },
  XS: { height: 28, padX: 6,  gap: 2, iconSize: 14, fontSize: typography.size.sm,  lineHeight: typography.lineHeight.xs  },
};

function resolveColors(variant: ButtonVariant, state: ButtonState) {
  // Disabled overrides variant chrome
  if (state === "disabled") {
    return {
      bg:     color.interaction.disable,      // #F3F4F5
      fg:     color.label.disable,            // #B0B3BA
      border: "transparent",
    };
  }

  if (variant === "primary") {
    if (state === "outline") {
      return {
        bg:     color.background["bg-white"], // #FFF
        fg:     color.primary.strong,         // #18A19A
        border: color.primary.strong,
      };
    }
    return {
      bg:     color.primary.strong,
      fg:     color.label.white,
      border: "transparent",
    };
  }

  if (variant === "secondary") {
    // Secondary has no outline state in Figma — fallthrough to default.
    return {
      bg:     color.primary.alternative,      // #EEF7F6
      fg:     color.primary.heavy,            // #168B88
      border: "transparent",
    };
  }

  // neutral
  if (state === "outline") {
    return {
      bg:     color.background["bg-white"],
      fg:     color.label.strong,             // #444
      border: color.line.normal,              // #EEEFF1
    };
  }
  return {
    bg:     color.interaction.inactive,       // #F3F4F5
    fg:     color.label.strong,
    border: color.line.normal,
  };
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
  style: styleProp,
  ...rest
}: BlockButtonProps) {
  const spec = sizeSpec[size];
  const pal  = resolveColors(variant, state);
  const isDisabled = state === "disabled";

  const style: CSSProperties = {
    // layout
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: spec.gap,
    width: inline ? undefined : "100%",
    height: spec.height,
    paddingInline: spec.padX,
    // shape
    borderRadius: radius.s, // 8
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
    userSelect: "none",
    // kill the native button chrome
    appearance: "none",
    WebkitAppearance: "none",
    ...styleProp,
  };

  const iconStyle: CSSProperties = {
    display: "inline-flex",
    width: spec.iconSize,
    height: spec.iconSize,
    flexShrink: 0,
    color: pal.fg,
  };

  return (
    <button
      type="button"
      disabled={isDisabled}
      aria-disabled={isDisabled || undefined}
      style={style}
      {...rest}
    >
      {leadingIcon  && <span style={iconStyle} aria-hidden>{leadingIcon}</span>}
      <span>{children}</span>
      {trailingIcon && <span style={iconStyle} aria-hidden>{trailingIcon}</span>}
    </button>
  );
}

/** Legacy alias — earlier exports of <Button/> map to BlockButton. */
export { BlockButton as Button };
