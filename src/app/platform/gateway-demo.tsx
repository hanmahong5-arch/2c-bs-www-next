"use client";

import { motion } from "framer-motion";

// Code-block warm dark window (#1A1712). ALL text inside must be light — never dark tokens.
// Palette:  primary text #CBC4B4  |  muted #7A7168  |  accent-warm var(--color-ochre)  |  green #A6CE8A  |  red #E07070

// ── cURL request lines ────────────────────────────────────────────────────────
// Grounded in hero.tsx LANG_CODE.sh — same endpoint, same auth header, same body shape.
// SAFE for dangerouslySetInnerHTML: REQUEST_LINES/RESPONSE_LINES 均为编译期静态常量，无用户输入。
const REQUEST_LINES = [
  '<span class="comment"># OpenAI-compatible — 换一行 base_url 即可</span>',
  '<span class="function">curl</span> <span class="string">https://hub.lurus.cn/v1/chat/completions</span> <span class="punctuation">\\</span>',
  '  <span class="property">-H</span> <span class="string">"Authorization: Bearer sk-your-lurus-key"</span> <span class="punctuation">\\</span>',
  '  <span class="property">-H</span> <span class="string">"Content-Type: application/json"</span> <span class="punctuation">\\</span>',
  "  <span class=\"property\">-d</span> <span class=\"string\">'&#123;</span>",
  '    <span class="string">"model"</span><span class="punctuation">: </span><span class="string">"deepseek-v3"</span><span class="punctuation">,</span>',
  '    <span class="string">"messages"</span><span class="punctuation">: [{</span>',
  '      <span class="string">"role"</span><span class="punctuation">: </span><span class="string">"user"</span><span class="punctuation">,</span>',
  '      <span class="string">"content"</span><span class="punctuation">: </span><span class="string">"帮我写一份竞品分析框架"</span>',
  '    <span class="punctuation">}]</span>',
  "  <span class=\"string\">&#125;'</span>",
];

// ── Response lines ────────────────────────────────────────────────────────────
// Grounded in hero.tsx RESPONSE_TEXT — same id prefix, model, routed_via,
// usage object, finish_reason, lurus_meta fields (latency_ms + cost_cny).
// x-lurus-cost-cny / x-lurus-saved-vs-openai seen in quickstart.tsx ResponseWidget.
const RESPONSE_LINES = [
  { indent: 0, text: '<span class="punctuation">{</span>' },
  { indent: 1, text: '<span class="property">"id"</span><span class="punctuation">: </span><span class="string">"lurus-x7k9m"</span><span class="punctuation">,</span>' },
  { indent: 1, text: '<span class="property">"model"</span><span class="punctuation">: </span><span class="string">"deepseek-v3"</span><span class="punctuation">,</span>' },
  { indent: 1, text: '<span class="property">"routed_via"</span><span class="punctuation">: </span><span class="string">"lurus-hub"</span><span class="punctuation">,</span>' },
  { indent: 1, text: '<span class="property">"choices"</span><span class="punctuation">: [{</span>' },
  { indent: 2, text: '<span class="property">"message"</span><span class="punctuation">: {</span>' },
  { indent: 3, text: '<span class="property">"role"</span><span class="punctuation">: </span><span class="string">"assistant"</span><span class="punctuation">,</span>' },
  { indent: 3, text: '<span class="property">"content"</span><span class="punctuation">: </span><span class="string">"竞品分析框架通常包含..."</span>' },
  { indent: 2, text: '<span class="punctuation">},</span>' },
  { indent: 2, text: '<span class="property">"finish_reason"</span><span class="punctuation">: </span><span class="string">"stop"</span>' },
  { indent: 1, text: '<span class="punctuation">}],</span>' },
  { indent: 1, text: '<span class="property">"usage"</span><span class="punctuation">: {</span>' },
  { indent: 2, text: '<span class="property">"prompt_tokens"</span><span class="punctuation">: </span><span class="number">24</span><span class="punctuation">,</span>' },
  { indent: 2, text: '<span class="property">"completion_tokens"</span><span class="punctuation">: </span><span class="number">312</span><span class="punctuation">,</span>' },
  { indent: 2, text: '<span class="property">"total_tokens"</span><span class="punctuation">: </span><span class="number">336</span>' },
  { indent: 1, text: '<span class="punctuation">},</span>' },
  { indent: 1, text: '<span class="property">"lurus_meta"</span><span class="punctuation">: {</span>' },
  { indent: 2, text: '<span class="property">"latency_ms"</span><span class="punctuation">: </span><span class="number">58</span><span class="punctuation">,</span>' },
  { indent: 2, text: '<span class="property">"cost_cny"</span><span class="punctuation">: </span><span class="number">0.0024</span>' },
  { indent: 1, text: '<span class="punctuation">}</span>' },
  { indent: 0, text: '<span class="punctuation">}</span>' },
];

const EASE = [0.16, 1, 0.3, 1] as const;

export function GatewayDemo() {
  return (
    <section className="py-20 border-t border-[var(--color-border)]">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: EASE }}
          className="mb-12"
        >
          <p className="eyebrow mb-3">ONE ENDPOINT</p>
          <h2 className="headline-tight text-3xl md:text-4xl font-bold">
            <span className="text-[var(--color-text-primary)]">一个端点，OpenAI 兼容，</span>
            <span className="text-gradient-gold">响应自带成本</span>
          </h2>
          <p className="mt-4 text-[var(--color-text-secondary)] max-w-xl leading-relaxed">
            把 <code className="font-mono text-[var(--color-ochre)] text-sm">base_url</code> 指向{" "}
            <code className="font-mono text-[0.8em] text-[#CBC4B4]">hub.lurus.cn/v1</code>，
            其余代码零改动。每次调用的延迟、token 用量、人民币成本，字段级返回，无需另查仪表盘。
          </p>
        </motion.div>

        {/* Two-panel layout: left = request, right = response */}
        <div className="grid lg:grid-cols-2 gap-4 items-start">
          {/* ── Left: Request ───────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            className="code-block p-5 relative overflow-hidden shadow-[var(--shadow-window)]"
          >
            {/* Orange edge glow */}
            <div className="absolute inset-0 rounded-xl opacity-40 pointer-events-none">
              <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-br from-[var(--color-ochre)]/25 via-transparent to-[var(--color-ochre)]/10" />
            </div>

            {/* Window chrome */}
            <div className="relative flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
              <div className="flex gap-1.5 shrink-0">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
              </div>
              <span className="text-xs text-[#8A8474] ml-2 font-mono">request.sh</span>
              <span className="ml-auto text-[10px] font-mono px-2 py-0.5 rounded-full border"
                style={{ color: "var(--color-ochre)", borderColor: "rgba(255,93,31,0.25)", background: "rgba(255,93,31,0.07)" }}>
                POST /v1/chat/completions
              </span>
            </div>

            {/* Code lines */}
            <pre className="text-[0.8125rem] leading-[1.8]">
              <code>
                {REQUEST_LINES.map((line, i) => (
                  <motion.div
                    key={i}
                    className="flex"
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.045, duration: 0.25, ease: EASE }}
                  >
                    <span className="line-number hidden sm:block">{i + 1}</span>
                    <span dangerouslySetInnerHTML={{ __html: line || " " }} />
                  </motion.div>
                ))}
              </code>
            </pre>

            <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-[var(--color-ochre)] opacity-[0.08] blur-[60px] pointer-events-none" />
          </motion.div>

          {/* ── Right: Response ─────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            className="code-block p-5 relative overflow-hidden shadow-[var(--shadow-window)]"
          >
            {/* Window chrome */}
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
              <div className="flex gap-1.5 shrink-0">
                <div className="w-3 h-3 rounded-full bg-white/15" />
                <div className="w-3 h-3 rounded-full bg-white/15" />
                <div className="w-3 h-3 rounded-full bg-white/15" />
              </div>
              <span className="text-xs text-[#8A8474] ml-2 font-mono">response.json</span>
              <span className="ml-auto flex items-center gap-2">
                <span className="text-[10px] font-mono font-semibold text-[#7FCBA0]">← 58ms</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#7FCBA0]/10 text-[#7FCBA0] font-mono border border-[#7FCBA0]/25">
                  200 OK
                </span>
              </span>
            </div>

            {/* Metadata strip — same pattern as hero.tsx ResponseDemo */}
            <div className="flex items-center gap-3 mb-4 text-[10px] font-mono text-[#8A8474]">
              <span>deepseek-v3</span>
              <span className="w-px h-2.5 bg-white/10" />
              <span>336 tokens</span>
              <span className="w-px h-2.5 bg-white/10" />
              <span style={{ color: "var(--color-ochre)" }}>¥0.0024</span>
              <span className="w-px h-2.5 bg-white/10" />
              <span>−85% vs GPT-4o</span>
            </div>

            {/* JSON response lines */}
            <pre className="text-[0.8rem] leading-[1.75]">
              <code>
                {RESPONSE_LINES.map(({ indent, text }, i) => (
                  <motion.div
                    key={i}
                    className="flex"
                    initial={{ opacity: 0, x: 8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 + i * 0.04, duration: 0.22, ease: EASE }}
                  >
                    <span className="line-number hidden sm:block">{i + 1}</span>
                    <span
                      style={{ paddingLeft: `${indent * 1.25}em` }}
                      dangerouslySetInnerHTML={{ __html: text }}
                    />
                  </motion.div>
                ))}
              </code>
            </pre>

            {/* Cost callout — highlighted lurus_meta block */}
            <div className="mt-4 pt-3 border-t border-white/10 grid grid-cols-3 gap-3">
              {[
                { label: "finish_reason", value: "stop", color: "#A6CE8A" },
                { label: "lurus_meta.cost_cny", value: "¥0.0024", color: "var(--color-ochre)" },
                { label: "lurus_meta.latency_ms", value: "58ms", color: "#A6CE8A" },
              ].map(({ label, value, color }) => (
                <div key={label} className="text-center">
                  <div className="text-[9px] font-mono text-[#7A7168] mb-0.5">{label}</div>
                  <div className="text-[11px] font-mono font-semibold" style={{ color }}>{value}</div>
                </div>
              ))}
            </div>

            <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-[#7FCBA0] opacity-[0.05] blur-[40px] pointer-events-none" />
          </motion.div>
        </div>

        {/* Bottom footnote */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-6 text-xs text-[var(--color-text-muted)] font-mono text-center"
        >
          端点 <span className="text-[var(--color-ochre)]">https://hub.lurus.cn/v1</span> · 兼容 OpenAI SDK · <span className="text-[#A6CE8A]">lurus_meta</span> 字段每次响应携带，零额外请求
        </motion.p>
      </div>
    </section>
  );
}
