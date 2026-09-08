/**
 * Shared Framer Motion animation presets.
 *
 * Design reference: claude.ai spring easing, Linear stagger patterns.
 *
 * Usage:
 *   <motion.div {...fadeInUp}>
 *   <motion.div {...staggerChild(i)}>
 *   <motion.section variants={staggerContainer} initial="hidden" whileInView="show">
 *
 * ⚠️ 铁律：**任何 preset 的 initial 都不得含 `opacity: 0`。**
 *
 * 这些 preset 会被 SSR 成 inline `style="opacity:0"`，而 inline style 是 CSS 覆盖
 * 不掉的（除非 !important）。于是在 JS 到达并水合之前，元素虽有正确的 HTML 与排版，
 * 却是全透明的 —— 页面在慢网/JS 失败/截图型渲染下是一片空白。
 * 实测（2026-09-08，本机生产构建 1440x7200 长视口截图）：首页 10 个 section 里
 * 9 个整块不可见，SSR HTML 中共 103 处 inline opacity:0。
 *
 * 现在改为**只动位移/缩放/模糊，不动不透明度**：
 *   - 零 JS：内容以最终排版直接可读，只是少一段进场位移
 *   - JS 到达：滑入/缩放/模糊消散照常播放，观感几乎无损
 * 需要真·淡入的场合（如 Hero 的 mount 动画）请用 globals.css 里的
 * `.hero-enter-*` 纯 CSS 类 —— CSS 动画在首次绘制时就开始，不等水合。
 */
import type { Variants } from "framer-motion";

// Spring easing — fast in, gentle settle (claude.ai pattern)
const spring = [0.16, 1, 0.3, 1] as const;

export const fadeInUp = {
  initial: { y: 24 } as const,
  whileInView: { y: 0 } as const,
  viewport: { once: true, margin: "-10%" } as const,
  transition: { duration: 0.6, ease: spring } as const,
} as const;

/**
 * 曾是纯不透明度淡入。因不得使用 opacity:0（见文件头），改为极轻微的上移，
 * 保留“内容进场”的节奏感而不牺牲无 JS 可读性。
 */
export const fadeIn = {
  initial: { y: 8 } as const,
  whileInView: { y: 0 } as const,
  viewport: { once: true } as const,
  transition: { duration: 0.5, ease: spring } as const,
} as const;

export const slideInLeft = {
  initial: { x: -30 } as const,
  whileInView: { x: 0 } as const,
  viewport: { once: true } as const,
  transition: { duration: 0.6, ease: spring } as const,
} as const;

export const slideInRight = {
  initial: { x: 30 } as const,
  whileInView: { x: 0 } as const,
  viewport: { once: true } as const,
  transition: { duration: 0.6, ease: spring } as const,
} as const;

export const scaleIn = {
  initial: { scale: 0.9 } as const,
  whileInView: { scale: 1 } as const,
  viewport: { once: true } as const,
  transition: { duration: 0.5, ease: spring } as const,
} as const;

/** Staggered child animation — use with index */
export function staggerChild(index: number, baseDelay = 0) {
  return {
    initial: { y: 24 },
    whileInView: { y: 0 },
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
  hidden: { y: 24 },
  show: {
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

/** Entry animation for hero elements — plays once on mount */
export function heroEntry(delay = 0) {
  return {
    initial: { y: 20 },
    animate: { y: 0 },
    transition: { delay, duration: 0.7, ease: spring },
  } as const;
}

/** Blur-in reveal — blur dissolve (不透明度保持 1，见文件头铁律) */
export const blurIn = {
  initial: { filter: "blur(8px)" } as const,
  whileInView: { filter: "blur(0px)" } as const,
  viewport: { once: true } as const,
  transition: { duration: 0.8, ease: spring } as const,
} as const;
