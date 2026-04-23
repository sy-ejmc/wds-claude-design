"use client";

import { useEffect } from "react";
import type { CSSProperties, ReactNode } from "react";
import { color, typography } from "@wds/tokens";

/**
 * WDS Bottom Sheet — mobile bottom-anchored sheet.
 *
 * Figma: Components / Bottom Sheet_top (node `15694:14426`),
 *        Bottom Sheet_asset (node `18029:6837`)
 *
 * Full-width sheet that docks at the bottom of the viewport with
 * rounded top corners (20px). The header has four Figma variants —
 * all collapse here to `title` + optional `subtitle` props plus a
 * `showClose` toggle:
 *
 *   기본          — centered title only
 *   타이틀+조합형 — title + subtitle below (xs/M label.alternative)
 *   두줄          — title that wraps to two lines
 *   타이틀X       — no title, just the close button on the right
 *
 * The body is a free slot — typically option lists, image grids, or
 * confirmation dialogs. The sheet renders a scrim behind itself;
 * clicking the scrim or pressing Escape fires `onClose`.
 *
 * Figma spec verbatim:
 *   - 390px nominal width (adapts to viewport), rounded-top 20px.
 *   - Header: h-68px (taller for subtitle / two-line).
 *   - Header title: xl/Bold/line-height-xl/label.normal.
 *   - Subtitle: xs/Medium/line-16/label.alternative.
 *   - Close button: 40×40 hit area, 24px close-big glyph.
 */

export interface BottomSheetProps {
  open: boolean;
  title?: ReactNode;
  subtitle?: ReactNode;
  children: ReactNode;
  onClose?: () => void;
  showClose?: boolean;
  className?: string;
  style?: CSSProperties;
}

const CLOSE_BIG = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden focusable={false}>
    <path
      d="M6 6L18 18M18 6L6 18"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
    />
  </svg>
);

export function BottomSheet({
  open,
  title,
  subtitle,
  children,
  onClose,
  showClose = true,
  className,
  style: styleProp,
}: BottomSheetProps) {
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose?.();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const scrim: CSSProperties = {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
    zIndex: 1000,
  };

  const sheet: CSSProperties = {
    width: "100%",
    maxWidth: 520,
    background: color.background["bg-white"],
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    fontFamily: typography.fontFamily,
    display: "flex",
    flexDirection: "column",
    maxHeight: "90vh",
    overflow: "hidden",
    ...styleProp,
  };

  const header: CSSProperties = {
    position: "relative",
    minHeight: 56,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingInline: 16,
    paddingBlock: title || subtitle ? 20 : 8,
    borderBottom: `1px solid ${color.line.neutral}`,
  };

  const titleCol: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
    textAlign: "center",
  };

  const titleStyle: CSSProperties = {
    margin: 0,
    fontSize: typography.size.xl,
    lineHeight: typography.lineHeight.xl,
    fontWeight: typography.weight.B,
    color: color.label.normal,
  };

  const subtitleStyle: CSSProperties = {
    margin: 0,
    fontSize: typography.size.xs,
    lineHeight: "16px",
    fontWeight: typography.weight.M,
    color: color.label.alternative,
  };

  const closeBtn: CSSProperties = {
    position: "absolute",
    right: 8,
    top: "50%",
    transform: "translateY(-50%)",
    width: 40,
    height: 40,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    color: color.icon.default,
    appearance: "none",
    WebkitAppearance: "none",
  };

  const body: CSSProperties = {
    flex: 1,
    minHeight: 0,
    overflow: "auto",
  };

  return (
    <div
      role="presentation"
      className={className}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
      style={scrim}
    >
      <div role="dialog" aria-modal="true" style={sheet}>
        {(title || showClose) && (
          <header style={header}>
            {title && (
              <div style={titleCol}>
                <p style={titleStyle}>{title}</p>
                {subtitle && <p style={subtitleStyle}>{subtitle}</p>}
              </div>
            )}
            {showClose && (
              <button
                type="button"
                aria-label="닫기"
                onClick={onClose}
                className="wds-block-button"
                style={closeBtn}
              >
                {CLOSE_BIG}
              </button>
            )}
          </header>
        )}
        <div style={body}>{children}</div>
      </div>
    </div>
  );
}
