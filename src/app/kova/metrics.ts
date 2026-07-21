/**
 * /kova 页面引用的全部实测数字 — 单一来源,换版只改这里。
 *
 * 每个数字都必须能指到 2b-svc-kova 仓库内的实测文档(私有 repo,页面不外链,
 * 原始产物随 pilot 证据包交付):
 * - RTO / 队列吞吐:doc/gtm/perf-evidence-2026-07-12.md(30 次 kill -9,WAL 预置
 *   500 任务;队列为引擎级 CLI bench,1KB 载荷)
 * - 零重复 LLM 调用:doc/gtm/skill-stability-evidence-2026-07-14.md(80 次真实
 *   模型运行,网络边界反向代理抓包恰好 80 次上游调用;kill -9 崩溃续跑 3/3,
 *   已完成调用的请求哈希在边界日志中恰好出现一次)
 * - 演示热跑时长:doc/gtm/key-metrics-2026-07-14.md(quickstart 两幕:首 run +
 *   kill -9 自愈 + 零重发断言;确定性 stub 模型)
 *
 * 测量环境均为单机开发级硬件(WSL2 / i7-12700),非调优服务器——引用时必须
 * 保留口径与日期标注,禁止升格为绝对值营销数字。
 */
export const METRICS = {
  rto: {
    p50Ms: 301,
    p90Ms: 331,
    maxMs: 347,
    trials: 30,
    date: "2026-07-12",
  },
  zeroDuplicate: {
    liveRuns: 80,
    upstreamCalls: 80,
    crashTrials: "3/3",
    date: "2026-07-14",
  },
  queue: {
    fifoTps: "142.4K",
    payload: "1KB",
    date: "2026-07-12",
  },
  demo: {
    hotRunSecs: 14.7,
    date: "2026-07-14",
  },
} as const;
