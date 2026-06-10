"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, animate } from "framer-motion";

// Provider name + the specific models served, revealed on hover.
// Static list — 事实自己说话，不需要无限滚动假装热闹。
const providers = [
  { name: "OpenAI", meta: "GPT-5 · GPT-4o · o3" },
  { name: "Anthropic", meta: "Claude Opus 4.6 · Sonnet 4.5" },
  { name: "Google Gemini", meta: "Gemini 2.5 Pro · Flash" },
  { name: "DeepSeek", meta: "V3 · R1" },
  { name: "Mistral", meta: "Large · Small 3" },
  { name: "Meta Llama", meta: "4 · 3.3 · 3.1" },
  { name: "Qwen", meta: "Qwen3 · QwQ" },
  { name: "Zhipu GLM", meta: "GLM-4.6 · ChatGLM" },
  { name: "Moonshot", meta: "Kimi k2" },
  { name: "Baichuan", meta: "Baichuan4-Turbo" },
  { name: "Yi", meta: "Yi-Large · Yi-Vision" },
  { name: "MiniMax", meta: "abab7 · Speech-02" },
];

// Animates a numeric string on scroll entry.
// Handles prefix/suffix automatically ("38" → 0..38, "<80ms" → <0ms..<80ms, "99.99%" → 99.90%..99.99%).
function AnimatedMetric({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);
  const inView = useInView(ref, { once: true, amount: 0.8 });
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;

    // Parse: prefix (non-digit), numeric body, suffix
    const match = value.match(/^([^0-9]*)([0-9]+(?:\.[0-9]+)?)(.*)$/);
    if (!match) return;

    const [, prefix, numStr, suffix] = match;
    const target = parseFloat(numStr);
    const decimals = (numStr.split(".")[1] ?? "").length;
    // Start from 0 for integers, from 90% for decimals (avoids long 0→99.99 crawl)
    const startFrom = decimals > 0 ? Math.max(target * 0.9, 0) : 0;

    const controls = animate(startFrom, target, {
      duration: 1.5,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(v) {
        setDisplay(prefix + v.toFixed(decimals) + suffix);
      },
      onComplete() {
        setDisplay(value); // snap to exact string
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

      {/* Platform key metrics — monospace terminal aesthetic */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="pt-10 pb-2 text-center"
      >
        <p className="eyebrow mb-5">平台实时状态</p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 pb-10 text-xs font-mono"
      >
        {[
          { value: "38", unit: "个模型" },
          { value: "<80ms", unit: "p50 延迟" },
          { value: "99.99%", unit: "SLA 可用性" },
          { value: "¥0.0001", unit: "计费精度" },
          { value: "5", unit: "分钟接入" },
        ].map((s, i) => (
          <div key={s.unit} className="flex items-center gap-3">
            {i > 0 && <span className="w-px h-3 bg-[var(--color-border)] hidden sm:block" />}
            <span>
              <span className="text-[var(--color-accent)] font-bold">
                <AnimatedMetric value={s.value} />
              </span>
              {" "}
              <span className="text-[var(--color-text-muted)]">{s.unit}</span>
            </span>
          </div>
        ))}
      </motion.div>

      {/* Provider list — static flex-wrap, hover reveals the models served */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15 }}
        className="mx-auto max-w-4xl px-6 pb-12 flex flex-wrap items-start justify-center gap-x-8 gap-y-6"
      >
        {providers.map((p) => (
          <div
            key={p.name}
            className="group relative flex flex-col items-center"
          >
            <span className="text-[0.95rem] font-medium text-[var(--color-text-muted)] whitespace-nowrap opacity-70 group-hover:opacity-100 group-hover:text-[var(--color-text-primary)] transition-all duration-300">
              {p.name}
            </span>
            {/* Meta reveal — the name speaks, then the detail appears */}
            <span className="absolute top-full mt-1 text-[0.65rem] font-mono text-[var(--color-text-muted)] whitespace-nowrap opacity-0 group-hover:opacity-70 transition-opacity duration-300 tracking-wide pointer-events-none">
              {p.meta}
            </span>
          </div>
        ))}
      </motion.div>

      <div className="section-divider" />
    </section>
  );
}
