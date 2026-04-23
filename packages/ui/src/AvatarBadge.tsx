import type { CSSProperties, ReactNode } from "react";
import { color } from "@wds/tokens";

/**
 * WDS Avatar Badge — small status glyph placed on top of an Avatar.
 *
 * Figma: Components / Avatar-Badge (node `7002:6143`)
 * "아바타 이미지 위에 상태를 표시하는 작은 배지 컴포넌트입니다."
 *
 * Three types × three sizes:
 *   icon     — white circle with a 2px white border holding a check /
 *              status glyph (consumer supplies the glyph).
 *   online   — solid `primary.normal` color dot (online / available).
 *   offline  — solid `interaction.inactive` gray dot (offline).
 *
 *   L = 24, M = 16, S = 12
 *
 * Used stand-alone or composed via `<Avatar badge={<AvatarBadge ... />}>`.
 */

export type AvatarBadgeType = "icon" | "online" | "offline";
export type AvatarBadgeSize = "L" | "M" | "S";

export interface AvatarBadgeProps {
  type?: AvatarBadgeType;
  size?: AvatarBadgeSize;
  /** Glyph for `type="icon"` (e.g. a check mark). */
  icon?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

const pxBySize = { L: 24, M: 16, S: 12 } as const;

export function AvatarBadge({
  type = "online",
  size = "L",
  icon,
  className,
  style: styleProp,
}: AvatarBadgeProps) {
  const dim = pxBySize[size];

  if (type === "icon") {
    const iconBoxStyle: CSSProperties = {
      width: dim,
      height: dim,
      borderRadius: "50%",
      background: color.background["bg-white"],
      border: `2px solid ${color.background["bg-white"]}`,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      color: color.primary.normal,
      ...styleProp,
    };
    return (
      <span className={className} style={iconBoxStyle}>
        {icon}
      </span>
    );
  }

  const dot: CSSProperties = {
    width: dim,
    height: dim,
    borderRadius: "50%",
    background:
      type === "online" ? color.primary.normal : color.interaction.inactive,
    display: "inline-block",
    ...styleProp,
  };
  return <span className={className} style={dot} aria-hidden />;
}
