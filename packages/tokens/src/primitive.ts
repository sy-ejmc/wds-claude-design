/**
 * WDS Primitive Tokens (V1, Figma var-set `3003:11976`)
 *
 * INTERNAL IMPLEMENTATION. Do NOT import this directly from components.
 * Components should import from `./alias` (or the package root) so that
 * palette swaps only touch the alias layer.
 *
 * Values are placeholders for the Phase 0-pre spike. Finalized during
 * Phase 0.1 (Figma DS audit).
 */
export const primitive = {
  color: {
    blue: {
      100: "#e6f3ff",
      200: "#a7d9ff",
      500: "#3b8fff",
      700: "#0054b3",
      900: "#002a66",
    },
    gray: {
      50: "#f7f8fa",
      200: "#d9dde3",
      500: "#8a93a0",
      700: "#4a5260",
      900: "#1a1e25",
    },
    white: "#ffffff",
    black: "#000000",
  },
} as const;
