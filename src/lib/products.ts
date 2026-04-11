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
    tagline: "一座完整的 AI 城市",
    products: [
      {
        id: "hub",
        name: "Lurus Hub",
        tagline: "AI 中央车站",
        description:
          "所有列车（模型）在此调度，旅客（请求）总能坐上最快那班。一个 API Key，30+ 模型即刻接入。",
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
        tagline: "数字金库",
        description:
          "像银行保险箱一样严谨——每一分钱的流动都有迹可循。钱包、订阅、预授权，事务原子性保证。",
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
        tagline: "AI 的海马体",
        description:
          "让每次对话不再从零开始。你的用户会觉得在和一个真正了解自己的助手交流，而不是一个失忆的机器人。",
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
        tagline: "你的 AI 交易副驾",
        description:
          "用自然语言描述你的交易直觉，AI 将其转化为精确策略。华尔街的武器，个人投资者的价格。",
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
        tagline: "Agent 的黑匣子",
        description:
          "无论发生什么，WAL 记录了每一步。崩溃后精确恢复到最后安全点——像飞机黑匣子一样可靠。",
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
        tagline: "你的 AI 遥控器",
        description:
          "像电视遥控器切换频道一样——一个界面切换 30+ AI 模型。本地加密，离线可用。",
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
        tagline: "你的内容流水线",
        description:
          "视频进去，多平台内容出来——像工厂传送带一样高效。下载、转录、改写、发布，一气呵成。",
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
