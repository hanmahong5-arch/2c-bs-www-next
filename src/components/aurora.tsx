"use client";

import { motion } from "framer-motion";

/**
 * Aurora — layered mesh gradient.
 * Uses prime-number drift cycles (11s / 17s / 23s) to avoid synchronization
 * artifacts and produce an organic, breathing feel. Inspired by Stripe's
 * hero gradient mechanics, reinterpreted in Lurus's warm-gold palette.
 */
export function Aurora() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Primary warm-gold blob — upper-left */}
      <motion.div
        className="absolute w-[55vw] h-[55vw] -top-[18%] -left-[12%] rounded-full opacity-[0.09]"
        style={{
          background:
            "radial-gradient(ellipse at center, #c8a24e 0%, transparent 62%)",
          filter: "blur(90px)",
          mixBlendMode: "screen",
        }}
        animate={{
          x: [0, 70, -30, 0],
          y: [0, -40, 25, 0],
          scale: [1, 1.12, 0.94, 1],
        }}
        transition={{
          duration: 23,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      {/* Deep-gold secondary — center-right */}
      <motion.div
        className="absolute w-[45vw] h-[45vw] top-[5%] -right-[8%] rounded-full opacity-[0.06]"
        style={{
          background:
            "radial-gradient(ellipse at center, #8b6914 0%, transparent 58%)",
          filter: "blur(110px)",
          mixBlendMode: "screen",
        }}
        animate={{
          x: [0, -55, 35, 0],
          y: [0, 45, -25, 0],
          scale: [1, 0.92, 1.15, 1],
        }}
        transition={{
          duration: 17,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      {/* Warm tertiary — lower-left, slow */}
      <motion.div
        className="absolute w-[40vw] h-[40vw] bottom-0 left-[5%] rounded-full opacity-[0.04]"
        style={{
          background:
            "radial-gradient(ellipse at center, #d4b76a 0%, transparent 55%)",
          filter: "blur(130px)",
          mixBlendMode: "screen",
        }}
        animate={{
          x: [0, 45, -35, 0],
          y: [0, -25, 35, 0],
        }}
        transition={{
          duration: 29,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      {/* White-hot focal point — top center, draws eye toward headline */}
      <div
        className="absolute w-[30vw] h-[20vw] top-[-5%] left-1/2 -translate-x-1/2 rounded-full opacity-[0.05] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(255,245,220,1) 0%, transparent 65%)",
          filter: "blur(70px)",
        }}
      />
    </div>
  );
}
