"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BoltIcon,
  BanknotesIcon,
  CircleStackIcon,
  ChartBarIcon,
  WrenchScrewdriverIcon,
  ArrowsRightLeftIcon,
  VideoCameraIcon,
  ComputerDesktopIcon,
  BuildingOffice2Icon,
  CpuChipIcon,
  ArchiveBoxIcon,
  MoonIcon,
} from "@heroicons/react/24/outline";
import type { ComponentType, SVGProps } from "react";
import { productGroups } from "@/lib/products";
import { personas, relations, getProduct } from "@/lib/ecosystem";
import type { RelationType } from "@/lib/ecosystem";
import { SmartLink } from "@/components/primitives/smart-link";
import { track } from "@/lib/track";

type HeroIcon = ComponentType<SVGProps<SVGSVGElement>>;

const productIcons: Record<string, HeroIcon> = {
  hub: BoltIcon,
  billing: BanknotesIcon,
  memorus: CircleStackIcon,
  lucrum: ChartBarIcon,
  kova: WrenchScrewdriverIcon,
  switch: ArrowsRightLeftIcon,
  creator: VideoCameraIcon,
  tally: ArchiveBoxIcon,
  fable: MoonIcon,
};

const personaIcons: Record<string, HeroIcon> = {
  "saas-dev": ComputerDesktopIcon,
  "enterprise-it": BuildingOffice2Icon,
  "agent-builder": CpuChipIcon,
  trader: ChartBarIcon,
};

// Priority badge colors
const priorityStyle: Record<string, string> = {
  P0: "bg-[var(--color-accent)]/10 text-[var(--color-accent)] border-[var(--color-accent)]/20",
  P1: "bg-[var(--accent-2)]/8 text-[var(--accent-2)] border-[var(--accent-2)]/20",
  P2: "bg-[var(--color-text-muted)]/10 text-[var(--color-text-muted)] border-[var(--color-text-muted)]/20",
};

// ── Ecosystem relation map ──
// 消费 lib/ecosystem.ts 的 8 条 ProductRelation:
//   powers → 实线橙 + 实心箭头 / enhances → 虚线橙 / integrates → 点划线蓝 (--accent-2)
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
  integrates: { stroke: "var(--accent-2)", dash: "2 3 7 3", width: 1.2, opacity: 0.6 },
};

const tierNodeStyle: Record<string, { fill: string; stroke: string; text: string }> = {
  P0: { fill: "var(--color-surface-elevated)", stroke: "var(--color-accent)", text: "var(--ink)" },
  P1: { fill: "var(--color-surface-elevated)", stroke: "var(--accent-2)", text: "var(--ink)" },
  P2: { fill: "var(--color-surface-elevated)", stroke: "var(--color-border-hover)", text: "var(--color-text-secondary)" },
};

function EcosystemMap() {
  const [hoveredEdge, setHoveredEdge] = useState<number | null>(null);
  const hovered = hoveredEdge != null ? relations[mapEdges[hoveredEdge].rel] : null;

  return (
    <motion.div
      className="relative rounded-2xl border border-[var(--color-border)] overflow-hidden mb-14 bg-[var(--color-surface)]/40"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
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
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--accent-2)]/70 mb-2">P1 · 垂直产品</p>
          <div className="flex flex-wrap gap-2">
            {["Kova", "Lucrum"].map((n) => (
              <span key={n} className="px-3 py-1 rounded-md bg-[var(--accent-2)]/8 border border-[var(--accent-2)]/25 text-xs text-[var(--accent-2)]">{n}</span>
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
            <div className="w-6 shrink-0 border-t border-[var(--accent-2)]" style={{ borderStyle: "dashed", borderSpacing: "2px" }} />
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
                {/* 不可见宽命中区 — 细线 hover 命中率 */}
                <path
                  d={e.d}
                  fill="none"
                  stroke="transparent"
                  strokeWidth={14}
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredEdge(i)}
                  onMouseLeave={() => setHoveredEdge(null)}
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
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
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
            <line x1="24" y1="316" x2="56" y2="316" stroke="var(--accent-2)" strokeWidth="1.2" strokeDasharray="2 3 7 3" strokeOpacity="0.65" />
            <text x="64" y="319.5" fill="var(--color-text-muted)">integrates · 数据集成</text>
          </g>
        </svg>

        {/* Edge tooltip — relation.label */}
        <AnimatePresence>
          {hovered && hoveredEdge != null && (
            <motion.div
              key={hoveredEdge}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.15 }}
              className="absolute pointer-events-none z-10 px-3 py-1.5 rounded-lg bg-[var(--ink)] text-[var(--paper)] text-xs whitespace-nowrap shadow-lg"
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

export function ProductGrid() {
  // 默认激活占比最大的 persona — 让筛选器自带示范态, 而非空态等点击
  const [selectedPersona, setSelectedPersona] = useState<string | null>("saas-dev");
  const persona = personas.find((p) => p.id === selectedPersona);
  // recommendedPath 跨产品组 — 用 Set 做 O(1) 高亮判定
  const highlighted = useMemo(
    () => new Set<string>(persona?.recommendedPath ?? []),
    [persona],
  );

  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 -z-10 grid-bg opacity-20" />
      <div className="mx-auto max-w-7xl px-6">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="eyebrow mb-4">ECOSYSTEM</p>
          <h2 className="headline-tight text-3xl md:text-4xl font-bold text-[var(--color-text-primary)]">
            <span className="sketch-underline">产品矩阵</span>
          </h2>
          <p className="mt-4 text-[var(--color-text-secondary)] max-w-xl mx-auto">
            从 LLM 接入到 AI 量化交易，每个产品独立完整，也可协同运转。
          </p>
        </motion.div>

        {/* Ecosystem architecture map */}
        <EcosystemMap />

        {/* Persona filter — 浏览+导航双职能：点选高亮 recommendedPath 产品卡 */}
        <div className="mb-10">
          <p className="text-center text-sm text-[var(--color-text-secondary)] mb-4">
            选择你的角色，高亮的就是和你有关的产品。
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {personas.map((p) => {
              const Icon = personaIcons[p.id];
              const isSelected = selectedPersona === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() =>
                    setSelectedPersona(isSelected ? null : p.id)
                  }
                  aria-pressed={isSelected}
                  className={`flex items-center gap-2 px-4 py-2.5 min-h-11 rounded-full border text-sm transition-colors cursor-pointer ${
                    isSelected
                      ? "border-[var(--color-accent)] bg-[var(--color-accent)]/8 text-[var(--color-text-primary)] font-medium"
                      : "border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-hover)] hover:bg-[var(--color-surface)]"
                  }`}
                >
                  {Icon && (
                    <Icon
                      className={`w-4 h-4 ${
                        isSelected
                          ? "text-[var(--color-accent)]"
                          : "text-[var(--color-text-muted)]"
                      }`}
                    />
                  )}
                  {p.title}
                </button>
              );
            })}
          </div>

          {/* Selected persona context — 推荐路径一行收口 */}
          <AnimatePresence>
            {persona && (
              <motion.div
                key={persona.id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="mt-5 text-center text-sm text-[var(--color-text-secondary)]">
                  <span className="text-[var(--color-text-muted)]">
                    {persona.description} — 推荐路径：
                  </span>{" "}
                  {persona.recommendedPath.map((id, i) => (
                    <span key={id}>
                      {i > 0 && (
                        <span className="text-[var(--color-text-muted)] mx-1">
                          →
                        </span>
                      )}
                      <span className="font-medium text-[var(--color-text-primary)]">
                        {getProduct(id).name}
                      </span>
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="space-y-14">
          {productGroups.map((group, gi) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: gi * 0.08 }}
            >
              {/* Group header */}
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[var(--color-border)]">
                <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
                  {group.name}
                </h3>
                <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${priorityStyle[group.priority] ?? ""}`}>
                  {group.priority}
                </span>
                <span className="text-sm text-[var(--color-text-muted)]">
                  {group.tagline}
                </span>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {group.products.map((product, pi) => {
                  const Icon = productIcons[product.id];
                  const isDimmed =
                    persona != null && !highlighted.has(product.id);
                  const isHighlighted = highlighted.has(product.id);
                  return (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: pi * 0.08 }}
                      className={`transition-opacity duration-300 ${
                        isDimmed ? "opacity-60" : ""
                      }`}
                    >
                      <SmartLink
                        href={product.href}
                        showExternalIndicator={false}
                        onClick={() => track("cta_click", { id: "product", product: product.id })}
                        className={`group block card p-6 h-full transition-all duration-300 relative overflow-hidden ${
                          isHighlighted
                            ? "border-[var(--color-accent)]/60"
                            : "hover:border-[var(--color-accent)]/30"
                        }`}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-[var(--color-accent)]/8 border border-[var(--color-accent)]/15 flex items-center justify-center group-hover:bg-[var(--color-accent)]/12 transition-colors">
                              {Icon ? (
                                <Icon className="w-5 h-5 text-[var(--color-accent)]" />
                              ) : null}
                            </div>
                            <div>
                              <h4 className="font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors">
                                {product.name}
                              </h4>
                              <p className="text-xs text-[var(--color-text-muted)]">
                                {product.tagline}
                              </p>
                            </div>
                          </div>
                          {"badge" in product && product.badge && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--color-accent)]/8 text-[var(--color-accent)] font-medium border border-[var(--color-accent)]/20 shrink-0">
                              {product.badge}
                            </span>
                          )}
                        </div>

                        <p className="text-sm text-[var(--color-text-secondary)] mb-4 leading-relaxed">
                          {product.description}
                        </p>

                        <ul className="space-y-2">
                          {product.features.map((f) => (
                            <li
                              key={f}
                              className="text-xs text-[var(--color-text-muted)] flex items-start gap-2"
                            >
                              <span className="text-[var(--color-accent)] mt-0.5 shrink-0 font-mono">›</span>
                              {f}
                            </li>
                          ))}
                        </ul>

                        {/* Hover glow */}
                        <div className="absolute -bottom-8 -right-8 w-24 h-24 rounded-full bg-[var(--color-accent)] opacity-0 group-hover:opacity-[0.06] blur-[40px] transition-opacity duration-500 pointer-events-none" />
                      </SmartLink>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
