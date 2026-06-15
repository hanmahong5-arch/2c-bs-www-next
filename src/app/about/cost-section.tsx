"use client";

import { motion } from "framer-motion";

// 机会成本叙事 — 具体、克制，不写形容词，不吹产品
// 数据来源：products.ts / ecosystem.ts 中可直接读出的事实

const costItems: { label: string; body: string }[] = [
  {
    label: "LLM 网关",
    body:
      "自建多供应商路由需要处理各家 API 格式差异、渠道容错、超时重试、用量计量。" +
      "团队通常花 4—8 周才能让它在生产环境稳定运行。",
  },
  {
    label: "计费与钱包",
    body:
      "钱包充值、预授权冻结、订阅续期、多支付通道对账，每一笔事务都需要原子性保证。" +
      "金融级精度（DECIMAL 20,4）和状态机测试，往往比业务功能本身更耗时。",
  },
  {
    label: "AI 记忆系统",
    body:
      "无状态 LLM 调用不能跨会话保留上下文。自建向量存储、相似度检索、多租户隔离、" +
      "自动摘要策略，是一套独立的基础设施工程，和核心业务逻辑几乎没有重叠。",
  },
  {
    label: "运维与可观测性",
    body:
      "多供应商 SLA 监控、智能路由切换、用量告警——这些在 Lurus 平台里是默认开启的，" +
      "自建团队则需要单独搭建并长期维护。",
  },
];

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.45, ease: EASE_OUT_EXPO },
  }),
};

export function CostSection() {
  return (
    <section aria-labelledby="cost-heading">
      <p className="eyebrow mb-3">隐性成本</p>
      <h2
        id="cost-heading"
        className="type-h2 text-[var(--color-text-primary)] mb-4"
      >
        自建，比你想的贵
      </h2>
      <p className="text-[var(--color-text-secondary)] leading-relaxed mb-10 max-w-2xl">
        接入 AI 的第一道坎，通常不是模型效果，而是基础设施。
        网关、计费、记忆、可观测性——每一项都是独立的工程问题，
        每一项都可能让你的核心业务推迟数周上线。
      </p>

      <ul className="grid md:grid-cols-2 gap-5" role="list">
        {costItems.map((item, i) => (
          <motion.li
            key={item.label}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={itemVariants}
          >
            <div className="card-elevated h-full p-6 rounded-2xl">
              {/* 强调色左边框 */}
              <div
                className="w-0.5 h-5 mb-4 rounded-full"
                style={{ background: "var(--accent)" }}
                aria-hidden="true"
              />
              <p className="type-h3 text-[var(--color-text-primary)] mb-2">
                {item.label}
              </p>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                {item.body}
              </p>
            </div>
          </motion.li>
        ))}
      </ul>

      <p className="mt-8 text-sm text-[var(--color-text-muted)] leading-relaxed max-w-2xl">
        这不是在说你的团队能力不足。这些轮子不该由每家公司各造一遍——
        造完之后，它们也不会成为你的竞争壁垒。
      </p>
    </section>
  );
}
