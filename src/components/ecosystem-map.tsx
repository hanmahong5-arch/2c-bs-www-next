"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { relations } from "@/lib/ecosystem";
import type { RelationType } from "@/lib/ecosystem";

// ── Ecosystem relation map ──
// 消费 lib/ecosystem.ts 的 8 条 ProductRelation:
//   powers → 实线橙 + 实心箭头 / enhances → 虚线橙 / integrates → 点划线蓝 (--lt-accent-2)
// 7 节点静态手工布局。TODO: 节点 >12 再考虑布局算法。

const NODE_W = 92;
const NODE_H = 34;

// 节点中心坐标 (viewBox 0 0 820 310)，P0 底层 / P1 中层 / P2 顶层
const mapNodes: Record<
  string,
  { x: number; y: number; label: string; tier: "P0" | "P1" | "P2" }
> = {
  hub: { x: 230, y: 240, label: "Hub", tier: "P0" },
  billing: { x: 410, y: 240, label: "Billing", tier: "P0" },
  memorus: { x: 590, y: 240, label: "Memorus", tier: "P0" },
  kova: { x: 320, y: 140, label: "Kova", tier: "P1" },
  lucrum: { x: 520, y: 140, label: "Lucrum", tier: "P1" },
  switch: { x: 150, y: 50, label: "Switch", tier: "P2" },
  creator: { x: 640, y: 50, label: "Creator", tier: "P2" },
};

// 每条边: ecosystem.ts relations 数组的下标 + 手工 path + tooltip 锚点
const mapEdges: { rel: number; d: string; mid: { x: number; y: number } }[] = [
  { rel: 0, d: "M 280 240 L 360 240", mid: { x: 320, y: 240 } }, // hub→billing powers
  { rel: 1, d: "M 590 261 Q 410 300 234 259", mid: { x: 410, y: 285 } }, // memorus→hub enhances
  { rel: 2, d: "M 244 222 L 312 160", mid: { x: 278, y: 191 } }, // hub→kova integrates
  { rel: 3, d: "M 258 224 L 496 158", mid: { x: 377, y: 196 } }, // hub→lucrum integrates
  { rel: 4, d: "M 424 222 L 510 160", mid: { x: 467, y: 191 } }, // billing→lucrum powers
  { rel: 5, d: "M 396 222 L 332 160", mid: { x: 364, y: 191 } }, // billing→kova powers
  { rel: 6, d: "M 576 222 Q 470 200 372 152", mid: { x: 472, y: 192 } }, // memorus→kova enhances
  { rel: 7, d: "M 152 67 L 224 221", mid: { x: 188, y: 144 } }, // switch→hub integrates
];

const edgeStyle: Record<
  RelationType,
  { stroke: string; dash?: string; width: number; opacity: number; marker?: string }
> = {
  powers: { stroke: "var(--color-accent)", width: 1.5, opacity: 0.7, marker: "url(#arrow-powers)" },
  enhances: { stroke: "var(--color-accent)", dash: "5 4", width: 1.2, opacity: 0.55 },
  integrates: { stroke: "var(--lt-accent-2)", dash: "2 3 7 3", width: 1.2, opacity: 0.6 },
};

const tierNodeStyle: Record<string, { fill: string; stroke: string; text: string }> = {
  P0: { fill: "var(--color-surface-elevated)", stroke: "var(--color-accent)", text: "var(--lt-ink)" },
  P1: { fill: "var(--color-surface-elevated)", stroke: "var(--lt-accent-2)", text: "var(--lt-ink)" },
  P2: { fill: "var(--color-surface-elevated)", stroke: "var(--color-border-hover)", text: "var(--color-text-secondary)" },
};

export function EcosystemMap() {
  const [hoveredEdge, setHoveredEdge] = useState<number | null>(null);
  const hovered = hoveredEdge != null ? relations[mapEdges[hoveredEdge].rel] : null;

  return (
    <motion.div
      className="relative rounded-2xl border border-[var(--color-border)] overflow-hidden mb-14 bg-[var(--color-surface)]/40"
      initial={{ y: 16 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* Mobile: compact tier outline (SVG too dense below md) */}
      <div className="md:hidden p-5 space-y-4">
        <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-[var(--color-text-muted)] mb-1">产品层级关系</p>
        <div>
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--color-text-muted)]/60 mb-2">P2 · 桌面工具</p>
          <div className="flex flex-wrap gap-2">
            {["Switch", "Creator"].map((n) => (
              <span key={n} className="px-3 py-1 rounded-md bg-[var(--color-text-muted)]/10 border border-[var(--color-text-muted)]/20 text-xs text-[var(--color-text-secondary)]">{n}</span>
            ))}
          </div>
        </div>
        <div className="text-[var(--color-text-muted)] text-center text-[10px] font-mono">↑ 构建于</div>
        <div>
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--lt-accent-2)]/70 mb-2">P1 · 垂直产品</p>
          <div className="flex flex-wrap gap-2">
            {["Kova", "Lucrum"].map((n) => (
              <span key={n} className="px-3 py-1 rounded-md bg-[var(--lt-accent-2)]/8 border border-[var(--lt-accent-2)]/25 text-xs text-[var(--lt-accent-2)]">{n}</span>
            ))}
          </div>
        </div>
        <div className="text-[var(--color-text-muted)] text-center text-[10px] font-mono">↑ 构建于</div>
        <div>
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--color-accent)]/80 mb-2">P0 · 核心基础设施</p>
          <div className="flex flex-wrap gap-2">
            {["Hub", "Billing", "Memorus"].map((n) => (
              <span key={n} className="px-3 py-1 rounded-md bg-[var(--color-accent)]/8 border border-[var(--color-accent)]/25 text-xs text-[var(--color-accent)] font-medium">{n}</span>
            ))}
          </div>
        </div>
        {/* Mobile legend */}
        <div className="pt-2 border-t border-[var(--color-border)] space-y-1.5">
          <div className="flex items-center gap-2">
            <div className="w-6 h-[1.5px] bg-[var(--color-accent)] shrink-0" />
            <span className="text-[10px] font-mono text-[var(--color-text-muted)]">powers · 核心能力供给</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 shrink-0 border-t border-dashed border-[var(--color-accent)]" />
            <span className="text-[10px] font-mono text-[var(--color-text-muted)]">enhances · 能力增强</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 shrink-0 border-t border-[var(--lt-accent-2)]" style={{ borderStyle: "dashed", borderSpacing: "2px" }} />
            <span className="text-[10px] font-mono text-[var(--color-text-muted)]">integrates · 数据集成</span>
          </div>
        </div>
      </div>

      <div className="hidden md:block relative">
        <svg viewBox="0 0 820 330" className="w-full" role="img" aria-label="Lurus 产品关系图谱：7 个产品与 8 条依赖/增强/集成关系">
          <defs>
            <marker id="arrow-powers" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M 0 0 L 8 4 L 0 8 z" fill="var(--color-accent)" fillOpacity="0.8" />
            </marker>
          </defs>

          {/* Edges first (nodes drawn on top) */}
          {mapEdges.map((e, i) => {
            const rel = relations[e.rel];
            const s = edgeStyle[rel.type];
            const dimOthers = hoveredEdge != null && hoveredEdge !== i;
            return (
              <g key={`edge-${i}`}>
                <motion.path
                  d={e.d}
                  fill="none"
                  stroke={s.stroke}
                  strokeWidth={hoveredEdge === i ? s.width + 0.6 : s.width}
                  strokeDasharray={s.dash}
                  strokeOpacity={dimOthers ? s.opacity * 0.35 : s.opacity}
                  markerEnd={s.marker}
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.08, duration: 0.5 }}
                />
                {/* 不可见宽命中区 — 细线 hover 命中率；触屏设备无 hover，点击切换同一 tooltip */}
                <path
                  d={e.d}
                  fill="none"
                  stroke="transparent"
                  strokeWidth={14}
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredEdge(i)}
                  onMouseLeave={() => setHoveredEdge(null)}
                  onClick={() => setHoveredEdge((cur) => (cur === i ? null : i))}
                />
              </g>
            );
          })}

          {/* Nodes */}
          {Object.entries(mapNodes).map(([id, n], i) => {
            const t = tierNodeStyle[n.tier];
            return (
              <motion.g
                key={id}
                initial={{ y: 6 }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.06 }}
              >
                <rect
                  x={n.x - NODE_W / 2}
                  y={n.y - NODE_H / 2}
                  width={NODE_W}
                  height={NODE_H}
                  rx="8"
                  fill={t.fill}
                  stroke={t.stroke}
                  strokeOpacity="0.45"
                  strokeWidth="1"
                />
                <text
                  x={n.x}
                  y={n.y + 3.5}
                  textAnchor="middle"
                  fill={t.text}
                  fontSize="11"
                  fontFamily="var(--font-sans)"
                  fontWeight="600"
                >
                  {n.label}
                </text>
                <text
                  x={n.x}
                  y={n.y - NODE_H / 2 - 5}
                  textAnchor="middle"
                  fill="var(--color-text-muted)"
                  fillOpacity="0.7"
                  fontSize="7"
                  fontFamily="var(--font-mono)"
                  letterSpacing="1"
                >
                  {n.tier}
                </text>
              </motion.g>
            );
          })}

          {/* Legend — 左下角 3 行，y 从 276 起确保在所有节点(max y=257)下方 */}
          <g fontFamily="var(--font-mono)" fontSize="8.5">
            <text x="24" y="273" fill="var(--color-text-muted)" fillOpacity="0.5" fontSize="7" letterSpacing="1">LEGEND</text>
            <line x1="24" y1="284" x2="56" y2="284" stroke="var(--color-accent)" strokeWidth="1.5" strokeOpacity="0.8" markerEnd="url(#arrow-powers)" />
            <text x="64" y="287.5" fill="var(--color-text-muted)">powers · 核心能力供给</text>
            <line x1="24" y1="300" x2="56" y2="300" stroke="var(--color-accent)" strokeWidth="1.2" strokeDasharray="5 4" strokeOpacity="0.6" />
            <text x="64" y="303.5" fill="var(--color-text-muted)">enhances · 能力增强</text>
            <line x1="24" y1="316" x2="56" y2="316" stroke="var(--lt-accent-2)" strokeWidth="1.2" strokeDasharray="2 3 7 3" strokeOpacity="0.65" />
            <text x="64" y="319.5" fill="var(--color-text-muted)">integrates · 数据集成</text>
          </g>
        </svg>

        {/* Edge tooltip — relation.label */}
        <AnimatePresence>
          {hovered && hoveredEdge != null && (
            <motion.div
              key={hoveredEdge}
              initial={{ y: 4 }}
              animate={{ y: 0 }}
              exit={{ y: 4 }}
              transition={{ duration: 0.15 }}
              className="absolute pointer-events-none z-10 px-3 py-1.5 rounded-lg bg-[var(--lt-ink)] text-[var(--lt-paper)] text-xs whitespace-nowrap shadow-lg"
              style={{
                left: `${(mapEdges[hoveredEdge].mid.x / 820) * 100}%`,
                top: `${(mapEdges[hoveredEdge].mid.y / 330) * 100}%`,
                transform: "translate(-50%, -135%)",
              }}
            >
              {hovered.label}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
