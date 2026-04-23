"use client";

import type { ChangeEvent, CSSProperties, InputHTMLAttributes, ReactNode } from "react";
import { color, margin, padding, typography } from "@wds/tokens";

/**
 * WDS Search Bar — keyword-entry control for a screen header.
 *
 * Figma: Components / Search Bars (node `3001:19687`)
 * "사용자가 키워드를 입력하여 검색할 수 있는 검색창 컴포넌트입니다."
 *
 * Figma publishes a 3 × 2 matrix (type × state):
 *   type   Default · Back · Cancel
 *   state  Default (placeholder) · Filled (value)
 *
 * The "state" axis is just "has a value or doesn't," which this
 * component handles via the `value` prop. The "type" axis collapses
 * cleanly to two props:
 *   onBack       — renders a 40×40 back button on the left (Back variant)
 *   cancelLabel  — renders a text button on the right (Cancel variant)
 *   (omit both)  — Default variant
 *
 * The search field itself is a 48px bg-50 rounded-12 pill with a
 * leading 24px glyph. A `delete-filled` glyph shows up on the right
 * when the input has a value and `onClear` is provided.
 */

export interface SearchBarProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "value" | "onChange" | "size" | "type"
  > {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  /** Override the leading search glyph. */
  searchIcon?: ReactNode;
  /** When set, shows a 40×40 back button on the left. */
  onBack?: () => void;
  backIcon?: ReactNode;
  /** When set, shows a right-side text button. Default label: "취소". */
  cancelLabel?: ReactNode;
  onCancel?: () => void;
  /** When set + value is non-empty, shows a 24px delete-filled affordance. */
  onClear?: () => void;
  disabled?: boolean;
}

const SEARCH_GLYPH = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden focusable={false}>
    <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M16 16L20 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const CHEVRON_LEFT = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden focusable={false}>
    <path
      d="M15 18L9 12L15 6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DELETE_FILLED = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden focusable={false}>
    <circle cx="12" cy="12" r="10" fill="currentColor" />
    <path
      d="M9 9L15 15M15 9L9 15"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

export function SearchBar({
  value,
  onChange,
  placeholder = "검색어를 입력해주세요",
  searchIcon,
  onBack,
  backIcon,
  cancelLabel = "취소",
  onCancel,
  onClear,
  disabled = false,
  className,
  style: styleProp,
  ...rest
}: SearchBarProps) {
  const filled = Boolean(value && value.length > 0);

  const hasBack = Boolean(onBack);
  const hasCancel = Boolean(onCancel);

  const root: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: hasBack
      ? margin.xs                             //  4 (Back variant)
      : hasCancel
        ? padding.s                           // 12 (Cancel variant)
        : 0,                                  //  0 (Default)
    width: "100%",
    paddingInline: padding.m,                 // 16
    paddingBlock: padding.xs,                 //  8
    background: color.background["bg-white"],
    fontFamily: typography.fontFamily,
    ...styleProp,
  };

  const field: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: margin.xs,                           // 4
    flex: 1,
    minWidth: 0,
    minHeight: 48,
    padding: padding.xs,                      // 8
    background: color.background["bg-50"],
    borderRadius: 12,
    opacity: disabled ? 0.5 : 1,
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

  const input: CSSProperties = {
    flex: 1,
    minWidth: 0,
    fontFamily: typography.fontFamily,
    fontSize: typography.size.lg,
    lineHeight: typography.lineHeight.md,
    fontWeight: typography.weight.M,
    letterSpacing: typography.letterSpacing,
    color: filled ? color.label.strong : color.label.normal,
    background: "transparent",
    border: "none",
    padding: 0,
    outline: "none",
  };

  const backSlot: CSSProperties = {
    display: "inline-flex",
    width: 40,
    height: 40,
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
    background: "transparent",
    border: "none",
    padding: 0,
    cursor: "pointer",
    color: color.icon.default,
    appearance: "none",
    WebkitAppearance: "none",
  };

  const cancelBtn: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "flex-end",
    height: 40,
    padding: 0,
    background: "transparent",
    border: "none",
    color: color.label.normal,
    fontFamily: typography.fontFamily,
    fontSize: typography.size.md,
    lineHeight: typography.lineHeight.md,
    fontWeight: typography.weight.B,
    letterSpacing: typography.letterSpacing,
    cursor: "pointer",
    whiteSpace: "nowrap",
    appearance: "none",
    WebkitAppearance: "none",
  };

  const clearBtn: CSSProperties = {
    ...iconSlot,
    background: "transparent",
    border: "none",
    padding: 0,
    cursor: "pointer",
    color: color.icon.disable,
  };

  return (
    <div className={className} style={root}>
      {hasBack && (
        <button
          type="button"
          aria-label="뒤로"
          onClick={onBack}
          className="wds-block-button"
          style={backSlot}
        >
          <span style={iconSlot}>{backIcon ?? CHEVRON_LEFT}</span>
        </button>
      )}
      <div style={field}>
        <span style={iconSlot}>{searchIcon ?? SEARCH_GLYPH}</span>
        <input
          type="search"
          value={value ?? ""}
          disabled={disabled}
          placeholder={placeholder}
          className="wds-input"
          onChange={(e: ChangeEvent<HTMLInputElement>) => onChange?.(e.target.value)}
          style={input}
          {...rest}
        />
        {onClear && filled && !disabled && (
          <button
            type="button"
            aria-label="지우기"
            onClick={onClear}
            style={clearBtn}
          >
            {DELETE_FILLED}
          </button>
        )}
      </div>
      {hasCancel && (
        <button
          type="button"
          onClick={onCancel}
          className="wds-block-button"
          style={cancelBtn}
        >
          {cancelLabel}
        </button>
      )}
    </div>
  );
}
