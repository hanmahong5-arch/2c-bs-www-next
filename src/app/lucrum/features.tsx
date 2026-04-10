"use client";

import { motion } from "framer-motion";

const features = [
  {
    icon: "🤖",
    title: "AI 策略顾问",
    desc: "自然语言描述交易想法，AI 自动生成可执行策略代码，支持多种量化框架。",
  },
  {
    icon: "📊",
    title: "历史回测引擎",
    desc: "多品种、多周期并行回测，可视化收益曲线、最大回撤、夏普比率等关键指标。",
  },
  {
    icon: "⚡",
    title: "实盘执行",
    desc: "对接主流交易所，毫秒级下单延迟，智能风控实时监控仓位和止损。",
  },
  {
    icon: "🏪",
    title: "策略市场",
    desc: "社区共享优质策略，订阅制收益分成，透明的历史业绩追踪。",
  },
  {
    icon: "🛡️",
    title: "风控系统",
    desc: "多层风控：单笔限额、日亏损上限、波动率保护、黑天鹅熔断。",
  },
  {
    icon: "📱",
    title: "移动端监控",
    desc: "随时随地查看策略运行状态，关键事件推送通知，远程一键暂停。",
  },
];

export function LucrumFeatures() {
  return (
    <section className="py-24 border-t border-[var(--color-border)]">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold">
            <span className="text-gradient-gold">核心能力</span>
          </h2>
          <p className="mt-4 text-[var(--color-text-secondary)]">
            机构级量化能力，个人投资者也能用
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="card p-6"
            >
              <span className="text-3xl">{f.icon}</span>
              <h3 className="mt-4 text-lg font-semibold text-[var(--color-text-primary)]">
                {f.title}
              </h3>
              <p className="mt-2 text-sm text-[var(--color-text-muted)] leading-relaxed">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
