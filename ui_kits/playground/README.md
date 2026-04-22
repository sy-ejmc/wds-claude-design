# Playground UI Kit

A hi-fi interactive mock of a **우리가**-style mobile screen built on the WDS tokens. The repo's `apps/playground` target doesn't exist yet — this kit is a forward projection of what it should look like using only the tokens the DS has shipped.

## What it shows
- **Login → Home → Family / Health / Settings** click-through flow (state persists in `localStorage`).
- Live **3-tier typography scale** switcher — toggles `<html data-typography-scale>`.
- All components read from `colors_and_type.css`. No hex or px inlined in component logic beyond what a "prototype" card needs (see README caveats).

## Files
- `index.html` — entry point. Loads Pretendard + Lucide + React via CDN.
- `components.jsx` — `Button`, `TextField`, `Card`, `Icon`, `ScaleSwitcher`, `TopBar`, `BottomNav`, `ListItem`.
- `screens.jsx` — `LoginScreen`, `HomeScreen`, `FamilyScreen`, `HealthScreen`, `SettingsScreen`, `App`.

## Caveats
- Only `Button` is canonical (`@wds/ui`). `Input`, `Card`, nav, list are **prototype sketches** that respect tokens but are not in the repo.
- Icons are **Lucide** — flagged substitute (see root README).
- Content (names, messages) is illustrative, not from real copy.
