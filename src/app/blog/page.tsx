import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "更新日志",
  description: "Lurus 产品更新日志 — 新功能、改进和修复。",
};

const updates = [
  {
    date: "2026-04",
    title: "Lurus Hub 数据处理层上线",
    desc: "ChannelScorer 智能渠道评分 + UsageAggregator 用量聚合管道，实时优化 API 路由决策。",
    tags: ["Platform", "Hub"],
  },
  {
    date: "2026-04",
    title: "产品组架构重组",
    desc: "Platform 产品组整合 Hub / 计费 / Memorus / Admin / 通知 / Lutu，形成完整企业 AI 基础设施套件。",
    tags: ["Platform"],
  },
  {
    date: "2026-03",
    title: "Kova DAG 拓扑调度",
    desc: "有向无环图任务编排引擎，自动并行执行无依赖节点，1468 行核心库 + 22 集成测试。",
    tags: ["Kova"],
  },
  {
    date: "2026-03",
    title: "Platform 计费集成完成",
    desc: "8 个产品接入统一计费，Go SDK 封装，circuit breaker 保护，1052 测试通过。",
    tags: ["Platform", "Billing"],
  },
  {
    date: "2026-03",
    title: "Lucrum 全面改版",
    desc: "品牌升级 (gushen → Lucrum)，140+ 文件重构，算法策略优化。",
    tags: ["Lucrum"],
  },
];

export default function BlogPage() {
  return (
    <>
      <PageHero
        highlight="更新日志"
        title="产品动态"
        description="了解 Lurus 最新的功能更新、改进和修复。"
      />

      <section className="py-24">
        <div className="mx-auto max-w-3xl px-6">
          <div className="space-y-8">
            {updates.map((entry, i) => (
              <article key={i} className="card p-6 relative">
                <div className="flex items-center gap-3 mb-3">
                  <time className="text-xs text-[var(--color-text-muted)] font-mono">
                    {entry.date}
                  </time>
                  {entry.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] px-2 py-0.5 rounded-full border border-[var(--color-ochre)]/20 text-[var(--color-ochre)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">
                  {entry.title}
                </h2>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                  {entry.desc}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-[var(--color-text-muted)]">
              更多历史更新请查看{" "}
              <a
                href="https://docs.lurus.cn/changelog"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-ochre)] hover:underline"
              >
                文档站更新日志
                <span className="inline-block ml-0.5 opacity-40 text-[10px]">↗</span>
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
