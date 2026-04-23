"use client";

import type { CSSProperties, ReactNode } from "react";
import { color, typography } from "@wds/tokens";

/**
 * WDS Tab Bar — bottom navigation bar.
 *
 * Figma: Components / Tab Bars (node `3001:19725`)
 * "하단에 위치하여 주요 화면 간 빠르게 전환할 수 있도록 도와주는 탭
 *  네비게이션 컴포넌트입니다."
 *
 * Figma publishes five hard-coded variants (01–05) that just differ in
 * which of the five stock tabs is active. For our component we accept
 * the tab list as a prop and derive the active-tab highlighting from
 * `activeKey`, so the consumer controls both the content and the state.
 *
 * Each tab-item is a 28px icon + 12px label. Active tab uses bold
 * weight and `label.normal`; inactive tabs use semibold and
 * `interaction.inactive`. When an `activeIcon` is provided for a tab,
 * it replaces the regular `icon` for the active state (used for filled
 * vs. outlined iconography).
 *
 * The container ships rounded top corners (20px) and a 1px top hairline
 * so it can sit directly on a screen without an outer wrapper. The home
 * indicator (134×5 pill) is opt-in via `showHomeIndicator`.
 */

export interface TabBarItem {
  key: string;
  label: ReactNode;
  /** 28px glyph for the inactive state. */
  icon: ReactNode;
  /** Optional 28px glyph for the active state (filled variant). */
  activeIcon?: ReactNode;
}

export interface TabBarProps {
  items: TabBarItem[];
  activeKey: string;
  onChange?: (key: string) => void;
  showHomeIndicator?: boolean;
  className?: string;
  style?: CSSProperties;
}

export function TabBar({
  items,
  activeKey,
  onChange,
  showHomeIndicator = true,
  className,
  style: styleProp,
}: TabBarProps) {
  const root: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    paddingTop: 8,
    background: color.background["bg-white"],
    borderTop: `1px solid ${color.line.neutral}`,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    fontFamily: typography.fontFamily,
    ...styleProp,
  };

  const itemRow: CSSProperties = {
    display: "flex",
    alignItems: "flex-start",
    width: "100%",
  };

  const tabBtn = (active: boolean): CSSProperties => ({
    flex: 1,
    minWidth: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    padding: 0,
    background: "transparent",
    border: "none",
    cursor: "pointer",
    color: active ? color.label.normal : color.interaction.inactive,
    fontFamily: typography.fontFamily,
    fontSize: typography.size.xs,
    lineHeight: typography.lineHeight.xs,
    fontWeight: active ? typography.weight.B : typography.weight.SB,
    letterSpacing: typography.letterSpacing,
    appearance: "none",
    WebkitAppearance: "none",
  });

  const iconSlot: CSSProperties = {
    display: "inline-flex",
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  };

  const homeIndicatorWrap: CSSProperties = {
    position: "relative",
    width: 134,
    height: 34,
    flexShrink: 0,
  };
  const homeIndicator: CSSProperties = {
    position: "absolute",
    left: "50%",
    bottom: 8,
    width: 134,
    height: 5,
    background: "#17191A", // Figma: home indicator bar color
    borderRadius: 100,
    transform: "translateX(-50%)",
  };

  return (
    <nav
      role="tablist"
      aria-orientation="horizontal"
      className={className}
      style={root}
    >
      <div style={itemRow}>
        {items.map((item) => {
          const active = item.key === activeKey;
          const glyph = active && item.activeIcon ? item.activeIcon : item.icon;
          return (
            <button
              key={item.key}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => onChange?.(item.key)}
              style={tabBtn(active)}
              className="wds-block-button"
            >
              <span style={iconSlot}>{glyph}</span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
      {showHomeIndicator && (
        <div style={homeIndicatorWrap}>
          <div style={homeIndicator} />
        </div>
      )}
    </nav>
  );
}
