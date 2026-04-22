"use client";

import { useEffect, useState, type ReactNode } from "react";
import type { TypographyScale } from "@wds/tokens";

/**
 * Client-only wrapper that owns the DS-C3 typography tier and mirrors it
 * onto <html data-typography-scale>. The attribute is what drives
 * @wds/tokens/scale.css, and every rem-based typography token in the page
 * picks up the tier without any per-component knowledge.
 *
 * This component also reads `?scale=...` from the URL once on mount so
 * `/?scale=large` deep-links work for screenshotting the Phase 1 AC8
 * evidence (three-state comparison).
 */
export function ScaleRoot({
  initial = "normal",
  children,
}: {
  initial?: TypographyScale;
  children: (ctx: {
    scale: TypographyScale;
    setScale: (next: TypographyScale) => void;
  }) => ReactNode;
}) {
  const [scale, setScale] = useState<TypographyScale>(initial);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const fromUrl = params.get("scale");
    if (fromUrl === "normal" || fromUrl === "large" || fromUrl === "x-large") {
      setScale(fromUrl);
    }
  }, []);

  useEffect(() => {
    document.documentElement.dataset.typographyScale = scale;
  }, [scale]);

  return <>{children({ scale, setScale })}</>;
}
