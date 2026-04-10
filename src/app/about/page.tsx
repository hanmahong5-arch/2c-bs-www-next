import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "关于我们",
  description: "Lurus 团队致力于让每家企业都能拥有世界级的 AI 基础设施。",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        highlight="关于 Lurus"
        title="让 AI 基础设施触手可及"
        description="我们相信，企业 AI 转型不应该被基础设施的复杂性所阻碍。Lurus 提供开箱即用的全栈 AI 后端，让团队聚焦于业务创新。"
      />

      <section className="py-24">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">
                使命
              </h2>
              <p className="text-[var(--color-text-secondary)] leading-relaxed">
                降低企业 AI 基础设施的门槛。从 LLM 网关到计费引擎，从记忆系统到通知管道，
                用一套标准化的产品矩阵替代数月的自建投入。
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">
                愿景
              </h2>
              <p className="text-[var(--color-text-secondary)] leading-relaxed">
                成为企业 AI 转型的基础设施标准。当企业决定拥抱 AI 时，Lurus 是他们首先接入的一层。
              </p>
            </div>
          </div>

          <div className="section-divider my-16" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "5", label: "产品线" },
              { value: "30+", label: "AI 模型集成" },
              { value: "99.9%", label: "SLA 目标" },
              { value: "24/7", label: "监控覆盖" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-bold text-gradient-gold">
                  {s.value}
                </div>
                <div className="mt-1 text-sm text-[var(--color-text-muted)]">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
