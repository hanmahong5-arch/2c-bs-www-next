"use client";

import { motion } from "framer-motion";
import {
  ComputerDesktopIcon,
  BuildingOffice2Icon,
  CpuChipIcon,
} from "@heroicons/react/24/outline";
import type { ComponentType, SVGProps } from "react";

type HeroIcon = ComponentType<SVGProps<SVGSVGElement>>;

// 场景认同卡 — 客户先认出自己，再决定往下读。
// 每张卡: 处境(痛) → 动作(一步) → 结果(可验证的事实)。素材出处见 lurus.yaml / ecosystem.ts。
const scenarios: {
  icon: HeroIcon;
  who: string;
  title: string;
  situation: string;
  action: string;
  outcome: string;
  facts: string[];
  note?: string;
}[] = [
  {
    icon: ComputerDesktopIcon,
    who: "SaaS 开发者",
    title: "周五立项，周一上线",
    situation: "产品要加 AI 功能，排期只给了一个迭代，没人有空写计费和路由。",
    action: "把 baseURL 改成 hub.lurus.cn，其余代码零改动。",
    outcome:
      "路由、计费、重试、用量统计都不用写——上线那天就有每个用户的成本报表。",
    facts: ["5 分钟接入", "OpenAI 兼容", "$5 免费额度"],
  },
  {
    icon: BuildingOffice2Icon,
    who: "企业 IT 负责人",
    title: "三个部门，一本账",
    situation: "市场、研发、客服各自买 AI API，月底成本对不上账，没人说得清钱花在哪。",
    action: "全公司统一走一个网关入口，按部门发 Key、设配额。",
    outcome:
      "每一笔调用 who / what / cost 结构化留痕，计费日志保留 7 年，审计随时可查。",
    facts: ["多租户隔离", "部门级配额", "结构化审计日志"],
  },
  {
    icon: CpuChipIcon,
    who: "Agent 开发者",
    title: "崩在第 37 步之后",
    situation: "Agent 跑了 4 小时，进程崩在第 37 步，状态全丢，只能从头重跑。",
    action: "执行层换 Kova 引擎——每一步先写 WAL（预写日志）再执行。",
    outcome: "进程重启后从最后安全点精确续跑，前 36 步不重算。",
    facts: ["Rust 构建", "gRPC / REST / MCP / A2A / Python"],
    note: "研发中",
  },
];

export function Scenarios() {
  return (
    <section className="py-24 relative">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="eyebrow mb-4">SCENARIOS</p>
          <h2 className="headline-tight text-3xl md:text-4xl font-bold text-[var(--color-text-primary)]">
            三种处境，同一个答案
          </h2>
          <p className="mt-4 text-[var(--color-text-secondary)] max-w-xl mx-auto">
            如果你正在其中一种里，这一屏值得你 30 秒。
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {scenarios.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.who}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card p-7 flex flex-col"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-5 h-5 text-[var(--color-accent)]" />
                    <span className="eyebrow">{s.who}</span>
                  </div>
                  {s.note && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full border border-[var(--color-border)] text-[var(--color-text-muted)]">
                      {s.note}
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-4">
                  {s.title}
                </h3>

                <div className="space-y-4 flex-1 text-sm leading-relaxed">
                  <p className="text-[var(--color-text-muted)]">{s.situation}</p>
                  <p className="text-[var(--color-text-primary)]">
                    <span className="font-mono text-xs text-[var(--color-accent)] mr-1.5">→</span>
                    {s.action}
                  </p>
                  <p className="text-[var(--color-text-secondary)]">{s.outcome}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-[var(--color-border)] flex flex-wrap gap-x-4 gap-y-1 text-[11px] font-mono text-[var(--color-text-muted)]">
                  {s.facts.map((f) => (
                    <span key={f}>{f}</span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
