import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Timeline } from "./timeline";

export const metadata: Metadata = {
  title: "关于我们",
  description: "Lurus 把 AI 基础设施的自建周期从数月压缩到几分钟，让团队的时间回到业务本身。",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        highlight="关于 Lurus"
        title="把基础设施的时间，还给产品"
        description="自建 LLM 网关、计费、记忆系统，通常吃掉一个团队几个月。这几个月本可以用来打磨业务本身——这是真正的成本。"
      />

      <section className="py-24">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">
                使命
              </h2>
              <p className="text-[var(--color-text-secondary)] leading-relaxed">
                消除 AI 基础设施的机会成本。网关、计费、记忆、通知——这些每家公司都要重复造的轮子，
                我们造好一次，你接入一次。省下的工程师时间，去做只有你能做的事。
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">
                愿景
              </h2>
              <p className="text-[var(--color-text-secondary)] leading-relaxed">
                成为企业接入 AI 的第一层。当团队决定拥抱 AI 时，不再问「基础设施怎么建」，
                只问「业务怎么做」。
              </p>
            </div>
          </div>

          <div className="section-divider my-16" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "13", label: "产品" },
              { value: "38", label: "AI 模型集成" },
              { value: "99.99%", label: "SLA 目标" },
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

          <div className="section-divider my-16" />

          <Timeline />
        </div>
      </section>
    </>
  );
}
