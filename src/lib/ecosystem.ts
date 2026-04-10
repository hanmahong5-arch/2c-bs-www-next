/**
 * Lurus Ecosystem Data Model
 *
 * Design:
 *  - Products indexed by ID (O(1) lookup)
 *  - Relationships modeled as a directed graph (adjacency list)
 *  - Domain data separated from UI presentation
 *  - User personas map to recommended product journeys
 *  - Emotional metaphors for each product
 */

// ── Domain types ──

export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  features: readonly string[];
  metaphor: string; // emotional analogy
  badge?: string;
}

export interface ProductGroup {
  id: string;
  name: string;
  priority: "P0" | "P1" | "P2";
  tagline: string;
  metaphor: string;
  productIds: readonly string[];
}

export type RelationType =
  | "powers" // A provides core capability to B
  | "enhances" // A makes B better (optional)
  | "integrates"; // A and B exchange data

export interface ProductRelation {
  from: string;
  to: string;
  type: RelationType;
  label: string; // human-readable explanation
}

export interface Persona {
  id: string;
  title: string;
  description: string;
  icon: string;
  recommendedPath: readonly string[]; // product IDs in visit order
  painPoints: readonly string[];
}

// ── UI presentation (separated from domain) ──

export interface ProductPresentation {
  icon: string;
  href: string;
  color: string; // accent color for this product
}

// ── Data ──

const productMap: Record<string, Product> = {
  hub: {
    id: "hub",
    name: "Lurus Hub",
    tagline: "AI 数据处理枢纽",
    description:
      "30+ LLM 模型统一接入，实时用量分析，智能路由优化，按产品个性化计费。一个 API Key 接入所有 AI 能力。",
    features: [
      "OpenAI 兼容接口，30+ 模型供应商",
      "实时数据处理管道：用量分析 · 成本优化 · 性能监控",
      "智能渠道路由：基于延迟/错误率/成本自动选择最优通道",
      "企业级多租户隔离",
    ],
    metaphor: "你的 AI 中央车站 — 所有列车（模型）在此调度，旅客（请求）总能坐上最快的那班",
    badge: "核心",
  },
  billing: {
    id: "billing",
    name: "账户与计费",
    tagline: "金融级精度",
    description:
      "统一账户体系 + 钱包 + 订阅 + 权益管理。DECIMAL(20,4) 精度，事务性保证，零资金损失。",
    features: [
      "钱包：充值/扣款/冻结/预授权，SQL 原子保护",
      "订阅：自动续费/过期/宽限期状态机",
      "多支付通道：支付宝/微信/Stripe/Creem",
      "Temporal 工作流驱动异步计费",
    ],
    metaphor: "你的金融级保险箱 — 每一分钱的流动都有迹可循，事务原子性像银行系统一样可靠",
  },
  memorus: {
    id: "memorus",
    name: "AI 记忆引擎",
    tagline: "让 AI 记住每一个用户",
    description:
      "持久化 AI 上下文管理，从无状态聊天升级为有记忆的个性化助手。REST API + MCP 双协议。",
    features: [
      "语义搜索：向量化存储 + 相似度检索",
      "自适应上下文：ACE v2.0 自动摘要",
      "多租户隔离：per-user / per-project 记忆空间",
      "MCP Server：兼容所有 MCP 客户端",
    ],
    metaphor: "AI 的海马体 — 让每次对话不再从零开始，用户感觉在和一个真正了解自己的助手交流",
  },
  lucrum: {
    id: "lucrum",
    name: "Lucrum",
    tagline: "AI 驱动的量化交易平台",
    description:
      "AI 策略生成 · 回测验证 · 实盘执行。机构级算法，个人投资者价格。",
    features: [
      "AI 策略顾问：自然语言描述 → 可执行策略",
      "历史回测：多品种多周期回测引擎",
      "实盘执行：对接主流交易所",
      "策略市场：社区共享与订阅",
    ],
    metaphor: "你的 AI 交易副驾 — 用自然语言描述直觉，AI 将其转化为精确的交易策略",
    badge: "Beta",
  },
  kova: {
    id: "kova",
    name: "Kova Engine",
    tagline: "持久执行，崩溃恢复",
    description:
      "Rust 构建的 AI Agent 执行引擎。WAL 崩溃恢复，DAG 任务编排，微秒级延迟，零外部依赖。",
    features: [
      "WAL 持久化：Agent 崩溃后精确恢复",
      "DAG 拓扑调度：复杂工作流编排",
      "多协议：gRPC / REST / MCP / A2A / Python",
      "嵌入式部署：单二进制，无需 Redis/PG",
    ],
    metaphor: "Agent 的黑匣子 — 无论发生什么，WAL 记录了每一步，崩溃后精确恢复到最后的安全点",
  },
  switch: {
    id: "switch",
    name: "Lurus Switch",
    tagline: "桌面 AI 网关",
    description:
      "一键切换 30+ AI 模型，本地加密存储，OIDC 单点登录。你的 AI 模型管理中心。",
    features: [
      "模型切换：OpenAI/Claude/Gemini 一键切换",
      "本地优先：加密存储，离线可用",
      "预设库：社区共享的 system prompt 模板",
    ],
    metaphor: "你的 AI 遥控器 — 一个界面切换所有模型，就像电视遥控器切换频道一样自然",
  },
  creator: {
    id: "creator",
    name: "Lurus Creator",
    tagline: "AI 内容工厂",
    description:
      "视频下载 → AI 转录 → 内容改写 → 多平台发布。单 exe，零依赖。",
    features: [
      "yt-dlp 集成：全平台视频下载",
      "Whisper 转录：多语言语音转文字",
      "AI 改写：一键生成多平台适配内容",
    ],
    metaphor: "你的内容流水线 — 视频进去，多平台内容出来，像工厂的传送带一样高效",
  },
};

const groups: ProductGroup[] = [
  {
    id: "platform",
    name: "Lurus Platform",
    priority: "P0",
    tagline: "企业 AI 基础设施套件",
    metaphor: "一座完整的 AI 城市 — Hub 是中央车站，Billing 是银行，Memorus 是图书馆。你只需「入住」，一切就绪。",
    productIds: ["hub", "billing", "memorus"],
  },
  {
    id: "lucrum",
    name: "Lucrum",
    priority: "P1",
    tagline: "AI 量化交易",
    metaphor: "机构级量化能力的民主化 — 华尔街的武器，个人投资者的价格",
    productIds: ["lucrum"],
  },
  {
    id: "kova",
    name: "Kova",
    priority: "P1",
    tagline: "AI Agent 基础设施",
    metaphor: "Agent 的操作系统 — 就像 Linux 之于服务器，Kova 之于 AI Agent",
    productIds: ["kova"],
  },
  {
    id: "desktop",
    name: "桌面工具",
    priority: "P2",
    tagline: "AI 生产力套件",
    metaphor: "AI 的瑞士军刀 — 小巧但功能齐全，带在身边随时可用",
    productIds: ["switch", "creator"],
  },
];

const relations: ProductRelation[] = [
  { from: "hub", to: "billing", type: "powers", label: "Hub 的每次 API 调用自动触发 Billing 计费" },
  { from: "memorus", to: "hub", type: "enhances", label: "记忆引擎让 Hub 转发的对话拥有上下文" },
  { from: "hub", to: "kova", type: "integrates", label: "Kova Agent 通过 Hub 调用 LLM 模型" },
  { from: "hub", to: "lucrum", type: "integrates", label: "Lucrum 通过 Hub 获取 AI 策略分析能力" },
  { from: "billing", to: "lucrum", type: "powers", label: "Lucrum 的订阅和交易费用由 Billing 管理" },
  { from: "billing", to: "kova", type: "powers", label: "Kova 的 Agent 执行计量由 Billing 结算" },
  { from: "memorus", to: "kova", type: "enhances", label: "Agent 可以通过记忆引擎持久化对话上下文" },
  { from: "switch", to: "hub", type: "integrates", label: "Switch 桌面端通过 Hub API 接入所有模型" },
];

const personas: Persona[] = [
  {
    id: "saas-dev",
    title: "SaaS 开发者",
    description: "我要给产品加 AI 功能，不想自建基础设施",
    icon: "💻",
    recommendedPath: ["hub", "billing", "memorus"],
    painPoints: ["逐个对接 AI API 太累", "计费系统自建太重", "用户聊天没有上下文"],
  },
  {
    id: "enterprise-it",
    title: "企业 IT 负责人",
    description: "我需要统一管理公司各部门的 AI 使用",
    icon: "🏢",
    recommendedPath: ["hub", "billing"],
    painPoints: ["多部门各自对接 AI 供应商", "成本失控无法审计", "缺少统一权限管控"],
  },
  {
    id: "agent-builder",
    title: "Agent 开发者",
    description: "我在构建 AI Agent，需要可靠的执行引擎",
    icon: "🤖",
    recommendedPath: ["kova", "hub", "memorus"],
    painPoints: ["Agent 崩溃丢失状态", "工作流编排太复杂", "缺少持久化记忆"],
  },
  {
    id: "trader",
    title: "量化投资者",
    description: "我想用 AI 做量化交易，但没有编程背景",
    icon: "📈",
    recommendedPath: ["lucrum"],
    painPoints: ["策略开发门槛高", "回测工具碎片化", "实盘对接复杂"],
  },
];

// ── Presentation layer ──

const presentation: Record<string, ProductPresentation> = {
  hub: { icon: "⚡", href: "/platform#hub", color: "#c8a24e" },
  billing: { icon: "🏦", href: "/platform#billing", color: "#c8a24e" },
  memorus: { icon: "🧠", href: "/platform#memory", color: "#4a90e2" },
  lucrum: { icon: "📈", href: "/lucrum", color: "#34d399" },
  kova: { icon: "🔧", href: "/kova", color: "#c678dd" },
  switch: { icon: "🔀", href: "/download#switch", color: "#d19a66" },
  creator: { icon: "🎬", href: "/download#creator", color: "#e5c07b" },
};

// ── Public API ──

/** O(1) product lookup by ID */
export function getProduct(id: string): Product {
  const p = productMap[id];
  if (!p) throw new Error(`Unknown product: ${id}`);
  return p;
}

/** Get all products in a group */
export function getGroupProducts(groupId: string): Product[] {
  const g = groups.find((g) => g.id === groupId);
  if (!g) throw new Error(`Unknown group: ${groupId}`);
  return g.productIds.map((id) => getProduct(id));
}

/** Get presentation data for a product */
export function getPresentation(id: string): ProductPresentation {
  return presentation[id] ?? { icon: "📦", href: "#", color: "#5a5a6e" };
}

/** Get all relationships involving a product */
export function getRelations(productId: string): ProductRelation[] {
  return relations.filter(
    (r) => r.from === productId || r.to === productId
  );
}

/** Get related product IDs (neighbors in the graph) */
export function getRelatedIds(productId: string): string[] {
  const neighbors = new Set<string>();
  for (const r of relations) {
    if (r.from === productId) neighbors.add(r.to);
    if (r.to === productId) neighbors.add(r.from);
  }
  return [...neighbors];
}

/** Get the full product + presentation for rendering */
export function getProductWithUI(id: string) {
  return { ...getProduct(id), ...getPresentation(id) };
}

export { groups, relations, personas, productMap };

export const stats = [
  { value: "30+", label: "AI 模型供应商" },
  { value: "99.9%", label: "SLA 目标" },
  { value: "0.01¥", label: "计费精度" },
  { value: "<100ms", label: "智能路由延迟" },
] as const;
