中文 | [English](./README.md)

# Lurus 官网

LurusTech 对外官网 —— 面向企业 AI 基础设施平台的纸感编辑风站点。**线上：** [www.lurus.cn](https://www.lurus.cn)

Next.js 16（App Router）+ React 19 + Tailwind CSS 4（CSS-first）+ Framer Motion 12，用 Bun 构建运行，以 Docker standalone 镜像经 GitOps 交付。12 条内容路由，自身没有后端：所有产品入口都指向站外控制台，唯一的服务端路由是一个埋点接口。

## 快速开始

```bash
bun install
bun run dev            # http://localhost:3000
bun run build          # 生产构建，含 TypeScript 检查
bun run lint           # ESLint —— 提交前必须通过

docker build -t lurus-www . && docker run -p 3000:3000 lurus-www
```

> 本仓只用 Bun —— 脚本与文档中不出现 npm / yarn / npx / node。

## 路由

| 路由 | 内容 |
|---|---|
| `/` | 首页：Hero → TrustBand → Scenarios → QuickStart → Comparison → CostCalculator → Architecture → Features → ProductGrid → CTA |
| `/platform` | Lugo 平台组：网关、计费、记忆 |
| `/kova` | Kova，Agent 执行引擎 |
| `/lucrum` | Lucrum，AI 量化交易 |
| `/pricing` | 套餐档位、分模型价目表、FAQ |
| `/download` | 桌面端工具 |
| `/solutions` | 按人群划分的解决方案 |
| `/about` · `/blog` | 公司介绍、产品更新（`/blog/rss.xml` 订阅源） |
| `/privacy` · `/terms` | 法务页 |
| `/login` | 跳转到身份提供方 |
| `/api/track` | 埋点接口 —— 唯一的动态路由 |

App Router 相关：`layout.tsx`（页头页脚、JSON-LD、主题初始化）、`template.tsx`（View Transitions 页面转场）、`loading.tsx`、`not-found.tsx`。社交卡片由 `opengraph-image.tsx` / `twitter-image.tsx` 动态生成。

## 目录

```
src/
├── app/               # 路由；globals.css 放全部自定义 class 与设计 token 别名
├── components/
│   ├── site/          # 共享页面组件：Section、EvidenceLine、Disclosure、MaturityChip、ProductHeader…
│   ├── header.tsx · footer.tsx · command-palette.tsx
└── styles/lurus-design/   # vendor 的设计 token —— 禁手改（见下）
```

## 代码里读不出来的约定

以下四条都是实打实踩出来的，改样式或动画前先看。

**1. 动画 preset 里绝不能出现 `opacity: 0`。**
动画 preset 一旦写了 opacity，就会被 SSR 成 inline `style="opacity:0"`，而 inline style 是 CSS 覆盖不掉的。这样处理过的元素在水合前完全不可见 —— 慢网、JS 失败、截图型渲染下页面就是一片空白。这是量出来的：首页一度有 103 处 inline `opacity:0`。现在 preset 只动位移/缩放/模糊。确实需要淡入时，用 `globals.css` 里的 `.hero-enter-*` 纯 CSS 类 —— 它们在首次绘制时就开始播放，不等 JS。

**2. 每个 CSS 动画类都必须登记进 `prefers-reduced-motion` 块。**
这些类用 `animation-fill-mode: both`，起始帧（`opacity: 0`）会一直保持，靠 `animation: none` 才解除。漏掉任何一个类，开了「减弱动态效果」的用户就会永远看不到那个元素。

**3. `src/styles/lurus-design/**` 是 vendor 副本 —— 禁止手改。**
真源在平台 governance 仓。在根仓跑 `bash scripts/design-sync.sh <本仓>/src/styles/lurus-design` 重新生成；`--check` 模式会把漂移打成 CI 红灯。只 import `tokens.css` —— `theme.css` 与 `tailwind-preset.cjs` 是给其他消费方的分发面，引入会顶掉本仓自托管的字体。

**4. `globals.css` 里的未分层规则优先级高于 Tailwind utility。**
Tailwind v4 把 utility 放在 `@layer utilities` 里，而 `globals.css` 中的普通规则未分层，因此胜出。`.eyebrow` 设了 `text-transform: uppercase`，所以给同时带 `.eyebrow` 的元素加 `normal-case` 完全无效 —— 首页一个真实域名因此被静默渲染成全大写。两者冲突时，去掉语义类、直接用 utility。

另外：演示数据（延迟、费用、账目、路由表）都是写死的，必须带可见的「示意」标注，不能让它读起来像实测遥测。产品页上的示例（证据行）必须在说明里标注「示例」。

## 部署

GitOps：GitHub Actions → GHCR → ArgoCD → K3s。推 `main` 触发 lint + build，构建镜像推送到 GHCR，更新 `deploy/k8s/deployment.yaml` 的镜像标签，ArgoCD 自动同步。

| | |
|---|---|
| 命名空间 / 端口 | `lurus-www` / 3000（Next.js standalone） |
| 域名 | `www.lurus.cn`、`lurus.cn`（301 跳转） |
| 镜像 | `ghcr.io/hanmahong5-arch/2c-bs-www-next:main-<sha7>` |
| Ingress | Traefik IngressRoute + 通配符 TLS |
| 环境变量 | 无需任何环境变量 |

`lighthouserc.json` 对 `/`、`/pricing`、`/about` 断言可访问性 ≥ 0.9、SEO ≥ 0.9、性能 ≥ 0.5（warn 级，非硬闸）。

## 相关

页头与页脚引用的站外目标：身份提供方（`identity.lurus.cn`，也是 `/login` 的跳转目标）、文档站（`docs.lurus.cn`）。本仓对它们没有构建期依赖。
