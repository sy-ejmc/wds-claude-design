import type { CSSProperties, ReactNode } from "react";
import { color, margin, radius, typography } from "@wds/tokens";

/**
 * WDS Card Layout — image + text card for a content grid.
 *
 * Figma: Components / Card Layouts (node `3001:19150`)
 * "다양한 콘텐츠 유형을 정리할 수 있는 카드형 UI 컴포넌트입니다."
 *
 * Distinct from the generic `Card` surface (pre-MCP) — this is the
 * image-bearing content card Figma ships in four width/density variants:
 *
 *   featured (1단)    — 358 × image-224. md/Bold title, sm/Semibold
 *                       description. Info column is right-aligned.
 *   half (2단)        — 171 × image-138. md/Bold title, xs/Medium caption.
 *   third (3단)       — auto × image-109. md/Bold title, xs/Medium caption.
 *   slide (슬라이드형) — 136 × image-138. sm/Semibold title, sm/Semibold
 *                       description, optional details row underneath.
 *
 * `image` is a ReactNode slot — pass an `<img>`, a figma placeholder,
 * or any hero element. The image wrapper applies the 12px radius and
 * overflow-clip so the caller doesn't need to.
 */

export type CardLayoutVariant = "featured" | "half" | "third" | "slide";

export interface CardLayoutProps {
  variant?: CardLayoutVariant;
  image: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  /** Additional details row under the description (slide variant). */
  details?: ReactNode;
  onClick?: () => void;
  className?: string;
  style?: CSSProperties;
}

const variantSpec = {
  featured: {
    width:  358,
    imgH:   224,
    gap:    margin.m,
    titleSize:  typography.size.md,
    titleWeight: typography.weight.B,
    titleLine:  typography.lineHeight.md,
    titleColor: color.label.strong,
    descSize:   typography.size.sm,
    descWeight: typography.weight.SB,
    descLine:   typography.lineHeight.sm,
    descColor:  color.label.normal,
    infoAlign:  "flex-end" as const,
  },
  half: {
    width:  171,
    imgH:   138,
    gap:    margin.s,
    titleSize:  typography.size.md,
    titleWeight: typography.weight.B,
    titleLine:  typography.lineHeight.md,
    titleColor: color.label.normal,
    descSize:   typography.size.xs,
    descWeight: typography.weight.M,
    descLine:   "16px",
    descColor:  color.label.neutral,
    infoAlign:  "flex-start" as const,
  },
  third: {
    width:  undefined,              // natural (grid-dictated) width
    imgH:   109,
    gap:    margin.s,
    titleSize:  typography.size.md,
    titleWeight: typography.weight.B,
    titleLine:  typography.lineHeight.md,
    titleColor: color.label.normal,
    descSize:   typography.size.xs,
    descWeight: typography.weight.M,
    descLine:   "16px",
    descColor:  color.label.neutral,
    infoAlign:  "flex-start" as const,
  },
  slide: {
    width:  136,
    imgH:   138,
    gap:    margin.s,
    titleSize:  typography.size.sm,
    titleWeight: typography.weight.SB,
    titleLine:  typography.lineHeight.sm,
    titleColor: color.label.normal,
    descSize:   typography.size.sm,
    descWeight: typography.weight.SB,
    descLine:   typography.lineHeight.sm,
    descColor:  color.label.normal,
    infoAlign:  "flex-start" as const,
  },
} as const;

export function CardLayout({
  variant = "featured",
  image,
  title,
  description,
  details,
  onClick,
  className,
  style: styleProp,
}: CardLayoutProps) {
  const spec = variantSpec[variant];

  const outer: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: spec.gap,
    width: spec.width,
    fontFamily: typography.fontFamily,
    cursor: onClick ? "pointer" : "default",
    background: "transparent",
    border: "none",
    padding: 0,
    textAlign: "left",
    ...styleProp,
  };

  const imageBox: CSSProperties = {
    position: "relative",
    overflow: "hidden",
    borderRadius: radius.s,
    flexShrink: 0,
    width: "100%",
    height: spec.imgH,
    background: color.background["bg-100"],
  };

  const info: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: spec.infoAlign,
    gap: margin.xs,
    width: "100%",
    letterSpacing: typography.letterSpacing,
  };

  const titleStyle: CSSProperties = {
    margin: 0,
    fontSize: spec.titleSize,
    lineHeight: spec.titleLine,
    fontWeight: spec.titleWeight,
    color: spec.titleColor,
    width: "100%",
  };

  const descStyle: CSSProperties = {
    margin: 0,
    fontSize: spec.descSize,
    lineHeight: spec.descLine,
    fontWeight: spec.descWeight,
    color: spec.descColor,
    width: "100%",
  };

  const detailsStyle: CSSProperties = {
    margin: 0,
    fontSize: typography.size.xs,
    lineHeight: "16px",
    fontWeight: typography.weight.M,
    color: color.label.neutral,
    width: "100%",
  };

  const Tag = onClick ? "button" : "div";
  return (
    <Tag
      type={onClick ? "button" : undefined}
      onClick={onClick}
      className={[onClick ? "wds-block-button" : undefined, className]
        .filter(Boolean)
        .join(" ")}
      style={outer}
    >
      <div style={imageBox}>{image}</div>
      <div style={info}>
        <p style={titleStyle}>{title}</p>
        {description && <p style={descStyle}>{description}</p>}
        {variant === "slide" && details && <p style={detailsStyle}>{details}</p>}
      </div>
    </Tag>
  );
}
