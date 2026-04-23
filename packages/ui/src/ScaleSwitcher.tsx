"use client";

import { useRef, type CSSProperties, type KeyboardEvent } from "react";
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
 * WDS ScaleSwitcher — the DS-C3 control for the elderly-focused app.
 *
 * Implements the WAI-ARIA 1.2 Tabs "automatic activation" pattern:
 *   - role=tablist / tab
 *   - aria-selected mirrors `scale`
 *   - roving tabindex: only the active tab is tabbable; others are -1
 *   - ←/→ move focus AND activate (automatic activation — standard for
 *     "content always-visible" cases like this one)
 *   - Home / End jump to the first / last tab
 *   - visible keyboard focus ring (outline that doesn't eat layout)
 *
 * DIY rather than a headless-library wrapper because this single pattern
 * is well-scoped; Dialog / Combobox etc. can be re-evaluated in Phase 2.
 */
export function ScaleSwitcher({ scale, onChange }: ScaleSwitcherProps) {
  const refs = useRef<Array<HTMLButtonElement | null>>([]);

  const activeIdx = Math.max(
    0,
    OPTIONS.findIndex((o) => o.id === scale),
  );

  const moveTo = (idx: number) => {
    const target = OPTIONS[idx];
    if (!target) return;
    onChange(target.id);
    // Defer focus until React has committed the new tabindex values.
    requestAnimationFrame(() => refs.current[idx]?.focus());
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    switch (e.key) {
      case "ArrowRight":
        e.preventDefault();
        moveTo((activeIdx + 1) % OPTIONS.length);
        break;
      case "ArrowLeft":
        e.preventDefault();
        moveTo((activeIdx - 1 + OPTIONS.length) % OPTIONS.length);
        break;
      case "Home":
        e.preventDefault();
        moveTo(0);
        break;
      case "End":
        e.preventDefault();
        moveTo(OPTIONS.length - 1);
        break;
    }
  };

  const wrapper: CSSProperties = {
    display: "flex",
    border: `1px solid ${color.line.normal}`,
    borderRadius: radius.s,
    overflow: "hidden",
    background: color.background["bg-white"],
  };

  return (
    <div
      role="tablist"
      aria-label="글자 크기"
      onKeyDown={onKeyDown}
      style={wrapper}
    >
      {OPTIONS.map((o, i) => {
        const active = scale === o.id;
        const tabStyle: CSSProperties = {
          flex: 1,
          // minHeight, not height — content can grow with typography tier.
          minHeight: 44, // a11y: WCAG 2.5.5 touch target recommendation
          paddingBlock: 10,
          paddingInline: 12,
          border: "none",
          cursor: "pointer",
          background: active ? color.primary.normal : color.background["bg-white"],
          color: active ? color.label.white : color.label.normal,
          fontFamily: typography.fontFamily,
          fontSize: typography.size.sm,
          lineHeight: typography.lineHeight.sm,
          fontWeight: typography.weight.M,
          letterSpacing: typography.letterSpacing,
          borderRight:
            i < OPTIONS.length - 1 ? `1px solid ${color.line.normal}` : "none",
          // :focus-visible ring is applied by `.wds-scale-switcher-tab` in ui.css;
          // the color hookup lives on this inline style as a CSS custom property.
          ["--wds-focus-ring" as string]: active
            ? "rgba(255, 255, 255, 0.6)"       // active tab (green bg) → white halo
            : "rgba(24, 161, 154, 0.5)",        // idle tabs (white bg) → brand halo
        };
        return (
          <button
            key={o.id}
            ref={(el) => {
              refs.current[i] = el;
            }}
            role="tab"
            type="button"
            aria-selected={active}
            tabIndex={active ? 0 : -1}
            onClick={() => onChange(o.id)}
            className="wds-scale-switcher-tab"
            style={tabStyle}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
