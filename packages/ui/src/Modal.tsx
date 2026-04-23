"use client";

import { useEffect } from "react";
import type { CSSProperties, ReactNode } from "react";
import { color, padding, radius, typography } from "@wds/tokens";

/**
 * WDS Modal — centered dialog for confirmations and scrollable content.
 *
 * Figma: Components / Modal (node `14348:16114`)
 *
 * Two Figma patterns collapse cleanly into this one component:
 *   confirm pattern  — title + description + two-button row (cancel / confirm).
 *   content pattern  — long-form body with a fixed-width confirm button at
 *                      the bottom (Figma "알뜰폰 사업자 확인" example).
 *
 * The caller controls visibility via `open`. A scrim covers the screen
 * and `Escape` / clicks on the scrim fire `onClose`. No focus-trap is
 * shipped — Phase 2 is DIY; wire one in consumer code if needed.
 *
 * Visual spec (verbatim from Figma):
 *   - 358px wide, radius-m (20) corners, white surface with a
 *     line.normal bottom border (the Figma mocks layer a subtle rule).
 *   - Confirm pattern:   pt-32 pb-24 px-16
 *   - Content pattern:   py-32 px-16
 *   - Title xl/Bold/line-height-xl, centered.
 *   - Description md/Regular/line-height-lg, label.neutral, centered.
 *   - Buttons: 56px height, 8px radius, 157px fixed width side-by-side
 *     for confirm pattern; full-width 326px × 48px for content pattern.
 */

export interface ModalProps {
  open: boolean;
  title?: ReactNode;
  /** Body text shown under the title in the confirm pattern. */
  description?: ReactNode;
  /** Arbitrary custom body; replaces `description` when provided. */
  children?: ReactNode;
  cancelLabel?: ReactNode;
  confirmLabel?: ReactNode;
  onCancel?: () => void;
  onConfirm?: () => void;
  /** Fires on scrim click and Escape. */
  onClose?: () => void;
  /**
   * `confirm` (default) = two-button row at the bottom.
   * `content`           = children + a single full-width confirm button.
   */
  variant?: "confirm" | "content";
  className?: string;
  style?: CSSProperties;
}

export function Modal({
  open,
  title,
  description,
  children,
  cancelLabel = "취소",
  confirmLabel = "확인",
  onCancel,
  onConfirm,
  onClose,
  variant = "confirm",
  className,
  style: styleProp,
}: ModalProps) {
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
    alignItems: "center",
    justifyContent: "center",
    padding: padding.m,
    zIndex: 1000,
  };

  const surface: CSSProperties = {
    width: 358,
    maxWidth: "100%",
    maxHeight: "100%",
    overflow: "auto",
    background: color.background["bg-white"],
    borderRadius: radius.m,
    borderBottom: `1px solid ${color.line.normal}`,
    fontFamily: typography.fontFamily,
    padding:
      variant === "confirm"
        ? `${padding.xl}px ${padding.m}px ${padding.l}px`
        : `${padding.xl}px ${padding.m}px`,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: padding.l,
    ...styleProp,
  };

  const titleStyle: CSSProperties = {
    margin: 0,
    fontSize: typography.size.xl,
    lineHeight: typography.lineHeight.xl,
    fontWeight: typography.weight.B,
    color: color.label.strong,
    textAlign: "center",
    letterSpacing: typography.letterSpacing,
  };

  const descStyle: CSSProperties = {
    margin: 0,
    fontSize: typography.size.md,
    lineHeight: typography.lineHeight.lg,
    fontWeight: typography.weight.R,
    color: color.label.neutral,
    textAlign: "center",
  };

  const btnPrimary: CSSProperties = {
    minHeight: 56,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: padding.m,
    background: color.primary.normal,
    color: color.label.white,
    borderRadius: radius.xs,
    border: "none",
    fontFamily: typography.fontFamily,
    fontSize: typography.size.lg,
    lineHeight: typography.lineHeight.lg,
    fontWeight: typography.weight.B,
    cursor: "pointer",
    appearance: "none",
    WebkitAppearance: "none",
    ["--wds-focus-ring" as string]: "rgba(24,161,154,0.5)",
  };

  const btnSecondary: CSSProperties = {
    ...btnPrimary,
    background: color.primary.light,
    color: color.primary.normal,
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
      <div role="dialog" aria-modal="true" style={surface}>
        {(title || description || children) && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
              alignItems: "center",
              width: "100%",
            }}
          >
            {title && <p style={titleStyle}>{title}</p>}
            {variant === "confirm" && description && <p style={descStyle}>{description}</p>}
            {children}
          </div>
        )}
        {variant === "confirm" ? (
          <div
            style={{
              display: "flex",
              gap: padding.s,
              justifyContent: "flex-end",
              width: "100%",
            }}
          >
            <button
              type="button"
              onClick={onCancel ?? onClose}
              className="wds-block-button"
              style={{ ...btnSecondary, width: 157, flex: 1, maxWidth: 157 }}
            >
              {cancelLabel}
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="wds-block-button"
              style={{ ...btnPrimary, width: 157, flex: 1, maxWidth: 157 }}
            >
              {confirmLabel}
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={onConfirm}
            className="wds-block-button"
            style={{
              ...btnPrimary,
              minHeight: 48,
              width: "100%",
              paddingBlock: padding.s,
              fontSize: typography.size.md,
              lineHeight: typography.lineHeight.md,
            }}
          >
            {confirmLabel}
          </button>
        )}
      </div>
    </div>
  );
}
