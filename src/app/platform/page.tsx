import type { Metadata } from "next";
import { productGroups } from "@/lib/products";
import { PageHero } from "@/components/page-hero";
import { ProductDetail } from "@/components/product-detail";
import { CTA } from "@/components/cta";
import { RelatedProducts } from "@/components/related-products";
import { GatewayDemo } from "./gateway-demo";

export const metadata: Metadata = {
  title: "Lugo — 企业 AI 基础设施",
  description:
    "Lugo（企业 AI 平台）：LLM 网关 · 账户计费 · AI 记忆引擎。开箱即用的企业 AI 后端套件。",
};

const platform = productGroups.find((g) => g.id === "platform")!;

export default function PlatformPage() {
  return (
    <>
      <PageHero
        highlight="Lugo"
        title="一座完整的 AI 城市"
        description="Hub 是中央车站，Billing 是银行，Memorus 是图书馆。你只需「入住」，一切就绪。30+ 模型、金融级计费、持久化记忆——无需自建。"
        primaryAction={{ label: "免费试用", href: "https://hub.lurus.cn" }}
        secondaryAction={{ label: "阅读文档", href: "https://docs.lurus.cn" }}
      />

      <GatewayDemo />

      <CapabilityStrip />

      <section className="pb-24 border-t border-[var(--color-border)]">
        <div className="mx-auto max-w-7xl px-6 pt-16 space-y-12">
          {platform.products.map((product, i) => (
            <ProductDetail key={product.id} product={product} index={i} />
          ))}
        </div>
      </section>

      <ArchitectureOverview />
      <Boundaries />
      <RelatedProducts productId="hub" />
      <CTA />
    </>
  );
}

// Lugo 五项能力标签条 — 统领下方 3 个 ProductDetail，真源 lurus.yaml capabilities。
// 精简标签条而非整块 FeaturesShowcase，避免与 ProductDetail 内容重叠 + 页面过长。
function CapabilityStrip() {
  const caps = [
    { name: "账户认证", desc: "OIDC · RBAC · 多租户" },
    { name: "计费钱包", desc: "DECIMAL(20,4) 原子事务" },
    { name: "LLM 网关", desc: "30+ 模型 · 智能路由" },
    { name: "AI 记忆", desc: "向量检索 · REST + MCP" },
    { name: "多通道通知", desc: "WebSocket · SMTP · FCM" },
  ];

  return (
    <section className="py-14 border-t border-[var(--color-border)]">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-8">
          <p className="eyebrow mb-3">LUGO PLATFORM</p>
          <h2 className="headline-tight text-2xl md:text-3xl font-bold">
            <span className="text-[var(--color-text-primary)]">一套后端，</span>
            <span className="text-gradient-gold">五项能力</span>
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {caps.map((c) => (
            <div key={c.name} className="card p-4 text-center">
              <p className="text-sm font-semibold text-[var(--color-text-primary)] mb-1">
                {c.name}
              </p>
              <p className="text-[11px] font-mono text-[var(--color-text-muted)] leading-relaxed">
                {c.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// 诚实边界 — 明确 Lugo 不做什么，用克制的技术受众语言建立信任，非营销免责声明。
function Boundaries() {
  const items = [
    {
      title: "不做模型训练与微调托管",
      desc: "Lugo 是接入与运营层，训练平台不是我们的战场。",
    },
    {
      title: "Memorus 是应用级 AI 记忆",
      desc: "不替代超大规模场景下的专业向量数据库集群。",
    },
    {
      title: "不做低代码 / 无代码搭建",
      desc: "面向工程团队，以 API 与 SDK 交付。",
    },
    {
      title: "BETA 阶段按目标口径承诺",
      desc: "99.9% 可用性为目标，合同级 SLA 待正式版。",
    },
  ];

  return (
    <section className="py-24 border-t border-[var(--color-border)]">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-12">
          <p className="eyebrow mb-3">边界</p>
          <h2 className="text-3xl font-bold text-[var(--color-text-primary)]">
            Lugo 不做什么
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {items.map((item) => (
            <div key={item.title} className="card p-6">
              <h3 className="text-base font-semibold text-[var(--color-text-primary)] mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ArchitectureOverview() {
  const layers = [
    {
      name: "接入层",
      items: ["OpenAI 兼容 API", "多租户隔离", "速率限制", "API Key 管理"],
    },
    {
      name: "处理层",
      items: ["智能路由", "用量聚合", "渠道评分", "成本优化"],
    },
    {
      name: "业务层",
      items: ["钱包计费", "订阅管理", "权益引擎", "支付通道"],
    },
    {
      name: "基础设施",
      items: ["PostgreSQL", "Redis", "NATS", "Temporal"],
    },
  ];

  return (
    <section className="py-24 border-t border-[var(--color-border)]">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">
            <span className="text-gradient-gold">架构概览</span>
          </h2>
          <p className="mt-4 text-[var(--color-text-secondary)]">
            分层架构，每层独立可替换
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-4">
          {layers.map((layer, i) => (
            <div key={layer.name} className="card p-6">
              <div className="text-xs text-[var(--color-ochre)] font-medium mb-1">
                L{i + 1}
              </div>
              <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4">
                {layer.name}
              </h3>
              <ul className="space-y-2">
                {layer.items.map((item) => (
                  <li
                    key={item}
                    className="text-sm text-[var(--color-text-muted)] flex items-center gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-[var(--color-ochre)]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
