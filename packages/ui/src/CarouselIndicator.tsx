import type { CSSProperties, ReactNode } from "react";
import { color, typography } from "@wds/tokens";

/**
 * WDS Carousel Indicator — page position marker for a slideshow / banner.
 *
 * Figma: Components / carousel-indicator (node `7022:29271`)
 * "Carousel Indicator는 배너, 이미지 슬라이드, 광고 등의 콘텐츠를 페이지
 *  단위로 구분하고 현재 위치를 표시하는 UI 요소입니다."
 *
 * Matrix (Figma):
 *   type   bar          — 3×40px rectangles
 *          circle       — 8px dots
 *          activeLine   — 8px dots with active cell stretched to 32×8
 *          numeric      — "{n} / {total}" badge with blurred dark bg
 *
 *   theme  color        — brand green active, black-20 inactive
 *          dark         — black active, black-20 inactive
 *          light        — white active, white-20 inactive
 *
 * Figma's demo shows a 4-cell indicator. Our component accepts `total`
 * and `active` so it renders N cells, with the "active" cell styled
 * per type/theme and the rest at 20% opacity of the active color.
 */

export type CarouselIndicatorType = "bar" | "circle" | "activeLine" | "numeric";
export type CarouselIndicatorTheme = "color" | "dark" | "light";

export interface CarouselIndicatorProps {
  type?: CarouselIndicatorType;
  theme?: CarouselIndicatorTheme;
  /** Total number of slides. */
  total: number;
  /** 0-indexed active slide. */
  active: number;
  /** Show a trailing "+" affordance inside the numeric pill. */
  plusAddon?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

function activeColor(theme: CarouselIndicatorTheme) {
  switch (theme) {
    case "color": return color.primary.normal;
    case "dark":  return color.label.strong;   // #000
    case "light": return color.label.white;    // #fff
  }
}

export function CarouselIndicator({
  type = "bar",
  theme = "color",
  total,
  active,
  plusAddon,
  className,
  style: styleProp,
}: CarouselIndicatorProps) {
  const fg = activeColor(theme);

  if (type === "numeric") {
    const wrap: CSSProperties = {
      display: "inline-flex",
      alignItems: "center",
      gap: 4,
      padding: 8,
      borderRadius: 8,
      background: "rgba(0,0,0,0.5)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      color: color.label.white,
      fontFamily: typography.fontFamily,
      fontSize: typography.size.xs,
      lineHeight: "16px",
      fontWeight: typography.weight.M,
      letterSpacing: typography.letterSpacing,
      ...styleProp,
    };
    return (
      <span className={className} style={wrap}>
        <span>
          {Math.min(active + 1, total)} / {total}
        </span>
        {plusAddon && <span style={{ display: "inline-flex", width: 16, height: 16 }}>{plusAddon}</span>}
      </span>
    );
  }

  const row: CSSProperties = {
    display: "inline-flex",
    alignItems: "flex-start",
    gap: 8,
    ...styleProp,
  };

  const cells = Array.from({ length: total }, (_, i) => i);

  function cellStyle(i: number): CSSProperties {
    const isActive = i === active;
    if (type === "bar") {
      return {
        width: 40,
        height: 3,
        background: fg,
        opacity: isActive ? 1 : 0.2,
        flexShrink: 0,
      };
    }
    if (type === "circle") {
      return {
        width: 8,
        height: 8,
        borderRadius: "50%",
        background: fg,
        opacity: isActive ? 1 : 0.2,
        flexShrink: 0,
      };
    }
    // activeLine — active cell expands into a pill, inactive stays 8×8 dot
    if (isActive) {
      return {
        width: 32,
        height: 8,
        borderRadius: 999,
        background: fg,
        flexShrink: 0,
      };
    }
    return {
      width: 8,
      height: 8,
      borderRadius: "50%",
      background: fg,
      opacity: 0.2,
      flexShrink: 0,
    };
  }

  return (
    <span
      className={className}
      style={row}
      role="tablist"
      aria-label="Carousel pagination"
    >
      {cells.map((i) => (
        <span
          key={i}
          role="tab"
          aria-selected={i === active}
          style={cellStyle(i)}
        />
      ))}
    </span>
  );
}
