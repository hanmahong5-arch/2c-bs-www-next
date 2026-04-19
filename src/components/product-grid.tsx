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

export function ProductGrid() {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 -z-10 grid-bg opacity-20" />
      <div className="mx-auto max-w-7xl px-6">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="eyebrow mb-4">ECOSYSTEM</p>
          <h2 className="headline-tight text-3xl md:text-4xl font-bold">
            <span className="text-gradient-gold">产品矩阵</span>
          </h2>
          <p className="mt-4 text-[var(--color-text-secondary)] max-w-xl mx-auto">
            从 LLM 网关到 AI 量化交易，覆盖企业 AI 全场景——每个产品都能独立使用，也可联动协同
          </p>
        </motion.div>

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
