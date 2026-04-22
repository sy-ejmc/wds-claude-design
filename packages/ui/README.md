# @wds/ui

WDS (우리가 Design System) React components.

## Consumption pattern

Every component imports tokens via **`@wds/tokens`** — the alias layer.
Never inline hex codes, px, or rem values. Never import from the
primitive layer directly; it's an internal implementation detail.

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

Names mirror Figma exactly (group → variable). Hyphenated keys use
bracket notation (`["bg-white"]`).

```tsx
import { color, padding, margin, radius, height, typography } from "@wds/tokens";

// Color aliases (V2)
color.primary.normal            // green-500 — brand / CTA
color.primary.light             // green-100
color.primary.strong            // green-700
color.primary.heavy             // green-900
color.background["bg-white"]    // neutral white
color.background["bg-50"]       // gray-50
color.label.strong              // black
color.label.normal              // gray-1000 — body text default
color.label.alternative         // gray-700
color.label.white               // white (dark-on-light inverse)
color.fill.normal               // coolgray-98 — muted surface
color.fill.strong               // coolgray-96
color.line.normal               // coolgray-95 — border default
color.icon.strong               // gray-1000
color.icon.Disable              // gray-600
color.status.success / warning / error / info
color.interaction.Inactive / Disable
color["OS-Indicator"]

// Spacing & sizing aliases (V3) — px, DS-C1
padding.xxs | xs | s | m | l | xl    //  4 /  8 / 12 / 16 / 24 / 32
margin.xs | s | sm | m | l | xl | xxl //  4 /  8 / 12 / 16 / 24 / 40 / 80
radius.none | xxs | xs | s | m | l | full  // 0 / 4 / 8 / 12 / 20 / 24 / 999
height.s | m | l                      // 24 / 36 / 48

// Typography (V5)
typography.size["5xl" ... "xs"]       // rem, tier-swapped (DS-C2/C3)
typography.lineHeight["5xl" ... "xs"] // rem, tier-swapped
typography.weight.B / SB / M / R / L  // 700 / 600 / 500 / 400 / 300
typography.letterSpacing              // "0px"
typography.fontFamily                 // Pretendard stack
```

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
| `xs`    | 12   | 14   | 16   |

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
