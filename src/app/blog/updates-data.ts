// 更新日志单一真源 — /blog 页与 RSS feed (blog/rss.xml) 共用，防内容漂移。
// 新增条目在此数组头部插入（倒序）；date 用 "YYYY-MM"。

export interface ChangelogEntry {
  date: string;
  title: string;
  desc: string;
  tags: string[];
}

export const updates: ChangelogEntry[] = [
  {
    date: "2026-06",
    title: "hub.lurus.cn BETA 公测",
    desc: "OpenAI 兼容网关开放注册，30+ 模型智能路由，注册即送 $5 免费额度，无需信用卡。",
    tags: ["Hub", "Beta"],
  },
  {
    date: "2026-06",
    title: "官网首屏性能优化",
    desc: "字体负载 1.2MB → 111KB，布局抖动（CLS）清零，移动端加载体验大幅提升。",
    tags: ["Web"],
  },
  {
    date: "2026-06",
    title: "Lugo 平台品牌发布",
    desc: "网关 / 账户认证 / 计费钱包 / AI 记忆 / 多通道通知五项能力统一为 Lugo 平台口径，官网信息架构同步重构，对比与成本计算前置。",
    tags: ["Platform", "Brand"],
  },
  {
    date: "2026-06",
    title: "Lutu Android 版开放下载",
    desc: "移动端消费者应用 Lutu 正式可下载，接入 Hub 统一 API，同一账户体系管理所有 AI 用量与计费。",
    tags: ["Lutu"],
  },
  {
    date: "2026-05",
    title: "多租户 LLM Hub 进入预生产",
    desc: "Lurus Hub（lurus-newhub）上线预生产：OpenAI 兼容接口、多租户隔离、智能渠道路由、实时用量分析。",
    tags: ["Hub", "Platform"],
  },
  {
    date: "2026-04",
    title: "Lurus Hub 数据处理层上线",
    desc: "ChannelScorer 智能渠道评分 + UsageAggregator 用量聚合管道，实时优化 API 路由决策。",
    tags: ["Platform", "Hub"],
  },
  {
    date: "2026-04",
    title: "产品组架构重组",
    desc: "Platform 产品组整合 Hub / 计费 / Memorus / Admin / 通知 / Lutu，形成完整企业 AI 基础设施套件。",
    tags: ["Platform"],
  },
  {
    date: "2026-03",
    title: "Kova DAG 拓扑调度",
    desc: "有向无环图任务编排引擎，自动并行执行无依赖节点，1468 行核心库 + 22 集成测试。",
    tags: ["Kova"],
  },
  {
    date: "2026-03",
    title: "Platform 计费集成完成",
    desc: "8 个产品接入统一计费，Go SDK 封装，circuit breaker 保护，1052 测试通过。",
    tags: ["Platform", "Billing"],
  },
  {
    date: "2026-03",
    title: "Lucrum 全面改版",
    desc: "品牌升级 (gushen → Lucrum)，140+ 文件重构，算法策略优化。",
    tags: ["Lucrum"],
  },
];
