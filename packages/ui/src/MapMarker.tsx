import type { CSSProperties, ReactNode } from "react";
import { color, typography } from "@wds/tokens";

/**
 * WDS Map Marker — overlay used on a map surface.
 *
 * Figma: Components / Map Markers (node `3001:20187`)
 * "지도 위 특정 위치를 표시하는 마커 컴포넌트입니다."
 *
 * Figma ships 6 published types:
 *
 *   startMarker      Brand pill label + dropped tail line (e.g. "재개발").
 *   geoPoint         Pin silhouette with an icon cut-out inside.
 *   numberedPin      36px brand disc with a centered numeric label.
 *   currentLocation  16px pulsing dot for the user's own location.
 *   locationInfo     Black teardrop pin + trailing bold label.
 *   location         Black teardrop pin only (no label).
 *
 * We render pin silhouettes with inline SVG rather than the Figma PNG
 * so tints re-skin cleanly. Visual geometry is close-enough — not a
 * byte-for-byte reproduction.
 */

export type MapMarkerType =
  | "startMarker"
  | "geoPoint"
  | "numberedPin"
  | "currentLocation"
  | "locationInfo"
  | "location";

export interface MapMarkerProps {
  type?: MapMarkerType;
  /** Label text — used by startMarker (pill text), numberedPin (number), locationInfo (city name). */
  label?: ReactNode;
  /** Icon inside the pin (geoPoint / location). */
  icon?: ReactNode;
  /** Override the pin tint. Default depends on `type`. */
  tint?: string;
  className?: string;
  style?: CSSProperties;
}

const PIN_PATH =
  "M16 0C7.2 0 0 7.2 0 16c0 11.2 14 19.5 15 20.2l1 .8 1-.8C18 35.5 32 27.2 32 16 32 7.2 24.8 0 16 0z";

/** Neutral black pin for location / locationInfo. */
const BLACK_PIN = "#171719";

export function MapMarker({
  type = "numberedPin",
  label,
  icon,
  tint,
  className,
  style: styleProp,
}: MapMarkerProps) {
  if (type === "startMarker") {
    const wrap: CSSProperties = {
      position: "relative",
      display: "inline-flex",
      flexDirection: "column",
      alignItems: "center",
      fontFamily: typography.fontFamily,
      ...styleProp,
    };
    const pill: CSSProperties = {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      paddingBlock: 2,
      paddingInline: 6,
      borderRadius: 4,
      background: tint ?? color.primary.normal,
      color: color.label.white,
      fontSize: typography.size.xs,
      lineHeight: "16px",
      fontWeight: typography.weight.M,
      letterSpacing: typography.letterSpacing,
      boxShadow: "0 4px 5px rgba(0,0,0,0.05)",
      whiteSpace: "nowrap",
    };
    const tail: CSSProperties = {
      width: 1,
      height: 16,
      marginTop: 0,
      background: tint ?? color.primary.normal,
    };
    return (
      <span className={className} style={wrap}>
        <span style={pill}>{label}</span>
        <span style={tail} aria-hidden />
      </span>
    );
  }

  if (type === "numberedPin") {
    const dot: CSSProperties = {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: 36,
      height: 36,
      borderRadius: 20,
      background: tint ?? color.primary.normal,
      color: color.label.white,
      fontFamily: typography.fontFamily,
      fontSize: typography.size.sm,
      lineHeight: typography.lineHeight.sm,
      fontWeight: typography.weight.B,
      letterSpacing: typography.letterSpacing,
      ...styleProp,
    };
    return (
      <span className={className} style={dot}>
        {label}
      </span>
    );
  }

  if (type === "currentLocation") {
    const wrap: CSSProperties = {
      position: "relative",
      display: "inline-block",
      width: 16,
      height: 16,
      ...styleProp,
    };
    const ring: CSSProperties = {
      position: "absolute",
      inset: 0,
      borderRadius: "50%",
      background: "rgba(24,161,154,0.2)",
    };
    const core: CSSProperties = {
      position: "absolute",
      inset: 2,
      borderRadius: "50%",
      background: tint ?? color.primary.normal,
      border: `2px solid ${color.background["bg-white"]}`,
    };
    return (
      <span className={className} style={wrap} aria-label="현재 위치">
        <span style={ring} />
        <span style={core} />
      </span>
    );
  }

  if (type === "geoPoint") {
    // 36×45 pin in brand green
    const wrap: CSSProperties = {
      position: "relative",
      display: "inline-block",
      width: 36,
      height: 45,
      ...styleProp,
    };
    return (
      <span className={className} style={wrap}>
        <svg
          width={36}
          height={45}
          viewBox="0 0 32 37"
          aria-hidden
          focusable={false}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        >
          <path d={PIN_PATH} fill={tint ?? color.primary.normal} />
        </svg>
        <span
          style={{
            position: "absolute",
            top: 6,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            color: color.label.white,
          }}
        >
          {icon}
        </span>
      </span>
    );
  }

  // location / locationInfo
  const iconSlot = (
    <span
      style={{
        position: "relative",
        display: "inline-block",
        width: 32,
        height: 36,
        flexShrink: 0,
      }}
    >
      <svg
        width={32}
        height={36}
        viewBox="0 0 32 37"
        aria-hidden
        focusable={false}
      >
        <path d={PIN_PATH} fill={tint ?? BLACK_PIN} />
      </svg>
      {icon && (
        <span
          style={{
            position: "absolute",
            top: 6,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            color: color.label.white,
          }}
        >
          {icon}
        </span>
      )}
    </span>
  );

  if (type === "location") {
    return (
      <span className={className} style={styleProp}>
        {iconSlot}
      </span>
    );
  }

  // locationInfo
  const row: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    fontFamily: typography.fontFamily,
    ...styleProp,
  };
  const labelStyle: CSSProperties = {
    fontSize: typography.size.sm,
    lineHeight: typography.lineHeight.sm,
    fontWeight: typography.weight.B,
    color: color.label.strong,
    whiteSpace: "nowrap",
    letterSpacing: typography.letterSpacing,
  };
  return (
    <span className={className} style={row}>
      {iconSlot}
      {label && <span style={labelStyle}>{label}</span>}
    </span>
  );
}
