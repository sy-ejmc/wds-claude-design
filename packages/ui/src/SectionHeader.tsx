"use client";

import type { CSSProperties, ReactNode, MouseEventHandler } from "react";
import { color, margin, padding, typography } from "@wds/tokens";

/**
 * WDS Section Header — page section title with an optional trailing action.
 *
 * Figma: Components / Section header (node `5015:33255`, bucket `3001:19892`)
 * "페이지에서 특정 섹션을 구분하고 강조하는 역할을 하는 컴포넌트입니다."
 *
 * Row h-44 / px-16, title xl / Bold / line-height-xl / label.strong.
 *
 * Trailing-slot strategy:
 *   - `actionText` + (optional) `onActionClick` — Figma "Text" and
 *     "Text + Arrow" variants.
 *   - `showArrow` — Figma "arrow" or "Text + Arrow" variants; toggles
 *     the chevron-right icon.
 *   - `trailing` — slot for arbitrary nodes (Figma "Button", "Selectbox",
 *     or anything else from the host app). Rendered after the text+arrow
 *     pair so composition is straightforward.
 */

export interface SectionHeaderProps {
  children: ReactNode;
  actionText?: ReactNode;
  onActionClick?: MouseEventHandler<HTMLButtonElement>;
  showArrow?: boolean;
  trailing?: ReactNode;
  /**
   * When true, the action text adopts the brand-green color (Figma
   * "Text + Arrow" variant) instead of the neutral `label.neutral` tone
   * used by the standalone "Text" variant.
   */
  emphasizeAction?: boolean;
  className?: string;
  style?: CSSProperties;
}

const CHEVRON_RIGHT = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden focusable={false}>
    <path
      d="M9 6L15 12L9 18"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export function SectionHeader({
  children,
  actionText,
  onActionClick,
  showArrow = false,
  trailing,
  emphasizeAction = false,
  className,
  style: styleProp,
}: SectionHeaderProps) {
  const row: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: margin.s,
    width: "100%",
    minHeight: 44,
    paddingInline: padding.m,
    background: color.background["bg-white"],
    fontFamily: typography.fontFamily,
    ...styleProp,
  };

  const titleStyle: CSSProperties = {
    flex: 1,
    minWidth: 0,
    margin: 0,
    fontSize: typography.size.xl,
    lineHeight: typography.lineHeight.xl,
    fontWeight: typography.weight.B,
    color: color.label.strong,
  };

  const actionTone = emphasizeAction ? color.primary.normal : color.label.neutral;

  const actionButton: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 2,
    padding: 0,
    background: "transparent",
    border: "none",
    color: actionTone,
    fontFamily: typography.fontFamily,
    fontSize: typography.size.sm,
    lineHeight: typography.lineHeight.sm,
    fontWeight: typography.weight.B,
    letterSpacing: typography.letterSpacing,
    whiteSpace: "nowrap",
    cursor: onActionClick ? "pointer" : "default",
    flexShrink: 0,
    appearance: "none",
    WebkitAppearance: "none",
  };

  const iconSlot: CSSProperties = {
    display: "inline-flex",
    width: 24,
    height: 24,
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
    color: actionTone,
  };

  const showActionNode = actionText != null || showArrow;

  return (
    <div className={className} style={row}>
      <h2 style={titleStyle}>{children}</h2>
      {showActionNode && (
        onActionClick ? (
          <button type="button" onClick={onActionClick} style={actionButton}>
            {actionText}
            {showArrow && <span style={iconSlot}>{CHEVRON_RIGHT}</span>}
          </button>
        ) : (
          <span style={actionButton}>
            {actionText}
            {showArrow && <span style={iconSlot}>{CHEVRON_RIGHT}</span>}
          </span>
        )
      )}
      {trailing && (
        <span style={{ display: "inline-flex", flexShrink: 0 }}>{trailing}</span>
      )}
    </div>
  );
}
