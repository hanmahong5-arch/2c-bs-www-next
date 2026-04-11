"use client";

import { motion } from "framer-motion";
export function CTA() {
  return (
    <section className="py-24">
      <div className="section-divider mb-24" />
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-2xl overflow-hidden border-beam"
        >
          {/* Background layers */}
          <div className="absolute inset-0 bg-[var(--color-surface)]" />
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-ochre)]/8 via-transparent to-[var(--color-ochre)]/3" />
          <div className="absolute inset-0 grid-bg opacity-30" />
          <div className="absolute inset-0 border border-[var(--color-ochre)]/15 rounded-2xl" />

          {/* Glow orbs */}
          <div className="absolute -top-20 -left-20 w-60 h-60 rounded-full bg-[var(--color-ochre)] opacity-[0.06] blur-[80px]" />
          <div className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full bg-[var(--color-ochre)] opacity-[0.04] blur-[80px]" />

          <div className="relative px-8 py-16 md:px-16 md:py-20 text-center">
            <div className="pill mx-auto mb-6 w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-success)] animate-pulse" />
              5 分钟接入
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-shimmer">
              今晚接入，明天上线
            </h2>
            <p className="mt-4 text-lg text-[var(--color-text-secondary)] max-w-xl mx-auto">
              三十个模型，一个账单。别再为基础设施写第一行代码——把时间花在你的产品上。
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://api.lurus.cn"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 rounded-xl bg-gradient-gold text-black font-semibold hover:shadow-[0_0_30px_rgba(200,162,78,0.3)] transition-all duration-300"
              >
                免费试用
              </a>
              <a
                href="mailto:sales@lurus.cn"
                className="px-8 py-3.5 rounded-xl border border-[var(--color-border)] text-[var(--color-text-primary)] font-medium hover:border-[var(--color-ochre)]/50 transition-colors"
              >
                联系销售
              </a>
            </div>

            <p className="mt-6 text-xs text-[var(--color-text-muted)]">
              免费版包含每月 $5 等值额度 · 无需信用卡 · 随时取消
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
