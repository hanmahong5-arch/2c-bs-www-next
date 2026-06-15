"use client";

import { motion } from "framer-motion";

// 产品时间线 — 仅记录能从代码库/changelog 直接确证的事实，不写形容词，不编造日期
const milestones: {
  date: string;
  tag: string;
  title: string;
  detail: string;
}[] = [
  {
    date: "2026-02",
    tag: "基础设施",
    title: "文档站上线",
    detail:
      "多产品文档站首次上线，文档随代码仓库自动同步，消除手工维护周期。",
  },
  {
    date: "2026-04",
    tag: "平台",
    title: "官网回归 Next.js；Lutu 进入开发",
    detail:
      "官网技术栈切换为 Next.js（App Router + Tailwind 4），移动端消费者应用 Lutu 立项启动。",
  },
  {
    date: "2026-05",
    tag: "企业产品",
    title: "多租户 LLM Hub 进入预生产",
    detail:
      "Lurus Hub（lurus-newhub）上线预生产：OpenAI 兼容接口、多租户隔离、智能渠道路由、实时用量分析。",
  },
  {
    date: "2026-06",
    tag: "移动端",
    title: "Lutu Android 版开放下载",
    detail:
      "Lutu Android 版正式可下载，接入 Hub 统一 API，同一账户体系管理所有 AI 用量与计费。",
  },
];

export function Timeline() {
  return (
    <div className="max-w-2xl mx-auto">
      <p className="eyebrow text-center mb-3">发展历程</p>
      <h2 className="type-h2 text-[var(--color-text-primary)] mb-10 text-center">
        我们走到哪了
      </h2>

      <ol
        className="relative border-l-2 border-[var(--color-border)] space-y-10 pl-8 ml-2"
        aria-label="产品里程碑时间线"
      >
        {milestones.map((m, i) => (
          <motion.li
            key={m.date}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: i * 0.1, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* 轴上圆点 */}
            <span
              className="absolute -left-[39px] top-2 w-3 h-3 rounded-full bg-[var(--accent)] border-2 border-[var(--paper)]"
              aria-hidden="true"
            />

            {/* 日期 + 标签行 */}
            <div className="flex items-center gap-3 mb-1">
              <span className="font-mono text-xs text-[var(--color-text-muted)] tabular-nums">
                {m.date}
              </span>
              <span className="eyebrow" style={{ color: "var(--accent)" }}>
                {m.tag}
              </span>
            </div>

            {/* 标题 */}
            <p className="type-h3 text-[var(--color-text-primary)] mb-1">
              {m.title}
            </p>

            {/* 描述 */}
            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
              {m.detail}
            </p>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
