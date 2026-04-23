"use client";

import type { CSSProperties, ReactNode, InputHTMLAttributes } from "react";
import { color, margin, typography } from "@wds/tokens";

/**
 * WDS Radio — single-select input.
 *
 * Figma: Components / Checkboxes & Radio Buttons / Type=Radio + Radio_score
 * (node `3001:19447`, subnodes `3001:19485` / `3001:19490` / `9891:5481` / `9891:5484`)
 * "다중 선택(Checkbox) 또는 단일 선택(Radio Button) 방식의 입력값을
 *  받을 수 있는 컴포넌트입니다."
 *
 * Visual spec:
 *   - 24×24 circle.
 *   - Off: bg-50 fill, 1px alpha-20 border.
 *   - On:  primary.normal fill with 1px primary.light border, 10px white
 *          inner dot offset 7px from top-left.
 *   - Default layout: indicator on the left, md/R/line-height-lg label on
 *     the right. Label color stays label.normal (unlike Checkbox which
 *     shifts to label.strong when on — Figma spec).
 *   - `scoreMode`: vertical layout with the label (usually a score digit
 *     like "1", "2", ...) ABOVE the indicator. Mirrors Figma's
 *     `Radio_score` subvariant used for 1-N rating scales.
 *
 * Grouping: use this as a controlled radio; the parent owns the
 * `selectedValue` and wires `onSelect`. Multiple radios sharing a
 * `name` via `inputProps` also work with native bubbling.
 */

const BORDER_OFF = "rgba(0, 0, 0, 0.2)";  // Figma: alpha-colors / neutralA-20

export interface RadioProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
  checked: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: ReactNode;
  disabled?: boolean;
  /** Score-scale layout — label sits above the indicator. */
  scoreMode?: boolean;
}

export function Radio({
  checked,
  onCheckedChange,
  label,
  disabled = false,
  scoreMode = false,
  className,
  style: styleProp,
  id,
  name,
  value,
  ...rest
}: RadioProps) {
  const rootStyle: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: scoreMode ? "center" : "flex-start",
    flexDirection: scoreMode ? "column" : "row",
    gap: scoreMode ? margin.xs : margin.xs,
    cursor: disabled ? "not-allowed" : "pointer",
    fontFamily: typography.fontFamily,
    opacity: disabled ? 0.5 : 1,
    ...styleProp,
  };

  const indicator: CSSProperties = checked
    ? {
        position: "relative",
        width: 24,
        height: 24,
        flexShrink: 0,
        borderRadius: "50%",
        background: color.primary.normal,
        border: `1px solid ${color.primary.light}`,
      }
    : {
        position: "relative",
        width: 24,
        height: 24,
        flexShrink: 0,
        borderRadius: "50%",
        background: color.background["bg-50"],
        border: `1px solid ${BORDER_OFF}`,
      };

  const innerDot: CSSProperties = {
    position: "absolute",
    top: 6,
    left: 6,
    width: 10,
    height: 10,
    borderRadius: "50%",
    background: color.label.white,
  };

  const labelStyle: CSSProperties = {
    fontSize: typography.size.md,
    lineHeight: typography.lineHeight.lg,
    fontWeight: typography.weight.R,
    color: color.label.normal,
  };

  return (
    <label className={className} style={rootStyle} htmlFor={id}>
      {scoreMode && label && <span style={labelStyle}>{label}</span>}
      <span style={indicator}>
        <input
          id={id}
          type="radio"
          name={name}
          value={value}
          checked={checked}
          disabled={disabled}
          onChange={(e) => onCheckedChange?.(e.target.checked)}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            opacity: 0,
            margin: 0,
            cursor: "inherit",
          }}
          {...rest}
        />
        {checked && <span style={innerDot} />}
      </span>
      {!scoreMode && label && <span style={labelStyle}>{label}</span>}
    </label>
  );
}
