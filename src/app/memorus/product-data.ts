// Memorus 产品页（/memorus）的全部数据：首屏数字卡、痛点→能力、六个能力卡、时点查询示例、
// 同口径基准表、性能与部署、接入方式。页面只从这里取数。
// 基准数字一律取自 ./benchmarks/data（报告页的单一真源），这里不重复手写。
// 只写「做到什么」（功能层），不写「怎么做到」（实现机制）；不出现任何模型名，作答模型只写档位。

import { DATASETS, HEADLINE, HELDOUT, LOCOMO, type Ci95 } from "./benchmarks/data";

// ───────────────────────── 链接 ─────────────────────────

export const LINKS = {
  benchmarks: "/memorus/benchmarks",
  docs: "https://docs.lurus.cn/memx/",
  quickstart: "https://docs.lurus.cn/memx/quickstart",
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
    pain: "什么都存下来",
    painDetail: "密钥和整段对话会一起留下。",
    answer: "先脱敏，再抽取",
    answerDetail: "默认写入前先脱敏，再从对话里抽取值得留下的事实。默认抽取是本地规则，不调用外部模型；hybrid 与 llm 需要另行开启并配置模型服务。脱敏失败时这次写入不落库。这套默认流程可以关掉；关掉之后，写入不再脱敏、不再抽取，也不再去重。经服务接口写入的记忆目前还没有来源记录。",
  },
  {
    key: "facts-change",
    pain: "事实会变",
    painDetail: "预算改了三次，只留下最后一次，更早的说法就没了。",
    answer: "旧值留作历史",
    answerDetail: "同一事实出现新值时，旧记忆标成已被取代，检索时排在后面。新增、修改、删除都记入变更历史，可以按条查询，接口是 GET /api/v1/memories/{id}/history。",
  },
  {
    key: "erasure",
    pain: "用户要求删除",
    painDetail: "删了原文，检索时还能搜出来，等于没删。",
    answer: "原文和索引一并移除",
    answerDetail: "一次删除请求，原文和检索索引一并移除。备份中的副本尚未纳入删除传播。",
  },
] as const;

// ───────────────────────── S3 六个能力卡 ─────────────────────────

export const CAPABILITIES = [
  {
    key: "raw",
    title: "先脱敏，再抽取",
    tagline: "默认从对话里抽取",
    body: "默认写入前先脱敏，再从对话里抽取值得留下的事实。默认抽取是本地规则，不调用外部模型；hybrid 与 llm 需要另行开启并配置模型服务。脱敏失败时这次写入不落库。这套默认流程可以关掉；关掉之后，写入不再脱敏、不再抽取，也不再去重。经服务接口写入的记忆目前还没有来源记录。",
  },
  {
    key: "asof",
    title: "旧值留作历史",
    tagline: "检索时排在后面",
    body: "同一事实出现新值时，旧记忆标成已被取代，检索时排在后面。新增、修改、删除都记入变更历史，可以按条查询，接口是 GET /api/v1/memories/{id}/history。",
  },
  {
    key: "erasure",
    title: "按用户或按条删除",
    tagline: "原文和索引一并移除",
    body: "按用户或按条删除，原文和检索索引一并移除。备份中的副本尚未纳入删除传播。",
  },
  {
    key: "tenant",
    title: "跨租户隔离",
    tagline: "默认关闭",
    body: "服务端可以按密钥区分租户，默认关闭。",
  },
  {
    key: "team",
    title: "团队作用域",
    tagline: "默认是全局",
    body: "每条记忆带一个作用域：全局、某个项目或某个团队。按项目检索时，返回该项目与全局的并集；按团队检索同理。",
  },
  {
    key: "trust",
    title: "可信度核验",
    tagline: "源头变了会被标出",
    body: "锚定到源文件的记忆，检索时会重新核对。源头变了，结果里会标出来。对陈旧记忆默认只标注，也可以配置为降权或剔除。命令行 memorus-r verify 可以批量核对。",
  },
] as const;

// ───────────────────────── S4 示例时间轴（纯前端）─────────────────────────

export interface AsOfEvent {
  key: string;
  /** 时间轴上的月份标签 */
  month: string;
  date: string;
  value: string;
  /** 示例里的这一句 */
  quote: string;
}

export const ASOF_EVENTS: readonly AsOfEvent[] = [
  {
    key: "jan",
    month: "一月",
    date: "2026-01-08",
    value: "10 万",
    quote: "项目预算先按 10 万来，后面再看。",
  },
  {
    key: "mar",
    month: "三月",
    date: "2026-03-14",
    value: "15 万",
    quote: "预算批下来了，改成 15 万。",
  },
  {
    key: "may",
    month: "五月",
    date: "2026-05-20",
    value: "12 万",
    quote: "砍掉一部分需求，预算调到 12 万。",
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
  { key: "binary", title: "两个可执行文件", body: "服务是 memorus-server，命令行是 memorus-r。不需要先装运行时或数据库。" },
  { key: "sqlite", title: "默认 SQLite", body: "未设路径时为内存态。默认不依赖外部数据库、缓存或消息队列。" },
  { key: "no-db", title: "无需外部数据库", body: "默认构建只链接 SQLite。其他向量库后端要在构建时显式开启。" },
  {
    key: "surfaces",
    title: "REST · MCP · CLI · 绑定",
    body: "REST 接口、MCP 服务和命令行是同一套引擎，并有 Python、Node 与 C FFI 绑定。WASM 绑定是另一套独立实现。",
  },
] as const;

/**
 * 工程验证（非公开基准）。数字转录自 2b-svc-memorus
 * `doc/quality-baseline-2026-10-26.md`；改数字前先复跑该文命令。
 */
export const ENGINEERING = {
  date: "2026-10-26",
  ref: "a9d04ae",
  testsPassed: 3125,
  testsFailed: 0,
  testsIgnored: 12,
  /** Schema Graph + LogStore 行覆盖（llvm-cov） */
  featureLineCoveragePct: 98.1,
  featureLineCoverageNote: "schema_graph + log_store；门禁 ≥95%",
  schemaGraphHttpTests: 11,
  note: "WSL 实跑；排除 Python 绑定。公开问答/检索分数见基准报告，不写在这里。",
} as const;

// ───────────────────────── S7 接入 ─────────────────────────

export const INTEGRATIONS = [
  { key: "cli", title: "命令行", body: "learn / search / forget / list 等子命令，适合脚本与本地使用。", code: "memorus-r search \"项目预算\"" },
  {
    key: "rest",
    title: "REST",
    body: "非本机地址启动时必须配置 API 密钥，否则拒绝启动。按密钥区分租户，默认关闭。另有按用户擦除数据的接口。",
    code: "GET /api/v1/status",
  },
  {
    key: "mcp",
    title: "MCP",
    body: "本地 stdio，或服务端 HTTP 端点。记忆操作以工具形式暴露。",
    code: null,
  },
  { key: "bindings", title: "语言绑定", body: "Python、Node 与 C FFI 在你自己的进程里调用同一套引擎。WASM 绑定是另一套独立实现。", code: null },
] as const;
