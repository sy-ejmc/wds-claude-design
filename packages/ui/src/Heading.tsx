import type { CSSProperties, ReactNode } from "react";
import { color as colorTokens, typography } from "@wds/tokens";

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
type TypographySize = keyof typeof typography.size;

/**
 * Level → token size mapping. Chosen so the semantic hierarchy (h1
 * largest, h6 smallest) lines up with the Figma type scale. `lg`
 * serves as the floor for h6 to avoid collapsing into body text.
 */
const LEVEL_TO_SIZE: Record<HeadingLevel, TypographySize> = {
  1: "5xl",
  2: "4xl",
  3: "3xl",
  4: "2xl",
  5: "xl",
  6: "lg",
};

export interface HeadingProps {
  /** Semantic level (1-6). Controls the rendered tag *and* the default size. */
  level?: HeadingLevel;
  /** Override the visual size without changing the semantic tag. */
  size?: TypographySize;
  /** Explicit color from `color.label.*`. Defaults to `label.strong`. */
  color?: string;
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
}

/**
 * WDS Heading — semantic h1–h6 wrapper that reads sizes from tokens.
 * Weight is always `B` (Bold, 700); line-height tracks the size tier.
 */
export function Heading({
  level = 2,
  size,
  color,
  children,
  style,
  className,
}: HeadingProps) {
  const Tag = (`h${level}` as unknown) as keyof JSX.IntrinsicElements;
  const sizeKey = size ?? LEVEL_TO_SIZE[level];

  const composed: CSSProperties = {
    margin: 0,
    fontFamily: typography.fontFamily,
    fontSize: typography.size[sizeKey],
    lineHeight: typography.lineHeight[sizeKey as keyof typeof typography.lineHeight] ?? typography.lineHeight.md,
    fontWeight: typography.weight.B,
    letterSpacing: typography.letterSpacing,
    color: color ?? colorTokens.label.strong,
    ...style,
  };

  return (
    <Tag className={className} style={composed}>
      {children}
    </Tag>
  );
}
