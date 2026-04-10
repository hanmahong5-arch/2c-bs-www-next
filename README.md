# lurus-www (2c-bs-www-next)

Lurus 公司官网。Dark-themed, animation-rich marketing site for the Lurus enterprise AI infrastructure platform.

**Live**: [www.lurus.cn](https://www.lurus.cn)

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 16 (App Router, React 19) |
| Styling | Tailwind CSS 4 |
| Animation | Framer Motion 12 + CSS View Transitions |
| Language | TypeScript 5 |
| Runtime | Bun |
| Deployment | Vercel |

## Getting Started

```bash
bun install
bun run dev          # http://localhost:3000
bun run build        # Production build
bun run lint         # ESLint
```

## Routes

| Route | Description |
|-------|-------------|
| `/` | Homepage: Hero + Persona Router + Features + Architecture + Comparison + Products + CTA |
| `/platform` | Platform product group: Hub, Billing, Memorus + Architecture overview |
| `/lucrum` | Lucrum landing: AI quantitative trading |
| `/kova` | Kova landing: AI Agent execution engine |
| `/pricing` | Pricing tiers + model pricing table + FAQ |
| `/download` | Desktop tools: Switch + Creator |
| `/about` | Company mission & vision |
| `/solutions` | Use-case solutions by persona |
| `/blog` | Product changelog |
| `/privacy` | Privacy policy |
| `/terms` | Terms of service |

## Architecture

```
src/
├── app/                  # App Router pages (12 routes)
│   ├── layout.tsx        # Root layout (Header + Footer)
│   ├── template.tsx      # ViewTransition wrapper (page transitions)
│   ├── loading.tsx       # Global loading skeleton
│   ├── not-found.tsx     # Custom 404 with navigation suggestions
│   └── <route>/page.tsx  # Individual pages
├── components/
│   ├── primitives/       # Reusable UI atoms
│   │   ├── smart-link.tsx    # Auto-detects internal/external/mailto
│   │   └── section.tsx       # Section layout primitive
│   ├── hero.tsx          # Homepage hero with code demo + particle network
│   ├── page-hero.tsx     # Sub-page hero (Aurora + FloatingShapes)
│   ├── persona-router.tsx    # "I am a..." persona selector → product journey
│   ├── related-products.tsx  # Cross-product recommendations (graph-driven)
│   ├── architecture-visual.tsx  # SVG architecture diagram with data pulses
│   ├── features-showcase.tsx    # 6 capabilities with animated SVG visuals
│   ├── comparison.tsx    # Before/After comparison table
│   ├── aurora.tsx        # Animated gradient aurora background
│   ├── particle-network.tsx  # Canvas particle network (gold nodes + lines)
│   ├── floating-shapes.tsx   # Floating geometric SVG shapes
│   └── ...
└── lib/
    ├── ecosystem.ts      # Product graph: relationships, personas, metaphors
    ├── products.ts       # Product data (flat, legacy compat)
    └── motion.ts         # Shared Framer Motion animation presets
```

### Data Model (`lib/ecosystem.ts`)

Products are modeled as a **directed graph**:

- **7 products** across 4 groups (Platform P0, Lucrum P1, Kova P1, Desktop P2)
- **8 relationships** with typed edges: `powers` | `enhances` | `integrates`
- **4 user personas** with recommended product paths and pain points
- **Emotional metaphors** for each product (e.g., Hub = "AI central station")
- Domain data separated from UI presentation (`Product` vs `ProductPresentation`)

### Design System

- Dark theme: `#0a0a0f` background, `#c8a24e` brand gold
- CSS classes: `.card`, `.pill`, `.text-gradient-gold`, `.bg-gradient-gold`, `.glow-ochre`
- Backgrounds: `.grid-bg`, `.gradient-mesh`, `.noise`, `.section-divider`
- Code highlighting: `.code-block` with syntax tokens (`.keyword`, `.string`, etc.)
- View Transitions: crossfade + slide-up between pages, header stays fixed

### Visual Effects

| Component | Effect | Purpose |
|-----------|--------|---------|
| `Aurora` | 3-layer floating gradient blobs | "Cutting-edge tech" atmosphere |
| `ParticleNetwork` | Canvas gold particles + auto-connecting lines | "AI infrastructure interconnection" |
| `FloatingShapes` | SVG circles/hexagons/rings/diamonds | Spatial depth |
| `AnimatedCounter` | Numbers roll from 0 to target | Data-driven impact |
| `ArchitectureVisual` | SVG node graph + data flow pulses | "One API, reaches everything" |
| Feature SVGs | Per-capability animated diagrams | Tangible product understanding |

## Deployment

GitOps: **GitHub Actions → GHCR → ArgoCD → K3s**

```
Push to main → CI (lint + build) → Docker build → GHCR push
            → Update deploy/k8s/deployment.yaml image tag
            → ArgoCD auto-sync → K3s rollout
```

### Infrastructure

| Component | Value |
|-----------|-------|
| Cluster | K3s (master: `100.98.57.55`) |
| Namespace | `lurus-www` |
| Domain | `www.lurus.cn` / `lurus.cn` |
| Public IP | `123.57.143.63` (Aliyun, ICP) |
| Ingress | Traefik IngressRoute + wildcard TLS |
| Image | `ghcr.io/hanmahong5-arch/2c-bs-www-next:main-<sha7>` |
| Port | 3000 (Next.js standalone) |
| ArgoCD | `lurus-services` ApplicationSet |

### Docker Build

```bash
docker build -t lurus-www .
docker run -p 3000:3000 lurus-www
```

### Environment

No environment variables required. All external links point to:
- `api.lurus.cn` (Hub console)
- `auth.lurus.cn` (Zitadel SSO)
- `docs.lurus.cn` (VitePress docs)

## Contributing

```bash
bun run lint         # Must pass before commit
bun run build        # Must succeed (includes TypeScript check)
```

All external links use `<SmartLink>` component (auto `target="_blank"` + `rel="noopener noreferrer"`).
Animation patterns use shared presets from `lib/motion.ts` (`fadeInUp`, `staggerChild`, `heroEntry`).
