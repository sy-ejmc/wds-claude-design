import type { CSSProperties } from "react";
import { color } from "@wds/tokens";

/**
 * WDS Spinner — data-loading indicator.
 *
 * Figma: Components / Loading-circle (node `3001:20289`)
 * "데이터 로딩 상태를 나타내는 컴포넌트입니다."
 *
 * Figma ships three animation frames (property1=1/2/3) × two sizes
 * (M=48, S=20). This component replaces those frames with a single
 * CSS-animated SVG: a 3/4 track of `primary.normal` with a small
 * trailing dot at the gap. The DS-level `@keyframes wds-spin` lives
 * in `ui.css` and honors `prefers-reduced-motion`.
 *
 * Sizes:
 *   M — 48×48 (default)
 *   S — 20×20
 *
 * Accessibility: renders as `role="status"` with an optional `label`
 * that assistive tech announces; falls back to "Loading" in English
 * / "로딩 중" in Korean if you pass nothing.
 */

export type SpinnerSize = "M" | "S";

export interface SpinnerProps {
  size?: SpinnerSize;
  /** Override the brand tint. */
  tint?: string;
  /** Screen-reader label — defaults to "로딩 중". */
  label?: string;
  className?: string;
  style?: CSSProperties;
}

const sizeSpec = {
  M: { px: 48, stroke: 4.8, dot: 7.2 },
  S: { px: 20, stroke: 2,   dot: 3   },
} as const;

export function Spinner({
  size = "M",
  tint,
  label = "로딩 중",
  className,
  style: styleProp,
}: SpinnerProps) {
  const spec = sizeSpec[size];
  const c = spec.px / 2;
  const r = c - spec.stroke / 2;
  const circumference = 2 * Math.PI * r;
  const stroke = tint ?? color.primary.normal;

  // Leave a 1/4 gap — Figma draws roughly a 270° arc plus a trailing dot.
  const dashLength = circumference * 0.75;
  const gap = circumference - dashLength;

  const wrap: CSSProperties = {
    display: "inline-block",
    width: spec.px,
    height: spec.px,
    flexShrink: 0,
    ...styleProp,
  };

  // Trailing dot sits at the angle where the arc ends (≈ -111° from top).
  // Compute its position so it visually bookends the arc.
  const angle = -111.04 * (Math.PI / 180);
  const dotX = c + r * Math.sin(-angle);
  const dotY = c - r * Math.cos(-angle);

  return (
    <span
      role="status"
      aria-live="polite"
      aria-label={label}
      className={className}
      style={wrap}
    >
      <svg
        className="wds-spinner"
        width={spec.px}
        height={spec.px}
        viewBox={`0 0 ${spec.px} ${spec.px}`}
        aria-hidden
        focusable={false}
      >
        <circle
          cx={c}
          cy={c}
          r={r}
          fill="none"
          stroke={stroke}
          strokeWidth={spec.stroke}
          strokeLinecap="round"
          strokeDasharray={`${dashLength} ${gap}`}
          strokeDashoffset={0}
          opacity={0.2}
        />
        <circle
          cx={c}
          cy={c}
          r={r}
          fill="none"
          stroke={stroke}
          strokeWidth={spec.stroke}
          strokeLinecap="round"
          strokeDasharray={`${dashLength} ${gap}`}
          strokeDashoffset={dashLength * 0.25}
        />
        <circle cx={dotX} cy={dotY} r={spec.dot / 2} fill={stroke} />
      </svg>
    </span>
  );
}
