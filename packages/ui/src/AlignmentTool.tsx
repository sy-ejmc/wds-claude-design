"use client";

import type { CSSProperties, ReactNode } from "react";
import { color, padding, typography } from "@wds/tokens";

/**
 * WDS Alignment Tool — filter/sort bar used above a list.
 *
 * Figma: Components / Alignment Tool (node `3001:20087`)
 * "텍스트나 요소들의 정렬을 설정할 수 있는 툴 컴포넌트입니다."
 *
 * Layout (verbatim from Figma):
 *   px-16 py-12, bottom hairline line.normal, backdrop-blur-12.
 *   Left: sort trigger — md/Bold label (label.neutral) + 16px chevron-down.
 *   Right: optional filter toggle — 20px check icon + md/Bold text.
 *     - `checked=false`  → label.alternative text, muted check glyph
 *     - `checked=true`   → primary.normal text, brand check glyph
 *
 * Both sides are slots — pass your own icon for the filter check
 * (the DS does not ship icons).
 */

export interface AlignmentToolProps {
  /** Left-side sort trigger label (e.g. "최신순"). */
  sortLabel: ReactNode;
  onSortClick?: () => void;
  sortChevron?: ReactNode;
  /** Optional right-side filter toggle. Omit to hide. */
  filterLabel?: ReactNode;
  /** Controls the visual emphasis of the right-side filter text. */
  checked?: boolean;
  onToggleChecked?: () => void;
  /** 20px glyph for the filter toggle. Tint switches with `checked`. */
  filterIcon?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

const DEFAULT_CHEVRON = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden focusable={false}>
    <path
      d="M4 6L8 10L12 6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DEFAULT_CHECK = (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden focusable={false}>
    <circle cx="10" cy="10" r="9" fill="currentColor" />
    <path
      d="M6 10.5L9 13.5L14 7.5"
      stroke="white"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export function AlignmentTool({
  sortLabel,
  onSortClick,
  sortChevron,
  filterLabel,
  checked = false,
  onToggleChecked,
  filterIcon,
  className,
  style: styleProp,
}: AlignmentToolProps) {
  const row: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: padding.s,                            // 12
    width: "100%",
    paddingBlock: padding.s,                   // 12
    paddingInline: padding.m,                  // 16
    borderBottom: `1px solid ${color.line.normal}`,
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    background: "transparent",
    fontFamily: typography.fontFamily,
    ...styleProp,
  };

  const sortBtn: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 0,
    flex: 1,
    minWidth: 0,
    background: "transparent",
    border: "none",
    padding: 0,
    color: color.label.neutral,
    fontFamily: typography.fontFamily,
    fontSize: typography.size.md,
    lineHeight: typography.lineHeight.md,
    fontWeight: typography.weight.B,
    letterSpacing: typography.letterSpacing,
    whiteSpace: "nowrap",
    cursor: onSortClick ? "pointer" : "default",
    appearance: "none",
    WebkitAppearance: "none",
  };

  const chevronSlot: CSSProperties = {
    display: "inline-flex",
    width: 16,
    height: 16,
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
    color: color.icon.default,
  };

  const filterBtn: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    background: "transparent",
    border: "none",
    padding: 0,
    color: checked ? color.primary.normal : color.label.alternative,
    fontFamily: typography.fontFamily,
    fontSize: typography.size.md,
    lineHeight: typography.lineHeight.md,
    fontWeight: typography.weight.B,
    letterSpacing: typography.letterSpacing,
    whiteSpace: "nowrap",
    cursor: onToggleChecked ? "pointer" : "default",
    appearance: "none",
    WebkitAppearance: "none",
    flexShrink: 0,
  };

  const filterIconSlot: CSSProperties = {
    display: "inline-flex",
    width: 20,
    height: 20,
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
    color: checked ? color.primary.normal : color.label.alternative,
  };

  return (
    <div className={className} style={row}>
      <button type="button" onClick={onSortClick} style={sortBtn} className="wds-block-button">
        <span>{sortLabel}</span>
        <span style={chevronSlot}>{sortChevron ?? DEFAULT_CHEVRON}</span>
      </button>
      {filterLabel != null && (
        <button
          type="button"
          aria-pressed={checked}
          onClick={onToggleChecked}
          style={filterBtn}
          className="wds-block-button"
        >
          <span style={filterIconSlot}>{filterIcon ?? DEFAULT_CHECK}</span>
          <span>{filterLabel}</span>
        </button>
      )}
    </div>
  );
}
