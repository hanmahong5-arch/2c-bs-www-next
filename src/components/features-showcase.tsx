"use client";

import { motion } from "framer-motion";

const capabilities = [
  {
    title: "智能路由",
    description: "像导航软件选最快路线一样——实时评估延迟、错误率、成本，自动把请求送上最优渠道。",
    metric: "<100ms",
    metricLabel: "路由决策延迟",
    visual: <RouterVisual />,
  },
  {
    title: "金融级计费",
    description:
      "像银行系统一样严谨——每一分钱的流动都有迹可循，钱包、订阅、预授权全覆盖。",
    metric: "0.0001",
    metricLabel: "最小计费粒度",
    visual: <BillingVisual />,
  },
  {
    title: "AI 记忆",
    description:
      "AI 的海马体——让每次对话不再从零开始。你的用户会觉得在和一个真正了解自己的助手交流。",
    metric: "∞",
    metricLabel: "上下文持久化",
    visual: <MemoryVisual />,
  },
  {
    title: "事件通知",
    description:
      "像 114 查号台——无论用户在哪（App / 邮件 / 浏览器），消息总能送达。",
    metric: "3",
    metricLabel: "通知通道",
    visual: <NotifyVisual />,
  },
  {
    title: "企业认证",
    description:
      "一把钥匙开所有门——单点登录 + 多租户隔离，你的用户只需登录一次。",
    metric: "SSO",
    metricLabel: "开箱即用",
    visual: <AuthVisual />,
  },
  {
    title: "可观测性",
    description:
      "像飞机驾驶舱仪表盘——每个请求的延迟、成本、错误，一目了然。",
    metric: "100%",
    metricLabel: "请求可追踪",
    visual: <ObserveVisual />,
  },
];

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
          <h2 className="text-3xl md:text-4xl font-bold">
            <span className="text-[var(--color-text-primary)]">
              不止于网关，
            </span>
            <span className="text-gradient-gold">全栈 AI 后端</span>
          </h2>
          <p className="mt-4 text-[var(--color-text-secondary)] max-w-xl mx-auto">
            六大核心能力，覆盖企业 AI 应用的完整后端需求
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {capabilities.map((cap, i) => (
            <motion.div
              key={cap.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="card p-6 group overflow-hidden relative"
            >
              {/* Animated visual */}
              <div className="h-32 mb-4 flex items-center justify-center overflow-hidden rounded-lg bg-[var(--background)]/50">
                {cap.visual}
              </div>

              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
                  {cap.title}
                </h3>
                <div className="text-right shrink-0 ml-3">
                  <div className="text-lg font-bold text-gradient-gold">
                    {cap.metric}
                  </div>
                  <div className="text-[9px] text-[var(--color-text-muted)] uppercase tracking-wider">
                    {cap.metricLabel}
                  </div>
                </div>
              </div>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                {cap.description}
              </p>

              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-[var(--color-ochre)] opacity-[0.06] blur-[40px]" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Animated SVG visuals for each feature */

function RouterVisual() {
  const channels = [
    { x: 20, label: "A", delay: 0, score: 92 },
    { x: 45, label: "B", delay: 0.3, score: 87 },
    { x: 70, label: "C", delay: 0.6, score: 95 },
  ];

  return (
    <svg viewBox="0 0 140 80" className="w-full h-full max-w-[200px]">
      {/* Input */}
      <motion.circle
        cx="70"
        cy="12"
        r="5"
        fill="rgba(200,162,78,0.2)"
        stroke="rgba(200,162,78,0.5)"
        strokeWidth="0.5"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <text x="70" y="14" textAnchor="middle" fill="#c8a24e" fontSize="5" fontWeight="600">
        req
      </text>

      {/* Connections to channels */}
      {channels.map((ch) => (
        <g key={ch.label}>
          <line x1="70" y1="17" x2={ch.x} y2="38" stroke="rgba(200,162,78,0.15)" strokeWidth="0.5" strokeDasharray="2 2" />
          <motion.circle
            r="1"
            fill="#c8a24e"
            animate={{
              cx: [70, ch.x],
              cy: [17, 38],
              opacity: [0, 0.8, 0],
            }}
            transition={{ duration: 1.5, delay: ch.delay, repeat: Infinity, repeatDelay: 1 }}
          />
        </g>
      ))}

      {/* Channel boxes */}
      {channels.map((ch) => (
        <g key={ch.label}>
          <rect
            x={ch.x - 12}
            y="38"
            width="24"
            height="14"
            rx="2"
            fill={ch.score >= 95 ? "rgba(52,211,153,0.1)" : "rgba(90,90,110,0.1)"}
            stroke={ch.score >= 95 ? "rgba(52,211,153,0.3)" : "rgba(90,90,110,0.2)"}
            strokeWidth="0.5"
          />
          <text x={ch.x} y="47" textAnchor="middle" fill="#a0a0b0" fontSize="4.5">
            Ch {ch.label}
          </text>
          <text x={ch.x} y="50.5" textAnchor="middle" fill={ch.score >= 95 ? "#34d399" : "#5a5a6e"} fontSize="3">
            {ch.score}%
          </text>
        </g>
      ))}

      {/* Selected indicator */}
      <motion.rect
        x={channels[2].x - 13}
        y="37"
        width="26"
        height="16"
        rx="3"
        fill="none"
        stroke="#34d399"
        strokeWidth="0.8"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Arrow down from selected */}
      <motion.path
        d={`M${channels[2].x},54 L${channels[2].x},66`}
        stroke="#34d399"
        strokeWidth="0.8"
        strokeDasharray="3 2"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <text x={channels[2].x} y="73" textAnchor="middle" fill="#34d399" fontSize="4" fontWeight="600">
        BEST
      </text>
    </svg>
  );
}

function BillingVisual() {
  return (
    <svg viewBox="0 0 140 80" className="w-full h-full max-w-[200px]">
      {/* Wallet icon */}
      <rect x="45" y="10" width="50" height="32" rx="4" fill="rgba(200,162,78,0.08)" stroke="rgba(200,162,78,0.3)" strokeWidth="0.5" />
      <rect x="70" y="20" width="18" height="12" rx="2" fill="rgba(200,162,78,0.15)" stroke="rgba(200,162,78,0.4)" strokeWidth="0.5" />
      <circle cx="80" cy="26" r="2" fill="#c8a24e" opacity="0.6" />

      {/* Balance display */}
      <motion.text
        x="60"
        y="28"
        textAnchor="middle"
        fill="#c8a24e"
        fontSize="7"
        fontWeight="700"
        fontFamily="var(--font-geist-mono)"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        ¥1,024
      </motion.text>

      {/* Transaction lines */}
      {[0, 1, 2].map((i) => (
        <motion.g
          key={i}
          initial={{ opacity: 0, x: -5 }}
          animate={{ opacity: [0, 1, 1, 0], x: [0, 0, 0, 5] }}
          transition={{ duration: 3, delay: i * 0.8, repeat: Infinity, repeatDelay: 2 }}
        >
          <rect x="45" y={50 + i * 10} width="50" height="6" rx="1.5" fill="rgba(90,90,110,0.1)" />
          <text x="48" y={54.5 + i * 10} fill="#5a5a6e" fontSize="3">
            {["gpt-4o 消耗", "claude-4 消耗", "充值到账"][i]}
          </text>
          <text x="92" y={54.5 + i * 10} textAnchor="end" fill={i === 2 ? "#34d399" : "#ef4444"} fontSize="3">
            {["-¥0.12", "-¥0.08", "+¥100"][i]}
          </text>
        </motion.g>
      ))}
    </svg>
  );
}

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
  { x: 60, y: 58, size: 1.8, dur: 3.3, del: 1.6 },
  { x: 25, y: 48, size: 1.2, dur: 2.1, del: 1.3 },
  { x: 72, y: 28, size: 2.0, dur: 3.7, del: 0.0 },
  { x: 105, y: 38, size: 1.6, dur: 2.8, del: 1.7 },
  { x: 48, y: 68, size: 1.4, dur: 3.0, del: 0.8 },
];

function MemoryVisual() {
  return (
    <svg viewBox="0 0 140 80" className="w-full h-full max-w-[200px]">
      {/* Vector space dots */}
      {memoryDots.map((d, i) => (
        <motion.circle
          key={i}
          cx={d.x}
          cy={d.y}
          r={d.size}
          fill="rgba(200,162,78,0.3)"
          animate={{
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: d.dur,
            delay: d.del,
            repeat: Infinity,
          }}
        />
      ))}

      {/* Cluster circles */}
      <circle cx="45" cy="35" r="18" fill="none" stroke="rgba(200,162,78,0.1)" strokeWidth="0.5" strokeDasharray="3 2" />
      <circle cx="85" cy="40" r="15" fill="none" stroke="rgba(74,144,226,0.1)" strokeWidth="0.5" strokeDasharray="3 2" />
      <circle cx="65" cy="55" r="12" fill="none" stroke="rgba(52,211,153,0.1)" strokeWidth="0.5" strokeDasharray="3 2" />

      {/* Query arrow */}
      <motion.g
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <circle cx="110" cy="15" r="4" fill="rgba(52,211,153,0.2)" stroke="rgba(52,211,153,0.5)" strokeWidth="0.5" />
        <text x="110" y="17" textAnchor="middle" fill="#34d399" fontSize="3.5">Q</text>
        <motion.line
          x1="106"
          y1="18"
          x2="88"
          y2="32"
          stroke="#34d399"
          strokeWidth="0.5"
          strokeDasharray="2 2"
          animate={{ opacity: [0, 1] }}
          transition={{ duration: 1, delay: 0.5, repeat: Infinity, repeatDelay: 3 }}
        />
      </motion.g>
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
      {/* Event source */}
      <rect x="10" y="28" width="28" height="24" rx="3" fill="rgba(200,162,78,0.1)" stroke="rgba(200,162,78,0.3)" strokeWidth="0.5" />
      <text x="24" y="38" textAnchor="middle" fill="#c8a24e" fontSize="4" fontWeight="600">NATS</text>
      <text x="24" y="45" textAnchor="middle" fill="#5a5a6e" fontSize="3">EVENT</text>

      {/* Fan-out lines */}
      {channels.map((ch, i) => (
        <g key={ch.icon}>
          <motion.line
            x1="38"
            y1="40"
            x2="70"
            y2={ch.y}
            stroke={`${ch.color}30`}
            strokeWidth="0.5"
          />
          <motion.circle
            r="1.2"
            fill={ch.color}
            animate={{
              cx: [38, 70],
              cy: [40, ch.y],
              opacity: [0, 0.8, 0],
            }}
            transition={{ duration: 1.2, delay: i * 0.4, repeat: Infinity, repeatDelay: 2 }}
          />

          {/* Channel box */}
          <rect x="70" y={ch.y - 7} width="22" height="14" rx="2" fill="rgba(90,90,110,0.08)" stroke={`${ch.color}40`} strokeWidth="0.5" />
          <text x="81" y={ch.y + 1} textAnchor="middle" fill={ch.color} fontSize="4" fontWeight="500">
            {ch.icon}
          </text>

          {/* Output arrow */}
          <motion.line
            x1="92"
            y1={ch.y}
            x2="115"
            y2={ch.y}
            stroke={`${ch.color}30`}
            strokeWidth="0.5"
            strokeDasharray="2 2"
          />
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

function AuthVisual() {
  return (
    <svg viewBox="0 0 140 80" className="w-full h-full max-w-[200px]">
      {/* Lock icon */}
      <motion.g
        animate={{ y: [0, -2, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <rect x="55" y="25" width="30" height="26" rx="3" fill="rgba(200,162,78,0.12)" stroke="rgba(200,162,78,0.4)" strokeWidth="0.5" />
        <path d="M62,25 L62,18 Q62,10 70,10 Q78,10 78,18 L78,25" fill="none" stroke="rgba(200,162,78,0.4)" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="70" cy="36" r="3" fill="#c8a24e" opacity="0.6" />
        <line x1="70" y1="39" x2="70" y2="44" stroke="#c8a24e" strokeWidth="1" opacity="0.6" />
      </motion.g>

      {/* OIDC / JWT labels */}
      <motion.g
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <rect x="15" y="30" width="24" height="10" rx="2" fill="rgba(74,144,226,0.1)" stroke="rgba(74,144,226,0.3)" strokeWidth="0.5" />
        <text x="27" y="37" textAnchor="middle" fill="#4a90e2" fontSize="4">OIDC</text>
      </motion.g>

      <motion.g
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 4, delay: 1, repeat: Infinity }}
      >
        <rect x="100" y="30" width="24" height="10" rx="2" fill="rgba(52,211,153,0.1)" stroke="rgba(52,211,153,0.3)" strokeWidth="0.5" />
        <text x="112" y="37" textAnchor="middle" fill="#34d399" fontSize="4">JWT</text>
      </motion.g>

      {/* Tenant boxes */}
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
      <text x="70" y="67" textAnchor="middle" fill="#5a5a6e" fontSize="3.5">
        MULTI-TENANT
      </text>
    </svg>
  );
}

function ObserveVisual() {
  const bars = [35, 55, 42, 68, 50, 72, 45, 60, 38, 65, 48, 58];

  return (
    <svg viewBox="0 0 140 80" className="w-full h-full max-w-[200px]">
      {/* Chart bars */}
      {bars.map((h, i) => (
        <motion.rect
          key={i}
          x={18 + i * 9}
          y={75 - h * 0.7}
          width="5"
          height={h * 0.7}
          rx="1"
          fill={h > 60 ? "rgba(200,162,78,0.3)" : "rgba(200,162,78,0.15)"}
          initial={{ height: 0, y: 75 }}
          whileInView={{ height: h * 0.7, y: 75 - h * 0.7 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05, duration: 0.5, ease: "easeOut" }}
        />
      ))}

      {/* Trend line */}
      <motion.polyline
        points={bars.map((h, i) => `${20.5 + i * 9},${75 - h * 0.7}`).join(" ")}
        fill="none"
        stroke="#c8a24e"
        strokeWidth="0.8"
        opacity="0.5"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 1 }}
      />

      {/* Labels */}
      <text x="12" y="10" fill="#5a5a6e" fontSize="3.5" fontFamily="var(--font-geist-mono)">
        REQUESTS / MIN
      </text>
      <motion.text
        x="120"
        y="10"
        textAnchor="end"
        fill="#34d399"
        fontSize="5"
        fontWeight="600"
        fontFamily="var(--font-geist-mono)"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        LIVE
      </motion.text>
    </svg>
  );
}
