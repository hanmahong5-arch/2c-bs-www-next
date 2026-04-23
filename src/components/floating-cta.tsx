"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRightIcon, XMarkIcon } from "@heroicons/react/24/outline";

export function FloatingCTA() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Appear after scrolling past ~80% of the first viewport
      setVisible(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const show = visible && !dismissed;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", damping: 28, stiffness: 320 }}
          className="fixed bottom-6 right-6 z-40"
        >
          <div className="flex items-center gap-3 pl-4 pr-2 py-2.5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/80 backdrop-blur-xl shadow-2xl shadow-black/60">
            {/* Copy */}
            <div className="hidden sm:block pr-1">
              <p className="text-xs font-semibold text-[var(--color-text-primary)] leading-tight">
                立即免费接入
              </p>
              <p className="text-[10px] text-[var(--color-text-muted)] mt-0.5">
                无需信用卡 · 5 分钟上线
              </p>
            </div>

            {/* Primary CTA */}
            <a
              href="https://api.lurus.cn"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-gold text-black text-sm font-semibold hover:shadow-[0_0_24px_rgba(200,162,78,0.35)] transition-all duration-300 shrink-0"
            >
              开始
              <ArrowRightIcon className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </a>

            {/* Dismiss */}
            <button
              onClick={() => setDismissed(true)}
              className="p-1.5 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] transition-colors"
              aria-label="关闭"
            >
              <XMarkIcon className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Glow */}
          <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-[var(--color-ochre)]/8 via-transparent to-transparent pointer-events-none" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
