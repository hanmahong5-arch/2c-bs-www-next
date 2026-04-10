import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { CTA } from "@/components/cta";
import { RelatedProducts } from "@/components/related-products";
import { LucrumFeatures } from "./features";

export const metadata: Metadata = {
  title: "Lucrum — AI 量化交易",
  description:
    "AI 策略生成 · 回测验证 · 实盘执行。机构级算法，个人投资者价格。",
};

export default function LucrumPage() {
  return (
    <>
      <PageHero
        highlight="Lucrum"
        title="AI 量化交易平台"
        description="自然语言描述策略 → AI 生成可执行代码 → 历史回测 → 实盘执行。机构级算法，个人投资者价格。"
        primaryAction={{ label: "开始交易", href: "https://lucrum.lurus.cn" }}
        secondaryAction={{ label: "策略文档", href: "https://docs.lurus.cn/lucrum" }}
      />
      <LucrumFeatures />
      <Workflow />
      <RelatedProducts productId="lucrum" />
      <CTA />
    </>
  );
}

function Workflow() {
  const steps = [
    {
      step: "01",
      title: "描述策略",
      desc: "用自然语言描述你的交易想法，AI 理解并转化为可执行逻辑",
    },
    {
      step: "02",
      title: "回测验证",
      desc: "多品种、多周期历史数据回测，可视化收益曲线和风险指标",
    },
    {
      step: "03",
      title: "模拟运行",
      desc: "接入实时行情模拟交易，验证策略在真实市场环境中的表现",
    },
    {
      step: "04",
      title: "实盘执行",
      desc: "一键对接交易所账户，AI 实时监控并自动执行下单",
    },
  ];

  return (
    <section className="py-24 border-t border-[var(--color-border)]">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold">
            <span className="text-gradient-gold">工作流程</span>
          </h2>
          <p className="mt-4 text-[var(--color-text-secondary)]">
            从想法到实盘，四步完成
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {steps.map((s) => (
            <div key={s.step} className="card p-6 text-center">
              <div className="text-3xl font-bold text-gradient-gold mb-3">
                {s.step}
              </div>
              <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">
                {s.title}
              </h3>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
