import type { CSSProperties, ReactNode } from "react";
import { color, padding, radius, typography } from "@wds/tokens";

/**
 * WDS Badge — status / category pill.
 *
 * Figma: Components / Badge (node `3001:20108`)
 * "상태, 카테고리, 알림 등을 강조하는 작은 시각적 요소입니다."
 *
 * Full Figma matrix = appearance × size × tone × square.
 *
 *   appearance  fill    — solid brand/status fill, white (or color) text
 *               ghost   — transparent bg, tinted text + 1px matching border
 *               neutral — muted tinted bg, full-color text (halfway between)
 *
 *   size        S (default) — xs / line-16 / px-8 py-4
 *               M            — sm / line-20 / px-10 py-4
 *               L            — md / line-22 / px-12 py-6
 *
 *   tone        default  — neutral gray
 *               color    — brand primary (green)
 *               white    — inverse (white fill on dark surfaces)
 *               info     — blue
 *               warning  — orange
 *               error    — red
 *               attribute — purple (used for classification / metadata tags)
 *               done     — neutral black (completed / submitted states)
 *
 *   square      Default (rounded-full pill) · Square (rounded-xs / 6px)
 *
 * Back-compat: legacy `primary` / `success` tones map to `color` / `done`.
 */

export type BadgeAppearance = "fill" | "ghost" | "neutral";
export type BadgeSize = "S" | "M" | "L";
export type BadgeTone =
  | "default"
  | "color"
  | "white"
  | "info"
  | "warning"
  | "error"
  | "attribute"
  | "done"
  // legacy aliases
  | "neutral"
  | "primary"
  | "success";
export type BadgeShape = "pill" | "square";

export interface BadgeProps {
  children: ReactNode;
  leftIcon?: ReactNode;
  appearance?: BadgeAppearance;
  size?: BadgeSize;
  tone?: BadgeTone;
  shape?: BadgeShape;
  className?: string;
  style?: CSSProperties;
}

/* ── Tone palette ─────────────────────────────────────────────────── */

/** Primitive purple-500 for `attribute` — Figma `purple/purple-500`, not aliased in V2. */
const PURPLE_500 = "#6A6FE8";
/** Primitive purple-50 background tint. */
const PURPLE_50  = "#EEEFFC";
/** Primitive blue-500 for `info` (Figma chip: #3A6CEB). */
const BLUE_500   = "#3A6CEB";
const BLUE_50    = "#EAF1FD";
const ORANGE_50  = "#FFF4E5";
const RED_50     = "#FDECEC";

function normalizeTone(tone: BadgeTone): Exclude<BadgeTone, "neutral" | "primary" | "success"> {
  if (tone === "neutral") return "default";
  if (tone === "primary") return "color";
  if (tone === "success") return "done";
  return tone;
}

function coreColor(tone: Exclude<BadgeTone, "neutral" | "primary" | "success">) {
  switch (tone) {
    case "color":     return color.primary.normal;
    case "info":      return BLUE_500;
    case "warning":   return color.status.warning;
    case "error":     return color.status.error;
    case "attribute": return PURPLE_500;
    case "done":      return color.label.strong;
    case "white":     return color.label.white;
    case "default":
    default:          return color.label.normal;
  }
}

function softBg(tone: Exclude<BadgeTone, "neutral" | "primary" | "success">) {
  switch (tone) {
    case "color":     return color.primary.light;       // green-100
    case "info":      return BLUE_50;
    case "warning":   return ORANGE_50;
    case "error":     return RED_50;
    case "attribute": return PURPLE_50;
    case "done":      return color.background["bg-50"];
    case "white":     return "rgba(255,255,255,0.2)";
    case "default":
    default:          return color.background["bg-50"];
  }
}

function resolveChrome(appearance: BadgeAppearance, toneRaw: BadgeTone) {
  const tone = normalizeTone(toneRaw);
  const fg = coreColor(tone);
  if (appearance === "fill") {
    // Fill = solid tone-color background. For `default` and `white` use
    // Figma's published soft backdrops to preserve readability.
    if (tone === "default" || tone === "white") {
      return { bg: softBg(tone), fg: coreColor(tone), border: "transparent" };
    }
    return {
      bg: fg,
      fg: tone === "done" ? color.label.white : color.label.white,
      border: "transparent",
    };
  }
  if (appearance === "ghost") {
    return {
      bg: "transparent",
      fg,
      border: fg,
    };
  }
  // neutral
  return {
    bg: softBg(tone),
    fg,
    border: "transparent",
  };
}

/* ── Size spec ────────────────────────────────────────────────────── */

const sizeSpec = {
  S: {
    padX: padding.xs,              //  8
    padY: padding.xxs,             //  4
    fontSize: typography.size.xs,
    lineHeight: "16px",
    iconSize: 14,
  },
  M: {
    padX: 10,
    padY: padding.xxs,             //  4
    fontSize: typography.size.sm,
    lineHeight: typography.lineHeight.sm,
    iconSize: 16,
  },
  L: {
    padX: padding.s,               // 12
    padY: padding.xxs + 2,         //  6
    fontSize: typography.size.md,
    lineHeight: "22px",
    iconSize: 18,
  },
} as const;

export function Badge({
  children,
  leftIcon,
  appearance = "fill",
  size = "S",
  tone = "default",
  shape = "pill",
  className,
  style: styleProp,
}: BadgeProps) {
  const spec = sizeSpec[size];
  const pal = resolveChrome(appearance, tone);

  const style: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    paddingBlock: spec.padY,
    paddingInline: spec.padX,
    borderRadius: shape === "square" ? 6 : radius.m,
    background: pal.bg,
    color: pal.fg,
    border: `1px solid ${pal.border}`,
    fontFamily: typography.fontFamily,
    fontSize: spec.fontSize,
    lineHeight: spec.lineHeight,
    fontWeight: typography.weight.M,
    letterSpacing: typography.letterSpacing,
    whiteSpace: "nowrap",
    ...styleProp,
  };
  return (
    <span className={className} style={style}>
      {leftIcon && (
        <span
          aria-hidden
          style={{
            display: "inline-flex",
            width: spec.iconSize,
            height: spec.iconSize,
            flexShrink: 0,
            alignItems: "center",
            justifyContent: "center",
            color: "currentColor",
          }}
        >
          {leftIcon}
        </span>
      )}
      {children}
    </span>
  );
}
