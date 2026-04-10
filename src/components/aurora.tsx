"use client";

import { motion } from "framer-motion";

export function Aurora() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Primary aurora band */}
      <motion.div
        className="absolute w-[140%] h-[60%] -top-[20%] -left-[20%] rounded-full opacity-[0.07]"
        style={{
          background:
            "radial-gradient(ellipse at center, #c8a24e 0%, transparent 60%)",
          filter: "blur(80px)",
        }}
        animate={{
          x: [0, 60, -40, 0],
          y: [0, -30, 20, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      {/* Secondary aurora — blue accent */}
      <motion.div
        className="absolute w-[80%] h-[40%] top-[10%] -right-[10%] rounded-full opacity-[0.04]"
        style={{
          background:
            "radial-gradient(ellipse at center, #4a90e2 0%, transparent 60%)",
          filter: "blur(100px)",
        }}
        animate={{
          x: [0, -50, 30, 0],
          y: [0, 40, -20, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      {/* Tertiary — warm glow */}
      <motion.div
        className="absolute w-[60%] h-[50%] bottom-0 left-[10%] rounded-full opacity-[0.03]"
        style={{
          background:
            "radial-gradient(ellipse at center, #d4b76a 0%, transparent 55%)",
          filter: "blur(120px)",
        }}
        animate={{
          x: [0, 40, -30, 0],
          y: [0, -20, 30, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
