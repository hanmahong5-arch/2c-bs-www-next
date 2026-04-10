"use client";

import { motion } from "framer-motion";
import { SmartLink } from "./primitives/smart-link";
import { Aurora } from "./aurora";
import { FloatingShapes } from "./floating-shapes";
import { heroEntry } from "@/lib/motion";

interface PageHeroProps {
  title: string;
  highlight: string;
  description: string;
  primaryAction?: { label: string; href: string };
  secondaryAction?: { label: string; href: string };
}

export function PageHero({
  title,
  highlight,
  description,
  primaryAction,
  secondaryAction,
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden">
      <Aurora />
      <FloatingShapes />
      <div className="absolute inset-0 -z-10 grid-bg" />

      <div className="mx-auto max-w-7xl px-6 pt-20 pb-16 md:pt-28 md:pb-24 relative">
        <motion.div
          {...heroEntry(0)}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.1]">
            <motion.span
              className="text-gradient-gold inline-block"
              {...heroEntry(0.2)}
            >
              {highlight}
            </motion.span>
            <br />
            <motion.span
              className="text-[var(--color-text-primary)] inline-block"
              {...heroEntry(0.35)}
            >
              {title}
            </motion.span>
          </h1>

          <motion.p
            {...heroEntry(0.5)}
            className="mt-6 text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto leading-relaxed"
          >
            {description}
          </motion.p>

          {(primaryAction || secondaryAction) && (
            <motion.div
              {...heroEntry(0.65)}
              className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
            >
              {primaryAction && (
                <SmartLink
                  href={primaryAction.href}
                  showExternalIndicator={false}
                  className="px-8 py-3.5 rounded-xl bg-gradient-gold text-black font-semibold hover:opacity-90 hover:shadow-[0_0_30px_rgba(200,162,78,0.3)] transition-all"
                >
                  {primaryAction.label}
                </SmartLink>
              )}
              {secondaryAction && (
                <SmartLink
                  href={secondaryAction.href}
                  className="px-8 py-3.5 rounded-xl border border-[var(--color-border)] text-[var(--color-text-primary)] font-medium hover:border-[var(--color-ochre)]/50 hover:bg-[var(--color-surface)] transition-all"
                >
                  {secondaryAction.label}
                </SmartLink>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[var(--background)] to-transparent" />
    </section>
  );
}
