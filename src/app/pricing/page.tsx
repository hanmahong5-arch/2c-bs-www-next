import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { PricingTiers, TierMatrix, UsagePricing, TallyTrialCallout } from "./tiers";
import { FAQ } from "./faq";
import { faqs } from "./faq-data";

export const metadata: Metadata = {
  title: "定价",
  description:
    "透明定价，按量付费。注册即送 $5 免费额度，企业级无上限。",
};

// FAQPage 结构化数据 — Q/A 文本与 faq.tsx 渲染内容一字不差，来自同一份 faqs 数组。
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  })),
};

export default function PricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <PageHero
        highlight="简单透明"
        title="用多少，付多少"
        description="注册即送 $5 免费额度，按量计费。没有隐藏费用，没有长期合约。"
      />
      <PricingTiers />
      <TierMatrix />
      <UsagePricing />
      <TallyTrialCallout />
      <FAQ />
    </>
  );
}
