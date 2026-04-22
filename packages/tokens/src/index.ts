/**
 * WDS Design Tokens — public entry.
 *
 * 2-tier architecture:
 *   primitive (raw values, internal) → alias (semantic, public)
 *
 * Components MUST import from the alias layer (re-exported here).
 * Do not import from "@wds/tokens/src/primitive" directly.
 */
export {
  color,
  spacing,
  padding,
  margin,
  radius,
  height,
  shadow,
  typography,
  brand,
} from "./alias";

export type TypographyScale = "normal" | "large" | "x-large";
