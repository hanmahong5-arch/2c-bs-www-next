"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ClipboardDocumentIcon,
  CheckIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { stats } from "@/lib/products";
import { Aurora } from "./aurora";
import { ParticleNetwork } from "./particle-network";
import { AnimatedStat } from "./animated-counter";

// Anthropic-style spring — fast attack, slow settle.
// Words land with authority, not flair.
const EDITORIAL_EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  return (
    <section className="relative overflow-hidden min-h-[90vh] flex flex-col justify-center">
      {/* Background layers */}
      <Aurora />
      <ParticleNetwork className="-z-5 opacity-60" />
      <div className="absolute inset-0 -z-10 grid-bg" />

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

            {/* Headline — word-level staggered reveal with editorial easing.
                Attack fast, settle slow — like words placed deliberately. */}
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
                    className="text-gradient-gold inline-block"
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
              38 个模型统一网关，p50 延迟 &lt;80ms，金融级计费精度到 ¥0.0001。你的产品只需一个 API Key，其余交给 Lurus。
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, ease: EDITORIAL_EASE }}
              className="mt-8"
            >
              {/* Developer-oriented monospace hint above primary CTA */}
              <p className="eyebrow mb-3 font-mono normal-case tracking-[0.05em] text-[0.7rem]">
                <span className="text-[var(--color-ochre)]/70">$</span>{" "}
                <span className="text-[var(--color-text-muted)]">curl https://api.lurus.cn/v1/chat/completions</span>
              </p>

              <div className="flex flex-wrap gap-3">
                <a
                  href="https://api.lurus.cn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative px-7 py-3.5 rounded-xl bg-gradient-gold text-black font-semibold text-base overflow-hidden transition-all hover:shadow-[0_0_30px_rgba(200,162,78,0.3)] flex items-center gap-2"
                >
                  <span className="relative z-10">立即接入</span>
                  <ArrowRightIcon className="w-4 h-4 relative z-10 transition-transform group-hover:translate-x-0.5" />
                  <motion.div
                    className="absolute inset-0 bg-white/20"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.5 }}
                  />
                </a>
                <Link
                  href="/platform"
                  className="px-7 py-3.5 rounded-xl border border-[var(--color-border)] text-[var(--color-text-primary)] font-medium text-base hover:border-[var(--color-ochre)]/50 hover:bg-[var(--color-surface)] transition-all"
                >
                  探索 Platform
                </Link>
              </div>

              {/* Tertiary — understated, for CTO/procurement audience */}
              <div className="mt-5 flex items-center gap-5 text-xs text-[var(--color-text-muted)]">
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

function CodeDemo() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(plainCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-block p-5 relative overflow-hidden shadow-2xl shadow-black/50">
      {/* Glow border effect */}
      <div className="absolute inset-0 rounded-xl opacity-30">
        <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-br from-[var(--color-ochre)]/20 via-transparent to-[var(--color-ochre)]/10" />
      </div>

      {/* Window chrome */}
      <div className="relative flex items-center gap-2 mb-4 pb-3 border-b border-[var(--color-border)]">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <span className="text-xs text-[var(--color-text-muted)] ml-2 font-mono">
          app.ts
        </span>

        <span className="ml-auto text-[10px] text-[var(--color-success)] font-mono flex items-center gap-1 mr-2">
          <span className="w-1 h-1 rounded-full bg-[var(--color-success)]" />
          connected
        </span>

        {/* Copy button */}
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-[10px] px-2 py-1 rounded-md text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface)] transition-all cursor-pointer"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <CheckIcon className="w-3.5 h-3.5 text-[var(--color-success)]" />
              <span className="text-[var(--color-success)] font-mono">copied</span>
            </>
          ) : (
            <>
              <ClipboardDocumentIcon className="w-3.5 h-3.5" />
              <span className="font-mono">copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code content with staggered reveal */}
      <pre className="relative text-[0.8125rem] leading-[1.8]">
        <code>
          {codeLines.map((line, i) => (
            <motion.div
              key={i}
              className="flex"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + i * 0.06 }}
            >
              <span className="line-number">{i + 1}</span>
              <span dangerouslySetInnerHTML={{ __html: line }} />
            </motion.div>
          ))}
        </code>
      </pre>

      {/* Glow accent */}
      <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-[var(--color-ochre)] opacity-[0.06] blur-[60px]" />
    </div>
  );
}

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
    // Start after code lines finish animating (~1.5s) plus a brief pause
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
    <div ref={ref} className="code-block p-4 relative overflow-hidden">
      {/* Window chrome — inactive (gray dots) to signal "response" tab */}
      <div className="flex items-center gap-2 mb-3 pb-2.5 border-b border-[var(--color-border)]">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[var(--color-border)]" />
          <div className="w-3 h-3 rounded-full bg-[var(--color-border)]" />
          <div className="w-3 h-3 rounded-full bg-[var(--color-border)]" />
        </div>
        <span className="text-xs text-[var(--color-text-muted)] ml-2 font-mono">response.json</span>
        <span className="ml-auto flex items-center gap-2">
          <span className="text-[10px] font-mono font-semibold text-[var(--color-success)]">← 42ms</span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--color-success)]/10 text-[var(--color-success)] font-mono border border-[var(--color-success)]/20">
            200 OK
          </span>
        </span>
      </div>

      {/* Routing metadata strip */}
      <div className="flex items-center gap-3 mb-3 text-[10px] font-mono text-[var(--color-text-muted)]">
        <span>deepseek-v3</span>
        <span className="w-px h-2.5 bg-[var(--color-border)]" />
        <span>20 tokens</span>
        <span className="w-px h-2.5 bg-[var(--color-border)]" />
        <span className="text-[var(--color-ochre)]">¥0.0002</span>
        <span className="w-px h-2.5 bg-[var(--color-border)]" />
        <span className="text-[var(--color-text-muted)]">↓ 较 GPT-4o 节省 85%</span>
      </div>

      {/* Streaming response text */}
      <pre className="text-[0.7rem] leading-[1.7] text-[var(--color-success)]/65 font-mono overflow-hidden">
        {RESPONSE_TEXT.slice(0, displayed)}
        {displayed < RESPONSE_TEXT.length && (
          <motion.span
            className="inline-block w-[2px] h-[0.85em] bg-[var(--color-success)]/60 ml-0.5 align-middle"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          />
        )}
      </pre>

      {/* Subtle green glow */}
      <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-[var(--color-success)] opacity-[0.04] blur-[40px] pointer-events-none" />
    </div>
  );
}

const plainCode = `// OpenAI-compatible, 5 min to integrate
import OpenAI from "openai"

const client = new OpenAI({
  baseURL: "https://api.lurus.cn/v1",
  apiKey: "sk-your-lurus-key"
})

const res = await client.chat.completions.create({
  model: "gpt-4o",  // or claude-4, deepseek-v3...
  messages: [{ role: "user", content: "hello" }]
})`;

const codeLines = [
  '<span class="comment">// OpenAI-compatible, 5 min to integrate</span>',
  '<span class="keyword">import</span> <span class="punctuation">OpenAI</span> <span class="keyword">from</span> <span class="string">"openai"</span>',
  "",
  '<span class="keyword">const</span> <span class="punctuation">client = </span><span class="keyword">new</span> <span class="function">OpenAI</span><span class="punctuation">({</span>',
  '  <span class="property">baseURL</span><span class="punctuation">: </span><span class="string">"https://api.lurus.cn/v1"</span><span class="punctuation">,</span>',
  '  <span class="property">apiKey</span><span class="punctuation">: </span><span class="string">"sk-your-lurus-key"</span>',
  '<span class="punctuation">})</span>',
  "",
  '<span class="keyword">const</span> <span class="punctuation">res = </span><span class="keyword">await</span> <span class="punctuation">client.</span><span class="property">chat</span><span class="punctuation">.</span><span class="property">completions</span><span class="punctuation">.</span><span class="function">create</span><span class="punctuation">({</span>',
  '  <span class="property">model</span><span class="punctuation">: </span><span class="string">"gpt-4o"</span><span class="punctuation">,</span>  <span class="comment">// or claude-4, deepseek-v3...</span>',
  '  <span class="property">messages</span><span class="punctuation">: [{ </span><span class="property">role</span><span class="punctuation">: </span><span class="string">"user"</span><span class="punctuation">, </span><span class="property">content</span><span class="punctuation">: </span><span class="string">"hello"</span><span class="punctuation"> }]</span>',
  '<span class="punctuation">})</span>',
];
