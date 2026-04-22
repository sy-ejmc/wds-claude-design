/**
 * WDS Design Tokens — public entry.
 *
 * 2-tier architecture:
 *   primitive (raw values, internal) → alias (semantic, public)
 *
 * Components MUST import from the alias layer (re-exported here).
 * Do not import from "@wds/tokens/primitive" in components.
 */
export { color, spacing, typography, radius } from "./alias";
export type TypographyScale = "normal" | "large" | "x-large";
