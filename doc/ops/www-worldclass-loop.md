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

**本轮第七刀：** `/approach#intake` 首信清单。`IntakeBrief` 复用 `ScopeSplit`，范围在 `src/lib/engagement-intake.ts`。mailto 只有四项占位，不预填密码。不写回复时限，不公开受托运维价格。首页只加一条「方法页首信清单」，命令面板一条入口。方法页收束改为按这份清单写信。

**本轮第八刀：** 首页「一行证据」三行仍标示例，不改成实测或正常。带下加一条发丝索引，只链已核对的 `/memorus/benchmarks`（基准）、`/hub/pricing`（价目）、`/hub/pricing.md`（价目纯文本，普通链接）、`/blog`（日志）、`/witness`（产品）、`/approach#intake`（首信）。不报运行数字、客户名或 SLA，不链 `/security` 与 GitHub。2026-11 更新日志已有首信条目，不再另加。

**本轮第九刀：** `LedgerRow` 是一行 1px 发丝链接（标签、附注、↗），无填充、无阴影、无圆角。`/approach#intake` 用它承接原有 mailto（`contact@lurus.cn`，主题「受托运维咨询」），文案是「写第一封邮件 / 不报价，不收集密码」。ScopeSplit 与成熟度小注仍在。见证、Kova、Memorus、Lugo 的下一步里各加一条指向 `/approach#intake` 的文字链，不改成熟度，不写回复时限。

**本轮第十刀：** `/approach#delivery` 交付分界，夹在三个阶段和判据之间。范围在 `src/lib/engagement-delivery.ts`，复用 `ScopeSplit`，不另做皮。包含硬化、按月受托运维、按月证据、可接管方向；不包含从零做应用、证明不了的数字、未审批写操作、尚未覆盖的全环境写审批、公开价目与标书式 SLA、机房与算力转售。一条安静文字链指向已核对的 `/witness#report`。不写客户名、可用率、回复时限、价格或月报样本，不链 `/security` 与 GitHub，不另加「写第一封邮件」。首信文案仍留在 intake 文件。

**本轮第十一刀：** `/hub/pricing` 怎么付复用 `LedgerRow` 两行：`钱包充值`（余额以人民币计，已有 `https://identity.lurus.cn/topup`）与 `私有部署`（写信说明上游与网络约束，`mailto:contact@lurus.cn`）。NextStep、ScopeSplit 和 `/hub/pricing.md` 仍在。不写立即开通、试用、价格、SLA 或客户名。

**本轮第十二刀：** `/approach.md`，与方法页首信、交付分界同源，句子来自 `engagement-intake.ts` 与 `engagement-delivery.ts`。不进 `SITE_ROUTES`。accept 单独 fetch：200、`text/markdown`，正文含「来信请先写清」「硬化与受托运维」「不代替合同」。页首一条安静链接「同一份说明的纯文本」。LedgerRow、ScopeSplit、可核对索引与 NextStep 仍在。不写价格、客户名或 SLA，不链 `/security` 与 GitHub。

**本轮第十三刀：** 命令面板补上已有的两条表面，外形不动。资源组在「Hub 价目纯文本」旁加「方法纯文本」（`/approach.md`，hint `text/markdown`）；导航组在「方法 — 首信清单」旁加「方法 — 交付范围」（`/approach#delivery`，hint `包含 / 不包含`）。accept 源检查要求 `command-palette.tsx` 含这两条路径，原有 `/download`、`/hub/pricing`、`/hub/pricing.md`、`updates-data` 检查仍在。不编客户、SLA、GitHub 或 `/security`，不加月报样本。

**本轮第十四刀：** `/blog.md`，与更新日志同源，条目原文来自 `updates-data.ts`，不改写。不进 `SITE_ROUTES`。accept 单独 fetch：200、`text/markdown`，正文含「更新日志」与当前第一条标题。页上一条安静链接「同一份日志的纯文本」。月份索引与标记筛选仍在。正文写明条目保留当时原文，不代表现状。不编客户、价格、SLA，不链 `/security` 与 GitHub。

**本轮第十五刀：** 命令面板资源组在「方法纯文本」旁加「日志纯文本」（`/blog.md`，hint `text/markdown`）。accept 源检查要求 `command-palette.tsx` 含 `/blog.md`，原有 `/download`、`/hub/pricing`、`/hub/pricing.md`、`updates-data`、`/approach.md`、`/approach#delivery` 检查仍在。外形不动。不编客户、价格、SLA，不链 `/security` 与 GitHub。

**本轮第十六刀：** 命令面板三条纯文本（`/hub/pricing.md`、`/approach.md`、`/blog.md`）标 `plain`。点击用同页 `<a href>`，回车用 `window.location.assign`，整页取 `text/markdown`，不走 App Router。外链仍新标签。外形不动。accept 仍要求这三条路径留在 `command-palette.tsx`。

**本轮第十七刀：** `/approach#receipt` 恢复演练回执。栏位留空：何时、恢复了什么、备份类别、谁见证、核对了什么、不声称。写明这是演练之后的回执样子，不写可用率，不写客户名，不是合同。复用 ScopeSplit，LedgerRow 指向已核对的 `/witness#restore`。`/approach.md` 同源。不填某一次的日期，不编客户名或可用率。

**本轮第十八刀：** `/witness#restore` 旁写明试点测量。一次演练记下是否恢复成功、恢复了什么、来自哪一类备份、谁见证、核对了什么；不写可用率，不写客户名，不是合同，不是常设 SLA。这一次的结果留空。复用 ScopeSplit。见证页没有 markdown 孪生，本轮不新开路由。不编可用率百分比。

**本轮第十九刀：** `/witness#report` 旁写下月度证据报告的留空样子。栏位是报告期、跑了什么、核对了什么、失败仍开着、谁签了这份说明，示例都是「（留空）」。写明不写可用率百分比，不写客户名，不是合同，不代替演练回执。复用 ScopeSplit。`/approach.md` 已提到月报，同源补上这些句子，不新开路由。不编可用率百分比，不编客户名。

**本轮第二十刀：** 命令面板补上三条已有锚点，外形不动。导航组加「方法 — 回执」（`/approach#receipt`）、「见证 — 演练」（`/witness#restore`）、「见证 — 月报」（`/witness#report`）。买家可搜回执、演练、月报。这三条是站内锚点，走 `Link` / `router.push`，不标 `plain`。accept 源检查要求 `command-palette.tsx` 含这三条路径。不编客户、可用率、SLA，不链 `/security` 与 GitHub，不新开路由。

**本轮第二十一刀：** 首页证据带下，原有六个入口不动，示例声明仍在。用 `LedgerRow` 加两行：「演练回执」（`/approach#receipt`，字段留空，不写可用率）和「月度证据报告」（`/witness#report`，五栏留空，不代替回执）。accept 要求首页含这两条 `href`，正文不含可用性百分比。不编客户、可用率、SLA，不链 `/security` 与 GitHub，不新开路由。

**本轮第二十二刀：** `public/llms.txt` 补六条已核对入口：`/hub/pricing.md`（与网页同一份单价，读不到只写暂时读不到，不留旧价）、`/approach.md`（首信、交付范围、空白回执、月报字段；不代替合同，不是价目）、`/blog.md`（原文，不代表现状）、`/approach#intake`（环境、现有系统、目标、接入方式；不报价，不收集密码）、`/approach#receipt`（回执留空；不写可用率，不写客户名，不是合同）、`/witness#report`（月报五栏留空；不写可用率，不代替演练回执）。不新开路由。命令面板资源组加「站点索引 llms.txt」，`plain` 整页打开。accept 拉取 `/llms.txt` 须含这六条路径，且不含可用性百分比。不编客户、可用率、SLA，不链 `/security` 与未核对的 GitHub。

**本轮第二十三刀：** `/approach` 可核对细表原有六条不动，其中已有 `/witness#report`。表下用 `LedgerRow` 补两条尚未出现的入口：「索引 /llms.txt」（六条已有入口）和「演练回执」（`/approach#receipt`，字段留空，不写可用率）。不重复已有路径。accept 要求 `/approach` 含 `/llms.txt`、`/approach#receipt`、`/witness#report` 这三条 `href`，正文不含可用性百分比。不新开路由，不编客户、可用率或 SLA，不链 `/security` 与未核对的上游地址。

**本轮第二十四刀：** `/approach.md` 在已有回执与月报正文后补两行，事实与方法页相同：索引 `/llms.txt`（六条已有入口）、演练回执 `/approach#receipt`（字段留空，不写可用率）。markdown 里原本没有 `/witness#report`，本轮不另写。HTML 不动。approach-md 测试与 accept 要求这两条路径在，且正文不含可用性百分比。不新开路由，不编客户、可用率或 SLA。

**本轮第二十五刀：** `/approach.md` 月报正文旁补一行，与方法页已有入口相同：月度证据报告 `/witness#report`（五栏留空，不代替回执）。HTML 不动。approach-md 测试与 accept 要求这条路径在，且正文不含可用性百分比。不新开路由，不编客户、可用率或 SLA。

证明图已经合上。在出现一条真实的公开事实之前，停止再加链接。不要新增 `/security`、未核对的上游地址，或一份填好的月报样本。

**本轮第二十六刀：** Switch 下载区里嵌在发布清单说明中的「下一步」改用 `NextStep`。句子仍是「安装 → 登录 →（若有推广码）在首页粘贴。」与 `/download` 相同。不新加链接，不改成熟度，不编验证范围。macOS 与 Linux 仍只保证能构建。

**本轮第二十七刀：** 每页第一个可聚焦元素是「跳到正文」，平时不占版面，聚焦后盖在页眉上，落到 `#content`。页眉是粘性的，正文留出一栏高度，避免第一行被挡住。不新加栏目，不改文案事实。

**本轮第二十八刀：** 价目页上的 `/hub/pricing.md` 改成普通链接，不再走站内跳转。方法纯文本里月报路径、索引、回执三行前面各空一行，避免被收进上一段列表。跳到正文改用单独的 `.skip-link`，聚焦时的定位和内边距不再和 `not-sr-only` 抢。
