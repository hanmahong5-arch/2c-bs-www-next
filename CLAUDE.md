# lurus-www (2c-bs-www-next)

个人项目站（`lurus.cn` 个人备案；不是企业主体官网）。domain `www.lurus.cn`（`lurus.cn` 301 redirect），ns/port `lurus-www`/3000，ICP 备案节点。Next.js 16 / React 19 / Tailwind 4 / Framer Motion 12 / Bun。企业完整叙事见 `doc/ops/company-domain-cutover.md`（`ailurus.top`）。

## Commands

```bash
bun install
bun run dev           # :3000
bun run build
bun run lint
docker build -t lurus-www .
```

> 真源/细节: 设计系统真源 `doc/design/brand-spec.md` · 项目上下文 / 组件 / 动效 / 文案哲学 `/lurus-www-next` `/frontend-design` skill · 产品数据页内本地（如 `src/app/memorus/product-data.ts`），无统一 ecosystem 模块。
