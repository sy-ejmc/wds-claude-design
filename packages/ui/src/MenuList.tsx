"use client";

import type { CSSProperties, ReactNode, HTMLAttributes } from "react";
import { color, margin, padding, typography } from "@wds/tokens";
import { Switch } from "./Switch";

/**
 * WDS Menu List — a single row in a list/settings surface.
 *
 * Figma: Components / Menu List (node `3001:19869`, catalogued under
 * `5015:33424`)
 * "설정 화면이나 네비게이션 메뉴에서 사용할 수 있는 리스트 컴포넌트입니다."
 *
 * Variants from Figma (`type` prop):
 *   default — clickable row, right-chevron affordance
 *   switch  — inline Switch as the trailing control
 *   radio   — radio indicator as the trailing control
 *   head    — section header (no trailing, not clickable)
 *   text    — right-aligned small caption as trailing
 *
 * Optional slots (any variant except `head`): `leftIcon` (24px) and
 * `description` (xs / M / 16px / label.neutral, below the title).
 *
 * Layout verbatim from Figma: row h-56 / min-h-48, px-16 py-8, gap-8.
 * Title: lg / SB / line-height-lg / label.strong.
 */

export type MenuListVariant = "default" | "switch" | "radio" | "head" | "text";

type Base = {
  title: ReactNode;
  description?: ReactNode;
  leftIcon?: ReactNode;
  className?: string;
  style?: CSSProperties;
};

type DefaultProps = Base & {
  variant?: "default";
  onClick?: () => void;
  disabled?: boolean;
};

type SwitchProps = Base & {
  variant: "switch";
  checked: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
};

type RadioProps = Base & {
  variant: "radio";
  selected: boolean;
  onSelect?: () => void;
  disabled?: boolean;
};

type HeadProps = Omit<Base, "description" | "leftIcon"> & {
  variant: "head";
};

type TextProps = Base & {
  variant: "text";
  trailingText: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};

export type MenuListProps =
  | DefaultProps
  | SwitchProps
  | RadioProps
  | HeadProps
  | TextProps;

/* ── Shared atoms ────────────────────────────────────────────────── */

const CHEVRON_RIGHT = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden focusable={false}>
    <path
      d="M9 6L15 12L9 18"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function RadioIndicator({ selected }: { selected: boolean }) {
  if (selected) {
    return (
      <span
        aria-hidden
        style={{
          position: "relative",
          display: "inline-block",
          width: 24,
          height: 24,
          flexShrink: 0,
          borderRadius: "50%",
          background: color.background["bg-50"],
          border: `1px solid ${color.primary.light}`,
        }}
      >
        <span
          style={{
            position: "absolute",
            top: 7,
            left: 7,
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: color.primary.normal,
            border: "1px solid rgba(0,0,0,0.1)",
          }}
        />
      </span>
    );
  }
  return (
    <span
      aria-hidden
      style={{
        display: "inline-block",
        width: 24,
        height: 24,
        flexShrink: 0,
        borderRadius: "50%",
        background: color.background["bg-50"],
        border: "1px solid rgba(0,0,0,0.2)",
      }}
    />
  );
}

/* ── Shared row shell ────────────────────────────────────────────── */

const rowBase: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: margin.s,               // 8
  width: "100%",
  minHeight: 48,
  // Figma floor is 56; minHeight allows growth at higher tiers.
  paddingBlock: padding.xs,    // 8
  paddingInline: padding.m,    // 16
  background: color.background["bg-white"],
  fontFamily: typography.fontFamily,
  textAlign: "left",
};

const titleStyle: CSSProperties = {
  display: "block",
  margin: 0,
  fontSize: typography.size.lg,
  lineHeight: typography.lineHeight.lg,
  fontWeight: typography.weight.SB,
  color: color.label.strong,
  width: "100%",
};

const descStyle: CSSProperties = {
  display: "block",
  margin: 0,
  fontSize: typography.size.xs,
  lineHeight: "16px",
  fontWeight: typography.weight.M,
  color: color.label.neutral,
  width: "100%",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

const leftIconSlot: CSSProperties = {
  display: "inline-flex",
  width: 24,
  height: 24,
  flexShrink: 0,
  alignItems: "center",
  justifyContent: "center",
  color: color.icon.default,
};

const trailingSlot: CSSProperties = {
  display: "inline-flex",
  flexShrink: 0,
  alignItems: "center",
  gap: 2,
  color: color.icon.default,
};

const trailingTextStyle: CSSProperties = {
  fontSize: typography.size.sm,
  lineHeight: typography.lineHeight.sm,
  fontWeight: typography.weight.M,
  color: color.label.normal,
  whiteSpace: "nowrap",
};

function TextColumn({
  title,
  description,
  align = "start",
}: {
  title: ReactNode;
  description?: ReactNode;
  align?: "start" | "stretch";
}) {
  return (
    <span
      style={{
        display: "flex",
        flex: 1,
        minWidth: 0,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: align === "stretch" ? "stretch" : "flex-start",
      }}
    >
      <span style={titleStyle}>{title}</span>
      {description && <span style={descStyle}>{description}</span>}
    </span>
  );
}

/* ── Component ───────────────────────────────────────────────────── */

export function MenuList(props: MenuListProps) {
  const { variant = "default", className } = props as Base & { variant?: MenuListVariant };
  const style: CSSProperties = { ...rowBase, ...((props as Base).style ?? {}) };

  if (variant === "head") {
    const p = props as HeadProps;
    return (
      <div
        role="heading"
        aria-level={3}
        className={className}
        style={style}
      >
        <span
          style={{
            ...titleStyle,
            flex: 1,
            minWidth: 0,
          }}
        >
          {p.title}
        </span>
      </div>
    );
  }

  if (variant === "switch") {
    const p = props as SwitchProps;
    // Clicking anywhere on the row toggles — mirrors iOS settings UX.
    const toggle = () => !p.disabled && p.onCheckedChange?.(!p.checked);
    return (
      <div
        role="group"
        className={className}
        style={{ ...style, cursor: p.disabled ? "not-allowed" : "pointer", opacity: p.disabled ? 0.5 : 1 }}
        onClick={toggle}
      >
        {p.leftIcon && <span style={leftIconSlot}>{p.leftIcon}</span>}
        <TextColumn title={p.title} description={p.description} align="stretch" />
        <span style={trailingSlot} onClick={(e) => e.stopPropagation()}>
          <Switch
            checked={p.checked}
            onCheckedChange={p.onCheckedChange}
            disabled={p.disabled}
            aria-label={typeof p.title === "string" ? p.title : undefined}
          />
        </span>
      </div>
    );
  }

  if (variant === "radio") {
    const p = props as RadioProps;
    const handleClick = () => !p.disabled && p.onSelect?.();
    return (
      <button
        type="button"
        role="radio"
        aria-checked={p.selected}
        aria-disabled={p.disabled || undefined}
        disabled={p.disabled}
        className={["wds-block-button", className].filter(Boolean).join(" ")}
        style={{
          ...style,
          border: "none",
          cursor: p.disabled ? "not-allowed" : "pointer",
          opacity: p.disabled ? 0.5 : 1,
          appearance: "none",
          WebkitAppearance: "none",
        }}
        onClick={handleClick}
      >
        {p.leftIcon && <span style={leftIconSlot}>{p.leftIcon}</span>}
        <TextColumn title={p.title} description={p.description} />
        <span style={trailingSlot}>
          <RadioIndicator selected={p.selected} />
        </span>
      </button>
    );
  }

  if (variant === "text") {
    const p = props as TextProps;
    const Tag = p.onClick ? "button" : "div";
    const tagProps: HTMLAttributes<HTMLElement> = p.onClick
      ? ({
          onClick: p.disabled ? undefined : p.onClick,
        } as HTMLAttributes<HTMLElement>)
      : {};
    return (
      <Tag
        type={p.onClick ? ("button" as never) : undefined}
        disabled={p.onClick ? p.disabled : undefined}
        className={[p.onClick ? "wds-block-button" : undefined, className]
          .filter(Boolean)
          .join(" ")}
        style={{
          ...style,
          border: "none",
          cursor: p.onClick ? (p.disabled ? "not-allowed" : "pointer") : "default",
          opacity: p.disabled ? 0.5 : 1,
          appearance: "none",
          WebkitAppearance: "none",
        }}
        {...tagProps}
      >
        {p.leftIcon && <span style={leftIconSlot}>{p.leftIcon}</span>}
        <TextColumn title={p.title} description={p.description} align="stretch" />
        <span style={{ ...trailingSlot, ...trailingTextStyle }}>{p.trailingText}</span>
      </Tag>
    );
  }

  // default
  const p = props as DefaultProps;
  const Tag = p.onClick ? "button" : "div";
  return (
    <Tag
      type={p.onClick ? ("button" as never) : undefined}
      disabled={p.onClick ? p.disabled : undefined}
      className={[p.onClick ? "wds-block-button" : undefined, className]
        .filter(Boolean)
        .join(" ")}
      style={{
        ...style,
        border: "none",
        cursor: p.onClick ? (p.disabled ? "not-allowed" : "pointer") : "default",
        opacity: p.disabled ? 0.5 : 1,
        appearance: "none",
        WebkitAppearance: "none",
      }}
      onClick={p.onClick}
    >
      {p.leftIcon && <span style={leftIconSlot}>{p.leftIcon}</span>}
      <TextColumn title={p.title} description={p.description} align="stretch" />
      <span style={trailingSlot} aria-hidden>
        {CHEVRON_RIGHT}
      </span>
    </Tag>
  );
}
