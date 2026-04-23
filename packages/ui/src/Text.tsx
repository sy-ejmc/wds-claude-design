import type { CSSProperties, ReactNode } from "react";
import { color as colorTokens, typography } from "@wds/tokens";

type TypographySize = keyof typeof typography.size;
type FontWeight = keyof typeof typography.weight;

export interface TextProps {
  /** Semantic tag. `p` by default; `span` for inline usage. */
  as?: "p" | "span" | "div";
  /** Token size. Defaults to `md` (body). */
  size?: TypographySize;
  /** Token weight. Defaults to `R` (Regular, 400). */
  weight?: FontWeight;
  /** Explicit color. Defaults to `color.label.normal`. */
  color?: string;
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
}

/**
 * WDS Text — body copy primitive. Use `size`/`weight` to tune without
 * changing semantics, and `as` to swap the rendered element when the
 * surrounding context demands a `span` or `div`.
 */
export function Text({
  as: Tag = "p",
  size = "md",
  weight = "R",
  color,
  children,
  style,
  className,
}: TextProps) {
  const composed: CSSProperties = {
    margin: 0,
    fontFamily: typography.fontFamily,
    fontSize: typography.size[size],
    lineHeight:
      typography.lineHeight[size as keyof typeof typography.lineHeight] ??
      typography.lineHeight.md,
    fontWeight: typography.weight[weight],
    letterSpacing: typography.letterSpacing,
    color: color ?? colorTokens.label.normal,
    ...style,
  };

  return (
    <Tag className={className} style={composed}>
      {children}
    </Tag>
  );
}
