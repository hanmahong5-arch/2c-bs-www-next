// 基准报告的图表与表格组件：全部服务端渲染，零 JS、零动画。
// 条形图用 HTML/CSS（移动端好读），流程图用 SVG（窄屏竖排 / 宽屏横排两份，用 CSS 显示其一）。
// 每张图都把数字直接写在图上，并给 role="img" + 由数据自动生成的 aria-label；颜色只走 CSS 变量。

import type { ReactNode } from "react";
import type { Source } from "./data";

/** 三位小数，与计划文档一致。 */
export const fmt = (v: number) => v.toFixed(3);

/** 出处一行：集合 · 日期 · 提交号。 */
export function srcText(s: Source) {
  return `${s.set} · ${s.date} · ${s.ref}`;
}

// ───────────────────────── 图容器 ─────────────────────────

/** figure：h3 标题 + 内容 + 等宽小字出处/注记。 */
export function ChartBlock({
  title,
  src,
  note,
  className = "mt-12",
  children,
}: {
  title: string;
  src?: Source;
  note?: ReactNode;
  /** 外边距等；网格内并排时传 "" */
  className?: string;
  children: ReactNode;
}) {
  return (
    <figure className={className}>
      <h3 className="font-display text-lg font-semibold leading-[1.4] tracking-[-0.01em] text-[var(--lt-ink)]">
        {title}
      </h3>
      <div className="mt-4">{children}</div>
      <figcaption className="mt-3 font-mono text-[11px] leading-[1.7] text-[var(--color-text-muted)]">
        {src ? <span className="block">口径：{srcText(src)}</span> : null}
        {note ? <span className="block">{note}</span> : null}
      </figcaption>
    </figure>
  );
}

// ───────────────────────── 横向条形图 ─────────────────────────

export interface BarDatum {
  label: string;
  /** 标签下的小字（如 n=50） */
  sub?: string;
  value: number;
  /** 参照线位置（如 oracle） */
  refAt?: number;
  /** 强调这一行（定稿 / 总分）：用实心墨色，其余为较淡的墨色 */
  strong?: boolean;
}

const TRACK =
  "relative block h-3.5 border border-[var(--lt-rule)] bg-[var(--lt-bg)]";

/** 参照刻度：墨色竖线伸出轨道上下，外描一圈纸色，落在墨色条上也分得清（非文本对比 ≥ 3:1）。 */
const REF_TICK = "w-[3px] bg-[var(--lt-ink)] shadow-[0_0_0_1px_var(--lt-paper)]";

function RefTick({ at, max }: { at: number; max: number }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute -bottom-1.5 -top-1.5 -translate-x-1/2 ${REF_TICK}`}
      style={{ left: `${(at / max) * 100}%` }}
    />
  );
}

/**
 * 单系列横向条形：左标签 / 中条 / 右数值。
 * aria-label 由数据自动拼出（含 n 与参照值），条上的数字同时以文字显示。
 */
export function BarChart({
  rows,
  ariaLabel,
  max = 1,
  labelWidth = "4.25rem",
  refLabel,
}: {
  rows: readonly BarDatum[];
  ariaLabel: string;
  max?: number;
  labelWidth?: string;
  refLabel?: string;
}) {
  const summary = rows
    .map((r) => `${r.label}${r.sub ? `（${r.sub}）` : ""} ${fmt(r.value)}${r.refAt !== undefined ? `，参照 ${fmt(r.refAt)}` : ""}`)
    .join("；");
  return (
    <div role="img" aria-label={`${ariaLabel}。${summary}`}>
      <ul className="space-y-1.5" aria-hidden="true">
        {rows.map((r) => (
          <li
            key={r.label}
            className="grid items-center gap-x-3"
            style={{ gridTemplateColumns: `${labelWidth} minmax(0,1fr) 3.25rem` }}
          >
            <span className="font-mono text-[12px] leading-tight text-[var(--lt-ink)]">
              {r.label}
              {r.sub ? <span className="block text-[11px] text-[var(--color-text-muted)]">{r.sub}</span> : null}
            </span>
            <span className={TRACK}>
              <span
                className={`absolute inset-y-0 left-0 ${
                  r.strong === false
                    ? "bg-[color-mix(in_srgb,var(--lt-ink)_55%,var(--lt-paper))]"
                    : "bg-[var(--lt-ink)]"
                }`}
                style={{ width: `${(r.value / max) * 100}%` }}
              />
              {r.refAt !== undefined ? <RefTick at={r.refAt} max={max} /> : null}
            </span>
            <span className="text-right font-mono text-[13px] tabular-nums text-[var(--lt-ink)]">
              {fmt(r.value)}
            </span>
          </li>
        ))}
      </ul>
      {refLabel ? (
        <p aria-hidden="true" className="mt-3 flex items-center gap-2 font-mono text-[11px] text-[var(--color-text-muted)]">
          <span className={`inline-block h-3.5 ${REF_TICK}`} />
          {refLabel}
        </p>
      ) : null}
    </div>
  );
}

// ───────────────────────── 分组条形图 ─────────────────────────

export interface GroupDatum {
  label: string;
  sub?: string;
  bars: readonly { short: string; value: number }[];
}

/** 系列样式：0 实心墨色 · 1 淡墨色 · 2 空心（细边 + 极淡底）。数值与系列名都写在文字里，不靠颜色区分。 */
const SERIES_FILL = [
  "bg-[var(--lt-ink)]",
  "bg-[color-mix(in_srgb,var(--lt-ink)_55%,var(--lt-paper))]",
  "border border-dashed border-[var(--lt-ink)] bg-transparent",
] as const;

/** 分组条形：每组一个小标题，组内每个系列一行；行内文字标出系列名与数值。 */
export function GroupedBars({
  groups,
  legend,
  ariaLabel,
}: {
  groups: readonly GroupDatum[];
  legend: readonly string[];
  ariaLabel: string;
}) {
  const summary = groups
    .map((g) => `${g.label}：${g.bars.map((b) => `${b.short} ${fmt(b.value)}`).join("，")}`)
    .join("；");
  return (
    <div role="img" aria-label={`${ariaLabel}。${summary}`}>
      <div aria-hidden="true">
        <ul className="mb-4 flex flex-wrap gap-x-5 gap-y-1 font-mono text-[11px] text-[var(--color-text-secondary)]">
          {legend.map((l, i) => (
            <li key={l} className="flex items-center gap-2">
              <span className={`inline-block h-3 w-5 ${SERIES_FILL[i]}`} />
              {l}
            </li>
          ))}
        </ul>
        <div className="grid gap-x-10 gap-y-5 md:grid-cols-2">
          {groups.map((g) => (
            <div key={g.label}>
              <p className="font-mono text-[12px] text-[var(--lt-ink)]">
                {g.label}
                {g.sub ? <span className="ml-2 text-[var(--color-text-muted)]">{g.sub}</span> : null}
              </p>
              <ul className="mt-1.5 space-y-1">
                {g.bars.map((b, i) => (
                  <li
                    key={b.short}
                    className="grid items-center gap-x-3"
                    style={{ gridTemplateColumns: "5.5rem minmax(0,1fr) 3.25rem" }}
                  >
                    <span className="font-mono text-[11px] text-[var(--color-text-muted)]">{b.short}</span>
                    <span className={TRACK}>
                      <span
                        className={`absolute inset-y-0 left-0 ${SERIES_FILL[i]}`}
                        style={{ width: `${b.value * 100}%` }}
                      />
                    </span>
                    <span className="text-right font-mono text-[13px] tabular-nums text-[var(--lt-ink)]">
                      {fmt(b.value)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ───────────────────────── 表格 ─────────────────────────

/**
 * 可读表格：外层 overflow-x-auto（375px 下表格在容器内横向滚动，文档不溢出），
 * 容器可聚焦，键盘用户也能滚动；首列为行头。numeric 里列出右对齐的列号。
 */
export function DataTable({
  caption,
  head,
  rows,
  numeric = [],
  minWidth = "34rem",
}: {
  caption: string;
  head: readonly string[];
  rows: readonly (readonly ReactNode[])[];
  numeric?: readonly number[];
  minWidth?: string;
}) {
  return (
    <div
      role="region"
      aria-label={caption}
      tabIndex={0}
      className="relative overflow-x-auto border-y border-[var(--lt-rule)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--lt-accent)]"
    >
      <table className="w-full border-collapse text-left text-[13px] leading-[1.6]" style={{ minWidth }}>
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b border-[var(--lt-rule)]">
            {head.map((h, i) => (
              <th
                key={h}
                scope="col"
                className={`px-3 py-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-[var(--color-text-muted)] first:pl-0 last:pr-0 ${
                  numeric.includes(i) ? "text-right" : ""
                }`}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((cells, ri) => (
            <tr key={ri} className="border-b border-[var(--lt-rule)] last:border-b-0 align-top">
              {cells.map((c, ci) =>
                ci === 0 ? (
                  <th
                    key={ci}
                    scope="row"
                    className="px-3 py-2.5 pl-0 font-normal text-[var(--lt-ink)]"
                  >
                    {c}
                  </th>
                ) : (
                  <td
                    key={ci}
                    className={`px-3 py-2.5 last:pr-0 text-[var(--color-text-secondary)] ${
                      numeric.includes(ci) ? "text-right font-mono tabular-nums text-[var(--lt-ink)]" : ""
                    }`}
                  >
                    {c}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ───────────────────────── 迭代时间线 ─────────────────────────

export interface TimelineItem {
  tag: string;
  title: string;
  metric: string;
  value: number;
  changed: string;
  why: string;
  cost: string;
  src: Source;
}

/**
 * 纵向时间线：左侧细线 + 方点；每步一条得分条（可带 oracle 参照线）+「改了什么 / 为什么 / 代价」。
 */
export function Timeline({
  items,
  oracle: refValue,
  refLabel,
  ariaLabel,
}: {
  items: readonly TimelineItem[];
  oracle?: number;
  refLabel?: string;
  ariaLabel: string;
}) {
  return (
    <ol aria-label={ariaLabel} className="border-l border-[var(--lt-rule)]">
      {items.map((it) => (
        <li key={it.tag} className="relative pb-10 pl-6 last:pb-0 md:pl-8">
          <span
            aria-hidden="true"
            className="absolute -left-[5px] top-1.5 h-[9px] w-[9px] bg-[var(--lt-ink)]"
          />
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--color-text-muted)]">
            {it.tag} · {it.metric}
          </p>
          <p className="mt-1 font-display text-[1.0625rem] font-semibold leading-[1.5] text-[var(--lt-ink)]">
            {it.title}
          </p>
          <div className="mt-3 grid items-center gap-x-3" style={{ gridTemplateColumns: "minmax(0,1fr) 3.25rem" }}>
            <span className={TRACK}>
              <span
                className="absolute inset-y-0 left-0 bg-[var(--lt-ink)]"
                style={{ width: `${it.value * 100}%` }}
              />
              {refValue !== undefined ? <RefTick at={refValue} max={1} /> : null}
            </span>
            <span className="text-right font-mono text-[13px] tabular-nums text-[var(--lt-ink)]">
              {fmt(it.value)}
            </span>
          </div>
          {refValue !== undefined && refLabel ? (
            <p className="mt-2 flex items-center gap-2 font-mono text-[11px] text-[var(--color-text-muted)]">
              <span aria-hidden="true" className={`inline-block h-3.5 ${REF_TICK}`} />
              {refLabel}
            </p>
          ) : null}
          <dl className="mt-4 grid gap-x-4 gap-y-2 text-[15px] leading-[1.8] sm:grid-cols-[4.5rem_minmax(0,1fr)]">
            <dt className="font-mono text-[11px] uppercase leading-[2.4] tracking-[0.12em] text-[var(--color-text-muted)]">
              改了什么
            </dt>
            <dd className="text-[var(--color-text-secondary)]">{it.changed}</dd>
            <dt className="font-mono text-[11px] uppercase leading-[2.4] tracking-[0.12em] text-[var(--color-text-muted)]">
              为什么
            </dt>
            <dd className="text-[var(--color-text-secondary)]">{it.why}</dd>
            <dt className="font-mono text-[11px] uppercase leading-[2.4] tracking-[0.12em] text-[var(--color-text-muted)]">
              代价
            </dt>
            <dd className="text-[var(--color-text-secondary)]">{it.cost}</dd>
          </dl>
          <p className="mt-2 font-mono text-[11px] text-[var(--color-text-muted)]">口径：{srcText(it.src)}</p>
        </li>
      ))}
    </ol>
  );
}

// ───────────────────────── 流程图（SVG）─────────────────────────

interface Step {
  no: string;
  title: string;
  lines: readonly string[];
}

const STEPS: readonly Step[] = [
  { no: "01", title: "写入", lines: ["memorus 写入路径", "开源多语言嵌入模型", "输入截断 8000 字符"] },
  { no: "02", title: "检索", lines: ["词法 + 向量混合检索", "+ 词法通道清理"] },
  { no: "03", title: "作答", lines: ["低价通用对话模型", "（关闭推理）", "前 5 会话整本 +", "第 6–10 名命中轮 ±1"] },
  { no: "04", title: "判分", lines: ["另一厂商的通用", "对话模型（关闭推理）", "官方判分提示逐字节"] },
];

const BOX = "fill-[var(--lt-bg)] stroke-[var(--lt-rule)]";
const T_INK = "fill-[var(--lt-ink)]";
const T_SEC = "fill-[var(--color-text-secondary)]";

const LINE_H = 19;
const PAD_TOP = 58; // 序号 + 标题占用的高度
const PAD_BOTTOM = 16;

/** 宽屏：四格横排。 */
function Horizontal() {
  const boxW = 208;
  const gap = (958 - boxW * 4) / 3;
  const maxLines = Math.max(...STEPS.map((s) => s.lines.length));
  const boxH = PAD_TOP + maxLines * LINE_H + PAD_BOTTOM;
  return (
    <svg viewBox={`0 0 960 ${boxH + 2}`} className="hidden h-auto w-full lg:block" aria-hidden="true">
      {STEPS.map((s, i) => {
        const x = 1 + i * (boxW + gap);
        return (
          <g key={s.no}>
            <rect x={x} y={1} width={boxW} height={boxH} className={BOX} strokeWidth={1} />
            <text x={x + 14} y={26} fontSize={12} className={`${T_SEC} font-mono`}>
              {s.no}
            </text>
            <text x={x + 14} y={48} fontSize={17} fontWeight={600} className={T_INK}>
              {s.title}
            </text>
            {s.lines.map((l, li) => (
              <text key={l} x={x + 14} y={PAD_TOP + 14 + li * LINE_H} fontSize={13} className={T_SEC}>
                {l}
              </text>
            ))}
            {i < STEPS.length - 1 ? (
              <g>
                <line
                  x1={x + boxW + 6}
                  x2={x + boxW + gap - 10}
                  y1={boxH / 2}
                  y2={boxH / 2}
                  strokeWidth={1.5}
                  className="stroke-[var(--lt-ink)]"
                />
                <polygon
                  points={`${x + boxW + gap - 4},${boxH / 2} ${x + boxW + gap - 12},${boxH / 2 - 4} ${x + boxW + gap - 12},${boxH / 2 + 4}`}
                  className="fill-[var(--lt-ink)]"
                />
              </g>
            ) : null}
          </g>
        );
      })}
    </svg>
  );
}

// 竖排布局只依赖模块常量，在模块顶层算一次。
const V_W = 338;
const V_GAP = 30;
const V_LAID = STEPS.reduce<{ s: Step; top: number; h: number }[]>((acc, s) => {
  const prev = acc[acc.length - 1];
  const top = prev ? prev.top + prev.h + V_GAP : 1;
  acc.push({ s, top, h: PAD_TOP + s.lines.length * LINE_H + PAD_BOTTOM });
  return acc;
}, []);
const V_TOTAL = V_LAID[V_LAID.length - 1].top + V_LAID[V_LAID.length - 1].h + 1;

/** 窄屏与中屏：四格竖排，viewBox 宽 340，限宽 26rem，375px 下缩放约 0.96，文字约 12px 以上。 */
function Vertical() {
  const w = V_W;
  const gap = V_GAP;
  const laid = V_LAID;
  return (
    <svg viewBox={`0 0 340 ${V_TOTAL}`} className="h-auto w-full max-w-[26rem] lg:hidden" aria-hidden="true">
      {laid.map(({ s, top, h }, i) => (
        <g key={s.no}>
          <rect x={1} y={top} width={w} height={h} className={BOX} strokeWidth={1} />
          <text x={14} y={top + 25} fontSize={12} className={`${T_SEC} font-mono`}>
            {s.no}
          </text>
          <text x={14} y={top + 47} fontSize={17} fontWeight={600} className={T_INK}>
            {s.title}
          </text>
          {s.lines.map((l, li) => (
            <text key={l} x={14} y={top + PAD_TOP + 14 + li * LINE_H} fontSize={13} className={T_SEC}>
              {l}
            </text>
          ))}
          {i < laid.length - 1 ? (
            <g>
              <line x1={170} x2={170} y1={top + h + 4} y2={top + h + gap - 10} strokeWidth={1.5} className="stroke-[var(--lt-ink)]" />
              <polygon
                points={`170,${top + h + gap - 3} 166,${top + h + gap - 11} 174,${top + h + gap - 11}`}
                className="fill-[var(--lt-ink)]"
              />
            </g>
          ) : null}
        </g>
      ))}
    </svg>
  );
}

/** 评测流程图：写入 → 检索 → 作答 → 判分，每步标注实际使用的组件与档次。 */
export function PipelineDiagram() {
  const label =
    "评测流程，共四步：" +
    STEPS.map((s) => `${s.no} ${s.title}，${s.lines.join("")}`).join("；") +
    "。";
  return (
    <div role="img" aria-label={label}>
      <Horizontal />
      <Vertical />
    </div>
  );
}
