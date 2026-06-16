# lurus-www (2c-bs-www-next)

Lurus 公司官网。Light paper-themed editorial marketing site for the Lurus enterprise AI infrastructure platform (brand-spec v1). **Live**: [www.lurus.cn](https://www.lurus.cn)

> 技术栈 / 目录 / 设计系统速览见 `CLAUDE.md`（SoT，不重复）。本文补充 routes、可视化组件、部署基础设施事实。

## Getting Started

```bash
bun install
bun run dev          # http://localhost:3000
bun run build        # Production build (includes TypeScript check)
bun run lint         # ESLint — must pass before commit
docker build -t lurus-www . && docker run -p 3000:3000 lurus-www
```

## Routes (12)

| Route | Description |
|-------|-------------|
| `/` | Hero + Persona Router + Features + Architecture + Comparison + Products + CTA |
| `/platform` | Platform group: Hub, Billing, Memorus + Architecture overview |
| `/lucrum` | Lucrum: AI quantitative trading |
| `/kova` | Kova: AI Agent execution engine |
| `/pricing` | Pricing tiers + model pricing table + FAQ |
| `/download` | Desktop tools: Switch + Creator |
| `/about` | Company mission & vision |
| `/solutions` | Use-case solutions by persona |
| `/blog` | Product changelog |
| `/privacy` / `/terms` | Privacy policy / Terms of service |

App Router specifics: `layout.tsx` (Header+Footer), `template.tsx` (ViewTransition page transitions), `loading.tsx` (skeleton), `not-found.tsx` (custom 404 with nav suggestions).

## Data Model (`lib/ecosystem.ts`)

Products = **directed graph**: 7 products / 4 groups (Platform P0, Lucrum P1, Kova P1, Desktop P2); 8 relationships, typed edges `powers | enhances | integrates`; 4 user personas with recommended paths + pain points; emotional metaphor per product (e.g. Hub = "AI central station"). Domain data (`Product`) separated from UI (`ProductPresentation`).

## Visual Effects

| Component | Effect | Purpose |
|-----------|--------|---------|
| `Aurora` | 2 warm accent blobs + white-hot focal wash | quiet paper atmosphere |
| `AnimatedCounter` | numbers roll 0→target | data-driven impact |
| `ArchitectureVisual` | SVG node graph + data-flow pulses | "one API, reaches everything" |
| Feature SVGs | per-capability animated diagrams | tangible product understanding |

Other components: `hero.tsx` (warm dark code window + streaming response demo), `page-hero.tsx` (shared Aurora hero for content pages), `related-products.tsx` (graph-driven), `comparison.tsx` (before/after table). Product/content pages reuse the `.code-block` warm-dark window for live API/log demos (`platform/gateway-demo.tsx`, `kova/features.tsx`, `lucrum/features.tsx`). Primitives: `smart-link.tsx` (auto internal/external/mailto), `section.tsx`.

## Deployment

GitOps: **GitHub Actions → GHCR → ArgoCD → K3s**. Push to main → CI (lint + build) → Docker build → GHCR push → update `deploy/k8s/deployment.yaml` image tag → ArgoCD auto-sync → K3s rollout.

| Component | Value |
|-----------|-------|
| Cluster | K3s (master `100.98.57.55`) |
| Namespace | `lurus-www` |
| Domain | `www.lurus.cn` / `lurus.cn` |
| Public IP | `123.57.143.63` (Aliyun, ICP) |
| Ingress | Traefik IngressRoute + wildcard TLS |
| Image | `ghcr.io/hanmahong5-arch/2c-bs-www-next:main-<sha7>` |
| Port | 3000 (Next.js standalone) |
| ArgoCD | `lurus-services` ApplicationSet |

**Environment:** no env vars required. External links → `hub.lurus.cn` (Hub console), `auth.lurus.cn` (Zitadel SSO), `docs.lurus.cn` (VitePress docs).

## Conventions

- All external links use `<SmartLink>` (auto `target="_blank"` + `rel="noopener noreferrer"`).
- Animation patterns use shared presets from `lib/motion.ts` (`fadeInUp`, `staggerChild`, `heroEntry`).
