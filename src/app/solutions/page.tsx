import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "解决方案",
  description: "Lurus 企业 AI 解决方案 — 按行业和场景定制的 AI 基础设施方案。",
};

const solutions = [
  {
    title: "SaaS 产品接入 AI",
    audience: "SaaS 厂商",
    pain: "想给产品加 AI 功能，但自建 LLM 网关 + 计费太重",
    solution:
      "接入 Lurus Hub API → 用户按量计费自动走通 → AI 记忆让助手有上下文。3 个 API 即可上线。",
    cta: { label: "了解 Platform", href: "/platform" },
  },
  {
    title: "企业内部 AI 中台",
    audience: "中大型企业 IT 部门",
    pain: "多个业务线各自对接不同 AI 供应商，成本失控，无法统一管理",
    solution:
      "Lurus 作为统一 AI 网关，多租户隔离各业务线，集中计费 + 用量审计 + 权限管控。",
    cta: { label: "查看定价", href: "/pricing" },
  },
  {
    title: "AI Agent 开发",
    audience: "AI 应用开发者",
    pain: "Agent 执行不可靠，崩溃丢失状态，工作流编排复杂",
    solution:
      "Kova Engine WAL 崩溃恢复 + DAG 拓扑调度。Forge 可视化编排 + Lumen CLI 本地开发。",
    cta: { label: "了解 Kova", href: "/kova" },
  },
  {
    title: "量化交易",
    audience: "个人和机构投资者",
    pain: "策略开发门槛高，回测工具碎片化，实盘对接复杂",
    solution:
      "Lucrum AI 策略顾问 → 自然语言描述 → 生成代码 → 历史回测 → 一键实盘。",
    cta: { label: "了解 Lucrum", href: "/lucrum" },
  },
];

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        highlight="解决方案"
        title="按场景定制"
        description="无论你是 SaaS 产品、企业 IT、AI 开发者还是投资者，Lurus 都有对应的方案。"
      />

      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6 space-y-8">
          {solutions.map((s, i) => (
            <div key={i} className="card p-8 md:p-10">
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <div className="flex-1">
                  <div className="pill w-fit mb-4">{s.audience}</div>
                  <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-3">
                    {s.title}
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <span className="text-xs text-[var(--color-error)] uppercase tracking-wider font-medium">
                        痛点
                      </span>
                      <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                        {s.pain}
                      </p>
                    </div>
                    <div>
                      <span className="text-xs text-[var(--color-success)] uppercase tracking-wider font-medium">
                        方案
                      </span>
                      <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                        {s.solution}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="md:self-center shrink-0">
                  <Link
                    href={s.cta.href}
                    className="inline-flex px-6 py-3 rounded-xl border border-[var(--color-border)] text-sm text-[var(--color-text-primary)] font-medium hover:border-[var(--color-ochre)]/50 hover:bg-[var(--color-surface)] transition-all"
                  >
                    {s.cta.label} →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Enterprise CTA */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">
            没找到你的场景？
          </h2>
          <p className="text-[var(--color-text-secondary)] mb-8">
            我们可以根据你的具体需求定制方案。联系我们，获取免费咨询。
          </p>
          <a
            href="mailto:sales@lurus.cn"
            className="inline-flex px-8 py-3.5 rounded-xl bg-gradient-gold text-black font-semibold hover:opacity-90 transition-opacity"
          >
            联系销售
          </a>
        </div>
      </section>
    </>
  );
}
