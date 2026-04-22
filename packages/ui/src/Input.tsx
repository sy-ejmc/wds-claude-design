"use client";

import { useState } from "react";
import type { CSSProperties, ChangeEvent } from "react";
import { color, padding, radius, typography } from "@wds/tokens";

export interface InputProps {
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  type?: "text" | "email" | "password" | "tel" | "number";
  hint?: string;
  error?: string;
  disabled?: boolean;
}

/**
 * WDS Input — single-line text field.
 *
 * Visual behavior: 1.5px border, `color.line.normal` at rest,
 * `color.primary.normal` on focus, `color.status.error` when in error.
 * All typography/radii/padding flow from @wds/tokens, so the field
 * scales with the active 3-tier typography tier automatically.
 */
export function Input({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  hint,
  error,
  disabled = false,
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
    gap: 6,
    fontFamily: typography.fontFamily,
  };
  const labelStyle: CSSProperties = {
    fontSize: typography.size.md,
    lineHeight: typography.lineHeight.md,
    fontWeight: typography.weight.M,
    color: color.label.normal,
  };
  const input: CSSProperties = {
    fontFamily: typography.fontFamily,
    fontSize: typography.size.md,
    lineHeight: typography.lineHeight.md,
    letterSpacing: typography.letterSpacing,
    padding: `${padding.s} ${padding.m}`,
    border: `1.5px solid ${borderColor}`,
    borderRadius: radius.s,
    background: disabled ? color.interaction.disable : color.background["bg-white"],
    color: color.label.normal,
    outline: "none",
    transition: "border-color 150ms ease-out",
  };
  const helpBase: CSSProperties = {
    fontSize: typography.size.sm,
    lineHeight: typography.lineHeight.sm,
  };

  return (
    <div style={wrapper}>
      {label && <label style={labelStyle}>{label}</label>}
      <input
        type={type}
        value={value ?? ""}
        disabled={disabled}
        placeholder={placeholder}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange?.(e.target.value)}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={input}
      />
      {hint && !error && (
        <div style={{ ...helpBase, color: color.label.alternative }}>{hint}</div>
      )}
      {error && (
        <div style={{ ...helpBase, color: color.status.error }}>{error}</div>
      )}
    </div>
  );
}
