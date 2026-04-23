import type { CSSProperties, ReactNode } from "react";
import { margin, padding } from "@wds/tokens";

export interface ButtonFixedProps {
  /** Primary content — usually one or more BlockButton in a row. */
  children: ReactNode;
  /**
   * Optional content below the button row (e.g. "나중에 할게요" TextButton
   * or a rich-text line). Rendered centered beneath the buttons.
   */
  below?: ReactNode;
  /**
   * Layout position. Defaults to `fixed` (stuck to viewport bottom).
   * Pass `sticky` for parent-relative sticky, or `static` to disable
   * fixed positioning entirely — useful for preview cells.
   */
  position?: "fixed" | "sticky" | "static";
  className?: string;
}

/**
 * WDS Button-fixed — the screen-bottom CTA slot.
 *
 * Figma: Components / Button-fixed (node `5015:29032`)
 * "화면 하단 혹은 특정 위치에 고정되는 버튼 컴포넌트입니다."
 *
 * The distinctive visual is a white top-gradient fade that lets content
 * above scroll behind the control without the hard edge of a solid
 * background. Composition of the buttons themselves (one big, two
 * equal, small+big, icon+big) is caller-driven — the wrapper just
 * provides the fixed positioning, the fade, and the token-aware
 * spacing. Pair with BlockButton for the buttons.
 *
 * @example
 * <ButtonFixed>
 *   <BlockButton variant="primary" size="L">제출하기</BlockButton>
 * </ButtonFixed>
 *
 * @example split — caller composes two buttons in a row
 * <ButtonFixed>
 *   <Stack direction="row" gap="spacing-3" style={{ width: "100%" }}>
 *     <BlockButton variant="secondary" size="L" inline style={{ width: 100 }}>
 *       취소
 *     </BlockButton>
 *     <BlockButton variant="primary" size="L" style={{ flex: 1 }}>
 *       확인
 *     </BlockButton>
 *   </Stack>
 * </ButtonFixed>
 */
export function ButtonFixed({
  children,
  below,
  position = "fixed",
  className,
}: ButtonFixedProps) {
  const style: CSSProperties = {
    position,
    bottom: position === "static" ? undefined : 0,
    left: 0,
    right: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: margin.m,                  // 16px between rows
    paddingInline: padding.m,       // 16px horizontal
    paddingBlock: padding.m,        // 16px vertical
    // Figma: gradient from transparent (~40%) to white. This lets
    // content above scroll "under" the CTA area without a hard edge.
    backgroundImage:
      "linear-gradient(to bottom, rgba(255, 255, 255, 0) 40%, #FFFFFF 100%)",
    pointerEvents: position === "static" ? "auto" : "none",
    // Re-enable pointer events on children so the buttons still click.
    // (Trick: the wrapper lets mouse events pass through the transparent
    //  gradient top; only the child button region is interactive.)
  };

  const innerStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: margin.m,
    width: "100%",
    pointerEvents: "auto",
  };

  return (
    <div className={className} style={style}>
      <div style={innerStyle}>
        {children}
        {below && (
          <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
            {below}
          </div>
        )}
      </div>
    </div>
  );
}
