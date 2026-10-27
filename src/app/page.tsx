import Image from "next/image";
import Link from "next/link";
import {
  EvidenceLine,
  EvidenceList,
  Eyebrow,
  Lead,
  MaturityChip,
  Section,
  type Maturity,
} from "@/components/site";
import { BrandMark } from "@/components/brand-mark";
import { updates } from "@/app/blog/updates-data";

// 首页：品牌英雄 → 对外三层 LURUS(C) / URUS(B) / RUS(基建) → 证据 → 最近 → 边界。
// US = 内部经营层，只作脚注（互联网公司惯例：内部工具不与对外产品线并列陈列）。
// 学 Stripe / AWS 目录：Products · Solutions · Platform，三层够用。

const CONTACT = "mailto:contact@lurus.cn";

type Layer = {
  code: "LURUS" | "URUS" | "RUS";
  audience: string;
  title: string;
  line: string;
  products: ReadonlyArray<{ name: string; href: string; maturity?: Maturity }>;
};

/**
 * 对外产品线三层（软件工程 / IT 公司常见分法）：
 * LURUS — C 端 / 自助产品（Products）
 * URUS  — B 端标杆交付（Solutions）
 * RUS   — 基础设施（Platform）
 * US    — 内部全站经营，见层下脚注，不进主列表
 */
const LAYERS: readonly Layer[] = [
  {
    code: "LURUS",
    audience: "C 端",
    title: "自助产品",
    line: "个人与小团队能自己上手：桌面工具、按量调用、客户端下载。",
    products: [
      { name: "Switch", href: "/switch" },
      { name: "Hub 按量价格", href: "/hub/pricing" },
      { name: "下载", href: "/download" },
    ],
  },
  {
    code: "URUS",
    audience: "B 端",
    title: "标杆交付",
    line: "装进客户自有环境，用证据说明稳不稳——观测、记忆与方法。",
    products: [
      { name: "见证 Witness", href: "/witness", maturity: "早期试点" },
      { name: "Memorus", href: "/memorus", maturity: "早期试点" },
      { name: "方法", href: "/approach" },
    ],
  },
  {
    code: "RUS",
    audience: "基建",
    title: "基础设施",
    line: "被上层共同依赖：持久执行、私有网关、账号与计费底座。",
    products: [
      { name: "Kova", href: "/kova", maturity: "早期试点" },
      { name: "Hub 私有部署", href: "/hub", maturity: "内部生产使用" },
      { name: "Lugo", href: "/lugo", maturity: "内部生产使用" },
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

export default function Home() {
  return (
    <>
      {/* ── Hero ── */}
      <section
        aria-labelledby="home-brand"
        className="relative isolate min-h-[min(92vh,52rem)] overflow-hidden border-b border-[var(--lt-rule)]"
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

        <div className="relative mx-auto flex min-h-[min(92vh,52rem)] max-w-5xl flex-col justify-end px-6 pb-16 pt-28 md:pb-24 md:pt-36">
          <div className="max-w-[36rem]">
            <p className="hero-enter-up font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
              Urus · 原牛
            </p>
            <h1
              id="home-brand"
              className="hero-enter-up mt-5 flex items-center gap-3 font-display text-[2.75rem] font-semibold leading-none tracking-[-0.03em] text-[var(--lt-ink)] md:text-[4.25rem]"
              style={{ animationDelay: "60ms" }}
            >
              <BrandMark className="h-10 w-10 shrink-0 text-[var(--lt-ink)] md:h-14 md:w-14" />
              LurusTech
            </h1>
            <p
              className="hero-enter-up mt-6 font-display text-xl leading-[1.45] tracking-[-0.015em] text-[var(--lt-ink)] md:text-2xl"
              style={{ animationDelay: "140ms" }}
            >
              状态可核查。数据可恢复。改动有记录。
            </p>
            <p
              className="hero-enter-up mt-4 max-w-[32rem] text-base leading-[1.8] text-[var(--color-text-secondary)]"
              style={{ animationDelay: "220ms" }}
            >
              自助产品、B 端标杆、基础设施——三层对外；内部经营不占货架。
            </p>
            <div
              className="hero-enter-up mt-10 flex flex-wrap items-center gap-3"
              style={{ animationDelay: "300ms" }}
            >
              <Link href="/approach" className="btn-primary">
                读方法
              </Link>
              <a href={CONTACT} className="btn-secondary">
                写信聊聊
              </a>
              <a
                href="#layers"
                className="ml-1 font-mono text-[13px] text-[var(--color-text-muted)] underline decoration-[var(--lt-rule)] underline-offset-4 hover:text-[var(--lt-ink)] hover:decoration-[var(--lt-accent)]"
              >
                三层产品线 ↓
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Layers: 3 public ── */}
      <Section id="layers" width="wide" labelledBy="layers-title">
        <div className="grid items-start gap-12 md:grid-cols-[minmax(0,20rem)_1fr]">
          <div>
            <SectionTitle id="layers-title" eyebrow="产品线">
              剥开 LURUS。
            </SectionTitle>
            <Lead className="mt-6">
              名字取自原牛 Urus。对外只陈列三层——与多数软件公司的 Products / Solutions /
              Platform 同构；最里一层 US 留给自己用。
            </Lead>
            <figure className="mt-10 flex max-w-[16rem] flex-col items-start">
              <div className="flex h-40 w-40 items-center justify-center ring-1 ring-[var(--lt-rule)] bg-[var(--lt-bg)]">
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

            {/* US — internal only, not a peer shelf */}
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
            先看清，再迈步。
          </SectionTitle>
          <Lead className="mt-6">
            每一条状态都写明从哪里来、有多新。别家的仪表盘常常全绿；我们会告诉你哪一条只是推断。
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
          B 端观测见 <QuietLink href="/witness">见证</QuietLink>
          ；怎么交付见 <QuietLink href="/approach">方法</QuietLink>。
        </p>
      </Section>

      {/* ── Recent ── */}
      <Section id="recent" width="wide" labelledBy="recent-title">
        <div className="max-w-[44rem]">
          <SectionTitle id="recent-title" eyebrow="最近">
            最近交付了什么。
          </SectionTitle>
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
          <li className="flex gap-3">
            <span aria-hidden="true" className="text-[var(--color-text-muted)]">
              —
            </span>
            <span>不做机房与算力转售。B 端主张系统留在客户自有的环境里。</span>
          </li>
          <li className="flex gap-3">
            <span aria-hidden="true" className="text-[var(--color-text-muted)]">
              —
            </span>
            <span>不在客户环境里跑无人审批的写操作；事先批准的定时任务（如备份）除外。</span>
          </li>
          <li className="flex gap-3">
            <span aria-hidden="true" className="text-[var(--color-text-muted)]">
              —
            </span>
            <span>不承诺我们证明不了的数字。US 内部层不对外售卖。</span>
          </li>
        </ul>
      </Section>

      {/* ── Invite ── */}
      <Section labelledBy="invite-title">
        <p
          id="invite-title"
          className="font-display text-xl leading-[1.5] text-[var(--lt-ink)] md:text-2xl"
        >
          想先看看 B 端怎么做，读 <QuietLink href="/approach">方法</QuietLink>
          ；想聊聊你的环境，写信到{" "}
          <a
            href={CONTACT}
            className="text-[var(--lt-ink)] underline decoration-[var(--lt-rule)] underline-offset-4 hover:decoration-[var(--lt-accent)]"
          >
            contact@lurus.cn
          </a>
          。
        </p>
        <p className="mt-4 text-sm leading-[1.7] text-[var(--color-text-muted)]">
          下一步：来信写清环境现状与目标；我们回复是否接、怎么分期。
        </p>
      </Section>
    </>
  );
}
