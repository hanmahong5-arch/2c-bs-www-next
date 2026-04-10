"use client";

import { motion } from "framer-motion";
import type { Product } from "@/lib/products";

interface ProductDetailProps {
  product: Product;
  index: number;
}

export function ProductDetail({ product, index }: ProductDetailProps) {
  const isEven = index % 2 === 0;

  return (
    <motion.section
      id={product.id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="scroll-mt-20"
    >
      <div
        className={`card p-8 md:p-12 flex flex-col ${
          isEven ? "md:flex-row" : "md:flex-row-reverse"
        } gap-8 md:gap-12 overflow-hidden relative`}
      >
        <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-700 pointer-events-none">
          <div className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full bg-[var(--color-ochre)] opacity-[0.04] blur-[80px]" />
        </div>

        <div className="flex-1 space-y-6 relative">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{product.icon}</span>
            <div>
              <h3 className="text-2xl font-bold text-[var(--color-text-primary)]">
                {product.name}
              </h3>
              <p className="text-sm text-[var(--color-ochre)]">
                {product.tagline}
              </p>
            </div>
            {product.badge && (
              <span className="pill text-xs">{product.badge}</span>
            )}
          </div>

          <p className="text-[var(--color-text-secondary)] leading-relaxed">
            {product.description}
          </p>

          <ul className="space-y-3">
            {product.features.map((f, i) => (
              <motion.li
                key={f}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.05 }}
                className="flex items-start gap-3 text-sm text-[var(--color-text-secondary)]"
              >
                <span className="text-[var(--color-success)] mt-0.5 shrink-0">
                  ✓
                </span>
                {f}
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="w-full aspect-[4/3] rounded-xl bg-[var(--background)] border border-[var(--color-border)] flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 grid-bg opacity-30" />
            <motion.span
              className="text-8xl opacity-20"
              animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            >
              {product.icon}
            </motion.span>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
