"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import type { CSSProperties, KeyboardEvent, ReactNode } from "react";
import { color, margin, padding, radius, shadow, typography } from "@wds/tokens";

/**
 * WDS Select Menu — custom dropdown with full keyboard support.
 *
 * Figma: Components / Select Menu (node `5015:33627`, bucket `5003:12154`)
 * "드롭다운 형태로 여러 개의 선택지를 제공하는 컴포넌트입니다. 사용자가
 *  옵션을 선택하면 해당 값이 입력 필드에 반영됩니다."
 *
 * Phase-2 DIY policy: no Radix / Headless UI. Implemented as a controlled
 * ARIA combobox (`role="combobox"` on the trigger, `role="listbox"` on the
 * popover, `role="option"` on each item) with the following keyboard map:
 *
 *   Trigger:   ArrowDown / ArrowUp → open + focus first/last item
 *              Enter / Space       → open
 *   Listbox:   ArrowDown / ArrowUp → move active option (wraps)
 *              Home / End          → first / last option
 *              Enter               → commit active option
 *              Escape              → close, return focus to trigger
 *
 * Size matrix (from Figma):
 *   L  — padding-s (12) / lg  / line-height-md
 *   M  — padding-xs (8)  / sm  / line-height-sm, h-[40px]
 *   S  — padding-xs (8)  / sm  / line-height-sm, w-[200px]
 */

export type SelectMenuSize = "L" | "M" | "S";

export interface SelectOption<T extends string = string> {
  value: T;
  label: ReactNode;
  disabled?: boolean;
}

export interface SelectMenuProps<T extends string = string> {
  size?: SelectMenuSize;
  options: SelectOption<T>[];
  value?: T;
  onChange?: (value: T) => void;
  placeholder?: string;
  disabled?: boolean;
  label?: string;
  helperText?: string;
  error?: string;
  id?: string;
  className?: string;
  "aria-label"?: string;
}

const CHEVRON = (open: boolean) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    aria-hidden
    focusable={false}
    style={{
      transition: "transform 150ms ease-out",
      transform: open ? "rotate(180deg)" : undefined,
    }}
  >
    <path
      d="M5 7.5L10 12.5L15 7.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const sizeSpec = {
  L: {
    pad: padding.s,                  // 12
    gap: margin.s,                   //  8
    fontSize:   typography.size.lg,
    lineHeight: typography.lineHeight.md,
    minHeight: 48,
  },
  M: {
    pad: padding.xs,                 //  8
    gap: margin.xs,                  //  4
    fontSize:   typography.size.sm,
    lineHeight: typography.lineHeight.sm,
    minHeight: 40,
  },
  S: {
    pad: padding.xs,                 //  8
    gap: margin.xs,                  //  4
    fontSize:   typography.size.sm,
    lineHeight: typography.lineHeight.sm,
    minHeight: 36,
  },
} as const;

export function SelectMenu<T extends string = string>({
  size = "L",
  options,
  value,
  onChange,
  placeholder = "옵션을 선택해주세요.",
  disabled = false,
  label,
  helperText,
  error,
  id,
  className,
  "aria-label": ariaLabel,
}: SelectMenuProps<T>) {
  const reactId = useId();
  const triggerId = id ?? `wds-select-${reactId}`;
  const listId = `${triggerId}-list`;
  const labelId = label ? `${triggerId}-label` : undefined;

  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<number>(() => {
    const idx = options.findIndex((o) => o.value === value);
    return idx < 0 ? 0 : idx;
  });

  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);

  // Click-outside: close when the pointer lands anywhere outside the root.
  useEffect(() => {
    if (!open) return;
    function onDocMouseDown(e: MouseEvent) {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocMouseDown);
    return () => document.removeEventListener("mousedown", onDocMouseDown);
  }, [open]);

  // Keep the active option in view when it changes.
  useEffect(() => {
    if (!open || !listRef.current) return;
    const el = listRef.current.querySelector<HTMLLIElement>(
      `[data-idx="${active}"]`
    );
    el?.scrollIntoView({ block: "nearest" });
  }, [open, active]);

  const spec = sizeSpec[size];
  const hasError = Boolean(error);
  const selected = useMemo(
    () => options.find((o) => o.value === value) ?? null,
    [options, value]
  );
  const showingValue = selected !== null;

  function commit(idx: number) {
    const opt = options[idx];
    if (!opt || opt.disabled) return;
    onChange?.(opt.value);
    setOpen(false);
    triggerRef.current?.focus();
  }

  function nextEnabled(from: number, dir: 1 | -1): number {
    const n = options.length;
    if (n === 0) return from;
    let i = from;
    for (let step = 0; step < n; step++) {
      i = (i + dir + n) % n;
      if (!options[i]?.disabled) return i;
    }
    return from;
  }

  function onTriggerKeyDown(e: KeyboardEvent<HTMLButtonElement>) {
    if (disabled) return;
    switch (e.key) {
      case "ArrowDown":
      case "Down":
      case "Enter":
      case " ":
      case "Spacebar":
        e.preventDefault();
        setOpen(true);
        setActive(options.findIndex((o) => o.value === value) >= 0
          ? options.findIndex((o) => o.value === value)
          : nextEnabled(-1, 1));
        break;
      case "ArrowUp":
      case "Up":
        e.preventDefault();
        setOpen(true);
        setActive(nextEnabled(options.length, -1));
        break;
      case "Escape":
        if (open) {
          e.preventDefault();
          setOpen(false);
        }
        break;
    }
  }

  function onListKeyDown(e: KeyboardEvent<HTMLUListElement>) {
    switch (e.key) {
      case "ArrowDown":
      case "Down":
        e.preventDefault();
        setActive((i) => nextEnabled(i, 1));
        break;
      case "ArrowUp":
      case "Up":
        e.preventDefault();
        setActive((i) => nextEnabled(i, -1));
        break;
      case "Home":
        e.preventDefault();
        setActive(nextEnabled(-1, 1));
        break;
      case "End":
        e.preventDefault();
        setActive(nextEnabled(options.length, -1));
        break;
      case "Enter":
        e.preventDefault();
        commit(active);
        break;
      case "Escape":
      case "Tab":
        e.preventDefault();
        setOpen(false);
        triggerRef.current?.focus();
        break;
    }
  }

  /* ── Chrome ─────────────────────────────────────────────────────── */

  const triggerChrome: CSSProperties = disabled
    ? {
        background: color.background["bg-50"],
        borderColor: color.line.normal,
        color: color.label.assistive,
        cursor: "not-allowed",
      }
    : {
        background: color.background["bg-white"],
        borderColor: hasError ? color.status.error : color.line.normal,
        color: showingValue ? color.label.normal : color.label.neutral,
        cursor: "pointer",
      };

  const wrapper: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: margin.s,
    fontFamily: typography.fontFamily,
    width: "100%",
  };

  const labelStyle: CSSProperties = {
    fontSize: typography.size.md,
    lineHeight: typography.lineHeight.md,
    fontWeight: typography.weight.SB,
    color: disabled ? color.label.alternative : color.label.normal,
  };

  const trigger: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spec.gap,
    width: "100%",
    minHeight: spec.minHeight,
    padding: spec.pad,
    borderRadius: radius.xs,
    border: `1px solid`,
    fontFamily: typography.fontFamily,
    fontSize: spec.fontSize,
    lineHeight: spec.lineHeight,
    fontWeight: typography.weight.M,
    letterSpacing: typography.letterSpacing,
    textAlign: "left",
    appearance: "none",
    WebkitAppearance: "none",
    transition: "border-color 150ms ease-out, background 150ms ease-out",
    ...triggerChrome,
  };

  const labelText: CSSProperties = {
    flex: 1,
    minWidth: 0,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  };

  const chevronSlot: CSSProperties = {
    display: "inline-flex",
    width: 20,
    height: 20,
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
    color: disabled ? color.label.assistive : color.icon.default,
  };

  const popover: CSSProperties = {
    position: "absolute",
    top: "calc(100% + 2px)",
    left: 0,
    right: 0,
    zIndex: 10,
    background: color.background["bg-white"],
    border: `1px solid ${color.line.normal}`,
    borderRadius: radius.xs,
    boxShadow: shadow[3],
    overflow: "hidden",
    padding: 0,
    margin: 0,
    listStyle: "none",
    maxHeight: 280,
    overflowY: "auto",
  };

  const helpBase: CSSProperties = {
    fontSize: typography.size.xs,
    lineHeight: "16px",
    fontWeight: typography.weight.M,
  };

  return (
    <div style={wrapper} className={className}>
      {label && (
        <label id={labelId} htmlFor={triggerId} style={labelStyle}>
          {label}
        </label>
      )}
      <div ref={rootRef} style={{ position: "relative" }}>
        <button
          ref={triggerRef}
          id={triggerId}
          type="button"
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listId}
          aria-labelledby={labelId}
          aria-label={!label ? ariaLabel : undefined}
          aria-disabled={disabled || undefined}
          aria-invalid={hasError || undefined}
          disabled={disabled}
          onClick={() => !disabled && setOpen((o) => !o)}
          onKeyDown={onTriggerKeyDown}
          style={trigger}
        >
          <span style={labelText}>
            {showingValue ? selected!.label : placeholder}
          </span>
          <span style={chevronSlot}>{CHEVRON(open)}</span>
        </button>
        {open && !disabled && (
          <ul
            id={listId}
            // Autofocus the listbox on mount so arrow keys drive navigation
            // immediately. We store the same node on `listRef.current` so
            // the "scroll active into view" effect can query it.
            ref={(el) => {
              listRef.current = el;
              el?.focus();
            }}
            role="listbox"
            tabIndex={-1}
            aria-labelledby={labelId}
            onKeyDown={onListKeyDown}
            style={popover}
          >
            {options.map((opt, i) => {
              const isSelected = opt.value === value;
              const isActive = i === active;
              const itemBg = isActive
                ? color.background["bg-50"]
                : color.background["bg-white"];
              const itemFg = isSelected
                ? color.primary.normal
                : opt.disabled
                  ? color.label.assistive
                  : color.label.normal;
              return (
                <li
                  key={String(opt.value)}
                  data-idx={i}
                  role="option"
                  aria-selected={isSelected}
                  aria-disabled={opt.disabled || undefined}
                  onMouseEnter={() => setActive(i)}
                  onMouseDown={(e) => {
                    // Prevent button blur before click fires.
                    e.preventDefault();
                  }}
                  onClick={() => commit(i)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: padding.s,
                    background: itemBg,
                    color: itemFg,
                    cursor: opt.disabled ? "not-allowed" : "pointer",
                    fontSize: typography.size.md,
                    lineHeight: typography.lineHeight.md,
                    fontWeight: isSelected
                      ? typography.weight.B
                      : typography.weight.M,
                  }}
                >
                  {opt.label}
                </li>
              );
            })}
          </ul>
        )}
      </div>
      {helperText && !error && (
        <div style={{ ...helpBase, color: color.label.neutral }}>{helperText}</div>
      )}
      {error && (
        <div style={{ ...helpBase, color: color.status.error }}>{error}</div>
      )}
    </div>
  );
}
