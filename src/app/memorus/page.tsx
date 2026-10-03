import type { Metadata } from "next";
import Link from "next/link";
import { EvidenceLine, EvidenceList, Eyebrow, Lead, ProductHeader, Section } from "@/components/site";
import { AsOfDemo } from "./asof-demo";
import { DataTable, fmt } from "./benchmarks/charts";
import { LOCOMO } from "./benchmarks/data";
import {
  CAPABILITIES,
  DEPLOY_FACTS,
  HERO_STATS,
  INTEGRATIONS,
  LATENCY,
  LINKS,
  PAIN_POINTS,
  PROTOCOL_HEAD,
  PROTOCOL_ROWS,
} from "./product-data";

// Memorus 产品页：给 AI 系统的长期记忆。
// 叙事：首屏（主张 + 三个带区间的数字）→ 痛点与能力 → 六个能力 → 时点查询演示 → 同口径基准表
//       → 性能与部署 → 接入 → 边界与现状 → 文档与试点。
// 只写「做到什么」（功能层），不写实现机制；数据全部取自 ./product-data（基准数字再往上取自 ./benchmarks/data）。
// 除时点查询演示（asof-demo.tsx，客户端组件）外全部服务端渲染，无 JS 动效。

export const metadata: Metadata = {
  title: "Memorus — AI 系统的长期记忆",
  description:
    "记得住，也查得清：保留原文、可按时点追问、删除可传播、团队可治理。单个二进制文件，默认零外部依赖。LongMemEval-S held-out 问答 0.837（95% 区间 0.769–0.888，n=147）。早期试点。",
  alternates: { canonical: "/memorus" },
};

// ───────────────────────── 小组件 ─────────────────────────

function SectionTitle({ id, eyebrow, children }: { id: string; eyebrow: string; children: React.ReactNode }) {
  return (
    <>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2
        id={id}
        className="mt-3 font-display text-[1.625rem] font-semibold leading-[1.25] tracking-[-0.02em] text-[var(--lt-ink)] md:text-[1.875rem]"
      >
        {children}
      </h2>
    </>
  );
}

function Item({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3">
      <span aria-hidden="true" className="text-[var(--color-text-muted)]">
        —
      </span>
      <span>{children}</span>
    </li>
  );
}

function Code({ children }: { children: React.ReactNode }) {
  return <code className="font-mono text-[0.875em] text-[var(--lt-ink)]">{children}</code>;
}

const LINK_CLASS =
  "text-[var(--lt-ink)] underline decoration-[var(--lt-rule)] underline-offset-4 hover:decoration-[var(--lt-accent)]";

const th = "font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--color-text-muted)]";

const ci = (c: readonly [number, number]) => `[${fmt(c[0])}, ${fmt(c[1])}]`;

/** 延迟值：null 显示「测量中」。 */
const ms = (v: number | null) => (v === null ? "测量中" : `${v} ms`);

// ───────────────────────── 页面 ─────────────────────────

export default function MemorusPage() {
  return (
    <>
      {/* S1 首屏：主张 + 三个带区间的数字 */}
      <ProductHeader
        name="Memorus"
        maturity="早期试点"
        tagline={
          <>
            <span className="block font-display text-[1.75rem] font-semibold leading-[1.25] tracking-[-0.02em] text-[var(--lt-ink)] md:text-[2.125rem]">
              记得住，也查得清。
            </span>
            <span className="mt-4 block">
              AI 系统的长期记忆：保留原文、可按时点追问、删除可传播、团队可治理。单个二进制文件，默认零外部依赖。
            </span>
          </>
        }
      />
      <div className="px-6">
        <div className="mx-auto max-w-5xl pb-16 md:pb-24">
          <dl className="grid border-y border-[var(--lt-rule)] md:grid-cols-3">
            {HERO_STATS.map((s) => (
              <div
                key={s.key}
                className="border-b border-[var(--lt-rule)] py-6 last:border-b-0 md:border-b-0 md:border-l md:px-6 md:first:border-l-0 md:first:pl-0"
              >
                <dt className={th}>{s.label}</dt>
                <dd className="mt-3 font-display text-[3rem] font-semibold leading-none tracking-[-0.03em] tabular-nums text-[var(--lt-ink)] md:text-[3.25rem]">
                  {fmt(s.value)}
                </dd>
                <dd className="mt-2 font-mono text-[12px] tabular-nums leading-[1.7] text-[var(--lt-ink)]">
                  95% 区间 {ci(s.ci95)} · n={s.n}
                </dd>
                <dd className="mt-2 text-[14px] leading-[1.6] text-[var(--color-text-secondary)]">{s.note}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={LINKS.benchmarks} className="btn-primary">
              看完整基准
            </Link>
            <a href={LINKS.docs} className="btn-secondary">
              阅读文档
            </a>
          </div>
        </div>
      </div>

      {/* S2 痛点 → 能力 */}
      <Section id="why" labelledBy="why-title" width="wide">
        <SectionTitle id="why-title" eyebrow="为什么">
          三个常见的坑，三个直接的回答。
        </SectionTitle>
        <ul className="mt-10 grid gap-x-10 gap-y-10 md:grid-cols-3">
          {PAIN_POINTS.map((p) => (
            <li key={p.key} className="border-t border-[var(--lt-rule)] pt-5">
              <p className={th}>问题</p>
              <p className="mt-2 font-display text-lg font-semibold text-[var(--color-text-secondary)]">{p.pain}</p>
              <p className="mt-1 text-[15px] leading-[1.7] text-[var(--color-text-secondary)]">{p.painDetail}</p>
              <p className={`${th} mt-6`}>
                <span aria-hidden="true">↓ </span>Memorus
              </p>
              <p className="mt-2 font-display text-lg font-semibold text-[var(--lt-ink)]">{p.answer}</p>
              <p className="mt-1 text-[15px] leading-[1.7] text-[var(--lt-ink)]">{p.answerDetail}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* S3 六个能力 */}
      <Section id="capabilities" labelledBy="capabilities-title" width="wide">
        <SectionTitle id="capabilities-title" eyebrow="能力">
          六件事，每一件都查得到。
        </SectionTitle>
        <ul className="mt-10 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.map((c) => (
            <li key={c.key} className="border-t border-[var(--lt-rule)] pt-5">
              <h3 className="font-display text-lg font-semibold leading-[1.4] text-[var(--lt-ink)]">{c.title}</h3>
              <p className="mt-1 font-mono text-[12px] text-[var(--color-text-muted)]">{c.tagline}</p>
              <p className="mt-3 text-[15px] leading-[1.8] text-[var(--color-text-secondary)]">{c.body}</p>
            </li>
          ))}
        </ul>
        <div className="mt-12">
          <p className={th}>可信度核验 · 检索结果里的样子</p>
          <EvidenceList className="mt-3" caption="示例 · 每条记忆随结果返回出处与核验状态">
            <EvidenceLine
              name="记忆 · 服务默认端口 8080"
              status="ok"
              label="已核验"
              source="出处 config/server.toml · 源头未变"
            />
            <EvidenceLine
              name="记忆 · 调用 connect() 连接网关"
              status="stale"
              label="源头已变"
              source="出处 gateway/client.ts · 引用的那段代码已不在原文件"
            />
            <EvidenceLine
              name="记忆 · 周会改到周三"
              status="unknown"
              label="无法核验"
              source="出处为对话原文 · 没有可比对的源文件"
            />
          </EvidenceList>
        </div>
      </Section>

      {/* S4 时点查询演示 */}
      <Section id="as-of" labelledBy="as-of-title" width="wide">
        <SectionTitle id="as-of-title" eyebrow="时点查询">
          问「当时」，就答「当时」。
        </SectionTitle>
        <Lead className="mt-6">
          同一件事前后改过几次，默认回答以现值为准；也可以指定一个时点，得到那时的答案，以及那时成立的那句原话。
        </Lead>
        <div className="mt-10">
          <AsOfDemo />
        </div>
      </Section>

      {/* S5 同口径基准表 */}
      <Section id="protocol" labelledBy="protocol-title" width="wide">
        <SectionTitle id="protocol-title" eyebrow="同口径基准">
          不比谁的作答模型更贵。
        </SectionTitle>
        <Lead className="mt-6">
          一个数字只有带着口径才有意义：样本量、区间、能检出多大的差异、用什么档位的模型作答、怎么判分、每题读了多少上下文、跑了几次。
          我们把这些放在同一张表里。
        </Lead>
        <div className="mt-10">
          <DataTable
            caption="Memorus 公开基准的完整口径"
            head={PROTOCOL_HEAD}
            numeric={[1, 2]}
            minWidth="58rem"
            rows={PROTOCOL_ROWS.map((r) => [
              <span key="d" className={`whitespace-pre-line ${r.reference ? "text-[var(--color-text-secondary)]" : ""}`}>
                {r.dataset}
              </span>,
              String(r.n),
              fmt(r.accuracy),
              <span key="c" className="whitespace-nowrap font-mono tabular-nums text-[var(--lt-ink)]">
                {ci(r.ci95)}
              </span>,
              <span key="m">
                <span className="text-[var(--lt-ink)]">{r.mde}</span>
                <span className="block font-mono text-[11px] text-[var(--color-text-muted)]">{r.mdeNote}</span>
              </span>,
              r.reader,
              r.judge,
              r.context,
              r.runs,
            ])}
          />
        </div>
        <p className="mt-3 max-w-[64ch] font-mono text-[11px] leading-[1.7] text-[var(--color-text-muted)]">
          95% 区间为 Wilson 区间。「可检出的最小差异」按配对二元比较、双侧 α=0.05、功效 0.8 计算；p_d 为两套系统判分不一致的题目占比。
          判分模型事先经过校验，偏宽的候选已按事先写定的规则弃用，细节见完整报告。
        </p>
        <div className="mt-10 max-w-[44rem] space-y-4 text-base leading-[1.8] text-[var(--color-text-secondary)] md:text-[1.0625rem]">
          <p>
            公开榜单上的高分常见于前沿作答模型、宽松判官与每题数万 token 的阅读量，并且常为单次运行、无区间。
            口径不同的数字不能直接比较；我们公开口径、区间与可检出差异，并在同一作答模型下报告只给证据的上限。
          </p>
          <p>
            也因此：在 n=147 的集合上，相差几个百分点的改进证明不了什么；更细的比较要靠更大的集合承担。
          </p>
        </div>
        <p className="mt-6">
          <Link href={LINKS.benchmarks} className={`${LINK_CLASS} inline-flex min-h-11 items-center`}>
            完整报告：数据、流程、失败与下一步
          </Link>
        </p>
      </Section>

      {/* S6 性能与部署 */}
      <Section id="deploy" labelledBy="deploy-title" width="wide">
        <SectionTitle id="deploy-title" eyebrow="性能与部署">
          一个文件，默认零依赖。
        </SectionTitle>
        <div className="mt-10 grid gap-x-12 gap-y-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)]">
          <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {DEPLOY_FACTS.map((f) => (
              <li key={f.key} className="border-t border-[var(--lt-rule)] pt-5">
                <h3 className="font-display text-lg font-semibold leading-[1.4] text-[var(--lt-ink)]">{f.title}</h3>
                <p className="mt-2 text-[15px] leading-[1.8] text-[var(--color-text-secondary)]">{f.body}</p>
              </li>
            ))}
            <li className="border-t border-[var(--lt-rule)] pt-5 sm:col-span-2">
              <h3 className="font-display text-lg font-semibold leading-[1.4] text-[var(--lt-ink)]">进客户环境</h3>
              <p className="mt-2 text-[15px] leading-[1.8] text-[var(--color-text-secondary)]">
                有面向客户环境的 Docker Compose 部署包：一个应用容器加一个一次性初始化容器，内置 SQLite 存储，
                不依赖我们这边的任何基础设施；镜像可随交付以离线包提供，并附校验和。
              </p>
            </li>
          </ul>
          <div className="border-y border-[var(--lt-rule)] py-5">
            <h3 className="font-display text-lg font-semibold leading-[1.4] text-[var(--lt-ink)]">读写延迟</h3>
            <table className="mt-4 w-full border-collapse text-left text-[13px]">
              <caption className="sr-only">读写延迟 p50 / p95 / p99</caption>
              <thead>
                <tr className="border-b border-[var(--lt-rule)]">
                  <th scope="col" className={`${th} py-2 pr-3 font-medium`}>
                    操作
                  </th>
                  {(["p50", "p95", "p99"] as const).map((q) => (
                    <th key={q} scope="col" className={`${th} px-2 py-2 text-right font-medium last:pr-0`}>
                      {q}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(
                  [
                    ["写入", LATENCY.write],
                    ["检索", LATENCY.read],
                  ] as const
                ).map(([label, row]) => (
                  <tr key={label} className="border-b border-[var(--lt-rule)] last:border-b-0">
                    <th scope="row" className="py-2.5 pr-3 font-normal text-[var(--lt-ink)]">
                      {label}
                    </th>
                    {([row.p50, row.p95, row.p99] as const).map((v, i) => (
                      <td
                        key={i}
                        className="px-2 py-2.5 text-right font-mono tabular-nums text-[var(--color-text-secondary)] last:pr-0"
                      >
                        {ms(v)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-4 text-[13px] leading-[1.7] text-[var(--color-text-muted)]">
              {LATENCY.env ?? "尚未系统测量，所以不报数字；测完后连同测量环境一起公开。"}
            </p>
          </div>
        </div>
      </Section>

      {/* S7 接入 */}
      <Section id="integrate" labelledBy="integrate-title" width="wide">
        <SectionTitle id="integrate-title" eyebrow="接入">
          四种接入，同一个引擎。
        </SectionTitle>
        <Lead className="mt-6">可通过 MCP 接入主流编码助手与智能体框架；也可以用命令行、REST 或语言绑定直接调用。</Lead>
        <ul className="mt-10 grid gap-x-10 gap-y-10 sm:grid-cols-2">
          {INTEGRATIONS.map((g) => (
            <li key={g.key} className="border-t border-[var(--lt-rule)] pt-5">
              <h3 className="font-display text-lg font-semibold leading-[1.4] text-[var(--lt-ink)]">{g.title}</h3>
              <p className="mt-2 text-[15px] leading-[1.8] text-[var(--color-text-secondary)]">{g.body}</p>
              {g.code ? (
                <p className="mt-3">
                  <Code>{g.code}</Code>
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      </Section>

      {/* S8 边界与现状 */}
      <Section id="boundaries" labelledBy="boundaries-title">
        <SectionTitle id="boundaries-title" eyebrow="边界与现状">
          还在早期，我们写清楚到哪一步。
        </SectionTitle>
        <ul className="mt-8 space-y-4 text-base leading-[1.8] text-[var(--color-text-secondary)]">
          <Item>当前版本在预发与演示环境运行，未承载客户生产流量，尚未替换正在服务线上流量的上一代实现。</Item>
          <Item>尚未发布到任何包仓库。</Item>
          <Item>
            作答模型是低价档；更强作答模型下的分数我们没有跑，不作推断。LoCoMo 只判 1 次，公开常见做法是 3 次取均值。
          </Item>
          <Item>
            LoCoMo 的短轮次检索仍是短板（轮次级 any@10 {fmt(LOCOMO.turnRetrieval[1].any10)}）；
            评测里用到的词法清理与「整本会话 + 尾部命中轮」目前只在评测链路里，尚未进产品默认配置。
          </Item>
          <Item>零配置默认不带真实的语义嵌入；要做语义检索，需要配置嵌入服务。</Item>
          <Item>数据模型带来源字段；目前经服务接口写入的记忆还没有来源记录。</Item>
          <Item>MCP 的服务端 HTTP 端点目前仅支持单租户；多租户请走 REST。</Item>
          <Item>备份中的副本尚未纳入删除传播，正在建设。</Item>
          <Item>读写延迟尚未系统测量，所以不报。</Item>
        </ul>
      </Section>

      {/* S9 文档与试点 */}
      <Section labelledBy="cta-title">
        <p id="cta-title" className="font-display text-xl leading-[1.5] text-[var(--lt-ink)] md:text-2xl">
          想把它放进你的系统，先读文档；想在你的环境里试，写信给我们。
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={LINKS.docs} className="btn-secondary">
            阅读文档
          </a>
          <a href={LINKS.pilot} className="btn-primary">
            申请试点
          </a>
        </div>
        <p className="mt-4 text-sm text-[var(--color-text-muted)]">
          试点申请发至{" "}
          <a href={LINKS.pilot} className={LINK_CLASS}>
            {LINKS.pilotLabel}
          </a>
          。
        </p>
      </Section>
    </>
  );
}
