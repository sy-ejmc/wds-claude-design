import type { CSSProperties, ReactNode } from "react";
import { padding, radius, typography } from "@wds/tokens";

/**
 * WDS Tooltip — small dark-background tip label.
 *
 * Figma: Components / Tooltip (node `7238:79859`)
 * "특정 요소에 대한 추가 정보를 제공하는 작은 팝업 형태의 컴포넌트입니다."
 *
 * Visual spec:
 *   - alpha-80 black fill (rgba(0,0,0,0.8))
 *   - radius-xs (8px), padding-xs (8px), Shadow/Shadow-2 drop shadow
 *   - sm / Bold / line-height-sm (20px) / white text
 *   - 10px triangular tail on one of 4 sides (Up / Down / Left / Right)
 *
 * This component only renders the bubble + tail. Positioning (where on
 * the screen it sits relative to its anchor) is the consumer's job —
 * typically wrap the trigger + tooltip in a relative container and
 * absolute-position the tooltip. Phase 2 is DIY so we don't ship a
 * positioning engine; wire it up with a couple of inline style lines.
 */

export type TooltipTail = "up" | "down" | "left" | "right";

export interface TooltipProps {
  children: ReactNode;
  /** Side the tail points from — i.e. the side touching the anchor. */
  tail?: TooltipTail;
  id?: string;
  className?: string;
  style?: CSSProperties;
}

const BG = "rgba(0, 0, 0, 0.8)";
const TAIL = 6; // half-base of the triangular tail; visual size ~ 12×6

function Tail({ side }: { side: TooltipTail }) {
  const base: CSSProperties = {
    position: "absolute",
    width: 0,
    height: 0,
    border: `${TAIL}px solid transparent`,
  };
  switch (side) {
    case "up":
      // bubble sits BELOW anchor, tail points UP from the top edge
      return (
        <span
          aria-hidden
          style={{
            ...base,
            top: -TAIL * 2,
            left: "50%",
            transform: "translateX(-50%)",
            borderTopWidth: 0,
            borderBottomWidth: TAIL * 2,
            borderBottomColor: BG,
          }}
        />
      );
    case "down":
      return (
        <span
          aria-hidden
          style={{
            ...base,
            bottom: -TAIL * 2,
            left: "50%",
            transform: "translateX(-50%)",
            borderBottomWidth: 0,
            borderTopWidth: TAIL * 2,
            borderTopColor: BG,
          }}
        />
      );
    case "left":
      return (
        <span
          aria-hidden
          style={{
            ...base,
            left: -TAIL * 2,
            top: "50%",
            transform: "translateY(-50%)",
            borderLeftWidth: 0,
            borderRightWidth: TAIL * 2,
            borderRightColor: BG,
          }}
        />
      );
    case "right":
      return (
        <span
          aria-hidden
          style={{
            ...base,
            right: -TAIL * 2,
            top: "50%",
            transform: "translateY(-50%)",
            borderRightWidth: 0,
            borderLeftWidth: TAIL * 2,
            borderLeftColor: BG,
          }}
        />
      );
  }
}

export function Tooltip({
  children,
  tail = "up",
  id,
  className,
  style: styleProp,
}: TooltipProps) {
  const bubble: CSSProperties = {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: padding.xs,
    borderRadius: radius.xs,
    background: BG,
    color: "#FFFFFF",
    fontFamily: typography.fontFamily,
    fontSize: typography.size.sm,
    lineHeight: typography.lineHeight.sm,
    fontWeight: typography.weight.B,
    letterSpacing: typography.letterSpacing,
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    maxWidth: 220,
    textAlign: "center",
    ...styleProp,
  };
  return (
    <span id={id} role="tooltip" className={className} style={bubble}>
      {children}
      <Tail side={tail} />
    </span>
  );
}
