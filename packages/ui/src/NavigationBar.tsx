"use client";

import type { CSSProperties, ReactNode } from "react";
import { color, padding, typography } from "@wds/tokens";

/**
 * WDS Navigation Bar — top bar for a screen.
 *
 * Figma: Components / Navigation Bar (node `3001:19633`)
 * "앱의 상단 또는 측면에 위치하며, 사용자가 주요 화면을 탐색할 수 있도록
 *  돕는 네비게이션 바입니다."
 *
 * The Figma publishes 8 variants — a 3D cross-product of:
 *   type    Back-Text-Confirm · Back-Text-Actions · Text-Tab · Text-Actions
 *   title   Default (56px, centered lg/SB)  ·  Large (112px, 2xl/B below icon row)
 *   style   Default (white bg, black text)  ·  Transparent (white text)
 *
 * That enum is too many knobs for one component. We collapse to four
 * ergonomic props:
 *
 *   `onBack` / `backIcon`   → shows a 40×40 icon button on the left.
 *                             omit for tab-style (no back).
 *   `title`                 → always centered in Default; always below +
 *                             left-aligned in Large.
 *   `large`                 → two-row layout with a 2xl/Bold title row.
 *   `transparent`           → white text + transparent bg (for use over
 *                             hero imagery). Default is white bg / black text.
 *   `actions`               → free slot for trailing icon buttons or an
 *                             inline confirm action (e.g. TextButton "확인").
 *                             Figma's "Confirm" vs "Actions" variants are
 *                             both just whatever you put in this slot.
 */

export interface NavigationBarProps {
  title?: ReactNode;
  large?: boolean;
  transparent?: boolean;
  /** Renders a 40×40 back button on the left when set. */
  onBack?: () => void;
  /** Override the default chevron-left glyph. */
  backIcon?: ReactNode;
  /** Trailing slot — typically 1–2 icon buttons. */
  actions?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

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

/**
 * 40×40 icon-button slot used on both sides of the bar. Intentionally
 * not exported — consumers just drop any 24px icon into `backIcon` /
 * `actions` and this wrapper gives it the correct hit target.
 */
function IconSlot({
  children,
  onClick,
  ariaLabel,
  tone,
}: {
  children: ReactNode;
  onClick?: () => void;
  ariaLabel?: string;
  tone: string;
}) {
  const base: CSSProperties = {
    width: 40,
    height: 40,
    flexShrink: 0,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    background: "transparent",
    border: "none",
    padding: 0,
    color: tone,
    cursor: onClick ? "pointer" : "default",
    appearance: "none",
    WebkitAppearance: "none",
  };
  const iconBox: CSSProperties = {
    display: "inline-flex",
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  };
  if (onClick) {
    return (
      <button
        type="button"
        aria-label={ariaLabel}
        onClick={onClick}
        style={base}
        className="wds-block-button"
      >
        <span style={iconBox}>{children}</span>
      </button>
    );
  }
  return (
    <span style={base}>
      <span style={iconBox}>{children}</span>
    </span>
  );
}

export function NavigationBar({
  title,
  large = false,
  transparent = false,
  onBack,
  backIcon,
  actions,
  className,
  style: styleProp,
}: NavigationBarProps) {
  const tone = transparent ? color.label.white : color.label.strong;
  const iconTone = transparent ? color.label.white : color.icon.default;

  const root: CSSProperties = {
    position: "relative",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    background: transparent ? "transparent" : color.background["bg-white"],
    fontFamily: typography.fontFamily,
    ...styleProp,
  };

  /* ── Small title (Default) — 56px bar with centered title ───────── */

  if (!large) {
    const bar: CSSProperties = {
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: onBack ? "space-between" : "flex-end",
      width: "100%",
      height: 56,
      paddingInline: 8,
    };
    const centeredTitle: CSSProperties = {
      position: "absolute",
      left: 99,
      right: 99,
      top: "50%",
      transform: "translateY(-50%)",
      margin: 0,
      textAlign: "center",
      fontSize: typography.size.lg,
      lineHeight: typography.lineHeight.lg,
      fontWeight: typography.weight.SB,
      color: tone,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    };
    return (
      <div className={className} style={root}>
        <div style={bar}>
          {onBack && (
            <IconSlot tone={iconTone} onClick={onBack} ariaLabel="뒤로">
              {backIcon ?? CHEVRON_LEFT}
            </IconSlot>
          )}
          {title && <h1 style={centeredTitle}>{title}</h1>}
          {actions && (
            <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
              {actions}
            </span>
          )}
        </div>
      </div>
    );
  }

  /* ── Large title — two rows: icon row + title row ───────────────── */

  const iconRow: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: onBack ? "space-between" : "flex-end",
    height: 56,
    paddingInline: 8,
    width: "100%",
  };
  const largeTitleRow: CSSProperties = {
    display: "flex",
    alignItems: "center",
    minHeight: 56,
    padding: padding.m,
    width: "100%",
  };
  const largeTitleStyle: CSSProperties = {
    flex: 1,
    minWidth: 0,
    margin: 0,
    fontSize: typography.size["2xl"],
    lineHeight: typography.lineHeight["2xl"],
    fontWeight: typography.weight.B,
    color: tone,
    letterSpacing: typography.letterSpacing,
  };
  return (
    <div className={className} style={root}>
      <div style={iconRow}>
        {onBack && (
          <IconSlot tone={iconTone} onClick={onBack} ariaLabel="뒤로">
            {backIcon ?? CHEVRON_LEFT}
          </IconSlot>
        )}
        {actions && (
          <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
            {actions}
          </span>
        )}
      </div>
      {title && (
        <div style={largeTitleRow}>
          <h1 style={largeTitleStyle}>{title}</h1>
        </div>
      )}
    </div>
  );
}
