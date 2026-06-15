"use client";

import { motion } from "framer-motion";
import {
  CpuChipIcon,
  ChartBarIcon,
  BoltIcon,
  ShoppingBagIcon,
  ShieldCheckIcon,
  DevicePhoneMobileIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    Icon: CpuChipIcon,
    title: "AI 策略顾问",
    desc: "自然语言描述交易想法，AI 自动生成可执行策略代码，支持多种量化框架。",
  },
  {
    Icon: ChartBarIcon,
    title: "历史回测引擎",
    desc: "多品种、多周期并行回测，可视化收益曲线、最大回撤、夏普比率等关键指标。",
  },
  {
    Icon: BoltIcon,
    title: "实盘执行",
    desc: "对接主流交易所，毫秒级下单延迟，智能风控实时监控仓位和止损。",
  },
  {
    Icon: ShoppingBagIcon,
    title: "策略市场",
    desc: "社区共享优质策略，订阅制收益分成，透明的历史业绩追踪。",
  },
  {
    Icon: ShieldCheckIcon,
    title: "风控系统",
    desc: "多层风控：单笔限额、日亏损上限、波动率保护、黑天鹅熔断。",
  },
  {
    Icon: DevicePhoneMobileIcon,
    title: "移动端监控",
    desc: "随时随地查看策略运行状态，关键事件推送通知，远程一键暂停。",
  },
];

// 策略代码窗内容行 — 暖色深窗语法着色，与 hero.tsx / quickstart.tsx 保持一致
// 调色板：主体文字 #CBC4B4 | 注释 #7A7168 | 关键字 var(--color-ochre) | 字符串 #A6CE8A | 属性 #C8B07A
const STRATEGY_LINES = [
  // 用户输入部分
  '<span style="color:#7A7168">// 示例 — 不代表真实可运行接口</span>',
  '<span style="color:#7A7168">// ─── 用户描述 ────────────────────────────────────────</span>',
  '<span style="color:var(--color-ochre)">用户</span><span style="color:#CBC4B4">: </span><span style="color:#A6CE8A">"当 5 日均线上穿 20 日均线时买入，</span>',
  '<span style="color:#A6CE8A">       跌破 5% 止损，上涨 15% 止盈。"</span>',
  "",
  // 箭头分隔
  '<span style="color:var(--color-ochre)">      ↓  AI 策略顾问生成骨架</span>',
  "",
  // 生成的策略骨架
  '<span style="color:#7A7168">// ─── 生成策略骨架 (示例) ────────────────────────────</span>',
  '<span style="color:var(--color-ochre)">class</span><span style="color:#CBC4B4"> MaCrossStrategy(BaseStrategy):</span>',
  '<span style="color:#CBC4B4">    fast_period </span><span style="color:var(--color-ochre)">=</span><span style="color:#C8B07A"> 5</span><span style="color:#7A7168">   # 示例参数</span>',
  '<span style="color:#CBC4B4">    slow_period </span><span style="color:var(--color-ochre)">=</span><span style="color:#C8B07A"> 20</span><span style="color:#7A7168">  # 示例参数</span>',
  '<span style="color:#CBC4B4">    stop_loss   </span><span style="color:var(--color-ochre)">=</span><span style="color:#C8B07A"> 0.05</span>',
  '<span style="color:#CBC4B4">    take_profit </span><span style="color:var(--color-ochre)">=</span><span style="color:#C8B07A"> 0.15</span>',
  "",
  '<span style="color:var(--color-ochre)">    def</span><span style="color:#CBC4B4"> on_bar(self, bar):</span>',
  '<span style="color:#CBC4B4">        fast </span><span style="color:var(--color-ochre)">=</span><span style="color:#CBC4B4"> self.ma(self.fast_period)</span>',
  '<span style="color:#CBC4B4">        slow </span><span style="color:var(--color-ochre)">=</span><span style="color:#CBC4B4"> self.ma(self.slow_period)</span>',
  '<span style="color:var(--color-ochre)">        if</span><span style="color:#CBC4B4"> fast.cross_above(slow):</span>',
  '<span style="color:#CBC4B4">            self.buy()  </span><span style="color:#7A7168"># 均线金叉买入</span>',
];

function StrategyCodeWindow() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="mt-20 max-w-3xl mx-auto"
    >
      {/* 标题区 */}
      <div className="text-center mb-8">
        <p className="eyebrow mb-3">自然语言 → 策略</p>
        <h3 className="text-xl font-semibold text-[var(--color-text-primary)]">
          描述你的交易直觉，AI 生成策略骨架
        </h3>
        <p className="mt-2 text-sm text-[var(--color-text-muted)]">
          从描述到可回测代码，数秒内完成
        </p>
      </div>

      {/* 暖色深窗 — 沿用 .code-block (#1A1712) */}
      <div className="code-block p-5 relative overflow-hidden shadow-[var(--shadow-window)]">
        {/* 橙边暖光 */}
        <div className="absolute inset-0 rounded-xl opacity-35 pointer-events-none">
          <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-br from-[var(--color-ochre)]/20 via-transparent to-[var(--color-ochre)]/8" />
        </div>

        {/* 窗口 chrome */}
        <div className="relative flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
          <div className="flex gap-1.5 shrink-0">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          <span className="text-xs font-mono ml-2" style={{ color: "#8A8474" }}>
            strategy.py
          </span>
          <span
            className="ml-auto text-[10px] font-mono px-2 py-0.5 rounded"
            style={{
              color: "var(--color-ochre)",
              border: "1px solid rgba(255,93,31,0.25)",
              background: "rgba(255,93,31,0.07)",
            }}
          >
            示例
          </span>
        </div>

        {/* 代码行 */}
        <pre className="text-[0.8rem] leading-[1.85] overflow-x-auto">
          <code>
            {STRATEGY_LINES.map((line, i) => (
              <motion.div
                key={i}
                className="flex min-h-[1.35em]"
                initial={{ opacity: 0, x: -6 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.04, duration: 0.22 }}
              >
                <span
                  className="line-number hidden sm:block select-none shrink-0"
                  style={{ color: "#4A4640" }}
                >
                  {i + 1}
                </span>
                <span dangerouslySetInnerHTML={{ __html: line || " " }} />
              </motion.div>
            ))}
          </code>
        </pre>

        {/* 底部免责声明 */}
        <div
          className="mt-4 pt-3 border-t text-[10px] font-mono text-center"
          style={{ borderColor: "rgba(255,255,255,0.07)", color: "#7A7168" }}
        >
          示例数据，不代表真实业绩 · 实际策略效果取决于市场及参数配置
        </div>

        {/* 暖橙光晕 */}
        <div className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full bg-[var(--color-ochre)] opacity-[0.07] blur-[70px] pointer-events-none" />
      </div>
    </motion.div>
  );
}

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
              <f.Icon
                className="w-7 h-7 text-[var(--accent)]"
                strokeWidth={1.5}
              />
              <h3 className="mt-4 text-lg font-semibold text-[var(--color-text-primary)]">
                {f.title}
              </h3>
              <p className="mt-2 text-sm text-[var(--color-text-muted)] leading-relaxed">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* 自然语言 → 策略代码示意窗 */}
        <StrategyCodeWindow />
      </div>
    </section>
  );
}
