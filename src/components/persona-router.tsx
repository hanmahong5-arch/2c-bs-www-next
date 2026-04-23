"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  personas,
  getProduct,
  getPresentation,
} from "@/lib/ecosystem";
import {
  ComputerDesktopIcon,
  BuildingOffice2Icon,
  CpuChipIcon,
  ChartBarIcon,
  BoltIcon,
  BanknotesIcon,
  CircleStackIcon,
  WrenchScrewdriverIcon,
  ArrowsRightLeftIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline";
import type { ComponentType, SVGProps } from "react";

type HeroIcon = ComponentType<SVGProps<SVGSVGElement>>;

const personaIcons: Record<string, HeroIcon> = {
  "saas-dev": ComputerDesktopIcon,
  "enterprise-it": BuildingOffice2Icon,
  "agent-builder": CpuChipIcon,
  "trader": ChartBarIcon,
};

const productIcons: Record<string, HeroIcon> = {
  hub: BoltIcon,
  billing: BanknotesIcon,
  memorus: CircleStackIcon,
  kova: WrenchScrewdriverIcon,
  lucrum: ChartBarIcon,
  switch: ArrowsRightLeftIcon,
  creator: VideoCameraIcon,
};

export function PersonaRouter() {
  const [selected, setSelected] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const persona = personas.find((p) => p.id === selected);
  // Stripe-style: line follows hover when anything is hovered, else follows selection.
  const activeLineId = hovered ?? selected;

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 grid-bg opacity-30" />

      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="eyebrow mb-4">YOUR PATH</p>
          <h2 className="headline-tight text-3xl md:text-4xl font-bold">
            <span className="text-gradient-gold">你是谁</span>
            <span className="text-[var(--color-text-primary)]">，就走哪条路</span>
          </h2>
          <p className="mt-4 text-[var(--color-text-secondary)]">
            选择你的角色，Lurus 为你推荐最短的产品接入路径——从第一行代码到上线，最快 5 分钟
          </p>
        </motion.div>

        {/* Persona selector — Stripe-style gold sweep line tracks hover/selection */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10"
          onMouseLeave={() => setHovered(null)}
        >
          {personas.map((p) => {
            const isActive = activeLineId === p.id;
            const isSelected = selected === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setSelected(selected === p.id ? null : p.id)}
                onMouseEnter={() => setHovered(p.id)}
                className={`card relative p-5 text-left transition-all cursor-pointer overflow-hidden ${
                  isSelected
                    ? "border-[var(--color-ochre)]/40"
                    : "hover:border-[var(--color-border-hover)]"
                }`}
              >
                {(() => {
                  const Icon = personaIcons[p.id];
                  return Icon ? (
                    <Icon className="w-7 h-7 text-[var(--color-ochre)] icon-glow" />
                  ) : (
                    <span className="text-2xl">{p.icon}</span>
                  );
                })()}
                <h3 className="mt-2 text-sm font-semibold text-[var(--color-text-primary)]">
                  {p.title}
                </h3>
                <p className="mt-1 text-xs text-[var(--color-text-muted)] leading-relaxed">
                  {p.description}
                </p>

                {/* Sweep underline — layoutId makes the line glide between tabs */}
                {isActive && (
                  <motion.div
                    layoutId="persona-sweep"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-gold"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 32,
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Recommendation panel */}
        <AnimatePresence mode="wait">
          {persona && (
            <motion.div
              key={persona.id}
              initial={{ opacity: 0, y: 15, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="card p-8 glow-soft">
                {/* Pain points */}
                <div className="mb-6">
                  <h4 className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-3">
                    你可能面临的问题
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {persona.painPoints.map((pain) => (
                      <span
                        key={pain}
                        className="text-xs px-3 py-1.5 rounded-full bg-[var(--color-error)]/5 border border-[var(--color-error)]/10 text-[var(--color-text-muted)]"
                      >
                        {pain}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Recommended journey */}
                <h4 className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-4">
                  推荐的产品路径
                </h4>
                <div className="flex items-center gap-3 flex-wrap">
                  {persona.recommendedPath.map((id, i) => {
                    const product = getProduct(id);
                    const ui = getPresentation(id);
                    return (
                      <div key={id} className="flex items-center gap-3">
                        {i > 0 && (
                          <div className="text-[var(--color-ochre)] opacity-30">
                            →
                          </div>
                        )}
                        <Link
                          href={ui.href}
                          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--background)] border border-[var(--color-border)] hover:border-[var(--color-ochre)]/40 transition-colors"
                        >
                          {(() => {
                            const Icon = productIcons[id];
                            return Icon ? (
                              <Icon className="w-5 h-5 text-[var(--color-ochre)] icon-glow" />
                            ) : (
                              <span>{ui.icon}</span>
                            );
                          })()}
                          <div>
                            <div className="text-sm font-medium text-[var(--color-text-primary)]">
                              {product.name}
                            </div>
                            <div className="text-[10px] text-[var(--color-text-muted)]">
                              {product.tagline}
                            </div>
                          </div>
                        </Link>
                      </div>
                    );
                  })}
                </div>

                {/* Metaphor */}
                <div className="mt-6 pt-5 border-t border-[var(--color-border)]">
                  <p className="text-sm text-[var(--color-text-secondary)] italic leading-relaxed">
                    &ldquo;{getProduct(persona.recommendedPath[0]).metaphor}&rdquo;
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
