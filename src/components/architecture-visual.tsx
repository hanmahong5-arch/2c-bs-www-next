"use client";

import { motion } from "framer-motion";

const nodes = [
  { id: "client", label: "你的应用", x: 50, y: 15, type: "external" as const },
  { id: "gateway", label: "API 网关", x: 50, y: 35, type: "core" as const },
  { id: "router", label: "智能路由", x: 25, y: 55, type: "core" as const },
  { id: "billing", label: "计费引擎", x: 50, y: 55, type: "core" as const },
  { id: "memory", label: "记忆引擎", x: 75, y: 55, type: "core" as const },
  { id: "openai", label: "OpenAI", x: 10, y: 80, type: "provider" as const },
  { id: "claude", label: "Claude", x: 30, y: 80, type: "provider" as const },
  { id: "deepseek", label: "DeepSeek", x: 50, y: 80, type: "provider" as const },
  { id: "gemini", label: "Gemini", x: 70, y: 80, type: "provider" as const },
  { id: "more", label: "30+", x: 90, y: 80, type: "provider" as const },
];

const connections: [string, string][] = [
  ["client", "gateway"],
  ["gateway", "router"],
  ["gateway", "billing"],
  ["gateway", "memory"],
  ["router", "openai"],
  ["router", "claude"],
  ["router", "deepseek"],
  ["router", "gemini"],
  ["router", "more"],
];

function getNode(id: string) {
  return nodes.find((n) => n.id === id)!;
}

const typeStyles = {
  external: {
    fill: "rgba(74, 144, 226, 0.15)",
    stroke: "rgba(74, 144, 226, 0.4)",
    text: "#4a90e2",
  },
  core: {
    fill: "rgba(200, 162, 78, 0.15)",
    stroke: "rgba(200, 162, 78, 0.5)",
    text: "#c8a24e",
  },
  provider: {
    fill: "rgba(90, 90, 110, 0.2)",
    stroke: "rgba(90, 90, 110, 0.4)",
    text: "#9a9aab",
  },
};

export function ArchitectureVisual() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold">
            <span className="text-gradient-gold">一个 API</span>
            <span className="text-[var(--color-text-primary)]">，通达一切</span>
          </h2>
          <p className="mt-4 text-[var(--color-text-secondary)]">
            你只需对接一次，路由 / 计费 / 记忆 / 鉴权全自动
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="card p-6 md:p-10 max-w-4xl mx-auto"
        >
          <svg viewBox="0 0 100 95" className="w-full" style={{ maxHeight: 420 }}>
            {/* Connections with animated dash */}
            {connections.map(([from, to], i) => {
              const a = getNode(from);
              const b = getNode(to);
              return (
                <motion.line
                  key={`${from}-${to}`}
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  stroke="rgba(200, 162, 78, 0.2)"
                  strokeWidth="0.3"
                  strokeDasharray="2 2"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.08, duration: 0.6 }}
                />
              );
            })}

            {/* Animated data flow pulses */}
            {connections.slice(0, 4).map(([from, to], i) => {
              const a = getNode(from);
              const b = getNode(to);
              return (
                <motion.circle
                  key={`pulse-${from}-${to}`}
                  r="0.6"
                  fill="#c8a24e"
                  opacity="0.6"
                  animate={{
                    cx: [a.x, b.x],
                    cy: [a.y, b.y],
                    opacity: [0, 0.8, 0],
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              );
            })}

            {/* Nodes */}
            {nodes.map((node, i) => {
              const style = typeStyles[node.type];
              return (
                <motion.g
                  key={node.id}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.05, type: "spring" }}
                >
                  <rect
                    x={node.x - 8}
                    y={node.y - 3.5}
                    width="16"
                    height="7"
                    rx="1.5"
                    fill={style.fill}
                    stroke={style.stroke}
                    strokeWidth="0.3"
                  />
                  <text
                    x={node.x}
                    y={node.y + 1}
                    textAnchor="middle"
                    fill={style.text}
                    fontSize="2.2"
                    fontWeight="500"
                    fontFamily="var(--font-geist-sans)"
                  >
                    {node.label}
                  </text>
                </motion.g>
              );
            })}

            {/* Layer labels */}
            <text x="2" y="16" fill="rgba(200,162,78,0.3)" fontSize="1.8" fontFamily="var(--font-geist-mono)">
              YOUR APP
            </text>
            <text x="2" y="36" fill="rgba(200,162,78,0.3)" fontSize="1.8" fontFamily="var(--font-geist-mono)">
              LURUS PLATFORM
            </text>
            <text x="2" y="81" fill="rgba(200,162,78,0.3)" fontSize="1.8" fontFamily="var(--font-geist-mono)">
              PROVIDERS
            </text>
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
