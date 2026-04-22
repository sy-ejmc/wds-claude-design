# @wds/ui

WDS (우리가 Design System) React components.

## Consumption pattern

Every component imports tokens via **`@wds/tokens`** — the alias layer.
Never inline hex codes or px values. Never import from `@wds/tokens/primitive`
directly; the primitive layer is an internal implementation detail.

```tsx
import { Button } from "@wds/ui";

export default function Page() {
  return (
    <main>
      <Button variant="primary" onClick={() => alert("hi")}>
        시작하기
      </Button>
    </main>
  );
}
```

## Tokens

```tsx
import { color, spacing, typography, radius } from "@wds/tokens";

// color.text.primary / color.bg.surface / color.border.accent ...
// spacing.xs | sm | md | lg | xl | 2xl                (px-based, DS-C1)
// typography.size.5xl | 4xl | … | md | sm | xs        (rem-based, DS-C2/C3)
// typography.lineHeight.5xl | 4xl | … | md | md-1
// radius.sm | md | lg | full
```

Typography tokens resolve to `var(--font-size-*)` / `var(--line-height-*)`
so each tier (normal / large / x-large) swaps the actual value at the root.
Components do not branch on tier — they just read the token.

## Typography 3-tier scale (DS-C3)

Our service targets elderly users. Users can switch between three tiers:
**일반 보기 / 크게 보기 / 더 크게 보기**. Each typography token has a
**designer-defined value per tier** (not a uniform multiplier):

| token   | 일반  | 크게  | 더크게 |
|---------|------|------|-------|
| `5xl`   | 36   | 40   | 44   |
| `4xl`   | 32   | 36   | 40   |
| `3xl`   | 28   | 32   | 36   |
| `md`    | 16   | 18   | 20   |
| …       | …    | …    | …    |

Mechanism: each token is a CSS custom property (`--font-size-5xl`, etc.),
and the three tiers are defined in `@wds/tokens/scale.css` under
`html[data-typography-scale="..."]`. Components read tokens as
`var(--font-size-5xl)` and pick up the current tier automatically.

```html
<html data-typography-scale="normal">
<html data-typography-scale="large">
<html data-typography-scale="x-large">
```

Values are **rem**, so they also multiply the user's own browser/OS
system font-size preference. We never hardcode the root as `16px`.

Apply `@wds/tokens/scale.css` once at the app entry.

## Available components (Phase 0-pre)

| Component | Status |
|-----------|--------|
| `Button`  | ✅ minimal — primary / secondary variants |

More components (Input, Text, Stack, Card) arrive in Phase 1.
