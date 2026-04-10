/**
 * Shared Framer Motion animation presets.
 *
 * Usage:
 *   <motion.div {...fadeInUp}>
 *   <motion.div {...staggerChild(i)}>
 */

export const fadeInUp = {
  initial: { opacity: 0, y: 20 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true } as const,
} as const;

export const fadeIn = {
  initial: { opacity: 0 } as const,
  whileInView: { opacity: 1 } as const,
  viewport: { once: true } as const,
} as const;

export const slideInLeft = {
  initial: { opacity: 0, x: -20 } as const,
  whileInView: { opacity: 1, x: 0 } as const,
  viewport: { once: true } as const,
} as const;

export const slideInRight = {
  initial: { opacity: 0, x: 20 } as const,
  whileInView: { opacity: 1, x: 0 } as const,
  viewport: { once: true } as const,
} as const;

/** Staggered child animation — use with index */
export function staggerChild(index: number, baseDelay = 0) {
  return {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { delay: baseDelay + index * 0.06 },
  } as const;
}

/** Entry animation for hero elements — plays once on mount */
export function heroEntry(delay = 0) {
  return {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.6 },
  } as const;
}
