// Memorus 产品页（/memorus）的全部数据：首屏数字卡、痛点→能力、六个能力卡、时点查询示例、
// 同口径基准表、性能与部署、接入方式。页面只从这里取数。
// 基准数字一律取自 ./benchmarks/data（报告页的单一真源），这里不重复手写。
// 只写「做到什么」（功能层），不写「怎么做到」（实现机制）；不出现任何模型名，作答模型只写档位。

import { DATASETS, HEADLINE, HELDOUT, LOCOMO, type Ci95 } from "./benchmarks/data";

// ───────────────────────── 链接 ─────────────────────────

export const LINKS = {
  benchmarks: "/memorus/benchmarks",
  docs: "https://docs.lurus.cn/memx/",
  pilot: "mailto:contact@lurus.cn?subject=Memorus%20%E8%AF%95%E7%82%B9%E7%94%B3%E8%AF%B7",
  pilotLabel: "contact@lurus.cn",
} as const;

// ───────────────────────── S1 首屏数字卡 ─────────────────────────

export interface HeroStat {
  key: string;
  label: string;
  value: number;
  ci95: Ci95;
  n: number;
  /** 数字下方的一行补充 */
  note: string;
}

const [H_QA, H_RET, H_LOCOMO] = HEADLINE;

export const HERO_STATS: readonly HeroStat[] = [
  {
    key: H_QA.key,
    label: "LongMemEval-S held-out · 问答",
    value: H_QA.value,
    ci95: H_QA.ci95,
    n: H_QA.n,
    note: `低价档作答模型；同一作答模型只给证据为 ${HELDOUT.oracle.toFixed(3)} [${HELDOUT.oracleCi95[0].toFixed(3)}, ${HELDOUT.oracleCi95[1].toFixed(3)}]`,
  },
  {
    key: H_RET.key,
    label: "LongMemEval-S held-out · 检索 any@5",
    value: H_RET.value,
    ci95: H_RET.ci95,
    n: H_RET.n,
    note: "前 5 条结果至少覆盖一段证据会话",
  },
  {
    key: H_LOCOMO.key,
    label: "LoCoMo（类别 1–4）· 判分",
    value: H_LOCOMO.value,
    ci95: H_LOCOMO.ci95,
    n: H_LOCOMO.n,
    note: "低价档作答模型，判 1 次",
  },
];

// ───────────────────────── S2 痛点 → 能力 ─────────────────────────

export const PAIN_POINTS = [
  {
    key: "summary-loss",
    pain: "摘要会丢信息",
    painDetail: "只存摘要的记忆，丢掉的细节再也找不回来，也说不清答案从哪来。",
    answer: "原文可回查",
    answerDetail: "原话完整保留；每条答案都能追到出处：哪段会话、哪一轮、谁说的。",
  },
  {
    key: "facts-change",
    pain: "事实会变",
    painDetail: "预算改了三次，只记住最后一次，就答不了「当时是多少」。",
    answer: "可以按时点追问",
    answerDetail: "能问「三月份时预算是多少」；默认回答以现值为准，也能回到过去任一时点。",
  },
  {
    key: "erasure",
    pain: "用户要求删除",
    painDetail: "删了原文，检索时还能搜出来，等于没删。",
    answer: "删除可传播",
    answerDetail: "一次删除请求，原文和检索索引一并移除，之后再也检索不到。",
  },
] as const;

// ───────────────────────── S3 六个能力卡 ─────────────────────────

export const CAPABILITIES = [
  {
    key: "raw",
    title: "原文检索",
    tagline: "无信息损失 · 可审计",
    body: "检索的是原话本身，不是二手摘要。每条结果带出处，答案可以逐条回查。",
  },
  {
    key: "asof",
    title: "时点查询",
    tagline: "问「当时」，答「当时」",
    body: "同一件事前后说法不同时，能区分新旧说法；默认答现值，也能按任一时点回答，并给出当时成立的原文。",
  },
  {
    key: "erasure",
    title: "删除可传播",
    tagline: "删一次，删干净",
    body: "按用户或按条删除，原文和检索索引一并移除；删除只作用于本租户。",
  },
  {
    key: "tenant",
    title: "跨租户隔离",
    tagline: "任何统计量不跨租户",
    body: "数据、检索与各类统计按租户隔开，一个租户的内容与用词分布不会影响、也推不出另一个租户的结果。",
  },
  {
    key: "team",
    title: "团队记忆治理",
    tagline: "提名 · 评审 · 再共享",
    body: "个人记忆要先提名、经评审才进入团队共享；设为强制的团队规则需要管理员权限。",
  },
  {
    key: "trust",
    title: "可信度核验",
    tagline: "源头变了会被标出",
    body: "记忆引用的源头（例如某个源文件里的一段文字）变了，检索结果里会标出来，旧结论不会悄悄混进回答。",
  },
] as const;

// ───────────────────────── S4 时点查询演示（示例数据，纯前端）─────────────────────────

export interface AsOfEvent {
  key: string;
  /** 时间轴上的月份标签 */
  month: string;
  date: string;
  value: string;
  /** 当时那句原话 */
  quote: string;
  source: string;
}

export const ASOF_QUESTION = "项目预算是多少？";

export const ASOF_EVENTS: readonly AsOfEvent[] = [
  {
    key: "jan",
    month: "一月",
    date: "2026-01-08",
    value: "10 万",
    quote: "项目预算先按 10 万来，后面再看。",
    source: "会话 #12 · 第 4 轮 · 用户",
  },
  {
    key: "mar",
    month: "三月",
    date: "2026-03-14",
    value: "15 万",
    quote: "预算批下来了，改成 15 万。",
    source: "会话 #31 · 第 2 轮 · 用户",
  },
  {
    key: "may",
    month: "五月",
    date: "2026-05-20",
    value: "12 万",
    quote: "砍掉一部分需求，预算调到 12 万。",
    source: "会话 #47 · 第 7 轮 · 用户",
  },
];

export interface AsOfView {
  key: string;
  label: string;
  /** 追问的时点（显示用） */
  asOf: string;
  /** 该时点成立的那条事件 */
  eventKey: AsOfEvent["key"];
}

export const ASOF_VIEWS: readonly AsOfView[] = [
  { key: "now", label: "现在", asOf: "现在", eventKey: "may" },
  { key: "end-mar", label: "三月底", asOf: "2026-03-31", eventKey: "mar" },
  { key: "end-jan", label: "一月底", asOf: "2026-01-31", eventKey: "jan" },
];

// ───────────────────────── S5 同口径基准表 ─────────────────────────

export interface ProtocolRow {
  dataset: string;
  n: number;
  accuracy: number;
  ci95: Ci95;
  /** 该 n 下可检出的最小差异 */
  mde: string;
  mdeNote: string;
  reader: string;
  judge: string;
  /** 每题阅读上下文 */
  context: string;
  runs: string;
  /** 参照行（只给证据的上限），视觉弱化 */
  reference?: boolean;
}

const READER_TIER = "低价档 · 关闭推理";
const JUDGE = "另一厂商判分模型 · 官方判分提示";

export const PROTOCOL_ROWS: readonly ProtocolRow[] = [
  {
    dataset: "LongMemEval-S held-out",
    n: HELDOUT.questions,
    accuracy: HELDOUT.qa,
    ci95: H_QA.ci95,
    mde: "约 7pp",
    mdeNote: "p_d=0.10 时 7.25pp",
    reader: READER_TIER,
    judge: JUDGE,
    context: "约 1.3 万 token",
    runs: "1 次",
  },
  {
    dataset: "LongMemEval-S held-out\n只给证据（上限参照）",
    n: HELDOUT.questions,
    accuracy: HELDOUT.oracle,
    ci95: HELDOUT.oracleCi95,
    mde: "约 7pp",
    mdeNote: "p_d=0.10 时 7.25pp",
    reader: "同一作答模型",
    judge: "同上",
    context: "仅证据会话",
    runs: "1 次",
    reference: true,
  },
  {
    dataset: `LoCoMo（类别 ${DATASETS.locomo.scoredCategories}）`,
    n: LOCOMO.n,
    accuracy: LOCOMO.j,
    ci95: H_LOCOMO.ci95,
    mde: "约 2.8pp",
    mdeNote: "p_d=0.15 时 2.76pp；p_d=0.10 时 2.26pp",
    reader: READER_TIER,
    judge: "同上 · LoCoMo 公开判分提示",
    context: `${LOCOMO.contextTokens.replace("k", " 千")} token`,
    runs: `${LOCOMO.judgedTimes} 次`,
  },
];

export const PROTOCOL_HEAD = [
  "数据集",
  "n",
  "准确率",
  "95% 区间",
  "该 n 下可检出的最小差异",
  "作答模型档位",
  "判分口径",
  "每题阅读上下文",
  "运行次数",
] as const;

// ───────────────────────── S6 性能与部署 ─────────────────────────

/** 读写延迟（毫秒）。null = 尚未系统测量，页面显示「测量中」；测完后在这里填数。 */
export const LATENCY: {
  write: { p50: number | null; p95: number | null; p99: number | null };
  read: { p50: number | null; p95: number | null; p99: number | null };
  /** 测量环境说明；null = 尚未测量 */
  env: string | null;
} = {
  write: { p50: null, p95: null, p99: null },
  read: { p50: null, p95: null, p99: null },
  env: null,
};

export const DEPLOY_FACTS = [
  { key: "binary", title: "单个二进制文件", body: "一个可执行文件即可运行，不需要先装运行时或数据库。" },
  { key: "sqlite", title: "默认 SQLite", body: "数据落在本地一个文件里；默认零外部依赖。" },
  { key: "no-db", title: "无需外部数据库", body: "需要时可换成其他向量存储后端，改一行配置。" },
  {
    key: "surfaces",
    title: "REST · MCP · CLI · 绑定",
    body: "同一个引擎，提供 REST 接口、MCP 服务、命令行，以及 Python / Node / WASM 语言绑定。",
  },
] as const;

// ───────────────────────── S7 接入 ─────────────────────────

export const INTEGRATIONS = [
  { key: "cli", title: "命令行", body: "learn / search / forget / team 等子命令，适合脚本与本地使用。", code: "memorus-r search \"项目预算\"" },
  {
    key: "rest",
    title: "REST",
    body: "非本机地址启动时必须配置 API 密钥，否则拒绝启动；可按密钥区分租户，提供按用户擦除数据的接口。",
    code: "GET /api/v1/status",
  },
  {
    key: "mcp",
    title: "MCP",
    body: "本地 stdio 或服务端 HTTP 端点；可通过 MCP 接入主流编码助手与智能体框架。",
    code: null,
  },
  { key: "bindings", title: "语言绑定", body: "Python、Node、WASM，在你自己的进程里直接调用。", code: null },
] as const;
