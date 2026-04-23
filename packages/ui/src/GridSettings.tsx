"use client";

import type { CSSProperties, ReactNode } from "react";
import { color, margin, padding, typography } from "@wds/tokens";

/**
 * WDS Grid Settings — two-state layout switcher (list ↔ grid).
 *
 * Figma: Components / GridSettings (node `5018:38664`)
 * "콘텐츠 레이아웃을 리스트 또는 그리드 형식으로 변경할 수 있는 UI 요소입니다."
 *
 * Left side: section title (xl / Bold / line-height-xl / label.normal).
 * Right side: 2-cell segmented toggle. The active cell is tinted bg-50;
 * both cells share a single 1px line.normal outer border with 4px radius.
 *
 * The toggle icons (list-ul, dashboard/grid) are supplied by the consumer
 * so the DS doesn't ship its own icon set.
 */

export type GridSettingsValue = "list" | "grid";

export interface GridSettingsProps {
  title: ReactNode;
  value: GridSettingsValue;
  onChange?: (value: GridSettingsValue) => void;
  listIcon: ReactNode;
  gridIcon: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export function GridSettings({
  title,
  value,
  onChange,
  listIcon,
  gridIcon,
  className,
  style: styleProp,
}: GridSettingsProps) {
  const row: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: margin.s,
    width: "100%",
    padding: padding.m,
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
    color: color.label.normal,
  };

  const toggleShell: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "flex-end",
    border: `1px solid ${color.line.normal}`,
    borderRadius: 4,
    overflow: "hidden",
  };

  const cell = (active: boolean, position: "start" | "end"): CSSProperties => ({
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: padding.xs,
    background: active ? color.background["bg-50"] : "transparent",
    color: color.icon.default,
    border: "none",
    cursor: "pointer",
    borderTopLeftRadius:  position === "start" ? 4 : 0,
    borderBottomLeftRadius: position === "start" ? 4 : 0,
    borderTopRightRadius: position === "end" ? 4 : 0,
    borderBottomRightRadius: position === "end" ? 4 : 0,
    appearance: "none",
    WebkitAppearance: "none",
  });

  const iconSlot: CSSProperties = {
    display: "inline-flex",
    width: 24,
    height: 24,
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
    color: "currentColor",
  };

  return (
    <div className={className} style={row}>
      <p style={titleStyle}>{title}</p>
      <div role="group" aria-label="Layout" style={toggleShell}>
        <button
          type="button"
          aria-pressed={value === "list"}
          aria-label="List"
          onClick={() => onChange?.("list")}
          style={cell(value === "list", "start")}
          className="wds-block-button"
        >
          <span style={iconSlot}>{listIcon}</span>
        </button>
        <button
          type="button"
          aria-pressed={value === "grid"}
          aria-label="Grid"
          onClick={() => onChange?.("grid")}
          style={cell(value === "grid", "end")}
          className="wds-block-button"
        >
          <span style={iconSlot}>{gridIcon}</span>
        </button>
      </div>
    </div>
  );
}
