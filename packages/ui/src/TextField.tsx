"use client";

import { useState } from "react";
import type { CSSProperties, ChangeEvent, ReactNode, InputHTMLAttributes } from "react";
import { color, margin, padding, radius, typography } from "@wds/tokens";

/**
 * WDS TextField — boxed variant of the text field.
 *
 * Figma: Components / Text Fields 02 (node `5015:33570`, component bucket
 * `3001:19393`)
 * "사용자의 이메일, 비밀번호 등 기본적인 입력값을 받을 수 있는 필드 컴포넌트입니다."
 *
 * This is the 8px-rounded boxed variant. Pair with `Input` (the line
 * variant — Figma Text Fields 01) when a surface needs the minimal
 * underline look instead of the full box.
 *
 * Box chrome by state (from Figma):
 *   default / filled   — bg-white + line.normal border
 *   focus              — bg-white + primary.normal border
 *   disabled           — bg-50    + line.normal border
 *   readonly           — bg-50    + no border
 *   error              — bg-white + status.error border (+ error text under)
 *
 * Value: lg / Regular / line-height-xl (28px).
 * Placeholder: `label.alternative`. Filled value: `label.strong`.
 * Label above: md / Semibold / line-height-md.
 *
 * Slots (optional):
 *   leadingIcon      — 24px glyph at the left of the box (search, etc.)
 *   trailingIcon     — 24px glyph at the right (search, chevron, etc.)
 *   timer            — right-aligned small timer string ("05:03")
 *   maxLength        — when set and > 0, renders "{value}/{max}" counter
 *   validation       — renders a 20px check / error glyph
 *   helperText       — 12px medium caption under the value (inside the box in Figma, but WDS floats it under the box for readability)
 */
export interface TextFieldProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "value" | "onChange" | "type" | "disabled" | "size" | "maxLength"
  > {
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  type?: "text" | "email" | "password" | "tel" | "number";
  disabled?: boolean;
  readOnly?: boolean;
  error?: string;
  helperText?: string;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  /** Renders a monospace-ish timer string at the right. */
  timer?: string;
  /** When > 0, shows `${value.length}/${maxLength}` at the right. */
  maxLength?: number;
  /** Shows a 20px validation glyph at the right. */
  validation?: "success" | "error";
}

const ICON_SUCCESS = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden focusable={false}>
    <path d="M5 12.5L10 17.5L19 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ICON_ERROR = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden focusable={false}>
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    <path d="M12 7.5V13M12 16.5V16.51" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

function resolveChrome(opts: {
  focus: boolean;
  disabled: boolean;
  readOnly: boolean;
  hasError: boolean;
}) {
  const { focus, disabled, readOnly, hasError } = opts;
  if (hasError) {
    return {
      bg:     color.background["bg-white"],
      border: color.status.error,
    };
  }
  if (disabled) {
    return {
      bg:     color.background["bg-50"],
      border: color.line.normal,
    };
  }
  if (readOnly) {
    return {
      bg:     color.background["bg-50"],
      border: "transparent",
    };
  }
  if (focus) {
    return {
      bg:     color.background["bg-white"],
      border: color.primary.normal,
    };
  }
  return {
    bg:     color.background["bg-white"],
    border: color.line.normal,
  };
}

export function TextField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  disabled = false,
  readOnly = false,
  error,
  helperText,
  leadingIcon,
  trailingIcon,
  timer,
  maxLength,
  validation,
  style: styleProp,
  ...rest
}: TextFieldProps) {
  const [focus, setFocus] = useState(false);
  const hasError = Boolean(error);
  const pal = resolveChrome({ focus, disabled, readOnly, hasError });

  const wrapper: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: margin.s,
    fontFamily: typography.fontFamily,
    width: "100%",
  };

  const labelStyle: CSSProperties = {
    fontSize: typography.size.md,
    lineHeight: typography.lineHeight.md,
    fontWeight: typography.weight.SB,
    color: color.label.normal,
  };

  const box: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: margin.s,
    minHeight: 56, // DS-C4: minHeight, not height
    paddingBlock: padding.xs,
    paddingInline: padding.m,
    background: pal.bg,
    border: `1px solid ${pal.border}`,
    borderRadius: radius.xs,
    opacity: disabled ? 0.6 : 1,
    transition: "border-color 150ms ease-out, background 150ms ease-out",
    ...styleProp,
  };

  const input: CSSProperties = {
    flex: 1,
    minWidth: 0,
    fontFamily: typography.fontFamily,
    fontSize: typography.size.lg,
    lineHeight: typography.lineHeight.xl,
    fontWeight: typography.weight.R,
    letterSpacing: typography.letterSpacing,
    color: color.label.strong,
    background: "transparent",
    border: "none",
    padding: 0,
    outline: "none",
  };

  const iconSlot: CSSProperties = {
    display: "inline-flex",
    width: 24,
    height: 24,
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
    color: color.icon.default,
  };

  const validationSlot: CSSProperties = {
    display: "inline-flex",
    width: 20,
    height: 20,
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
    color: validation === "error" ? color.status.error : color.primary.normal,
  };

  const metaStyle: CSSProperties = {
    fontSize: typography.size.xs,
    lineHeight: "16px", // Figma: `leading-[16px]` for the timer/counter
    fontWeight: typography.weight.M,
    color: color.label.normal,
    flexShrink: 0,
  };

  const helpBase: CSSProperties = {
    fontSize: typography.size.xs,
    lineHeight: "16px",
    fontWeight: typography.weight.M,
  };

  const counter =
    typeof maxLength === "number" && maxLength > 0 ? (
      <span style={{ ...metaStyle, display: "inline-flex" }}>
        <span style={{ color: color.label.strong }}>{value?.length ?? 0}</span>
        <span style={{ color: color.label.neutral }}>/{maxLength}</span>
      </span>
    ) : null;

  return (
    <div style={wrapper}>
      {label && <label style={labelStyle}>{label}</label>}
      <div style={box}>
        {leadingIcon && <span style={iconSlot}>{leadingIcon}</span>}
        <input
          type={type}
          value={value ?? ""}
          disabled={disabled}
          readOnly={readOnly}
          placeholder={placeholder}
          aria-invalid={hasError || undefined}
          className="wds-input"
          onChange={(e: ChangeEvent<HTMLInputElement>) => onChange?.(e.target.value)}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          maxLength={maxLength}
          style={{
            ...input,
            color: value ? color.label.strong : undefined,
          }}
          {...rest}
        />
        {timer && <span style={metaStyle}>{timer}</span>}
        {counter}
        {validation && (
          <span style={validationSlot}>
            {validation === "success" ? ICON_SUCCESS : ICON_ERROR}
          </span>
        )}
        {trailingIcon && <span style={iconSlot}>{trailingIcon}</span>}
      </div>
      {helperText && !error && (
        <div style={{ ...helpBase, color: color.label.neutral }}>{helperText}</div>
      )}
      {error && (
        <div style={{ ...helpBase, color: color.status.error }}>{error}</div>
      )}
    </div>
  );
}
