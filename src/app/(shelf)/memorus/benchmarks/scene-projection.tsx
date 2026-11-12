// 检索场景的二维投影：把 scene-data.json 里的 516 个点取前两维画成纯 SVG 散点。
// 服务端渲染，无 JS 也完整可见；同时是三维场景加载完成前的占位，以及无 WebGL / 减少动态效果时的最终呈现。
// 颜色：证据 / 问题 / 连线一律走 CSS 变量（亮暗色自动切换）；其他会话用固定色板，色板在亮暗两种纸色上都可辨。

import data from "./scene-data.json";

/**
 * 其他会话的循环色板：中等明度、避开橙红（强调色专属证据会话）。
 * scene-canvas.tsx 里有一份相同的色板（客户端文件不能引本文件，否则 JSON 会进首屏 chunk）。
 */
export const SCENE_PALETTE = [
  "#4E79A7",
  "#59A14F",
  "#B07AA1",
  "#3FA7A0",
  "#8C8C8C",
  "#7A8CD6",
  "#9C755F",
  "#84A03A",
  "#6FA8DC",
  "#A98FC9",
] as const;

/** 五角星顶点串（SVG points），供场景与图例共用。 */
export function starPoints(cx: number, cy: number, outer: number, inner: number): string {
  const pts: string[] = [];
  for (let i = 0; i < 10; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    pts.push(`${(cx + r * Math.cos(a)).toFixed(3)},${(cy + r * Math.sin(a)).toFixed(3)}`);
  }
  return pts.join(" ");
}

/** 从数据算出的摘要数字：页面上的所有计数都来自这里，不手写。 */
export function sceneStats() {
  const sessions = data.sessions.length;
  const turns = data.sessions.reduce((sum, s) => sum + s.turns, 0);
  const evidenceSessions = data.sessions.filter((s) => s.evidence).length;
  const hits = data.hits.length;
  const evidenceHits = data.hits.filter((h) => h.evidence).length;
  const variancePct = Math.round(data.explained_variance.reduce((a, b) => a + b, 0) * 100);
  return { sessions, turns, evidenceSessions, hits, evidenceHits, variancePct };
}

const n3 = (v: number) => String(+v.toFixed(3));

export function SceneProjection() {
  const pts = data.points as number[][];
  const evidenceIdx = new Set<number>();
  data.sessions.forEach((s, i) => {
    if (s.evidence) evidenceIdx.add(i);
  });

  // 非证据点按色板分组，每组一条 path：零长度子路径 + 圆头线帽 = 圆点，体积小且各浏览器一致
  const groups: string[][] = SCENE_PALETTE.map(() => []);
  const evidencePts: number[][] = [];
  for (const [x, y, , si] of pts) {
    if (evidenceIdx.has(si)) evidencePts.push([x, y]);
    else groups[si % SCENE_PALETTE.length].push(`M${n3(x)} ${n3(-y)}h0`);
  }

  const [qx, qy] = data.query;
  const hits = data.hits.map((h) => ({ ...h, x: pts[h.point][0], y: pts[h.point][1] }));
  const stats = sceneStats();
  const label =
    `问题向量与 ${stats.turns} 个对话轮次的二维投影散点图：证据会话的点较大并带描边，其他会话按会话着色，` +
    `问题以星形标出，连线指向前 ${stats.hits} 条命中，其中 ${stats.evidenceHits} 条来自证据会话（实线），其余为虚线。`;

  return (
    <svg
      role="img"
      aria-label={label}
      viewBox="-1.1 -1.1 2.2 2.2"
      preserveAspectRatio="xMidYMid meet"
      className="block h-full w-full"
    >
      {/* 淡坐标轴：只示意投影平面，没有刻度 */}
      <g style={{ stroke: "var(--lt-rule)" }} strokeWidth={1}>
        <line x1={-1.05} y1={0} x2={1.05} y2={0} vectorEffect="non-scaling-stroke" />
        <line x1={0} y1={-1.05} x2={0} y2={1.05} vectorEffect="non-scaling-stroke" />
      </g>

      {/* 其他会话：小点、低不透明度 */}
      <g opacity={0.5}>
        {groups.map((d, i) =>
          d.length === 0 ? null : (
            <path
              key={i}
              d={d.join("")}
              fill="none"
              stroke={SCENE_PALETTE[i]}
              strokeWidth={0.03}
              strokeLinecap="round"
            />
          ),
        )}
      </g>

      {/* 问题 → 前 10 命中：证据命中实线，非证据命中虚线 */}
      <g fill="none">
        {hits.map((h) => (
          <line
            key={h.rank}
            x1={n3(qx)}
            y1={n3(-qy)}
            x2={n3(h.x)}
            y2={n3(-h.y)}
            strokeWidth={h.evidence ? 1.4 : 1.1}
            strokeDasharray={h.evidence ? undefined : "4 3"}
            vectorEffect="non-scaling-stroke"
            style={{ stroke: h.evidence ? "var(--lt-ink)" : "var(--color-text-muted)" }}
          />
        ))}
      </g>

      {/* 证据会话：更大、强调色填充 + 墨色描边 */}
      <g style={{ fill: "var(--lt-accent)", stroke: "var(--lt-ink)" }} strokeWidth={1.2}>
        {evidencePts.map(([x, y], i) => (
          <circle key={i} cx={n3(x)} cy={n3(-y)} r={0.024} vectorEffect="non-scaling-stroke" />
        ))}
      </g>

      {/* 命中环：前 10 命中各套一圈空心环 */}
      <g fill="none" style={{ stroke: "var(--lt-ink)" }} strokeWidth={1.2}>
        {hits.map((h) => (
          <circle key={h.rank} cx={n3(h.x)} cy={n3(-h.y)} r={0.045} vectorEffect="non-scaling-stroke" />
        ))}
      </g>

      {/* 问题：星形 */}
      <polygon
        points={starPoints(qx, -qy, 0.085, 0.036)}
        strokeWidth={1.4}
        vectorEffect="non-scaling-stroke"
        style={{ fill: "var(--lt-ink)", stroke: "var(--lt-paper)" }}
      />
    </svg>
  );
}
