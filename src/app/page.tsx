import Image from "next/image";
import Link from "next/link";
import {
  Disclosure,
  EvidenceLine,
  EvidenceList,
  Eyebrow,
  Lead,
  MaturityChip,
  Section,
  type Maturity,
} from "@/components/site";
import { BrandMark, MARK_BY_HREF, type BrandLine } from "@/components/brand-mark";
import { updates } from "@/app/(shelf)/blog/updates-data";
import { COMPANY_GROUPS, catalogMark, itemsIn } from "@/lib/catalog";
import { siteProfile } from "@/lib/site-profile";

// 首页结构共用。文案按 SITE_PROFILE 分个人站 / 公司站。
// 三件事 → 三层手段 → 一行证据 → 近况 → 边界。
// 近况只取更新日志真源的前三条。不写价格、客户名、编造数字。

type Layer = {
  code: "LURUS" | "URUS" | "RUS";
  audience: string;
  title: string;
  line: string;
  /** 这一层有唯一的标时写上。底座同时有裂和金属 Z，标跟在每条产品上。 */
  mark?: BrandLine;
  products: ReadonlyArray<{ name: string; href: string; maturity?: Maturity }>;
};

/**
 * 三层仍按 LURUS / URUS / RUS 拆开，两张面孔都列出。
 * Founder、Lucrum、价目和日志放在脚注，不给它们编一个成熟度。
 */
const LAYERS: readonly Layer[] = [
  {
    code: "LURUS",
    mark: "z-flat",
    audience: "自助",
    title: "上手的工具",
    line: "桌面与下载，给已经在用的人自己上手。",
    products: [
      { name: "Switch", href: "/switch", maturity: "早期试点" },
      { name: "Lux CLI", href: "/lux", maturity: "早期试点" },
      { name: "下载入口", href: "/download" },
    ],
  },
  {
    code: "URUS",
    mark: "crystal",
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
      { name: "Forge", href: "/forge", maturity: "内部生产使用" },
      { name: "Hub 私有部署", href: "/hub", maturity: "内部生产使用" },
      { name: "Platform", href: "/lugo", maturity: "内部生产使用" },
    ],
  },
];

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
  const site = siteProfile();
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
            <p className="hero-enter-up flex items-center gap-3">
              <BrandMark line="crystal" className="h-11 w-11 md:h-12 md:w-12" />
              <span className="font-display text-sm font-semibold tracking-[-0.02em] text-[var(--lt-ink)]">
                {site.id === "company" ? "硅知睿" : "LurusTech"}
              </span>
            </p>
            <p
              className="hero-enter-up mt-5 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--lt-accent)]"
              style={{ animationDelay: "60ms" }}
            >
              {site.homeEyebrow}
            </p>
            <h1
              id="home-offer"
              className="hero-enter-up mt-4 font-display text-[1.875rem] font-semibold leading-[1.25] tracking-[-0.03em] text-[var(--lt-ink)] md:text-[3.25rem] md:leading-[1.12]"
              style={{ animationDelay: "120ms" }}
            >
              {site.homeH1}
            </h1>
            <p
              className="hero-enter-up mt-5 max-w-[36rem] text-[15px] leading-[1.75] text-[var(--color-text-secondary)] md:text-base md:leading-[1.8]"
              style={{ animationDelay: "200ms" }}
            >
              {site.homeLead}
            </p>
            <div
              className="hero-enter-up mt-8 flex flex-wrap items-center gap-3"
              style={{ animationDelay: "280ms" }}
            >
              {site.homeActions.map((action) =>
                action.href.startsWith("mailto:") ? (
                  <a
                    key={action.href}
                    href={action.href}
                    className={action.primary ? "btn-primary" : "btn-secondary"}
                  >
                    {action.label}
                  </a>
                ) : (
                  <Link
                    key={action.href}
                    href={action.href}
                    className={action.primary ? "btn-primary" : "btn-secondary"}
                  >
                    {action.label}
                  </Link>
                ),
              )}
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
          {site.id === "company"
            ? "验收时对这三行：状态说得清来历，改动可以回放，备份用一次真恢复来证明。"
            : "我用这三行判断稳不稳：状态说得清来历，改动可以回放，备份用一次真恢复来证明。"}
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

      {site.id === "company" ? (
        <Section id="offer" labelledBy="offer-title">
          <SectionTitle id="offer-title" eyebrow="卖的是这一件事">
            已经在跑的系统，要能证明恢复得回来。
          </SectionTitle>
          <Lead className="mt-6">{site.layersLead}</Lead>
          <ul className="mt-8 space-y-4 text-base leading-[1.8] text-[var(--color-text-secondary)]">
            <Dash>备份文件在、恢复命令退出码是 0，仍可能只回来一部分行。判据是逐表核对，不是命令成功。</Dash>
            <Dash>只备份数据库或数据卷，可能启动得了、凭据解不开。密钥覆盖单独记一行，判据是演练里凭据能解开。</Dash>
            <Dash>不从零做一套新应用。优先接手你环境里已经在跑的系统。</Dash>
            <Dash>
              写操作前人批、崩溃后续跑、公钥验包，是增强档。今天这些动作仍多由独立脚本完成，见{" "}
              <QuietLink href="/approach">方法</QuietLink>。
            </Dash>
          </ul>
        </Section>
      ) : null}

      {/* ── Layers: full roster on both faces. Company hero above stays the offer. ── */}
      <Section id="layers" width="wide" labelledBy="layers-title">
        <div className="grid items-start gap-12 md:grid-cols-[minmax(0,20rem)_1fr]">
          <div>
            <SectionTitle id="layers-title" eyebrow={site.id === "company" ? "构件" : "项目地图"}>
              {site.id === "company" ? "每一样和合同的关系。" : "剥开 LURUS，看清在做的东西。"}
            </SectionTitle>
            <Lead className="mt-6">{site.layersLead}</Lead>
            <figure className="mt-10 flex max-w-[16rem] flex-col items-start">
              <BrandMark line="crystal" label="主标：核" className="h-40 w-40" />
              <figcaption className="mt-3 font-mono text-[11px] leading-relaxed text-[var(--color-text-muted)]">
                主标 · 核
              </figcaption>
            </figure>
          </div>

          <div>
            {site.id === "company" ? (
              <ol className="border-t border-[var(--lt-rule)]">
                {COMPANY_GROUPS.map((group) => (
                  <li key={group.id} className="border-b border-[var(--lt-rule)] py-8">
                    <div className="flex items-center gap-3">
                      <BrandMark line={group.mark} className="h-8 w-8" />
                      <p className="font-medium text-[var(--lt-ink)]">{group.title}</p>
                    </div>
                    <p className="mt-2 max-w-[40rem] text-[15px] leading-[1.8] text-[var(--color-text-secondary)]">
                      {group.line}
                    </p>
                    <ul className="mt-5 space-y-4">
                      {itemsIn(group.hrefs).map((item) => (
                        <li key={item.href} className="max-w-[36rem]">
                          <span className="inline-flex items-center gap-2">
                            <BrandMark line={catalogMark(item.href)} className="h-6 w-6" />
                            <QuietLink href={item.href}>{item.name}</QuietLink>
                            {item.maturity ? <MaturityChip level={item.maturity} /> : null}
                          </span>
                          <span className="mt-1 block text-[15px] leading-[1.7] text-[var(--color-text-secondary)]">
                            {item.relation}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ol>
            ) : (
            <ol className="border-t border-[var(--lt-rule)]">
              {LAYERS.map((layer, i) => (
                <li
                  key={layer.code}
                  className="home-layer-row border-b border-[var(--lt-rule)] py-8"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
                    <span className="inline-flex items-center gap-3">
                      {layer.mark ? <BrandMark line={layer.mark} className="h-8 w-8" /> : null}
                      <LayerWord code={layer.code} />
                    </span>
                    <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--lt-accent)]">
                      {layer.audience}
                    </span>
                  </div>
                  <p className="mt-2 font-medium text-[var(--lt-ink)]">{layer.title}</p>
                  <p className="mt-2 max-w-[40rem] text-[15px] leading-[1.8] text-[var(--color-text-secondary)]">
                    {layer.line}
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                    {layer.products.map((p) => {
                      const mark = MARK_BY_HREF[p.href];
                      return (
                      <li key={p.href} className="flex items-center gap-2">
                        {mark ? <BrandMark line={mark} className="h-6 w-6" /> : null}
                        <QuietLink href={p.href}>{p.name}</QuietLink>
                        {p.maturity ? <MaturityChip level={p.maturity} /> : null}
                      </li>
                      );
                    })}
                  </ul>
                </li>
              ))}
            </ol>
            )}

            {site.id === "personal" ? (
            <p className="mt-8 max-w-[40rem] text-[13px] leading-[1.7] text-[var(--color-text-muted)]">
              <span className="font-mono tracking-[0.12em] text-[var(--lt-ink)]/50">LUR</span>
              <span className="font-mono tracking-[0.12em] text-[var(--lt-ink)]">US</span>
              <span className="ml-3">
                内部全站全线 · 设计 / 开发 / 经营用，不对外售卖。见{" "}
                <QuietLink href="/about">关于</QuietLink>
                。另有 <QuietLink href="/founder">Founder</QuietLink>（仅内部）、
                <QuietLink href="/lucrum">Lucrum</QuietLink>（冻结维护）。价目见{" "}
                <QuietLink href="/hub/pricing">Hub 价格</QuietLink>
                ，日志见 <QuietLink href="/blog">更新日志</QuietLink>。
              </span>
            </p>
            ) : null}
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
        <p className="mt-8 text-[15px] leading-relaxed text-[var(--color-text-secondary)]">
          怎么硬化、怎么证明稳，写在 <QuietLink href="/approach">方法</QuietLink>
          。观测见 <QuietLink href="/witness">见证</QuietLink>。
        </p>
      </Section>

      {/* ── 近况：公开日志的前三条，不另写客户故事。 ── */}
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
        {site.legalName ? (
          <p className="mb-4 text-base leading-[1.8] text-[var(--color-text-secondary)]">{site.legalName}</p>
        ) : null}
        <p
          id="invite-title"
          className="font-display text-xl leading-[1.5] text-[var(--lt-ink)] md:text-2xl"
        >
          {site.id === "company" ? "想核对验收怎么写，读" : "想看怎么证明稳，读"}{" "}
          <QuietLink href="/approach">方法</QuietLink>
          ；{site.id === "company" ? "想让我们看你现在的系统，写信到" : "想聊环境，写信到"}{" "}
          <a
            href={`mailto:${site.contactEmail}`}
            className="text-[var(--lt-ink)] underline decoration-[var(--lt-rule)] underline-offset-4 hover:decoration-[var(--lt-accent)]"
          >
            {site.contactEmail}
          </a>
          。
        </p>
        <p className="mt-4 text-sm leading-[1.7] text-[var(--color-text-muted)]">{site.inviteNext}</p>
      </Section>
    </>
  );
}
