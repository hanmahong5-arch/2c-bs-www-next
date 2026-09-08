[中文](./README.zh-CN.md) | English

# Lurus Website

The public marketing site for LurusTech — a paper-themed editorial site for an enterprise AI infrastructure platform. **Live:** [www.lurus.cn](https://www.lurus.cn)

Next.js 16 (App Router) + React 19 + Tailwind CSS 4 (CSS-first) + Framer Motion 12, built and run with Bun, shipped as a Docker standalone image through GitOps. Twelve content routes, no backend of its own: every product link points at an external console, and the only server-side route is an analytics beacon.

## Quick start

```bash
bun install
bun run dev            # http://localhost:3000
bun run build          # production build, includes the TypeScript check
bun run lint           # ESLint — must pass before commit

docker build -t lurus-www . && docker run -p 3000:3000 lurus-www
```

> This repo is Bun-only — no npm / yarn / npx / node in scripts or docs.

## Routes

| Route | What it is |
|---|---|
| `/` | Home: Hero → TrustBand → Scenarios → QuickStart → Comparison → CostCalculator → Architecture → Features → ProductGrid → CTA |
| `/platform` | The Lugo platform group: gateway, billing, memory |
| `/kova` | Kova, the agent execution engine |
| `/lucrum` | Lucrum, AI quantitative trading |
| `/pricing` | Tiers, per-model price table, FAQ |
| `/download` | Desktop tools |
| `/solutions` | Use cases by persona |
| `/about` · `/blog` | Company, product changelog (`/blog/rss.xml` feed) |
| `/privacy` · `/terms` | Legal |
| `/login` | Redirect to the identity provider |
| `/api/track` | Analytics beacon — the only dynamic route |

App Router specifics: `layout.tsx` (header/footer, JSON-LD, theme bootstrap), `template.tsx` (view-transition page transitions), `loading.tsx`, `not-found.tsx`. Social cards are generated at `opengraph-image.tsx` / `twitter-image.tsx`.

## Layout

```
src/
├── app/               # routes; globals.css holds every custom class and design token alias
├── components/        # section components (one per home-page block) + primitives/
├── lib/
│   ├── ecosystem.ts   # products as a directed graph: 7 products / 4 groups / typed edges
│   ├── products.ts    # headline stats + product cards
│   ├── links.ts       # single source of truth for outbound console URLs
│   └── motion.ts      # shared Framer Motion presets  ← read the rule below before editing
└── styles/lurus-design/   # VENDORED design tokens — do not hand-edit (see below)
```

## Conventions that are not obvious from the code

These four cost real debugging time. Read them before touching styling or animation.

**1. Animation presets must never set `opacity: 0`.**
`src/lib/motion.ts` presets are server-rendered into inline `style="opacity:0"`, and inline styles cannot be overridden by CSS. Anything animated that way is invisible until hydration — on a slow connection, with JS disabled, or to a screenshot-based renderer, the page is blank. This was measured: the home page once shipped 103 inline `opacity:0` declarations. Presets now animate position/scale/blur only. If you need a genuine fade, use the CSS-driven `.hero-enter-*` classes in `globals.css`, which start painting without waiting for JS.

**2. Every CSS animation class must be listed in the `prefers-reduced-motion` block.**
Those classes use `animation-fill-mode: both`, so their first keyframe (`opacity: 0`) sticks. `animation: none` releases it. Miss one class and that element stays permanently invisible for anyone who asked for reduced motion.

**3. `src/styles/lurus-design/**` is a vendored copy — never hand-edit it.**
The source of truth lives in the platform governance repo. Regenerate with `bash scripts/design-sync.sh <this-repo>/src/styles/lurus-design` from the root repo; `--check` turns drift into a CI failure. Only `tokens.css` is imported — `theme.css` and `tailwind-preset.cjs` ship for other consumers and would override the self-hosted fonts.

**4. Unlayered classes in `globals.css` outrank Tailwind utilities.**
Tailwind v4 puts utilities in `@layer utilities`; plain rules in `globals.css` are unlayered and therefore win. `.eyebrow` sets `text-transform: uppercase`, so adding `normal-case` to an element that also has `.eyebrow` does nothing — it silently shouted a domain name in all caps on the home page for a while. Drop the semantic class and use utilities directly when they conflict.

Also worth knowing: demo data (latency, cost, ledger rows, routing tables) is hard-coded and must carry a visible "示意" / illustrative marker — do not let it read as measured telemetry. Outbound console URLs belong in `lib/links.ts`, not inline. External links go through `<SmartLink>`, which sets `target`/`rel` automatically.

## Deployment

GitOps: GitHub Actions → GHCR → ArgoCD → K3s. Pushing to `main` runs lint + build, builds the image, pushes to GHCR, bumps the tag in `deploy/k8s/deployment.yaml`, and ArgoCD syncs it.

| | |
|---|---|
| Namespace / port | `lurus-www` / 3000 (Next.js standalone) |
| Domains | `www.lurus.cn`, `lurus.cn` (301) |
| Image | `ghcr.io/hanmahong5-arch/2c-bs-www-next:main-<sha7>` |
| Ingress | Traefik IngressRoute + wildcard TLS |
| Env vars | none required |

`lighthouserc.json` asserts accessibility ≥ 0.9, SEO ≥ 0.9, performance ≥ 0.5 on `/`, `/pricing`, `/about` (warnings, not hard gates).

## Related

Outbound targets referenced in `lib/links.ts` and the footer: the gateway console, the identity provider (`identity.lurus.cn`, also the `/login` target), and the docs site (`docs.lurus.cn`). This repo has no build-time dependency on any of them.
