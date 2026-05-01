# lurus-www (2c-bs-www-next)

公司官网。当前活跃版本（Next.js），2026-04 迭代中。

- Tech: Next.js 16 + TypeScript + Tailwind CSS 4 + Framer Motion 12 + Bun
- Namespace/Port: `lurus-www` / `3000`
- Domain: `www.lurus.cn` (`lurus.cn` 301 redirect)
- Image: `ghcr.io/hanmahong5-arch/2c-bs-www-next:main-<sha7>`
- Node: cloud-ali-4-2c2g (www-gateway, ICP 备案节点)
- Product Group: Web (P2)

> 历史：早期 Vue → 2026-04 Phoenix（现转为 webgame，见 `2c-bs-www-phoenix/`）→ 当前回归 Next.js。

## Directory

```
src/
├── app/                  # App Router (12 routes)
│   ├── template.tsx      # ViewTransition page transitions
│   ├── loading.tsx       # Loading skeleton
│   └── not-found.tsx     # Custom 404
├── components/
│   ├── primitives/       # SmartLink, Section
│   ├── persona-router.tsx    # User journey selector
│   └── related-products.tsx  # Graph-driven cross-product links
└── lib/
    ├── ecosystem.ts      # Product graph (7 products, 8 relations, 4 personas)
    ├── products.ts       # Legacy flat product data
    └── motion.ts         # Animation presets
deploy/k8s/               # K8s manifests (ArgoCD)
```

## Commands

```bash
bun install
bun run dev           # http://localhost:3000
bun run build         # Production build
bun run lint          # ESLint
docker build -t lurus-www .
```

## Design System

- Dark theme: `--background: #0a0a0f`, `--color-ochre: #c8a24e` (brand gold)
- Primitives: `.card`, `.pill`, `.text-gradient-gold`, `.section-divider`, `.code-block`
- Backgrounds: `.grid-bg`, `.gradient-mesh`, `.noise`
- Animations: `lib/motion.ts` presets + CSS View Transitions
