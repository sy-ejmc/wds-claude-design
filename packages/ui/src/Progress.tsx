import type { CSSProperties } from "react";
import { color } from "@wds/tokens";

/**
 * WDS Progress — linear or circular progress indicator.
 *
 * Figma: Components / linear-progress-indicator (node `3001:20203`)
 * "진행 상황을 시각적으로 나타내는 컴포넌트입니다."
 *
 * Figma publishes 4 discrete steps (25/50/75/100%) for both Line and
 * Circle. We accept a continuous 0–100 `value` and render the arc /
 * fill length dynamically — functionally a superset of the Figma mocks.
 *
 * Variants:
 *   line    — 4px track on a bg-100 rail, 280px default width, fluid.
 *   circle  — 48px ring. Stroke 4.5px, brand green arc on a bg-100 base.
 *
 * Accessibility: `role="progressbar"` with aria-valuenow / valuemin /
 * valuemax. `label` is forwarded as aria-label.
 */

export type ProgressVariant = "line" | "circle";

export interface ProgressProps {
  variant?: ProgressVariant;
  /** 0 to 100. Clamped. */
  value: number;
  /** Brand-override for the fill / arc. Default: `color.primary.normal`. */
  tint?: string;
  /** Line width override. Default 280px for line; ignored for circle. */
  width?: number;
  label?: string;
  className?: string;
  style?: CSSProperties;
}

function clamp(n: number) {
  if (!Number.isFinite(n)) return 0;
  return Math.max(0, Math.min(100, n));
}

export function Progress({
  variant = "line",
  value,
  tint,
  width = 280,
  label,
  className,
  style: styleProp,
}: ProgressProps) {
  const pct = clamp(value);
  const fill = tint ?? color.primary.normal;

  if (variant === "line") {
    const root: CSSProperties = {
      position: "relative",
      width,
      height: 4,
      background: color.background["bg-100"],
      overflow: "hidden",
      ...styleProp,
    };
    const bar: CSSProperties = {
      position: "absolute",
      top: 0,
      left: 0,
      bottom: 0,
      width: `${pct}%`,
      background: fill,
      transition: "width 240ms ease-out",
    };
    return (
      <div
        role="progressbar"
        aria-label={label}
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        className={className}
        style={root}
      >
        <div style={bar} />
      </div>
    );
  }

  // circle
  const size = 48;
  const stroke = 4.5;
  const c = size / 2;
  const r = c - stroke / 2;
  const circumference = 2 * Math.PI * r;
  const dashOffset = circumference * (1 - pct / 100);

  const root: CSSProperties = {
    display: "inline-block",
    width: size,
    height: size,
    flexShrink: 0,
    ...styleProp,
  };

  return (
    <span
      role="progressbar"
      aria-label={label}
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
      className={className}
      style={root}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        aria-hidden
        focusable={false}
      >
        <circle
          cx={c}
          cy={c}
          r={r}
          fill="none"
          stroke={color.background["bg-100"]}
          strokeWidth={stroke}
        />
        <circle
          cx={c}
          cy={c}
          r={r}
          fill="none"
          stroke={fill}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          style={{
            transform: "rotate(-90deg)",
            transformOrigin: "50% 50%",
            transition: "stroke-dashoffset 240ms ease-out",
          }}
        />
      </svg>
    </span>
  );
}
