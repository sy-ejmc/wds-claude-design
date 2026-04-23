"use client";

import type { CSSProperties, ReactNode } from "react";
import { color, margin, padding, typography } from "@wds/tokens";

/**
 * WDS Notification List — one row in an alert / notification feed.
 *
 * Figma: Components / Notification List (node `5015:33367`, bucket `3001:19911`)
 * "알림 목록을 구성하는 컴포넌트입니다."
 *
 * Figma publishes four variants:
 *   unread    — bg-50 surface, leading icon + title + subtext + trailingTime
 *   read      — bg-white, otherwise identical to unread
 *   text      — bg-white with a bottom hairline; subtext + meta row
 *               (category | time), no leading icon or title
 *   highlight — bg primary.light (green tint), multiline subtext +
 *               meta row. Figma calls this "미확인".
 *
 * `category` renders in brand green; a vertical divider then `time` in
 * label.alternative.
 */

export type NotificationVariant = "unread" | "read" | "text" | "highlight";

export interface NotificationListProps {
  variant?: NotificationVariant;
  /** 24px leading icon (unread/read only). */
  leadingIcon?: ReactNode;
  title?: ReactNode;
  subtext?: ReactNode;
  /** Right-aligned small time ("5분 전"). Used by unread/read. */
  trailingTime?: ReactNode;
  /** Leading chip in the meta row, tinted brand green. */
  category?: ReactNode;
  /** Trailing time in the meta row. */
  time?: ReactNode;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
}

function resolveSurface(variant: NotificationVariant) {
  switch (variant) {
    case "unread":    return { bg: color.background["bg-50"],    borderBottom: "transparent" };
    case "read":      return { bg: color.background["bg-white"], borderBottom: "transparent" };
    case "text":      return { bg: color.background["bg-white"], borderBottom: color.line.neutral };
    case "highlight": return { bg: color.primary.light,          borderBottom: "transparent" };
  }
}

const VerticalDivider = (
  <span
    aria-hidden
    style={{
      display: "inline-block",
      width: 1,
      height: 15,
      flexShrink: 0,
      // Figma: `fill/strong` (#e1e2e4) — divider step, inline since
      // `fill.strong` is exposed but we keep the hex comment for clarity.
      background: color.fill.strong, // coolgray-96
    }}
  />
);

export function NotificationList({
  variant = "unread",
  leadingIcon,
  title,
  subtext,
  trailingTime,
  category,
  time,
  className,
  style: styleProp,
  onClick,
}: NotificationListProps) {
  const surface = resolveSurface(variant);

  const row: CSSProperties = {
    display: "flex",
    alignItems: variant === "highlight" || variant === "text" ? "flex-start" : "center",
    gap: variant === "highlight" || variant === "text" ? 0 : margin.m,
    width: "100%",
    padding: padding.m,
    background: surface.bg,
    borderBottom:
      surface.borderBottom !== "transparent"
        ? `1px solid ${surface.borderBottom}`
        : undefined,
    fontFamily: typography.fontFamily,
    cursor: onClick ? "pointer" : "default",
    textAlign: "left",
    border: "none",
    ...styleProp,
  };

  const leadingSlot: CSSProperties = {
    display: "inline-flex",
    width: 24,
    height: 24,
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
    color: color.icon.default,
  };

  const titleStyle: CSSProperties = {
    margin: 0,
    fontSize: typography.size.lg,
    lineHeight: typography.lineHeight.lg,
    fontWeight: typography.weight.SB,
    color: color.label.normal,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  };

  const subtextStyle: CSSProperties = {
    margin: 0,
    fontSize: typography.size.md,
    lineHeight: typography.lineHeight.lg,
    fontWeight: typography.weight.R,
    color: color.label.neutral,
    width: "100%",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: variant === "highlight" ? "pre-wrap" : "nowrap",
  };

  const trailingTimeStyle: CSSProperties = {
    flexShrink: 0,
    fontSize: typography.size.sm,
    lineHeight: typography.lineHeight.sm,
    fontWeight: typography.weight.M,
    color: color.label.alternative,
    textAlign: "right",
    whiteSpace: "nowrap",
  };

  const categoryStyle: CSSProperties = {
    fontSize: typography.size.sm,
    lineHeight: typography.lineHeight.sm,
    fontWeight: typography.weight.M,
    color: color.primary.normal,
    whiteSpace: "nowrap",
  };

  const timeStyle: CSSProperties = {
    fontSize: typography.size.sm,
    lineHeight: typography.lineHeight.sm,
    fontWeight: typography.weight.M,
    color: color.label.alternative,
    whiteSpace: "nowrap",
  };

  const metaRow = (category || time) && (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: margin.s,
        flexShrink: 0,
      }}
    >
      {category && <span style={categoryStyle}>{category}</span>}
      {category && time && VerticalDivider}
      {time && <span style={timeStyle}>{time}</span>}
    </span>
  );

  // `highlight` and `text` variants put meta below the subtext, and
  // don't use `trailingTime` on the right edge.
  if (variant === "highlight" || variant === "text") {
    const Tag = onClick ? "button" : "div";
    return (
      <Tag
        type={onClick ? "button" : undefined}
        onClick={onClick}
        className={className}
        style={row}
      >
        <span
          style={{
            display: "flex",
            flex: 1,
            minWidth: 0,
            flexDirection: "column",
            gap: margin.s,
            alignItems: "flex-start",
          }}
        >
          {subtext && <span style={subtextStyle}>{subtext}</span>}
          {metaRow}
        </span>
      </Tag>
    );
  }

  // unread / read: leading icon + title + subtext on left, trailingTime on right.
  const Tag = onClick ? "button" : "div";
  return (
    <Tag
      type={onClick ? "button" : undefined}
      onClick={onClick}
      className={className}
      style={row}
    >
      <span
        style={{
          display: "flex",
          flex: 1,
          minWidth: 0,
          gap: margin.s,
          alignItems: "flex-start",
        }}
      >
        {leadingIcon && <span style={leadingSlot}>{leadingIcon}</span>}
        <span
          style={{
            display: "flex",
            flex: 1,
            minWidth: 0,
            flexDirection: "column",
            gap: margin.xs,
            alignItems: "flex-start",
          }}
        >
          {title && <span style={titleStyle}>{title}</span>}
          {subtext && <span style={subtextStyle}>{subtext}</span>}
        </span>
      </span>
      {trailingTime && <span style={trailingTimeStyle}>{trailingTime}</span>}
    </Tag>
  );
}
