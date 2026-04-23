import type { CSSProperties } from "react";
import { color } from "@wds/tokens";

/**
 * WDS Separator — row/section divider.
 *
 * Figma: Components / Separator (node `3001:19884`)
 * "리스트나 섹션 사이의 구분선을 나타내는 컴포넌트입니다."
 *
 * Two variants from Figma:
 *   line  — 1px bg-50 hairline (default)
 *   space — 8px bg-50 spacer block, used between distinct sections
 */

export interface SeparatorProps {
  variant?: "line" | "space";
  className?: string;
  style?: CSSProperties;
}

export function Separator({
  variant = "line",
  className,
  style: styleProp,
}: SeparatorProps) {
  const style: CSSProperties = {
    width: "100%",
    height: variant === "space" ? 8 : 1,
    background: color.background["bg-50"],
    flexShrink: 0,
    ...styleProp,
  };
  return (
    <div
      role="separator"
      aria-orientation="horizontal"
      className={className}
      style={style}
    />
  );
}
