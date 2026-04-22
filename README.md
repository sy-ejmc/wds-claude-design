# WDS — 우리가 Design System

Canonical design system codebase for our **elderly-focused service**.
This repo is the permanent home of the design tokens and React components;
any consumer app (marketing site, admin, product) should depend on
`@wds/tokens` and `@wds/ui` from this workspace.

> Status: experimental — the DS exists in code here, but production apps
> have not yet migrated onto it. Pilot integration lives in `apps/playground`
> for Claude Design handoff validation.

## Workspace layout

```
wds-claude-design/
├── packages/
│   ├── tokens/    # @wds/tokens — design tokens (primitive → alias)
│   └── ui/        # @wds/ui     — React components consuming @wds/tokens
└── apps/
    └── playground/ # Next.js app, the Claude Design handoff target
```

## Token architecture (2-tier)

```
primitive.ts  →  alias.ts  →  components
(raw values)    (semantic,    (Button, Input, ...)
                 public)
```

- `primitive.ts` holds raw palette values (blue/100…900, gray/50…900, …).
  **Not meant to be imported by components.**
- `alias.ts` maps semantic roles to primitives (`color.text.primary`,
  `color.bg.accent`, `color.border.default`, …). **Components import this.**
- Palette swaps or theme changes touch only `alias.ts`.

## DS-specific rules

| # | Rule | Why |
|---|------|-----|
| DS-C1 | Spacing is **px** | Elderly UI needs absolute, predictable layout at any font-size tier |
| DS-C2 | Font-size is **rem** | Required for DS-C3 scale switching |
| DS-C3 | 3-tier typography scale: 일반 / 크게 / 더 크게 | Core accessibility feature — see `@wds/tokens/scale.css` |

## Usage (from a consumer app)

```tsx
import "@wds/tokens/reset.css";
import "@wds/tokens/scale.css";
import { Button } from "@wds/ui";

export default function Page() {
  return (
    <html lang="ko" data-typography-scale="normal">
      <body>
        <main>
          <Button variant="primary">시작하기</Button>
        </main>
      </body>
    </html>
  );
}
```

Switching `data-typography-scale` to `large` or `x-large` makes every
typography value scale up automatically — no component changes required.

## For AI code generators (Claude Design, Claude Code, etc.)

When generating code against this DS:

1. **Always** import tokens from `@wds/tokens` (the alias layer).
   Never inline hex codes like `#0054b3` or px values like `16px`.
2. **Always** import components from `@wds/ui`. Never reimplement a Button.
3. Respect DS-C1 (spacing in px) and DS-C2 (typography in rem).
4. When building a page, wrap content assuming the root has
   `data-typography-scale="normal"`; do not recompute sizes per tier.

Good:

```tsx
import { Button } from "@wds/ui";
import { padding, color } from "@wds/tokens";

<main style={{ padding: padding.xl, background: color.background["bg-white"] }}>
  <Button>확인</Button>
</main>
```

Bad (do not do this):

```tsx
// ❌ Inlined hex — bypasses the alias layer
<button style={{ background: "#067DFD", padding: "16px" }}>확인</button>
```
