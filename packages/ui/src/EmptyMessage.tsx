import type { CSSProperties, ReactNode } from "react";
import { color, margin, padding, typography } from "@wds/tokens";

/**
 * WDS Empty Message — placeholder state with illustration + guidance.
 *
 * Figma: Components / Empty-message (node `21474:3298`)
 * "콘텐츠가 없을 때 사용자에게 안내 메시지를 제공하는 컴포넌트입니다."
 *
 * Layout:
 *   - 96px graphic slot centered at the top
 *   - Title (xl / Bold / line-height-xl / label.neutral)
 *   - Description (lg / Regular / line-height-xl / label.neutral)
 *   - Optional footnote below (md / Semibold / primary.strong) — mirrors
 *     Figma's `점검시간` variant which adds a scheduled-maintenance time.
 *
 * The DS does NOT ship the 16 `Empty-graphic` illustrations themselves.
 * Consumers pass an SVG/img via the `graphic` slot — keeping the bundle
 * lean and letting brand marketing own the illustrations.
 */

export interface EmptyMessageProps {
  /** 96×96 illustration slot. */
  graphic: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  /** Brand-tinted footnote under the description (optional). */
  footnote?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export function EmptyMessage({
  graphic,
  title,
  description,
  footnote,
  className,
  style: styleProp,
}: EmptyMessageProps) {
  const wrap: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: footnote ? margin.l : margin.m,      // 24 vs 16
    width: "100%",
    padding: padding.m,
    fontFamily: typography.fontFamily,
    ...styleProp,
  };

  const cluster: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: footnote ? 16 : margin.m,
    width: "100%",
  };

  const graphicSlot: CSSProperties = {
    display: "inline-flex",
    width: 96,
    height: 96,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  };

  const textStack: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: margin.xs,
    color: color.label.neutral,
    textAlign: "center",
    width: "100%",
    lineHeight: typography.lineHeight.xl,
  };

  const titleStyle: CSSProperties = {
    margin: 0,
    fontSize: typography.size.xl,
    fontWeight: typography.weight.B,
    letterSpacing: typography.letterSpacing,
    width: "100%",
  };

  const descStyle: CSSProperties = {
    margin: 0,
    fontSize: typography.size.lg,
    fontWeight: typography.weight.R,
    width: "100%",
  };

  const footnoteStyle: CSSProperties = {
    margin: 0,
    fontSize: typography.size.md,
    lineHeight: typography.lineHeight.md,
    fontWeight: typography.weight.SB,
    color: color.primary.strong,
    textAlign: "center",
    width: "100%",
  };

  return (
    <div className={className} style={wrap}>
      <div style={cluster}>
        <span style={graphicSlot}>{graphic}</span>
        <div style={textStack}>
          <p style={titleStyle}>{title}</p>
          {description && <p style={descStyle}>{description}</p>}
        </div>
      </div>
      {footnote && <p style={footnoteStyle}>{footnote}</p>}
    </div>
  );
}
