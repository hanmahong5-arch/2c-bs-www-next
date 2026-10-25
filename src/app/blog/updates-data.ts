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
    date: "2026-10",
    title: "官网转化可信度：ICP、可复制接入、价目 CTA",
    desc: "首页补 Ideal Customer Profile；Memorus 首屏加 CLI 接入示意与试点下一步；Hub 显式挂「按量价格 / 私有部署」；Switch 下载区写清安装 → 登录 → 推广码路径。",
    tags: ["Web", "Memorus", "Hub", "Switch"],
  },
  {
    date: "2026-10",
    title: "Memorus 产品页改版，Hub 公开按量价格",
    desc: "Memorus 主叙事改为「记得住，也查得清」，补时点查询演示与同口径基准；hub.lurus.cn 价目实时读自公开接口。官网补邀请链接转发、Switch 推广码落地，并收齐发现路径。",
    tags: ["Memorus", "Hub", "Web"],
  },
  {
    date: "2026-10",
    title: "Lugo 钱路闸门：下单、退款、对账逐笔可查",
    desc: "订单下单即带过期、关单与商户号核对；退款跟踪到终态；渠道日账单与平台台账自动比对，差异进控制台「对账问题」。在线收款代码就绪，待首个真实商户开通验证。",
    tags: ["Lugo", "Billing"],
  },
  {
    date: "2026-10",
    title: "Kova 上生产集群，支持从 Dify 导入",
    desc: "kova-rest 部署到 kova.lurus.cn 并每日异地备份；kova spec import dify 导入 Dify 工作流，跑不了的节点逐个列进报告；--suggest-gates 建议审批点放在哪；人工决定记下决定人。",
    tags: ["Kova"],
  },
  {
    date: "2026-10",
    title: "Hub 新控制台与企业功能",
    desc: "新控制台全面取代旧界面；企业租户支持付款方、成员角色、邀请与账户密钥、租户审计；项目月度预算上限在扣费前生效。",
    tags: ["Hub"],
  },
  {
    date: "2026-10",
    title: "统一登录与企业身份",
    desc: "平台登录页成为各产品唯一的登录入口，手机 APP 与网页登录态打通；此前上线通行密钥（Passkey）、异常登录检测、SCIM 2.0 目录同步与企业域名验证。",
    tags: ["Lugo", "Identity"],
  },
  {
    date: "2026-10",
    title: "Lugo 产品页上线",
    desc: "账号、钱包与收款底座有了自己的介绍页：每客户独立安装，装完以「交付就绪」看板全绿为终点。",
    tags: ["Lugo", "Web"],
  },
  {
    date: "2026-09",
    title: "Memorus 公开基准报告",
    desc: "LongMemEval_S held-out 问答 0.837、会话检索 any@5 0.971、LoCoMo J 0.746；数据、流程、失败与下一版计划全部公开。",
    tags: ["Memorus", "Benchmark"],
  },
  {
    date: "2026-06",
    title: "hub.lurus.cn BETA 公测",
    desc: "兼容主流 API 格式的网关开放注册，30+ 模型智能路由，注册即送 ¥36 免费额度，无需信用卡。",
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
    desc: "Lurus Hub（lurus-newhub）上线预生产：兼容主流 API 格式的接口、多租户隔离、智能渠道路由、实时用量分析。",
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
