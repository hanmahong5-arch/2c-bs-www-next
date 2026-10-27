# Site fonts (latin only)

Vendored from `@fontsource/{inter-tight,fraunces,jetbrains-mono}@5.3.0` (OFL).
Chinese glyphs use the system CJK stack in `globals.css` — do not add SC webfonts here.

Loaded via `next/font/local` in `src/app/layout.tsx` so CI/build never fetches Google Fonts
(avoids next.js#99114 Turbopack flake on extensionless `/l/font?kit=` URLs).
