import type { CSSProperties, ReactNode } from "react";
import { spacing } from "@wds/tokens";

type SpacingKey = keyof typeof spacing;

export interface StackProps {
  children: ReactNode;
  /** Layout direction. Defaults to `column` (vertical stack). */
  direction?: "column" | "row";
  /** Gap between children. Key of `spacing.*` or any CSS length string. */
  gap?: SpacingKey | string;
  /** CSS `align-items`. */
  align?: CSSProperties["alignItems"];
  /** CSS `justify-content`. */
  justify?: CSSProperties["justifyContent"];
  /** Wrap children. Only meaningful for `direction="row"`. */
  wrap?: boolean;
  style?: CSSProperties;
  className?: string;
}

function resolveGap(g: StackProps["gap"]): string | number | undefined {
  if (g === undefined) return undefined;
  if ((spacing as Record<string, string>)[g as string]) {
    return (spacing as Record<string, string>)[g as string];
  }
  return g;
}

/**
 * WDS Stack — flexbox primitive for laying out children in a column
 * or row with a token-aware gap. Most WDS screens are just nested
 * stacks plus the occasional Card.
 *
 * @example
 * <Stack gap="spacing-4">
 *   <Heading level={2}>제목</Heading>
 *   <Text>본문</Text>
 * </Stack>
 */
export function Stack({
  children,
  direction = "column",
  gap,
  align,
  justify,
  wrap = false,
  style,
  className,
}: StackProps) {
  const resolved: CSSProperties = {
    display: "flex",
    flexDirection: direction,
    gap: resolveGap(gap),
    alignItems: align,
    justifyContent: justify,
    flexWrap: wrap ? "wrap" : undefined,
    ...style,
  };
  return (
    <div className={className} style={resolved}>
      {children}
    </div>
  );
}
