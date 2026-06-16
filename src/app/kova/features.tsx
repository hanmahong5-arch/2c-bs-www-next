"use client";

import { motion } from "framer-motion";
import {
  CircleStackIcon,
  ArrowPathRoundedSquareIcon,
  BoltIcon,
  CubeIcon,
  PuzzlePieceIcon,
  CodeBracketIcon,
} from "@heroicons/react/24/outline";
import type { ComponentType, SVGProps } from "react";

type HeroIcon = ComponentType<SVGProps<SVGSVGElement>>;

const features: { icon: HeroIcon; title: string; desc: string; accent?: boolean }[] = [
  {
    icon: CircleStackIcon,
    title: "WAL 崩溃恢复",
    desc: "Write-Ahead Log 持久化每一步执行状态，Agent 崩溃后精确恢复到最后检查点，零数据丢失。",
    accent: true,
  },
  {
    icon: ArrowPathRoundedSquareIcon,
    title: "DAG 拓扑调度",
    desc: "复杂工作流用有向无环图建模，自动并行执行无依赖节点，最大化吞吐。",
  },
  {
    icon: BoltIcon,
    title: "微秒级延迟",
    desc: "Rust 零成本抽象 + 异步运行时，调度延迟 <1ms P99，适合实时 Agent 场景。",
  },
  {
    icon: CubeIcon,
    title: "零外部依赖",
    desc: "不需要 Redis、PostgreSQL 或消息队列。单个二进制文件包含一切，嵌入式部署。",
  },
  {
    icon: PuzzlePieceIcon,
    title: "多协议支持",
    desc: "原生 gRPC + REST API，兼容 MCP (Model Context Protocol) 和 A2A (Agent-to-Agent)。",
  },
  {
    icon: CodeBracketIcon,
    title: "Python 集成",
    desc: "PyO3 绑定，在 Python 中直接使用 Kova 引擎，兼容 LangChain / AutoGen 等框架。",
  },
];

// WAL 崩溃恢复演示日志行 — 所有内容均为示意，注释已标注
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

// PyO3 Python 示意用法
// SAFE for dangerouslySetInnerHTML: 编译期静态常量，无用户/外部输入。
const PYTHON_LINES = [
  '<span class="comment"># 示例 — PyO3 绑定，在 Python 中驱动 Kova 引擎</span>',
  '<span class="keyword">import</span> <span class="punctuation">kova</span>',
  "",
  '<span class="punctuation">engine = kova.</span><span class="function">Engine</span><span class="punctuation">(</span><span class="property">wal_dir</span><span class="punctuation">=</span><span class="string">"/data/kova-wal"</span><span class="punctuation">)</span>  <span class="comment"># 示例</span>',
  '<span class="punctuation">session = engine.</span><span class="function">new_session</span><span class="punctuation">()</span>',
  "",
  '<span class="comment"># 示例 — 运行 DAG 工作流，崩溃后可从最后检查点恢复</span>',
  '<span class="punctuation">result = session.</span><span class="function">run</span><span class="punctuation">(</span><span class="property">workflow</span><span class="punctuation">=</span><span class="string">"my_agent_dag"</span><span class="punctuation">)</span>',
  '<span class="function">print</span><span class="punctuation">(result.</span><span class="property">last_checkpoint</span><span class="punctuation">)  </span><span class="comment"># seq, step, elapsed_ms</span>',
];

function WalLogDemo() {
  return (
    <div className="code-block p-5 relative overflow-hidden shadow-[var(--shadow-window)]">
      {/* 橙色边缘光晕 */}
      <div className="absolute inset-0 rounded-xl opacity-30 pointer-events-none">
        <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-br from-[var(--accent)]/20 via-transparent to-[var(--accent)]/8" />
      </div>

      {/* 窗口 chrome */}
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
        <div className="flex gap-1.5 shrink-0">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <span className="text-xs text-[#8A8474] ml-2 font-mono">kova-runtime.log</span>
        <span className="ml-auto text-[10px] font-mono px-2 py-0.5 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/25">
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
      <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-[var(--accent)] opacity-[0.07] blur-[50px] pointer-events-none" />
    </div>
  );
}

function PythonDemo() {
  return (
    <div className="code-block p-5 relative overflow-hidden shadow-[var(--shadow-lg)]">
      {/* 窗口 chrome */}
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
        <div className="flex gap-1.5 shrink-0">
          <div className="w-3 h-3 rounded-full bg-white/15" />
          <div className="w-3 h-3 rounded-full bg-white/15" />
          <div className="w-3 h-3 rounded-full bg-white/15" />
        </div>
        <span className="text-xs text-[#8A8474] ml-2 font-mono">agent.py</span>
        <span className="ml-auto text-[10px] font-mono text-[#7C7565] italic">
          PyO3 绑定 · 示例
        </span>
      </div>

      <pre className="text-[0.8125rem] leading-[1.8]">
        <code>
          {PYTHON_LINES.map((line, i) => (
            <motion.div
              key={i}
              className="flex"
              initial={{ opacity: 0, x: -6 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 + i * 0.07, duration: 0.25 }}
            >
              <span className="line-number hidden sm:block">{i + 1}</span>
              <span dangerouslySetInnerHTML={{ __html: line || " " }} />
            </motion.div>
          ))}
        </code>
      </pre>
    </div>
  );
}

export function KovaFeatures() {
  return (
    <>
      {/* ── 核心特性网格 ── */}
      <section className="py-24 border-t border-[var(--color-border)]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">
              <span className="text-gradient-gold">核心特性</span>
            </h2>
            <p className="mt-4 text-[var(--color-text-secondary)]">
              为 AI Agent 运行时而生
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
                      color: f.accent ? "var(--accent)" : "var(--color-text-secondary)",
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

      {/* ── WAL 崩溃恢复装置 ── */}
      <section className="py-24 border-t border-[var(--color-border)]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12">
            <p className="eyebrow text-[var(--accent)] mb-3">核心保障</p>
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)]">
              崩溃？精确恢复到最后安全点
            </h2>
            <p className="mt-4 text-[var(--color-text-secondary)] max-w-xl leading-relaxed">
              WAL（Write-Ahead Log）在每一步执行前先落盘。进程被杀、机器断电——
              重启后从最后一个 checkpoint 精确续跑，已完成的步骤不会重放。
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 items-start">
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
                      正常执行：逐步写入 WAL
                    </p>
                    <p className="mt-1 text-xs text-[var(--color-text-muted)] leading-relaxed">
                      每完成一个 step，引擎先将状态序列化写入 WAL 文件，
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
                      崩溃：进程中止，内存全部丢失
                    </p>
                    <p className="mt-1 text-xs text-[var(--color-text-muted)] leading-relaxed">
                      SIGKILL / OOM / 机器掉电——所有堆内状态消失。
                      但 WAL 文件完好，落盘的最后 seq 被保留。
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
                      恢复：从最后安全 checkpoint 续跑
                    </p>
                    <p className="mt-1 text-xs text-[var(--color-text-muted)] leading-relaxed">
                      引擎重启后 replay WAL，跳过已完成步骤，
                      从最后写入的 step 之后继续，无需人工介入。
                    </p>
                  </div>
                </div>
              </div>

              {/* Python 绑定示意 */}
              <PythonDemo />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
