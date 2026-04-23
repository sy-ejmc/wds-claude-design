"use client";

import type { CSSProperties, ButtonHTMLAttributes } from "react";
import { color, shadow } from "@wds/tokens";

/**
 * WDS Switch — ON/OFF toggle.
 *
 * Figma: Components / Switches (node `3001:19614`, composed inside Menu
 * List `5015:33424`)
 * "ON/OFF 상태를 전환하는 토글 버튼 형태의 컴포넌트입니다."
 *
 * Figma publishes an iOS-style 40×24 toggle with a 20px knob, green
 * primary fill when ON, gray when OFF. Knob shifts by the track width
 * minus the knob width minus 2px edge insets on each side.
 */

export interface SwitchProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange" | "type" | "disabled"> {
  checked: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  /** Screen-reader name. Required when the toggle has no visible label nearby. */
  "aria-label"?: string;
}

const TRACK_W = 40;
const TRACK_H = 24;
const KNOB    = 20;
const INSET   = 2;

export function Switch({
  checked,
  onCheckedChange,
  disabled = false,
  "aria-label": ariaLabel,
  className,
  style: styleProp,
  ...rest
}: SwitchProps) {
  const style: CSSProperties = {
    position: "relative",
    width: TRACK_W,
    height: TRACK_H,
    flexShrink: 0,
    borderRadius: TRACK_H,
    border: "none",
    padding: 0,
    background: disabled
      ? color.line.normal
      : checked
        ? color.primary.normal
        : color.interaction.inactive, // gray track when off
    cursor: disabled ? "not-allowed" : "pointer",
    transition: "background 150ms ease-out",
    appearance: "none",
    WebkitAppearance: "none",
    opacity: disabled ? 0.5 : 1,
    ["--wds-focus-ring" as string]: "rgba(24, 161, 154, 0.5)",
    ...styleProp,
  };

  const knob: CSSProperties = {
    position: "absolute",
    top: INSET,
    left: checked ? TRACK_W - KNOB - INSET : INSET,
    width: KNOB,
    height: KNOB,
    borderRadius: "50%",
    background: color.label.white,
    boxShadow: shadow[1],
    transition: "left 150ms ease-out",
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={() => onCheckedChange?.(!checked)}
      className={["wds-block-button", className].filter(Boolean).join(" ")}
      style={style}
      {...rest}
    >
      <span style={knob} aria-hidden />
    </button>
  );
}
