import type { CSSProperties, ReactNode } from "react";
import { color, padding as pad, radius } from "@wds/tokens";

export interface CardProps {
  children: ReactNode;
  /** Override padding. Defaults to `padding.l` (24px). */
  padding?: string;
  /** Tinted surface — light green primary background + primary border. */
  tinted?: boolean;
  style?: CSSProperties;
}

/**
 * WDS Card — flat surface container.
 *
 * Tokens consumed:
 *   - color.background["bg-white"] / color.primary.light
 *   - color.line.normal          / color.primary.normal
 *   - radius.m                   — 20px corner
 *
 * Use `tinted` for an emphasized card (e.g., callouts, banners).
 */
export function Card({
  children,
  padding = pad.l,
  tinted = false,
  style,
}: CardProps) {
  const composed: CSSProperties = {
    background: tinted ? color.primary.light : color.background["bg-white"],
    border: `1px solid ${tinted ? color.primary.normal : color.line.normal}`,
    borderRadius: radius.m,
    padding,
    ...style,
  };
  return <div style={composed}>{children}</div>;
}
