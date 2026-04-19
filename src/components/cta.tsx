"use client";

import { motion } from "framer-motion";
import {
  CodeBracketIcon,
  BuildingOffice2Icon,
  CheckIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

const devFeatures = [
  "OpenAI 兼容接口，5 分钟接入",
  "免费额度 $5 等值，无需信用卡",
  "38 个模型，一个 API Key",
  "实时用量仪表盘",
];

const enterpriseFeatures = [
  "99.99% SLA 保障",
  "专属私有化部署方案",
  "7×24 技术支持",
  "定制合同与发票",
];

export function CTA() {
  return (
    <section className="py-24">
      <div className="section-divider mb-24" />
      <div className="mx-auto max-w-5xl px-6">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="headline-tight text-3xl md:text-4xl font-bold text-shimmer">
            今晚接入，明天上线
          </h2>
          <p className="mt-4 text-[var(--color-text-secondary)] max-w-lg mx-auto">
            一个 API Key，38 个模型，p50 延迟 &lt;80ms。把时间花在你的产品上，基础设施交给 Lurus。
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">

          {/* Developer panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className="relative rounded-2xl overflow-hidden border-beam h-full">
              <div className="absolute inset-0 bg-[var(--color-surface)]" />
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-ochre)]/8 via-transparent to-transparent" />
              <div className="absolute inset-0 grid-bg opacity-30" />
              <div className="absolute -top-16 -left-16 w-48 h-48 rounded-full bg-[var(--color-ochre)] opacity-[0.06] blur-[60px]" />

              <div className="relative p-8">
                <div className="w-10 h-10 rounded-xl bg-[var(--color-ochre)]/10 border border-[var(--color-ochre)]/20 flex items-center justify-center mb-5">
                  <CodeBracketIcon className="w-5 h-5 text-[var(--color-ochre)]" />
                </div>

                <div className="pill w-fit mb-4 text-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-success)] animate-pulse" />
                  免费开始
                </div>

                <h3 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">
                  开发者
                </h3>
                <p className="text-sm text-[var(--color-text-secondary)] mb-6 leading-relaxed">
                  一行代码接入全球最强模型。免费额度够你把 MVP 跑起来。
                </p>

                <ul className="space-y-2.5 mb-8">
                  {devFeatures.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-[var(--color-text-secondary)]">
                      <span className="w-4 h-4 rounded-full bg-[var(--color-success)]/15 border border-[var(--color-success)]/30 flex items-center justify-center shrink-0">
                        <CheckIcon className="w-2.5 h-2.5 text-[var(--color-success)]" />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  href="https://api.lurus.cn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-xl bg-gradient-gold text-black font-semibold hover:shadow-[0_0_30px_rgba(200,162,78,0.3)] transition-all duration-300"
                >
                  免费注册
                  <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </a>
                <p className="mt-3 text-center text-xs text-[var(--color-text-muted)]">
                  免费额度 · 无需信用卡 · 随时取消
                </p>
              </div>
            </div>
          </motion.div>

          {/* Enterprise panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="relative rounded-2xl overflow-hidden h-full border border-[var(--color-border)]">
              <div className="absolute inset-0 bg-[var(--color-surface)]" />
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)]/5 via-transparent to-transparent" />
              <div className="absolute inset-0 grid-bg opacity-20" />
              <div className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full bg-[var(--color-accent)] opacity-[0.04] blur-[60px]" />

              <div className="relative p-8">
                <div className="w-10 h-10 rounded-xl bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 flex items-center justify-center mb-5">
                  <BuildingOffice2Icon className="w-5 h-5 text-[var(--color-accent)]" />
                </div>

                <div className="pill w-fit mb-4 text-xs border-[var(--color-accent)]/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />
                  企业定制
                </div>

                <h3 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">
                  企业 / 团队
                </h3>
                <p className="text-sm text-[var(--color-text-secondary)] mb-6 leading-relaxed">
                  专属架构方案、私有化部署、定制 SLA——让 AI 基础设施和你的业务一起规模化。
                </p>

                <ul className="space-y-2.5 mb-8">
                  {enterpriseFeatures.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-[var(--color-text-secondary)]">
                      <span className="w-4 h-4 rounded-full bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/25 flex items-center justify-center shrink-0">
                        <CheckIcon className="w-2.5 h-2.5 text-[var(--color-accent)]" />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  href="mailto:sales@lurus.cn?subject=Lurus%20%E4%BC%81%E4%B8%9A%E6%96%B9%E6%A1%88%E5%92%A8%E8%AF%A2"
                  className="group flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-xl border border-[var(--color-accent)]/40 text-[var(--color-text-primary)] font-semibold hover:border-[var(--color-accent)]/70 hover:bg-[var(--color-accent)]/5 transition-all duration-300"
                >
                  联系销售
                  <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </a>
                <p className="mt-3 text-center text-xs text-[var(--color-text-muted)]">
                  通常 24h 内回复 · 可预约 Demo
                </p>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Bottom trust strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-[var(--color-text-muted)]"
        >
          {[
            "99.99% SLA",
            "金融级数据安全",
            "ICP 备案合规",
            "OpenAI 兼容协议",
            "按用量付费",
          ].map((item, i) => (
            <span key={item} className="flex items-center gap-2">
              {i > 0 && <span className="w-px h-3 bg-[var(--color-border)]" />}
              <span className="text-[var(--color-success)] font-mono">›</span>
              {item}
            </span>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
