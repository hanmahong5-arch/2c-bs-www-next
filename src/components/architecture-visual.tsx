"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

// Accent palette — no hardcoded gold. Use CSS variables or semantically exact values.
const ACCENT   = "rgba(255, 93, 31, 0.5)";   // var(--color-accent) at 50%
const ACCENT_DIM = "rgba(255, 93, 31, 0.18)"; // accent at 18%
const BLUE     = "rgba(45, 74, 138, 0.45)";   // var(--accent-2) at 45%
const BLUE_DIM = "rgba(45, 74, 138, 0.18)";
const PROVIDER = "rgba(100, 95, 115, 0.35)";
const PROVIDER_TEXT = "#9090A0";

const nodes = [
  { id: "client",   label: "你的应用",  x: 50, y: 14, type: "external" as const },
  { id: "gateway",  label: "API 网关",  x: 50, y: 34, type: "core"     as const },
  { id: "router",   label: "智能路由",  x: 22, y: 54, type: "core"     as const },
  { id: "billing",  label: "计费引擎",  x: 50, y: 54, type: "core"     as const },
  { id: "memory",   label: "记忆引擎",  x: 78, y: 54, type: "core"     as const },
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
  external: { fill: BLUE_DIM,    stroke: BLUE,     text: "#7BA4E8" },
  core:     { fill: ACCENT_DIM,  stroke: ACCENT,   text: "#FF8A58" },
  provider: { fill: PROVIDER,    stroke: PROVIDER, text: PROVIDER_TEXT },
};

// Audit log entries shown after trace completes — real log format
const auditEntries = [
  {
    ts: "2026-06-13T09:41:22.001Z",
    level: "INFO",
    event: "request.auth.ok",
    payload: '{"sub":"usr_8k2x","org":"org_lurus","scope":"chat:write"}',
  },
  {
    ts: "2026-06-13T09:41:22.003Z",
    level: "INFO",
    event: "billing.preauth.ok",
    payload: '{"balance_cny":"2847.32","reserved":"0.0050"}',
  },
  {
    ts: "2026-06-13T09:41:22.012Z",
    level: "INFO",
    event: "router.decision",
    payload: '{"model":"deepseek-v3-0324","score":98,"cost_ratio":0.15}',
  },
  {
    ts: "2026-06-13T09:41:22.042Z",
    level: "INFO",
    event: "upstream.response",
    payload: '{"finish_reason":"stop","prompt_tokens":312,"completion_tokens":72}',
  },
  {
    ts: "2026-06-13T09:41:22.044Z",
    level: "INFO",
    event: "billing.commit",
    payload: '{"charged_cny":"0.0028","tx_id":"tx_9f3a2c"}',
  },
  {
    ts: "2026-06-13T09:41:22.045Z",
    level: "INFO",
    event: "audit.sealed",
    payload: '{"trace_id":"trc_4b8d9e","immutable":true}',
  },
];

const traceSteps = [
  {
    time: "0ms",
    icon: "→",
    label: "请求到达",
    detail: "POST /v1/chat/completions  trc_4b8d9e",
    stage: "ingress",
  },
  {
    time: "2ms",
    icon: "✓",
    label: "鉴权通过",
    detail: "sub:usr_8k2x  org:org_lurus  scope:chat:write",
    stage: "auth",
  },
  {
    time: "4ms",
    icon: "✓",
    label: "余额预授权",
    detail: "¥2,847.32 · reserved ¥0.0050",
    stage: "billing",
  },
  {
    time: "9ms",
    icon: "✓",
    label: "记忆上下文",
    detail: "3 facts · cos_sim 0.89 · injected 312 tok",
    stage: "memory",
  },
  {
    time: "12ms",
    icon: "⊙",
    label: "路由决策",
    detail: "deepseek-v3-0324  score 98  cost_ratio 0.15",
    stage: "router",
  },
  {
    time: "42ms",
    icon: "✓",
    label: "模型响应",
    detail: "finish_reason:stop  +72 tok  p50 38ms",
    stage: "upstream",
  },
  {
    time: "44ms",
    icon: "✓",
    label: "原子计费",
    detail: "−¥0.0028  tx_id:tx_9f3a2c  committed",
    stage: "commit",
  },
  {
    time: "45ms",
    icon: "✓",
    label: "审计封存",
    detail: "trc_4b8d9e  immutable:true  sealed",
    stage: "audit",
  },
];

type TraceStage = typeof traceSteps[number]["stage"];

const stageColor: Record<TraceStage, string> = {
  ingress:  "var(--color-text-secondary)",
  auth:     "var(--color-success)",
  billing:  "var(--color-success)",
  memory:   "var(--color-success)",
  router:   "var(--color-ochre)",
  upstream: "var(--color-success)",
  commit:   "var(--color-success)",
  audit:    "var(--color-success)",
};

const stageIsAccent: Record<TraceStage, boolean> = {
  ingress:  false,
  auth:     false,
  billing:  false,
  memory:   false,
  router:   true,
  upstream: false,
  commit:   false,
  audit:    false,
};

function AuditLog({ visible }: { visible: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: visible ? 1 : 0, height: visible ? "auto" : 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="overflow-hidden"
    >
      <div
        className="mt-3 rounded-xl overflow-hidden border"
        style={{ borderColor: "rgba(255,255,255,0.06)", background: "#12100E" }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-4 py-2 border-b"
          style={{ borderColor: "rgba(255,255,255,0.06)" }}
        >
          <span className="text-[9px] font-mono tracking-widest uppercase" style={{ color: "#7A7168" }}>
            AUDIT LOG — IT 视角
          </span>
          <span
            className="text-[9px] font-mono px-1.5 py-0.5 rounded"
            style={{ background: "rgba(166,206,138,0.1)", color: "#A6CE8A", border: "1px solid rgba(166,206,138,0.2)" }}
          >
            IMMUTABLE
          </span>
        </div>
        {/* Log lines */}
        <div className="divide-y" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
          {auditEntries.map((entry, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : -6 }}
              transition={{ delay: i * 0.07, duration: 0.25 }}
              className="px-4 py-2 flex flex-col gap-0.5 md:flex-row md:gap-3 md:items-baseline"
            >
              {/* timestamp */}
              <span className="text-[9px] font-mono shrink-0" style={{ color: "#4A4540" }}>
                {entry.ts.split("T")[1]}
              </span>
              {/* level */}
              <span
                className="text-[9px] font-mono shrink-0 hidden md:inline"
                style={{ color: "#A6CE8A" }}
              >
                {entry.level}
              </span>
              {/* event */}
              <span className="text-[10px] font-mono shrink-0" style={{ color: "#CBC4B4" }}>
                {entry.event}
              </span>
              {/* payload */}
              <span
                className="text-[9px] font-mono truncate"
                style={{ color: "#5A5450" }}
              >
                {entry.payload}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function RequestTrace({ onCycle }: { onCycle: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-80px" });
  const [visibleCount, setVisibleCount] = useState(0);
  const [showAudit, setShowAudit] = useState(false);

  const onCycleRef = useRef(onCycle);
  useEffect(() => { onCycleRef.current = onCycle; });

  useEffect(() => {
    if (!isInView) return;
    const timers: ReturnType<typeof setTimeout>[] = [];

    traceSteps.forEach((_, i) => {
      timers.push(setTimeout(() => setVisibleCount(i + 1), 300 + i * 380));
    });

    // Show audit log after all steps
    timers.push(
      setTimeout(() => setShowAudit(true), 300 + traceSteps.length * 380 + 400)
    );

    // Cycle
    timers.push(
      setTimeout(
        () => onCycleRef.current(),
        300 + traceSteps.length * 380 + 3800
      )
    );

    return () => timers.forEach(clearTimeout);
  }, [isInView]);

  const allDone = visibleCount >= traceSteps.length;

  return (
    <div ref={ref}>
      <div className="flex items-center justify-between mb-4">
        <p className="text-[9px] font-mono uppercase tracking-widest" style={{ color: "var(--color-text-muted)", opacity: 0.5 }}>
          REQUEST TRACE · p50 38ms
        </p>
        <motion.span
          animate={{ opacity: allDone ? 1 : 0, scale: allDone ? 1 : 0.8 }}
          transition={{ duration: 0.3 }}
          className="text-[9px] font-mono px-2 py-0.5 rounded-full border"
          style={{
            background: "rgba(166,206,138,0.1)",
            color: "var(--color-success)",
            borderColor: "rgba(166,206,138,0.25)",
          }}
        >
          200 OK
        </motion.span>
      </div>

      <div
        className="rounded-xl border overflow-hidden"
        style={{ background: "var(--background)", borderColor: "var(--color-border)" }}
      >
        {/* Column header */}
        <div
          className="hidden md:grid grid-cols-[3.4rem_8rem_1fr] gap-2 px-4 py-2 border-b text-[9px] font-mono uppercase tracking-widest"
          style={{ borderColor: "var(--color-border)", color: "var(--color-text-muted)" }}
        >
          <span>Time</span>
          <span>Stage</span>
          <span>Detail</span>
        </div>

        <div className="divide-y" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
          {traceSteps.map((s, i) => (
            <motion.div
              key={i}
              className="flex flex-col gap-1 md:grid md:grid-cols-[3.4rem_8rem_1fr] md:gap-2 md:items-center px-4 py-2.5 text-[10px] font-mono"
              style={{
                background:
                  i === visibleCount - 1
                    ? "rgba(255, 93, 31, 0.04)"
                    : "transparent",
              }}
              initial={{ opacity: 0, x: -10 }}
              animate={i < visibleCount ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <div className="flex items-center gap-2 md:contents">
                <span style={{ color: "var(--color-text-muted)" }} className="shrink-0">
                  {s.time}
                </span>
                <div className="flex items-center gap-1.5">
                  <span
                    className="text-[11px] shrink-0 leading-none"
                    style={{ color: stageColor[s.stage] }}
                  >
                    {s.icon}
                  </span>
                  <span
                    style={{
                      color: stageIsAccent[s.stage]
                        ? "var(--color-ochre)"
                        : "var(--color-text-primary)",
                    }}
                    className="whitespace-nowrap"
                  >
                    {s.label}
                  </span>
                </div>
              </div>
              <span
                className="truncate pl-[3.8rem] md:pl-0"
                style={{ color: "var(--color-text-muted)" }}
              >
                {s.detail}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Summary footer */}
        <motion.div
          animate={{ opacity: allDone ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-between px-4 py-3 border-t"
          style={{
            background: "rgba(166,206,138,0.04)",
            borderColor: "rgba(166,206,138,0.12)",
          }}
        >
          <span className="text-[10px] font-mono" style={{ color: "var(--color-success)" }}>
            ✓ 全流程完成
          </span>
          <div className="flex items-center gap-3 text-[10px] font-mono">
            <span style={{ color: "var(--color-ochre)", fontWeight: 600 }}>45ms</span>
            <span className="w-px h-3" style={{ background: "var(--color-border)" }} />
            <span style={{ color: "var(--color-success)" }}>¥0.0028</span>
            <span className="w-px h-3" style={{ background: "var(--color-border)" }} />
            <span style={{ color: "var(--color-text-muted)" }}>节省 85%</span>
            <span className="w-px h-3 hidden sm:block" style={{ background: "var(--color-border)" }} />
            <span className="hidden sm:inline" style={{ color: "var(--color-text-muted)" }}>
              tx_id:tx_9f3a2c
            </span>
          </div>
        </motion.div>
      </div>

      {/* Audit log expands below trace after completion */}
      <AuditLog visible={showAudit} />
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
            <span className="text-gradient-gold">一个请求</span>
            <span className="text-[var(--color-text-primary)]">的完整生命周期</span>
          </h2>
          <p className="mt-4 max-w-lg mx-auto" style={{ color: "var(--color-text-secondary)" }}>
            鉴权、路由决策、计费扣款、记忆写入——Lurus 在响应返回前，静默地处理了这一切。
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

            {/* Left: System topology */}
            <div className="hidden sm:block">
              <p
                className="text-[9px] font-mono uppercase tracking-widest mb-4"
                style={{ color: "var(--color-text-muted)", opacity: 0.5 }}
              >
                SYSTEM TOPOLOGY
              </p>
              <svg viewBox="0 0 100 95" className="w-full" style={{ maxHeight: 320 }}>
                {/* Layer labels */}
                <text x="2" y="16" fill="rgba(45,74,138,0.35)"  fontSize="1.8" fontFamily="var(--font-geist-mono)">YOUR APP</text>
                <text x="2" y="36" fill="rgba(255,93,31,0.3)"   fontSize="1.8" fontFamily="var(--font-geist-mono)">LURUS PLATFORM</text>
                <text x="2" y="81" fill="rgba(100,95,115,0.4)"  fontSize="1.8" fontFamily="var(--font-geist-mono)">PROVIDERS</text>

                {/* Connections */}
                {connections.map(([from, to], i) => {
                  const a = getNode(from);
                  const b = getNode(to);
                  return (
                    <motion.line
                      key={`${from}-${to}`}
                      x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                      stroke="rgba(255, 93, 31, 0.18)"
                      strokeWidth="0.3"
                      strokeDasharray="2 2"
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{ pathLength: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.08, duration: 0.6 }}
                    />
                  );
                })}

                {/* Animated pulses on main path */}
                {connections.slice(0, 4).map(([from, to], i) => {
                  const a = getNode(from);
                  const b = getNode(to);
                  return (
                    <motion.circle
                      key={`pulse-${from}-${to}`}
                      r="0.6"
                      fill="rgba(255, 93, 31, 0.8)"
                      animate={{ cx: [a.x, b.x], cy: [a.y, b.y], opacity: [0, 0.8, 0] }}
                      transition={{ duration: 2, delay: i * 0.5, repeat: Infinity, ease: "easeInOut" }}
                    />
                  );
                })}

                {/* Nodes */}
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
              </svg>

              {/* Latency breakdown bar */}
              <div className="mt-6">
                <p
                  className="text-[9px] font-mono uppercase tracking-widest mb-2"
                  style={{ color: "var(--color-text-muted)", opacity: 0.5 }}
                >
                  LATENCY BREAKDOWN
                </p>
                <div className="flex rounded overflow-hidden h-2" style={{ gap: "1px" }}>
                  {[
                    { label: "Auth",     w: "9%",  color: "rgba(45,74,138,0.55)"   },
                    { label: "Memory",   w: "17%", color: "rgba(45,74,138,0.35)"   },
                    { label: "Router",   w: "7%",  color: "rgba(255,93,31,0.55)"   },
                    { label: "Upstream", w: "67%", color: "rgba(255,93,31,0.30)"   },
                  ].map((seg) => (
                    <motion.div
                      key={seg.label}
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                      style={{ width: seg.w, background: seg.color, transformOrigin: "left" }}
                    />
                  ))}
                </div>
                <div className="flex justify-between mt-1.5 text-[9px] font-mono" style={{ color: "var(--color-text-muted)", opacity: 0.5 }}>
                  <span>鉴权 4ms</span>
                  <span>记忆 9ms</span>
                  <span>路由 3ms</span>
                  <span>上游 30ms</span>
                  <span className="font-semibold" style={{ color: "var(--color-ochre)", opacity: 1 }}>总计 45ms</span>
                </div>
              </div>
            </div>

            {/* Right: Live request trace */}
            <RequestTrace key={cycleKey} onCycle={handleCycle} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
