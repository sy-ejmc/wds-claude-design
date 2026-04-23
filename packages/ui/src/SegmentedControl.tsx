import type { CSSProperties, ReactNode, ButtonHTMLAttributes } from "react";
import { color, margin, padding, radius, typography } from "@wds/tokens";

/**
 * WDS Segmented Control — single-selection cell inside a segmented group.
 *
 * Figma: Components / Segmented Control (node `20820:2068`)
 * "다중 선택(Checkbox) 또는 단일 선택(Radio Button) 방식의 입력값을 받을 수 있는 컴포넌트입니다."
 *
 * One cell. Group layout (row vs. column, wrapping) is the consumer's
 * responsibility — this component only renders an individual segment.
 *
 * Matrix from Figma:
 *   size   L (16px inset, two-line)
 *          M (Figma "Small": 56px fixed, single-line)
 *          S (Figma "X-Small": 8px inset, single-line, sm type)
 *   state  default · active · inactive
 *   radio  shows the 24px radio indicator to the left of the label
 *
 * Figma's size labels (Large/Small/X-Small) are renamed here to the
 * WDS size language (L/M/S) used by the rest of the button family for
 * cross-component consistency.
 */

export type SegmentedControlSize  = "L" | "M" | "S";
export type SegmentedControlState = "default" | "active" | "inactive";

export interface SegmentedControlProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "disabled"> {
  size?: SegmentedControlSize;
  state?: SegmentedControlState;
  /** Show the 24px radio indicator. Default: true. */
  radio?: boolean;
  label: ReactNode;
  /** Only rendered for size="L". */
  description?: ReactNode;
  disabled?: boolean;
}

/* ── Chrome resolver (from Figma) ───────────────────────────────────── */

function resolveChrome(state: SegmentedControlState) {
  if (state === "active") {
    return {
      bg:     color.background["bg-white"],
      border: color.primary.normal,
      label:  color.primary.normal,   // Figma uses a near-primary tint (#29978d / #18a19a); brand normal is the closest aliased value
    };
  }
  if (state === "inactive") {
    return {
      bg:     color.fill.normal,      // Figma: `fill/nomal`
      border: color.line.normal,
      label:  color.label.neutral,
    };
  }
  // default
  return {
    bg:     color.background["bg-white"],
    border: color.line.normal,
    label:  color.label.neutral,
  };
}

/* ── Radio indicator ────────────────────────────────────────────────── */

/** Primitive alpha-colors/neutralA-20 — not aliased in V2. */
const RADIO_BORDER = "rgba(0, 0, 0, 0.2)";

function RadioDot({ active }: { active: boolean }) {
  if (active) {
    // Active: 24px primary-normal fill with primary-light hairline, 10px white inner dot.
    return (
      <span
        aria-hidden
        style={{
          position: "relative",
          display: "inline-block",
          width: 24,
          height: 24,
          flexShrink: 0,
          borderRadius: "50%",
          background: color.primary.normal,
          border: `1px solid ${color.primary.light}`,
        }}
      >
        <span
          style={{
            position: "absolute",
            top: 6,
            left: 6,
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: color.label.white,
          }}
        />
      </span>
    );
  }
  // Inactive
  return (
    <span
      aria-hidden
      style={{
        display: "inline-block",
        width: 24,
        height: 24,
        flexShrink: 0,
        borderRadius: "50%",
        background: color.background["bg-50"],
        border: `1px solid ${RADIO_BORDER}`,
      }}
    />
  );
}

/* ── Size spec (from Figma) ─────────────────────────────────────────── */

const sizeSpec = {
  // Figma "Large": 16px inset box, two-line (label row + description row).
  L: {
    padX: padding.m,           // 16
    padY: padding.m,           // 16
    fontSize:   typography.size.md,
    lineHeight: typography.lineHeight.md,
    descSize:   typography.size.sm,
    descLine:   typography.lineHeight.md, // Figma description uses `line-height-md` at sm size
  },
  // Figma "Small": fixed 175×56, centered, single-line.
  M: {
    padX: padding.xs,          //  8
    padY: padding.m,           // 16
    fontSize:   typography.size.md,
    lineHeight: typography.lineHeight.md,
  },
  // Figma "X-Small": 8px inset, single-line, sm type.
  S: {
    padX: padding.xs,          // 8
    padY: margin.s,            // 8
    fontSize:   typography.size.sm,
    lineHeight: typography.lineHeight.sm,
  },
} as const;

/* ── Component ──────────────────────────────────────────────────────── */

export function SegmentedControl({
  size = "M",
  state = "default",
  radio = true,
  label,
  description,
  disabled = false,
  className,
  style: styleProp,
  ...rest
}: SegmentedControlProps) {
  const spec = sizeSpec[size];
  const pal  = resolveChrome(state);

  const style: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: size === "L" ? "flex-start" : "center",
    gap: margin.xs, // 4 — Figma: `gap-[4px]`
    paddingBlock: spec.padY,
    paddingInline: spec.padX,
    // `minHeight`, not `height`: at 크게 tiers or raised system fonts the
    // cell should grow rather than clip. M stays 56px Figma-default.
    minHeight: size === "M" ? 56 : undefined,
    borderRadius: radius.xs,
    border: `1px solid ${pal.border}`,
    backgroundColor: pal.bg,
    color: pal.label,
    cursor: disabled ? "not-allowed" : "pointer",
    appearance: "none",
    WebkitAppearance: "none",
    fontFamily: typography.fontFamily,
    letterSpacing: typography.letterSpacing,
    ["--wds-focus-ring" as string]: "rgba(24, 161, 154, 0.5)",
    ...styleProp,
  };

  const labelStyle: CSSProperties = {
    fontSize: spec.fontSize,
    lineHeight: spec.lineHeight,
    fontWeight: typography.weight.SB,
    color: pal.label,
    textAlign: "left",
  };

  // L is the only size that stacks label over description.
  if (size === "L") {
    const descStyle: CSSProperties = {
      fontSize: sizeSpec.L.descSize,
      lineHeight: sizeSpec.L.descLine,
      fontWeight: typography.weight.R,
      color: pal.label, // Figma: description uses label color (normal when active, neutral otherwise)
      // Figma indents the description 28px so it aligns with the label
      // text baseline (24 radio + 4 gap). Kept verbatim.
      paddingInline: 28,
    };
    return (
      <button
        type="button"
        role="radio"
        aria-checked={state === "active"}
        aria-disabled={disabled || undefined}
        disabled={disabled}
        className={["wds-block-button", className].filter(Boolean).join(" ")}
        style={{ ...style, alignItems: "flex-start" }}
        {...rest}
      >
        <span
          style={{
            display: "inline-flex",
            flexDirection: "column",
            gap: margin.xs,
            alignItems: "flex-start",
          }}
        >
          <span style={{ display: "inline-flex", gap: margin.xs, alignItems: "center" }}>
            {radio && <RadioDot active={state === "active"} />}
            <span style={labelStyle}>{label}</span>
          </span>
          {description && <span style={descStyle}>{description}</span>}
        </span>
      </button>
    );
  }

  // M / S: single-line, radio + label.
  return (
    <button
      type="button"
      role="radio"
      aria-checked={state === "active"}
      aria-disabled={disabled || undefined}
      disabled={disabled}
      className={["wds-block-button", className].filter(Boolean).join(" ")}
      style={style}
      {...rest}
    >
      {radio && <RadioDot active={state === "active"} />}
      <span style={labelStyle}>{label}</span>
    </button>
  );
}
