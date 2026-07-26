"use client";

import { motion } from "framer-motion";
import {
  RocketLaunchIcon,
  BeakerIcon,
  CheckIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { track } from "@/lib/track";
import { METRICS } from "./metrics";

const PILOT_MAILTO =
  "mailto:sales@lurus.cn?subject=Kova%20Design-Partner%20Pilot%20%E7%94%B3%E8%AF%B7";
const DEMO_MAILTO =
  "mailto:sales@lurus.cn?subject=Kova%20%E7%8E%B0%E5%9C%BA%E6%BC%94%E7%A4%BA%E9%A2%84%E7%BA%A6";

const pilotSteps = [
  "W1 接入:选你的一条真实 agent 流程(声明式 spec 或 REST 驱动)",
  "W2–3 真负载:跑真实任务 + 崩溃演练,当着你的面 kill -9",
  "W4 验收出证:导出证据包,由你的团队离线 verify",
  "结项交付:实测报告 + 合规逐字段对照表,可直接给你的审计方",
];

const acceptanceCriteria = [
  "现场 kill -9 后 1 秒内恢复服务,已完成步骤零重跑(网络抓包 + WAL 双重印证)",
  "证据包由你的团队在离线机器上独立 verify 通过",
  "全程数据不出你的服务器",
];

const trustItems = [
  "离线可验证",
  "支持国密 SM3-HMAC",
  "WAL v1 字节兼容承诺",
  "单二进制自托管",
  "tamper-evident · 如实标注",
];

export function PilotCTA() {
  return (
    <section id="pilot" className="py-24 scroll-mt-20">
      <div className="sketch-divider mb-24" />
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="eyebrow mb-4">Design-Partner Pilot</p>
          <h2 className="headline-tight text-3xl md:text-4xl font-bold text-[var(--color-text-primary)]">
            2–4 周,把证据跑在<span className="sketch-underline">你自己的流程</span>上
          </h2>
          <p className="mt-4 text-[var(--color-text-secondary)] max-w-lg mx-auto">
            Kova 尚在 GA 前——正因为如此,design-partner 的真实 workflow
            会直接影响 roadmap。
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          {/* Pilot panel — primary, accent orange */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="h-full"
          >
            <div
              className="relative rounded-2xl overflow-hidden h-full border sketch-shadow-accent"
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
                  <RocketLaunchIcon className="w-5 h-5 text-[var(--color-accent)]" />
                </div>

                <div className="pill w-fit mb-4 text-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-success)] animate-pulse" />
                  名额有限
                </div>

                <h3 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">
                  试点怎么跑
                </h3>
                <p className="text-sm text-[var(--color-text-secondary)] mb-6 leading-relaxed">
                  把你已有的一条 agent 流程搬上 durable 底座,跑真负载、演练崩溃、
                  出可核验的证据——不是替你做 agent,是让你的 agent 崩得起。
                </p>

                <ul className="space-y-2.5 mb-8">
                  {pilotSteps.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2.5 text-sm text-[var(--color-text-secondary)]"
                    >
                      <span
                        className="mt-0.5 w-4 h-4 rounded-full flex items-center justify-center shrink-0"
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
                    href={PILOT_MAILTO}
                    onClick={() => track("cta_click", { id: "cta_kova_pilot" })}
                    className="group btn-primary w-full"
                  >
                    申请 Pilot
                    <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </a>
                  <p className="mt-3 text-center text-xs text-[var(--color-text-muted)]">
                    小额付费 · 终价按接入复杂度首次通话确认 · 不满意可终止
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Acceptance panel — secondary */}
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
                  <BeakerIcon
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
                  当场可核
                </div>

                <h3 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">
                  验收判据
                </h3>
                <p className="text-sm text-[var(--color-text-secondary)] mb-6 leading-relaxed">
                  三条判据全部当场核验,不看 PPT,不听口头保证。
                </p>

                <ul className="space-y-2.5 mb-6">
                  {acceptanceCriteria.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2.5 text-sm text-[var(--color-text-secondary)]"
                    >
                      <span
                        className="mt-0.5 w-4 h-4 rounded-full flex items-center justify-center shrink-0"
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

                <p className="text-xs text-[var(--color-text-muted)] leading-relaxed mb-6">
                  说明:快速演示环境使用确定性 stub 模型(演示的是持久化机制,
                  不是模型质量),一套崩溃自愈流程热跑约 {METRICS.demo.hotRunSecs}{" "}
                  秒;真实 LLM 下的零重发另有独立抓包证据,随 pilot 交付。
                </p>

                <div className="mt-auto">
                  <a
                    href={DEMO_MAILTO}
                    onClick={() => track("cta_click", { id: "cta_kova_demo" })}
                    className="group btn-secondary w-full"
                  >
                    预约 15 分钟现场演示
                    <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </a>
                  <p className="mt-3 text-center text-xs text-[var(--color-text-muted)]">
                    当着你的面 kill -9 · 通常 24h 内回复
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
