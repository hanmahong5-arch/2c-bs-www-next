"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  BoltIcon,
  BanknotesIcon,
  CircleStackIcon,
  ChartBarIcon,
  WrenchScrewdriverIcon,
  ArrowsRightLeftIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline";
import type { ComponentType, SVGProps } from "react";
import { productGroups } from "@/lib/products";

type HeroIcon = ComponentType<SVGProps<SVGSVGElement>>;

const productIcons: Record<string, HeroIcon> = {
  hub: BoltIcon,
  billing: BanknotesIcon,
  memorus: CircleStackIcon,
  lucrum: ChartBarIcon,
  kova: WrenchScrewdriverIcon,
  switch: ArrowsRightLeftIcon,
  creator: VideoCameraIcon,
};

// Priority badge colors
const priorityStyle: Record<string, string> = {
  P0: "bg-[var(--color-ochre)]/15 text-[var(--color-ochre)] border-[var(--color-ochre)]/25",
  P1: "bg-[var(--color-accent)]/10 text-[var(--color-accent)] border-[var(--color-accent)]/20",
  P2: "bg-[var(--color-text-muted)]/10 text-[var(--color-text-muted)] border-[var(--color-text-muted)]/20",
};

// Three-tier architecture map: P0 foundation → P1 verticals → P2 desktop clients
// Connection lines show "built on" dependency direction.
function EcosystemMap() {
  // P0 (foundation row) — y=138
  const p0 = [
    { id: "hub",     label: "Hub",     sub: "P0", x: 120, cx: 160, cy: 148 },
    { id: "billing", label: "Billing", sub: "P0", x: 272, cx: 312, cy: 148 },
    { id: "memory",  label: "Memory",  sub: "P0", x: 478, cx: 518, cy: 148 },
    { id: "auth",    label: "Auth",    sub: "P0", x: 660, cx: 700, cy: 148 },
  ];
  // P1 (vertical solutions) — y=80
  const p1 = [
    { id: "kova",   label: "Kova",   sub: "P1", x: 196, cx: 240, cy: 93 },
    { id: "lucrum", label: "Lucrum", sub: "P1", x: 574, cx: 618, cy: 93 },
  ];
  // P2 (desktop clients) — y=22
  const p2 = [
    { id: "switch",  label: "Switch",  sub: "P2", x: 110, cx: 154, cy: 35 },
    { id: "creator", label: "Creator", sub: "P2", x: 666, cx: 710, cy: 35 },
  ];

  // P0 horizontal backbone connections
  const p0Backbone = [
    `M 200 148 L 272 148`,  // Hub → Billing
    `M 352 148 L 478 148`,  // Billing → Memory
    `M 558 148 L 660 148`,  // Memory → Auth
  ];
  // P0 → P1 upward connections
  const p0ToP1 = [
    `M 160 138 L 240 106`,   // Hub → Kova
    `M 518 138 L 618 106`,   // Memory → Lucrum
  ];
  // P1 → P2 upward connections
  const p1ToP2 = [
    `M 240 80 L 154 48`,   // Kova → Switch
    `M 618 80 L 710 48`,   // Lucrum → Creator
  ];

  // Animated pulse positions along backbone (data flowing rightward through P0)
  const pulses = [
    { path: "M 200 148 L 272 148", delay: 0 },
    { path: "M 352 148 L 478 148", delay: 0.4 },
    { path: "M 558 148 L 660 148", delay: 0.8 },
  ];

  const tierLabel = (x: number, y: number, text: string) => (
    <text x={x} y={y} textAnchor="middle"
      fill="rgba(200,162,78,0.22)" fontSize="6.5"
      fontFamily="var(--font-geist-mono)" letterSpacing="2">{text}</text>
  );

  return (
    <motion.div
      className="relative rounded-2xl border border-[var(--color-border)] overflow-hidden mb-14 bg-[var(--color-surface)]/40"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* Mobile: compact tier outline (SVG too dense below md) */}
      <div className="md:hidden p-5 space-y-4">
        <div>
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--color-text-muted)]/60 mb-2">P2 · 桌面工具</p>
          <div className="flex flex-wrap gap-2">
            {["Switch", "Creator"].map((n) => (
              <span key={n} className="px-3 py-1 rounded-md bg-[var(--color-text-muted)]/10 border border-[var(--color-text-muted)]/20 text-xs text-[var(--color-text-secondary)]">{n}</span>
            ))}
          </div>
        </div>
        <div className="text-[var(--color-ochre)]/30 text-center text-[10px] font-mono">↑ 构建于</div>
        <div>
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--color-accent)]/60 mb-2">P1 · 垂直产品</p>
          <div className="flex flex-wrap gap-2">
            {["Kova", "Lucrum"].map((n) => (
              <span key={n} className="px-3 py-1 rounded-md bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/25 text-xs text-[var(--color-accent)]">{n}</span>
            ))}
          </div>
        </div>
        <div className="text-[var(--color-ochre)]/30 text-center text-[10px] font-mono">↑ 构建于</div>
        <div>
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--color-ochre)]/70 mb-2">P0 · 核心基础设施</p>
          <div className="flex flex-wrap gap-2">
            {["Hub", "Billing", "Memory", "Auth"].map((n) => (
              <span key={n} className="px-3 py-1 rounded-md bg-[var(--color-ochre)]/12 border border-[var(--color-ochre)]/25 text-xs text-[var(--color-ochre)] font-medium">{n}</span>
            ))}
          </div>
        </div>
      </div>
      <svg viewBox="0 0 820 178" className="hidden md:block w-full" aria-hidden="true">
        <defs>
          <linearGradient id="p0BgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(200,162,78,0.06)" />
            <stop offset="100%" stopColor="rgba(200,162,78,0.02)" />
          </linearGradient>
        </defs>

        {/* P0 foundation band */}
        <rect x="100" y="128" width="620" height="36" rx="8"
          fill="rgba(200,162,78,0.04)" stroke="rgba(200,162,78,0.1)" strokeWidth="0.5" />

        {/* Tier labels on the right */}
        {tierLabel(800, 150, "P0")}
        {tierLabel(800, 93,  "P1")}
        {tierLabel(800, 35,  "P2")}

        {/* P0 backbone connections */}
        {p0Backbone.map((d, i) => (
          <motion.path key={`p0b-${i}`} d={d}
            fill="none" stroke="rgba(200,162,78,0.3)" strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
          />
        ))}

        {/* Animated data packets on P0 backbone */}
        {pulses.map((p, i) => {
          // Extract start and end x from path string
          const parts = p.path.match(/[\d.]+/g)!.map(Number);
          return (
            <motion.circle key={`pulse-${i}`} r="2" fill="rgba(200,162,78,0.8)" cy="148"
              animate={{ cx: [parts[0], parts[2]], opacity: [0, 0.9, 0] }}
              transition={{ duration: 1.2, delay: p.delay, repeat: Infinity, repeatDelay: 2.5, ease: "easeInOut" }}
            />
          );
        })}

        {/* P0 → P1 connections */}
        {p0ToP1.map((d, i) => (
          <motion.path key={`p01-${i}`} d={d}
            fill="none" stroke="rgba(200,162,78,0.2)" strokeWidth="0.8" strokeDasharray="3 3"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
          />
        ))}

        {/* P1 → P2 connections */}
        {p1ToP2.map((d, i) => (
          <motion.path key={`p12-${i}`} d={d}
            fill="none" stroke="rgba(200,162,78,0.15)" strokeWidth="0.7" strokeDasharray="3 4"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 + i * 0.1, duration: 0.5 }}
          />
        ))}

        {/* P0 product nodes */}
        {p0.map((node, i) => (
          <motion.g key={node.id}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 + i * 0.08 }}
          >
            <rect x={node.x} y="130" width="80" height="32" rx="6"
              fill="rgba(200,162,78,0.1)" stroke="rgba(200,162,78,0.32)" strokeWidth="0.6" />
            <text x={node.cx} y="150" textAnchor="middle"
              fill="rgba(200,162,78,0.85)" fontSize="9" fontFamily="var(--font-geist-sans)" fontWeight="600">{node.label}</text>
          </motion.g>
        ))}

        {/* P1 product nodes */}
        {p1.map((node, i) => (
          <motion.g key={node.id}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35 + i * 0.1 }}
          >
            <rect x={node.x} y="72" width="88" height="30" rx="6"
              fill="rgba(74,144,226,0.08)" stroke="rgba(74,144,226,0.28)" strokeWidth="0.6" />
            <text x={node.cx} y="91" textAnchor="middle"
              fill="rgba(74,144,226,0.8)" fontSize="9" fontFamily="var(--font-geist-sans)" fontWeight="600">{node.label}</text>
          </motion.g>
        ))}

        {/* P2 product nodes */}
        {p2.map((node, i) => (
          <motion.g key={node.id}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.55 + i * 0.1 }}
          >
            <rect x={node.x} y="18" width="88" height="28" rx="6"
              fill="rgba(90,90,110,0.14)" stroke="rgba(90,90,110,0.3)" strokeWidth="0.6" />
            <text x={node.cx} y="36" textAnchor="middle"
              fill="rgba(160,160,176,0.75)" fontSize="9" fontFamily="var(--font-geist-sans)" fontWeight="500">{node.label}</text>
          </motion.g>
        ))}

        {/* Legend */}
        <g>
          <circle cx="32" cy="148" r="5" fill="rgba(200,162,78,0.15)" stroke="rgba(200,162,78,0.4)" strokeWidth="0.5" />
          <text x="42" y="152" fill="rgba(200,162,78,0.45)" fontSize="7" fontFamily="var(--font-geist-mono)">核心基础设施</text>
          <circle cx="32" cy="93" r="5" fill="rgba(74,144,226,0.1)" stroke="rgba(74,144,226,0.35)" strokeWidth="0.5" />
          <text x="42" y="97" fill="rgba(74,144,226,0.45)" fontSize="7" fontFamily="var(--font-geist-mono)">垂直产品</text>
          <circle cx="32" cy="35" r="5" fill="rgba(90,90,110,0.12)" stroke="rgba(90,90,110,0.3)" strokeWidth="0.5" />
          <text x="42" y="39" fill="rgba(160,160,176,0.4)" fontSize="7" fontFamily="var(--font-geist-mono)">桌面工具</text>
        </g>
      </svg>
    </motion.div>
  );
}

export function ProductGrid() {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 -z-10 grid-bg opacity-20" />
      <div className="mx-auto max-w-7xl px-6">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="eyebrow mb-4">ECOSYSTEM</p>
          <h2 className="headline-tight text-3xl md:text-4xl font-bold">
            <span className="text-gradient-gold">产品矩阵</span>
          </h2>
          <p className="mt-4 text-[var(--color-text-secondary)] max-w-xl mx-auto">
            从 LLM 接入到 AI 量化交易，每个产品独立完整，也可协同运转。
          </p>
        </motion.div>

        {/* Ecosystem architecture map */}
        <EcosystemMap />

        <div className="space-y-14">
          {productGroups.map((group, gi) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: gi * 0.08 }}
            >
              {/* Group header */}
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[var(--color-border)]">
                <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
                  {group.name}
                </h3>
                <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${priorityStyle[group.priority] ?? ""}`}>
                  {group.priority}
                </span>
                <span className="text-sm text-[var(--color-text-muted)]">
                  {group.tagline}
                </span>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {group.products.map((product, pi) => {
                  const Icon = productIcons[product.id];
                  return (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: pi * 0.08 }}
                    >
                      <Link
                        href={product.href}
                        className="group block card p-6 h-full hover:border-[var(--color-ochre)]/30 transition-all duration-300 relative overflow-hidden"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-[var(--color-ochre)]/8 border border-[var(--color-ochre)]/15 flex items-center justify-center group-hover:bg-[var(--color-ochre)]/12 transition-colors">
                              {Icon ? (
                                <Icon className="w-5 h-5 text-[var(--color-ochre)]" />
                              ) : null}
                            </div>
                            <div>
                              <h4 className="font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-ochre)] transition-colors">
                                {product.name}
                              </h4>
                              <p className="text-xs text-[var(--color-text-muted)]">
                                {product.tagline}
                              </p>
                            </div>
                          </div>
                          {"badge" in product && product.badge && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--color-ochre)]/10 text-[var(--color-ochre)] font-medium border border-[var(--color-ochre)]/20 shrink-0">
                              {product.badge}
                            </span>
                          )}
                        </div>

                        <p className="text-sm text-[var(--color-text-secondary)] mb-4 leading-relaxed">
                          {product.description}
                        </p>

                        <ul className="space-y-2">
                          {product.features.map((f) => (
                            <li
                              key={f}
                              className="text-xs text-[var(--color-text-muted)] flex items-start gap-2"
                            >
                              <span className="text-[var(--color-ochre)] mt-0.5 shrink-0 font-mono">›</span>
                              {f}
                            </li>
                          ))}
                        </ul>

                        {/* Hover glow */}
                        <div className="absolute -bottom-8 -right-8 w-24 h-24 rounded-full bg-[var(--color-ochre)] opacity-0 group-hover:opacity-[0.06] blur-[40px] transition-opacity duration-500 pointer-events-none" />
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
