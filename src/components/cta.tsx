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
  "30+ 模型，一个 API Key",
  "实时用量仪表盘",
];

const enterpriseFeatures = [
  "99.9% SLA 保障",
  "专属私有化部署方案",
  "7×24 技术支持",
  "定制合同与发票",
];

const trustItems = [
  "99.9% SLA",
  "DECIMAL(20,4) 计费精度",
  "ICP 备案合规",
  "OpenAI 兼容协议",
  "按用量付费",
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
          <p className="eyebrow mb-4">开始使用</p>
          <h2 className="headline-tight text-3xl md:text-4xl font-bold text-[var(--color-text-primary)]">
            今晚接入，明天上线
          </h2>
          <p className="mt-4 text-[var(--color-text-secondary)] max-w-lg mx-auto">
            你的第一次 API 调用，距现在不超过五分钟。
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">

          {/* Developer panel — primary CTA, accent orange */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="h-full"
          >
            <div
              className="relative rounded-2xl overflow-hidden h-full border"
              style={{ borderColor: "rgba(255, 93, 31, 0.40)" }}
            >
              <div className="absolute inset-0 bg-[var(--color-surface)]" />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,93,31,0.07) 0%, transparent 60%)",
                }}
              />
              <div className="absolute inset-0 grid-bg opacity-25" />

              <div className="relative p-8 flex flex-col h-full">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
                  style={{
                    background: "rgba(255, 93, 31, 0.10)",
                    border: "1px solid rgba(255, 93, 31, 0.22)",
                  }}
                >
                  <CodeBracketIcon className="w-5 h-5 text-[var(--color-accent)]" />
                </div>

                <div className="pill w-fit mb-4 text-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-success)] animate-pulse" />
                  免费开始
                </div>

                <h3 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">
                  开发者
                </h3>
                <p className="text-sm text-[var(--color-text-secondary)] mb-6 leading-relaxed">
                  一行代码接入全球主流模型。免费额度够你把 MVP 跑起来。
                </p>

                <ul className="space-y-2.5 mb-8">
                  {devFeatures.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2.5 text-sm text-[var(--color-text-secondary)]"
                    >
                      <span
                        className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                        style={{
                          background: "rgba(34, 197, 94, 0.12)",
                          border: "1px solid rgba(34, 197, 94, 0.28)",
                        }}
                      >
                        <CheckIcon className="w-2.5 h-2.5 text-[var(--color-success)]" />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto">
                  <a
                    href="https://hub.lurus.cn"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group btn-primary w-full"
                  >
                    免费注册
                    <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </a>
                  <p className="mt-3 text-center text-xs text-[var(--color-text-muted)]">
                    免费额度 · 无需信用卡 · 随时取消
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Enterprise panel — secondary, subdued */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="h-full"
          >
            <div className="relative rounded-2xl overflow-hidden h-full border border-[var(--color-border)]">
              <div className="absolute inset-0 bg-[var(--color-surface)]" />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(45,74,138,0.05) 0%, transparent 60%)",
                }}
              />
              <div className="absolute inset-0 grid-bg opacity-15" />

              <div className="relative p-8 flex flex-col h-full">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
                  style={{
                    background: "rgba(45, 74, 138, 0.10)",
                    border: "1px solid rgba(45, 74, 138, 0.20)",
                  }}
                >
                  <BuildingOffice2Icon
                    className="w-5 h-5"
                    style={{ color: "var(--accent-2)" }}
                  />
                </div>

                <div
                  className="pill w-fit mb-4 text-xs"
                  style={{ borderColor: "rgba(45, 74, 138, 0.22)" }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: "var(--accent-2)" }}
                  />
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
                    <li
                      key={f}
                      className="flex items-center gap-2.5 text-sm text-[var(--color-text-secondary)]"
                    >
                      <span
                        className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                        style={{
                          background: "rgba(45, 74, 138, 0.10)",
                          border: "1px solid rgba(45, 74, 138, 0.22)",
                        }}
                      >
                        <CheckIcon
                          className="w-2.5 h-2.5"
                          style={{ color: "var(--accent-2)" }}
                        />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto">
                  <a
                    href="mailto:sales@lurus.cn?subject=Lurus%20%E4%BC%81%E4%B8%9A%E6%96%B9%E6%A1%88%E5%92%A8%E8%AF%A2"
                    className="group btn-secondary w-full"
                  >
                    联系销售
                    <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </a>
                  <p className="mt-3 text-center text-xs text-[var(--color-text-muted)]">
                    通常 24h 内回复 · 可预约 Demo
                  </p>
                </div>
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
          className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3"
        >
          {trustItems.map((item, i) => (
            <span
              key={item}
              className="flex items-center gap-2 text-xs text-[var(--color-text-muted)]"
            >
              {i > 0 && (
                <span className="w-px h-3 bg-[var(--color-border)]" aria-hidden="true" />
              )}
              <span
                className="font-mono text-[var(--color-success)]"
                aria-hidden="true"
              >
                ✓
              </span>
              {item}
            </span>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
