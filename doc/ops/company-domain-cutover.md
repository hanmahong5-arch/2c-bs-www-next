# 双域切流：`ailurus.cn`（企业）× `lurus.cn`（个人）

> **定案（2026-10）**  
> - **企业主页域名**：`ailurus.cn` / `www.ailurus.cn` — 公司法人账户注册，**企业 ICP 备案进行中**  
> - **原域名**：`lurus.cn` / `www.lurus.cn` — **继续个人备案**（鲁ICP备2026000242号）  
> - 品牌字标仍可写 LurusTech / Urus；对外「公司官网入口」切到 `ailurus.cn`

个人备案挂企业产品站，正是阿里云「已备案信息核查」的高发原因。双域分主体后，**企业内容只挂企业域**，个人域不再承载公司叙事。

---

## 1. 原则（先记牢）

| 原则 | 含义 |
|------|------|
| 一域一主体 | `ailurus.cn` = 硅知睿公司；`lurus.cn` = 个人。页脚备案号必须与该域工信部记录一致 |
| 企业内容只走企业域 | 产品介绍、方法、报价、招人、公司 About → 只在 `ailurus.cn` |
| 个人域尽快「瘦身」 | `lurus.cn` 不要长期继续挂完整企业官网；备案过了或新域上线后，旧域改为跳转或极简页 |
| 产品 API 可晚迁 | `hub` / `identity` / `releases` 有存量客户端，**官网可先迁，API 子域分期** |
| 未下号不切流 | `ailurus.cn` 企业 ICP + 公安备案未过之前，**不要把正式流量切过去、不要挂错号** |

---

## 2. 分期（推荐顺序）

### 阶段 0 — 备案进行中（现在）

- [ ] 阿里云企业备案材料齐：执照、法人/负责人、域名证书、服务器（**须在阿里云境内节点**，与现 www 同约束）
- [ ] 备案系统里网站名称/内容与真实站点一致（AI / 企业软件，勿填成个人博客）
- [ ] 同步办 **公安备案**（企业主体），勿只办 ICP
- [ ] 本仓：页脚在 `lurus.cn` 上**只挂个人备案号、不公示姓名**（已做）；**暂不改** `SITE_URL` 到 ailurus
- [ ] 个人域核查短信：按专员要求补材料；长期解法是内容迁走，不是改名

### 阶段 1 — `www.ailurus.cn` 官网先上（ICP 通过后立刻）

本仓要改的面：

| 项 | 现 | 目标 |
|----|----|------|
| 站点真源 | `https://www.lurus.cn` | `https://www.ailurus.cn` |
| Ingress Host | `www.lurus.cn` / `lurus.cn` | 增加 `www.ailurus.cn` / `ailurus.cn`（TLS 新证） |
| 页脚 ICP | 鲁ICP备2026000242号 | **企业新号**（备案通过后工信部下发） |
| 页脚主体 | 不写姓名 | 可写 **硅知睿智能科技（烟台）有限公司**（企业域才写） |
| JSON-LD `legalName` | 已去掉 | 恢复公司全称 |
| OG / sitemap / robots / RSS | `www.lurus.cn` | `www.ailurus.cn` |
| 联系邮箱展示 | `contact@lurus.cn` | 优先 `contact@ailurus.cn`（MX 就绪后） |

代码锚点（本仓）：

- `src/app/layout.tsx` — `SITE_URL`
- `src/app/robots.ts` / `sitemap.ts` / `blog/rss.xml/route.ts`
- `src/app/opengraph-image.tsx`
- `src/components/footer.tsx` — 备案号与主体
- `deploy/k8s/ingressroute.yaml` — Host + redirect
- `deploy/k8s/deployment.yaml` — ICP 节点亲和注释/标签若绑死 `lurus.cn` 需并列 `ailurus.cn`
- `.github/workflows/post-deploy-smoke.yaml` — 默认探测 URL

### 阶段 2 — 文档与邮件

| 面 | 现 | 建议 |
|----|----|------|
| 文档 | `docs.lurus.cn` | `docs.ailurus.cn`（CNAME + 文档仓 baseURL）；过渡期双挂或 301 |
| 邮件 | `@lurus.cn` | 开 `@ailurus.cn` MX；旧址 **转发** 至少 6–12 个月 |
| 页内 docs 链接 | header/footer/产品页 | 随 docs 切流批量替换 |

### 阶段 3 — 身份 / Hub / 发布（高风险，单独窗口）

这些**不能**只改官网字符串：

| 面 | 现 | 注意 |
|----|----|------|
| 登录 | `identity.lurus.cn` | Cookie 域、OAuth redirect_uri、CORS、客户端白名单 |
| Hub | `hub.lurus.cn` | API Key 用户文档、价目页、SDK 示例 |
| 发布 | `releases.lurus.cn` | Switch/Lutu 安装包 URL；旧客户端会继续拉旧清单 |
| 其它子域 | `kova` / `lucrum` / … | 各服务 Ingress + 证书 |

策略：官网文案可先写「登录 / Hub 仍在 hub.lurus.cn」；API 迁到 `*.ailurus.cn` 时做 **双 DNS 并存 → 再 301**，并留回滚。

### 阶段 4 — 处置 `lurus.cn`（个人域）

三选一（按备案友好度）：

1. **永久 301** → `https://www.ailurus.cn/...`（SEO 友好；确认管局对「仅跳转」可接受）  
2. **极简个人页**（简历/链接列表）+ 个人备案号，与公司站脱钩  
3. **到期不续 / 注销个人备案**（仅在企业域稳定、外链迁完后）

过渡期忌讳：个人域继续完整镜像企业官网（会再次触发「主体与内容不符」核查）。

---

## 3. 风险清单（替你盯住的）

1. **备案未过就切 DNS / 上内容** → 未备案域名对外提供站点违规；等「备案成功」短信/工信部可查后再开。  
2. **企业域挂了个人备案号，或个人域挂了企业全称** → 核查直接不合格。  
3. **只迁 www、忘了改 canonical / sitemap / OG** → 搜索与分享卡仍指向旧域。  
4. **Cookie / OAuth 仍写 `.lurus.cn`** → 用户在 ailurus 登录态丢失或回调失败。  
5. **证书**：需 `ailurus.cn` + `www`（及后续 `docs` 等）的证书；现有 `lurus-cn-wildcard-tls` **不能**直接盖新域。  
6. **ICP 必须落在阿里云境内节点**：`ailurus` 的 www 与现 `lurus-www` 一样要钉在备案机器/节点。  
7. **外链与物料**：名片、合同、公众号、GitHub About、App 商店、发票抬头旁的网址 → 统一改 `ailurus.cn`。  
8. **邀请链 / 推广码**：`lurus.cn/r/<code>`、`lurus.cn/switch?ref=` → 新域等价路由 + 旧域 301。  
9. **Hub 价目与 releases**：官网若先指向新域，但价目仍 fetch `hub.lurus.cn` —— 可以，但文案要写清，避免用户以为服务也迁了。  
10. **个人域核查截止**（如短信 11-02）：在企业域未上线前，个人域先按专员要求过关；上线后尽快瘦身，从根上消风险。

---

## 4. 验收（企业域上线当天）

- [ ] 工信部可查：`ailurus.cn` 主体 = 公司，备案号与页脚一致且可点到 beian.miit.gov.cn  
- [ ] 公安备案号已挂、主体一致  
- [ ] `https://www.ailurus.cn/` 首页、方法、产品页可开  
- [ ] `https://ailurus.cn/` → www 301  
- [ ] 分享卡 / 搜索结果用的 OG 域名正确  
- [ ] 邮件 `contact@ailurus.cn` 能收；旧邮箱仍转发  
- [ ] `lurus.cn` 已 301 或已换成极简个人页（不再完整企业站）

---

## 5. 本仓近期约定

- **备案中**：不把 `SITE_URL` 改成 ailurus；不把企业全称写回 `lurus.cn` 页脚。  
- **通过后**：开切流 PR（Host + SITE_URL + 新备案号 + 邮件展示）；产品 API 子域另 PR、另窗口。  
- 真源文档即本文件；有变更只改这里，避免口头方案漂移。
