/**
 * Shared Framer Motion animation presets.
 *
 * Design reference: claude.ai spring easing, Linear stagger patterns.
 *
 * Usage:
 *   <motion.div {...fadeInUp}>
 *   <motion.div {...staggerChild(i)}>
 *   <motion.section variants={staggerContainer} initial="hidden" whileInView="show">
 */
import type { Variants } from "framer-motion";

// Spring easing — fast in, gentle settle (claude.ai pattern)
const spring = [0.16, 1, 0.3, 1] as const;

export const fadeInUp = {
  initial: { opacity: 0, y: 24 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: "-10%" } as const,
  transition: { duration: 0.6, ease: spring } as const,
} as const;

export const fadeIn = {
  initial: { opacity: 0 } as const,
  whileInView: { opacity: 1 } as const,
  viewport: { once: true } as const,
  transition: { duration: 0.5, ease: spring } as const,
} as const;

export const slideInLeft = {
  initial: { opacity: 0, x: -30 } as const,
  whileInView: { opacity: 1, x: 0 } as const,
  viewport: { once: true } as const,
  transition: { duration: 0.6, ease: spring } as const,
} as const;

export const slideInRight = {
  initial: { opacity: 0, x: 30 } as const,
  whileInView: { opacity: 1, x: 0 } as const,
  viewport: { once: true } as const,
  transition: { duration: 0.6, ease: spring } as const,
} as const;

export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 } as const,
  whileInView: { opacity: 1, scale: 1 } as const,
  viewport: { once: true } as const,
  transition: { duration: 0.5, ease: spring } as const,
} as const;

/** Staggered child animation — use with index */
export function staggerChild(index: number, baseDelay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { delay: baseDelay + index * 0.08, duration: 0.5, ease: spring },
  } as const;
}

/** Stagger container + item variants — for parent/child orchestration */
export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

/** Entry animation for hero elements — plays once on mount */
export function heroEntry(delay = 0) {
  return {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.7, ease: spring },
  } as const;
}

/** Blur-in reveal — premium fade with blur dissolve */
export const blurIn = {
  initial: { opacity: 0, filter: "blur(8px)" } as const,
  whileInView: { opacity: 1, filter: "blur(0px)" } as const,
  viewport: { once: true } as const,
  transition: { duration: 0.8, ease: spring } as const,
} as const;
