import type { Metadata } from "next";
import { productGroups } from "@/lib/products";
import { PageHero } from "@/components/page-hero";
import { ProductDetail } from "@/components/product-detail";
import { CTA } from "@/components/cta";
import { RelatedProducts } from "@/components/related-products";

export const metadata: Metadata = {
  title: "Platform — 企业 AI 基础设施",
  description:
    "Lurus Platform：LLM 网关 · 账户计费 · AI 记忆引擎。开箱即用的企业 AI 后端套件。",
};

const platform = productGroups.find((g) => g.id === "platform")!;

export default function PlatformPage() {
  return (
    <>
      <PageHero
        highlight="Lurus Platform"
        title="一座完整的 AI 城市"
        description="Hub 是中央车站，Billing 是银行，Memorus 是图书馆。你只需「入住」，一切就绪。30+ 模型、金融级计费、持久化记忆——无需自建。"
        primaryAction={{ label: "免费试用", href: "https://api.lurus.cn" }}
        secondaryAction={{ label: "阅读文档", href: "https://docs.lurus.cn" }}
      />

      <section className="pb-24 border-t border-[var(--color-border)]">
        <div className="mx-auto max-w-7xl px-6 pt-16 space-y-12">
          {platform.products.map((product, i) => (
            <ProductDetail key={product.id} product={product} index={i} />
          ))}
        </div>
      </section>

      <ArchitectureOverview />
      <RelatedProducts productId="hub" />
      <CTA />
    </>
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
