"use client";

import { motion } from "framer-motion";
import type { MouseEvent as ReactMouseEvent } from "react";

// Aceternity-style spotlight: cursor-tracking radial gradient on `.card-spotlight`.
// Sets --mx / --my CSS variables; the ::before pseudo-element paints the gradient.
function spotlight(e: ReactMouseEvent<HTMLDivElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
}

export function FeaturesShowcase() {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 -z-10 grid-bg opacity-50" />

      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="eyebrow mb-4">CAPABILITIES</p>
          <h2 className="headline-tight text-3xl md:text-4xl font-bold">
            <span className="text-[var(--color-text-primary)]">不止于网关，</span>
            <span className="text-gradient-gold">全栈 AI 后端</span>
          </h2>
          <p className="mt-4 text-[var(--color-text-secondary)] max-w-xl mx-auto">
            接入只是开始。路由、计费、记忆、认证、通知、可观测性——你本该自建的每一层，Lurus 都已经做好了。
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid md:grid-cols-3 gap-5">

          {/* ① Smart Routing — wide, col-span-2 */}
          <motion.div
            onMouseMove={spotlight}
            className="md:col-span-2 card card-spotlight p-6 group relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0 }}
          >
            <div className="flex flex-col lg:flex-row gap-6 h-full">
              <div className="lg:w-[42%] shrink-0">
                <p className="eyebrow mb-2 text-[var(--color-ochre)]/60">SMART ROUTING</p>
                <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-3">智能路由</h3>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-5">
                  实时评估 30+ 供应商的延迟、错误率与成本，每条请求自动匹配最优渠道——无需任何配置，路由决策 p50 &lt;100ms。
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold font-mono text-gradient-gold">&lt;100ms</span>
                  <span className="text-xs text-[var(--color-text-muted)]">路由决策延迟</span>
                </div>
              </div>
              <div className="flex-1 bg-[var(--background)]/60 rounded-xl p-4 border border-[var(--color-border)]">
                <RouterProviderTable />
              </div>
            </div>
            <div className="absolute -bottom-12 -right-12 w-48 h-48 rounded-full bg-[var(--color-ochre)] opacity-[0.04] blur-[70px] group-hover:opacity-[0.08] transition-opacity duration-700 pointer-events-none" />
          </motion.div>

          {/* ② Billing — col-span-1 */}
          <motion.div
            onMouseMove={spotlight}
            className="card card-spotlight p-6 group relative overflow-hidden flex flex-col"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
          >
            <p className="eyebrow mb-2 text-[var(--color-ochre)]/60">BILLING ENGINE</p>
            <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-3">金融级计费</h3>
            <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-5">
              精度到 ¥0.0001 的钱包引擎，SQL 原子事务保证每笔扣款幂等——充值、扣款、预授权、退款全覆盖。
            </p>
            <div className="flex-1 bg-[var(--background)]/60 rounded-xl p-4 border border-[var(--color-border)]">
              <BillingLedgerVisual />
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-2xl font-bold font-mono text-gradient-gold">¥0.0001</span>
              <span className="text-xs text-[var(--color-text-muted)]">最小计费粒度</span>
            </div>
            <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-[var(--color-ochre)] opacity-[0.04] blur-[50px] group-hover:opacity-[0.08] transition-opacity duration-700 pointer-events-none" />
          </motion.div>

          {/* ③ Memory */}
          <motion.div
            onMouseMove={spotlight}
            className="card card-spotlight p-6 group relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.12 }}
          >
            <p className="eyebrow mb-2 text-[var(--color-accent)]/60">MEMORY ENGINE</p>
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">AI 记忆</h3>
            <div className="h-28 mb-4 flex items-center justify-center overflow-hidden rounded-lg bg-[var(--background)]/50">
              <MemoryVisual />
            </div>
            <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
              向量化记忆 + ACE 自动摘要，让 AI 真正记住你的用户——每次对话都是连续的，而非重置。
            </p>
            <p className="mt-3 text-xs text-[var(--color-text-muted)]">持久化上下文 · per-user 记忆空间 · MCP 兼容</p>
          </motion.div>

          {/* ④ Auth */}
          <motion.div
            onMouseMove={spotlight}
            className="card card-spotlight p-6 group relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.16 }}
          >
            <p className="eyebrow mb-2 text-[var(--color-success)]/60">IDENTITY</p>
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">企业认证</h3>
            <div className="h-28 mb-4 flex items-center justify-center overflow-hidden rounded-lg bg-[var(--background)]/50">
              <AuthVisual />
            </div>
            <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
              Zitadel OIDC 一键集成，多租户严格隔离——单点登录，一把钥匙开所有产品的门。
            </p>
            <p className="mt-3 text-xs text-[var(--color-text-muted)]">SSO · RBAC · 多租户 · JWT</p>
          </motion.div>

          {/* ⑤ Notify */}
          <motion.div
            onMouseMove={spotlight}
            className="card card-spotlight p-6 group relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.20 }}
          >
            <p className="eyebrow mb-2 text-[var(--color-accent)]/60">NOTIFICATIONS</p>
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">事件通知</h3>
            <div className="h-28 mb-4 flex items-center justify-center overflow-hidden rounded-lg bg-[var(--background)]/50">
              <NotifyVisual />
            </div>
            <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
              WebSocket · SMTP · FCM 三通道，NATS 事件总线驱动，触达用户无论身在何处。
            </p>
            <p className="mt-3 text-xs text-[var(--color-text-muted)]">实时推送 · 邮件 · 移动通知</p>
          </motion.div>

          {/* ⑥ Observability — full width, col-span-3 */}
          <motion.div
            onMouseMove={spotlight}
            className="md:col-span-3 card card-spotlight p-6 group relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.24 }}
          >
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="md:w-56 shrink-0">
                <p className="eyebrow mb-2 text-[var(--color-ochre)]/60">OBSERVABILITY</p>
                <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-3">全链路可观测性</h3>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-5">
                  每个请求的延迟、模型、成本与状态码全部可追踪，预配置 Grafana 仪表盘，零运维负担。
                </p>
                <div className="space-y-3">
                  {([
                    { value: "78ms", label: "P50 延迟", color: "var(--color-ochre)" },
                    { value: "0.02%", label: "错误率", color: "var(--color-success)" },
                    { value: "100%", label: "可追踪", color: "var(--color-text-primary)" },
                  ] as const).map((s) => (
                    <div key={s.label} className="flex items-baseline gap-2">
                      <span className="text-xl font-bold font-mono" style={{ color: s.color }}>{s.value}</span>
                      <span className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wide">{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-1">
                <ObserveWideVisual />
              </div>
            </div>
            <div className="absolute -bottom-12 -right-12 w-56 h-56 rounded-full bg-[var(--color-ochre)] opacity-[0.03] blur-[90px] group-hover:opacity-[0.06] transition-opacity duration-700 pointer-events-none" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}

/* ── Visual Components ── */

function RouterProviderTable() {
  const providers = [
    { name: "OpenAI gpt-4o", latency: "89ms", cost: "¥0.14", score: 88, selected: false },
    { name: "DeepSeek V3", latency: "42ms", cost: "¥0.02", score: 98, selected: true },
    { name: "Claude Sonnet 4", latency: "95ms", cost: "¥0.12", score: 86, selected: false },
    { name: "Gemini 2.5 Flash", latency: "120ms", cost: "¥0.08", score: 82, selected: false },
  ];

  return (
    <div className="font-mono text-xs h-full flex flex-col justify-between">
      <div>
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-2 pb-2 border-b border-[var(--color-border)] text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">
          <span>Provider</span>
          <span>P50</span>
          <span>¥/1K tok</span>
          <span>Score</span>
        </div>
        <div className="space-y-1 mt-2">
          {providers.map((p, i) => (
            <motion.div
              key={p.name}
              className={`grid grid-cols-[2fr_1fr_1fr_1fr] gap-2 py-1.5 px-2 rounded-lg items-center ${
                p.selected ? "bg-[var(--color-ochre)]/8 border border-[var(--color-ochre)]/20" : ""
              }`}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.12 }}
            >
              <div className="flex items-center gap-2 min-w-0">
                {p.selected ? (
                  <motion.span
                    className="w-1.5 h-1.5 rounded-full bg-[var(--color-success)] shrink-0"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-border)] shrink-0" />
                )}
                <span className={`truncate ${p.selected ? "text-[var(--color-ochre)] font-semibold" : "text-[var(--color-text-secondary)]"}`}>
                  {p.name}
                </span>
              </div>
              <span className={p.selected ? "text-[var(--color-success)]" : "text-[var(--color-text-muted)]"}>
                {p.latency}
              </span>
              <span className={p.selected ? "text-[var(--color-success)]" : "text-[var(--color-text-muted)]"}>
                {p.cost}
              </span>
              <div className="flex items-center gap-1">
                <span className={`font-bold ${p.selected ? "text-[var(--color-ochre)]" : "text-[var(--color-text-muted)]"}`}>
                  {p.score}
                </span>
                {p.selected && (
                  <motion.span
                    className="text-[var(--color-success)]"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7, type: "spring" }}
                  >
                    ✓
                  </motion.span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        className="mt-4 pt-3 border-t border-[var(--color-border)] flex items-center gap-2 text-[10px] text-[var(--color-success)]"
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-success)] shrink-0" />
        ROUTED → DeepSeek V3 · 较 OpenAI 节省 85% 成本
      </motion.div>
    </div>
  );
}

function BillingLedgerVisual() {
  const txs = [
    { label: "gpt-4o · 2,048 tok", amount: "-¥0.0364", debit: true },
    { label: "deepseek · 8,192 tok", amount: "-¥0.0016", debit: true },
    { label: "充值入账", amount: "+¥500.00", debit: false },
    { label: "claude-4 · 1,024 tok", amount: "-¥0.0188", debit: true },
  ];

  return (
    <div className="font-mono text-xs">
      <div className="text-center pb-3 mb-3 border-b border-[var(--color-border)]">
        <motion.div
          className="text-2xl font-bold text-[var(--color-ochre)]"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          ¥1,024.68
        </motion.div>
        <div className="text-[9px] text-[var(--color-text-muted)] tracking-widest mt-0.5">BALANCE</div>
      </div>
      <div className="space-y-1.5">
        {txs.map((tx, i) => (
          <motion.div
            key={i}
            className="flex justify-between items-center py-1.5 px-2 rounded border border-[var(--color-border)]/50 bg-[var(--background)]/30"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.12 }}
          >
            <span className="text-[var(--color-text-muted)] text-[10px]">{tx.label}</span>
            <span className={tx.debit ? "text-[var(--color-error)]/80" : "text-[var(--color-success)]"}>
              {tx.amount}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ObserveWideVisual() {
  const bars = [22, 35, 28, 42, 38, 52, 45, 58, 50, 65, 55, 70, 60, 68, 62, 75, 65, 72, 68, 80, 72, 78, 70, 76];

  return (
    <div>
      <div className="flex items-center justify-between mb-3 text-[10px] font-mono text-[var(--color-text-muted)]">
        <span>REQUESTS / MIN</span>
        <motion.div
          className="flex items-center gap-1.5 text-[var(--color-success)]"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-success)]" />
          <span>LIVE</span>
        </motion.div>
      </div>
      <svg viewBox="0 0 390 55" className="w-full">
        {bars.map((h, i) => (
          <motion.rect
            key={i}
            x={i * 16 + 2}
            y={55 - h * 0.65}
            width="12"
            height={h * 0.65}
            rx="2"
            fill={h > 65 ? "rgba(200,162,78,0.35)" : "rgba(200,162,78,0.15)"}
            initial={{ height: 0, y: 55 }}
            whileInView={{ height: h * 0.65, y: 55 - h * 0.65 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.025, duration: 0.45, ease: "easeOut" }}
          />
        ))}
        <motion.polyline
          points={bars.map((h, i) => `${i * 16 + 8},${55 - h * 0.65}`).join(" ")}
          fill="none"
          stroke="rgba(200,162,78,0.6)"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 1.5, ease: "easeInOut" }}
        />
      </svg>
      <div className="flex justify-between text-[9px] font-mono text-[var(--color-text-muted)] mt-2">
        {["00:00", "04:00", "08:00", "12:00", "16:00", "20:00", "NOW"].map((t) => (
          <span key={t}>{t}</span>
        ))}
      </div>
    </div>
  );
}

/* Reused from prior iteration — compact for smaller bento cells */

const memoryDots = [
  { x: 28, y: 18, size: 1.5, dur: 2.2, del: 0.1 },
  { x: 52, y: 25, size: 2.0, dur: 3.0, del: 0.4 },
  { x: 38, y: 42, size: 1.2, dur: 2.8, del: 0.8 },
  { x: 75, y: 15, size: 1.8, dur: 3.5, del: 1.2 },
  { x: 95, y: 30, size: 1.3, dur: 2.5, del: 0.3 },
  { x: 110, y: 48, size: 2.2, dur: 3.2, del: 0.9 },
  { x: 45, y: 55, size: 1.6, dur: 2.7, del: 1.5 },
  { x: 68, y: 38, size: 1.9, dur: 3.8, del: 0.6 },
  { x: 82, y: 52, size: 1.4, dur: 2.3, del: 1.8 },
  { x: 30, y: 65, size: 2.1, dur: 3.1, del: 0.2 },
  { x: 55, y: 12, size: 1.1, dur: 2.9, del: 1.0 },
  { x: 100, y: 62, size: 1.7, dur: 3.4, del: 1.4 },
  { x: 115, y: 22, size: 1.3, dur: 2.6, del: 0.7 },
  { x: 42, y: 32, size: 2.3, dur: 3.6, del: 1.1 },
  { x: 88, y: 45, size: 1.5, dur: 2.4, del: 0.5 },
];

function MemoryVisual() {
  return (
    <svg viewBox="0 0 140 80" className="w-full h-full max-w-[200px]">
      {memoryDots.map((d, i) => (
        <motion.circle
          key={i}
          cx={d.x}
          cy={d.y}
          r={d.size}
          fill="rgba(200,162,78,0.3)"
          animate={{ opacity: [0.2, 0.6, 0.2], scale: [1, 1.2, 1] }}
          transition={{ duration: d.dur, delay: d.del, repeat: Infinity }}
        />
      ))}
      <circle cx="45" cy="35" r="18" fill="none" stroke="rgba(200,162,78,0.1)" strokeWidth="0.5" strokeDasharray="3 2" />
      <circle cx="85" cy="40" r="15" fill="none" stroke="rgba(74,144,226,0.1)" strokeWidth="0.5" strokeDasharray="3 2" />
      <circle cx="65" cy="55" r="12" fill="none" stroke="rgba(52,211,153,0.1)" strokeWidth="0.5" strokeDasharray="3 2" />
      <motion.g animate={{ opacity: [0, 1, 1, 0] }} transition={{ duration: 4, repeat: Infinity }}>
        <circle cx="110" cy="15" r="4" fill="rgba(52,211,153,0.2)" stroke="rgba(52,211,153,0.5)" strokeWidth="0.5" />
        <text x="110" y="17" textAnchor="middle" fill="#34d399" fontSize="3.5">Q</text>
        <line x1="106" y1="18" x2="88" y2="32" stroke="#34d399" strokeWidth="0.5" strokeDasharray="2 2" />
      </motion.g>
    </svg>
  );
}

function AuthVisual() {
  return (
    <svg viewBox="0 0 140 80" className="w-full h-full max-w-[200px]">
      <motion.g animate={{ y: [0, -2, 0] }} transition={{ duration: 3, repeat: Infinity }}>
        <rect x="55" y="25" width="30" height="26" rx="3" fill="rgba(200,162,78,0.12)" stroke="rgba(200,162,78,0.4)" strokeWidth="0.5" />
        <path d="M62,25 L62,18 Q62,10 70,10 Q78,10 78,18 L78,25" fill="none" stroke="rgba(200,162,78,0.4)" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="70" cy="36" r="3" fill="#c8a24e" opacity="0.6" />
        <line x1="70" y1="39" x2="70" y2="44" stroke="#c8a24e" strokeWidth="1" opacity="0.6" />
      </motion.g>
      <motion.g animate={{ opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 4, repeat: Infinity }}>
        <rect x="15" y="30" width="24" height="10" rx="2" fill="rgba(74,144,226,0.1)" stroke="rgba(74,144,226,0.3)" strokeWidth="0.5" />
        <text x="27" y="37" textAnchor="middle" fill="#4a90e2" fontSize="4">OIDC</text>
      </motion.g>
      <motion.g animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 4, delay: 1, repeat: Infinity }}>
        <rect x="100" y="30" width="24" height="10" rx="2" fill="rgba(52,211,153,0.1)" stroke="rgba(52,211,153,0.3)" strokeWidth="0.5" />
        <text x="112" y="37" textAnchor="middle" fill="#34d399" fontSize="4">JWT</text>
      </motion.g>
      {[0, 1, 2].map((i) => (
        <motion.rect
          key={i}
          x={38 + i * 24}
          y="58"
          width="18"
          height="12"
          rx="2"
          fill="rgba(90,90,110,0.08)"
          stroke="rgba(200,162,78,0.2)"
          strokeWidth="0.3"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 3, delay: i * 0.5, repeat: Infinity }}
        />
      ))}
      <text x="70" y="67" textAnchor="middle" fill="#5a5a6e" fontSize="3.5">MULTI-TENANT</text>
    </svg>
  );
}

function NotifyVisual() {
  const channels = [
    { icon: "WS", y: 20, color: "#c8a24e" },
    { icon: "SMTP", y: 40, color: "#4a90e2" },
    { icon: "FCM", y: 60, color: "#34d399" },
  ];

  return (
    <svg viewBox="0 0 140 80" className="w-full h-full max-w-[200px]">
      <rect x="10" y="28" width="28" height="24" rx="3" fill="rgba(200,162,78,0.1)" stroke="rgba(200,162,78,0.3)" strokeWidth="0.5" />
      <text x="24" y="38" textAnchor="middle" fill="#c8a24e" fontSize="4" fontWeight="600">NATS</text>
      <text x="24" y="45" textAnchor="middle" fill="#5a5a6e" fontSize="3">EVENT</text>
      {channels.map((ch, i) => (
        <g key={ch.icon}>
          <line x1="38" y1="40" x2="70" y2={ch.y} stroke={`${ch.color}30`} strokeWidth="0.5" />
          <motion.circle
            r="1.2"
            fill={ch.color}
            animate={{ cx: [38, 70], cy: [40, ch.y], opacity: [0, 0.8, 0] }}
            transition={{ duration: 1.2, delay: i * 0.4, repeat: Infinity, repeatDelay: 2 }}
          />
          <rect x="70" y={ch.y - 7} width="22" height="14" rx="2" fill="rgba(90,90,110,0.08)" stroke={`${ch.color}40`} strokeWidth="0.5" />
          <text x="81" y={ch.y + 1} textAnchor="middle" fill={ch.color} fontSize="4" fontWeight="500">{ch.icon}</text>
          <line x1="92" y1={ch.y} x2="115" y2={ch.y} stroke={`${ch.color}30`} strokeWidth="0.5" strokeDasharray="2 2" />
          <motion.circle
            cx="120"
            cy={ch.y}
            r="3"
            fill={`${ch.color}15`}
            stroke={`${ch.color}40`}
            strokeWidth="0.5"
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, delay: 1 + i * 0.3, repeat: Infinity }}
          />
        </g>
      ))}
    </svg>
  );
}
