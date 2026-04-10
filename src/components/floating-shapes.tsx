"use client";

import { motion } from "framer-motion";

const shapes = [
  { type: "circle", size: 120, x: "10%", y: "20%", delay: 0 },
  { type: "hex", size: 80, x: "85%", y: "30%", delay: 2 },
  { type: "ring", size: 160, x: "75%", y: "70%", delay: 4 },
  { type: "diamond", size: 60, x: "15%", y: "75%", delay: 1 },
  { type: "circle", size: 40, x: "50%", y: "15%", delay: 3 },
  { type: "ring", size: 90, x: "30%", y: "55%", delay: 5 },
];

function Shape({ type, size }: { type: string; size: number }) {
  const ochre = "rgba(200, 162, 78, 0.08)";
  const stroke = "rgba(200, 162, 78, 0.12)";

  if (type === "circle") {
    return (
      <svg width={size} height={size} viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" fill={ochre} stroke={stroke} strokeWidth="0.5" />
      </svg>
    );
  }
  if (type === "ring") {
    return (
      <svg width={size} height={size} viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="42" fill="none" stroke={stroke} strokeWidth="1" />
        <circle cx="50" cy="50" r="30" fill="none" stroke={stroke} strokeWidth="0.5" strokeDasharray="4 4" />
      </svg>
    );
  }
  if (type === "hex") {
    return (
      <svg width={size} height={size} viewBox="0 0 100 100">
        <polygon
          points="50,5 93,27.5 93,72.5 50,95 7,72.5 7,27.5"
          fill={ochre}
          stroke={stroke}
          strokeWidth="0.5"
        />
      </svg>
    );
  }
  // diamond
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <rect
        x="20"
        y="20"
        width="60"
        height="60"
        fill={ochre}
        stroke={stroke}
        strokeWidth="0.5"
        transform="rotate(45 50 50)"
      />
    </svg>
  );
}

export function FloatingShapes() {
  return (
    <div className="absolute inset-0 -z-5 overflow-hidden pointer-events-none">
      {shapes.map((s, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: s.x, top: s.y }}
          animate={{
            y: [0, -20, 10, -15, 0],
            rotate: [0, 5, -3, 2, 0],
            opacity: [0.4, 0.7, 0.5, 0.8, 0.4],
          }}
          transition={{
            duration: 12 + i * 2,
            delay: s.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Shape type={s.type} size={s.size} />
        </motion.div>
      ))}
    </div>
  );
}
