"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  getRelations,
  getProduct,
  getPresentation,
  type RelationType,
} from "@/lib/ecosystem";
import { staggerChild } from "@/lib/motion";

const relationLabels: Record<RelationType, { label: string; color: string }> = {
  powers: { label: "驱动", color: "var(--color-ochre)" },
  enhances: { label: "增强", color: "var(--color-success)" },
  integrates: { label: "集成", color: "var(--color-accent)" },
};

interface RelatedProductsProps {
  productId: string;
}

export function RelatedProducts({ productId }: RelatedProductsProps) {
  const rels = getRelations(productId);
  if (rels.length === 0) return null;

  return (
    <section className="py-16">
      <div className="mx-auto max-w-5xl px-6">
        <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-6">
          相关产品
        </h3>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rels.map((rel, i) => {
            const otherId =
              rel.from === productId ? rel.to : rel.from;
            const other = getProduct(otherId);
            const ui = getPresentation(otherId);
            const direction =
              rel.from === productId ? "出" : "入";
            const relStyle = relationLabels[rel.type];

            return (
              <motion.div key={`${rel.from}-${rel.to}`} {...staggerChild(i)}>
                <Link
                  href={ui.href}
                  className="card p-5 block hover:border-[var(--color-border-hover)] transition-all"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xl">{ui.icon}</span>
                    <div>
                      <div className="text-sm font-medium text-[var(--color-text-primary)]">
                        {other.name}
                      </div>
                      <div className="text-[10px] text-[var(--color-text-muted)]">
                        {other.tagline}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                      style={{
                        color: relStyle.color,
                        background: `color-mix(in srgb, ${relStyle.color} 10%, transparent)`,
                        border: `1px solid color-mix(in srgb, ${relStyle.color} 20%, transparent)`,
                      }}
                    >
                      {relStyle.label} ({direction})
                    </span>
                  </div>

                  <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                    {rel.label}
                  </p>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
