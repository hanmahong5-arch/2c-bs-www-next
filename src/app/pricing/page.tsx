import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { PricingTiers, UsagePricing } from "./tiers";
import { FAQ } from "./faq";

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
        title="用多少，付多少"
        description="免费额度起步，按量计费。没有隐藏费用，没有长期合约。"
      />
      <PricingTiers />
      <UsagePricing />
      <FAQ />
    </>
  );
}
