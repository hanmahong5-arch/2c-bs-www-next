// 「一道题的检索」真实场景：题目卡 + 三维/二维散点 + 图例 + 前 10 命中列表 + 图注。
// 服务端组件；所有数字由 scene-data.json 计算，不手写。
// 图区是固定纵横比容器：SceneCanvas 为客户端增强（进入视口后才加载 three），
// SceneProjection 作为它的 children 兜底，SSR 时就在 HTML 里，无 JS / 无 WebGL 时即最终呈现。

import { Disclosure, Eyebrow } from "@/components/site";
import data from "./scene-data.json";
import { SceneCanvas } from "./scene-canvas";
import { SCENE_PALETTE, SceneProjection, sceneStats, starPoints } from "./scene-projection";

// 中文意译：数据里只有英文原题，意译是页面文案
const QUESTION_ZH = "今年我在美国露营一共花了多少天？";

const ink = { fill: "var(--lt-ink)", stroke: "var(--lt-ink)" };

// 导出脚本把命中文本截到 160 字符（export_scene.py 的 excerpt），到上限的补省略号
const EXCERPT_MAX = 160;

/** 图例色块：文字之外再用形状 / 线型区分，不只靠颜色。 */
function LegendItem({ swatch, children }: { swatch: React.ReactNode; children: React.ReactNode }) {
  return (
    <li className="flex items-center gap-2.5">
      <svg aria-hidden="true" viewBox="0 0 28 14" className="h-3.5 w-7 shrink-0 overflow-visible">
        {swatch}
      </svg>
      <span>{children}</span>
    </li>
  );
}

export function RetrievalScene() {
  const stats = sceneStats();
  const answer = data.answer.replace(/\.$/, "");
  const judged = data.judge_label === "yes";
  const allCovered = data.metrics.all5 === 1;

  return (
    <figure aria-labelledby="scene-question" className="m-0">
      {/* 题目卡 */}
      <div className="border-t border-[var(--lt-rule)] pt-5">
        <Eyebrow>
          dev 集 · <span lang="en">{data.question_type}</span> · 题号 {data.question_id}
        </Eyebrow>
        <p
          id="scene-question"
          lang="en"
          className="mt-3 font-display text-[1.25rem] font-semibold leading-[1.35] tracking-[-0.01em] text-[var(--lt-ink)] md:text-[1.375rem]"
        >
          {data.question}
        </p>
        <p className="mt-2 text-[15px] leading-[1.7] text-[var(--color-text-secondary)]">
          中文意译：{QUESTION_ZH}
        </p>

        <dl className="mt-5 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-[15px] leading-[1.7]">
          <dt className="font-mono text-[11px] uppercase tracking-[0.16em] leading-[1.9rem] text-[var(--color-text-muted)]">
            标准答案
          </dt>
          <dd lang="en" className="text-[var(--lt-ink)]">
            {answer}
          </dd>
          <dt className="font-mono text-[11px] uppercase tracking-[0.16em] leading-[1.9rem] text-[var(--color-text-muted)]">
            判分
          </dt>
          <dd className={judged ? "text-[var(--lt-ok)]" : "text-[var(--lt-err)]"}>
            {judged ? "判对" : "判错"}
          </dd>
        </dl>

        <div className="mt-4">
          <Disclosure summary={<span className="text-[15px]">作答模型的回答原文</span>}>
            <p lang="en" className="whitespace-pre-line [overflow-wrap:anywhere]">
              {/* 原文是 Markdown，这里按纯文本显示，去掉加粗记号 */}
              {data.reader_answer?.replace(/\*\*/g, "")}
            </p>
          </Disclosure>
        </div>

        <p className="mt-5 font-mono text-[12px] leading-[1.8] text-[var(--color-text-secondary)]">
          {stats.sessions} 段会话 · {stats.turns} 轮 · {stats.evidenceSessions} 段证据会话
          {allCovered ? ` · 前 5 名覆盖全部证据会话（all@5 = ${data.metrics.all5}）` : ""}
        </p>
      </div>

      {/* 图区：桌面约 16:10，移动端 1:1；SVG 兜底在 SceneCanvas 的 children 里 */}
      <div className="relative mt-6 aspect-square w-full overflow-hidden border-y border-[var(--lt-rule)] md:aspect-[16/10]">
        <SceneCanvas>
          <SceneProjection />
        </SceneCanvas>
      </div>

      {/* 图例 */}
      <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-[13px] leading-[1.6] text-[var(--color-text-secondary)]">
        <LegendItem
          swatch={
            <circle
              cx={14}
              cy={7}
              r={6}
              strokeWidth={1.6}
              style={{ fill: "var(--lt-accent)", stroke: "var(--lt-ink)" }}
            />
          }
        >
          证据会话（点更大、带描边）
        </LegendItem>
        <LegendItem
          swatch={
            <>
              {SCENE_PALETTE.slice(0, 3).map((c, i) => (
                <circle key={c} cx={6 + i * 8} cy={7} r={2.2} fill={c} opacity={0.6} />
              ))}
            </>
          }
        >
          其他会话（小点、按会话着色）
        </LegendItem>
        <LegendItem
          swatch={<polygon points={starPoints(14, 7.5, 7, 3)} strokeWidth={0.8} style={ink} />}
        >
          问题（二维图中为星形，三维中为深色八面体）
        </LegendItem>
        <LegendItem
          swatch={
            <>
              <line x1={0} y1={4} x2={28} y2={4} strokeWidth={1.6} style={{ stroke: "var(--lt-ink)" }} />
              <line
                x1={0}
                y1={11}
                x2={28}
                y2={11}
                strokeWidth={1.2}
                strokeDasharray="4 3"
                style={{ stroke: "var(--color-text-muted)" }}
              />
            </>
          }
        >
          前 {stats.hits} 命中（连线；其中 {stats.evidenceHits} 条来自证据会话，画实线，其余虚线）
        </LegendItem>
      </ul>

      {/* 前 10 命中：文字等价物 */}
      <ol className="mt-8 border-b border-[var(--lt-rule)]" aria-label={`前 ${stats.hits} 命中`}>
        {data.hits.map((h) => (
          <li
            key={h.rank}
            className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-t border-[var(--lt-rule)] py-3"
          >
            <span className="w-7 shrink-0 font-mono text-[12px] text-[var(--lt-ink)]">
              <span aria-hidden="true">#</span>
              <span className="sr-only">第 </span>
              {h.rank}
              <span className="sr-only"> 名</span>
            </span>
            <span className="font-mono text-[12px] text-[var(--color-text-secondary)]">
              <span className="sr-only">分数 </span>
              {h.score.toFixed(3)}
            </span>
            <span
              className={`font-mono text-[11px] ${
                h.evidence ? "font-medium text-[var(--lt-ink)]" : "text-[var(--color-text-muted)]"
              }`}
            >
              {h.evidence ? "● 证据会话" : "○ 非证据会话"}
            </span>
            <span
              lang="en"
              className="line-clamp-2 min-w-0 basis-full text-[14px] leading-[1.6] text-[var(--color-text-secondary)] [overflow-wrap:anywhere] md:basis-0 md:flex-1"
            >
              {h.excerpt}
              {h.excerpt.length >= EXCERPT_MAX ? "…" : ""}
            </span>
          </li>
        ))}
      </ol>

      <figcaption className="mt-4 text-[13px] leading-[1.75] text-[var(--color-text-muted)]">
        {`真实数据：LongMemEval_S dev 集一题的全部对话轮次，用开源多语言嵌入模型（1024 维）编码后做主成分投影` +
          `（前三主成分解释约 ${stats.variancePct}% 方差，位置远近仅示意）。连线为 memorus 定稿检索配置实际返回的前 ` +
          `${stats.hits} 条命中。数据导出脚本：memorus 仓 scripts/eval/export_scene.py。`}
      </figcaption>
    </figure>
  );
}
