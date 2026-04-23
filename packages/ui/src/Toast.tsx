import type { CSSProperties, ReactNode } from "react";
import { typography } from "@wds/tokens";

/**
 * WDS Toast — floating message pill.
 *
 * Figma: Components / Toast popup_Mobile (node `21327:981`),
 *        Toast popup_PC      (node `22268:5740`)
 *
 * Dark alpha-60 pill with a leading icon (optional) and message text.
 * Two Figma tones:
 *   warning — orange-400 circle with "!" mark
 *   info    — blue-500   circle with a check glyph
 *
 * Device sizing:
 *   mobile  — rounded 24px, px-16 py-12, gap 4px (Figma Mobile spec)
 *   desktop — rounded 28px, p-16, gap 6px, w-400px (Figma PC spec)
 *
 * This component renders the pill only — fade-in / auto-dismiss /
 * queue management is the consumer's job. Intended usage:
 *
 *   {showToast && (
 *     <div style={{ position: "fixed", bottom: 32, left: "50%", transform: "translateX(-50%)" }}>
 *       <Toast tone="warning">반드시 동의해야 하는 항목입니다.</Toast>
 *     </div>
 *   )}
 */

export type ToastTone = "warning" | "info" | "neutral";
export type ToastDevice = "mobile" | "desktop";

export interface ToastProps {
  children: ReactNode;
  tone?: ToastTone;
  device?: ToastDevice;
  /** Override the icon glyph — when set, replaces the default tone glyph. */
  icon?: ReactNode;
  /** Hide the icon entirely (renders only text). */
  hideIcon?: boolean;
  className?: string;
  style?: CSSProperties;
}

/** Primitive orange-400 — Figma warning tone, not aliased in V2. */
const ORANGE_400 = "#FF7638";
/** Primitive blue-500 — Figma info tone, not aliased in V2. */
const BLUE_500   = "#067DFD";

function WarningGlyph() {
  return (
    <span
      aria-hidden
      style={{
        position: "relative",
        display: "inline-block",
        width: 16,
        height: 16,
        borderRadius: 40,
        background: ORANGE_400,
        flexShrink: 0,
      }}
    >
      <span
        style={{
          position: "absolute",
          left: "45.83%",
          right: "45.83%",
          top: "20.83%",
          bottom: "37.5%",
          background: "#fff",
          borderRadius: 1,
        }}
      />
      <span
        style={{
          position: "absolute",
          left: "45.83%",
          right: "45.83%",
          top: "66.67%",
          bottom: "25%",
          background: "#fff",
          borderRadius: 1,
        }}
      />
    </span>
  );
}

function InfoGlyph() {
  return (
    <span
      aria-hidden
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 16,
        height: 16,
        borderRadius: 40,
        background: BLUE_500,
        flexShrink: 0,
      }}
    >
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden focusable={false}>
        <path
          d="M2 5L4 7L8 3"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export function Toast({
  children,
  tone = "warning",
  device = "mobile",
  icon,
  hideIcon = false,
  className,
  style: styleProp,
}: ToastProps) {
  const isDesktop = device === "desktop";

  const pill: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(0,0,0,0.6)",
    color: "#FFFFFF",
    fontFamily: typography.fontFamily,
    fontSize: typography.size.sm,
    lineHeight: typography.lineHeight.sm,
    fontWeight: typography.weight.M,
    letterSpacing: typography.letterSpacing,
    padding: isDesktop ? 16 : "12px 16px",
    borderRadius: isDesktop ? 28 : 24,
    maxWidth: isDesktop ? 400 : "calc(100vw - 32px)",
    ...styleProp,
  };

  const row: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: isDesktop ? 6 : 4,
  };

  const glyph =
    hideIcon || tone === "neutral"
      ? null
      : icon ?? (tone === "info" ? <InfoGlyph /> : <WarningGlyph />);

  return (
    <div role="status" aria-live="polite" className={className} style={pill}>
      <span style={row}>
        {glyph}
        <span>{children}</span>
      </span>
    </div>
  );
}
