"use client";

import { motion } from "framer-motion";

function KeyWidget() {
  return (
    <div className="mt-5 code-block text-xs font-mono p-3 rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[var(--color-text-muted)] text-[10px] tracking-widest">API KEY</span>
        <span className="inline-block w-2 h-2 rounded-full bg-green-400 opacity-70" />
      </div>
      <div className="flex items-center gap-1">
        <span className="text-[var(--color-ochre)]">sk-lurus-</span>
        <span
          className="text-[var(--color-text-muted)] select-none tracking-widest"
          style={{ letterSpacing: "0.18em" }}
        >
          ••••••••••••••••
        </span>
      </div>
    </div>
  );
}

function DiffWidget() {
  return (
    <div className="mt-5 code-block text-[11px] font-mono p-3 rounded-lg space-y-1.5">
      <div className="text-[var(--color-text-muted)] text-[10px] tracking-widest mb-2">DIFF</div>
      {/* removed line */}
      <div className="flex gap-2 items-start bg-red-500/5 rounded px-1 -mx-1">
        <span className="text-red-400/70 shrink-0 select-none">-</span>
        <span className="text-[var(--color-text-muted)]/60 break-all">
          baseURL:{" "}
          <span className="text-emerald-400/50">&quot;api.openai.com/v1&quot;</span>
        </span>
      </div>
      {/* added lines */}
      <div className="flex gap-2 items-start bg-green-500/5 rounded px-1 -mx-1">
        <span className="text-green-400 shrink-0 select-none">+</span>
        <span className="text-[var(--color-text-muted)] break-all">
          baseURL:{" "}
          <span className="text-emerald-400">&quot;api.lurus.cn/v1&quot;</span>
        </span>
      </div>
      <div className="flex gap-2 items-start bg-green-500/5 rounded px-1 -mx-1">
        <span className="text-green-400 shrink-0 select-none">+</span>
        <span className="text-[var(--color-text-muted)]">
          apiKey:{" "}
          <span className="text-[var(--color-ochre)]">process.env.LURUS_KEY</span>
        </span>
      </div>
    </div>
  );
}

function ResponseWidget() {
  return (
    <div className="mt-5 code-block text-xs font-mono p-3 rounded-lg">
      <div className="text-[var(--color-text-muted)] text-[10px] tracking-widest mb-2">FIRST CALL</div>
      <div className="space-y-1.5">
        <div className="flex justify-between gap-4">
          <span className="text-[var(--color-text-muted)]">model</span>
          <span className="text-[var(--color-ochre)] truncate">deepseek-v3</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-[var(--color-text-muted)]">latency</span>
          <span className="text-green-400">42 ms</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-[var(--color-text-muted)]">vs. OpenAI</span>
          <span className="text-[var(--color-text-primary)]">节省 85%</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-[var(--color-text-muted)]">cost</span>
          <span className="text-[var(--color-text-muted)]">¥0.0028</span>
        </div>
      </div>
    </div>
  );
}

const STEPS = [
  {
    n: "01",
    title: "注册，获取 Key",
    sub: "填一个邮箱，30 秒生成访问密钥。免费额度 $5，无需绑卡。",
    Widget: KeyWidget,
  },
  {
    n: "02",
    title: "替换两行代码",
    sub: "把 baseURL 指向 Lurus，其余代码零改动，兼容 OpenAI SDK。",
    Widget: DiffWidget,
  },
  {
    n: "03",
    title: "观察第一次响应",
    sub: "延迟、成本、模型——每次调用完全透明，实时可查。",
    Widget: ResponseWidget,
  },
];

export function QuickStart() {
  return (
    <section className="py-20 relative">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="eyebrow mb-4">QUICKSTART</p>
          <h2 className="headline-tight text-3xl md:text-4xl font-bold">
            <span className="text-[var(--color-text-primary)]">五分钟以内，</span>
            <span className="text-gradient-gold">进入生产</span>
          </h2>
        </motion.div>

        <div className="relative grid md:grid-cols-3 gap-6">
          {/* Step connector lines (desktop only) */}
          <div
            aria-hidden="true"
            className="hidden md:block absolute"
            style={{ top: "2.6rem", left: "calc(33.33% + 12px)", right: "calc(33.33% + 12px)", height: "1px" }}
          >
            {/* Left connector */}
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-dashed border-[var(--color-border)] relative">
                {/* Arrow right at midpoint */}
                <span
                  className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 text-[var(--color-ochre)] opacity-30 text-xs font-mono"
                  style={{ top: 0 }}
                >
                  →
                </span>
              </div>
            </div>
          </div>

          {STEPS.map(({ n, title, sub, Widget }, i) => (
            <motion.div
              key={n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.13, duration: 0.5 }}
              className="card p-6 relative group hover:border-[var(--color-ochre)]/25 transition-colors duration-300"
            >
              {/* Step badge */}
              <span className="inline-block text-[0.65rem] font-mono text-[var(--color-ochre)] border border-[var(--color-ochre)]/25 bg-[var(--color-ochre)]/8 px-2 py-0.5 rounded mb-3">
                {n}
              </span>
              <h3 className="text-base font-semibold text-[var(--color-text-primary)] mb-1.5">
                {title}
              </h3>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{sub}</p>
              <Widget />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
