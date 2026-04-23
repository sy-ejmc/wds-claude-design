import type { CSSProperties, ReactNode, ButtonHTMLAttributes } from "react";
import { color, margin, padding, radius, typography } from "@wds/tokens";

/**
 * WDS Chip — compact filter / selection pill.
 *
 * Figma: Components / Chip-item (node `3001:20067`, catalogued under
 * Chips `3001:20062` / `7317:47247`)
 *
 * Published states:
 *   default         — white bg, line.normal border, label.normal text
 *   active          — brand primary.normal fill, white text
 *   active_neutral  — coolgray-30 fill, white text (used when the chip
 *                     is acting as a non-branded "picked" marker)
 *   selected        — primary.light bg, primary.normal text + border
 *                     (used for toggle chips inside multi-select groups)
 *   disabled        — bg-50 fill, line.normal border, label.alternative text
 *
 * Slots:
 *   leadingIcon   — 20px glyph on the left (e.g. location pin)
 *   trailingIcon  — 20px glyph on the right (delete-filled for removable chips)
 *   trailingChevron — renders a 20px chevron-down after the label, used when
 *                     the chip doubles as a mini filter dropdown trigger
 */

export type ChipState =
  | "default"
  | "active"
  | "active_neutral"
  | "selected"
  | "disabled";

export interface ChipProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "disabled"> {
  state?: ChipState;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  trailingChevron?: boolean;
  children: ReactNode;
}

/** Primitive coolgray-30 — Figma active_neutral fill, not aliased in V2. */
const COOLGRAY_30 = "#46474C";

const CHEVRON_DOWN = (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden focusable={false}>
    <path
      d="M5 7.5L10 12.5L15 7.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function resolveChrome(state: ChipState) {
  switch (state) {
    case "active":
      return { bg: color.primary.normal,          fg: color.label.white,       border: color.primary.normal };
    case "active_neutral":
      return { bg: COOLGRAY_30,                    fg: color.label.white,       border: "transparent" };
    case "selected":
      return { bg: color.primary.light,           fg: color.primary.normal,    border: color.primary.normal };
    case "disabled":
      return { bg: color.background["bg-50"],     fg: color.label.alternative, border: color.line.normal };
    case "default":
    default:
      return { bg: color.background["bg-white"],  fg: color.label.normal,      border: color.line.normal };
  }
}

export function Chip({
  state = "default",
  leadingIcon,
  trailingIcon,
  trailingChevron = false,
  children,
  className,
  style: styleProp,
  ...rest
}: ChipProps) {
  const pal = resolveChrome(state);
  const isDisabled = state === "disabled";

  const style: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: margin.xs,                      // 4
    paddingBlock: padding.xs,            // 8
    paddingInline: padding.s,            // 12
    borderRadius: radius.l,              // 24 pill
    border: `1px solid ${pal.border}`,
    backgroundColor: pal.bg,
    color: pal.fg,
    fontFamily: typography.fontFamily,
    fontSize: typography.size.md,
    lineHeight: typography.lineHeight.lg, // Figma intentionally uses lh-lg (26) on md text for visual weight
    fontWeight: typography.weight.R,
    letterSpacing: typography.letterSpacing,
    whiteSpace: "nowrap",
    cursor: isDisabled ? "not-allowed" : "pointer",
    appearance: "none",
    WebkitAppearance: "none",
    ["--wds-focus-ring" as string]:
      state === "active" || state === "selected"
        ? "rgba(24, 161, 154, 0.5)"
        : "rgba(51, 52, 56, 0.4)",
    ...styleProp,
  };

  const iconSlot: CSSProperties = {
    display: "inline-flex",
    width: 20,
    height: 20,
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
    color: pal.fg,
  };

  return (
    <button
      type="button"
      disabled={isDisabled}
      aria-disabled={isDisabled || undefined}
      className={["wds-block-button", className].filter(Boolean).join(" ")}
      style={style}
      {...rest}
    >
      {leadingIcon && <span style={iconSlot}>{leadingIcon}</span>}
      <span>{children}</span>
      {trailingIcon && <span style={iconSlot}>{trailingIcon}</span>}
      {trailingChevron && <span style={iconSlot}>{CHEVRON_DOWN}</span>}
    </button>
  );
}
