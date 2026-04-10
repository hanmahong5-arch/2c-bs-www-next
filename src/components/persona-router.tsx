"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  personas,
  getProduct,
  getPresentation,
} from "@/lib/ecosystem";

export function PersonaRouter() {
  const [selected, setSelected] = useState<string | null>(null);
  const persona = personas.find((p) => p.id === selected);

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
          <h2 className="text-3xl md:text-4xl font-bold">
            <span className="text-gradient-gold">我是</span>
            <span className="text-[var(--color-text-primary)]">...</span>
          </h2>
          <p className="mt-4 text-[var(--color-text-secondary)]">
            选择你的角色，我们为你推荐最合适的产品路径
          </p>
        </motion.div>

        {/* Persona selector */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {personas.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelected(selected === p.id ? null : p.id)}
              className={`card p-5 text-left transition-all cursor-pointer ${
                selected === p.id
                  ? "border-[var(--color-ochre)] glow-soft"
                  : "hover:border-[var(--color-border-hover)]"
              }`}
            >
              <span className="text-2xl">{p.icon}</span>
              <h3 className="mt-2 text-sm font-semibold text-[var(--color-text-primary)]">
                {p.title}
              </h3>
              <p className="mt-1 text-xs text-[var(--color-text-muted)] leading-relaxed">
                {p.description}
              </p>
            </button>
          ))}
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
                          <span>{ui.icon}</span>
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
