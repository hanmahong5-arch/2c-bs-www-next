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
// 每张卡: CONTEXT(处境) → ACTION(动作) → OUTCOME(结果) + facts
// 素材出处见 lurus.yaml / ecosystem.ts。
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
    situation:
      "产品要加 AI 功能，排期只给了一个迭代。计费逻辑、重试策略、用量统计——没人有空写，也不该由业务代码来管。",
    action:
      "把 OpenAI SDK 的 baseURL 改成 hub.lurus.cn，其余代码零改动。",
    outcome:
      "路由、计费、重试、限速全部由网关托管。上线当天即可查看每个用户的 token 消耗与成本明细——不需要一行额外代码。",
    facts: ["5 分钟接入", "OpenAI 兼容协议", "$5 免费额度"],
  },
  {
    icon: BuildingOffice2Icon,
    who: "企业 IT 负责人",
    title: "三个部门，一本账",
    situation:
      "市场、研发、客服各自买 AI API 密钥，月底账单分散在三个信用卡里，没人说得清哪个团队花了多少、用在哪个产品上。",
    action:
      "全公司统一走一个网关入口，按部门签发独立 Key，各自设置月度配额与模型白名单。",
    outcome:
      "每一笔调用记录 who / what / cost，结构化写入审计日志。账单精度 DECIMAL(20,4)，计费日志留存 7 年，财务审计随时可导出。",
    facts: ["多租户隔离", "部门级配额控制", "结构化审计日志"],
  },
  {
    icon: CpuChipIcon,
    who: "Agent 开发者",
    title: "崩在第 37 步之后",
    situation:
      "Agent 跑了 4 小时，调用链走到第 37 步时进程崩溃，执行状态全部丢失。只能从头重跑——浪费时间，也浪费 token 成本。",
    action:
      "把执行层换成 Kova 引擎：每一步先写 WAL（预写日志）再执行，失败时从最后一个安全检查点恢复。",
    outcome:
      "进程重启后精确从第 36 步之后续跑，前 36 步的计算结果与 API 调用不会重算。长任务的容错成本从 O(n) 降为 O(1)。",
    facts: ["Rust 构建，零 GC 暂停", "gRPC / REST / MCP / A2A / Python SDK"],
    note: "研发中",
  },
];

// Step label component — CONTEXT / ACTION / OUTCOME
function StepLabel({ children }: { children: string }) {
  return (
    <span
      className="font-mono tracking-widest uppercase"
      style={{
        fontSize: "9px",
        color: "var(--color-text-muted)",
        opacity: 0.55,
        letterSpacing: "0.12em",
      }}
    >
      {children}
    </span>
  );
}

export function Scenarios() {
  return (
    <section className="py-24 relative">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="eyebrow mb-4">SCENARIOS</p>
          <h2 className="headline-tight text-3xl md:text-4xl font-bold text-[var(--color-text-primary)]">
            三种处境，同一个答案
          </h2>
          <p className="mt-4 text-[var(--color-text-secondary)] max-w-md mx-auto text-sm leading-relaxed">
            如果你在其中一种里，这一屏值得你 30 秒。
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {scenarios.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.who}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{
                  y: -2,
                  boxShadow: "var(--shadow-lg)",
                  transition: { duration: 0.18, ease: [0.16, 1, 0.3, 1] },
                }}
                className="card p-7 flex flex-col cursor-default"
                style={{ willChange: "transform" }}
              >
                {/* Card header — who + optional status badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="flex-shrink-0 p-1.5 rounded-md"
                      style={{ background: "color-mix(in srgb, var(--color-accent) 10%, transparent)" }}
                    >
                      <Icon
                        className="w-4 h-4"
                        style={{ color: "var(--color-accent)" }}
                        aria-hidden="true"
                      />
                    </div>
                    <span className="eyebrow">{s.who}</span>
                  </div>
                  {s.note && (
                    <span
                      className="text-[9px] font-mono px-2 py-0.5 rounded-full border tracking-wide"
                      style={{
                        borderColor: "var(--color-border)",
                        color: "var(--color-text-muted)",
                        background: "color-mix(in srgb, var(--color-text-muted) 5%, transparent)",
                      }}
                    >
                      {s.note}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-[1.25rem] font-bold leading-snug text-[var(--color-text-primary)] mb-6">
                  {s.title}
                </h3>

                {/* Three-act structure — scannable with step labels */}
                <div className="flex-1 space-y-5">
                  {/* CONTEXT */}
                  <div className="space-y-1.5">
                    <StepLabel>处境</StepLabel>
                    <p className="text-sm leading-relaxed text-[var(--color-text-muted)]">
                      {s.situation}
                    </p>
                  </div>

                  {/* ACTION */}
                  <div className="space-y-1.5">
                    <StepLabel>动作</StepLabel>
                    <div className="flex gap-2 items-start">
                      <span
                        className="font-mono text-xs mt-[3px] flex-shrink-0"
                        style={{ color: "var(--color-accent)" }}
                        aria-hidden="true"
                      >
                        →
                      </span>
                      <p className="text-sm leading-relaxed text-[var(--color-text-primary)]">
                        {s.action}
                      </p>
                    </div>
                  </div>

                  {/* OUTCOME */}
                  <div className="space-y-1.5">
                    <StepLabel>结果</StepLabel>
                    <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
                      {s.outcome}
                    </p>
                  </div>
                </div>

                {/* Facts footer */}
                <div
                  className="mt-6 pt-4 flex flex-wrap gap-x-4 gap-y-1.5"
                  style={{ borderTop: "1px solid var(--color-border)" }}
                >
                  {s.facts.map((f) => (
                    <span
                      key={f}
                      className="text-[10px] font-mono tracking-wide"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      {f}
                    </span>
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
