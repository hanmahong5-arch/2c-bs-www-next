# lurus-www (Next.js)

公司官网。Next.js 16 + TypeScript + Tailwind CSS 4 + Framer Motion 12。GitOps 部署到 K3s。

| Item | Value |
|------|-------|
| URL | `https://www.lurus.cn` |
| Namespace | `lurus-www` |
| Port | `3000` |
| Image | `ghcr.io/hanmahong5-arch/2c-bs-www-next:main-<sha7>` |
| Product Group | Web (P2) |

## Commands

```bash
bun install
bun run dev          # http://localhost:3000
bun run build        # Production build
bun run lint         # ESLint
docker build -t lurus-www .   # Docker build
```

## Architecture

```
src/
├── app/                  # 12 routes (App Router)
│   ├── template.tsx      # ViewTransition page transitions
│   ├── loading.tsx       # Loading skeleton
│   └── not-found.tsx     # Custom 404
├── components/
│   ├── primitives/       # SmartLink, Section (reusable atoms)
│   ├── persona-router.tsx    # User journey selector
│   └── related-products.tsx  # Graph-driven cross-product links
├── lib/
│   ├── ecosystem.ts      # Product graph (7 products, 8 relations, 4 personas)
│   ├── products.ts       # Legacy flat product data
│   └── motion.ts         # Animation presets
└── deploy/k8s/           # K8s manifests (ArgoCD)
```

## Design System

- Dark theme: `--background: #0a0a0f`, `--color-ochre: #c8a24e` (brand gold)
- Primitives: `.card`, `.pill`, `.text-gradient-gold`, `.section-divider`, `.code-block`
- Backgrounds: `.grid-bg`, `.gradient-mesh`, `.noise`
- Animations: `lib/motion.ts` presets + CSS View Transitions
