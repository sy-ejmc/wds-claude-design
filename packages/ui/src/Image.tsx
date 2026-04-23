import type { CSSProperties, ReactNode, ImgHTMLAttributes } from "react";
import { color, radius as radiusTokens } from "@wds/tokens";

/**
 * WDS Image — ratio/radius-aware image display.
 *
 * Figma: Components / Image (node `3001:20264`)
 * "다양한 레이아웃과 비율을 지원하는 이미지 디스플레이 컴포넌트입니다."
 *
 * Radius variants (verbatim from Figma):
 *   none              — 0
 *   small             — radius-s  (12)
 *   medium            — radius-m  (20)
 *   medium-top        — radius-m  only on top corners
 *   full              — 50% (perfect circle when 1:1 aspect)
 *
 * `src`: when set, renders an `<img>` with `object-fit: cover`.
 * When omitted, renders the Figma `img-placeholder` state — a bg-50
 * surface with a centered placeholder glyph (supply via `placeholder`).
 *
 * `size`: defaults to `200` which matches the Figma mocks. Pass a
 * number (px) for a square, or an object to control width & height
 * / aspect ratio independently.
 */

export type ImageRadius = "none" | "small" | "medium" | "medium-top" | "full";

export interface ImageProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "width" | "height"> {
  src?: string;
  alt?: string;
  radius?: ImageRadius;
  /** Number = square px. Object = explicit width / height / aspect-ratio. */
  size?: number | { width?: number | string; height?: number | string; aspectRatio?: string };
  /** Rendered when `src` is absent — the Figma `img-placeholder` slot. */
  placeholder?: ReactNode;
  wrapperClassName?: string;
  wrapperStyle?: CSSProperties;
}

function resolveRadius(r: ImageRadius): CSSProperties {
  switch (r) {
    case "small":      return { borderRadius: radiusTokens.s };
    case "medium":     return { borderRadius: radiusTokens.m };
    case "medium-top": return {
      borderTopLeftRadius:  radiusTokens.m,
      borderTopRightRadius: radiusTokens.m,
    };
    case "full":       return { borderRadius: "50%" };
    case "none":
    default:           return { borderRadius: 0 };
  }
}

function resolveSize(size: ImageProps["size"]): CSSProperties {
  if (size == null) return { width: 200, height: 200 };
  if (typeof size === "number") return { width: size, height: size };
  const out: CSSProperties = {};
  if (size.width != null) out.width = size.width;
  if (size.height != null) out.height = size.height;
  if (size.aspectRatio) out.aspectRatio = size.aspectRatio;
  return out;
}

export function Image({
  src,
  alt = "",
  radius = "none",
  size,
  placeholder,
  wrapperClassName,
  wrapperStyle,
  style: imgStyleProp,
  ...rest
}: ImageProps) {
  const wrapper: CSSProperties = {
    display: "inline-block",
    overflow: "hidden",
    position: "relative",
    background: src ? "transparent" : color.background["bg-50"],
    ...resolveRadius(radius),
    ...resolveSize(size),
    ...wrapperStyle,
  };

  if (src) {
    const imgStyle: CSSProperties = {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      display: "block",
      ...imgStyleProp,
    };
    return (
      <span className={wrapperClassName} style={wrapper}>
        <img src={src} alt={alt} style={imgStyle} {...rest} />
      </span>
    );
  }

  // placeholder state
  const placeholderWrap: CSSProperties = {
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: color.label.assistive,
  };
  return (
    <span className={wrapperClassName} style={wrapper} aria-label={alt || undefined}>
      <span style={placeholderWrap}>{placeholder}</span>
    </span>
  );
}
