"use client";

import { motion } from "framer-motion";
import {
  CircleStackIcon,
  ArrowPathRoundedSquareIcon,
  ShieldCheckIcon,
  ClipboardDocumentCheckIcon,
  CubeIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import type { ComponentType, SVGProps } from "react";
import { METRICS } from "./metrics";

type HeroIcon = ComponentType<SVGProps<SVGSVGElement>>;

/* ── 问题节:崩溃重跑的三重代价 ── */

const costs = [
  {
    title: "重复烧推理费",
    desc: "从头重跑,意味着已经付过钱的每一次 LLM 调用再付一遍。流程越长、模型越贵,崩一次的账单越难看。",
  },
  {
    title: "副作用重放",
    desc: "邮件重发、工单重开、下游接口重打——重跑不是无害的重试,是新的事故。",
  },
  {
    title: "审计断链",
    desc: "崩溃点前后的执行记录接不上。客户、内控或审计方问起时,只剩日志碎片和口头解释。",
  },
];

function ProblemSection() {
  return (
    <section className="py-24 border-t border-[var(--color-border)]">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-12">
          <p className="eyebrow text-[var(--lt-accent)] mb-3">为什么值得较真</p>
          <h2 className="text-3xl font-bold text-[var(--color-text-primary)]">
            Agent 崩溃重跑,烧的不只是钱
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {costs.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="card p-6"
            >
              <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
                {c.title}
              </h3>
              <p className="mt-3 text-sm text-[var(--color-text-muted)] leading-relaxed">
                {c.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 崩溃自愈节 ── */

// WAL 崩溃恢复演示日志行 — 所有内容均为示意,窗口 badge 已标注
const WAL_LOG_LINES = [
  // 正常 checkpoint 阶段
  {
    ts: "09:14:01.003",
    level: "INFO ",
    msg: "checkpoint written",
    detail: "seq=1041  step=fetch_context",
    kind: "ok",
  },
  {
    ts: "09:14:01.187",
    level: "INFO ",
    msg: "checkpoint written",
    detail: "seq=1042  step=tool_call:search",
    kind: "ok",
  },
  {
    ts: "09:14:01.394",
    level: "INFO ",
    msg: "checkpoint written",
    detail: "seq=1043  step=tool_call:summarize",
    kind: "ok",
  },
  // 崩溃事件
  {
    ts: "09:14:01.511",
    level: "ERROR",
    msg: "process signal: SIGKILL",
    detail: "pid=38821",
    kind: "crash",
  },
  // 恢复阶段
  {
    ts: "09:14:03.002",
    level: "INFO ",
    msg: "WAL replay started",
    detail: "last_safe_seq=1043",
    kind: "recover",
  },
  {
    ts: "09:14:03.089",
    level: "INFO ",
    msg: "restored to checkpoint",
    detail: "step=tool_call:summarize  replay_ms=87",
    kind: "recover",
  },
  {
    ts: "09:14:03.091",
    level: "INFO ",
    msg: "execution resumed",
    detail: "next_step=write_response",
    kind: "ok",
  },
];

function WalLogDemo() {
  return (
    <div className="code-block p-5 relative overflow-hidden shadow-[var(--shadow-window)]">
      {/* 橙色边缘光晕 */}
      <div className="absolute inset-0 rounded-xl opacity-30 pointer-events-none">
        <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-br from-[var(--lt-accent)]/20 via-transparent to-[var(--lt-accent)]/8" />
      </div>

      {/* 窗口 chrome */}
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
        <div className="flex gap-1.5 shrink-0">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <span className="text-xs text-[#8A8474] ml-2 font-mono">kova-runtime.log</span>
        <span className="ml-auto text-[10px] font-mono px-2 py-0.5 rounded-full bg-[var(--lt-accent)]/10 text-[var(--lt-accent)] border border-[var(--lt-accent)]/25">
          WAL 崩溃恢复 · 示例
        </span>
      </div>

      {/* 日志行 */}
      <pre className="text-[0.75rem] leading-[1.75] overflow-x-auto">
        <code>
          {WAL_LOG_LINES.map((line, i) => (
            <motion.div
              key={i}
              className="flex gap-3 whitespace-nowrap"
              initial={{ opacity: 0, x: -6 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.09, duration: 0.28 }}
            >
              {/* 时间戳 */}
              <span className="line-number shrink-0 min-w-[5.5rem] text-right">
                {line.ts}
              </span>
              {/* 级别 */}
              <span
                className="shrink-0 font-semibold"
                style={{
                  color:
                    line.kind === "crash"
                      ? "#F08080"
                      : line.kind === "recover"
                      ? "#ED9F62"
                      : "#A6CE8A",
                }}
              >
                {line.level}
              </span>
              {/* 消息 */}
              <span
                style={{
                  color:
                    line.kind === "crash"
                      ? "#F08080"
                      : line.kind === "recover"
                      ? "#E8C27D"
                      : "#CBC4B4",
                }}
              >
                {line.msg}
              </span>
              {/* 详情 */}
              <span className="text-[#7C7565] italic">{line.detail}</span>
            </motion.div>
          ))}
        </code>
      </pre>

      {/* 底部辉光 */}
      <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-[var(--lt-accent)] opacity-[0.07] blur-[50px] pointer-events-none" />
    </div>
  );
}

/* ── 有源能力卡(每张卡的主张都有实测/文档出处,见 metrics.ts 注释) ── */

const features: { icon: HeroIcon; title: string; desc: string; accent?: boolean }[] = [
  {
    icon: CircleStackIcon,
    title: "WAL 逐步落盘",
    desc: `每一步执行前先写 WAL 再执行。进程被杀、断电、OOM——重启后从最后安全点续跑,kill -9 实测 p50 ${METRICS.rto.p50Ms}ms 恢复服务。`,
    accent: true,
  },
  {
    icon: ArrowPathRoundedSquareIcon,
    title: "已完成的 LLM 调用不重发",
    desc: "调用指令与结果逐条持久化,崩溃恢复时直接复用已落盘的结果。零重发由网络边界独立抓包作证,不是运行时自说自话。",
    accent: true,
  },
  {
    icon: ShieldCheckIcon,
    title: "防篡改执行记录",
    desc: "WAL 逐条 HMAC,支持国密 SM3(GB/T 32905-2016)。被改过一个字节的记录,读取时当场响亮拒绝,不静默降级。",
  },
  {
    icon: ClipboardDocumentCheckIcon,
    title: "一条命令出证",
    desc: "导出执行证据包,审计方在自己的机器上离线核验——不访问你的服务、不需要任何密钥。",
  },
  {
    icon: CubeIcon,
    title: "零外部依赖",
    desc: "单二进制 + 单 WAL 文件。不需要 PG、Redis 或消息队列,部署在你自己的服务器上,数据不出内网。",
  },
  {
    icon: LockClosedIcon,
    title: "字节级兼容承诺",
    desc: "WAL v1 磁盘格式受黄金文件 CI 门禁保护:今天写下的执行记录,版本升级后仍逐字节可读。",
  },
];

export function KovaFeatures() {
  return (
    <>
      <ProblemSection />

      {/* ── WAL 崩溃恢复装置 ── */}
      <section className="py-24 border-t border-[var(--color-border)]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12">
            <p className="eyebrow text-[var(--lt-accent)] mb-3">实测,不是承诺</p>
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)]">
              kill -9 之后,{METRICS.rto.p50Ms} 毫秒回到工作状态
            </h2>
            <p className="mt-4 text-[var(--color-text-secondary)] max-w-xl leading-relaxed">
              WAL(Write-Ahead Log)在每一步执行前先落盘。进程被杀、机器断电——
              重启后从最后一个安全点精确续跑,已完成的步骤不重放,已完成的 LLM
              调用不重发。
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <WalLogDemo />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="space-y-4"
            >
              {/* 说明卡片 */}
              <div className="card p-5 space-y-3">
                <div className="flex items-start gap-3">
                  <span
                    className="mt-0.5 w-2 h-2 rounded-full shrink-0"
                    style={{ background: "#A6CE8A", marginTop: "0.4rem" }}
                  />
                  <div>
                    <p className="text-sm font-medium text-[var(--color-text-primary)]">
                      正常执行:逐步写入 WAL
                    </p>
                    <p className="mt-1 text-xs text-[var(--color-text-muted)] leading-relaxed">
                      每完成一个 step,引擎先将状态序列化写入 WAL 文件,
                      再继续下一步。checkpoint 序号单调递增。
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ background: "#F08080", marginTop: "0.4rem" }}
                  />
                  <div>
                    <p className="text-sm font-medium text-[var(--color-text-primary)]">
                      崩溃:进程中止,内存全部丢失
                    </p>
                    <p className="mt-1 text-xs text-[var(--color-text-muted)] leading-relaxed">
                      SIGKILL / OOM / 机器掉电——所有堆内状态消失。
                      但 WAL 文件完好,落盘的最后 seq 被保留。
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ background: "#ED9F62", marginTop: "0.4rem" }}
                  />
                  <div>
                    <p className="text-sm font-medium text-[var(--color-text-primary)]">
                      恢复:从最后安全点续跑,已完成调用不重发
                    </p>
                    <p className="mt-1 text-xs text-[var(--color-text-muted)] leading-relaxed">
                      引擎重启后 replay WAL,跳过已完成步骤;已落盘结果的 LLM
                      调用直接复用,不再向上游重发。崩溃续跑演练中,该行为由
                      网络边界抓包逐请求核对({METRICS.zeroDuplicate.crashTrials}{" "}
                      零重发,{METRICS.zeroDuplicate.date})。
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 能力网格 ── */}
      <section className="py-24 border-t border-[var(--color-border)]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">
              <span className="text-gradient-gold">拿得出证据的能力</span>
            </h2>
            <p className="mt-4 text-[var(--color-text-secondary)]">
              每一条主张,都对应一份可交付的实测记录或客户文档
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="card p-6"
                >
                  <Icon
                    className="w-6 h-6"
                    style={{
                      color: f.accent ? "var(--lt-accent)" : "var(--color-text-secondary)",
                    }}
                  />
                  <h3 className="mt-4 text-lg font-semibold text-[var(--color-text-primary)]">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-sm text-[var(--color-text-muted)] leading-relaxed">
                    {f.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
