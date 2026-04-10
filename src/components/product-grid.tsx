"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { productGroups } from "@/lib/products";

export function ProductGrid() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">
            <span className="text-gradient-gold">产品矩阵</span>
          </h2>
          <p className="mt-4 text-[var(--color-text-secondary)] max-w-xl mx-auto">
            从 LLM 网关到量化交易，覆盖企业 AI 全场景
          </p>
        </div>

        <div className="space-y-16">
          {productGroups.map((group, gi) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: gi * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <h3 className="text-xl font-semibold text-[var(--color-text-primary)]">
                  {group.name}
                </h3>
                <span className="text-xs px-2 py-0.5 rounded-full border border-[var(--color-ochre)]/30 text-[var(--color-ochre)]">
                  {group.priority}
                </span>
                <span className="text-sm text-[var(--color-text-muted)]">
                  {group.tagline}
                </span>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {group.products.map((product, pi) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: pi * 0.08 }}
                  >
                    <Link href={product.href} className="block card p-6 h-full">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{product.icon}</span>
                          <div>
                            <h4 className="font-semibold text-[var(--color-text-primary)]">
                              {product.name}
                            </h4>
                            <p className="text-xs text-[var(--color-text-muted)]">
                              {product.tagline}
                            </p>
                          </div>
                        </div>
                        {"badge" in product && product.badge && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--color-ochre)]/10 text-[var(--color-ochre)] font-medium">
                            {product.badge}
                          </span>
                        )}
                      </div>

                      <p className="text-sm text-[var(--color-text-secondary)] mb-4 leading-relaxed">
                        {product.description}
                      </p>

                      <ul className="space-y-1.5">
                        {product.features.map((f) => (
                          <li
                            key={f}
                            className="text-xs text-[var(--color-text-muted)] flex items-start gap-2"
                          >
                            <span className="text-[var(--color-ochre)] mt-0.5 shrink-0">
                              ›
                            </span>
                            {f}
                          </li>
                        ))}
                      </ul>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
