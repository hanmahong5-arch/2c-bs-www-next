import type { Metadata } from "next";
import Link from "next/link";
import { Disclosure, Eyebrow, Lead, Section } from "@/components/site";
import {
  BarChart,
  ChartBlock,
  DataTable,
  GroupedBars,
  PipelineDiagram,
  Timeline,
  fmt,
  srcText,
} from "./charts";
import {
  COST,
  DATASETS,
  DEV_QA,
  DEV_RETRIEVAL,
  FIELD_PROBLEMS,
  FINAL_CONFIG,
  HEADLINE,
  HELDOUT,
  JUDGE_CHECK,
  LIMITS,
  LINKS,
  LME_PUBLIC,
  LOCOMO,
  LOCOMO_PUBLIC,
  METRICS,
  OFFLINE_ESTIMATE,
  PLAN,
  PREDICTIONS,
  PREDICTION_STATS,
  QA_STEPS,
  RECOVERABLE,
  REJECTED,
  RETRIEVAL_STEPS,
  SCENE,
  SESSION_RETRIEVAL_COMPARE,
  STRONGER_READER,
  TIERS,
  TYPE_KEY,
  type Competitor,
} from "./data";
import { RetrievalScene } from "./retrieval-scene";
import { sceneStats } from "./scene-projection";

// Memorus 公开基准报告：LongMemEval_S / LoCoMo 的数据、流程、失败与下一步全部公开。
// 结构：标题与主数 → 一次真实检索 → 测什么 → 怎么测 → 结果 → 怎么提上去的 → 没采用的 → 预测 vs 实测
//       → 与公开数字对照 → 成本与复现 → 局限与下一版计划。
// 页面上的数字全部取自 ./data（逐条转录自事实清单，带出处）与 scene-data.json（场景计数）。
// 除检索场景的三维增强层（scene-canvas.tsx，客户端懒加载，SVG 兜底）外全部服务端渲染，无动画。

const TITLE = "Memorus 公开基准报告 — LongMemEval / LoCoMo";
const DESCRIPTION = `Memorus 在 LongMemEval_S held-out 上问答准确率 ${fmt(HELDOUT.qa)}、会话检索 any@5 ${fmt(HELDOUT.retrieval[0].value)}，LoCoMo J ${fmt(LOCOMO.j)}；数据、流程、失败与下一步全部公开。`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/memorus/benchmarks" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/memorus/benchmarks" },
};

const TOC = [
  { id: "scene", label: "一次真实检索" },
  { id: "what", label: "测什么" },
  { id: "how", label: "怎么测" },
  { id: "results", label: "结果" },
  { id: "iteration", label: "怎么提上去的" },
  { id: "rejected", label: "没采用的尝试" },
  { id: "predictions", label: "预测与实测" },
  { id: "compare", label: "与公开数字对照" },
  { id: "cost", label: "成本与复现" },
  { id: "limits", label: "局限与计划" },
] as const;

// ───────────────────────── 小组件 ─────────────────────────

function SectionTitle({ id, eyebrow, children }: { id: string; eyebrow: string; children: React.ReactNode }) {
  return (
    <>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2
        id={id}
        className="mt-3 font-display text-[1.625rem] font-semibold leading-[1.25] tracking-[-0.02em] text-[var(--lt-ink)] md:text-[1.875rem]"
      >
        {children}
      </h2>
    </>
  );
}

function H3({ children, first = false }: { children: React.ReactNode; first?: boolean }) {
  return (
    <h3 className={`${first ? "" : "mt-12 "}font-display text-lg font-semibold leading-[1.4] tracking-[-0.01em] text-[var(--lt-ink)]`}>
      {children}
    </h3>
  );
}

function Item({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3">
      <span aria-hidden="true" className="text-[var(--color-text-muted)]">
        —
      </span>
      <span>{children}</span>
    </li>
  );
}

/** 正文列表：与产品页一致的破折号列表。 */
function List({ children }: { children: React.ReactNode }) {
  return (
    <ul className="mt-6 max-w-[64ch] space-y-3 text-base leading-[1.8] text-[var(--color-text-secondary)]">
      {children}
    </ul>
  );
}

function Code({ children }: { children: React.ReactNode }) {
  return <code className="font-mono text-[0.875em] text-[var(--lt-ink)]">{children}</code>;
}

/** 等宽小字、可断行（sha256 等长串）。 */
function Mono({ children }: { children: React.ReactNode }) {
  return <span className="break-all font-mono text-[12px] leading-[1.7] text-[var(--lt-ink)]">{children}</span>;
}

const LINK_CLASS =
  "text-[var(--lt-ink)] underline decoration-[var(--lt-rule)] underline-offset-4 hover:decoration-[var(--lt-accent)]";

const EXT_LAYOUT = {
  /** 独立成行：触控高度 ≥ 44px，文字垂直居中 */
  block: "inline-flex min-h-11 items-center",
  /** 表格单元格：触控高度 ≥ 44px，文字贴顶，与同行其他单元格对齐 */
  cell: "inline-block min-h-11",
  inline: "",
} as const;

/** 外链：新窗口 + noopener。 */
function ExtLink({
  href,
  children,
  layout = "block",
}: {
  href: string;
  children: React.ReactNode;
  layout?: keyof typeof EXT_LAYOUT;
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`${LINK_CLASS} ${EXT_LAYOUT[layout]}`}>
      {children}
      <span className="sr-only">（在新窗口打开）</span>
    </a>
  );
}

/** 同一作答档次内的公开值区间（不含基线行），用于按档次描述，不跨档排序。 */
function tierRange(rows: readonly Competitor[], tier: string) {
  const vals = rows.filter((r) => !r.baseline && r.tier === tier).map((r) => r.value);
  if (vals.length === 0) return null;
  const lo = Math.min(...vals);
  const hi = Math.max(...vals);
  return lo === hi ? fmt(lo) : `${fmt(lo)}–${fmt(hi)}`;
}

const th = "font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--color-text-muted)]";

// ───────────────────────── 页面 ─────────────────────────

export default function BenchmarksPage() {
  const scene = sceneStats();
  const lmeStrong = tierRange(LME_PUBLIC, "强闭源模型（基准官方所用档）");
  const locomoCheap = tierRange(LOCOMO_PUBLIC, "低价闭源小模型");
  const lmeRows: readonly Competitor[] = LME_PUBLIC;
  const lmeOracle = lmeRows.find((r) => r.baseline);
  const strongerLme = STRONGER_READER.filter((r) => r.bench === "LongMemEval");
  const strongerLocomo = STRONGER_READER.filter((r) => r.bench === "LoCoMo");

  return (
    <>
      {/* 1 标题区：页面唯一 h1 + 三个主数 */}
      <div className="px-6">
        <div className="mx-auto max-w-5xl pb-14 pt-20 md:pb-20 md:pt-28">
          <div className="max-w-[44rem]">
            <Eyebrow>Memorus · 公开基准报告</Eyebrow>
            <h1 className="mt-4 text-balance font-display text-[2.25rem] font-semibold leading-[1.1] tracking-[-0.025em] text-[var(--lt-ink)] md:text-[3rem]">
              长期记忆公开基准报告
            </h1>
            <p className="mt-5 font-mono text-[12px] leading-[1.8] text-[var(--color-text-secondary)]">
              2026-09 · LongMemEval_S / LoCoMo · 数据、流程、失败与下一步全部公开
            </p>
          </div>

          <dl className="mt-12 grid border-y border-[var(--lt-rule)] md:grid-cols-3">
            {HEADLINE.map((h) => (
              <div
                key={h.key}
                className="border-b border-[var(--lt-rule)] py-6 last:border-b-0 md:border-b-0 md:border-l md:px-6 md:first:border-l-0 md:first:pl-0"
              >
                <dt className={th}>{h.label}</dt>
                <dd className="mt-3 font-display text-[3.25rem] font-semibold leading-none tracking-[-0.03em] tabular-nums text-[var(--lt-ink)] md:text-[3.5rem]">
                  {fmt(h.value)}
                </dd>
                <dd className="mt-2 text-[15px] leading-[1.6] text-[var(--color-text-secondary)]">{h.aside}</dd>
                <dd className="mt-2 font-mono text-[11px] leading-[1.7] text-[var(--color-text-muted)]">{h.scope}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 max-w-[44rem] space-y-4 text-base leading-[1.8] text-[var(--color-text-secondary)] md:text-[1.0625rem]">
            <p>
              <span className="font-medium text-[var(--lt-ink)]">结论。</span>
              同一个低价作答模型下，memorus 检索出的上下文让问答准确率达到 {fmt(HELDOUT.qa)}，与只给证据会话时的{" "}
              {fmt(HELDOUT.oracle)} 相差 {fmt(HELDOUT.gap)}；会话级检索 any@5 为 {fmt(HELDOUT.retrieval[0].value)}。
            </p>
            <p>
              <span className="font-medium text-[var(--lt-ink)]">局限。</span>
              作答用的是{TIERS.reader}；强闭源作答模型下的分数我们没有跑，不作推断。held-out 也有轻度污染，见「局限与计划」。
            </p>
          </div>

          <nav aria-label="页内目录" className="mt-8">
            <ul className="-mx-2 flex flex-wrap gap-x-1">
              {TOC.map((t) => (
                <li key={t.id}>
                  <a
                    href={`#${t.id}`}
                    className="inline-flex min-h-11 items-center px-2 font-mono text-[12px] text-[var(--lt-ink)] underline decoration-[var(--lt-rule)] underline-offset-4 hover:decoration-[var(--lt-accent)]"
                  >
                    {t.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* 2 一次真实检索：B 提供的 3D 场景 */}
      <Section id="scene" labelledBy="scene-title" width="wide">
        <SectionTitle id="scene-title" eyebrow="一次真实检索">
          一道题，一次实际检索。
        </SectionTitle>
        <Lead className="mt-6">
          下图是 dev 集里一道题上的一次真实检索：{scene.sessions} 段会话、{scene.turns} 轮对话的向量被投影到三维，
          问题向量和 memorus 实际返回的前 {scene.hits} 条命中一起标了出来。
        </Lead>
        <div className="mt-10">
          <RetrievalScene />
        </div>
        <div className="mt-10 max-w-[44rem]">
          <p className={th}>怎么读这张图</p>
          <List>
            <Item>每个点是一轮对话，颜色代表它所在的会话；证据会话（共 {scene.evidenceSessions} 段）的点高亮显示。</Item>
            <Item>星是问题向量；连线连到 memorus 实际返回的前 {scene.hits} 条命中。</Item>
            <Item>
              三维坐标是 {SCENE.embedDims} 维嵌入的主成分投影，前三个主成分只解释约 {scene.variancePct}% 的方差，
              所以远近只是示意；检索本身在 {SCENE.embedDims} 维里进行。
            </Item>
            <Item>
              这道题来自 dev 集（不是 held-out）。选它，是因为它是一道典型的多会话计数题：
              前 5 名覆盖了全部 {scene.evidenceSessions} 个证据会话（all@5 = 1），定稿配置下作答判对。
            </Item>
          </List>
        </div>
      </Section>

      {/* 3 测什么 */}
      <Section id="what" labelledBy="what-title" width="wide">
        <SectionTitle id="what-title" eyebrow="测什么">
          两个公开基准，六个指标。
        </SectionTitle>

        <div className="mt-10 grid gap-x-12 gap-y-10 md:grid-cols-2">
          <div>
            <p className="font-display text-lg font-semibold text-[var(--lt-ink)]">{DATASETS.lme.name}</p>
            <ul className="mt-3 space-y-2 text-[15px] leading-[1.8] text-[var(--color-text-secondary)]">
              <Item>{DATASETS.lme.questions} 题、{DATASETS.lme.types} 个题型，其中 {DATASETS.lme.abstain} 题应弃答（该说「不知道」）。</Item>
              <Item>每题带{DATASETS.lme.sessionsPerQuestion} 段会话，要在其中找到证据再作答。</Item>
              <Item>
                我们切成 dev {DATASETS.split.dev} 题与 held-out {DATASETS.split.heldout} 题：dev 用来迭代，held-out 定稿后只跑一次。
              </Item>
            </ul>
          </div>
          <div>
            <p className="font-display text-lg font-semibold text-[var(--lt-ink)]">{DATASETS.locomo.name}</p>
            <ul className="mt-3 space-y-2 text-[15px] leading-[1.8] text-[var(--color-text-secondary)]">
              <Item>
                {DATASETS.locomo.conversations} 段长对话、{DATASETS.locomo.questions} 题，类别 {DATASETS.locomo.categories}。
              </Item>
              <Item>
                类别 5 为对抗 / 应弃答，按公开 J 分口径不计；计分题 {DATASETS.locomo.scored} 道（类别 {DATASETS.locomo.scoredCategories}）。
              </Item>
              <Item>我们对 LoCoMo 不调参：基线、定稿各跑一次。</Item>
            </ul>
          </div>
        </div>

        <H3>指标</H3>
        <div className="mt-4">
          <DataTable
            caption="指标定义"
            head={["指标", "含义"]}
            rows={METRICS.map((m) => [<span key={m.name} className="font-mono">{m.name}</span>, m.def])}
            minWidth="30rem"
          />
        </div>

        <H3>题型缩写</H3>
        <ul className="mt-4 grid gap-x-8 gap-y-1 text-[15px] text-[var(--color-text-secondary)] sm:grid-cols-2 md:grid-cols-3">
          {TYPE_KEY.map((t) => (
            <li key={t.code} className="flex gap-3">
              <span className="w-10 shrink-0 font-mono text-[13px] text-[var(--lt-ink)]">{t.code}</span>
              <span>{t.name}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* 4 怎么测 */}
      <Section id="how" labelledBy="how-title" width="wide">
        <SectionTitle id="how-title" eyebrow="怎么测">
          写入、检索、作答、判分，每一步用什么都写明。
        </SectionTitle>
        <div className="mt-10">
          <PipelineDiagram />
        </div>
        <p className="mt-3 font-mono text-[11px] leading-[1.7] text-[var(--color-text-muted)]">
          嵌入模型：{TIERS.embed}。作答与判分分属不同厂商。
        </p>

        <div className="max-w-[44rem]">
          <H3>防过拟合</H3>
          <List>
            <Item>
              数据冻结，两份数据的 sha256：
              <span className="mt-1 block">
                LongMemEval_S <Mono>{DATASETS.lme.sha256}</Mono>
              </span>
              <span className="mt-1 block">
                LoCoMo <Mono>{DATASETS.locomo.sha256}</Mono>
              </span>
            </Item>
            <Item>
              切分固定：key 为 <Code>question_id</Code> 去掉末尾 <Code>_abs</Code>；
              <Code>h = SHA-256(&quot;{DATASETS.split.salt}&quot; + key)</Code>，取前 8 字节大端 u64，模 100 小于 30 的进 held-out，其余进 dev。
              dev {DATASETS.split.dev} 题、held-out {DATASETS.split.heldout} 题；跑前固定，不换盐。
            </Item>
            <Item>每一步跑之前先写预测与停止条件；同一个假设在 dev 上最多跑 3 次。</Item>
            <Item>held-out 在定稿后只跑一次；LoCoMo 永不调参，基线与定稿各一次。</Item>
            <Item>
              已知污染：切分之前，曾在全部 470 题上看过分题型检索汇总，所以 held-out 并不完全干净。
            </Item>
          </List>

          <H3>判分怎么校验</H3>
          <List>
            <Item>官方判分提示逐字节取自上游并核对（LongMemEval 按题型加应弃答；LoCoMo 用公开的 J 分提示）。</Item>
            <Item>
              三道校验针对的是一个候选判分模型（与阅读同档），对照标签来自另一厂商的判分模型：与对照标签的一致率（oracle {JUDGE_CHECK.agreeOracle.k}/{JUDGE_CHECK.agreeOracle.n}，{fmt(JUDGE_CHECK.agreeOracle.rate)}；
              检索 {JUDGE_CHECK.agreeRetrieval.k}/{JUDGE_CHECK.agreeRetrieval.n}，{fmt(JUDGE_CHECK.agreeRetrieval.rate)}）；
              错答顶替的误收率 {fmt(JUDGE_CHECK.substituteFalseAccept.rate)}（{JUDGE_CHECK.substituteFalseAccept.pairs} 对，阈值 {JUDGE_CHECK.substituteFalseAccept.threshold}）；
              与第二判分（免费小模型）的一致率 {JUDGE_CHECK.secondJudgeAgree.toFixed(2)}，仅记录。
            </Item>
            <Item>
              一致率与误收率达标，但这个候选判分模型偏宽：oracle {fmt(JUDGE_CHECK.looseOracle.from)} → {fmt(JUDGE_CHECK.looseOracle.to)}，检索 {fmt(JUDGE_CHECK.looseRetrieval.from)} →{" "}
              {fmt(JUDGE_CHECK.looseRetrieval.to)}（{JUDGE_CHECK.looseDeltas}），超出事先写定的 {JUDGE_CHECK.presetTolerance}。
              按事先写定的规则，不用它，判分改回另一厂商的模型（即对照标签的来源）；本页所有问答分数都出自这个判分模型。
            </Item>
          </List>
          <p className="mt-6 font-mono text-[11px] leading-[1.7] text-[var(--color-text-muted)]">
            口径：dev · 2026-09-29 起 · 计划文档
          </p>
        </div>
      </Section>

      {/* 5 结果 */}
      <Section id="results" labelledBy="results-title" width="wide">
        <SectionTitle id="results-title" eyebrow="结果">
          先看 held-out，再看 dev 与 LoCoMo。
        </SectionTitle>

        <div className="mt-10 grid gap-x-16 gap-y-2 md:grid-cols-2">
          <ChartBlock
            title="held-out：问答总分对比只给证据的 oracle"
            className=""
            src={HELDOUT.src}
            note={`两者用同一作答模型；差 ${fmt(HELDOUT.gap)}。题型均值 ${fmt(HELDOUT.typeMean)}，阅读输入 ${HELDOUT.readTokens} token。`}
          >
            <BarChart
              ariaLabel="held-out 问答总分与 oracle 对比"
              labelWidth="6.25rem"
              rows={[
                { label: "检索上下文", sub: "含应弃答", value: HELDOUT.qa },
                { label: "oracle", sub: "只给证据会话", value: HELDOUT.oracle, strong: false },
              ]}
            />
          </ChartBlock>

          <ChartBlock title="held-out：会话检索（四项）" className="" src={HELDOUT.src} note={`${HELDOUT.scorable} 题可评分。`}>
            <BarChart
              ariaLabel="held-out 会话检索四项指标"
              labelWidth="4.75rem"
              rows={HELDOUT.retrieval.map((r) => ({ label: r.label, value: r.value }))}
            />
          </ChartBlock>
        </div>

        <ChartBlock
          title="held-out：分题型问答"
          src={HELDOUT.src}
          note={
            <>
              题型：{TYPE_KEY.map((t) => `${t.code} ${t.name}`).join(" · ")}。{HELDOUT.questions} 题（各题型已含应弃答）；
              其中 {HELDOUT.abstain.n} 道应弃答单独统计为 {fmt(HELDOUT.abstain.value)}。
              MS {fmt(HELDOUT.qaByType[1].value)}，同一作答模型的 MS oracle 为 {fmt(HELDOUT.msOracle)}；
              其余题型的 held-out oracle 没有逐项记录，所以不画。
            </>
          }
        >
          <BarChart
            ariaLabel="held-out 分题型问答准确率"
            rows={[
              ...HELDOUT.qaByType.map((r) => ({ label: r.label, sub: `n=${r.n}`, value: r.value })),
              { label: "应弃答", sub: `n=${HELDOUT.abstain.n}`, value: HELDOUT.abstain.value, strong: false },
            ]}
          />
        </ChartBlock>

        <ChartBlock
          title="dev：分题型检索，词法 + 向量对比纯词法"
          src={DEV_RETRIEVAL.src}
          note={`题型缩写见「测什么」。纯词法的 all@5：MS ${fmt(DEV_RETRIEVAL.byType[1].lexAll5)}，TR ${fmt(DEV_RETRIEVAL.byType[5].lexAll5)}（其余题型未单列）。dev ${DATASETS.split.dev} 题，检索可评分 331–332 题。`}
        >
          <GroupedBars
            ariaLabel="dev 分题型检索：词法加向量的 any@5 与 all@5，对比纯词法 any@5"
            legend={["混合 any@5", "混合 all@5", "词法 any@5"]}
            groups={DEV_RETRIEVAL.byType.map((t) => ({
              label: t.label,
              bars: [
                { short: "混合 any@5", value: t.hybridAny5 },
                { short: "混合 all@5", value: t.hybridAll5 },
                { short: "词法 any@5", value: t.lexAny5 },
              ],
            }))}
          />
        </ChartBlock>

        <ChartBlock
          title="LoCoMo：分类别 J（类别 1–4）"
          src={LOCOMO.src}
          note={`判 ${LOCOMO.judgedTimes} 次（预算所限，公开常见做法是 3 次）。作答为整句，F1 ${LOCOMO.f1Range}，不与公开 F1 比。`}
        >
          <BarChart
            ariaLabel="LoCoMo 分类别 J 分"
            labelWidth="6.5rem"
            rows={[
              { label: "总体", sub: `n=${LOCOMO.n}`, value: LOCOMO.j },
              ...LOCOMO.categories.map((c) => ({ label: c.label, sub: `n=${c.n}`, value: c.value, strong: false })),
            ]}
          />
        </ChartBlock>

        <div className="mt-10 max-w-[44rem]">
          <p className={th}>LoCoMo 轮次级检索</p>
          <div className="mt-3">
            <DataTable
              caption="LoCoMo 轮次级检索：基线与定稿"
              head={["配置", "any@5", "any@10", "ndcg@10"]}
              numeric={[1, 2, 3]}
              minWidth="24rem"
              rows={LOCOMO.turnRetrieval.map((r) => [r.config, fmt(r.any5), fmt(r.any10), fmt(r.ndcg10)])}
            />
          </div>
          <p className="mt-3 font-mono text-[11px] leading-[1.7] text-[var(--color-text-muted)]">
            口径：{srcText(LOCOMO.src)}
          </p>
          <List>
            <Item>
              作答用前 {LOCOMO.topTurns} 条命中轮次（{LOCOMO.contextTokens} token / 题）。
            </Item>
            <Item>
              轮次级检索比会话级难得多：每段对话{LOCOMO.turnsPerConversation}轮。any@10 只有 {fmt(LOCOMO.turnRetrieval[1].any10)}，是明显的短板，
              下一版计划的检索组把它列为首项。
            </Item>
          </List>
        </div>
      </Section>

      {/* 6 怎么提上去的 */}
      <Section id="iteration" labelledBy="iteration-title" width="wide">
        <SectionTitle id="iteration-title" eyebrow="怎么提上去的">
          每一步：改了什么，为什么，花了什么。
        </SectionTitle>
        <div className="mt-10 grid gap-x-16 gap-y-12 lg:grid-cols-2">
          <div>
            <H3 first>问答（dev）</H3>
            <div className="mt-6">
              <Timeline
                ariaLabel="问答迭代时间线"
                items={QA_STEPS}
                oracle={DEV_QA.oracleTotal}
                refLabel={`竖线刻度：oracle ${fmt(DEV_QA.oracleTotal)}（只给证据会话，dev）`}
              />
            </div>
          </div>
          <div>
            <H3 first>检索（dev）</H3>
            <div className="mt-6">
              <Timeline ariaLabel="检索迭代时间线" items={RETRIEVAL_STEPS} />
            </div>
          </div>
        </div>

        <H3>为什么选「前 5 会话整本 + 第 6–10 名命中轮」</H3>
        <div className="max-w-[44rem]">
          <Lead className="mt-4">
            Q1 逐题拆分（oracle 答对、本次答错的可挽回题）：
            {RECOVERABLE.q1.map((r) => `${r.label} ${r.n} 题`).join("；")}。主因是前 5 个会话装不全兄弟会话。
            于是先做了一次不花 token 的离线估算，在 {OFFLINE_ESTIMATE.multiEvidenceQuestions} 道多证据题里数证据全在上下文中的题：
          </Lead>
        </div>
        <div className="mt-6">
          <DataTable
            caption="离线估算：不同作答上下文方案下，证据全在上下文中的题数"
            head={["方案", "证据全在上下文的题数", "阅读输入"]}
            numeric={[1]}
            minWidth="30rem"
            rows={OFFLINE_ESTIMATE.rows.map((r) => [
              r.plan,
              String(r.covered),
              r.tokens,
            ])}
          />
        </div>
        <p className="mt-4 max-w-[64ch] text-base leading-[1.8] text-[var(--color-text-secondary)]">
          选中间方案。Q2 之后剩下的可挽回题：检索不全 {RECOVERABLE.q2Missing.map((r) => `${r.label} ${r.n}`).join("、")}；
          证据齐全仍答错 {RECOVERABLE.q2Complete.map((r) => `${r.label} ${r.n}`).join("、")}。
        </p>

        <H3>dev 分题型问答</H3>
        <div className="mt-4">
          <DataTable
            caption="dev 分题型问答准确率（含应弃答）"
            head={["步骤", "总分", "KU", "MS", "SSA", "SSP", "SSU", "TR", "应弃答", "阅读输入"]}
            numeric={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
            minWidth="46rem"
            rows={DEV_QA.rows.map((r) => [
              r.step,
              fmt(r.total),
              fmt(r.ku),
              fmt(r.ms),
              fmt(r.ssa),
              fmt(r.ssp),
              fmt(r.ssu),
              fmt(r.tr),
              fmt(r.abstain),
              r.tokens,
            ])}
          />
        </div>
        <p className="mt-3 font-mono text-[11px] leading-[1.7] text-[var(--color-text-muted)]">
          口径：dev · 2026-09-29 起 · fcf6e75 / 计划文档（oracle 与 Q0）· {DATASETS.split.dev} 题含应弃答
        </p>

        <H3>dev 检索汇总</H3>
        <div className="mt-4">
          <DataTable
            caption="dev 会话级检索汇总"
            head={["配置", "any@5", "all@5", "any@10", "all@10", "ndcg@10"]}
            numeric={[1, 2, 3, 4, 5]}
            minWidth="40rem"
            rows={DEV_RETRIEVAL.rows.map((r) => [
              r.config,
              fmt(r.any5),
              fmt(r.all5),
              fmt(r.any10),
              r.all10 === null ? "—" : fmt(r.all10),
              fmt(r.ndcg10),
            ])}
          />
        </div>
        <p className="mt-3 font-mono text-[11px] leading-[1.7] text-[var(--color-text-muted)]">
          口径：{srcText(DEV_RETRIEVAL.src)} · 检索可评分 331–332 题 · 「—」表示该项没有记录
        </p>

        <H3>定稿配置</H3>
        <List>
          <Item>检索：{FINAL_CONFIG.retrieval}。两个清理开关 <Code>{FINAL_CONFIG.cleanupFlags[0]}</Code> / <Code>{FINAL_CONFIG.cleanupFlags[1]}</Code> 默认关，只影响英文查询；中文冻结回归集除一项已知用例（17/18 → 18/18）外逐字节不变。</Item>
          <Item>作答上下文：{FINAL_CONFIG.reading}（<Code>{FINAL_CONFIG.readingArgs}</Code>）。</Item>
        </List>
      </Section>

      {/* 7 没采用的尝试 */}
      <Section id="rejected" labelledBy="rejected-title">
        <SectionTitle id="rejected-title" eyebrow="没采用的尝试">
          失败的也写在这里。
        </SectionTitle>
        <ol className="mt-10 space-y-8">
          {REJECTED.map((r, i) => (
            <li key={r.key} className="border-t border-[var(--lt-rule)] pt-5">
              <p className="font-display text-[1.0625rem] font-semibold leading-[1.5] text-[var(--lt-ink)]">
                <span className="mr-3 font-mono text-[12px] font-medium text-[var(--color-text-muted)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {r.title}
              </p>
              <dl className="mt-3 grid gap-x-4 gap-y-2 text-[15px] leading-[1.8] sm:grid-cols-[4rem_minmax(0,1fr)]">
                <dt className={`${th} leading-[2.4]`}>结果</dt>
                <dd className="text-[var(--color-text-secondary)]">{r.result}</dd>
                <dt className={`${th} leading-[2.4]`}>理由</dt>
                <dd className="text-[var(--color-text-secondary)]">{r.reason}</dd>
              </dl>
            </li>
          ))}
        </ol>
      </Section>

      {/* 8 预测 vs 实测 */}
      <Section id="predictions" labelledBy="predictions-title" width="wide">
        <SectionTitle id="predictions-title" eyebrow="预测 vs 实测">
          先写预测，再看结果：命中 {PREDICTION_STATS.hit} 项，落空 {PREDICTION_STATS.miss} 项。
        </SectionTitle>
        <Lead className="mt-6">
          {PREDICTION_STATS.groups} 组预测拆成 {PREDICTION_STATS.total} 个逐项：{PREDICTION_STATS.hit} 项命中，{PREDICTION_STATS.miss} 项落空。
          每一项都在跑之前写下区间，跑完不改。
        </Lead>
        <div className="mt-8">
          <DataTable
            caption="预测与实测逐项对照"
            head={["项目", "集合", "预测", "实测", "结果"]}
            numeric={[3]}
            minWidth="44rem"
            rows={PREDICTIONS.map((p) => [
              <span key="i">
                <span className="mr-2 font-mono text-[11px] text-[var(--color-text-muted)]">{p.group}.</span>
                {p.item}
              </span>,
              <span key="s" className="font-mono text-[12px]">{p.set}</span>,
              <span key="p" className="font-mono text-[12px]">{p.predicted}</span>,
              p.actual,
              <span key="r">
                <span className="font-medium text-[var(--lt-ink)]">
                  <span aria-hidden="true" className={p.hit ? "text-[var(--lt-ok)]" : "text-[var(--lt-err)]"}>
                    {p.hit ? "✓" : "✗"}
                  </span>{" "}
                  {p.hit ? "命中" : "落空"}
                </span>
                {"note" in p && p.note ? (
                  <span className="block text-[12px] text-[var(--color-text-muted)]">{p.note}</span>
                ) : null}
              </span>,
            ])}
          />
        </div>
        <p className="mt-3 font-mono text-[11px] leading-[1.7] text-[var(--color-text-muted)]">
          口径：dev（组 1–10）· held-out（组 11）· LoCoMo（组 12）· 明细与提交号见各结果小节
        </p>
      </Section>

      {/* 9 与公开数字对照 */}
      <Section id="compare" labelledBy="compare-title" width="wide">
        <SectionTitle id="compare-title" eyebrow="与公开数字对照">
          同一把尺子才能比，所以先写清楚尺子。
        </SectionTitle>

        <div className="mt-8 max-w-[44rem]">
          <p className="border-y border-[var(--lt-rule)] py-4 text-[15px] leading-[1.8] text-[var(--lt-ink)]">
            <span className="mr-2 font-mono text-[12px] text-[var(--color-text-muted)]">我们</span>
            held-out {fmt(HELDOUT.qa)}，oracle {fmt(HELDOUT.oracle)}；作答用{TIERS.reader}，判分用{TIERS.judge}。
          </p>
          <p className="mt-3 text-[15px] leading-[1.8] text-[var(--color-text-secondary)]">
            作答与判分模型不同，下表只作档次参照，不是排名。
          </p>
        </div>

        <H3>LongMemEval 问答准确率</H3>
        <div className="mt-4">
          <CompetitorTable caption="LongMemEval 公开问答准确率" rows={LME_PUBLIC} />
        </div>
        <p className="mt-4 max-w-[64ch] text-[15px] leading-[1.8] text-[var(--color-text-secondary)]">
          按档次看：强闭源作答模型（基准官方所用档）下的公开值为 {lmeStrong}；开源权重大模型档的公开值见表；
          我们用的是低价作答模型，{fmt(HELDOUT.qa)}。只给证据时，我们 {fmt(HELDOUT.oracle)}，论文 {lmeOracle ? lmeOracle.display : ""}。
          作答模型、判分模型与题目子集都不同，这些数字不构成排名。
        </p>

        <H3>LoCoMo J（类别 1–4）</H3>
        <p className="mt-4 max-w-[64ch] text-[15px] leading-[1.8] text-[var(--color-text-secondary)]">
          我们：{fmt(LOCOMO.j)}，{TIERS.reader}作答，判 {LOCOMO.judgedTimes} 次。
        </p>
        <div className="mt-4">
          <CompetitorTable caption="LoCoMo 公开 J 分" rows={LOCOMO_PUBLIC} />
        </div>
        <p className="mt-4 max-w-[64ch] text-[15px] leading-[1.8] text-[var(--color-text-secondary)]">
          按档次看：低价闭源小模型作答的公开值为 {locomoCheap}；标「未披露」的行不知道作答档次；
          我们判分只判 {LOCOMO.judgedTimes} 次，公开常见做法是 3 次取均值。「全文上下文基线」行是同论文的对照基线，不算系统。
        </p>

        <H3>会话检索</H3>
        <div className="mt-4">
          <DataTable
            caption="LongMemEval 会话检索 any@5 对照"
            head={["来源", "any@5", "说明"]}
            numeric={[1]}
            minWidth="32rem"
            rows={SESSION_RETRIEVAL_COMPARE.rows.map((r) => [r.label, fmt(r.value), r.note])}
          />
        </div>
        <p className="mt-3 text-[15px] leading-[1.8] text-[var(--color-text-secondary)]">
          公开审计记录：<ExtLink href={SESSION_RETRIEVAL_COMPARE.auditUrl}>{SESSION_RETRIEVAL_COMPARE.auditLinkText}</ExtLink>
        </p>

        <H3>更强或未披露作答口径下的厂商数字（单列，不与上表比）</H3>
        <div className="mt-4">
          <DataTable
            caption="更强或未披露作答口径下的厂商自报数字"
            head={["基准", "系统", "数字", "作答档次", "链接"]}
            numeric={[2]}
            minWidth="36rem"
            rows={[...strongerLme, ...strongerLocomo].map((r) => [
              r.bench,
              r.system,
              r.display,
              r.tier,
              <ExtLink key="l" href={r.url} layout="cell">{r.linkText}</ExtLink>,
            ])}
          />
        </div>

        <H3>本领域自报数字的问题</H3>
        <ul className="mt-4 max-w-[64ch] space-y-3 text-base leading-[1.8] text-[var(--color-text-secondary)]">
          {FIELD_PROBLEMS.map((p) => (
            <Item key={p.text}>
              {p.text}
              {"url" in p && p.url ? (
                <>
                  {" "}
                  <ExtLink href={p.url} layout="inline">{p.linkText}</ExtLink>
                </>
              ) : null}
            </Item>
          ))}
        </ul>
      </Section>

      {/* 10 成本与复现 */}
      <Section id="cost" labelledBy="cost-title">
        <SectionTitle id="cost-title" eyebrow="成本与复现">
          花了多少，怎么自己跑一遍。
        </SectionTitle>
        <List>
          <Item>token：{COST.tokens}。</Item>
          <Item>
            嵌入：GPU 上单条 {COST.embedGpuMs} ms；容器 CPU 版满载约 {COST.embedCpuSeconds} s。
          </Item>
          <Item>
            长输入：默认 batch 2048 token 装不下长轮次（{COST.batchFailTokens} token 即报错），改用 8192 上下文的变体，
            并设 <Code>max_input_chars = {COST.maxInputChars}</Code>（个别轮次长达 {COST.longestTurnChars}字符）。
          </Item>
          <Item>
            并发：逐题独立、有界并发，<Code>--jobs {COST.jobs}</Code> 的墙钟约为串行的 1/3。
          </Item>
        </List>

        <H3>复现命令</H3>
        <pre
          tabIndex={0}
          aria-label="复现命令"
          className="code-block mt-4 p-4 outline-none focus-visible:ring-2 focus-visible:ring-[var(--lt-accent)]"
        >
          {COST.reproCommand}
        </pre>

        <H3>数据与代码</H3>
        <dl className="mt-4 space-y-3 text-[15px] leading-[1.8] text-[var(--color-text-secondary)]">
          <div>
            <dt className={th}>LongMemEval_S sha256</dt>
            <dd>
              <Mono>{DATASETS.lme.sha256}</Mono>
            </dd>
          </div>
          <div>
            <dt className={th}>LoCoMo sha256</dt>
            <dd>
              <Mono>{DATASETS.locomo.sha256}</Mono>
            </dd>
          </div>
          <div>
            <dt className={th}>代码仓</dt>
            <dd>
              <ExtLink href={COST.repoUrl}>{COST.repo}</ExtLink>
            </dd>
          </div>
          <div>
            <dt className={th}>提交</dt>
            <dd>
              <ul className="space-y-1">
                {COST.commits.map((c) => (
                  <li key={c.hash}>
                    <Mono>{c.hash}</Mono>
                    <span className="ml-3">{c.what}</span>
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>
      </Section>

      {/* 11 局限与下一版计划 */}
      <Section id="limits" labelledBy="limits-title">
        <SectionTitle id="limits-title" eyebrow="局限与下一版计划">
          没做到的，和接下来要做的。
        </SectionTitle>

        <H3>局限</H3>
        <List>
          {LIMITS.map((l) => (
            <Item key={l}>{l}</Item>
          ))}
        </List>

        <H3>下一版改造计划</H3>
        <p className="mt-3 max-w-[64ch] text-[15px] leading-[1.8] text-[var(--color-text-secondary)]">
          分四组，每项写目标与验证方式。
        </p>
        <div className="mt-6">
          {PLAN.map((g) => (
            <Disclosure
              key={g.group}
              summary={
                <span className="text-[1.0625rem]">
                  {g.group}
                  <span className="ml-3 font-mono text-[12px] text-[var(--color-text-muted)]">{g.items.length} 项</span>
                </span>
              }
            >
              <ol className="space-y-5">
                {g.items.map((it) => (
                  <li key={it.n}>
                    <p className="font-medium text-[var(--lt-ink)]">
                      <span className="mr-2 font-mono text-[12px] text-[var(--color-text-muted)]">{it.n}.</span>
                      {it.title}
                    </p>
                    <p className="mt-1">
                      <span className={`${th} mr-2`}>目标</span>
                      {it.goal}
                    </p>
                    <p className="mt-1">
                      <span className={`${th} mr-2`}>验证</span>
                      {it.verify ?? "未单列"}
                    </p>
                  </li>
                ))}
              </ol>
            </Disclosure>
          ))}
        </div>

        <H3>相关链接</H3>
        <ul className="mt-3 space-y-0 text-[15px] text-[var(--color-text-secondary)]">
          <li>
            <Link href={LINKS.product} className={`${LINK_CLASS} inline-flex min-h-11 items-center`}>
              Memorus 产品页
            </Link>
          </li>
          <li>
            <ExtLink href={LINKS.docs}>文档</ExtLink>
          </li>
          <li>
            <ExtLink href={LINKS.repo}>代码仓</ExtLink>
          </li>
        </ul>
      </Section>
    </>
  );
}

/** 竞品表：系统 / 数字 / 作答档次 / 来源类型 / 链接。 */
function CompetitorTable({ caption, rows }: { caption: string; rows: readonly Competitor[] }) {
  return (
    <DataTable
      caption={caption}
      head={["系统", "数字", "作答档次", "来源类型", "链接"]}
      numeric={[1]}
      minWidth="46rem"
      rows={rows.map((r) => [
        <span key="s">
          {r.system}
          {r.note ? <span className="block text-[12px] text-[var(--color-text-muted)]">{r.note}</span> : null}
        </span>,
        r.display,
        r.tier,
        r.kind,
        <ExtLink key="l" href={r.url} layout="cell">
          {r.linkText}
        </ExtLink>,
      ])}
    />
  );
}
