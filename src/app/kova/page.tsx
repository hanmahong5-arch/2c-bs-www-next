import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { RelatedProducts } from "@/components/related-products";
import { KovaFeatures } from "./features";
import { EvidenceStats, EvidenceCompliance, Boundaries } from "./evidence";
import { PilotCTA } from "./pilot-cta";
import { METRICS } from "./metrics";

export const metadata: Metadata = {
  title: "Kova — 崩了也不重来的 Agent 执行层",
  description:
    "Rust 持久执行 Agent 运行时。kill -9 实测 301 毫秒恢复服务,已完成的 LLM 调用零重发,执行全程可导出审计方能离线验证的防篡改证据包(支持国密 SM3)。",
};

export default function KovaPage() {
  return (
    <>
      <PageHero
        highlight="Kova"
        title="崩了也不重来的 Agent 执行层"
        description={`Agent 进程被杀、断电、OOM——WAL 先落盘再执行,崩溃后从最后安全点续跑:kill -9 实测 p50 ${METRICS.rto.p50Ms} 毫秒恢复服务,已完成的 LLM 调用零重发(网络边界抓包作证)。执行全程可导出防篡改证据包,审计方离线验证。`}
        primaryAction={{
          label: "预约现场演示",
          href: "mailto:sales@lurus.cn?subject=Kova%20%E7%8E%B0%E5%9C%BA%E6%BC%94%E7%A4%BA%E9%A2%84%E7%BA%A6",
        }}
        secondaryAction={{ label: "看证据与合规", href: "#evidence" }}
      />
      <EvidenceStats />
      <KovaFeatures />
      <EvidenceCompliance />
      <DeploySpecs />
      <Boundaries />
      <PilotCTA />
      <RelatedProducts productId="kova" />
    </>
  );
}

function DeploySpecs() {
  const specs = [
    { label: "语言", value: "Rust" },
    { label: "形态", value: "单二进制 + 单 WAL 文件" },
    { label: "外部依赖", value: "无(不需要 PG / Redis / 消息队列)" },
    { label: "数据", value: "全程留在你的内网" },
    { label: "接口", value: "REST / gRPC" },
    { label: "兼容承诺", value: "WAL v1 字节级(CI 黄金文件门禁)" },
  ];

  return (
    <section className="py-24 border-t border-[var(--color-border)]">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">
            <span className="text-gradient-gold">部署形态</span>
          </h2>
          <p className="mt-4 text-[var(--color-text-secondary)]">
            底座无聊,才可靠——没有集群要养,没有中间件要修
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {specs.map((s) => (
            <div key={s.label} className="card p-5 text-center">
              <div className="text-sm text-[var(--color-text-muted)] mb-1">
                {s.label}
              </div>
              <div className="text-lg font-semibold text-[var(--color-text-primary)]">
                {s.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
