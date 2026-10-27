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
import { BrandMark, UrusPortrait } from "@/components/brand-mark";
import { updates } from "@/app/blog/updates-data";

// 首页：品牌英雄（Urus 原牛）→ 四层命名 LURUS / URUS / RUS / US → 证据 → 最近 → 边界。
// 学 Linear / Stripe 的克制：首屏只留品牌、一句主张、一组 CTA、一张全幅图；层级用排版叙事，不用卡片墙。

const CONTACT = "mailto:contact@lurus.cn";

type Layer = {
  code: "LURUS" | "URUS" | "RUS" | "US";
  title: string;
  line: string;
  products: ReadonlyArray<{ name: string; href: string; maturity?: Maturity }>;
};

/** 剥开 LURUS：公司 → 野牛核 → 工程脊骨 → 人与账 */
const LAYERS: readonly Layer[] = [
  {
    code: "LURUS",
    title: "公司与交付",
    line: "企业 AI 交付工程：系统留在你自己的环境里，我们用证据说明它是稳的。",
    products: [
      { name: "方法", href: "/approach" },
      { name: "关于", href: "/about" },
    ],
  },
  {
    code: "URUS",
    title: "野牛 · 可核查",
    line: "原牛（Urus）是品牌核：先看清状态，再下判断；每条读数写明证据强度。",
    products: [{ name: "见证 Witness", href: "/witness", maturity: "早期试点" }],
  },
  {
    code: "RUS",
    title: "脊骨 · 执行与记忆",
    line: "跑得住、记得住、调得出：持久执行、记忆引擎、私有 LLM 网关。",
    products: [
      { name: "Kova", href: "/kova", maturity: "早期试点" },
      { name: "Memorus", href: "/memorus", maturity: "早期试点" },
      { name: "Hub", href: "/hub", maturity: "内部生产使用" },
    ],
  },
  {
    code: "US",
    title: "人与账",
    line: "账号、钱包、收款与桌面工具——同一套身份，落到你自己的环境。",
    products: [
      { name: "Lugo", href: "/lugo", maturity: "内部生产使用" },
      { name: "Switch", href: "/switch" },
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
  const start = full.indexOf(code === "LURUS" ? "LURUS" : code);
  const end = start + (code === "LURUS" ? 5 : code.length);
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
      {/* ── Hero: full-bleed Urus ridge, brand first ── */}
      <section
        aria-labelledby="home-brand"
        className="relative isolate min-h-[min(92vh,52rem)] overflow-hidden border-b border-[var(--lt-rule)]"
      >
        <Image
          src="/images/brand/hero-urus-ridge.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="home-hero-bg object-cover object-[72%_42%] md:object-[58%_40%]"
        />
        {/* Soft wash: type stays readable; ridge + ox stay visible on the right */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[var(--lt-paper)] from-0% via-[var(--lt-paper)]/78 via-45% to-transparent to-88%"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[var(--lt-paper)] from-0% via-[var(--lt-paper)]/20 via-35% to-transparent to-55%"
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
              把 AI 系统在客户自有环境里跑稳，并用证据说明它是稳的。
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
                四层产品线 ↓
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Brand etymology: peel LURUS ── */}
      <Section id="layers" width="wide" labelledBy="layers-title">
        <div className="grid items-start gap-12 md:grid-cols-[minmax(0,22rem)_1fr]">
          <div>
            <SectionTitle id="layers-title" eyebrow="命名">
              剥开 LURUS。
            </SectionTitle>
            <Lead className="mt-6">
              品牌取自原牛 Urus——已灭绝的野牛：强壮、警惕、活在自己的领地。
              名字由外向内收一层，产品线也收一层。
            </Lead>
            <figure className="mt-10 max-w-[18rem]">
              <UrusPortrait className="w-full rounded-sm ring-1 ring-[var(--lt-rule)]" />
              <figcaption className="mt-3 font-mono text-[11px] leading-relaxed text-[var(--color-text-muted)]">
                商标形象 · Urus（原牛）
              </figcaption>
            </figure>
          </div>

          <ol className="border-t border-[var(--lt-rule)]">
            {LAYERS.map((layer, i) => (
              <li
                key={layer.code}
                className="home-layer-row border-b border-[var(--lt-rule)] py-8"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                  <LayerWord code={layer.code} />
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
                    {layer.title}
                  </span>
                </div>
                <p className="mt-3 max-w-[40rem] text-[15px] leading-[1.8] text-[var(--color-text-secondary)]">
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
        </div>
      </Section>

      {/* ── Evidence (honesty signal, one job) ── */}
      <Section id="evidence" width="wide" labelledBy="evidence-title">
        <div className="max-w-[44rem]">
          <SectionTitle id="evidence-title" eyebrow="一行证据">
            野牛先确认风向，再迈步。
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
          观测层见 <QuietLink href="/witness">见证</QuietLink>
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
            <span>不做机房与算力转售。我们主张系统留在客户自有的环境里。</span>
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
            <span>不承诺我们证明不了的数字。</span>
          </li>
        </ul>
      </Section>

      {/* ── Invite ── */}
      <Section labelledBy="invite-title">
        <p
          id="invite-title"
          className="font-display text-xl leading-[1.5] text-[var(--lt-ink)] md:text-2xl"
        >
          想先看看我们怎么做，读 <QuietLink href="/approach">方法</QuietLink>
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
