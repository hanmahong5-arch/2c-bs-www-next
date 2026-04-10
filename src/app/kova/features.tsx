"use client";

import { motion } from "framer-motion";

const features = [
  {
    icon: "💾",
    title: "WAL 崩溃恢复",
    desc: "Write-Ahead Log 持久化每一步执行状态，Agent 崩溃后精确恢复到最后检查点，零数据丢失。",
  },
  {
    icon: "🔄",
    title: "DAG 拓扑调度",
    desc: "复杂工作流用有向无环图建模，自动并行执行无依赖节点，最大化吞吐。",
  },
  {
    icon: "⚡",
    title: "微秒级延迟",
    desc: "Rust 零成本抽象 + 异步运行时，调度延迟 <1ms P99，适合实时 Agent 场景。",
  },
  {
    icon: "📦",
    title: "零外部依赖",
    desc: "不需要 Redis、PostgreSQL 或消息队列。单个二进制文件包含一切，嵌入式部署。",
  },
  {
    icon: "🔌",
    title: "多协议支持",
    desc: "原生 gRPC + REST API，兼容 MCP (Model Context Protocol) 和 A2A (Agent-to-Agent)。",
  },
  {
    icon: "🐍",
    title: "Python 集成",
    desc: "PyO3 绑定，在 Python 中直接使用 Kova 引擎，兼容 LangChain / AutoGen 等框架。",
  },
];

export function KovaFeatures() {
  return (
    <section className="py-24 border-t border-[var(--color-border)]">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold">
            <span className="text-gradient-gold">核心特性</span>
          </h2>
          <p className="mt-4 text-[var(--color-text-secondary)]">
            为 AI Agent 运行时而生
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="card p-6"
            >
              <span className="text-3xl">{f.icon}</span>
              <h3 className="mt-4 text-lg font-semibold text-[var(--color-text-primary)]">
                {f.title}
              </h3>
              <p className="mt-2 text-sm text-[var(--color-text-muted)] leading-relaxed">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
