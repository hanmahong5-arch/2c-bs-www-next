"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, animate } from "framer-motion";

// Provider list — static, honest. Hover reveals the specific models served.
// 国际供应商 / 国内供应商 两组，不加假 logo，名字自己说话。
const providerGroups = [
  {
    label: "国际",
    providers: [
      { name: "OpenAI", meta: "GPT-4o · o3 · o4-mini" },
      { name: "Anthropic", meta: "Claude Opus 4 · Sonnet 4.5 · Haiku 3.5" },
      { name: "Google Gemini", meta: "Gemini 2.5 Pro · Flash · Flash-8B" },
      { name: "Mistral", meta: "Large · Small 3 · Codestral" },
      { name: "Meta Llama", meta: "Llama 4 Scout · Llama 3.3 70B" },
    ],
  },
  {
    label: "国内",
    providers: [
      { name: "DeepSeek", meta: "V3 · R1 · R1-0528" },
      { name: "Qwen", meta: "Qwen3-235B · QwQ-32B" },
      { name: "Zhipu GLM", meta: "GLM-4-Plus · CogView-4" },
      { name: "Moonshot", meta: "Kimi k2 · Moonshot-v1" },
      { name: "MiniMax", meta: "abab7 · Speech-02-Turbo" },
      { name: "Baichuan", meta: "Baichuan4-Turbo · AirX" },
      { name: "Yi", meta: "Yi-Large-Turbo · Yi-Vision" },
    ],
  },
];

// Platform fact metrics — values are design targets.
// DECIMAL(20,4) enforced at DB layer; audit trail per call.
const metrics = [
  {
    value: "30+",
    label: "模型供应商",
    note: "持续接入中",
  },
  {
    value: "<100ms",
    label: "路由 p50 延迟",
    note: "国内骨干链路",
  },
  {
    value: "99.9%",
    label: "SLA 可用性",
    note: "滚动 30 日",
  },
  {
    value: "¥0.0001",
    label: "最小计费单位",
    note: "DECIMAL(20,4)",
  },
  {
    value: "5",
    label: "分钟接入",
    note: "改一行 baseURL",
  },
];

// Animates a numeric string on scroll entry.
// Handles prefix/suffix automatically ("30+" → 0..30+, "<100ms" → <0ms..<100ms, "99.9%" → 99.0%..99.9%).
function AnimatedMetric({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);
  const inView = useInView(ref, { once: true, amount: 0.8 });
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;

    const match = value.match(/^([^0-9]*)([0-9]+(?:\.[0-9]+)?)(.*)$/);
    if (!match) return;

    const [, prefix, numStr, suffix] = match;
    const target = parseFloat(numStr);
    const decimals = (numStr.split(".")[1] ?? "").length;
    const startFrom = decimals > 0 ? Math.max(target * 0.9, 0) : 0;

    const controls = animate(startFrom, target, {
      duration: 1.5,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(v) {
        setDisplay(prefix + v.toFixed(decimals) + suffix);
      },
      onComplete() {
        setDisplay(value);
      },
    });

    return () => controls.stop();
  }, [inView, value]);

  return <span ref={ref}>{display}</span>;
}

export function TrustBand() {
  return (
    <section className="py-16 relative">
      <div className="section-divider" />

      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="pt-12 pb-8 text-center"
      >
        <p className="eyebrow mb-2">平台实况</p>
        <p className="text-xs text-[var(--color-text-muted)] font-mono">
          以下指标为平台设计目标，计费精度由数据库层约束保证
        </p>
      </motion.div>

      {/* Metrics — fact table layout, not a marketing strip */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.08 }}
        className="mx-auto max-w-4xl px-6 pb-4"
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-px bg-[var(--color-border)]">
          {metrics.map((m) => (
            <div
              key={m.label}
              className="bg-[var(--background)] px-4 py-5 flex flex-col gap-1.5"
            >
              <span
                className="font-mono text-2xl font-bold text-[var(--color-accent)] tabular-nums leading-none"
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                <AnimatedMetric value={m.value} />
              </span>
              <span className="text-[0.78rem] font-medium text-[var(--color-text-primary)] leading-snug">
                {m.label}
              </span>
              <span className="text-[0.65rem] font-mono text-[var(--color-text-muted)] leading-none tracking-wide">
                {m.note}
              </span>
            </div>
          ))}
        </div>
        {/* Honest footnote — 不让指标浮空 */}
        <p className="mt-3 text-[10px] font-mono text-[var(--color-text-muted)] opacity-60 leading-relaxed">
          * 设计指标，非 SLA 承诺。计费精度：数据库 DECIMAL(20,4) 约束，每笔账单可独立审计。
        </p>
      </motion.div>

      {/* Provider grid — grouped by region, hover reveals model list */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15 }}
        className="mx-auto max-w-4xl px-6 pt-8 pb-12 space-y-6"
      >
        {providerGroups.map((group) => (
          <div key={group.label} className="flex items-start gap-5">
            {/* Group label — vertical, small */}
            <div className="flex-shrink-0 w-8 pt-0.5">
              <span
                className="text-[9px] font-mono text-[var(--color-text-muted)] tracking-widest opacity-60 uppercase"
                style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
              >
                {group.label}
              </span>
            </div>
            {/* Provider chips */}
            <div className="flex flex-wrap gap-x-6 gap-y-4">
              {group.providers.map((p) => (
                <div
                  key={p.name}
                  className="group relative flex flex-col items-start"
                >
                  <span className="text-[0.9rem] font-medium text-[var(--color-text-muted)] whitespace-nowrap opacity-60 group-hover:opacity-100 group-hover:text-[var(--color-text-primary)] transition-all duration-200">
                    {p.name}
                  </span>
                  {/* Model detail — appears on hover below the name */}
                  <span className="text-[0.6rem] font-mono text-[var(--color-text-muted)] whitespace-nowrap opacity-0 group-hover:opacity-70 transition-opacity duration-200 tracking-wide pointer-events-none leading-tight mt-0.5">
                    {p.meta}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Trailing count note */}
        <p className="text-[10px] font-mono text-[var(--color-text-muted)] opacity-50 pl-13">
          30+ 供应商持续接入中 — 列表不代表全量
        </p>
      </motion.div>

      <div className="section-divider" />
    </section>
  );
}
