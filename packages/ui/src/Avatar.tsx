import type { CSSProperties, ReactNode } from "react";
import { color, radius, typography } from "@wds/tokens";

/**
 * WDS Avatar — user-profile image or monogram.
 *
 * Figma: Components / Avatar (node `3001:20249`)
 * "사용자 프로필을 표시하는 원형 또는 정사각형 이미지 컴포넌트입니다."
 *
 * Sizes (px) with per-size radius on the `round` shape:
 *   XL    120  radius-l   (24)
 *   L      96  radius-m   (20)
 *   M      64  radius-m   (20)
 *   S      48  radius-s   (12)
 *   XS     36  radius-s   (12)
 *   XS28   28  (circle-only in Figma)
 *   XXS    24  radius-xs  ( 8)
 *
 * `shape`:
 *   round  — rounded-corner square (Figma `Round=Round`), default
 *   circle — full-round (Figma `Round=Circle`)
 *
 * Content:
 *   `src`  — image URL; when present the avatar renders an <img>.
 *   `name` — monogram fallback; if `src` is missing, the first letter
 *            of `name` renders on a `primary.light` tile in
 *            `primary.normal` bold type (Figma `Style=Name`).
 *            Letters in the Figma mocks are uppercase for `round` and
 *            mixed-case for `circle` — we preserve that: `round` is
 *            uppercased, `circle` keeps the provided case.
 *
 * `badge`  — optional 12/16/24px node anchored at the bottom-right.
 *            Pair with `<AvatarBadge />` for the Figma-published glyphs.
 */

export type AvatarSize = "XL" | "L" | "M" | "S" | "XS" | "XS28" | "XXS";
export type AvatarShape = "round" | "circle";

export interface AvatarProps {
  size?: AvatarSize;
  shape?: AvatarShape;
  /** Image source. Takes precedence over `name`. */
  src?: string;
  alt?: string;
  /** Monogram fallback when there's no image. */
  name?: string;
  /** Badge node anchored bottom-right (e.g. status dot / check). */
  badge?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

const sizeSpec = {
  XL:   { px: 120, round: radius.l,  monoFont: 80, badge: 24 },
  L:    { px:  96, round: radius.m,  monoFont: 64, badge: 24 },
  M:    { px:  64, round: radius.m,  monoFont: 48, badge: 16 },
  S:    { px:  48, round: radius.s,  monoFont: 36, badge: 16 },
  XS:   { px:  36, round: radius.s,  monoFont: 24, badge: 12 },
  XS28: { px:  28, round: radius.xs, monoFont: 20, badge: 12 },
  XXS:  { px:  24, round: radius.xs, monoFont: 16, badge: 12 },
} as const;

export function Avatar({
  size = "XL",
  shape = "round",
  src,
  alt,
  name,
  badge,
  className,
  style: styleProp,
}: AvatarProps) {
  const spec = sizeSpec[size];
  const rootRadius = shape === "circle" ? "50%" : spec.round;

  const root: CSSProperties = {
    position: "relative",
    width: spec.px,
    height: spec.px,
    flexShrink: 0,
    borderRadius: rootRadius,
    overflow: "visible", // let badges poke out
    fontFamily: typography.fontFamily,
    ...styleProp,
  };

  const inner: CSSProperties = {
    position: "absolute",
    inset: 0,
    borderRadius: rootRadius,
    overflow: "hidden",
    background: src ? color.background["bg-100"] : color.primary.light,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const imgStyle: CSSProperties = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    pointerEvents: "none",
  };

  const firstLetter = (name ?? "").trim().slice(0, 1);
  const monoText = shape === "round" ? firstLetter.toUpperCase() : firstLetter;

  const monoStyle: CSSProperties = {
    fontSize: spec.monoFont,
    lineHeight: 1,
    fontWeight: typography.weight.B,
    color: color.primary.normal,
    textAlign: "center",
    letterSpacing: typography.letterSpacing,
  };

  const badgeSlot: CSSProperties = {
    position: "absolute",
    right: shape === "circle" ? 0 : -spec.badge / 6,
    bottom: shape === "circle" ? 0 : -spec.badge / 6,
    width: spec.badge,
    height: spec.badge,
    background: color.background["bg-white"],
    border: `2px solid ${color.background["bg-white"]}`,
    borderRadius: "50%",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  };

  return (
    <div className={className} style={root}>
      <div style={inner}>
        {src ? (
          <img src={src} alt={alt ?? name ?? ""} style={imgStyle} />
        ) : (
          <span style={monoStyle}>{monoText}</span>
        )}
      </div>
      {badge && <span style={badgeSlot}>{badge}</span>}
    </div>
  );
}
