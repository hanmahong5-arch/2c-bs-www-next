"use client";

import { motion } from "framer-motion";
import { XCircleIcon, CheckCircleIcon } from "@heroicons/react/20/solid";

const rows = [
  { aspect: "LLM 接入", without: "逐个对接 API，各家格式不同，调试周期以周计", with: "一个 API Key，30+ 模型，OpenAI 兼容格式" },
  { aspect: "计费系统", without: "自建钱包 + 订阅 + 支付对接，代码量 5,000+", with: "金融级精度，充值/扣款/退款开箱即用" },
  { aspect: "用户认证", without: "自己搭 SSO / RBAC，安全漏洞风险自担", with: "Zitadel OIDC 一键集成，多租户隔离" },
  { aspect: "AI 记忆", without: "无状态聊天，用户每次从零开始，留存差", with: "向量化持久记忆，个性化 AI 助手" },
  { aspect: "可观测性", without: "自建 Grafana + Prometheus，维护成本高", with: "全链路追踪，预配置仪表盘，零运维" },
  { aspect: "上线周期", without: "3–6 个月工程投入", with: "5 分钟接入，当天上线" },
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
          <p className="eyebrow mb-4">BUILD VS BUY</p>
          <h2 className="headline-tight text-3xl md:text-4xl font-bold">
            <span className="text-[var(--color-text-primary)]">你的竞争对手</span>
            <span className="text-gradient-gold">，正在用这三个月开发功能</span>
          </h2>
          <p className="mt-4 text-[var(--color-text-secondary)] max-w-lg mx-auto">
            LLM 对接、计费系统、身份认证、可观测性——每一层都要写代码，每一层都要维护。这些时间，本可以花在产品上。
          </p>
        </motion.div>

        {/* Column headers */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-[1fr_1.2fr_1.2fr] gap-4 mb-3 px-1"
        >
          <div />
          <div className="flex items-center gap-2 px-4">
            <XCircleIcon className="w-4 h-4 text-[var(--color-error)]/60 shrink-0" />
            <span className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider">自己搭建</span>
          </div>
          <div className="flex items-center gap-2 px-4">
            <CheckCircleIcon className="w-4 h-4 text-[var(--color-success)] shrink-0" />
            <span className="text-xs font-semibold text-[var(--color-ochre)] uppercase tracking-wider">用 Lurus</span>
          </div>
        </motion.div>

        <div className="space-y-2.5">
          {rows.map((row, i) => (
            <motion.div
              key={row.aspect}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="grid grid-cols-[1fr_1.2fr_1.2fr] gap-4 items-stretch"
            >
              {/* Label */}
              <div className="flex items-center text-sm font-medium text-[var(--color-text-primary)] pr-4 py-3">
                {row.aspect}
              </div>

              {/* Without */}
              <div className="rounded-xl px-4 py-3 bg-[var(--color-error)]/5 border border-[var(--color-error)]/10">
                <div className="flex items-start gap-2">
                  <XCircleIcon className="w-4 h-4 text-[var(--color-error)]/60 mt-0.5 shrink-0" />
                  <span className="text-sm text-[var(--color-text-muted)]">
                    {row.without}
                  </span>
                </div>
              </div>

              {/* With */}
              <div className="rounded-xl px-4 py-3 bg-[var(--color-success)]/5 border border-[var(--color-success)]/10">
                <div className="flex items-start gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-[var(--color-success)] mt-0.5 shrink-0" />
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
          <div className="inline-flex flex-wrap items-center justify-center gap-6 card border-beam px-8 py-6 glow-ochre">
            <div className="text-center">
              <div className="text-3xl font-bold font-mono text-gradient-gold">~90%</div>
              <div className="text-xs text-[var(--color-text-muted)] mt-0.5">开发时间节省</div>
            </div>
            <div className="w-px h-10 bg-[var(--color-border)] hidden sm:block" />
            <div className="text-center">
              <div className="text-3xl font-bold font-mono text-gradient-gold">~70%</div>
              <div className="text-xs text-[var(--color-text-muted)] mt-0.5">基础设施成本降低</div>
            </div>
            <div className="w-px h-10 bg-[var(--color-border)] hidden sm:block" />
            <div className="text-center">
              <div className="text-3xl font-bold font-mono text-gradient-gold">0</div>
              <div className="text-xs text-[var(--color-text-muted)] mt-0.5">运维工程师需求</div>
            </div>
            <div className="w-px h-10 bg-[var(--color-border)] hidden sm:block" />
            <div className="text-center">
              <div className="text-3xl font-bold font-mono text-gradient-gold">5 min</div>
              <div className="text-xs text-[var(--color-text-muted)] mt-0.5">从零到接入完成</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
