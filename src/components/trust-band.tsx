"use client";

import { motion } from "framer-motion";

// Logo with hover-revealed precision detail — Stripe's "real logo + real data" pattern.
// Label is the provider; meta appears on hover with the specific models served.
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

export function TrustBand() {
  return (
    <section className="py-16 relative overflow-hidden">
      <div className="section-divider" />

      {/* Platform key metrics — monospace terminal aesthetic */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="pt-10 pb-2 text-center"
      >
        <p className="eyebrow mb-5">实时平台指标</p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 pb-6 text-xs font-mono"
      >
        {[
          { value: "38", unit: "个模型" },
          { value: "<80ms", unit: "p50 延迟" },
          { value: "99.99%", unit: "SLA 可用性" },
          { value: "¥0.0001", unit: "计费精度" },
          { value: "5 min", unit: "接入时间" },
        ].map((s, i) => (
          <div key={s.unit} className="flex items-center gap-3">
            {i > 0 && <span className="w-px h-3 bg-[var(--color-border)] hidden sm:block" />}
            <span>
              <span className="text-[var(--color-ochre)] font-bold">{s.value}</span>
              {" "}
              <span className="text-[var(--color-text-muted)]">{s.unit}</span>
            </span>
          </div>
        ))}
      </motion.div>

      {/* Provider marquee — confidence doesn't announce itself */}
      <div className="pb-10 relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[var(--background)] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[var(--background)] to-transparent z-10" />

        <div className="flex overflow-hidden">
          <div className="flex shrink-0 scroll-x items-center">
            {[...providers, ...providers].map((p, i) => (
              <motion.div
                key={`${p.name}-${i}`}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className="group relative flex flex-col items-center justify-center mx-10 shrink-0 min-w-[8rem]"
              >
                <span className="text-[0.95rem] font-medium text-[var(--color-text-muted)] whitespace-nowrap opacity-55 group-hover:opacity-100 group-hover:text-[var(--color-ochre)] transition-all duration-300">
                  {p.name}
                </span>
                {/* Meta reveal — the logo speaks, then the detail appears */}
                <span className="absolute top-full mt-1 text-[0.65rem] font-mono text-[var(--color-text-muted)] whitespace-nowrap opacity-0 group-hover:opacity-60 transition-opacity duration-300 tracking-wide">
                  {p.meta}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="section-divider" />
    </section>
  );
}
