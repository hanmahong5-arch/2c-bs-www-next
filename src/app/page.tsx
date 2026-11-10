import Image from "next/image";
import Link from "next/link";
import {
  Disclosure,
  EvidenceLine,
  EvidenceList,
  Eyebrow,
  Lead,
  LedgerRow,
  MaturityChip,
  NextStep,
  Section,
  type Maturity,
} from "@/components/site";
import { BrandMark } from "@/components/brand-mark";
import { updates } from "@/app/blog/updates-data";

// 首页：个人项目站。Urus 英雄图与 LURUS 剥层保留。
// 我在做的工具与底座 → 三件事 → 三层手段 → 一行证据 → 近况 → 边界。
// 近况只取更新日志真源的前三条。不写价格、客户名、编造数字。
// 证据带下只链已核对的公开入口，不把示例行改成实测，也不在首页重述价目数字。

const CONTACT = "mailto:contact@lurus.cn";

type Layer = {
  code: "LURUS" | "URUS" | "RUS";
  audience: string;
  title: string;
  line: string;
  products: ReadonlyArray<{ name: string; href: string; maturity?: Maturity }>;
};

/**
 * 三层仍是 Urus 命名（LURUS / URUS / RUS），是个人项目站上的工具与底座地图。
 * US 只作脚注，不进主列表。首页不挂 Hub 按量价格。
 */
const LAYERS: readonly Layer[] = [
  {
    code: "LURUS",
    audience: "自助",
    title: "上手的工具",
    line: "桌面与下载，给已经在用的人自己上手。",
    products: [
      { name: "Switch", href: "/switch" },
      { name: "下载", href: "/download" },
    ],
  },
  {
    code: "URUS",
    audience: "环境里",
    title: "观测与方法",
    line: "装进你自己的环境：看清状态、记住上下文，以及怎么证明它稳。",
    products: [
      { name: "见证 Witness", href: "/witness", maturity: "早期试点" },
      { name: "Memorus", href: "/memorus", maturity: "早期试点" },
      { name: "方法", href: "/approach" },
    ],
  },
  {
    code: "RUS",
    audience: "底座",
    title: "执行与账号",
    line: "被上层共同依赖的持久执行、网关与账号。成熟度各自标明；今天的写操作仍多由独立脚本完成。",
    products: [
      { name: "Kova", href: "/kova", maturity: "早期试点" },
      { name: "Hub 私有部署", href: "/hub", maturity: "内部生产使用" },
      { name: "Lugo", href: "/lugo", maturity: "内部生产使用" },
    ],
  },
];

// 与方法页「可核对」同一套纸面细表：左列入口，右列等宽种类。
// 路由已在源码核对。/hub/pricing.md 是纯文本 route，不在 SITE_ROUTES，用普通链接，不走页面预取。
// 不链 /security，不编 GitHub，不写运行数字、客户名或 SLA。
const REAL_PROOF: readonly {
  href: string;
  title: string;
  kind: "基准" | "价目" | "价目纯文本" | "日志" | "产品" | "首信";
  plain?: boolean;
}[] = [
  { href: "/memorus/benchmarks", title: "Memorus 公开基准报告", kind: "基准" },
  { href: "/hub/pricing", title: "Hub 按量价格", kind: "价目" },
  { href: "/hub/pricing.md", title: "Hub 价目纯文本", kind: "价目纯文本", plain: true },
  { href: "/blog", title: "更新日志", kind: "日志" },
  { href: "/witness", title: "见证", kind: "产品" },
  { href: "/approach#intake", title: "方法页首信清单", kind: "首信" },
];

function ProofLink({
  href,
  title,
  kind,
  plain,
}: {
  href: string;
  title: string;
  kind: string;
  plain?: boolean;
}) {
  const className = "group flex items-baseline justify-between gap-x-6 py-3";
  const inner = (
    <>
      <span className="text-[15px] leading-[1.6] text-[var(--lt-ink)] underline decoration-[var(--lt-rule)] underline-offset-4 group-hover:decoration-[var(--lt-accent)]">
        {title}
      </span>
      <span className="shrink-0 font-mono text-[12px] text-[var(--color-text-muted)]">{kind}</span>
    </>
  );
  if (plain) {
    return (
      <a href={href} className={className}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {inner}
    </Link>
  );
}

function QuietLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-[var(--lt-ink)] underline decoration-[var(--lt-rule)] underline-offset-4 hover:decoration-[var(--lt-accent)]"
    >
      {children}
    </Link>
  );
}

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

/** Typographic peel: highlight the active syllable inside LURUS */
function LayerWord({ code }: { code: Layer["code"] }) {
  const full = "LURUS";
  const start = code === "LURUS" ? 0 : full.indexOf(code);
  const end = start + code.length;
  return (
    <span className="font-display text-[2rem] font-semibold tracking-[0.12em] md:text-[2.75rem]" aria-label={code}>
      <span className="text-[var(--lt-ink)]/25">{full.slice(0, start)}</span>
      <span className="text-[var(--lt-ink)]">{full.slice(start, end)}</span>
      <span className="text-[var(--lt-ink)]/25">{full.slice(end)}</span>
    </span>
  );
}

function Dash({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3">
      <span aria-hidden="true" className="text-[var(--color-text-muted)]">
        —
      </span>
      <span>{children}</span>
    </li>
  );
}

export default function Home() {
  return (
    <>
      {/* ── Hero：个人项目首屏，压在 Urus 山脊上 ── */}
      <section
        aria-labelledby="home-offer"
        className="relative isolate overflow-hidden border-b border-[var(--lt-rule)]"
      >
        <Image
          src="/images/brand/hero-abstract-ridge.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="home-hero-bg object-cover object-[70%_45%] md:object-[60%_42%]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[var(--lt-paper)] from-0% via-[var(--lt-paper)]/80 via-42% to-transparent to-90%"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[var(--lt-paper)] from-0% via-[var(--lt-paper)]/25 via-32% to-transparent to-58%"
        />

        <div className="relative mx-auto flex max-w-5xl flex-col justify-end px-6 pb-12 pt-14 md:min-h-[min(92vh,52rem)] md:pb-24 md:pt-28">
          <div className="max-w-[38rem]">
            <p className="hero-enter-up flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
              <BrandMark className="h-8 w-8 shrink-0 text-[var(--lt-ink)] md:h-9 md:w-9" />
              Urus · 原牛
            </p>
            <p
              className="hero-enter-up mt-5 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--lt-accent)]"
              style={{ animationDelay: "60ms" }}
            >
              个人项目 · 工具与底座
            </p>
            <h1
              id="home-offer"
              className="hero-enter-up mt-4 font-display text-[1.875rem] font-semibold leading-[1.25] tracking-[-0.03em] text-[var(--lt-ink)] md:text-[3.25rem] md:leading-[1.12]"
              style={{ animationDelay: "120ms" }}
            >
              我在做的 AI 工具与底座。
            </h1>
            <p
              className="hero-enter-up mt-5 max-w-[36rem] text-[15px] leading-[1.75] text-[var(--color-text-secondary)] md:text-base md:leading-[1.8]"
              style={{ animationDelay: "200ms" }}
            >
              桌面端、记忆与执行、网关与账号——状态写明证据强度，备份只认真恢复一次才算数，成熟度各自标明。系统留在你自己的环境里。
            </p>
            <div
              className="hero-enter-up mt-8 flex flex-wrap items-center gap-3"
              style={{ animationDelay: "280ms" }}
            >
              <Link href="/download" className="btn-primary">
                下载与上手
              </Link>
              <Link href="/approach" className="btn-secondary">
                阅读方法
              </Link>
              <a href={CONTACT} className="btn-secondary">
                写信给 contact@lurus.cn
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── 做事时的三件判据 ── */}
      <Section id="how" labelledBy="how-title">
        <SectionTitle id="how-title" eyebrow="做事时的三件判据">
          看清状态，执行留痕，用恢复证明备份。
        </SectionTitle>
        <Lead className="mt-6">
          这三件事撑住可信交付：状态说得清来历，改动可以回放，备份用一次真恢复来证明。
        </Lead>
        <div className="mt-10">
          <Disclosure summary={<span className="text-[1.0625rem]">观测：月报里的「正常」，要说清凭什么。</span>}>
            <p>
              在你的环境里放只读采集器，另从一台不在被测机器上的主机做外部探测。
              采样缺了就记为「未采样」，不写成正常。试点目前只运行在我们自己的环境里。
            </p>
            <p className="mt-2">
              <QuietLink href="/witness">见证 →</QuietLink>
            </p>
          </Disclosure>
          <Disclosure summary={<span className="text-[1.0625rem]">执行：先审批，再动手，过程可回放。</span>}>
            <p>
              需要在你的环境里动手时，先审批，再执行；执行过程逐步写入日志，
              进程崩溃后从日志恢复，事后可以逐步回放。计划由 Kova{" "}
              <MaturityChip level="早期试点" /> 承担；今天这些动作仍由独立脚本完成。
            </p>
            <p className="mt-2">
              <QuietLink href="/kova">Kova →</QuietLink>
            </p>
          </Disclosure>
          <Disclosure summary={<span className="text-[1.0625rem]">回放：每月真恢复一次，再写进月报。</span>}>
            <p>
              备份文件在，只说明有备份。判据只有一个：真的恢复一次，再逐表核对行数。
              每月做一次，并出一份月报，每个数字写明怎么测。
            </p>
            <p className="mt-2">
              <QuietLink href="/approach">方法 →</QuietLink>
            </p>
          </Disclosure>
        </div>
      </Section>

      {/* ── Layers: means, not a price list ── */}
      <Section id="layers" width="wide" labelledBy="layers-title">
        <div className="grid items-start gap-12 md:grid-cols-[minmax(0,20rem)_1fr]">
          <div>
            <SectionTitle id="layers-title" eyebrow="项目地图">
              剥开 LURUS，看清在做的东西。
            </SectionTitle>
            <Lead className="mt-6">
              名字仍取自原牛 Urus。三层是工具与底座的地图，不是公司货架。怎么证明稳，写在方法页。最里一层
              US 只留给自己用。
            </Lead>
            <figure className="mt-10 flex max-w-[16rem] flex-col items-start">
              <div className="flex h-40 w-40 items-center justify-center bg-[var(--lt-bg)] ring-1 ring-[var(--lt-rule)]">
                <BrandMark className="h-24 w-24 text-[var(--lt-ink)]" />
              </div>
              <figcaption className="mt-3 font-mono text-[11px] leading-relaxed text-[var(--color-text-muted)]">
                商标 · U + 野牛角
              </figcaption>
            </figure>
          </div>

          <div>
            <ol className="border-t border-[var(--lt-rule)]">
              {LAYERS.map((layer, i) => (
                <li
                  key={layer.code}
                  className="home-layer-row border-b border-[var(--lt-rule)] py-8"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                    <LayerWord code={layer.code} />
                    <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--lt-accent)]">
                      {layer.audience}
                    </span>
                  </div>
                  <p className="mt-2 font-medium text-[var(--lt-ink)]">{layer.title}</p>
                  <p className="mt-2 max-w-[40rem] text-[15px] leading-[1.8] text-[var(--color-text-secondary)]">
                    {layer.line}
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                    {layer.products.map((p) => (
                      <li key={p.href} className="flex items-center gap-2">
                        <QuietLink href={p.href}>{p.name}</QuietLink>
                        {p.maturity ? <MaturityChip level={p.maturity} /> : null}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>

            <p className="mt-8 max-w-[40rem] text-[13px] leading-[1.7] text-[var(--color-text-muted)]">
              <span className="font-mono tracking-[0.12em] text-[var(--lt-ink)]/50">LUR</span>
              <span className="font-mono tracking-[0.12em] text-[var(--lt-ink)]">US</span>
              <span className="ml-3">
                内部全站全线 · 设计 / 开发 / 经营用，不对外售卖。见{" "}
                <QuietLink href="/about">关于</QuietLink>。
              </span>
            </p>
          </div>
        </div>
      </Section>

      {/* ── Evidence ── */}
      <Section id="evidence" width="wide" labelledBy="evidence-title">
        <div className="max-w-[44rem]">
          <SectionTitle id="evidence-title" eyebrow="一行证据">
            月报里的每一条，都写明怎么测。
          </SectionTitle>
          <Lead className="mt-6">
            下面三行是示例，不是客户数据。每一条都写明从哪里来、有多新、是实测还是推断。
          </Lead>
        </div>
        <EvidenceList
          className="mt-10"
          caption="示例 · 三行分别对应实证、黑盒推断、陈旧三种证据强度"
        >
          <EvidenceLine
            name="platform-core"
            version="v1.4.2"
            status="ok"
            source="版本来自服务自报 · 健康来自自省实证"
            age="12 秒前"
          />
          <EvidenceLine
            name="客户自建 supabase"
            version="?"
            status="warn"
            label="正常（推断）"
            source="版本未知 · 健康为黑盒推断（仅可达性）"
          />
          <EvidenceLine
            name="nginx vhost"
            status="stale"
            source="采集器 3 小时未上报 —— 这不是「正常」，是「不知道」"
          />
        </EvidenceList>
        <div className="mt-10 max-w-[44rem]">
          <p className="text-[15px] leading-relaxed text-[var(--color-text-secondary)]">
            上面三行仍是示例。这些页是已经发布的入口，打开原页自己看，这里不重述数字。
          </p>
          <ul className="mt-6 border-y border-[var(--lt-rule)]">
            {REAL_PROOF.map((row, i) => (
              <li key={row.href} className={i > 0 ? "border-t border-[var(--lt-rule)]" : undefined}>
                <ProofLink {...row} />
              </li>
            ))}
          </ul>
          <LedgerRow
            href="/approach#receipt"
            label="演练回执"
            meta="字段留空，不写可用率"
            className="mt-8"
          />
          <LedgerRow
            href="/witness#report"
            label="月度证据报告"
            meta="五栏留空，不代替回执"
            className="-mt-px"
          />
        </div>
        <p className="mt-8 text-[15px] leading-relaxed text-[var(--color-text-secondary)]">
          怎么硬化、怎么证明稳，写在 <QuietLink href="/approach">方法</QuietLink>
          。观测见 <QuietLink href="/witness">见证</QuietLink>。
        </p>
      </Section>

      {/* ── 近况：更新日志真源的前三条 ── */}
      <Section id="recent" width="wide" labelledBy="recent-title">
        <div className="max-w-[44rem]">
          <SectionTitle id="recent-title" eyebrow="近况">
            更新日志里，最近三条。
          </SectionTitle>
          <Lead className="mt-6">下面按时间取公开日志的前三条，不另写客户故事。</Lead>
        </div>
        <ul className="mt-10 border-t border-[var(--lt-rule)]">
          {updates.slice(0, 3).map((u) => (
            <li
              key={u.title}
              className="grid gap-x-8 gap-y-1 border-b border-[var(--lt-rule)] py-5 md:grid-cols-[6rem_14rem_1fr] md:items-baseline"
            >
              <span className="font-mono text-[13px] text-[var(--color-text-muted)]">{u.date}</span>
              <span className="font-medium text-[var(--lt-ink)]">{u.title}</span>
              <span className="text-[15px] leading-relaxed text-[var(--color-text-secondary)]">{u.desc}</span>
            </li>
          ))}
        </ul>
        <p className="mt-6">
          <QuietLink href="/blog">全部更新 →</QuietLink>
        </p>
      </Section>

      {/* ── Boundaries ── */}
      <Section id="boundaries" labelledBy="boundaries-title">
        <SectionTitle id="boundaries-title" eyebrow="边界">
          我们不做的事。
        </SectionTitle>
        <ul className="mt-8 space-y-4 text-base leading-[1.8] text-[var(--color-text-secondary)]">
          <Dash>不做机房与算力转售。系统留在你自有的环境里。</Dash>
          <Dash>不在你的环境里跑没有审批的写操作；事先批准的定时任务（如备份）除外。</Dash>
          <Dash>不从零做一套新的应用。优先接手已经在你环境里跑着的系统。</Dash>
          <Dash>不承诺证明不了的数字。US 内部层不对外售卖。</Dash>
        </ul>
      </Section>

      {/* ── Invite ── */}
      <Section labelledBy="invite-title">
        <p
          id="invite-title"
          className="font-display text-xl leading-[1.5] text-[var(--lt-ink)] md:text-2xl"
        >
          想看产品怎么证明稳，读 <QuietLink href="/approach">方法</QuietLink>
          ；想聊环境或合作，写信到{" "}
          <a
            href={CONTACT}
            className="text-[var(--lt-ink)] underline decoration-[var(--lt-rule)] underline-offset-4 hover:decoration-[var(--lt-accent)]"
          >
            contact@lurus.cn
          </a>
          。
        </p>
        <NextStep>来信写清环境现状与目标；我回复是否适合现阶段、怎么分期。</NextStep>
        <p className="mt-4">
          <QuietLink href="/approach#intake">方法页首信清单</QuietLink>
        </p>
      </Section>
    </>
  );
}
