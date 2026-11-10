# www 世界级循环（开源对标集成）

启动：`/loop` · subscription `loop-www-worldclass-oss` · 间隔 15m。

## 定案原则（远见，不追热闹）

1. **诚实 > 华丽**：成熟度芯片、测量中不报假数、下一步 CTA —— 已有门禁，只加强不稀释。
2. **品牌不可换皮**：纸感 / Fraunces / 赭石点 / Urus 剥层；禁紫渐变与通用 SaaS 模板脸。
3. **抄模块不抄整站**：一次只合一个可复用构件（Evidence / NextStep / OSS 归属 / 发现层）。
4. **官网先于 API 域**：`ailurus.top` 企业域备案中；本循环不抢切流。
5. **开源叙事要对齐产品**：Hub←New API AGPL 等归属写清楚，差异化写「装进客户环境 + 证据」。

## 本轮决策（不等调研全部回来）

三路 agent 在跑。先落地一条已经能从站内事实证明的模块，避免空等：

**抄什么：** 严肃开源公司（GitLab / Cal.com / PostHog）的 fork 谱系表，而不是又一块营销卡。

**落在哪：** `Lineage`（`src/components/site/lineage.tsx`），Hub「许可与来源」从三段散文收成可扫读定义表。事实不变：New API ← One API（MIT），AGPLv3，我们加通道评分 / 用量 / 多租户 / 审计。

**调研已回：** [OSS 生态](bc-c4f060d8-4888-5a85-a0a6-f3f9cb2a77e5) 指出只有 Hub 有上游归属、缺可点的 LICENSE；[营销模块](bc-9825c21c-8113-5f64-ac3c-047fe01853b6) 把价目诚实框列为第一批。

**本轮第二刀：** `ScopeSplit` 落在 `/hub/pricing`：包含 / 不包含。不编上游仓库链接（仓内没有已核对的 URL）。

**本轮第三刀：** [站内缺口](bc-32a3c297-4f99-5806-a58d-5a04c7d26553) 把共享 `NextStep` 列为安全可抄。转化页已改用它，句子不变。`/security` 与月报样本先不做：没有已核实的驻留/访问事实，也不编造客户数据。Switch 下载条里的「下一步」仍嵌在发布清单说明里。

**本轮第四刀：** `/hub/pricing.md`，与价目页同源。不进 HTML sitemap：accept 按网页渲染，纯文本单独用 fetch 检查。

**本轮第五刀：** 命令面板接更新日志真源（最近 5 条）和产品页上的成熟度；价目纯文本可搜到。面板外形不动。

**本轮第六刀：** `/blog` 收成纸面日志。条目原文不动。月份只做发丝锚（`#2026-10` 起），不设跨年跳转——数据都在 2026。标记用服务端 `?tag=`（Next `searchParams` 是 Promise）；没有的标记写「日志里没有这个标记」，月份和标记索引仍在。`/approach` 只加一节可核对细表，右列种类仅 基准 / 价目 / 日志 / 产品，链到已核对的 `/memorus/benchmarks`、`/hub/pricing#prices`、`/hub/pricing.md`（纯文本 route，不在 `SITE_ROUTES`）、`/blog`、`/witness#report`、`/kova`。不链 `/security`，不编 GitHub，不写新数字或客户名。
