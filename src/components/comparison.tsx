"use client";

import { motion } from "framer-motion";

const rows = [
  { aspect: "LLM 接入", without: "逐个对接 API，各家格式不同", with: "一个 API Key，30+ 模型即用" },
  { aspect: "计费系统", without: "自建钱包 + 订阅 + 支付对接", with: "金融级精度，开箱即用" },
  { aspect: "用户认证", without: "自己搭 SSO / RBAC", with: "Zitadel OIDC 一键集成" },
  { aspect: "AI 记忆", without: "无状态聊天，每次从零开始", with: "持久化上下文，个性化助手" },
  { aspect: "可观测性", without: "自建 Grafana / Prometheus", with: "全链路追踪，预配置仪表盘" },
  { aspect: "上线周期", without: "3-6 个月", with: "5 分钟接入" },
];

export function Comparison() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 grid-bg opacity-30" />

      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold">
            <span className="text-[var(--color-text-muted)]">自建</span>
            <span className="text-[var(--color-text-primary)]"> vs </span>
            <span className="text-gradient-gold">Lurus</span>
          </h2>
          <p className="mt-4 text-[var(--color-text-secondary)]">
            把精力放在业务创新上，基础设施交给我们
          </p>
        </motion.div>

        <div className="space-y-3">
          {rows.map((row, i) => (
            <motion.div
              key={row.aspect}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="grid grid-cols-[1fr_1.2fr_1.2fr] gap-4 items-center"
            >
              {/* Label */}
              <div className="text-sm font-medium text-[var(--color-text-primary)] pr-4">
                {row.aspect}
              </div>

              {/* Without */}
              <div className="rounded-xl px-4 py-3 bg-[var(--color-error)]/5 border border-[var(--color-error)]/10">
                <div className="flex items-start gap-2">
                  <span className="text-[var(--color-error)] mt-0.5 shrink-0 text-xs">
                    ✕
                  </span>
                  <span className="text-sm text-[var(--color-text-muted)]">
                    {row.without}
                  </span>
                </div>
              </div>

              {/* With */}
              <div className="rounded-xl px-4 py-3 bg-[var(--color-success)]/5 border border-[var(--color-success)]/10">
                <div className="flex items-start gap-2">
                  <span className="text-[var(--color-success)] mt-0.5 shrink-0 text-xs">
                    ✓
                  </span>
                  <span className="text-sm text-[var(--color-text-secondary)]">
                    {row.with}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Savings callout */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-4 card px-8 py-5 glow-ochre">
            <div>
              <div className="text-3xl font-bold text-gradient-gold">
                ~90%
              </div>
              <div className="text-xs text-[var(--color-text-muted)]">
                开发时间节省
              </div>
            </div>
            <div className="w-px h-10 bg-[var(--color-border)]" />
            <div>
              <div className="text-3xl font-bold text-gradient-gold">
                ~70%
              </div>
              <div className="text-xs text-[var(--color-text-muted)]">
                基础设施成本降低
              </div>
            </div>
            <div className="w-px h-10 bg-[var(--color-border)]" />
            <div>
              <div className="text-3xl font-bold text-gradient-gold">
                0
              </div>
              <div className="text-xs text-[var(--color-text-muted)]">
                运维团队要求
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
