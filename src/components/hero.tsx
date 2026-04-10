"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { stats } from "@/lib/products";
import { Aurora } from "./aurora";
import { ParticleNetwork } from "./particle-network";
import { AnimatedStat } from "./animated-counter";

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
              transition={{ delay: 0.2 }}
              className="pill mb-8 w-fit"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-success)] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-success)]" />
              </span>
              企业 AI 基础设施套件
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
              <motion.span
                className="text-gradient-gold inline-block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                AI 基础设施
              </motion.span>
              <br />
              <motion.span
                className="text-[var(--color-text-primary)] inline-block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.6 }}
              >
                开箱即用
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-6 text-lg text-[var(--color-text-secondary)] max-w-lg leading-relaxed"
            >
              LLM 网关 · 金融级计费 · AI 记忆引擎 · 智能路由。
              为企业 AI 转型提供全栈后端能力，无需自建。
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Link
                href="/platform"
                className="group relative px-8 py-3.5 rounded-xl bg-gradient-gold text-black font-semibold text-base overflow-hidden transition-all hover:shadow-[0_0_30px_rgba(200,162,78,0.3)]"
              >
                <span className="relative z-10">探索 Platform</span>
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.5 }}
                />
              </Link>
              <a
                href="https://docs.lurus.cn"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 rounded-xl border border-[var(--color-border)] text-[var(--color-text-primary)] font-medium text-base hover:border-[var(--color-ochre)]/50 hover:bg-[var(--color-surface)] transition-all"
              >
                阅读文档
                <span className="inline-block ml-1 opacity-40 text-[10px]">↗</span>
              </a>
            </motion.div>
          </motion.div>

          {/* Right: Code demo */}
          <motion.div
            initial={{ opacity: 0, x: 30, rotateY: -5 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="perspective-[1000px]"
          >
            <CodeDemo />
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
        <span className="ml-auto text-[10px] text-[var(--color-success)] font-mono flex items-center gap-1">
          <span className="w-1 h-1 rounded-full bg-[var(--color-success)]" />
          connected
        </span>
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
