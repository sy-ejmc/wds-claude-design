"use client";

import { useId, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { color, margin, padding, radius, typography } from "@wds/tokens";

/**
 * WDS Accordion — expand / collapse disclosure row (FAQ style).
 *
 * Figma: Components / Accordion (node `5015:34536`, bucket `3003:52076`)
 * "자주 묻는 질문(FAQ)이나 펼쳐보기/접기 기능이 필요한 콘텐츠를 구성하는
 *  컴포넌트입니다."
 *
 * Two chrome variants (from Figma):
 *   line    — single bottom border, 16px inset (used in stacked FAQ lists)
 *   wrapper — full 1px border + 12px radius, 12px inset (used as a card)
 *
 * Uncontrolled (default) via `defaultOpen`, or controlled via `open` +
 * `onOpenChange`. The title row is a `<button>` with aria-expanded so
 * Space / Enter toggle natively.
 */

export type AccordionVariant = "line" | "wrapper";

export interface AccordionProps {
  title: ReactNode;
  children?: ReactNode;
  badge?: ReactNode;
  variant?: AccordionVariant;
  /** Controlled open state. */
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  style?: CSSProperties;
}

const CHEVRON_DOWN = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden focusable={false}>
    <path
      d="M6 9L12 15L18 9"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export function Accordion({
  title,
  children,
  badge,
  variant = "line",
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  className,
  style: styleProp,
}: AccordionProps) {
  const isControlled = typeof openProp === "boolean";
  const [uncontrolled, setUncontrolled] = useState(defaultOpen);
  const open = isControlled ? openProp! : uncontrolled;

  const id = useId();
  const panelId = `wds-accordion-${id}`;
  const headerId = `${panelId}-header`;

  function toggle() {
    const next = !open;
    if (!isControlled) setUncontrolled(next);
    onOpenChange?.(next);
  }

  const isWrapper = variant === "wrapper";

  const container: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: padding.xs, // 8
    width: "100%",
    background: color.background["bg-white"],
    border: isWrapper ? `1px solid ${color.line.normal}` : undefined,
    borderBottom: `1px solid ${color.line.normal}`,
    borderRadius: isWrapper ? radius.s : undefined,
    padding: isWrapper ? padding.s : padding.m,
    fontFamily: typography.fontFamily,
    ...styleProp,
  };

  const headerRow: CSSProperties = {
    display: "flex",
    alignItems: "flex-start",
    gap: margin.s,
    width: "100%",
    background: "transparent",
    border: "none",
    padding: 0,
    textAlign: "left",
    cursor: "pointer",
    fontFamily: typography.fontFamily,
    color: color.label.strong,
  };

  const titleStyle: CSSProperties = {
    flex: 1,
    minWidth: 0,
    margin: 0,
    display: "inline-flex",
    alignItems: "center",
    gap: margin.s,
    flexWrap: "wrap",
    fontSize: typography.size.md,
    lineHeight: typography.lineHeight.md,
    fontWeight: typography.weight.SB,
    color: color.label.strong,
  };

  const chevronSlot: CSSProperties = {
    display: "inline-flex",
    width: 24,
    height: 24,
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
    color: color.icon.default,
    transition: "transform 150ms ease-out",
    transform: open ? "rotate(180deg)" : undefined,
  };

  const body: CSSProperties = {
    margin: 0,
    fontSize: typography.size.md,
    lineHeight: typography.lineHeight.lg,
    fontWeight: typography.weight.R,
    color: color.label.normal,
    width: "100%",
  };

  return (
    <div className={className} style={container}>
      <button
        type="button"
        id={headerId}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={toggle}
        className="wds-block-button"
        style={headerRow}
      >
        <span style={titleStyle}>
          <span style={{ flex: 1, minWidth: 0 }}>{title}</span>
          {badge && <span style={{ flexShrink: 0 }}>{badge}</span>}
        </span>
        <span style={chevronSlot}>{CHEVRON_DOWN}</span>
      </button>
      {open && (
        <div id={panelId} role="region" aria-labelledby={headerId} style={body}>
          {children}
        </div>
      )}
    </div>
  );
}
