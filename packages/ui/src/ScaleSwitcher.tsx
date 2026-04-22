"use client";

import type { CSSProperties } from "react";
import { color, radius, typography } from "@wds/tokens";
import type { TypographyScale } from "@wds/tokens";

export interface ScaleSwitcherProps {
  scale: TypographyScale;
  onChange: (next: TypographyScale) => void;
}

const OPTIONS: { id: TypographyScale; label: string }[] = [
  { id: "normal",  label: "일반 보기" },
  { id: "large",   label: "크게 보기" },
  { id: "x-large", label: "더 크게 보기" },
];

/**
 * WDS ScaleSwitcher — the core DS-C3 UI control.
 *
 * Switches the active typography tier for the whole app by flipping the
 * `data-typography-scale` attribute at `<html>` (caller's responsibility).
 * The active tab uses `color.primary.normal`; inactive tabs stay on white.
 */
export function ScaleSwitcher({ scale, onChange }: ScaleSwitcherProps) {
  const wrapper: CSSProperties = {
    display: "flex",
    border: `1px solid ${color.line.normal}`,
    borderRadius: radius.s,
    overflow: "hidden",
    background: color.background["bg-white"],
  };

  return (
    <div role="tablist" aria-label="글자 크기" style={wrapper}>
      {OPTIONS.map((o, i) => {
        const active = scale === o.id;
        const btn: CSSProperties = {
          flex: 1,
          padding: "10px 12px",
          border: "none",
          cursor: "pointer",
          background: active ? color.primary.normal : color.background["bg-white"],
          color: active ? color.label.white : color.label.normal,
          fontFamily: typography.fontFamily,
          fontSize: typography.size.sm,
          lineHeight: typography.lineHeight.sm,
          fontWeight: typography.weight.M,
          borderRight: i < OPTIONS.length - 1 ? `1px solid ${color.line.normal}` : "none",
        };
        return (
          <button
            key={o.id}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(o.id)}
            style={btn}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
