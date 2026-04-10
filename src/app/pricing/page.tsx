import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { PricingTiers, UsagePricing } from "./tiers";

export const metadata: Metadata = {
  title: "定价",
  description:
    "透明定价，按量付费。免费额度起步，企业级无上限。",
};

export default function PricingPage() {
  return (
    <>
      <PageHero
        highlight="简单透明"
        title="按量付费"
        description="免费额度起步，用多少付多少。企业客户可定制专属方案。"
      />
      <PricingTiers />
      <UsagePricing />
      <FAQ />
    </>
  );
}

function FAQ() {
  const faqs = [
    {
      q: "免费额度有什么限制？",
      a: "免费版包含每月 $5 等值的 API 调用额度，支持所有模型，无功能限制。超出部分按量计费。",
    },
    {
      q: "支持哪些支付方式？",
      a: "支持支付宝、微信支付、Stripe（国际信用卡）。企业客户可申请对公转账和发票。",
    },
    {
      q: "可以随时更换套餐吗？",
      a: "可以。升级即时生效，降级在当前计费周期结束后生效。未使用的额度按比例退还。",
    },
    {
      q: "企业版有什么额外能力？",
      a: "私有部署、专属客服、SLA 保障、自定义计费规则、审计日志、SSO 集成等。",
    },
  ];

  return (
    <section className="py-24 border-t border-[var(--color-border)]">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">
            <span className="text-gradient-gold">常见问题</span>
          </h2>
        </div>

        <div className="space-y-6">
          {faqs.map((faq) => (
            <div key={faq.q} className="card p-6">
              <h3 className="text-base font-semibold text-[var(--color-text-primary)] mb-2">
                {faq.q}
              </h3>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
