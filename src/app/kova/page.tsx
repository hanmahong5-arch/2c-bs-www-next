import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { CTA } from "@/components/cta";
import { RelatedProducts } from "@/components/related-products";
import { KovaFeatures } from "./features";

export const metadata: Metadata = {
  title: "Kova — AI Agent 基础设施",
  description:
    "Rust 构建的 AI Agent 执行引擎。WAL 崩溃恢复，DAG 任务编排，微秒级延迟。",
};

export default function KovaPage() {
  return (
    <>
      <PageHero
        highlight="Kova Engine"
        title="Agent 的操作系统"
        description="就像 Linux 之于服务器——Kova 是 AI Agent 的运行底座。崩溃？精确恢复到最后安全点。Rust 构建，单二进制部署，零外部依赖。"
        primaryAction={{ label: "快速开始", href: "https://docs.lurus.cn/kova" }}
        secondaryAction={{ label: "GitHub", href: "https://github.com/hanmahong5-arch/2b-svc-kova" }}
      />
      <KovaFeatures />
      <TechSpecs />
      <Ecosystem />
      <RelatedProducts productId="kova" />
      <CTA />
    </>
  );
}

function TechSpecs() {
  const specs = [
    { label: "语言", value: "Rust" },
    { label: "持久化", value: "WAL (Write-Ahead Log)" },
    { label: "调度", value: "DAG 拓扑排序" },
    { label: "延迟", value: "<1ms P99" },
    { label: "协议", value: "gRPC / REST / MCP / A2A" },
    { label: "部署", value: "单二进制，零依赖" },
  ];

  return (
    <section className="py-24 border-t border-[var(--color-border)]">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">
            <span className="text-gradient-gold">技术规格</span>
          </h2>
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

function Ecosystem() {
  const tools = [
    {
      id: "forge",
      name: "Forge",
      desc: "可视化 Agent 工作台，拖拽式 DAG 编排，实时调试",
      href: "https://docs.lurus.cn/kova/forge",
      external: true,
    },
    {
      id: "lumen",
      name: "Lumen CLI",
      desc: "Agent 开发者命令行工具，脚手架生成、本地测试、一键部署",
      href: "https://docs.lurus.cn/kova/lumen",
      external: true,
    },
    {
      id: "python-sdk",
      name: "Python SDK",
      desc: "Python 生态无缝集成，支持 LangChain / AutoGen 等框架",
      href: "https://docs.lurus.cn/kova/python",
      external: true,
    },
  ];

  return (
    <section id="ecosystem" className="py-24 border-t border-[var(--color-border)]">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">
            <span className="text-gradient-gold">生态工具</span>
          </h2>
          <p className="mt-4 text-[var(--color-text-secondary)]">
            完整的 Agent 开发工具链
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {tools.map((t) => (
            <a
              key={t.name}
              id={t.id}
              href={t.href}
              target="_blank"
              rel="noopener noreferrer"
              className="card p-6 block scroll-mt-20"
            >
              <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">
                {t.name}
                <span className="inline-block ml-1 opacity-40 text-[10px]">↗</span>
              </h3>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                {t.desc}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
