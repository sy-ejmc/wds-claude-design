import type { ReactNode } from "react";
import "@wds/tokens/reset.css";
import "@wds/tokens/scale.css";

export const metadata = {
  title: "WDS Playground",
  description:
    "WDS (우리가 Design System) 데모 — elderly-focused UI with 3-tier typography scale.",
};

/**
 * The `data-typography-scale` attribute is set client-side by `<ScaleRoot>`
 * in the page tree, not here. We intentionally omit a default value on
 * <html> so the client provider is the single source of truth.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
