import type { CSSProperties, ReactNode } from "react";
import { color, padding, radius, typography } from "@wds/tokens";

/**
 * WDS Badge — small status / category pill.
 *
 * Figma: Components / Badge (node `3001:20108`, catalogued under
 * Accordion `5015:34536`)
 * "상태, 카테고리, 알림 등을 강조하는 작은 시각적 요소입니다."
 *
 * Base Figma spec (Fill / Default / Small):
 *   - bg-50 fill, xs / Medium / line-16px type, label.normal color
 *   - px-8 py-4, radius-m (20px) pill
 *   - optional 16px left glyph
 *
 * Extended beyond Figma with a simple `tone` switch because the host
 * app frequently needs primary / status-colored badges next to titles.
 */

export type BadgeTone = "neutral" | "primary" | "success" | "warning" | "error";

export interface BadgeProps {
  children: ReactNode;
  leftIcon?: ReactNode;
  tone?: BadgeTone;
  className?: string;
  style?: CSSProperties;
}

function resolveTone(tone: BadgeTone) {
  switch (tone) {
    case "primary": return { bg: color.primary.light,          fg: color.primary.normal };
    case "success": return { bg: color.primary.light,          fg: color.status.success };
    case "warning": return { bg: "#FFF4E5",                    fg: color.status.warning };
    case "error":   return { bg: "#FDECEC",                    fg: color.status.error };
    case "neutral":
    default:        return { bg: color.background["bg-50"],    fg: color.label.normal };
  }
}

export function Badge({
  children,
  leftIcon,
  tone = "neutral",
  className,
  style: styleProp,
}: BadgeProps) {
  const pal = resolveTone(tone);
  const style: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    paddingBlock: padding.xxs,      //  4
    paddingInline: padding.xs,      //  8
    borderRadius: radius.m,         // 20
    background: pal.bg,
    color: pal.fg,
    fontFamily: typography.fontFamily,
    fontSize: typography.size.xs,
    lineHeight: "16px",
    fontWeight: typography.weight.M,
    letterSpacing: typography.letterSpacing,
    whiteSpace: "nowrap",
    ...styleProp,
  };
  return (
    <span className={className} style={style}>
      {leftIcon && (
        <span
          aria-hidden
          style={{
            display: "inline-flex",
            width: 16,
            height: 16,
            flexShrink: 0,
            alignItems: "center",
            justifyContent: "center",
            color: "currentColor",
          }}
        >
          {leftIcon}
        </span>
      )}
      {children}
    </span>
  );
}
