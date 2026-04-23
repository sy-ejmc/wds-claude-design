"use client";

import { useState } from "react";
import type { CSSProperties, ChangeEvent, TextareaHTMLAttributes } from "react";
import { color, margin, radius, typography } from "@wds/tokens";

/**
 * WDS Textarea — multi-line text input.
 *
 * Figma: Components / Textarea (node `7317:45573`, bucket `7317:45587`)
 * "긴 텍스트를 입력할 수 있는 필드 컴포넌트입니다."
 *
 * Shares the same chrome matrix as TextField (F2):
 *   default / filled   — bg-white + line.normal border
 *   focus              — bg-white + primary.normal border
 *   disabled           — bg-50    + line.normal border (value label.assistive)
 *   readonly           — bg-50    + no border
 *   error              — bg-white + status.error border
 *
 * Default height is 128px (Figma). Counter sits at the absolute bottom-right
 * of the box when `maxLength` is provided.
 */
export interface TextareaProps
  extends Omit<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    "value" | "onChange" | "disabled" | "size" | "maxLength"
  > {
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  error?: string;
  helperText?: string;
  /** Visual height of the textarea box. Defaults to 128px (Figma baseline). */
  boxHeight?: number;
  /** When > 0, renders `${value.length}/${maxLength}` in the bottom-right. */
  maxLength?: number;
}

function resolveChrome(opts: {
  focus: boolean;
  disabled: boolean;
  readOnly: boolean;
  hasError: boolean;
}) {
  const { focus, disabled, readOnly, hasError } = opts;
  if (hasError) {
    return { bg: color.background["bg-white"], border: color.status.error };
  }
  if (disabled) {
    return { bg: color.background["bg-50"],    border: color.line.normal };
  }
  if (readOnly) {
    return { bg: color.background["bg-50"],    border: "transparent" };
  }
  if (focus) {
    return { bg: color.background["bg-white"], border: color.primary.normal };
  }
  return   { bg: color.background["bg-white"], border: color.line.normal };
}

export function Textarea({
  label,
  value,
  onChange,
  placeholder,
  disabled = false,
  readOnly = false,
  error,
  helperText,
  boxHeight = 128,
  maxLength,
  style: styleProp,
  ...rest
}: TextareaProps) {
  const [focus, setFocus] = useState(false);
  const hasError = Boolean(error);
  const pal = resolveChrome({ focus, disabled, readOnly, hasError });

  const hasCounter = typeof maxLength === "number" && maxLength > 0;
  const overLimit = hasCounter && (value?.length ?? 0) > (maxLength as number);

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
    color: disabled ? color.label.alternative : color.label.normal,
  };

  const box: CSSProperties = {
    position: "relative",
    display: "flex",
    alignItems: "stretch",
    // DS-C4: use minHeight so a raised system font can grow the field.
    minHeight: boxHeight,
    padding: 16,
    background: pal.bg,
    border: `1px solid ${pal.border}`,
    borderRadius: radius.xs,
    transition: "border-color 150ms ease-out, background 150ms ease-out",
    ...styleProp,
  };

  const textarea: CSSProperties = {
    flex: 1,
    width: "100%",
    minWidth: 0,
    fontFamily: typography.fontFamily,
    fontSize: typography.size.lg,
    lineHeight: typography.lineHeight.xl,
    fontWeight: typography.weight.R,
    letterSpacing: typography.letterSpacing,
    color: disabled ? color.label.assistive : color.label.strong,
    background: "transparent",
    border: "none",
    padding: 0,
    outline: "none",
    resize: "vertical",
  };

  const counterStyle: CSSProperties = {
    position: "absolute",
    right: 7,
    bottom: 7,
    display: "inline-flex",
    fontFamily: typography.fontFamily,
    fontSize: typography.size.xs,
    lineHeight: "20px",
    fontWeight: typography.weight.R,
    pointerEvents: "none",
  };

  const helpBase: CSSProperties = {
    fontSize: typography.size.xs,
    lineHeight: "16px",
    fontWeight: typography.weight.M,
  };

  return (
    <div style={wrapper}>
      {label && <label style={labelStyle}>{label}</label>}
      <div style={box}>
        <textarea
          value={value ?? ""}
          disabled={disabled}
          readOnly={readOnly}
          placeholder={placeholder}
          aria-invalid={hasError || undefined}
          className="wds-input"
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => onChange?.(e.target.value)}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          maxLength={maxLength}
          style={{
            ...textarea,
            color: !value ? color.label.alternative : textarea.color,
          }}
          {...rest}
        />
        {hasCounter && (
          <span style={counterStyle}>
            <span style={{ color: overLimit ? color.status.error : color.label.strong }}>
              {value?.length ?? 0}
            </span>
            <span style={{ color: color.label.neutral }}>/{maxLength}</span>
          </span>
        )}
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
