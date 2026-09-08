"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ClipboardDocumentIcon,
  CheckIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { stats } from "@/lib/products";
import { HUB_CONSOLE_URL } from "@/lib/links";
import { track } from "@/lib/track";
import { Aurora } from "./aurora";
import { AnimatedStat } from "./animated-counter";

// ── Multi-language code content ──────────────────────────────────────────────

const LANG_CODE = {
  ts: {
    filename: "app.ts",
    plain: `// OpenAI-compatible, 5 min to integrate
import OpenAI from "openai"

const client = new OpenAI({
  baseURL: "https://hub.lurus.cn/v1",
  apiKey: "sk-your-lurus-key"
})

const res = await client.chat.completions.create({
  model: "your-model-id",  // 任一供应商的模型 id
  messages: [{ role: "user", content: "hello" }]
})`,
    lines: [
      '<span class="comment">// OpenAI-compatible, 5 min to integrate</span>',
      '<span class="keyword">import</span> <span class="punctuation">OpenAI</span> <span class="keyword">from</span> <span class="string">"openai"</span>',
      "",
      '<span class="keyword">const</span> <span class="punctuation">client = </span><span class="keyword">new</span> <span class="function">OpenAI</span><span class="punctuation">({</span>',
      '  <span class="property">baseURL</span><span class="punctuation">: </span><span class="string">"https://hub.lurus.cn/v1"</span><span class="punctuation">,</span>',
      '  <span class="property">apiKey</span><span class="punctuation">: </span><span class="string">"sk-your-lurus-key"</span>',
      '<span class="punctuation">})</span>',
      "",
      '<span class="keyword">const</span> <span class="punctuation">res = </span><span class="keyword">await</span> <span class="punctuation">client.chat.completions.</span><span class="function">create</span><span class="punctuation">({</span>',
      '  <span class="property">model</span><span class="punctuation">: </span><span class="string">"your-model-id"</span><span class="punctuation">,  </span><span class="comment">// 任一供应商的模型 id</span>',
      '  <span class="property">messages</span><span class="punctuation">: [{ </span><span class="property">role</span><span class="punctuation">: </span><span class="string">"user"</span><span class="punctuation">, </span><span class="property">content</span><span class="punctuation">: </span><span class="string">"hello"</span><span class="punctuation"> }]</span>',
      '<span class="punctuation">})</span>',
    ],
  },
  py: {
    filename: "app.py",
    plain: `# OpenAI-compatible, 5 min to integrate
from openai import OpenAI

client = OpenAI(
    base_url="https://hub.lurus.cn/v1",
    api_key="sk-your-lurus-key"
)

res = client.chat.completions.create(
    model="your-model-id",  # 任一供应商的模型 id
    messages=[{"role": "user", "content": "hello"}]
)`,
    lines: [
      '<span class="comment"># OpenAI-compatible, 5 min to integrate</span>',
      '<span class="keyword">from</span> <span class="punctuation">openai </span><span class="keyword">import</span> <span class="punctuation">OpenAI</span>',
      "",
      '<span class="punctuation">client = </span><span class="function">OpenAI</span><span class="punctuation">(</span>',
      '  <span class="property">base_url</span><span class="punctuation">=</span><span class="string">"https://hub.lurus.cn/v1"</span><span class="punctuation">,</span>',
      '  <span class="property">api_key</span><span class="punctuation">=</span><span class="string">"sk-your-lurus-key"</span>',
      '<span class="punctuation">)</span>',
      "",
      '<span class="punctuation">res = client.chat.completions.</span><span class="function">create</span><span class="punctuation">(</span>',
      '  <span class="property">model</span><span class="punctuation">=</span><span class="string">"your-model-id"</span><span class="punctuation">,  </span><span class="comment"># 任一供应商的模型 id</span>',
      '  <span class="property">messages</span><span class="punctuation">=[{</span><span class="string">"role"</span><span class="punctuation">: </span><span class="string">"user"</span><span class="punctuation">, </span><span class="string">"content"</span><span class="punctuation">: </span><span class="string">"hello"</span><span class="punctuation">}]</span>',
      '<span class="punctuation">)</span>',
    ],
  },
  sh: {
    filename: "request.sh",
    plain: `# OpenAI-compatible, works immediately
curl https://hub.lurus.cn/v1/chat/completions \\
  -H "Authorization: Bearer sk-your-lurus-key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "your-model-id",
    "messages": [{"role": "user", "content": "hello"}]
  }'`,
    lines: [
      '<span class="comment"># OpenAI-compatible, works immediately</span>',
      '<span class="function">curl</span> <span class="string">https://hub.lurus.cn/v1/chat/completions</span> <span class="punctuation">\\</span>',
      '  <span class="property">-H</span> <span class="string">"Authorization: Bearer sk-your-lurus-key"</span> <span class="punctuation">\\</span>',
      '  <span class="property">-H</span> <span class="string">"Content-Type: application/json"</span> <span class="punctuation">\\</span>',
      "  <span class=\"property\">-d</span> <span class=\"string\">'&#123;</span>",
      '    <span class="string">"model"</span><span class="punctuation">: </span><span class="string">"your-model-id"</span><span class="punctuation">,</span>',
      '    <span class="string">"messages"</span><span class="punctuation">: [{</span>',
      '      <span class="string">"role"</span><span class="punctuation">: </span><span class="string">"user"</span><span class="punctuation">, </span><span class="string">"content"</span><span class="punctuation">: </span><span class="string">"hello"</span>',
      '    <span class="punctuation">}]</span>',
      "  <span class=\"string\">&#125;'</span>",
    ],
  },
  go: {
    filename: "main.go",
    plain: `// OpenAI SDK for Go, 5 min to integrate
client := openai.NewClient(
  option.WithBaseURL("https://hub.lurus.cn/v1"),
  option.WithAPIKey("sk-your-lurus-key"),
)

resp, _ := client.Chat.Completions.New(ctx,
  openai.ChatCompletionNewParams{
    Model: "your-model-id",
    Messages: []openai.ChatCompletionMessageParamUnion{
      openai.UserMessage("hello"),
    },
  },
)`,
    lines: [
      '<span class="comment">// OpenAI SDK for Go, 5 min to integrate</span>',
      '<span class="punctuation">client := openai.</span><span class="function">NewClient</span><span class="punctuation">(</span>',
      '  <span class="punctuation">option.</span><span class="function">WithBaseURL</span><span class="punctuation">(</span><span class="string">"https://hub.lurus.cn/v1"</span><span class="punctuation">),</span>',
      '  <span class="punctuation">option.</span><span class="function">WithAPIKey</span><span class="punctuation">(</span><span class="string">"sk-your-lurus-key"</span><span class="punctuation">),</span>',
      '<span class="punctuation">)</span>',
      "",
      '<span class="punctuation">resp, _ := client.Chat.Completions.</span><span class="function">New</span><span class="punctuation">(ctx,</span>',
      '  <span class="punctuation">openai.</span><span class="function">ChatCompletionNewParams</span><span class="punctuation">{</span>',
      '    <span class="property">Model</span><span class="punctuation">: </span><span class="string">"your-model-id"</span><span class="punctuation">,  </span><span class="comment">// 任一供应商的模型 id</span>',
      '    <span class="property">Messages</span><span class="punctuation">: []openai.ChatCompletionMessageParamUnion{</span>',
      '      <span class="punctuation">openai.</span><span class="function">UserMessage</span><span class="punctuation">(</span><span class="string">"hello"</span><span class="punctuation">),</span>',
      '    <span class="punctuation">},</span>',
      '  <span class="punctuation">},</span>',
      '<span class="punctuation">)</span>',
    ],
  },
} as const;

type LangKey = keyof typeof LANG_CODE;

const LANGS: { id: LangKey; label: string }[] = [
  { id: "ts",  label: "TypeScript" },
  { id: "py",  label: "Python" },
  { id: "sh",  label: "cURL" },
  { id: "go",  label: "Go" },
];

// ── Hero ─────────────────────────────────────────────────────────────────────

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="relative overflow-hidden min-h-[90vh] flex flex-col justify-center noise">
      {/* Background layers — quiet warm wash + faint editorial grid (restraint over spectacle) */}
      <Aurora />
      <div className="absolute inset-0 -z-10 grid-bg opacity-[0.3]" />

      <div className="mx-auto max-w-7xl px-6 pt-16 pb-20 md:pt-20 md:pb-28 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-w-0">
          {/* Left: Copy */}
          <div className="hero-enter-up min-w-0">
            <div
              className="pill mb-8 w-fit hero-enter-up"
              style={{ animationDelay: "0.15s" }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping motion-reduce:animate-none absolute inline-flex h-full w-full rounded-full bg-[var(--color-success)] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-success)]" />
              </span>
              企业 AI 基础设施套件
            </div>

            {/* Headline — 整行入场，CSS 驱动(paint 时即动，不等水合)，使 LCP 文本首屏即绘制。
                原为逐字入场，改掉是因为它带来两个可观测的缺陷：
                ① 4-5 个中文字拆成单字动画收益很低，代价是末字延迟到 0.73s 才出现；
                ② `.sketch-underline` 的波浪线是外层 span 的 background-image，不受子元素
                   动画影响 —— 它先于被它下划的文字显示，首屏最初一秒是一条孤零零的橙线
                   （1440x900 无头截图可复现）。整行入场后下划线与文字同步，延迟压到 0.18s。 */}
            <h1 id="hero-heading" className="headline-tight headline-balance text-4xl md:text-5xl lg:text-[4.25rem] font-bold">
              <span
                className="block text-[var(--color-text-primary)] hero-enter-up"
                style={{ animationDelay: "0.05s" }}
              >
                一行代码
              </span>
              <span
                className="inline-block text-[var(--color-text-primary)] sketch-underline hero-enter-up"
                style={{ animationDelay: "0.18s" }}
              >
                接入所有 AI
              </span>
            </h1>

            <p
              className="mt-6 text-lg text-[var(--color-text-secondary)] max-w-lg leading-[1.65] hero-enter-up"
              style={{ animationDelay: "0.32s" }}
            >
              30+ 家模型供应商，一个端点，一份账单。你的团队只需对接一次。
              <span className="block mt-1.5">
                每个部门的用量、成本与调用日志，实时可查、笔笔可审计。
              </span>
            </p>

            <div
              className="mt-8 hero-enter-up"
              style={{ animationDelay: "1s" }}
            >
              {/* Developer-oriented monospace hint */}
              {/* 不用 `.eyebrow`：该类在 globals.css 里是未分层的普通规则，其
                  text-transform:uppercase 优先级高于 Tailwind v4 @layer utilities 中的
                  normal-case，会把下面这个真实域名渲染成全大写。直接用 utility 即可。 */}
              <p className="mb-3 font-mono tracking-[0.05em] text-[0.7rem] text-[var(--color-text-muted)]">
                <span className="text-[var(--color-ochre)]/70">$</span>{" "}
                <span>curl https://hub.lurus.cn/v1/chat/completions</span>
              </p>

              {/* 两条并列主路径：自助接入（开发者自证）+ 预约演示（企业成交）。
                  刻意不再自称"单一主 CTA" —— 首屏实际可点击去处远不止一个，
                  与其假装收敛，不如把真正带来成交的那条摆到同一层级。 */}
              <div className="flex flex-wrap gap-3">
                <a
                  href={HUB_CONSOLE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="立即接入（Beta 公测）"
                  onClick={() => track("cta_click", { id: "hero_hub" })}
                  className="group btn-primary px-7 text-base"
                >
                  立即接入
                  <span className="rounded bg-white px-1.5 py-px text-[0.6rem] font-semibold uppercase tracking-wider text-[var(--color-ochre-dark)]">
                    Beta
                  </span>
                  <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </a>
                <a
                  href="mailto:sales@lurus.cn?subject=Lurus%20%E6%BC%94%E7%A4%BA%E9%A2%84%E7%BA%A6"
                  onClick={() => track("cta_click", { id: "hero_demo" })}
                  className="btn-secondary px-7 text-base"
                >
                  预约演示
                </a>
              </div>

              {/* Tertiary — clean navigation, no pressure (探索 Lugo 降权至此) */}
              <div className="mt-5 flex flex-wrap items-center gap-5 text-xs text-[var(--color-text-muted)]">
                <Link
                  href="/platform"
                  className="inline-flex items-center min-h-[44px] hover:text-[var(--color-text-secondary)] transition-colors"
                >
                  探索 Lugo →
                </Link>

                <span className="w-px h-3 bg-[var(--color-border)]" />
                <a
                  href="https://docs.lurus.cn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center min-h-[44px] hover:text-[var(--color-text-secondary)] transition-colors"
                >
                  阅读文档
                </a>

                <span className="w-px h-3 bg-[var(--color-border)]" />
                <span>免费额度 $5 · 无需信用卡</span>
              </div>
            </div>
          </div>

          {/* Right: Code demo + streaming response */}
          {/* CSS 驱动进场(见 globals.css .hero-enter-right)：右列是首屏最重要的视觉证据，
              不该等 JS 水合才可见。min-w-0 不可省 —— grid item 的自动最小宽度默认取
              min-content，而代码窗内最长的那行会把整个 grid 在 <480px 时撑到 432px，
              左栏文字随即被 section 的 overflow-hidden 静默裁掉（实测 390px 视口下
              curl 行与"无需信用卡"都丢字）。 */}
          <div
            className="hero-enter-right perspective-[1000px] space-y-3 min-w-0"
            style={{ animationDelay: "0.4s" }}
          >
            <CodeDemo />
            <ResponseDemo />
          </div>
        </div>

        {/* Stats */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
          {stats.map((stat) => (
            <AnimatedStat key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--background)] to-transparent" />
    </section>
  );
}

// ── CodeDemo with multi-language switcher ─────────────────────────────────────

function CodeDemo() {
  const [lang, setLang] = useState<LangKey>("ts");
  const [copied, setCopied] = useState(false);
  // Slow stagger before any interaction, fast snap after user picks a language.
  const [hasInteracted, setHasInteracted] = useState(false);

  const content = LANG_CODE[lang];

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content.plain);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-block p-5 relative overflow-hidden shadow-[var(--shadow-window)]">
      {/* Orange edge glow — warm halo on the dark window */}
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
        <span className="text-xs text-[#8A8474] ml-2 font-mono shrink-0">
          {content.filename}
        </span>

        {/* Language switcher tabs */}
        <div className="flex flex-wrap items-center gap-0.5 gap-y-1 ml-auto">
          {LANGS.map((l) => (
            <button
              key={l.id}
              onClick={() => { setLang(l.id); setHasInteracted(true); }}
              className={`text-[10px] px-2 py-1 rounded font-mono transition-all cursor-pointer ${
                lang === l.id
                  ? "bg-[var(--color-ochre)]/20 text-[var(--color-ochre-light)] border border-[var(--color-ochre)]/30"
                  : "text-[#8A8474] hover:text-[#CBC4B4] hover:bg-white/5"
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>

        {/* Copy button */}
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-[10px] px-2 py-1 rounded-md ml-1 text-[#8A8474] hover:text-[#CBC4B4] hover:bg-white/5 transition-all cursor-pointer shrink-0"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <CheckIcon className="w-3.5 h-3.5 text-[#7FCBA0]" />
              <span className="text-[#7FCBA0] font-mono">copied</span>
            </>
          ) : (
            <>
              <ClipboardDocumentIcon className="w-3.5 h-3.5" />
              <span className="font-mono">copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code content — AnimatePresence handles lang transitions */}
      {/* initial={false} 让首次挂载跳过进场动画 —— 否则 SSR 会把这段代码渲染成
          style="opacity:0"，代码窗（首屏最重要的证据）要等水合才可见。
          语言切换时 key 变化，淡入淡出照常。 */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.pre
          key={lang}
          className="relative text-[0.8125rem] leading-[1.8]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.12 }}
        >
          <code>
            {content.lines.map((line, i) => (
              <motion.div
                key={`${lang}-${i}`}
                className="flex"
                initial={{ x: -8 }}
                animate={{ x: 0 }}
                transition={{
                  delay: !hasInteracted ? 0.8 + i * 0.06 : i * 0.022,
                  duration: 0.25,
                }}
              >
                {/* 行号 <640px 隐藏防代码块横向溢出 */}
                <span className="line-number hidden sm:block">{i + 1}</span>
                <span dangerouslySetInnerHTML={{ __html: line || "\u00A0" }} />
              </motion.div>
            ))}
          </code>
        </motion.pre>
      </AnimatePresence>

      {/* Glow accent */}
      <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-[var(--color-ochre)] opacity-[0.10] blur-[60px]" />
    </div>
  );
}

// ── Streaming response demo ───────────────────────────────────────────────────

const RESPONSE_TEXT = `{
  "id": "lurus-x7k9m",
  "model": "your-model-id",
  "routed_via": "lurus-hub",
  "choices": [{ "message": {
    "role": "assistant",
    "content": "Sure, how can I help you?"
  }, "finish_reason": "stop" }],
  "usage": { "total_tokens": 20 },
  "lurus_meta": { "latency_ms": 42, "cost_cny": 0.0002 }
}`;

function ResponseDemo() {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div ref={ref} className="code-block p-4 relative overflow-hidden shadow-[var(--shadow-lg)]">
      {/* Window chrome */}
      <div className="flex items-center gap-2 mb-3 pb-2.5 border-b border-white/10">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-white/15" />
          <div className="w-3 h-3 rounded-full bg-white/15" />
          <div className="w-3 h-3 rounded-full bg-white/15" />
        </div>
        <span className="text-xs text-[#8A8474] ml-2 font-mono">response.json</span>
        <span className="ml-auto flex items-center gap-2">
          <span className="text-[10px] font-mono font-semibold text-[#7FCBA0]">← 42ms</span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#7FCBA0]/10 text-[#7FCBA0] font-mono border border-[#7FCBA0]/25">
            200 OK
          </span>
          <span className="text-[10px] font-mono text-[#8A8474]">示意</span>
        </span>
      </div>

      {/* Routing metadata strip */}
      <div className="flex items-center gap-3 mb-3 text-[10px] font-mono text-[#8A8474]">
        <span>your-model-id</span>
        <span className="w-px h-2.5 bg-white/10" />
        <span>20 tokens</span>
        <span className="w-px h-2.5 bg-white/10" />
        <span className="text-[var(--color-ochre-light)]">¥0.0002</span>
        <span className="w-px h-2.5 bg-white/10" />
        <span className="text-[#8A8474]">↓ 较通用旗舰模型直连更省</span>
      </div>

      {/* 响应体始终整段渲染 —— 原先用逐字打字机（初始 displayed=0），代价是 SSR 与
          无 JS 场景下这里完全空白，而它正是"接进来之后会拿到什么"的唯一证据。
          "流式"改由末尾的闪烁光标表达，既保住语义又不牺牲首帧可读性。 */}
      <pre className="relative text-[0.7rem] leading-[1.7] text-[#A6CE8A]/85 font-mono overflow-hidden">
        {RESPONSE_TEXT}
        <motion.span
          className="inline-block w-[2px] h-[0.85em] bg-[#A6CE8A]/70 ml-0.5 align-middle"
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        />
      </pre>

      <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-[#7FCBA0] opacity-[0.05] blur-[40px] pointer-events-none" />
    </div>
  );
}
