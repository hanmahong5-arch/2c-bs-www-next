"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ClipboardDocumentIcon,
  CheckIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { stats } from "@/lib/products";
import { Aurora } from "./aurora";
import { AnimatedStat } from "./animated-counter";

// Anthropic-style spring — fast attack, slow settle.
const EDITORIAL_EASE = [0.16, 1, 0.3, 1] as const;

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
  model: "gpt-4o",  // or claude-4, deepseek-v3...
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
      '  <span class="property">model</span><span class="punctuation">: </span><span class="string">"gpt-4o"</span><span class="punctuation">,  </span><span class="comment">// or claude-4, deepseek-v3...</span>',
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
    model="gpt-4o",  # or claude-4, deepseek-v3...
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
      '  <span class="property">model</span><span class="punctuation">=</span><span class="string">"gpt-4o"</span><span class="punctuation">,  </span><span class="comment"># or claude-4, deepseek-v3...</span>',
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
    "model": "gpt-4o",
    "messages": [{"role": "user", "content": "hello"}]
  }'`,
    lines: [
      '<span class="comment"># OpenAI-compatible, works immediately</span>',
      '<span class="function">curl</span> <span class="string">https://hub.lurus.cn/v1/chat/completions</span> <span class="punctuation">\\</span>',
      '  <span class="property">-H</span> <span class="string">"Authorization: Bearer sk-your-lurus-key"</span> <span class="punctuation">\\</span>',
      '  <span class="property">-H</span> <span class="string">"Content-Type: application/json"</span> <span class="punctuation">\\</span>',
      "  <span class=\"property\">-d</span> <span class=\"string\">'&#123;</span>",
      '    <span class="string">"model"</span><span class="punctuation">: </span><span class="string">"gpt-4o"</span><span class="punctuation">,</span>',
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
    Model: "gpt-4o",
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
      '    <span class="property">Model</span><span class="punctuation">: </span><span class="string">"gpt-4o"</span><span class="punctuation">,  </span><span class="comment">// claude-4, deepseek-v3...</span>',
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
    <section className="relative overflow-hidden min-h-[90vh] flex flex-col justify-center noise">
      {/* Background layers — quiet warm wash + faint editorial grid (restraint over spectacle) */}
      <Aurora />
      <div className="absolute inset-0 -z-10 grid-bg opacity-[0.55]" />

      <div className="mx-auto max-w-7xl px-6 pt-16 pb-20 md:pt-20 md:pb-28 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Copy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, ease: EDITORIAL_EASE }}
              className="pill mb-8 w-fit"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-success)] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-success)]" />
              </span>
              企业 AI 基础设施套件
            </motion.div>

            {/* Headline — word-level staggered reveal */}
            <motion.h1
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.06, delayChildren: 0.25 } },
              }}
              className="headline-tight headline-balance text-4xl md:text-5xl lg:text-[4.25rem] font-bold"
            >
              <span className="block">
                {"一行代码".split("").map((ch, i) => (
                  <motion.span
                    key={`l1-${i}`}
                    className="text-[var(--color-text-primary)] inline-block"
                    variants={{
                      hidden: { opacity: 0, y: 24 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.7, ease: EDITORIAL_EASE },
                      },
                    }}
                  >
                    {ch}
                  </motion.span>
                ))}
              </span>
              <span className="block text-[var(--color-text-primary)]">
                {"接入所有 AI".split("").map((ch, i) => (
                  <motion.span
                    key={`l2-${i}`}
                    className="inline-block"
                    variants={{
                      hidden: { opacity: 0, y: 24 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.7, ease: EDITORIAL_EASE },
                      },
                    }}
                  >
                    {ch === " " ? "\u00A0" : ch}
                  </motion.span>
                ))}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.6, ease: EDITORIAL_EASE }}
              className="mt-6 text-lg text-[var(--color-text-secondary)] max-w-lg leading-[1.65]"
            >
              30+ 模型供应商，一个端点，路由 p50 100ms 以内——你的团队只需对接一次。
              <span className="block mt-1.5">
                每个部门的用量、成本与调用日志，实时可查、笔笔可审计。
              </span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, ease: EDITORIAL_EASE }}
              className="mt-8"
            >
              {/* Developer-oriented monospace hint */}
              <p className="eyebrow mb-3 font-mono normal-case tracking-[0.05em] text-[0.7rem]">
                <span className="text-[var(--color-ochre)]/70">$</span>{" "}
                <span className="text-[var(--color-text-muted)]">curl https://hub.lurus.cn/v1/chat/completions</span>
              </p>

              <div className="flex flex-wrap gap-3">
                <a
                  href="https://hub.lurus.cn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group btn-primary px-7 text-base"
                >
                  立即接入
                  <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </a>
                <Link
                  href="/platform"
                  className="btn-secondary px-7 text-base font-medium"
                >
                  探索 Platform
                </Link>
              </div>

              {/* Tertiary — clean navigation, no pressure */}
              <div className="mt-5 flex flex-wrap items-center gap-5 text-xs text-[var(--color-text-muted)]">
                <a
                  href="mailto:sales@lurus.cn?subject=Lurus%20%E6%BC%94%E7%A4%BA%E9%A2%84%E7%BA%A6"
                  className="hover:text-[var(--color-text-secondary)] transition-colors"
                >
                  预约演示 →
                </a>
                <span className="w-px h-3 bg-[var(--color-border)]" />
                <a
                  href="https://docs.lurus.cn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--color-text-secondary)] transition-colors"
                >
                  阅读文档
                </a>
                <span className="w-px h-3 bg-[var(--color-border)]" />
                <Link
                  href="/kova"
                  className="hover:text-[var(--color-text-secondary)] transition-colors"
                >
                  构建 Agent？Kova 引擎 WAL 崩溃恢复 →
                </Link>
                <span className="w-px h-3 bg-[var(--color-border)]" />
                <span>免费额度 $5 · 无需信用卡</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Code demo + streaming response */}
          <motion.div
            initial={{ opacity: 0, x: 30, rotateY: -5 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="perspective-[1000px] space-y-3"
          >
            <CodeDemo />
            <ResponseDemo />
          </motion.div>
        </div>

        {/* Stats */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + i * 0.1 }}
            >
              <AnimatedStat value={stat.value} label={stat.label} />
            </motion.div>
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
      <AnimatePresence mode="wait">
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
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
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
  "model": "deepseek-v3",
  "routed_via": "lurus-hub",
  "choices": [{
    "message": {
      "role": "assistant",
      "content": "Sure, how can I help you?"
    },
    "finish_reason": "stop"
  }],
  "usage": {
    "prompt_tokens": 12,
    "completion_tokens": 8,
    "total_tokens": 20
  },
  "lurus_meta": {
    "latency_ms": 42,
    "cost_cny": 0.0002
  }
}`;

function ResponseDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;
    const timeoutId = setTimeout(() => {
      let i = 0;
      intervalId = setInterval(() => {
        i += 4;
        setDisplayed(Math.min(i, RESPONSE_TEXT.length));
        if (i >= RESPONSE_TEXT.length) clearInterval(intervalId);
      }, 16);
    }, 1500);
    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, []);

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
        </span>
      </div>

      {/* Routing metadata strip */}
      <div className="flex items-center gap-3 mb-3 text-[10px] font-mono text-[#8A8474]">
        <span>deepseek-v3</span>
        <span className="w-px h-2.5 bg-white/10" />
        <span>20 tokens</span>
        <span className="w-px h-2.5 bg-white/10" />
        <span className="text-[var(--color-ochre-light)]">¥0.0002</span>
        <span className="w-px h-2.5 bg-white/10" />
        <span className="text-[#8A8474]">↓ 较 GPT-4o 节省 85%</span>
      </div>

      {/* Streaming response text */}
      <pre className="text-[0.7rem] leading-[1.7] text-[#A6CE8A]/85 font-mono overflow-hidden">
        {RESPONSE_TEXT.slice(0, displayed)}
        {displayed < RESPONSE_TEXT.length && (
          <motion.span
            className="inline-block w-[2px] h-[0.85em] bg-[#A6CE8A]/70 ml-0.5 align-middle"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          />
        )}
      </pre>

      <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-[#7FCBA0] opacity-[0.05] blur-[40px] pointer-events-none" />
    </div>
  );
}
