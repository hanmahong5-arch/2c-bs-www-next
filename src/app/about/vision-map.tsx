"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";

// 能力版图 — 需求 → 核心 → 矩阵 的三分解耦叙事，愿景时态、事实导向。
// 强调色纪律：仅"核心 · Lugo"用橙焦点(--color-accent)，需求用蓝(--accent-2)、
// 矩阵用中性灰(--color-text-muted)，对齐 P0=橙 / P1=蓝 / P2=灰 既定语义。
// 边界：需求侧只作此段一个不可点击的版图节点 + 中性文案，不进产品矩阵、无链接、无独立页。

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

type Stage = {
  eyebrow: string;
  title: string;
  node?: string; // 版图节点名（不可点击）
  body: string;
  accent: string; // 焦点色（左边框 + eyebrow）
  border: string; // 卡片边框色
};

const stages: Stage[] = [
  {
    eyebrow: "需求侧",
    title: "获客增长引擎",
    node: "Lumao",
    body: "让 AI 能力触达需要它的企业。增长侧的自动化，是版图的一环。",
    accent: "var(--accent-2)",
    border: "color-mix(in srgb, var(--accent-2) 30%, transparent)",
  },
  {
    eyebrow: "核心",
    title: "Lugo",
    body: "账户、计费、LLM 网关、AI 记忆、多通道通知——企业 AI 应用的全部后端，一次给齐。",
    accent: "var(--color-accent)",
    border: "color-mix(in srgb, var(--color-accent) 35%, transparent)",
  },
  {
    eyebrow: "供给侧",
    title: "产品矩阵",
    body: "从量化交易到 Agent 引擎到进销存——5 个产品组，各自完整，共享同一层基础设施。",
    accent: "var(--color-text-muted)",
    border: "var(--color-border)",
  },
];

export function VisionMap() {
  return (
    <section aria-labelledby="vision-map-heading">
      <p className="eyebrow mb-3">能力版图</p>
      <h2
        id="vision-map-heading"
        className="type-h2 text-[var(--color-text-primary)] mb-4"
      >
        需求 <span className="text-[var(--color-text-muted)]">→</span> 核心{" "}
        <span className="text-[var(--color-text-muted)]">→</span> 矩阵
      </h2>
      <p className="text-[var(--color-text-secondary)] leading-relaxed mb-10 max-w-2xl">
        让 AI 能力被需要它的企业用上，是一条完整的链路：需求侧把机会带进来，
        核心把后端给齐，供给侧把能力交付出去。三段解耦，各自独立。
      </p>

      {/* 桌面横排"→"、移动竖排"↓"——复用 product-grid 的 tier 块 + 箭头视觉语言 */}
      <div className="flex flex-col md:flex-row md:items-stretch gap-3 md:gap-2">
        {stages.map((s, i) => (
          <Fragment key={s.title}>
            <motion.div
              className="card flex-1 p-6 rounded-2xl"
              style={{ borderColor: s.border }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.12, duration: 0.45, ease: EASE }}
            >
              <div
                className="w-0.5 h-5 mb-4 rounded-full"
                style={{ background: s.accent }}
                aria-hidden="true"
              />
              <p className="eyebrow mb-2" style={{ color: s.accent }}>
                {s.eyebrow}
              </p>
              <p className="type-h3 text-[var(--color-text-primary)] mb-1">
                {s.title}
              </p>
              {s.node && (
                <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-[var(--color-text-muted)] mb-2">
                  {s.node}
                </p>
              )}
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                {s.body}
              </p>
            </motion.div>

            {i < stages.length - 1 && (
              <div
                className="flex items-center justify-center shrink-0 text-[var(--color-text-muted)] text-lg leading-none"
                aria-hidden="true"
              >
                <span className="md:hidden">↓</span>
                <span className="hidden md:block">→</span>
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </section>
  );
}
