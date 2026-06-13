"use client";

import type { CSSProperties } from "react";
import { motion } from "framer-motion";

// Code-block warm dark window (#1A1712). ALL text inside must be light — never dark tokens.
// Palette:  primary text  #CBC4B4  |  muted  #7A7168  |  accent-warm  var(--color-ochre)  |  green  #A6CE8A  |  red  #E07070

function KeyWidget() {
  return (
    <div className="mt-5 code-block text-xs font-mono p-4 rounded-lg">
      <div className="flex items-center justify-between mb-3">
        <span
          className="text-[10px] tracking-widest uppercase"
          style={{ color: "#7A7168" }}
        >
          API KEY
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: "#A6CE8A" }} />
          <span className="text-[9px]" style={{ color: "#A6CE8A" }}>ACTIVE</span>
        </span>
      </div>
      {/* Key line */}
      <div className="flex items-center gap-1.5 mb-3">
        <span style={{ color: "var(--color-ochre)" }}>sk-lurus-</span>
        <span
          className="tracking-widest select-none"
          style={{ color: "#7A7168", letterSpacing: "0.16em" }}
        >
          ••••••••••••••••
        </span>
      </div>
      {/* Meta row */}
      <div className="border-t pt-2.5 flex items-center justify-between" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <span style={{ color: "#7A7168", fontSize: "10px" }}>hub.lurus.cn · v1</span>
        <span
          className="text-[9px] px-1.5 py-0.5 rounded"
          style={{ background: "rgba(255,93,31,0.12)", color: "var(--color-ochre)", border: "1px solid rgba(255,93,31,0.2)" }}
        >
          FREE $5
        </span>
      </div>
    </div>
  );
}

function DiffWidget() {
  return (
    <div className="mt-5 code-block text-[11px] font-mono p-4 rounded-lg space-y-1">
      <div className="text-[10px] tracking-widest uppercase mb-3" style={{ color: "#7A7168" }}>
        DIFF — openai_client.py
      </div>
      {/* context line */}
      <div className="flex gap-2 items-start">
        <span className="shrink-0 select-none w-3" style={{ color: "#7A7168" }}> </span>
        <span style={{ color: "#7A7168" }}>client = OpenAI(</span>
      </div>
      {/* removed */}
      <div className="flex gap-2 items-start rounded px-1 -mx-1" style={{ background: "rgba(224,112,112,0.08)" }}>
        <span className="shrink-0 select-none w-3" style={{ color: "#E07070" }}>−</span>
        <span style={{ color: "rgba(224,112,112,0.7)" }}>
          base_url=<span style={{ color: "rgba(224,112,112,0.55)" }}>&quot;https://api.openai.com/v1&quot;</span>,
        </span>
      </div>
      {/* added: baseURL */}
      <div className="flex gap-2 items-start rounded px-1 -mx-1" style={{ background: "rgba(166,206,138,0.07)" }}>
        <span className="shrink-0 select-none w-3" style={{ color: "#A6CE8A" }}>+</span>
        <span style={{ color: "#CBC4B4" }}>
          base_url=<span style={{ color: "#A6CE8A" }}>&quot;https://hub.lurus.cn/v1&quot;</span>,
        </span>
      </div>
      {/* added: api_key */}
      <div className="flex gap-2 items-start rounded px-1 -mx-1" style={{ background: "rgba(166,206,138,0.07)" }}>
        <span className="shrink-0 select-none w-3" style={{ color: "#A6CE8A" }}>+</span>
        <span style={{ color: "#CBC4B4" }}>
          api_key=<span style={{ color: "var(--color-ochre)" }}>os.environ[&quot;LURUS_KEY&quot;]</span>,
        </span>
      </div>
      {/* context line */}
      <div className="flex gap-2 items-start">
        <span className="shrink-0 select-none w-3" style={{ color: "#7A7168" }}> </span>
        <span style={{ color: "#7A7168" }}>)</span>
      </div>
      <div className="mt-2.5 pt-2.5 border-t text-[9px]" style={{ borderColor: "rgba(255,255,255,0.06)", color: "#7A7168" }}>
        其余代码零改动 · OpenAI SDK 完全兼容
      </div>
    </div>
  );
}

function ResponseWidget() {
  return (
    <div className="mt-5 code-block text-[11px] font-mono p-4 rounded-lg">
      <div className="text-[10px] tracking-widest uppercase mb-3" style={{ color: "#7A7168" }}>
        FIRST CALL — response
      </div>
      <div className="space-y-2">
        {/* model */}
        <div className="flex justify-between gap-4">
          <span style={{ color: "#7A7168" }}>model</span>
          <span style={{ color: "var(--color-ochre)" }}>deepseek-v3-0324</span>
        </div>
        {/* status */}
        <div className="flex justify-between gap-4">
          <span style={{ color: "#7A7168" }}>finish_reason</span>
          <span style={{ color: "#A6CE8A" }}>stop</span>
        </div>
        {/* latency */}
        <div className="flex justify-between gap-4">
          <span style={{ color: "#7A7168" }}>latency_ms</span>
          <span style={{ color: "#A6CE8A" }}>42</span>
        </div>
        {/* tokens */}
        <div className="flex justify-between gap-4">
          <span style={{ color: "#7A7168" }}>usage.total_tokens</span>
          <span style={{ color: "#CBC4B4" }}>384</span>
        </div>
        {/* cost */}
        <div className="flex justify-between gap-4">
          <span style={{ color: "#7A7168" }}>x-lurus-cost-cny</span>
          <span style={{ color: "#CBC4B4" }}>¥0.0028</span>
        </div>
        {/* saved */}
        <div
          className="flex justify-between gap-4 mt-1 pt-2 border-t"
          style={{ borderColor: "rgba(255,255,255,0.06)" }}
        >
          <span style={{ color: "#7A7168" }}>x-lurus-saved-vs-openai</span>
          <span style={{ color: "#A6CE8A" }}>−85%</span>
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
    sub: "把 base_url 指向 Lurus，其余代码零改动，兼容 OpenAI SDK。",
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
            style={{
              top: "2.6rem",
              left: "calc(33.33% + 12px)",
              right: "calc(33.33% + 12px)",
              height: "1px",
            }}
          >
            <div className="absolute inset-0 flex items-center">
              <div
                className="w-full border-t border-dashed relative"
                style={{ borderColor: "var(--color-border)" }}
              >
                <span
                  aria-hidden="true"
                  className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-mono"
                  style={{ top: 0, color: "var(--color-ochre)", opacity: 0.3 }}
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
              transition={{ delay: i * 0.13, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="card p-6 relative group transition-all duration-300"
              style={
                {
                  "--hover-border": "rgba(255,93,31,0.25)",
                } as CSSProperties
              }
              whileHover={{ y: -2 }}
            >
              {/* Step badge */}
              <span
                className="inline-block text-[0.65rem] font-mono px-2 py-0.5 rounded mb-3"
                style={{
                  color: "var(--color-ochre)",
                  border: "1px solid rgba(255,93,31,0.25)",
                  background: "rgba(255,93,31,0.07)",
                }}
              >
                {n}
              </span>
              <h3 className="text-base font-semibold mb-1.5" style={{ color: "var(--color-text-primary)" }}>
                {title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                {sub}
              </p>
              <Widget />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
