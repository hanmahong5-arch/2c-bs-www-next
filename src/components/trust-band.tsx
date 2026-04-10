"use client";

import { motion } from "framer-motion";

const models = [
  "OpenAI",
  "Anthropic",
  "Google Gemini",
  "DeepSeek",
  "Mistral",
  "Meta Llama",
  "Qwen",
  "Zhipu GLM",
  "Moonshot",
  "Baichuan",
  "Yi",
  "MiniMax",
];

export function TrustBand() {
  return (
    <section className="py-12 relative overflow-hidden">
      <div className="section-divider" />
      <div className="py-12">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-[var(--color-text-muted)] mb-8 tracking-wide uppercase"
        >
          统一接入 30+ AI 模型供应商
        </motion.p>

        {/* Infinite scroll logos */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[var(--background)] to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[var(--background)] to-transparent z-10" />

          <div className="flex overflow-hidden">
            <div className="flex shrink-0 scroll-x">
              {[...models, ...models].map((name, i) => (
                <div
                  key={`${name}-${i}`}
                  className="flex items-center justify-center mx-8 shrink-0"
                >
                  <span className="text-sm font-medium text-[var(--color-text-muted)] whitespace-nowrap opacity-60 hover:opacity-100 transition-opacity">
                    {name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="section-divider" />
    </section>
  );
}
