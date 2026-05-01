"use client";

/**
 * Interactive cost calculator — visitor enters their token volume,
 * sees direct-vendor cost vs Lurus smart-routed cost in real time.
 *
 * Number animation note:
 *   trust-band's AnimatedMetric and animated-counter's AnimatedStat both animate
 *   on scroll-into-view (one-shot). This component animates on every slider
 *   change — different lifecycle. We use framer-motion's standalone animate()
 *   directly (same primitive, different trigger). No third counter component.
 */

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, animate } from "framer-motion";
import { fadeInUp } from "@/lib/motion";

// Blended USD per 1M tokens. Mixed input/output, conservative averages.
const PROVIDERS = {
  general: { label: "通用", model: "GPT-4o 直连", price: 10 },
  reasoning: { label: "推理", model: "Claude Sonnet 4.5", price: 9 },
  cost: { label: "成本敏感", model: "Gemini 2.5 Pro", price: 7 },
} as const;
type ProviderKey = keyof typeof PROVIDERS;

// Lurus blended: ~80% routed to DeepSeek/Qwen-class ($0.5/1M), ~20% premium fallback.
const LURUS_PRICE_PER_M = 1.5;
const USD_TO_CNY = 7.2;

// Log-scale slider: position 0..100 maps to tokens 1e5..1e8 (100K..100M).
const LOG_MIN = 5; // 10^5 = 100,000
const LOG_MAX = 8; // 10^8 = 100,000,000
const DEFAULT_TOKENS = 5_000_000;

function positionToTokens(pos: number): number {
  const exp = LOG_MIN + (pos / 100) * (LOG_MAX - LOG_MIN);
  return Math.pow(10, exp);
}

function tokensToPosition(tokens: number): number {
  const exp = Math.log10(tokens);
  return ((exp - LOG_MIN) / (LOG_MAX - LOG_MIN)) * 100;
}

function formatTokens(n: number): string {
  if (n >= 1e8) return `${(n / 1e6).toFixed(0)}M`;
  if (n >= 1e7) return `${(n / 1e6).toFixed(0)}M`;
  if (n >= 1e6) return `${(n / 1e6).toFixed(1).replace(/\.0$/, "")}M`;
  if (n >= 1e3) return `${(n / 1e3).toFixed(0)}K`;
  return `${Math.round(n)}`;
}

function formatCNY(n: number): string {
  // Smooth display: integer ¥, comma-thousands.
  return `¥${Math.round(n).toLocaleString("en-US")}`;
}

/** Animates a numeric value when `value` prop changes. */
function AnimatedCNY({ value, className }: { value: number; className?: string }) {
  const [display, setDisplay] = useState(value);
  const prevRef = useRef(value);

  useEffect(() => {
    const controls = animate(prevRef.current, value, {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(v),
      onComplete: () => {
        prevRef.current = value;
      },
    });
    return () => {
      controls.stop();
      prevRef.current = value;
    };
  }, [value]);

  return <span className={className}>{formatCNY(display)}</span>;
}

/** Animates the "5M tokens" headline number. */
function AnimatedTokens({ value }: { value: number }) {
  const [display, setDisplay] = useState(value);
  const prevRef = useRef(value);

  useEffect(() => {
    const controls = animate(prevRef.current, value, {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(v),
      onComplete: () => {
        prevRef.current = value;
      },
    });
    return () => {
      controls.stop();
      prevRef.current = value;
    };
  }, [value]);

  return <>{formatTokens(display)}</>;
}

export function CostCalculator() {
  const [position, setPosition] = useState<number>(tokensToPosition(DEFAULT_TOKENS));
  const [provider, setProvider] = useState<ProviderKey>("general");

  const tokens = useMemo(() => positionToTokens(position), [position]);

  const directMonthlyCNY = useMemo(() => {
    const usd = (tokens / 1_000_000) * PROVIDERS[provider].price;
    return usd * USD_TO_CNY;
  }, [tokens, provider]);

  const lurusMonthlyCNY = useMemo(() => {
    const usd = (tokens / 1_000_000) * LURUS_PRICE_PER_M;
    return usd * USD_TO_CNY;
  }, [tokens]);

  const savingsMonthly = Math.max(0, directMonthlyCNY - lurusMonthlyCNY);
  const savingsYearly = savingsMonthly * 12;
  const savingsPercent =
    directMonthlyCNY > 0 ? Math.round((savingsMonthly / directMonthlyCNY) * 100) : 0;

  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 -z-10 grid-bg opacity-30" />

      <div className="mx-auto max-w-5xl px-6">
        <motion.div {...fadeInUp} className="text-center mb-14">
          <p className="eyebrow mb-4">ROI</p>
          <h2 className="headline-tight text-3xl md:text-4xl font-bold">
            <span className="text-[var(--color-text-primary)]">省下来的钱，</span>
            <span className="text-gradient-gold">是另一条产品线</span>
          </h2>
          <p className="mt-4 text-[var(--color-text-secondary)] max-w-xl mx-auto">
            拖动滑块，输入你团队真实的调用量。数字不会撒谎。
          </p>
        </motion.div>

        {/* Controls card */}
        <motion.div {...fadeInUp} className="card p-6 md:p-8 mb-6">
          {/* Token volume + slider */}
          <div className="mb-8">
            <div className="flex items-baseline justify-between mb-4">
              <span className="eyebrow">月调用量</span>
              <span className="text-[10px] font-mono text-[var(--color-text-muted)] tracking-wider">
                100K · 1M · 10M · 100M
              </span>
            </div>
            <div className="flex items-baseline gap-3 mb-5">
              <span className="text-5xl md:text-6xl font-bold font-mono text-gradient-gold tabular-nums">
                <AnimatedTokens value={tokens} />
              </span>
              <span className="text-sm text-[var(--color-text-muted)]">tokens / 月</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              step={0.5}
              value={position}
              onChange={(e) => setPosition(parseFloat(e.target.value))}
              aria-label="月调用量"
              className="lurus-slider w-full"
              style={{
                ["--slider-fill" as string]: `${position}%`,
              }}
            />
            {/* Tick marks for log scale reference */}
            <div className="mt-2 flex justify-between text-[10px] font-mono text-[var(--color-text-muted)] tracking-wide select-none">
              <span>100K</span>
              <span>1M</span>
              <span>10M</span>
              <span>100M</span>
            </div>
          </div>

          {/* Provider preset */}
          <div>
            <span className="eyebrow block mb-3">基线对比</span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {(Object.keys(PROVIDERS) as ProviderKey[]).map((key) => {
                const p = PROVIDERS[key];
                const active = provider === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setProvider(key)}
                    aria-pressed={active}
                    className={`text-left px-4 py-3 rounded-lg border transition-all ${
                      active
                        ? "bg-[var(--color-ochre)]/10 border-[var(--color-ochre)]/40 text-[var(--color-text-primary)]"
                        : "bg-[var(--background)]/40 border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-hover)]"
                    }`}
                  >
                    <span
                      className={`block text-xs font-mono mb-1 ${
                        active ? "text-[var(--color-ochre)]" : "text-[var(--color-text-muted)]"
                      }`}
                    >
                      {p.label}
                    </span>
                    <span className="block text-sm font-medium">{p.model}</span>
                    <span className="block text-[11px] font-mono text-[var(--color-text-muted)] mt-0.5">
                      ${p.price.toFixed(2)} / 1M tok
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Cost comparison cards */}
        <div className="grid md:grid-cols-2 gap-5 mb-6">
          {/* Direct — muted red */}
          <motion.div
            {...fadeInUp}
            className="card p-6 md:p-7 relative overflow-hidden"
            style={{
              borderColor: "rgba(239, 68, 68, 0.18)",
              background:
                "linear-gradient(135deg, rgba(239,68,68,0.04) 0%, var(--color-surface) 60%)",
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <p className="eyebrow text-[var(--color-error)]/70">直连方案</p>
              <span className="text-[10px] font-mono text-[var(--color-text-muted)]">
                {PROVIDERS[provider].model}
              </span>
            </div>
            <div className="text-4xl md:text-5xl font-bold font-mono tabular-nums text-[var(--color-text-primary)]/90">
              <AnimatedCNY value={directMonthlyCNY} />
            </div>
            <p className="mt-2 text-sm text-[var(--color-text-muted)]">
              每月成本 · ${PROVIDERS[provider].price.toFixed(2)} / 1M tokens
            </p>
            <div className="absolute -bottom-12 -right-12 w-48 h-48 rounded-full bg-[var(--color-error)] opacity-[0.04] blur-[70px] pointer-events-none" />
          </motion.div>

          {/* Lurus — glowing gold */}
          <motion.div
            {...fadeInUp}
            className="card card-spotlight p-6 md:p-7 relative overflow-hidden"
            style={{
              borderColor: "rgba(200, 162, 78, 0.45)",
              background:
                "linear-gradient(135deg, rgba(200,162,78,0.08) 0%, var(--color-surface) 60%)",
              boxShadow: "0 0 40px rgba(200, 162, 78, 0.10)",
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <p className="eyebrow text-[var(--color-ochre)]">Lurus 智能路由</p>
              <span className="flex items-center gap-1.5 text-[10px] font-mono text-[var(--color-success)]">
                <motion.span
                  className="w-1.5 h-1.5 rounded-full bg-[var(--color-success)]"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                />
                LIVE ROUTING
              </span>
            </div>
            <div className="text-4xl md:text-5xl font-bold font-mono tabular-nums text-gradient-gold">
              <AnimatedCNY value={lurusMonthlyCNY} />
            </div>
            <p className="mt-2 text-sm text-[var(--color-text-muted)]">
              每月成本 · ${LURUS_PRICE_PER_M.toFixed(2)} / 1M tokens 平均
            </p>
            <div className="absolute -bottom-12 -right-12 w-48 h-48 rounded-full bg-[var(--color-ochre)] opacity-[0.10] blur-[70px] pointer-events-none" />
          </motion.div>
        </div>

        {/* Savings headline */}
        <motion.div
          {...fadeInUp}
          className="card p-6 md:p-8 text-center relative overflow-hidden"
          style={{
            borderColor: "rgba(200, 162, 78, 0.25)",
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(200,162,78,0.06) 0%, transparent 70%), var(--color-surface)",
          }}
        >
          <p className="eyebrow mb-3 text-[var(--color-ochre)]/70">YOUR SAVINGS</p>
          <div className="flex flex-col md:flex-row items-baseline justify-center gap-3 md:gap-5">
            <span className="text-sm text-[var(--color-text-secondary)]">节省</span>
            <span className="text-5xl md:text-7xl font-bold font-mono tabular-nums text-gradient-gold leading-none">
              <AnimatedCNY value={savingsMonthly} />
            </span>
            <span className="text-sm text-[var(--color-text-secondary)]">
              / 月 · {savingsPercent}%
            </span>
          </div>
          <p className="mt-4 text-sm text-[var(--color-text-muted)] font-mono tabular-nums">
            ≈ 年省 <AnimatedCNY value={savingsYearly} className="text-[var(--color-text-secondary)]" />
          </p>
          <p className="mt-5 text-[11px] text-[var(--color-text-muted)] max-w-md mx-auto leading-relaxed">
            基于 30 天滚动平均路由数据，实际节省可能高于估算
          </p>
        </motion.div>
      </div>

      {/* Slider styles — scoped to .lurus-slider */}
      <style>{`
        .lurus-slider {
          appearance: none;
          -webkit-appearance: none;
          height: 6px;
          border-radius: 9999px;
          outline: none;
          background: linear-gradient(
            to right,
            var(--color-ochre) 0%,
            var(--color-ochre) var(--slider-fill, 0%),
            var(--color-border) var(--slider-fill, 0%),
            var(--color-border) 100%
          );
          cursor: pointer;
        }
        .lurus-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: var(--color-ochre);
          border: 3px solid var(--background);
          box-shadow:
            0 0 0 1px var(--color-ochre),
            0 0 18px rgba(200, 162, 78, 0.55);
          cursor: grab;
          transition: transform 0.15s ease;
        }
        .lurus-slider::-webkit-slider-thumb:active {
          cursor: grabbing;
          transform: scale(1.1);
        }
        .lurus-slider::-moz-range-thumb {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: var(--color-ochre);
          border: 3px solid var(--background);
          box-shadow:
            0 0 0 1px var(--color-ochre),
            0 0 18px rgba(200, 162, 78, 0.55);
          cursor: grab;
        }
        .lurus-slider:focus-visible::-webkit-slider-thumb {
          box-shadow:
            0 0 0 1px var(--color-ochre),
            0 0 0 4px rgba(200, 162, 78, 0.30),
            0 0 18px rgba(200, 162, 78, 0.55);
        }
      `}</style>
    </section>
  );
}
