export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  features: readonly string[];
  href: string;
  badge?: string;
  icon: string;
}

export const productGroups = [
  {
    id: "platform",
    name: "Lurus Platform",
    priority: "P0",
    tagline: "企业 AI 基础设施套件",
    products: [
      {
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
        href: "/platform#hub",
        badge: "核心",
        icon: "⚡",
      },
      {
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
        href: "/platform#billing",
        icon: "🏦",
      },
      {
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
        href: "/platform#memory",
        icon: "🧠",
      },
    ],
  },
  {
    id: "lucrum",
    name: "Lucrum",
    priority: "P1",
    tagline: "AI 量化交易",
    products: [
      {
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
        href: "/lucrum",
        badge: "Beta",
        icon: "📈",
      },
    ],
  },
  {
    id: "kova",
    name: "Kova",
    priority: "P1",
    tagline: "AI Agent 基础设施",
    products: [
      {
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
        href: "/kova",
        icon: "🔧",
      },
    ],
  },
  {
    id: "desktop",
    name: "桌面工具",
    priority: "P2",
    tagline: "AI 生产力套件",
    products: [
      {
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
        href: "/download#switch",
        icon: "🔀",
      },
      {
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
        href: "/download#creator",
        icon: "🎬",
      },
    ],
  },
] as const;

export const stats = [
  { value: "30+", label: "AI 模型供应商" },
  { value: "99.9%", label: "SLA 目标" },
  { value: "0.01¥", label: "计费精度" },
  { value: "<100ms", label: "智能路由延迟" },
];
