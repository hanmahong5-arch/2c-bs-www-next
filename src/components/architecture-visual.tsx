"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const nodes = [
  { id: "client",   label: "你的应用",  x: 50, y: 15, type: "external" as const },
  { id: "gateway",  label: "API 网关",  x: 50, y: 35, type: "core"     as const },
  { id: "router",   label: "智能路由",  x: 25, y: 55, type: "core"     as const },
  { id: "billing",  label: "计费引擎",  x: 50, y: 55, type: "core"     as const },
  { id: "memory",   label: "记忆引擎",  x: 75, y: 55, type: "core"     as const },
  { id: "openai",   label: "OpenAI",    x: 10, y: 80, type: "provider" as const },
  { id: "claude",   label: "Claude",    x: 30, y: 80, type: "provider" as const },
  { id: "deepseek", label: "DeepSeek",  x: 50, y: 80, type: "provider" as const },
  { id: "gemini",   label: "Gemini",    x: 70, y: 80, type: "provider" as const },
  { id: "more",     label: "30+",       x: 90, y: 80, type: "provider" as const },
];

const connections: [string, string][] = [
  ["client",  "gateway"],
  ["gateway", "router"],
  ["gateway", "billing"],
  ["gateway", "memory"],
  ["router",  "openai"],
  ["router",  "claude"],
  ["router",  "deepseek"],
  ["router",  "gemini"],
  ["router",  "more"],
];

function getNode(id: string) {
  return nodes.find((n) => n.id === id)!;
}

const typeStyles = {
  external: { fill: "rgba(74, 144, 226, 0.15)",  stroke: "rgba(74, 144, 226, 0.4)",  text: "#4a90e2" },
  core:     { fill: "rgba(200, 162, 78, 0.15)",  stroke: "rgba(200, 162, 78, 0.5)",  text: "#c8a24e" },
  provider: { fill: "rgba(90, 90, 110, 0.2)",    stroke: "rgba(90, 90, 110, 0.4)",   text: "#9a9aab" },
};

const traceSteps = [
  { time: "0ms",  icon: "→", label: "请求到达",   detail: "POST /v1/chat/completions",      color: "text-[var(--color-text-secondary)]", ochre: false },
  { time: "2ms",  icon: "✓", label: "鉴权通过",   detail: "JWT · usr_8k2x · 有效",          color: "text-[var(--color-success)]",        ochre: false },
  { time: "4ms",  icon: "✓", label: "余额充足",   detail: "¥2,847.32 · 预授权通过",         color: "text-[var(--color-success)]",        ochre: false },
  { time: "9ms",  icon: "✓", label: "记忆上下文", detail: "3 事实命中 · 相似度 0.89",       color: "text-[var(--color-success)]",        ochre: false },
  { time: "12ms", icon: "⊙", label: "路由决策",   detail: "DeepSeek V3 · score 98 · -85%",  color: "text-[var(--color-ochre)]",          ochre: true  },
  { time: "42ms", icon: "✓", label: "模型响应",   detail: "finish_reason: stop · 20 tok",   color: "text-[var(--color-success)]",        ochre: false },
  { time: "44ms", icon: "✓", label: "原子计费",   detail: "-¥0.0002 已扣款",                color: "text-[var(--color-success)]",        ochre: false },
  { time: "45ms", icon: "✓", label: "记忆更新",   detail: "+1 事实写入向量库",               color: "text-[var(--color-success)]",        ochre: false },
];

// RequestTrace receives onCycle callback. ArchitectureVisual renders it with
// key={cycleKey} so React remounts it on each cycle — state resets to initial
// values automatically without any synchronous setState inside effects.
function RequestTrace({ onCycle }: { onCycle: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-80px" });
  const [visibleCount, setVisibleCount] = useState(0);

  // Keep a stable ref to onCycle so the effect dep array stays [isInView] only
  const onCycleRef = useRef(onCycle);
  useEffect(() => { onCycleRef.current = onCycle; });

  useEffect(() => {
    if (!isInView) return;
    const timers: ReturnType<typeof setTimeout>[] = [];

    traceSteps.forEach((_, i) => {
      timers.push(setTimeout(() => setVisibleCount(i + 1), 400 + i * 420));
    });

    // After all steps shown + pause, signal parent to start next cycle
    timers.push(
      setTimeout(
        () => onCycleRef.current(),
        400 + traceSteps.length * 420 + 2800
      )
    );

    return () => timers.forEach(clearTimeout);
  }, [isInView]);

  const allDone = visibleCount >= traceSteps.length;

  return (
    <div ref={ref}>
      <div className="flex items-center justify-between mb-4">
        <p className="text-[9px] font-mono text-[var(--color-text-muted)] uppercase tracking-widest opacity-50">
          REQUEST TRACE
        </p>
        <motion.span
          animate={{ opacity: allDone ? 1 : 0, scale: allDone ? 1 : 0.8 }}
          transition={{ duration: 0.3 }}
          className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-[var(--color-success)]/10 text-[var(--color-success)] border border-[var(--color-success)]/20"
        >
          COMPLETE
        </motion.span>
      </div>

      <div className="bg-[var(--background)]/60 rounded-xl border border-[var(--color-border)] overflow-hidden">
        {/* Column header */}
        <div className="grid grid-cols-[3.2rem_7rem_1fr] gap-2 px-4 py-2 border-b border-[var(--color-border)] text-[9px] font-mono text-[var(--color-text-muted)] uppercase tracking-widest">
          <span>Time</span>
          <span>Stage</span>
          <span>Detail</span>
        </div>

        {/* Trace rows — keyed by index only; component remounts on each cycle */}
        <div className="divide-y divide-[var(--color-border)]/40">
          {traceSteps.map((s, i) => (
            <motion.div
              key={i}
              className={`grid grid-cols-[3.2rem_7rem_1fr] gap-2 px-4 py-2.5 text-[10px] font-mono items-center ${
                i === visibleCount - 1 ? "bg-[var(--color-ochre)]/4" : ""
              }`}
              initial={{ opacity: 0, x: -10 }}
              animate={i < visibleCount ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
            >
              <span className="text-[var(--color-text-muted)]">{s.time}</span>
              <div className="flex items-center gap-1.5">
                <span className={`text-[11px] ${s.color} shrink-0 leading-none`}>{s.icon}</span>
                <span className={`${s.ochre ? "text-[var(--color-ochre)]" : "text-[var(--color-text-primary)]"} whitespace-nowrap`}>
                  {s.label}
                </span>
              </div>
              <span className="text-[var(--color-text-muted)] truncate">{s.detail}</span>
            </motion.div>
          ))}
        </div>

        {/* Summary footer */}
        <motion.div
          animate={{ opacity: allDone ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-between px-4 py-3 bg-[var(--color-success)]/4 border-t border-[var(--color-success)]/10"
        >
          <span className="text-[10px] font-mono text-[var(--color-success)]">✓ 全流程完成</span>
          <div className="flex items-center gap-3 text-[10px] font-mono">
            <span className="text-[var(--color-ochre)] font-semibold">45ms</span>
            <span className="w-px h-3 bg-[var(--color-border)]" />
            <span className="text-[var(--color-success)]">¥0.0002</span>
            <span className="w-px h-3 bg-[var(--color-border)]" />
            <span className="text-[var(--color-text-muted)]">节省 85%</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export function ArchitectureVisual() {
  const sectionRef = useRef<HTMLElement>(null);
  const [cycleKey, setCycleKey] = useState(0);
  const handleCycle = useCallback(() => setCycleKey((k) => k + 1), []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const maxWidth = useTransform(
    scrollYProgress,
    [0, 0.35, 0.65, 1],
    ["56rem", "56rem", "76rem", "76rem"]
  );
  const borderRadius = useTransform(
    scrollYProgress,
    [0, 0.35, 0.65, 1],
    ["16px", "16px", "24px", "24px"]
  );

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="eyebrow mb-4">ARCHITECTURE</p>
          <h2 className="headline-tight text-3xl md:text-4xl font-bold">
            <span className="text-gradient-gold">一个 API</span>
            <span className="text-[var(--color-text-primary)]">，通达一切</span>
          </h2>
          <p className="mt-4 text-[var(--color-text-secondary)]">
            你只需对接一次，路由 / 计费 / 记忆 / 鉴权全自动运转
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ maxWidth, borderRadius }}
          className="card p-6 md:p-10 mx-auto overflow-hidden"
        >
          <div className="grid md:grid-cols-[5fr_6fr] gap-8 items-start">

            {/* Left: System topology diagram */}
            <div>
              <p className="text-[9px] font-mono text-[var(--color-text-muted)] uppercase tracking-widest mb-4 opacity-50">
                SYSTEM TOPOLOGY
              </p>
              <svg viewBox="0 0 100 95" className="w-full" style={{ maxHeight: 320 }}>
                {connections.map(([from, to], i) => {
                  const a = getNode(from);
                  const b = getNode(to);
                  return (
                    <motion.line
                      key={`${from}-${to}`}
                      x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                      stroke="rgba(200, 162, 78, 0.2)"
                      strokeWidth="0.3"
                      strokeDasharray="2 2"
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{ pathLength: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.08, duration: 0.6 }}
                    />
                  );
                })}

                {connections.slice(0, 4).map(([from, to], i) => {
                  const a = getNode(from);
                  const b = getNode(to);
                  return (
                    <motion.circle
                      key={`pulse-${from}-${to}`}
                      r="0.6"
                      fill="#c8a24e"
                      animate={{ cx: [a.x, b.x], cy: [a.y, b.y], opacity: [0, 0.8, 0] }}
                      transition={{ duration: 2, delay: i * 0.5, repeat: Infinity, ease: "easeInOut" }}
                    />
                  );
                })}

                {nodes.map((node, i) => {
                  const style = typeStyles[node.type];
                  return (
                    <motion.g
                      key={node.id}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.05, type: "spring" }}
                    >
                      <rect
                        x={node.x - 8} y={node.y - 3.5}
                        width="16" height="7" rx="1.5"
                        fill={style.fill} stroke={style.stroke} strokeWidth="0.3"
                      />
                      <text
                        x={node.x} y={node.y + 1}
                        textAnchor="middle"
                        fill={style.text}
                        fontSize="2.2" fontWeight="500"
                        fontFamily="var(--font-geist-sans)"
                      >
                        {node.label}
                      </text>
                    </motion.g>
                  );
                })}

                <text x="2" y="16" fill="rgba(200,162,78,0.3)" fontSize="1.8" fontFamily="var(--font-geist-mono)">YOUR APP</text>
                <text x="2" y="36" fill="rgba(200,162,78,0.3)" fontSize="1.8" fontFamily="var(--font-geist-mono)">LURUS PLATFORM</text>
                <text x="2" y="81" fill="rgba(200,162,78,0.3)" fontSize="1.8" fontFamily="var(--font-geist-mono)">PROVIDERS</text>
              </svg>
            </div>

            {/* Right: Live request trace — key remounts on each cycle, state resets */}
            <RequestTrace key={cycleKey} onCycle={handleCycle} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
