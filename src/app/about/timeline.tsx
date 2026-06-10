"use client";

import { motion } from "framer-motion";

// 产品时间线 — 事实从 doc/coord/changelog 提取，不写形容词
const milestones = [
  { date: "2026-02", event: "多产品文档站上线，文档随代码自动同步" },
  { date: "2026-04", event: "官网回归 Next.js；移动端 Lutu 进入开发" },
  { date: "2026-05", event: "多租户 LLM Hub 进入预生产环境" },
  { date: "2026-06", event: "Lutu Android 版开放下载" },
];

export function Timeline() {
  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-8 text-center">
        我们走到哪了
      </h2>
      <ol className="border-l border-[var(--color-border)] space-y-8 pl-6 ml-2">
        {milestones.map((m, i) => (
          <motion.li
            key={m.date}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            className="relative"
          >
            <span
              className="absolute -left-[31px] top-1.5 w-2.5 h-2.5 rounded-full bg-[var(--color-accent)] border-2 border-[var(--paper)]"
              aria-hidden="true"
            />
            <p className="font-mono text-xs text-[var(--color-text-muted)] mb-1">
              {m.date}
            </p>
            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
              {m.event}
            </p>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
