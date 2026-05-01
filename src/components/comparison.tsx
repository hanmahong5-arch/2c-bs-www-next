"use client";

import { motion } from "framer-motion";
import { XCircleIcon, CheckCircleIcon } from "@heroicons/react/20/solid";

const rows = [
  { aspect: "LLM 接入", without: "逐个对接 API，各家格式不同，调试周期以周计", with: "一个 API Key，30+ 模型，OpenAI 兼容格式" },
  { aspect: "计费系统", without: "自建钱包 + 订阅 + 支付对接，代码量 5,000+", with: "金融级精度，充值/扣款/退款开箱即用" },
  { aspect: "用户认证", without: "自己搭 SSO / RBAC，安全漏洞风险自担", with: "Zitadel OIDC 一键集成，多租户隔离" },
  { aspect: "AI 记忆", without: "无状态聊天，用户每次从零开始，留存差", with: "向量化持久记忆，个性化 AI 助手" },
  { aspect: "可观测性", without: "自建 Grafana + Prometheus，维护成本高", with: "全链路追踪，预配置仪表盘，零运维" },
  { aspect: "上线周期", without: "3–6 个月工程投入", with: "5 分钟接入，当天上线" },
];

// Paths from app box center (195, 70) to each dependency box — deliberately uneven
const appToDepPaths = [
  "M 195 70 C 155 95, 90 108, 60 125",
  "M 185 70 C 172 102, 158 128, 148 145",
  "M 205 70 C 225 98, 250 118, 262 130",
  "M 218 70 C 278 90, 345 113, 367 138",
];

// Cross-wires between dependency boxes — the mess
const crossWirePaths = [
  "M 100 138 L 148 150",
  "M 186 156 C 218 152, 235 146, 226 143",
  "M 298 143 L 329 148",
  "M 100 142 L 329 148",
  "M 186 158 L 329 152",
];

// Provider boxes in the right panel, centered around x=602
const providers = [
  { label: "OpenAI",   x: 479, cx: 506 },
  { label: "Claude",   x: 543, cx: 570 },
  { label: "DeepSeek", x: 607, cx: 634 },
  { label: "+ 35",     x: 671, cx: 698 },
];

function ComparisonDiagram() {
  return (
    <motion.div
      className="relative rounded-2xl border border-[var(--color-border)] overflow-hidden mb-14 bg-[var(--color-surface)]/40"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {/* Compact text alternative for narrow screens — SVG labels become unreadable below 640px */}
      <div className="sm:hidden grid grid-cols-2 divide-x divide-[var(--color-border)]">
        <div className="p-5 text-center">
          <p className="text-[10px] font-mono text-[var(--color-error)]/55 tracking-[0.2em] mb-2">自行搭建</p>
          <p className="text-2xl font-bold font-mono text-[var(--color-error)]/70">5+</p>
          <p className="text-[11px] text-[var(--color-text-muted)] mt-1">供应商 · 套接口</p>
          <p className="text-[10px] text-[var(--color-text-muted)]/60 mt-2">3–6 个月接入</p>
        </div>
        <div className="p-5 text-center">
          <p className="text-[10px] font-mono text-[var(--color-ochre)]/70 tracking-[0.2em] mb-2">LURUS</p>
          <p className="text-2xl font-bold font-mono text-gradient-gold">1</p>
          <p className="text-[11px] text-[var(--color-text-muted)] mt-1">端点 · 一套接口</p>
          <p className="text-[10px] text-[var(--color-success)]/65 mt-2">今晚接入 · 明天上线</p>
        </div>
      </div>
      <svg
        viewBox="0 0 800 258"
        className="hidden sm:block w-full"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="lurusBoxGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(200,162,78,0.16)" />
            <stop offset="100%" stopColor="rgba(200,162,78,0.04)" />
          </linearGradient>
          <filter id="goldSoftGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Panel backgrounds */}
        <rect x="0"   y="0" width="400" height="258" fill="rgba(239,68,68,0.028)" />
        <rect x="400" y="0" width="400" height="258" fill="rgba(200,162,78,0.022)" />

        {/* Divider */}
        <line x1="400" y1="16" x2="400" y2="242"
          stroke="rgba(255,255,255,0.07)" strokeWidth="1" strokeDasharray="5 5" />

        {/* VS badge */}
        <circle cx="400" cy="130" r="15"
          fill="#111117" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        <text x="400" y="134.5" textAnchor="middle"
          fill="rgba(255,255,255,0.25)" fontSize="8"
          fontFamily="var(--font-geist-mono)" fontWeight="700">VS</text>

        {/* ───────── LEFT: Chaos ───────── */}
        <text x="200" y="22" textAnchor="middle"
          fill="rgba(239,68,68,0.45)" fontSize="8"
          fontFamily="var(--font-geist-mono)" letterSpacing="3">自行搭建</text>

        {/* App box */}
        <rect x="147" y="40" width="96" height="28" rx="6"
          fill="rgba(90,90,110,0.18)" stroke="rgba(90,90,110,0.32)" strokeWidth="0.5" />
        <text x="195" y="58" textAnchor="middle"
          fill="rgba(237,237,240,0.65)" fontSize="9" fontFamily="var(--font-geist-sans)">您的应用</text>

        {/* Lines: App → dependencies (chaotic cubic beziers) */}
        {appToDepPaths.map((d, i) => (
          <motion.path
            key={`ap-${i}`} d={d}
            fill="none" stroke="rgba(239,68,68,0.38)" strokeWidth="0.8" strokeDasharray="5 3"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 + i * 0.12, duration: 0.65 }}
          />
        ))}

        {/* Cross-wires between dependencies */}
        {crossWirePaths.map((d, i) => (
          <motion.path
            key={`cw-${i}`} d={d}
            fill="none" stroke="rgba(239,68,68,0.17)" strokeWidth="0.55" strokeDasharray="2 4"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.72 + i * 0.07, duration: 0.45 }}
          />
        ))}

        {/* Dependency boxes (deliberately scattered heights) */}
        {[
          { label: "LLM API ×3", x: 20,  y: 125, w: 80, cx: 60,  cy: 138 },
          { label: "计费系统",    x: 110, y: 143, w: 76, cx: 148, cy: 156 },
          { label: "身份认证",    x: 226, y: 128, w: 72, cx: 262, cy: 141 },
          { label: "监控告警",    x: 329, y: 138, w: 72, cx: 365, cy: 151 },
        ].map((b, i) => (
          <motion.g key={b.label}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 + i * 0.12 }}
          >
            <rect x={b.x} y={b.y} width={b.w} height="26" rx="5"
              fill="rgba(239,68,68,0.07)" stroke="rgba(239,68,68,0.24)" strokeWidth="0.5" />
            <text x={b.cx} y={b.cy + 3} textAnchor="middle"
              fill="rgba(239,68,68,0.65)" fontSize="7.5" fontFamily="var(--font-geist-sans)">{b.label}</text>
          </motion.g>
        ))}

        {/* Cost annotation */}
        <motion.text x="200" y="198" textAnchor="middle"
          fill="rgba(239,68,68,0.35)" fontSize="7.5" fontFamily="var(--font-geist-mono)"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1.05 }}
        >5,000+ 行代码 · 独立维护 · 持续告警</motion.text>
        <motion.text x="200" y="212" textAnchor="middle"
          fill="rgba(239,68,68,0.22)" fontSize="7" fontFamily="var(--font-geist-mono)"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1.15 }}
        >接入周期 3–6 个月</motion.text>

        {/* ───────── RIGHT: Lurus ───────── */}
        <text x="602" y="22" textAnchor="middle"
          fill="rgba(200,162,78,0.55)" fontSize="8"
          fontFamily="var(--font-geist-mono)" letterSpacing="3">LURUS</text>

        {/* App box */}
        <rect x="554" y="40" width="96" height="28" rx="6"
          fill="rgba(90,90,110,0.18)" stroke="rgba(90,90,110,0.32)" strokeWidth="0.5" />
        <text x="602" y="58" textAnchor="middle"
          fill="rgba(237,237,240,0.65)" fontSize="9" fontFamily="var(--font-geist-sans)">您的应用</text>

        {/* Single clean line: App → Lurus */}
        <motion.path d="M 602 68 L 602 110"
          fill="none" stroke="rgba(200,162,78,0.72)" strokeWidth="1.5"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.3 }}
        />
        {/* Animated data packet */}
        <motion.circle r="2.2" fill="rgba(200,162,78,0.9)" cx="602"
          animate={{ cy: [68, 110], opacity: [0, 1, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 1.3, ease: "easeInOut" }}
        />

        {/* Lurus platform box */}
        <motion.g
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.42, duration: 0.4 }}
        >
          <rect x="468" y="110" width="268" height="80" rx="12"
            fill="url(#lurusBoxGrad)" stroke="rgba(200,162,78,0.4)" strokeWidth="1" />
          <text x="602" y="138" textAnchor="middle"
            fill="rgba(200,162,78,1)" fontSize="13"
            fontFamily="var(--font-geist-sans)" fontWeight="700"
            filter="url(#goldSoftGlow)">Lurus</text>
          <text x="602" y="157" textAnchor="middle"
            fill="rgba(200,162,78,0.42)" fontSize="7" fontFamily="var(--font-geist-mono)" letterSpacing="0.3">
            路由 · 计费 · 记忆 · 认证 · 通知 · 可观测性
          </text>
          {/* "One line" badge */}
          <rect x="566" y="166" width="72" height="14" rx="7"
            fill="rgba(52,211,153,0.09)" stroke="rgba(52,211,153,0.22)" strokeWidth="0.5" />
          <text x="602" y="176" textAnchor="middle"
            fill="rgba(52,211,153,0.65)" fontSize="6.5" fontFamily="var(--font-geist-mono)">一行配置</text>
        </motion.g>

        {/* Lines: Lurus → providers (clean fan) */}
        {providers.map((p, i) => (
          <motion.path
            key={`pl-${p.label}`}
            d={`M 602 190 L ${p.cx} 226`}
            fill="none" stroke="rgba(200,162,78,0.22)" strokeWidth="0.8"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.62 + i * 0.08, duration: 0.36 }}
          />
        ))}

        {/* Provider boxes */}
        {providers.map((p, i) => (
          <motion.g key={`pb-${p.label}`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.64 + i * 0.08 }}
          >
            <rect x={p.x} y="226" width="54" height="20" rx="5"
              fill="rgba(90,90,110,0.12)" stroke="rgba(200,162,78,0.2)" strokeWidth="0.5" />
            <text x={p.cx} y="239" textAnchor="middle"
              fill="rgba(200,162,78,0.55)" fontSize="7.5" fontFamily="var(--font-geist-sans)">{p.label}</text>
          </motion.g>
        ))}

        {/* Success annotation */}
        <motion.text x="602" y="254" textAnchor="middle"
          fill="rgba(52,211,153,0.42)" fontSize="7.5" fontFamily="var(--font-geist-mono)"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1.1 }}
        >今晚接入 · 明天上线</motion.text>
      </svg>
    </motion.div>
  );
}

export function Comparison() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 grid-bg opacity-30" />

      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="eyebrow mb-4">BUILD VS BUY</p>
          <h2 className="headline-tight text-3xl md:text-4xl font-bold">
            <span className="text-[var(--color-text-primary)]">你的竞争对手</span>
            <span className="text-gradient-gold">，正在用这三个月开发功能</span>
          </h2>
          <p className="mt-4 text-[var(--color-text-secondary)] max-w-lg mx-auto">
            LLM 对接、计费系统、身份认证、可观测性——每一层都要写代码，每一层都要维护。这些时间，本可以花在产品上。
          </p>
        </motion.div>

        {/* Visual diagram: chaos vs clarity */}
        <ComparisonDiagram />

        {/* Column headers — desktop only (mobile uses inline labels per cell) */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="hidden md:grid grid-cols-[1fr_1.2fr_1.2fr] gap-4 mb-3 px-1"
        >
          <div />
          <div className="flex items-center gap-2 px-4">
            <XCircleIcon className="w-4 h-4 text-[var(--color-error)]/60 shrink-0" />
            <span className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider">自己搭建</span>
          </div>
          <div className="flex items-center gap-2 px-4">
            <CheckCircleIcon className="w-4 h-4 text-[var(--color-success)] shrink-0" />
            <span className="text-xs font-semibold text-[var(--color-ochre)] uppercase tracking-wider">用 Lurus</span>
          </div>
        </motion.div>

        <div className="space-y-3 md:space-y-2.5">
          {rows.map((row, i) => (
            <motion.div
              key={row.aspect}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr_1.2fr] gap-2 md:gap-4 md:items-stretch rounded-xl md:rounded-none border border-[var(--color-border)]/40 md:border-0 p-3 md:p-0 bg-[var(--color-surface)]/30 md:bg-transparent"
            >
              <div className="flex items-center text-sm font-semibold md:font-medium text-[var(--color-text-primary)] md:pr-4 md:py-3">
                {row.aspect}
              </div>
              <div className="rounded-lg md:rounded-xl px-3 md:px-4 py-2.5 md:py-3 bg-[var(--color-error)]/5 border border-[var(--color-error)]/10">
                {/* Mobile-only inline label */}
                <div className="md:hidden text-[10px] font-mono uppercase tracking-wider text-[var(--color-error)]/55 mb-1">自己搭建</div>
                <div className="flex items-start gap-2">
                  <XCircleIcon className="w-4 h-4 text-[var(--color-error)]/60 mt-0.5 shrink-0" />
                  <span className="text-sm text-[var(--color-text-muted)]">{row.without}</span>
                </div>
              </div>
              <div className="rounded-lg md:rounded-xl px-3 md:px-4 py-2.5 md:py-3 bg-[var(--color-success)]/5 border border-[var(--color-success)]/10">
                <div className="md:hidden text-[10px] font-mono uppercase tracking-wider text-[var(--color-ochre)]/70 mb-1">用 Lurus</div>
                <div className="flex items-start gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-[var(--color-success)] mt-0.5 shrink-0" />
                  <span className="text-sm text-[var(--color-text-secondary)]">{row.with}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Savings callout */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="inline-flex flex-wrap items-center justify-center gap-6 card border-beam px-8 py-6 glow-ochre">
            <div className="text-center">
              <div className="text-3xl font-bold font-mono text-gradient-gold">~90%</div>
              <div className="text-xs text-[var(--color-text-muted)] mt-0.5">开发时间节省</div>
            </div>
            <div className="w-px h-10 bg-[var(--color-border)] hidden sm:block" />
            <div className="text-center">
              <div className="text-3xl font-bold font-mono text-gradient-gold">~70%</div>
              <div className="text-xs text-[var(--color-text-muted)] mt-0.5">基础设施成本降低</div>
            </div>
            <div className="w-px h-10 bg-[var(--color-border)] hidden sm:block" />
            <div className="text-center">
              <div className="text-3xl font-bold font-mono text-gradient-gold">0</div>
              <div className="text-xs text-[var(--color-text-muted)] mt-0.5">运维工程师需求</div>
            </div>
            <div className="w-px h-10 bg-[var(--color-border)] hidden sm:block" />
            <div className="text-center">
              <div className="text-3xl font-bold font-mono text-gradient-gold">5 min</div>
              <div className="text-xs text-[var(--color-text-muted)] mt-0.5">从零到接入完成</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
