// Memorus 公开基准报告的全部数字与出处。
// 每个数字逐条转录自「页面事实清单」与计划文档 2026-09-29-lme-competitive.md，页面只从这里取数。
// 每个结果条目带 src：集合（dev / held-out / LoCoMo）、日期、提交号或来源；不放任何模型名，一律用档次描述。
// 汇总数（预测命中/落空的条数）由代码从明细计算，不手写。

/** 结果出处：集合 + 日期 + 提交号（或来源说明）。 */
export interface Source {
  set: "dev" | "held-out" | "LoCoMo";
  date: string;
  ref: string;
}

const SRC_HELDOUT = { set: "held-out", date: "2026-09-30", ref: "a629dc2" } as const satisfies Source;
const SRC_LOCOMO = { set: "LoCoMo", date: "2026-09-30", ref: "a629dc2" } as const satisfies Source;
const SRC_DEV = { set: "dev", date: "2026-09-29 起", ref: "fcf6e75" } as const satisfies Source;
const SRC_DEV_PLAN = { set: "dev", date: "2026-09-29 起", ref: "计划文档" } as const satisfies Source;

export const SOURCES = {
  heldout: SRC_HELDOUT,
  locomo: SRC_LOCOMO,
  dev: SRC_DEV,
  devPlan: SRC_DEV_PLAN,
} as const;

// ───────────────────────── 固定措辞（档次描述）─────────────────────────

export const TIERS = {
  reader: "低价通用对话模型（关闭推理）",
  judge: "另一厂商的通用对话模型（关闭推理）",
  sameTierJudge: "与阅读同档的判分模型",
  embed: "开源多语言嵌入模型（568M 参数，1024 维）",
  smallEmbed: "通用小型英文嵌入模型（23M 参数）",
} as const;

// ───────────────────────── 数据集与口径 ─────────────────────────

export const DATASETS = {
  lme: {
    name: "LongMemEval_S（cleaned 版）",
    questions: 500,
    types: 6,
    abstain: 30,
    sessionsPerQuestion: "约 48",
    sha256: "d6f21ea9d60a0d56f34a05b609c79c88a451d2ae03597821ea3d5a9678c3a442",
  },
  locomo: {
    name: "LoCoMo",
    conversations: 10,
    questions: 1986,
    categories: "1–5",
    scored: 1540,
    scoredCategories: "1–4",
    sha256: "79fa87e90f04081343b8c8debecb80a9a6842b76a7aa537dc9fdf651ea698ff4",
  },
  split: {
    dev: 353,
    heldout: 147,
    salt: "memorus-lme-v1:",
  },
} as const;

/** 题型缩写对照（LongMemEval_S）。 */
export const TYPE_KEY = [
  { code: "KU", name: "知识更新" },
  { code: "MS", name: "多会话" },
  { code: "SSA", name: "单会话（助手说过的）" },
  { code: "SSP", name: "单会话（偏好）" },
  { code: "SSU", name: "单会话（用户说过的）" },
  { code: "TR", name: "时间推理" },
] as const;

/** 指标定义。 */
export const METRICS = [
  { name: "any@k", def: "前 k 条命中覆盖至少一个证据会话的题占比（会话级检索）。" },
  { name: "all@k", def: "前 k 条命中覆盖全部证据会话的题占比；多会话题才真正拉开差距。" },
  { name: "ndcg@10", def: "前 10 条命中的排序质量。" },
  { name: "问答准确率", def: "判分模型按官方提示判对的比例。" },
  { name: "oracle", def: "同一作答模型只给证据会话时的准确率，是上限参照。" },
  { name: "J", def: "LoCoMo 的判分口径：判分模型判对的比例，只计类别 1–4。" },
] as const;

// ───────────────────────── 主数（标题区）─────────────────────────

export const HEADLINE = [
  {
    key: "qa",
    label: "LongMemEval_S · 问答准确率",
    value: 0.837,
    aside: "同一作答模型只给证据：0.905",
    scope: "held-out 147 题（含 9 道应弃答）· 只跑一次 · 2026-09-30",
  },
  {
    key: "retrieval",
    label: "LongMemEval_S · 会话检索 any@5",
    value: 0.971,
    aside: "held-out",
    scope: "138 题可评分 · 会话级 · 2026-09-30",
  },
  {
    key: "locomo",
    label: "LoCoMo · J",
    value: 0.746,
    aside: "类别 1–4",
    scope: "1540 题 · 判 1 次 · 2026-09-30",
  },
] as const;

// ───────────────────────── 定稿配置 ─────────────────────────

export const FINAL_CONFIG = {
  retrieval:
    "词法 + 向量混合检索（开源多语言嵌入模型）+ 词法通道清理（查询侧英文功能词、覆盖率只算内容词）+ 嵌入输入截断 8000 字符",
  cleanupFlags: ["query_stopwords", "content_word_coverage"],
  reading: "前 5 个检索会话整本 + 第 6–10 名会话的命中轮 ±1 邻轮",
  readingArgs: "--top-sessions 5 --tail-sessions 5 --neighbors 1",
} as const;

// ───────────────────────── held-out（147 题，只跑一次）─────────────────────────

export const HELDOUT = {
  src: SRC_HELDOUT,
  questions: 147,
  scorable: 138,
  qa: 0.837,
  oracle: 0.905,
  gap: 0.068,
  typeMean: 0.854,
  abstain: { value: 0.889, n: 9 },
  readTokens: "1.94M",
  msOracle: 0.88,
  retrieval: [
    { label: "any@5", value: 0.971 },
    { label: "all@5", value: 0.855 },
    { label: "any@10", value: 0.978 },
    { label: "ndcg@10", value: 0.88 },
  ],
  qaByType: [
    { label: "KU", value: 0.917, n: 12 },
    { label: "MS", value: 0.76, n: 50 },
    { label: "SSA", value: 1.0, n: 15 },
    { label: "SSP", value: 0.667, n: 9 },
    { label: "SSU", value: 1.0, n: 25 },
    { label: "TR", value: 0.778, n: 36 },
  ],
} as const;

// ───────────────────────── LoCoMo（类别 1–4，1540 题）─────────────────────────

export const LOCOMO = {
  src: SRC_LOCOMO,
  j: 0.746,
  n: 1540,
  categories: [
    { label: "single-hop", value: 0.805, n: 841 },
    { label: "temporal", value: 0.729, n: 321 },
    { label: "multi-hop", value: 0.631, n: 282 },
    { label: "open-domain", value: 0.625, n: 96 },
  ],
  contextTokens: "约 2k",
  topTurns: 50,
  judgedTimes: 1,
  f1Range: "0.08–0.21",
  turnsPerConversation: "约 590",
  turnRetrieval: [
    { config: "基线", any5: 0.558, any10: 0.663, ndcg10: 0.448 },
    { config: "定稿（+ 词法清理）", any5: 0.559, any10: 0.658, ndcg10: 0.454 },
  ],
} as const;

// ───────────────────────── dev 迭代（353 题）─────────────────────────

/** dev 检索（会话级；可评分 331–332 题）。null = 事实清单未给。 */
export const DEV_RETRIEVAL = {
  src: SRC_DEV,
  rows: [
    { config: "B0 纯词法（客户默认配置）", any5: 0.828, all5: 0.63, any10: 0.904, all10: null, ndcg10: 0.701 },
    { config: "纯向量（开源多语言嵌入）", any5: 0.958, all5: 0.831, any10: 0.985, all10: 0.889, ndcg10: 0.882 },
    { config: "纯向量（通用小型英文嵌入，截 800 字符）", any5: 0.964, all5: 0.828, any10: 0.979, all10: 0.867, ndcg10: 0.882 },
    { config: "词法 + 向量", any5: 0.973, all5: 0.837, any10: 0.985, all10: 0.892, ndcg10: 0.887 },
    { config: "B1 = 词法 + 向量 + 词法清理（定稿）", any5: 0.973, all5: 0.849, any10: 0.988, all10: 0.901, ndcg10: 0.89 },
  ],
  /** 分题型：词法 + 向量的 any@5 / all@5，对比纯词法 any@5。lexAll5 只有 MS / TR 给出。 */
  byType: [
    { label: "KU", hybridAny5: 1.0, hybridAll5: 0.967, lexAny5: 0.934, lexAll5: null },
    { label: "MS", hybridAny5: 1.0, hybridAll5: 0.701, lexAny5: 0.857, lexAll5: 0.416 },
    { label: "SSA", hybridAny5: 1.0, hybridAll5: 1.0, lexAny5: 0.902, lexAll5: null },
    { label: "SSP", hybridAny5: 0.857, hybridAll5: 0.857, lexAny5: 0.333, lexAll5: null },
    { label: "SSU", hybridAny5: 0.975, hybridAll5: 0.975, lexAny5: 0.875, lexAll5: null },
    { label: "TR", hybridAny5: 0.946, hybridAll5: 0.728, lexAny5: 0.793, lexAll5: 0.543 },
  ],
} as const;

/** dev 问答（含应弃答）。Q3 未采用，单列在 REJECTED 里。 */
export const DEV_QA = {
  src: SRC_DEV,
  oracleTotal: 0.87,
  rows: [
    { step: "oracle（只给证据会话）", total: 0.87, ku: 0.864, ms: 0.819, ssa: 1.0, ssp: 0.857, ssu: 1.0, tr: 0.804, abstain: 0.714, tokens: "2.15M" },
    { step: "Q0 纯词法检索，前 20 命中轮 ±1", total: 0.618, ku: 0.758, ms: 0.349, ssa: 0.902, ssp: 0.333, ssu: 0.911, tr: 0.557, abstain: 0.667, tokens: "3.32M" },
    { step: "Q1 词法 + 向量，前 5 会话整本", total: 0.765, ku: 0.833, ms: 0.566, ssa: 0.976, ssp: 0.571, ssu: 0.978, tr: 0.742, abstain: 0.714, tokens: "4.25M" },
    { step: "Q2 + 词法清理 + 第 6–10 名命中轮 ±1（定稿）", total: 0.813, ku: 0.879, ms: 0.675, ssa: 1.0, ssp: 0.714, ssu: 1.0, tr: 0.742, abstain: 0.667, tokens: "3.53M" },
  ],
} as const;

/** 迭代时间线：每步「改了什么 / 为什么 / 代价」。metric 注明指标，避免把 any@5 与 all@5 混为一谈。 */
export const QA_STEPS = [
  {
    tag: "Q0",
    title: "基线：纯词法检索，只给命中轮",
    metric: "问答（dev 353 题）",
    value: 0.618,
    changed: "纯词法检索，作答上下文为前 20 条命中轮及其前后各 1 轮。",
    why: "起点。失败归因（161 题逐题）显示：多会话题部分召回 25 题、证据齐全但只拿到命中轮 13 题、聚合式问句整体漏召 11 题；时间推理题孪生会话 12 题、旁白漏召 10 题；偏好题问句与证据措辞错配 6 题。",
    cost: "阅读输入 3.32M token。",
    src: SRC_DEV_PLAN,
  },
  {
    tag: "Q1",
    title: "检索换成词法 + 向量，作答改给整本会话",
    metric: "问答（dev 353 题）",
    value: 0.765,
    changed: "检索换成词法 + 向量混合；作答上下文改为前 5 个会话整本。",
    why: "多会话题要跨会话计数、汇总，零散命中轮给不全，所以给整本会话。",
    cost: "阅读输入 4.25M token。",
    src: SRC_DEV,
  },
  {
    tag: "Q2",
    title: "加词法清理，再补第 6–10 名会话的命中轮",
    metric: "问答（dev 353 题）",
    value: 0.813,
    changed: "在 Q1 上加词法通道清理，并给第 6–10 名会话的命中轮 ±1 邻轮（定稿配置）。",
    why: "Q1 逐题拆分显示可挽回的错题主因是前 5 个会话装不全兄弟会话；离线估算后选了中间方案（见下表）。",
    cost: "阅读输入 3.53M token。",
    src: SRC_DEV,
  },
] as const;

export const RETRIEVAL_STEPS = [
  {
    tag: "B0",
    title: "基线：纯词法（客户默认配置）",
    metric: "all@5（dev；any@5 0.828）",
    value: 0.63,
    changed: "无改动，客户默认的纯词法检索。",
    why: "起点。纯词法在多会话题上 any@5 0.857，但 all@5 只有 0.416；偏好题 any@5 只有 0.333。",
    cost: "不涉及阅读 token。",
    src: SRC_DEV,
  },
  {
    tag: "B0 + 向量",
    title: "词法 + 向量混合",
    metric: "all@5（dev；any@5 0.828 → 0.973）",
    value: 0.837,
    changed: "在词法之外加向量通道（开源多语言嵌入模型）。",
    why: "纯词法的缺口集中在多会话与偏好题；加向量后多会话题 all@5 0.416 → 0.701，偏好题 any@5 0.333 → 0.857。",
    cost: "多了嵌入开销，见「成本与复现」；不涉及阅读 token。",
    src: SRC_DEV,
  },
  {
    tag: "B1",
    title: "词法通道清理",
    metric: "all@5（dev；any@5 0.973 不变）",
    value: 0.849,
    changed: "查询侧去掉英文功能词，覆盖率只算内容词；两个开关默认关，只影响英文。",
    why: "any@5 已 0.973，剩下的缺口在 all@5：0.837 → 0.849。中文冻结回归集除一项已知用例（17/18 → 18/18）外逐字节不变。",
    cost: "不涉及阅读 token。",
    src: SRC_DEV,
  },
] as const;

/** 作答上下文的离线估算（0 token）：216 道多证据题中证据全在上下文的题数。 */
export const OFFLINE_ESTIMATE = {
  multiEvidenceQuestions: 216,
  rows: [
    { plan: "前 5 会话整本（Q1）", covered: 168, tokens: "基准", chosen: false },
    { plan: "前 5 整本 + 第 6–10 名命中轮 ±1（Q2，选用）", covered: 182, tokens: "阅读输入 +8%", chosen: true },
    { plan: "前 10 会话整本", covered: 183, tokens: "阅读输入 +31%", chosen: false },
  ],
} as const;

/** 可挽回错题拆分（oracle 答对、本次答错）。 */
export const RECOVERABLE = {
  q1: [
    { label: "多会话：缺证据会话", n: 18 },
    { label: "多会话：证据齐全仍错", n: 7 },
    { label: "时间推理：缺证据", n: 13 },
    { label: "偏好：证据齐全仍错", n: 5 },
  ],
  q2Missing: [
    { label: "多会话", n: 9 },
    { label: "时间推理", n: 9 },
    { label: "偏好", n: 1 },
    { label: "知识更新", n: 1 },
  ],
  q2Complete: [
    { label: "多会话", n: 8 },
    { label: "偏好", n: 3 },
    { label: "时间推理", n: 1 },
  ],
} as const;

// ───────────────────────── 没采用的尝试 ─────────────────────────

export const REJECTED = [
  {
    key: "global-idf",
    title: "全局词频（global_idf）",
    result:
      "英文 dev any@5 单开 0.840、叠加后 0.861；但中文冻结回归集 ndcg@10 0.865 → 0.860、abstain_auc 0.710 → 0.683，触发事先写定的「任一 bucket ndcg 降 > 0.005」停止条件。",
    reason: "停止条件成立，不采用；另有多租户侧信道顾虑：全局词频会泄露其他租户的词分布。",
  },
  {
    key: "diversify",
    title: "按会话多样化命中",
    result: "没有跑。",
    reason:
      "会话级指标按会话首次出现的顺序排名，多样化保留每组首条命中的相对顺序，前 k 个会话逐位不变，结构上零收益，所以没有花筛选时间。",
  },
  {
    key: "session-agg",
    title: "会话按命中分数聚合排序（Q3）",
    result:
      "检索 any@5 0.973 → 0.982、all@5 0.849 → 0.870；问答 0.813 → 0.807（差 2 题）。系数「最佳 + 0.3 × 第 2、3 佳」的 0.3 事先写定、没有调过。",
    reason: "检索升、问答未升（0.813 → 0.807，差 2 题），不采用。",
  },
  {
    key: "preference",
    title: "词法清理对偏好题的预测",
    result: "预测翻正 +2 ~ +5 题，实测 0 题。",
    reason: "预测落空，如实记录。",
  },
] as const;

// ───────────────────────── 预测 vs 实测 ─────────────────────────

export interface Prediction {
  /** 事实清单里的组号（1–12） */
  group: number;
  set: "dev" | "held-out" | "LoCoMo";
  item: string;
  predicted: string;
  actual: string;
  hit: boolean;
  note?: string;
}

export const PREDICTIONS = [
  { group: 1, set: "dev", item: "B0 纯词法 any@5", predicted: "0.834 ± 0.03", actual: "0.828", hit: true },
  { group: 2, set: "dev", item: "词法 + 向量 any@5", predicted: "[0.93, 0.97]", actual: "0.973", hit: true, note: "略超上沿" },
  { group: 3, set: "dev", item: "纯向量比词法 + 向量低多少", predicted: "低 0.01–0.04", actual: "低 0.015", hit: true },
  {
    group: 4,
    set: "dev",
    item: "小型英文嵌入纯向量 any@5",
    predicted: "[0.85, 0.93]（我们不信公开的 0.966 能复现）",
    actual: "0.964",
    hit: false,
    note: "公开数字基本复现",
  },
  { group: 5, set: "dev", item: "Q0 oracle", predicted: "[0.85, 0.93]", actual: "0.870", hit: true },
  { group: 5, set: "dev", item: "Q0 检索作答总分", predicted: "[0.60, 0.75]", actual: "0.618", hit: true },
  { group: 5, set: "dev", item: "Q0 应弃答", predicted: "≥ 0.7", actual: "0.667", hit: false },
  {
    group: 6,
    set: "dev",
    item: "同档判分与旧标签的分数差",
    predicted: "≤ ±0.02",
    actual: "+0.034 / +0.039",
    hit: false,
    note: "按事先规则换判分",
  },
  { group: 7, set: "dev", item: "词法清理 any@5", predicted: "[0.84, 0.87]", actual: "0.858", hit: true },
  { group: 7, set: "dev", item: "词法清理 MS all@5", predicted: "[0.43, 0.50]", actual: "0.468", hit: true },
  { group: 7, set: "dev", item: "词法清理翻正的偏好题数", predicted: "+2 ~ +5", actual: "0", hit: false },
  { group: 8, set: "dev", item: "Q1 总分", predicted: "[0.76, 0.84]", actual: "0.765", hit: true },
  { group: 8, set: "dev", item: "Q1 MS", predicted: "[0.60, 0.75]", actual: "0.566", hit: false },
  { group: 8, set: "dev", item: "Q1 SSP", predicted: "[0.62, 0.86]", actual: "0.571", hit: false },
  { group: 8, set: "dev", item: "Q1 TR", predicted: "[0.65, 0.78]", actual: "0.742", hit: true },
  { group: 9, set: "dev", item: "Q2 总分", predicted: "[0.78, 0.83]", actual: "0.813", hit: true },
  { group: 9, set: "dev", item: "Q2 MS", predicted: "[0.62, 0.72]", actual: "0.675", hit: true },
  { group: 9, set: "dev", item: "Q2 TR", predicted: "[0.74, 0.80]", actual: "0.742", hit: true },
  { group: 10, set: "dev", item: "Q3 聚合排序总分", predicted: "[0.81, 0.84]", actual: "0.807", hit: false },
  { group: 11, set: "held-out", item: "any@5", predicted: "[0.95, 0.99]", actual: "0.971", hit: true },
  { group: 11, set: "held-out", item: "all@5", predicted: "[0.80, 0.90]", actual: "0.855", hit: true },
  { group: 11, set: "held-out", item: "问答总分", predicted: "[0.77, 0.85]", actual: "0.837", hit: true },
  { group: 11, set: "held-out", item: "oracle", predicted: "[0.84, 0.91]", actual: "0.905", hit: true },
  { group: 11, set: "held-out", item: "问答与 oracle 的差", predicted: "≤ 0.08", actual: "0.068", hit: true },
  {
    group: 12,
    set: "LoCoMo",
    item: "轮次级检索 any@10",
    predicted: "[0.80, 0.92]",
    actual: "0.658",
    hit: false,
    note: "轮次级、每段约 590 轮，远难于会话级",
  },
  { group: 12, set: "LoCoMo", item: "J", predicted: "[0.70, 0.82]", actual: "0.746", hit: true },
] as const satisfies readonly Prediction[];

/** 汇总由明细计算，不手写。 */
export const PREDICTION_STATS = {
  groups: new Set(PREDICTIONS.map((p) => p.group)).size,
  total: PREDICTIONS.length,
  hit: PREDICTIONS.filter((p) => p.hit).length,
  miss: PREDICTIONS.filter((p) => !p.hit).length,
};

// ───────────────────────── 与公开数字对照 ─────────────────────────

export interface Competitor {
  system: string;
  value: number;
  /** 表里显示的写法（如「约 0.92」） */
  display: string;
  tier: string;
  kind: string;
  url: string;
  linkText: string;
  /** 基线 / 参照行：不参与「高于/低于」的文字对照 */
  baseline?: boolean;
  note?: string;
}

export const LME_PUBLIC = [
  {
    system: "Zep（Graphiti）",
    value: 0.712,
    display: "0.712",
    tier: "强闭源模型（基准官方所用档）",
    kind: "论文",
    url: "https://arxiv.org/abs/2501.13956",
    linkText: "arXiv 2501.13956",
  },
  {
    system: "Supermemory",
    value: 0.816,
    display: "0.816",
    tier: "强闭源模型（基准官方所用档）",
    kind: "他方研究页转引",
    url: "https://mastra.ai/research/observational-memory",
    linkText: "mastra.ai",
  },
  {
    system: "Emergence",
    value: 0.824,
    display: "0.824",
    tier: "强闭源模型（基准官方所用档）",
    kind: "厂商自报",
    url: "https://www.emergence.ai/blog/sota-on-longmemeval-with-rag",
    linkText: "emergence.ai",
    note: "厂商称不可独立复现其内部 0.860 版",
  },
  {
    system: "Mastra Observational Memory",
    value: 0.842,
    display: "0.842",
    tier: "强闭源模型（基准官方所用档）",
    kind: "厂商自报",
    url: "https://mastra.ai/research/observational-memory",
    linkText: "mastra.ai",
  },
  {
    system: "Hindsight",
    value: 0.89,
    display: "0.890",
    tier: "开源权重大模型（120B 级）",
    kind: "厂商论文",
    url: "https://arxiv.org/abs/2512.12818",
    linkText: "arXiv 2512.12818",
  },
  {
    system: "LongMemEval 论文 oracle（只给证据）",
    value: 0.92,
    display: "约 0.92",
    tier: "强闭源模型（基准官方所用档）",
    kind: "论文",
    url: "https://arxiv.org/abs/2410.10813",
    linkText: "arXiv 2410.10813",
    baseline: true,
  },
] as const satisfies readonly Competitor[];

export const LOCOMO_PUBLIC = [
  {
    system: "Mem0",
    value: 0.669,
    display: "0.669",
    tier: "低价闭源小模型",
    kind: "论文（Mem0 自家）",
    url: "https://arxiv.org/abs/2504.19413",
    linkText: "arXiv 2504.19413",
  },
  {
    system: "Mem0 图谱版",
    value: 0.684,
    display: "0.684",
    tier: "低价闭源小模型",
    kind: "论文（Mem0 自家）",
    url: "https://arxiv.org/abs/2504.19413",
    linkText: "arXiv 2504.19413",
  },
  {
    system: "同论文全文上下文基线",
    value: 0.729,
    display: "0.729",
    tier: "低价闭源小模型",
    kind: "论文",
    url: "https://arxiv.org/abs/2504.19413",
    linkText: "arXiv 2504.19413",
    baseline: true,
  },
  {
    system: "Zep（Mem0 论文中测得）",
    value: 0.66,
    display: "0.660",
    tier: "低价闭源小模型",
    kind: "论文（竞争方测得）",
    url: "https://arxiv.org/abs/2504.19413",
    linkText: "arXiv 2504.19413",
  },
  {
    system: "Zep（Zep 自己复现）",
    value: 0.751,
    display: "0.751",
    tier: "未披露",
    kind: "厂商博客",
    url: "https://blog.getzep.com/lies-damn-lies-statistics-is-mem0-really-sota-in-agent-memory/",
    linkText: "blog.getzep.com",
  },
  {
    system: "Letta（文件系统代理）",
    value: 0.74,
    display: "0.740",
    tier: "低价闭源小模型",
    kind: "厂商博客",
    url: "https://www.letta.com/blog/benchmarking-ai-agent-memory/",
    linkText: "letta.com",
  },
  {
    system: "Memobase",
    value: 0.758,
    display: "0.758",
    tier: "未披露",
    kind: "第三方复现",
    url: "https://github.com/Backboard-io/Backboard-Locomo-Benchmark",
    linkText: "github.com",
  },
  {
    system: "MemOS",
    value: 0.733,
    display: "0.733",
    tier: "低价闭源小模型",
    kind: "第三方复现",
    url: "https://arxiv.org/abs/2602.15313",
    linkText: "arXiv 2602.15313",
  },
  {
    system: "MIRIX",
    value: 0.854,
    display: "0.854",
    tier: "低价闭源小模型（新一代）",
    kind: "论文",
    url: "https://arxiv.org/abs/2507.07957",
    linkText: "arXiv 2507.07957",
  },
  {
    system: "MIRIX 论文同实验全文上下文基线",
    value: 0.875,
    display: "0.875",
    tier: "低价闭源小模型（新一代）",
    kind: "论文",
    url: "https://arxiv.org/abs/2507.07957",
    linkText: "arXiv 2507.07957",
    baseline: true,
  },
] as const satisfies readonly Competitor[];

/** 更强 / 未披露作答口径下的厂商数字：单列，不与上面两张表比。 */
export const STRONGER_READER = [
  {
    bench: "LongMemEval",
    system: "Mastra Observational Memory",
    display: "0.949",
    tier: "更新一代低价闭源模型",
    url: "https://mastra.ai/research/observational-memory",
    linkText: "mastra.ai",
  },
  {
    bench: "LongMemEval",
    system: "Hindsight",
    display: "0.914",
    tier: "更新一代强闭源模型",
    url: "https://arxiv.org/abs/2512.12818",
    linkText: "arXiv 2512.12818",
  },
  {
    bench: "LongMemEval",
    system: "Mem0 研究页",
    display: "0.944",
    tier: "未披露",
    url: "https://mem0.ai/blog/ai-memory-benchmarks-in-2026",
    linkText: "mem0.ai",
  },
  {
    bench: "LoCoMo",
    system: "Mem0 研究页",
    display: "0.925",
    tier: "未披露",
    url: "https://mem0.ai/research",
    linkText: "mem0.ai",
  },
] as const;

/** 会话检索对照。 */
export const SESSION_RETRIEVAL_COMPARE = {
  auditUrl: "https://github.com/MemPalace/mempalace/blob/develop/benchmarks/BENCHMARKS.md",
  auditLinkText: "github.com（审计记录）",
  rows: [
    { label: "公开审计", value: 0.966, note: "某开源项目宣称的 Recall@5，审计后等价于「通用小型英文嵌入模型 + 原文分块」的纯稠密检索" },
    { label: "我们复跑", value: 0.964, note: "在自己的写入路径上用同一小模型，dev" },
    { label: "我们定稿", value: 0.973, note: "dev" },
    { label: "我们定稿", value: 0.971, note: "held-out" },
  ],
} as const;

/** 本领域自报数字的问题。 */
export const FIELD_PROBLEMS = [
  {
    text: "同一系统换作答模型，分数可以差 20pp 以上：第三方复现中 LangMem 在两种低价闭源小模型下分别为 0.513 与 0.734。",
    url: "https://arxiv.org/abs/2602.15313",
    linkText: "arXiv 2602.15313",
  },
  {
    text: "Mem0 与 Zep 互测的结果相差约 9pp（0.660 对 0.751），双方各执一词，尚无中立裁定。",
  },
  {
    text: "有开源项目宣称 LongMemEval / LoCoMo 满分，公开审计后回落到常规检索水平；有厂商公开承认其 LoCoMo 99.95% 来自在测试对话上训练。",
    url: "https://github.com/MemPalace/mempalace/blob/develop/benchmarks/BENCHMARKS.md",
    linkText: "github.com（审计记录）",
  },
  {
    text: "判分口径、子集（是否含类别 5、是否只用部分题）、作答上下文预算不同，都会造成 20–40pp 的差异。",
  },
  {
    text: "我们的做法：同一作答模型下报「检索上下文」与「oracle」两档；判分模型经过校验；找不到可复现方法的数字不列（例如声称「两榜第一」却没有给出数字的）。",
  },
] as const;

// ───────────────────────── 判分校验 ─────────────────────────

export const JUDGE_CHECK = {
  agreeOracle: { k: 341, n: 353, rate: 0.966 },
  agreeRetrieval: { k: 337, n: 353, rate: 0.955 },
  substituteFalseAccept: { rate: 0.033, pairs: 60, threshold: "≤ 5%" },
  secondJudgeAgree: 0.84,
  looseOracle: { from: 0.87, to: 0.904 },
  looseRetrieval: { from: 0.618, to: 0.657 },
  looseDeltas: "+0.034 / +0.039",
  presetTolerance: "±0.02",
} as const;

// ───────────────────────── 成本与复现 ─────────────────────────

export const COST = {
  tokens: "模型账户充值后本轮共约 14M token（阅读为主，低价档；判分每轮约 8 万 token）；此前 Q0 两次约 5.5M token 不在此数内",
  embedGpuMs: 28,
  embedCpuSeconds: 1.2,
  batchFailTokens: "3,076",
  maxInputChars: 8000,
  longestTurnChars: "7.6 万",
  jobs: 8,
  reproCommand: `memorus-eval longmemeval --arms staging-lexical-embed --data longmemeval_s_cleaned.json \\
  --split heldout --dump-hits 20 --include-abstention --jobs <N> --out <arm>.jsonl
# 配置补丁：[memory.lexical] query_stopwords = true；[ace.retrieval] content_word_coverage = true
python scripts/eval/qa/lme_qa.py --context retrieval --top-sessions 5 --tail-sessions 5 --neighbors 1 ...
# 作答 / 判分模型由 QA_READER_* / QA_JUDGE_* 环境变量提供，仓库内只出现别名`,
  repo: "LurusTech/Lurus-memorus-r",
  repoUrl: "https://github.com/LurusTech/Lurus-memorus-r",
  commits: [
    { hash: "a629dc2", what: "结果定稿" },
    { hash: "fcf6e75", what: "聚合排序与尾部命中轮" },
    { hash: "80e4720", what: "词法清理（默认关）" },
  ],
} as const;

// ───────────────────────── 局限 ─────────────────────────

export const LIMITS = [
  "作答模型是低价档；强闭源作答模型下的分数我们没有跑，不作推断。",
  "LoCoMo 只判 1 次（公开常见做法是 3 次取均值），也没有跑全文上下文对照（约 3,000 万 token，超出预算）。",
  "held-out 有轻度污染：切分之前，曾在全部 470 题上看过分题型检索汇总，所以 held-out 不是完全干净的。",
  "LongMemEval_S 的会话级 any@5 对小模型也不难，真正拉开差距的是 all@k 与问答。",
  "LoCoMo 轮次级检索 any@10 0.66 是明显的短板。",
  "词法清理开关与「整本会话 + 尾部命中轮」目前只在评测链路里，尚未进入产品默认配置与检索 API。",
  "延迟没有在本轮系统测量，所以不报。",
] as const;

// ───────────────────────── 下一版改造计划 ─────────────────────────

export interface PlanItem {
  n: number;
  title: string;
  goal: string;
  /** null = 事实清单没有单列验证方式 */
  verify: string | null;
}

export const PLAN = [
  {
    group: "检索",
    items: [
      {
        n: 1,
        title: "LoCoMo 短轮次检索",
        goal: "写入时把相邻轮上下文并入检索文本，或命中后按会话、相邻轮扩展。目标：轮次级 any@10 0.66 → ≥ 0.80。",
        verify: "LoCoMo 永不调参，只跑一次。",
      },
      {
        n: 2,
        title: "时间感知检索",
        goal: "查询里的相对日期（「上个月」「三周前」）对 valid_from 软加权。目标：temporal 问答 +5pp。",
        verify: "dev 预测先行，held-out 换新后跑一次。",
      },
      {
        n: 3,
        title: "跨会话兄弟证据召回",
        goal: "目标：held-out all@5 0.855 → ≥ 0.90。",
        verify: "dev 预测先行，held-out 换新后跑一次。",
      },
    ],
  },
  {
    group: "作答上下文进产品",
    items: [
      {
        n: 4,
        title: "「整本会话 + 尾部命中轮」进检索 API",
        goal: "做成检索 API 的分组扩展参数，REST、MCP 与下游业务同源。",
        verify: "评测改走产品 API，分数与评测链路逐题一致。",
      },
      {
        n: 5,
        title: "检索结果带新旧 / 已被取代信息",
        goal: "把新旧、已被取代的信息交给作答侧，针对知识更新题取错新旧值的问题。",
        verify: "知识更新题的可挽回错题清零。",
      },
    ],
  },
  {
    group: "质量与可信",
    items: [
      {
        n: 6,
        title: "第二家厂商判分复核；LoCoMo 判 3 次",
        goal: "用第二家厂商的判分模型复核全部定稿结果；LoCoMo 判 3 次取均值，并补全文上下文对照。",
        verify: "两家判分的逐题一致率与分数差随报告公开。",
      },
      {
        n: 7,
        title: "held-out 换新",
        goal: "新盐重切或换新数据，旧 held-out 转为 dev。",
        verify: "新 held-out 同样先写预测、定稿后只跑一次。",
      },
      {
        n: 8,
        title: "CI 夜间 dev 回归",
        goal: "每次发版在 CI 夜间自动跑 dev 回归，分数随版本公开。",
        verify: "夜间任务产出分数文件，较上一版回退即告警。",
      },
      {
        n: 9,
        title: "公开检索延迟",
        goal: "公开检索延迟 p50 / p95（含嵌入）。",
        verify: "本页补延迟分布，并写明测量环境。",
      },
    ],
  },
  {
    group: "工程",
    items: [
      {
        n: 10,
        title: "随包配置与部署",
        goal: "随包配置启用词法清理开关（只影响英文查询）；嵌入输入上限默认值；GPU 嵌入服务纳入部署；预发环境换新镜像。",
        verify: "下游业务接入验证。",
      },
    ],
  },
] as const satisfies readonly { group: string; items: readonly PlanItem[] }[];

// ───────────────────────── 3D 场景题（说明文字用）─────────────────────────

// 计数（会话数、轮数、证据会话、解释方差）由 scene-projection.tsx 的 sceneStats() 从 scene-data.json 现算。
export const SCENE = {
  questionId: "b5ef892d",
  set: "dev",
  embedDims: 1024,
} as const;

// ───────────────────────── 链接 ─────────────────────────

export const LINKS = {
  product: "/memorus",
  docs: "https://docs.lurus.cn/memx/",
  repo: "https://github.com/LurusTech/Lurus-memorus-r",
} as const;
