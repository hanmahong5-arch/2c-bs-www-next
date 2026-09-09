"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BoltIcon,
  BanknotesIcon,
  CircleStackIcon,
  ChartBarIcon,
  WrenchScrewdriverIcon,
  ArrowsRightLeftIcon,
  VideoCameraIcon,
  ComputerDesktopIcon,
  BuildingOffice2Icon,
  CpuChipIcon,
  ArchiveBoxIcon,
  MoonIcon,
} from "@heroicons/react/24/outline";
import type { ComponentType, SVGProps } from "react";
import { productGroups } from "@/lib/products";
import { personas, getProduct } from "@/lib/ecosystem";
import { SmartLink } from "@/components/primitives/smart-link";
import { track } from "@/lib/track";

type HeroIcon = ComponentType<SVGProps<SVGSVGElement>>;

const productIcons: Record<string, HeroIcon> = {
  hub: BoltIcon,
  billing: BanknotesIcon,
  memorus: CircleStackIcon,
  lucrum: ChartBarIcon,
  kova: WrenchScrewdriverIcon,
  switch: ArrowsRightLeftIcon,
  creator: VideoCameraIcon,
  tally: ArchiveBoxIcon,
  fable: MoonIcon,
};

const personaIcons: Record<string, HeroIcon> = {
  "saas-dev": ComputerDesktopIcon,
  "enterprise-it": BuildingOffice2Icon,
  "agent-builder": CpuChipIcon,
  trader: ChartBarIcon,
};

// Priority badge colors
const priorityStyle: Record<string, string> = {
  P0: "bg-[var(--color-accent)]/10 text-[var(--color-accent)] border-[var(--color-accent)]/20",
  P1: "bg-[var(--lt-accent-2)]/8 text-[var(--lt-accent-2)] border-[var(--lt-accent-2)]/20",
  P2: "bg-[var(--color-text-muted)]/10 text-[var(--color-text-muted)] border-[var(--color-text-muted)]/20",
};

export function ProductGrid() {
  // 默认激活占比最大的 persona — 让筛选器自带示范态, 而非空态等点击
  const [selectedPersona, setSelectedPersona] = useState<string | null>("saas-dev");
  const persona = personas.find((p) => p.id === selectedPersona);
  // recommendedPath 跨产品组 — 用 Set 做 O(1) 高亮判定
  const highlighted = useMemo(
    () => new Set<string>(persona?.recommendedPath ?? []),
    [persona],
  );

  return (
    <section className="py-24 relative" aria-labelledby="products-heading">
      <div className="absolute inset-0 -z-10 grid-bg opacity-20" />
      <div className="mx-auto max-w-7xl px-6">

        <motion.div
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="eyebrow mb-4">ECOSYSTEM</p>
          <h2 id="products-heading" className="headline-tight type-h2 text-[var(--color-text-primary)]">
            <span className="sketch-underline">产品矩阵</span>
          </h2>
          <p className="mt-4 text-[var(--color-text-secondary)] max-w-xl mx-auto">
            从 LLM 接入到 AI 量化交易，每个产品独立完整，也可协同运转。
          </p>
        </motion.div>

        {/* Persona filter — 浏览+导航双职能：点选高亮 recommendedPath 产品卡 */}
        <div className="mb-10">
          <p className="text-center text-sm text-[var(--color-text-secondary)] mb-4">
            选择你的角色，高亮的就是和你有关的产品。
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {personas.map((p) => {
              const Icon = personaIcons[p.id];
              const isSelected = selectedPersona === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() =>
                    setSelectedPersona(isSelected ? null : p.id)
                  }
                  aria-pressed={isSelected}
                  className={`flex items-center gap-2 px-4 py-2.5 min-h-11 rounded-full border text-sm transition-colors cursor-pointer ${
                    isSelected
                      ? "border-[var(--color-accent)] bg-[var(--color-accent)]/8 text-[var(--color-text-primary)] font-medium"
                      : "border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-hover)] hover:bg-[var(--color-surface)]"
                  }`}
                >
                  {Icon && (
                    <Icon
                      className={`w-4 h-4 ${
                        isSelected
                          ? "text-[var(--color-accent)]"
                          : "text-[var(--color-text-muted)]"
                      }`}
                    />
                  )}
                  {p.title}
                </button>
              );
            })}
          </div>

          {/* Selected persona context — 推荐路径一行收口 */}
          <AnimatePresence>
            {persona && (
              <motion.div
                key={persona.id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="mt-5 text-center text-sm text-[var(--color-text-secondary)]">
                  <span className="text-[var(--color-text-muted)]">
                    {persona.description} — 推荐路径：
                  </span>{" "}
                  {persona.recommendedPath.map((id, i) => (
                    <span key={id}>
                      {i > 0 && (
                        <span className="text-[var(--color-text-muted)] mx-1">
                          →
                        </span>
                      )}
                      <span className="font-medium text-[var(--color-text-primary)]">
                        {getProduct(id).name}
                      </span>
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="space-y-14">
          {productGroups.map((group, gi) => (
            <motion.div
              key={group.id}
              initial={{ y: 30 }}
              whileInView={{ y: 0 }}
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
                  const isDimmed =
                    persona != null && !highlighted.has(product.id);
                  const isHighlighted = highlighted.has(product.id);
                  return (
                    <motion.div
                      key={product.id}
                      initial={{ y: 20 }}
                      whileInView={{ y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: pi * 0.08 }}
                      className={`transition-opacity duration-300 ${
                        isDimmed ? "opacity-60" : ""
                      }`}
                    >
                      <SmartLink
                        href={product.href}
                        showExternalIndicator={false}
                        onClick={() => track("cta_click", { id: "product", product: product.id })}
                        className={`group block card p-6 h-full transition-all duration-300 relative overflow-hidden ${
                          isHighlighted
                            ? "border-[var(--color-accent)]/60"
                            : "hover:border-[var(--color-accent)]/30"
                        }`}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-[var(--color-accent)]/8 border border-[var(--color-accent)]/15 flex items-center justify-center group-hover:bg-[var(--color-accent)]/12 transition-colors">
                              {Icon ? (
                                <Icon className="w-5 h-5 text-[var(--color-accent)]" />
                              ) : null}
                            </div>
                            <div>
                              <h4 className="font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors">
                                {product.name}
                              </h4>
                              <p className="text-xs text-[var(--color-text-muted)]">
                                {product.tagline}
                              </p>
                            </div>
                          </div>
                          {"badge" in product && product.badge && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--color-accent)]/8 text-[var(--color-accent)] font-medium border border-[var(--color-accent)]/20 shrink-0">
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
                              <span className="text-[var(--color-accent)] mt-0.5 shrink-0 font-mono">›</span>
                              {f}
                            </li>
                          ))}
                        </ul>

                        {/* Hover glow */}
                        <div className="absolute -bottom-8 -right-8 w-24 h-24 rounded-full bg-[var(--color-accent)] opacity-0 group-hover:opacity-[0.06] blur-[40px] transition-opacity duration-500 pointer-events-none" />
                      </SmartLink>
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
