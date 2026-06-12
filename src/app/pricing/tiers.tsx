"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const tiers = [
  {
    name: "免费版",
    price: "¥0",
    period: "/月",
    description: "个人开发者和小型项目",
    features: [
      "每月 $5 等值免费额度",
      "30+ 模型全量可用",
      "基础用量仪表盘",
      "社区支持",
    ],
    cta: "免费开始",
    href: "https://hub.lurus.cn",
    highlight: false,
  },
  {
    name: "专业版",
    price: "¥99",
    period: "/月",
    description: "成长团队和中型项目",
    features: [
      "每月 ¥200 等值额度（含）",
      "智能路由 + 成本优化",
      "团队协作（5 成员）",
      "高级数据分析",
      "邮件支持（24h 内响应）",
    ],
    cta: "开始试用",
    href: "https://hub.lurus.cn",
    highlight: true,
  },
  {
    name: "企业版",
    price: "定制",
    period: "",
    description: "大型企业和定制需求",
    features: [
      "无限调用额度",
      "私有部署 / 混合云",
      "专属客服 + SLA 保障",
      "自定义计费规则",
      "审计日志 + SSO",
      "专属技术支持群",
    ],
    cta: "联系销售",
    href: "mailto:sales@lurus.cn",
    highlight: false,
  },
];

export function PricingTiers() {
  return (
    <section className="py-24 border-t border-[var(--color-border)]">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`card p-8 flex flex-col ${
                tier.highlight
                  ? "border-[var(--color-accent)]/60"
                  : ""
              }`}
            >
              {tier.highlight && (
                <div className="text-xs text-[var(--color-ochre)] font-medium mb-4">
                  最受欢迎
                </div>
              )}
              <h3 className="text-xl font-bold text-[var(--color-text-primary)]">
                {tier.name}
              </h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-gradient-gold">
                  {tier.price}
                </span>
                <span className="text-sm text-[var(--color-text-muted)]">
                  {tier.period}
                </span>
              </div>
              <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                {tier.description}
              </p>

              <ul className="mt-6 space-y-3 flex-1">
                {tier.features.map((f) => (
                  <li
                    key={f}
                    className="text-sm text-[var(--color-text-secondary)] flex items-start gap-2"
                  >
                    <span className="text-[var(--color-success)] mt-0.5 shrink-0">
                      ✓
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href={tier.href}
                className={`mt-8 w-full ${
                  tier.highlight ? "btn-primary" : "btn-secondary"
                }`}
              >
                {tier.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Tier 功能对比矩阵 ──
// 行内容全部来自 tier 卡片已有承诺 + TrustBand 既有数字，不引入新能力声明。
type MatrixCell = string | boolean;

const matrixRows: { feature: string; free: MatrixCell; pro: MatrixCell; enterprise: MatrixCell }[] = [
  { feature: "月度额度", free: "$5 等值", pro: "¥200 等值（含）", enterprise: "无上限" },
  { feature: "模型接入", free: "30+ 全量", pro: "30+ 全量", enterprise: "30+ 全量" },
  { feature: "智能路由 + 成本优化", free: false, pro: true, enterprise: true },
  { feature: "计费精度", free: "¥0.0001", pro: "¥0.0001", enterprise: "自定义计费规则" },
  { feature: "用量分析", free: "基础仪表盘", pro: "高级分析", enterprise: "高级分析 + 审计日志" },
  { feature: "团队成员", free: "1", pro: "5", enterprise: "无限制" },
  { feature: "SSO 单点登录", free: false, pro: false, enterprise: true },
  { feature: "私有部署 / 混合云", free: false, pro: false, enterprise: true },
  { feature: "SLA 保障", free: false, pro: false, enterprise: "合同级" },
  { feature: "支持渠道", free: "社区", pro: "邮件（24h 内）", enterprise: "专属技术支持群" },
];

function MatrixValue({ value }: { value: MatrixCell }) {
  if (value === true) {
    return <span className="text-[var(--color-success)]" aria-label="支持">✓</span>;
  }
  if (value === false) {
    return <span className="text-[var(--color-text-muted)] opacity-50" aria-label="不支持">—</span>;
  }
  return <span className="text-[var(--color-text-secondary)]">{value}</span>;
}

export function TierMatrix() {
  return (
    <section className="py-24 border-t border-[var(--color-border)]">
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[var(--color-text-primary)]">
            功能对比
          </h2>
          <p className="mt-4 text-[var(--color-text-secondary)]">
            三个版本的完整差异，一张表说清。
          </p>
        </div>

        <div className="card overflow-x-auto">
          <table className="w-full text-sm min-w-[560px]">
            <thead>
              <tr className="border-b border-[var(--color-border)]">
                <th className="text-left p-4 text-[var(--color-text-muted)] font-medium">功能</th>
                <th className="text-center p-4 text-[var(--color-text-muted)] font-medium">免费版</th>
                <th className="text-center p-4 text-[var(--color-accent)] font-medium">专业版</th>
                <th className="text-center p-4 text-[var(--color-text-muted)] font-medium">企业版</th>
              </tr>
            </thead>
            <tbody>
              {matrixRows.map((row) => (
                <tr key={row.feature} className="border-b border-[var(--color-border)] last:border-0">
                  <td className="p-4 text-[var(--color-text-primary)] font-medium">{row.feature}</td>
                  <td className="p-4 text-center"><MatrixValue value={row.free} /></td>
                  <td className="p-4 text-center"><MatrixValue value={row.pro} /></td>
                  <td className="p-4 text-center"><MatrixValue value={row.enterprise} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

const usageItems = [
  {
    model: "GPT-4o",
    input: "¥0.015 / 1K tokens",
    output: "¥0.060 / 1K tokens",
  },
  {
    model: "GPT-4o mini",
    input: "¥0.001 / 1K tokens",
    output: "¥0.004 / 1K tokens",
  },
  {
    model: "Claude Sonnet",
    input: "¥0.018 / 1K tokens",
    output: "¥0.090 / 1K tokens",
  },
  {
    model: "Claude Haiku",
    input: "¥0.007 / 1K tokens",
    output: "¥0.036 / 1K tokens",
  },
  {
    model: "DeepSeek V3",
    input: "¥0.001 / 1K tokens",
    output: "¥0.002 / 1K tokens",
  },
  {
    model: "DeepSeek R1",
    input: "¥0.004 / 1K tokens",
    output: "¥0.016 / 1K tokens",
  },
  {
    model: "Gemini 2.5 Pro",
    input: "¥0.008 / 1K tokens",
    output: "¥0.030 / 1K tokens",
  },
  {
    model: "Qwen3-Max",
    input: "¥0.002 / 1K tokens",
    output: "¥0.010 / 1K tokens",
  },
];

export function UsagePricing() {
  return (
    <section className="py-24 border-t border-[var(--color-border)]">
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">
            <span className="text-gradient-gold">模型定价</span>
          </h2>
          <p className="mt-4 text-[var(--color-text-secondary)]">
            按实际用量计费，透明无隐藏费用
          </p>
        </div>

        <div className="card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--color-border)]">
                <th className="text-left p-4 text-[var(--color-text-muted)] font-medium">
                  模型
                </th>
                <th className="text-right p-4 text-[var(--color-text-muted)] font-medium">
                  输入
                </th>
                <th className="text-right p-4 text-[var(--color-text-muted)] font-medium">
                  输出
                </th>
              </tr>
            </thead>
            <tbody>
              {usageItems.map((item) => (
                <tr
                  key={item.model}
                  className="border-b border-[var(--color-border)] last:border-0"
                >
                  <td className="p-4 text-[var(--color-text-primary)] font-medium">
                    {item.model}
                  </td>
                  <td className="p-4 text-right text-[var(--color-text-secondary)]">
                    {item.input}
                  </td>
                  <td className="p-4 text-right text-[var(--color-text-secondary)]">
                    {item.output}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 静态省钱 callout — 与首页 CostCalculator 同一套常量 (5M tokens, GPT-4o $10/M vs Hub blended $1.5/M, 汇率 7.2) */}
        <div className="mt-8 card p-6 text-center">
          <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
            以月用 <span className="font-mono font-semibold text-[var(--color-text-primary)]">500 万 tokens</span> 的通用场景为例：
            GPT-4o 直连约 <span className="font-mono">¥360/月</span>，
            经 Hub 智能路由混合调度约 <span className="font-mono">¥54/月</span> —
            同样的调用量，<span className="font-semibold text-[var(--color-accent)]">省 85%</span>。
          </p>
          <p className="mt-2 text-xs text-[var(--color-text-muted)]">
            想按你的真实用量算账？首页的成本计算器支持 10 万到 1 亿 tokens 滑动估算。
          </p>
        </div>

        <p className="mt-4 text-center text-xs text-[var(--color-text-muted)]">
          价格随供应商调整，以实际账单为准。完整价目表见
          <a href="https://docs.lurus.cn/pricing" target="_blank" rel="noopener noreferrer" className="text-[var(--color-ochre-dark)] hover:underline ml-1">
            文档 <span className="inline-block opacity-40 text-[10px]">↗</span>
          </a>
        </p>
      </div>
    </section>
  );
}
