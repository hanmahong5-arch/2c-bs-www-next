"use client";

import { motion } from "framer-motion";
import {
  ShieldCheckIcon,
  DocumentMagnifyingGlassIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";
import { fadeInUp, staggerChild } from "@/lib/motion";
import { METRICS } from "./metrics";

/* ── 首屏数字条:只放可靠性数字,每个数字带口径+日期 ── */

const stats = [
  {
    value: `${METRICS.rto.p50Ms}ms`,
    label: "崩溃恢复 RTO(p50)",
    note: `kill -9 → 重新可服务,${METRICS.rto.trials} 次实测;p90 ${METRICS.rto.p90Ms}ms · 最差 ${METRICS.rto.maxMs}ms(${METRICS.rto.date})`,
    accent: true,
  },
  {
    value: "0",
    label: "崩溃后重复的 LLM 调用",
    note: `${METRICS.zeroDuplicate.liveRuns} 次真实模型运行,网络边界独立抓包恰好 ${METRICS.zeroDuplicate.upstreamCalls} 次上游调用;kill -9 续跑演练 ${METRICS.zeroDuplicate.crashTrials} 零重发(${METRICS.zeroDuplicate.date})`,
    accent: true,
  },
  {
    value: `${METRICS.queue.fifoTps}/s`,
    label: "队列引擎吞吐",
    note: `${METRICS.queue.payload} 载荷 · FIFO · 引擎级实测(${METRICS.queue.date})`,
    accent: false,
  },
];

export function EvidenceStats() {
  return (
    <section className="py-16 border-t border-[var(--color-border)]">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid md:grid-cols-3 gap-5">
          {stats.map((s, i) => (
            <motion.div key={s.label} {...staggerChild(i)} className="card p-6">
              <div
                className="text-4xl font-bold font-mono tracking-tight"
                style={{
                  color: s.accent ? "var(--accent)" : "var(--color-text-primary)",
                }}
              >
                {s.value}
              </div>
              <div className="mt-2 text-sm font-medium text-[var(--color-text-primary)]">
                {s.label}
              </div>
              <p className="mt-2 text-xs text-[var(--color-text-muted)] leading-relaxed">
                {s.note}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          {...fadeInUp}
          className="mt-6 text-center text-xs text-[var(--color-text-muted)]"
        >
          以上均为单机开发级硬件实测,非调优服务器数字。测试脚本、原始日志与抓包记录随
          pilot 证据包交付,支持在你的环境复现。
        </motion.p>
      </div>
    </section>
  );
}

/* ── 证据 / 合规节 ── */

// 终端窗口内容为流程示意(命令为真实 CLI 子命令;逐行输出经摘要改写,
// 非逐字符实录 — 窗口 badge 已如实标注)。
const EVIDENCE_FLOW = [
  { text: "$ kova evidence export", kind: "cmd" },
  { text: "  ✓ manifest · decisions · recovery · hitl · skills", kind: "ok" },
  { text: "  ✓ SHA256SUMS 已写入,SM3-HMAC 清单已嵌入", kind: "ok" },
  { text: "", kind: "blank" },
  { text: "# 把证据包交给审计方 —— 以下在离线机器上进行", kind: "comment" },
  { text: "", kind: "blank" },
  { text: "$ kova evidence verify --bundle evidence-bundle.json", kind: "cmd" },
  { text: "  PASS · authenticated: true", kind: "pass" },
] as const;

const complianceRows = [
  {
    framework: "EU AI Act",
    scope: "Art. 12 事件自动记录 · Art. 19 日志留存",
  },
  {
    framework: "《生成式人工智能服务管理暂行办法》",
    scope: "防篡改的日志存储、留存与调取(中国)",
  },
  {
    framework: "AIUC-1",
    scope: "Accountability——可重建的决策与人工审批轨迹",
  },
  {
    framework: "NIST AI RMF",
    scope: "来源可溯(provenance)与委派链问责",
  },
  {
    framework: "ISO/IEC 42001",
    scope: "管理体系的技术证据输入(支撑,不能单独满足)",
  },
];

export function EvidenceCompliance() {
  return (
    <section id="evidence" className="py-24 border-t border-[var(--color-border)] scroll-mt-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12">
          <p className="eyebrow text-[var(--accent)] mb-3">Evidence Pack</p>
          <h2 className="text-3xl font-bold text-[var(--color-text-primary)]">
            一条命令,导出审计方能离线验证的证据包
          </h2>
          <p className="mt-4 text-[var(--color-text-secondary)] max-w-2xl leading-relaxed">
            执行全程写入防篡改 WAL。导出后,验证在审计方自己的机器上离线完成——
            不需要访问你的服务,不需要任何密钥。
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* 左:流程终端 */}
          <motion.div {...fadeInUp}>
            <div className="code-block p-5 relative overflow-hidden shadow-[var(--shadow-window)]">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
                <div className="flex gap-1.5 shrink-0">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                </div>
                <span className="text-xs text-[#8A8474] ml-2 font-mono">
                  evidence-flow
                </span>
                <span className="ml-auto text-[10px] font-mono px-2 py-0.5 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/25">
                  证据流程 · 示意
                </span>
              </div>

              <pre className="text-[0.8125rem] leading-[1.9] overflow-x-auto">
                <code>
                  {EVIDENCE_FLOW.map((line, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -6 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 + i * 0.08, duration: 0.25 }}
                      style={{
                        color:
                          line.kind === "cmd"
                            ? "#CBC4B4"
                            : line.kind === "pass"
                            ? "#A6CE8A"
                            : line.kind === "comment"
                            ? "#7C7565"
                            : "#8A8474",
                        fontStyle: line.kind === "comment" ? "italic" : "normal",
                        fontWeight: line.kind === "pass" ? 600 : 400,
                      }}
                    >
                      {line.text || " "}
                    </motion.div>
                  ))}
                </code>
              </pre>

              <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-[var(--accent)] opacity-[0.07] blur-[50px] pointer-events-none" />
            </div>

            <div className="card p-5 mt-5 space-y-3">
              {[
                {
                  icon: EyeSlashIcon,
                  title: "完全离线验证",
                  desc: "审计方不访问你的服务、不持有你的密钥,在自己的机器上核验证据包完整性与嵌入的认证清单。",
                },
                {
                  icon: ShieldCheckIcon,
                  title: "双层防篡改",
                  desc: "WAL 逐条 HMAC(支持国密 SM3,GB/T 32905-2016)+ 证据包 SHA256SUMS。改动一个字节,校验当场失败。",
                },
                {
                  icon: DocumentMagnifyingGlassIcon,
                  title: "tamper-evident,如实标注",
                  desc: "我们承诺的是「篡改可被发现」,不是「不可篡改」——密钥管理仍是部署方的责任,这个边界写进了客户文档。",
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="flex items-start gap-3">
                    <Icon className="w-5 h-5 shrink-0 text-[var(--accent)] mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-[var(--color-text-primary)]">
                        {item.title}
                      </p>
                      <p className="mt-1 text-xs text-[var(--color-text-muted)] leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* 右:合规映射 */}
          <motion.div {...fadeInUp} transition={{ delay: 0.15, duration: 0.5 }}>
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
                证据包 × 合规义务映射
              </h3>
              <p className="mt-2 text-sm text-[var(--color-text-muted)] leading-relaxed">
                证据包的每个字段与下列框架的记录/留痕义务逐字段对照;完整对照表随
                pilot 交付。
              </p>

              <div className="mt-5 divide-y divide-[var(--color-border)]">
                {complianceRows.map((row) => (
                  <div key={row.framework} className="py-3 flex items-start gap-3">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 bg-[var(--accent)]" />
                    <div>
                      <p className="text-sm font-medium text-[var(--color-text-primary)]">
                        {row.framework}
                      </p>
                      <p className="mt-0.5 text-xs text-[var(--color-text-muted)]">
                        {row.scope}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-5 text-xs text-[var(--color-text-muted)] leading-relaxed border-t border-[var(--color-border)] pt-4">
                重要:能出证据 ≠ 已合规。你的系统是否落入上述框架的适用范围、是否满足
                义务,是你和你的审计方的法律判断——Kova 提供的是可独立核验的技术材料,
                不是合规认证,也不是法律意见。
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ── 诚实边界节 ── */

const boundaries = [
  {
    title: "单机,不是分布式集群",
    desc: "这是刻意取舍:换来的是单二进制嵌入、零集群运维、数据不出内网。如果你需要多节点高可用编排,Kova 不是合适的选择——我们不假装是。",
  },
  {
    title: "tamper-evident,不是 tamper-proof",
    desc: "HMAC 校验保证篡改会被发现(校验失败即响亮拒读),不等于无法篡改。持有密钥方仍可伪造记录,密钥管理是部署方的责任。",
  },
  {
    title: "能出证据,不等于已合规",
    desc: "合规结论由你与你的审计方作出。Kova 交付的是审计方可独立核验的执行记录与对照材料,不替你作合规判定。",
  },
];

export function Boundaries() {
  return (
    <section className="py-24 border-t border-[var(--color-border)]">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-12">
          <p className="eyebrow text-[var(--accent)] mb-3">诚实边界</p>
          <h2 className="text-3xl font-bold text-[var(--color-text-primary)]">
            三件我们不说的话
          </h2>
          <p className="mt-4 text-[var(--color-text-secondary)] max-w-xl mx-auto">
            卖可靠性的人,先要对自己的边界诚实。
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {boundaries.map((b, i) => (
            <motion.div key={b.title} {...staggerChild(i)} className="card p-6">
              <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
                {b.title}
              </h3>
              <p className="mt-3 text-sm text-[var(--color-text-muted)] leading-relaxed">
                {b.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
