# lurus-www (Next.js)

公司官网。Next.js 15 + TypeScript + Tailwind CSS 4 + Framer Motion。部署到 Vercel + 阿里云 CDN（ICP 合规）。

| Item | Value |
|------|-------|
| URL | `https://www.lurus.cn` |
| Namespace | Vercel (non-K8s) |
| Dev port | `3000` |
| Product Group | Web (P2) |

## Commands

```bash
bun install
bun run dev          # http://localhost:3000
bun run build        # Production build
bun run lint         # ESLint
```

## Directory Structure

```
src/
├── app/             # App Router pages
│   ├── page.tsx     # Home (Hero + ProductGrid + CTA)
│   ├── platform/    # Platform product group detail
│   ├── lucrum/      # Lucrum landing
│   ├── kova/        # Kova landing
│   ├── pricing/     # Dynamic pricing
│   ├── download/    # Desktop tools
│   └── layout.tsx   # Root layout (Header + Footer)
├── components/      # Shared components
└── lib/             # Data + utilities (products.ts)
```

## Design System

- Dark theme: `--background: #0a0a0f`, `--color-ochre: #c8a24e` (brand gold)
- Components: `.card`, `.text-gradient-gold`, `.bg-gradient-gold`
- Animations: Framer Motion `whileInView` for scroll-triggered reveals
