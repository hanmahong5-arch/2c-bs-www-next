# 验收记分卡

页面算不算满分，只看下面这些条款有没有被真的断言到。仓库没有配置覆盖率工具。这里不记百分比，也不把「测试通过」说成行覆盖。

跑法：

```bash
bun test
bun scripts/accept.ts http://127.0.0.1:3000
```

两条都要通过。通过只说明下列条款和纯函数分支被检查到。

## 满分

少一条就不是满分。

1. **每条公开路由。** `src/lib/site-routes.ts` 里的 `SITE_ROUTES` 每一条都返回 HTTP 200，正文含品牌 `LurusTech`。同一轮检查仍要求标题非空、正文不少于 120 字、HTML 不含 `fonts.googleapis.com` / `fonts.gstatic.com`。
2. **转化路由。** `CONVERSION_ROUTES`（`/witness`、`/kova`、`/approach`、`/lugo`、`/download`、`/hub`、`/hub/pricing`、`/memorus`、`/switch`）的正文含「下一步」。
3. **诚实句。**
   - Memorus（`/memorus`）：含「尚未系统测量」与「非公开基准」。出现「读写延迟」时，不用「测量中」当延迟表占位。
   - Lugo（`/lugo`）：含「即将上线」与「尚未部署」。
   - Kova JSON-LD（首页）：`application/ld+json` 同时含「Kova」与「早期试点」。
4. **价目纯文本。** `/hub/pricing.md` 返回 HTTP 200，`Content-Type` 含 `text/markdown`。正文恰好是二者之一：价目表（含 `| 模型 |`），或「暂时读不到」且「不另存价格」。不能同时有，也不能同时没有。仍须写明来源 `hub.lurus.cn/api/v1/models` 与「与钱包扣费同源」。这条路径不在 `SITE_ROUTES` 里，单独查。
5. **日志标记。** `/blog?tag=` 分两支。已知标记：HTTP 200，出现带该标记的条目，且不出现「日志里没有这个标记」，也不出现不带该标记的条目。未知标记：HTTP 200，出现「日志里没有这个标记」，且不列出已知条目的标题。
6. **首信与交付分界。** `/approach` 含「来信请先写清」、「写第一封邮件」与「硬化与受托运维，各包含什么」。`/approach.md` 返回 HTTP 200，`Content-Type` 含 `text/markdown`，正文含「来信请先写清」「硬化与受托运维」与「不代替合同」。这条路径不在 `SITE_ROUTES` 里，单独查。
7. **恢复演练回执。** `/approach` 含「演练之后，写下这一张」、「（留空）」、「不写可用率」、「不写客户名」与「不是合同」。`/approach.md` 含「恢复演练回执」、「（留空）」、「不写可用率」、「不写客户名」与「这张回执不是合同。」。两处正文都不含可用性百分比。
8. **见证页的演练测量。** `/witness` 含「是否恢复成功」、「恢复了什么」、「哪一类备份」、「谁见证」、「核对了什么」、「不写可用率」、「不写客户名」、「不是合同」与「不是常设 SLA」。正文不含可用性百分比。
9. **首页证据。** 首页仍把证据行标成示例：含「下面三行是示例，不是客户数据」与「上面三行仍是示例」。并链出这六个已核对入口（`href` 原样出现）：
   - `/memorus/benchmarks`
   - `/hub/pricing`
   - `/hub/pricing.md`
   - `/blog`
   - `/witness`
   - `/approach#intake`

页面条款由 `scripts/accept.ts` 断言。已有检查不放宽。

## 纯函数分支

这些分支不折成覆盖率，但 `bun test` 必须打到：

| 函数 | 分支 |
| --- | --- |
| `formatCNY`（`src/lib/hub-models.ts`） | `0` → `—`；负数 → `—`；`≥ 1` 保留两位小数；一个 `< 1` 的值走有效数字 |
| `pricingMarkdownFromRows`（`src/lib/hub-pricing-md.ts`） | `null` 与空数组都是「暂时读不到」、没有价目表；一行则只有这行的表，没有「暂时读不到」 |
| `renderHubPricingMarkdown` | 仍调用 `fetchHubModels()`。响应当下返回的单价写入正文；请求失败时与 `null` 相同，不回放旧价 |
| `intakeMailto`（`src/lib/engagement-intake.ts`） | 主题是「受托运维咨询」；正文有「环境在哪：」「跑着什么：」「目标：」「接入方式：」四条占位；整段不含密码赋值，也不含看起来像密钥的令牌 |
| `renderApproachMarkdown`（`src/lib/approach-md.ts`） | 含主题「受托运维咨询」、列题「包含」「不包含」、两条小注、回执标题与「（留空）」；不含 `password=`，也不含可用性百分比 |
| `renderRestoreReceiptMarkdown`（`src/lib/restore-receipt.ts`） | 不传参时五个栏位都是「（留空）」并带三条不声称；空白、`null`、缺省仍留空，写了的栏只出现写下的字；不声称的句子仍在；默认正文不含可用性百分比 |
| `drillMeasure` / `renderDrillMeasureText`（`src/lib/witness-drill.ts`） | 记下与不记下两条列表都在，且不含可用性百分比；`outcome` 为空白、`null`、缺省时是「（留空）」，不写成通过；写了的结果只出现写下的字，列表不随之改写 |
| `filterUpdates`（`src/app/blog/filter-updates.ts`） | 未知标记 → 空列表；已知标记 → 只留匹配；空标记（`null` / `undefined` / `""`）→ 全部 |

`/blog` 的筛选走 `filterUpdates`。空标记在页面上先被读成「没有标记」，再交给这个函数。

## 刻意不计分

- **客户数。** 不统计客户数量，也不接受编出来的客户名。
- **可用率 SLA。** 不记延迟、可用率或其它没有测过的承诺数字。
- **行覆盖率百分比。** 没有覆盖率工具。不打印、不估算、不把上面的通过写成 100% 覆盖。

未核实的 `/security` 专页和仓库 URL 同样不在计分范围。
