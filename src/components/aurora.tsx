"use client";

import { motion } from "framer-motion";

/**
 * Aurora — a quiet warm wash for the paper hero.
 *
 * Editorial restraint over spectacle: two soft accent-tinted blobs breathing on
 * prime-number cycles (19s / 27s) so they never visibly sync, plus a single
 * white-hot focal that lifts the eye toward the headline. Normal blend (not
 * screen) so the warmth actually settles into the paper like a watercolour
 * stain rather than washing out. Brand orange only — no legacy gold.
 */
export function Aurora() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Primary accent wash — upper-left, slow */}
      <motion.div
        className="absolute w-[52vw] h-[52vw] -top-[16%] -left-[10%] rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(255,93,31,0.10) 0%, transparent 62%)",
          filter: "blur(96px)",
        }}
        animate={{
          x: [0, 56, -24, 0],
          y: [0, -32, 20, 0],
          scale: [1, 1.08, 0.96, 1],
        }}
        transition={{ duration: 27, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Secondary warm wash — center-right, counter-drift */}
      <motion.div
        className="absolute w-[44vw] h-[44vw] top-[6%] -right-[8%] rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(255,122,71,0.07) 0%, transparent 58%)",
          filter: "blur(112px)",
        }}
        animate={{
          x: [0, -44, 28, 0],
          y: [0, 36, -20, 0],
          scale: [1, 0.94, 1.1, 1],
        }}
        transition={{ duration: 19, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* White-hot focal — top center, draws the eye toward the headline */}
      <div
        className="absolute w-[34vw] h-[22vw] top-[-6%] left-1/2 -translate-x-1/2 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(255,249,238,0.55) 0%, transparent 66%)",
          filter: "blur(72px)",
        }}
      />
    </div>
  );
}
