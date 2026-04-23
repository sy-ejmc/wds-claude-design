"use client";

import type { CSSProperties, ReactNode, InputHTMLAttributes } from "react";
import { color, margin, radius, typography } from "@wds/tokens";

/**
 * WDS Checkbox — multi-select input.
 *
 * Figma: Components / Checkboxes & Radio Buttons / Type=Check (node
 * `3001:19447`, subnodes `3001:19477` / `3001:19482`)
 * "다중 선택(Checkbox) 또는 단일 선택(Radio Button) 방식의 입력값을
 *  받을 수 있는 컴포넌트입니다."
 *
 * Visual spec:
 *   - 24×24 square, radius-xxs (4px).
 *   - Off: bg-50 fill, 1px alpha-20 border.
 *   - On:  primary.normal fill, 1px alpha-10 border, white check glyph.
 *   - Optional md/R/line-height-lg label to the right.
 *     Label color shifts from label.normal (off) → label.strong (on).
 */

const BORDER_OFF = "rgba(0, 0, 0, 0.2)";  // Figma: alpha-colors / neutralA-20
const BORDER_ON  = "rgba(0, 0, 0, 0.1)";  // Figma: alpha-colors / neutralA-10

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
  checked: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: ReactNode;
  disabled?: boolean;
}

const CHECK_GLYPH = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden focusable={false}>
    <path
      d="M3.5 8.5L6.5 11.5L12.5 4.5"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export function Checkbox({
  checked,
  onCheckedChange,
  label,
  disabled = false,
  className,
  style: styleProp,
  id,
  ...rest
}: CheckboxProps) {
  const rootStyle: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: margin.s,
    cursor: disabled ? "not-allowed" : "pointer",
    fontFamily: typography.fontFamily,
    opacity: disabled ? 0.5 : 1,
    ...styleProp,
  };

  const boxStyle: CSSProperties = {
    position: "relative",
    width: 24,
    height: 24,
    flexShrink: 0,
    borderRadius: radius.xxs,
    border: checked ? `1px solid ${BORDER_ON}` : `1px solid ${BORDER_OFF}`,
    background: checked ? color.primary.normal : color.background["bg-50"],
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background 120ms ease-out, border-color 120ms ease-out",
  };

  const labelStyle: CSSProperties = {
    fontSize: typography.size.md,
    lineHeight: typography.lineHeight.lg,
    fontWeight: typography.weight.R,
    color: checked ? color.label.strong : color.label.normal,
  };

  return (
    <label className={className} style={rootStyle} htmlFor={id}>
      <span style={boxStyle}>
        <input
          id={id}
          type="checkbox"
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
        {checked && CHECK_GLYPH}
      </span>
      {label && <span style={labelStyle}>{label}</span>}
    </label>
  );
}
