"use client";

import { useState } from "react";
import type { CSSProperties, ChangeEvent, ReactNode, InputHTMLAttributes } from "react";
import { color, margin, typography } from "@wds/tokens";

/**
 * WDS Input — single-line text field.
 *
 * Figma: Components / Text Fields 01 (node `5015:33512`, component
 * bucket `3001:19369`)
 * "사용자의 이메일, 비밀번호 등 기본적인 입력값을 받을 수 있는 필드 컴포넌트입니다."
 *
 * Visual spec (verbatim from Figma):
 *   - Bottom-border-only (no box). 1px solid, `line.normal` at rest,
 *     `primary.normal` when focused.
 *   - 56px minHeight (grows with tier / system font — DS-C4).
 *   - Value / placeholder: lg / Regular / line-height-xl (28px).
 *     Placeholder color `label.alternative`.
 *   - Optional `label` above: sm / Semibold / line-height-sm (20px).
 *     Mirrors Figma's `title형` variant.
 *   - Trailing slot: pass `trailingIcon` (24px) or enable `onClear` to get
 *     the Figma close-big affordance whenever the value is non-empty.
 *   - Leading slot: `leadingAdornment` — used in group-pick variants to
 *     host a radio indicator (Figma `항목선택`).
 *
 * `hint` / `error` are non-Figma pragmatic extensions consumed by forms.
 * Error sets both the bottom border and the hint to `status.error`.
 */
export interface InputProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "value" | "onChange" | "type" | "disabled" | "size"
  > {
  /** Small title above the field — Figma `title형` variant. */
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  type?: "text" | "email" | "password" | "tel" | "number";
  /** Non-Figma hint text below the line. */
  hint?: string;
  /** Non-Figma error text; also tints the bottom border red. */
  error?: string;
  disabled?: boolean;
  /** 24px slot to the left of the value — e.g. a radio indicator. */
  leadingAdornment?: ReactNode;
  /** 24px slot to the right of the value — e.g. a gallery icon. */
  trailingIcon?: ReactNode;
  /** When set, a 24px close-big clears the value on click once filled. */
  onClear?: () => void;
}

const CLEAR_ICON = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
    focusable={false}
  >
    <path
      d="M6 6L18 18M18 6L6 18"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

export function Input({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  hint,
  error,
  disabled = false,
  leadingAdornment,
  trailingIcon,
  onClear,
  style: styleProp,
  ...rest
}: InputProps) {
  const [focus, setFocus] = useState(false);

  const borderColor = error
    ? color.status.error
    : focus
      ? color.primary.normal
      : color.line.normal;

  const wrapper: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: margin.xs,
    fontFamily: typography.fontFamily,
    width: "100%",
  };

  // Figma Text Fields 03 (node `10164:15189`): external label is md/SB/lh-md.
  // Disabled mutes the label to label.alternative to match the Figma Disabled
  // variant of F3.
  const labelStyle: CSSProperties = {
    fontSize: typography.size.md,
    lineHeight: typography.lineHeight.md,
    fontWeight: typography.weight.SB,
    color: disabled ? color.label.alternative : color.label.normal,
  };

  const row: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: margin.s,
    // Figma: 56px baseline with lg/line-xl inside. DS-C4 — minHeight.
    minHeight: 56,
    borderBottom: `1px solid ${borderColor}`,
    transition: "border-color 150ms ease-out",
    opacity: disabled ? 0.5 : 1,
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
    color: color.label.normal,
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

  // Figma Text Fields 03: helper caption is xs/M/line-16px/label.neutral.
  // Error mirrors the same metrics but tints the color to status.error.
  const helpBase: CSSProperties = {
    fontSize: typography.size.xs,
    lineHeight: "16px",
    fontWeight: typography.weight.M,
  };

  const filled = Boolean(value && value.length > 0);

  return (
    <div style={wrapper}>
      {label && <label style={labelStyle}>{label}</label>}
      <div style={row}>
        {leadingAdornment && <span style={iconSlot}>{leadingAdornment}</span>}
        <input
          type={type}
          value={value ?? ""}
          disabled={disabled}
          placeholder={placeholder}
          aria-invalid={error ? true : undefined}
          className="wds-input"
          onChange={(e: ChangeEvent<HTMLInputElement>) => onChange?.(e.target.value)}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={input}
          {...rest}
        />
        {trailingIcon && <span style={iconSlot}>{trailingIcon}</span>}
        {onClear && filled && !disabled && (
          <button
            type="button"
            aria-label="Clear"
            onClick={onClear}
            style={{
              ...iconSlot,
              cursor: "pointer",
              background: "transparent",
              border: "none",
              padding: 0,
            }}
          >
            {CLEAR_ICON}
          </button>
        )}
      </div>
      {hint && !error && (
        <div style={{ ...helpBase, color: color.label.neutral }}>{hint}</div>
      )}
      {error && (
        <div style={{ ...helpBase, color: color.status.error }}>{error}</div>
      )}
    </div>
  );
}
