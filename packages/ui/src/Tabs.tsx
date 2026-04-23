"use client";

import { useRef } from "react";
import type { CSSProperties, KeyboardEvent, ReactNode } from "react";
import { color, padding, typography } from "@wds/tokens";

/**
 * WDS Tabs — horizontal section switcher.
 *
 * Figma: Components / Tabs (node `3001:20034`)
 * "화면 내 여러 섹션을 전환하는 탭 네비게이션 컴포넌트입니다."
 *
 * Distinct from `TabBar` (bottom main-nav). This is an in-page tablist.
 *
 * Figma publishes a 2-dim matrix:
 *   grid  Default (left-packed) · Space-between · Flexible (equal flex)
 *   type  Text (bottom hairline) · No-line (no bottom border)
 *
 * Active tab: md / Bold / label.strong with a 2px black underline
 * indicator. Inactive tab: same chrome at 50% opacity.
 *
 * Keyboard (per APG Tabs pattern):
 *   ArrowLeft / ArrowRight  — move focus + activate
 *   Home / End              — jump to first / last
 *   Enter / Space           — activate the focused tab
 */

export interface TabsItem {
  key: string;
  label: ReactNode;
}

export type TabsGrid = "default" | "space-between" | "flexible";

export interface TabsProps {
  items: TabsItem[];
  activeKey: string;
  onChange?: (key: string) => void;
  grid?: TabsGrid;
  /** Show the bottom hairline under the tablist. Default `true`. */
  showLine?: boolean;
  className?: string;
  style?: CSSProperties;
}

export function Tabs({
  items,
  activeKey,
  onChange,
  grid = "default",
  showLine = true,
  className,
  style: styleProp,
}: TabsProps) {
  const listRef = useRef<HTMLDivElement | null>(null);

  const activeIndex = Math.max(
    0,
    items.findIndex((i) => i.key === activeKey)
  );

  function focusTab(idx: number) {
    const el = listRef.current?.querySelector<HTMLButtonElement>(
      `[data-idx="${idx}"]`
    );
    el?.focus();
    const next = items[idx];
    if (next) onChange?.(next.key);
  }

  function onKey(e: KeyboardEvent<HTMLDivElement>) {
    const n = items.length;
    if (n === 0) return;
    switch (e.key) {
      case "ArrowRight":
      case "Right":
        e.preventDefault();
        focusTab((activeIndex + 1) % n);
        break;
      case "ArrowLeft":
      case "Left":
        e.preventDefault();
        focusTab((activeIndex - 1 + n) % n);
        break;
      case "Home":
        e.preventDefault();
        focusTab(0);
        break;
      case "End":
        e.preventDefault();
        focusTab(n - 1);
        break;
    }
  }

  const root: CSSProperties = {
    display: "flex",
    overflow: "hidden",
    paddingInline: padding.m,
    width: "100%",
    justifyContent: grid === "space-between"
      ? "space-between"
      : grid === "flexible"
        ? "center"
        : "flex-start",
    alignItems: "flex-start",
    gap: grid === "space-between" ? 0 : padding.m, // 16
    borderBottom: showLine ? `1px solid ${color.line.normal}` : undefined,
    background: "transparent",
    fontFamily: typography.fontFamily,
    ...styleProp,
  };

  const tabBtn = (active: boolean, flexible: boolean): CSSProperties => ({
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingBlock: padding.m,
    paddingInline: 0,
    flex: flexible ? "1 1 0" : "0 0 auto",
    minWidth: 0,
    background: "transparent",
    border: "none",
    color: color.label.strong,
    opacity: active ? 1 : 0.5,
    fontFamily: typography.fontFamily,
    fontSize: typography.size.md,
    lineHeight: typography.lineHeight.md,
    fontWeight: typography.weight.B,
    letterSpacing: typography.letterSpacing,
    whiteSpace: "nowrap",
    cursor: "pointer",
    appearance: "none",
    WebkitAppearance: "none",
  });

  const indicator: CSSProperties = {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 2,
    background: color.label.strong,
  };

  const flexible = grid === "flexible";

  return (
    <div
      ref={listRef}
      role="tablist"
      aria-orientation="horizontal"
      onKeyDown={onKey}
      className={className}
      style={root}
    >
      {items.map((item, i) => {
        const active = i === activeIndex;
        return (
          <button
            key={item.key}
            type="button"
            role="tab"
            aria-selected={active}
            data-idx={i}
            tabIndex={active ? 0 : -1}
            onClick={() => onChange?.(item.key)}
            style={tabBtn(active, flexible)}
            className="wds-block-button"
          >
            <span>{item.label}</span>
            {active && <span aria-hidden style={indicator} />}
          </button>
        );
      })}
    </div>
  );
}
