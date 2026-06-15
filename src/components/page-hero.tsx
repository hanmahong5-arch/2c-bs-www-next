"use client";

import { motion } from "framer-motion";
import { SmartLink } from "./primitives/smart-link";
import { Aurora } from "./aurora";
import { heroEntry } from "@/lib/motion";

interface PageHeroProps {
  title: string;
  highlight: string;
  description: string;
  primaryAction?: { label: string; href: string };
  secondaryAction?: { label: string; href: string };
}

/**
 * PageHero — the shared hero for every content/product page.
 *
 * Mirrors the homepage hero's discipline: a single restrained warm Aurora wash
 * over the paper grid, no competing decorative layers. The accent is spent where
 * a content page's focus actually lives — one highlighted word in the headline
 * (these pages have no code window to carry it) — plus the primary CTA. System
 * .btn-* variants and a warm craft shadow, so nothing is ad-hoc.
 */
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
      <div className="absolute inset-0 -z-10 grid-bg opacity-[0.55]" />

      <div className="mx-auto max-w-7xl px-6 pt-20 pb-16 md:pt-28 md:pb-24 relative">
        <motion.div {...heroEntry(0)} className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold headline-tight headline-balance">
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
                  className="btn-primary shadow-[var(--shadow-md)]"
                >
                  {primaryAction.label}
                </SmartLink>
              )}
              {secondaryAction && (
                <SmartLink href={secondaryAction.href} className="btn-secondary">
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
