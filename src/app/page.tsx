import Link from "next/link";
import {
  Disclosure,
  Eyebrow,
  EvidenceLine,
  EvidenceList,
  Lead,
  MaturityChip,
  Section,
  type Maturity,
} from "@/components/site";

// 首页叙事：渐进带入，不是转化漏斗。
// 一句话定位 → 一行证据（证据强度分级）→ 我们怎么工作（观测/执行/回放）→ 构件索引 → 边界 → 一句邀请。
// 全部服务端渲染，无 JS 动效；首屏内容不依赖水合即可见。

const CONTACT = "mailto:contact@lurus.cn";

const components: ReadonlyArray<{
  name: string;
  href: string;
  line: string;
  maturity: Maturity;
}> = [
  {
    name: "Lurus Witness · 见证",
    href: "/witness",
    line: "只读采集、外部探测、每月真实恢复演练与月度证据报告。",
    maturity: "早期试点",
  },
  {
    name: "Kova",
    href: "/kova",
    line: "嵌入式持久执行引擎：WAL 崩溃恢复、执行留痕、可回放。",
    maturity: "早期试点",
  },
  {
    name: "Memorus",
    href: "/memorus",
    line: "AI 记忆引擎：抽取、去重、衰减、混合检索；CLI / REST / MCP。",
    maturity: "早期试点",
  },
  {
    name: "Lurus Hub",
    href: "/hub",
    line: "私有部署的多租户 LLM 网关，基于开源 New API（AGPLv3）。",
    maturity: "内部生产使用",
  },
];

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

export default function Home() {
  return (
    <>
      {/* 首屏：一句话定位 */}
      <section aria-labelledby="home-title" className="px-6">
        <div className="mx-auto max-w-5xl pb-20 pt-24 md:pb-28 md:pt-36">
          <div className="max-w-[44rem]">
            <Eyebrow>企业 AI 交付工程</Eyebrow>
            <h1
              id="home-title"
              className="mt-5 font-display text-[2.125rem] font-semibold leading-[1.2] tracking-[-0.025em] text-[var(--lt-ink)] md:text-[3.125rem] md:leading-[1.15]"
            >
              让客户自有环境里的 AI 系统，状态可核查、数据可恢复、改动有记录。
            </h1>
            <Lead className="mt-7">
              我们把 AI 系统在客户自己的环境里跑稳，并用证据说明它是稳的。
            </Lead>
            <p className="mt-10">
              <a
                href="#evidence"
                className="font-mono text-[13px] text-[var(--color-text-secondary)] underline decoration-[var(--lt-rule)] underline-offset-4 hover:text-[var(--lt-ink)] hover:decoration-[var(--lt-accent)]"
              >
                看一行证据 ↓
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* 一行证据：三种证据强度 */}
      <Section id="evidence" width="wide" labelledBy="evidence-title">
        <div className="max-w-[44rem]">
          <SectionTitle id="evidence-title" eyebrow="一行证据">
            每一条状态，都写明它从哪里来、有多新。
          </SectionTitle>
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
        <Lead className="mt-10">
          别家的仪表盘常常全绿。我们会告诉你，哪一条只是推断。
        </Lead>
      </Section>

      {/* 我们怎么工作 */}
      <Section id="how" labelledBy="how-title">
        <SectionTitle id="how-title" eyebrow="我们怎么工作">
          观测，执行，回放。
        </SectionTitle>
        <div className="mt-10">
          <Disclosure summary={<span className="text-[1.0625rem]">观测：先看清，再下判断。</span>}>
            <p>
              在客户环境里放只读采集器（目前在自有环境试点），另从一台不在被测机器上的主机做外部探测。
              采样缺了就记为「未采样」，不默认算作正常。
            </p>
            <p className="mt-2">
              <QuietLink href="/witness">见证 →</QuietLink>
            </p>
          </Disclosure>
          <Disclosure summary={<span className="text-[1.0625rem]">执行：每一步改动都留痕。</span>}>
            <p>
              目标是：需要在客户环境里动手时，先审批，再执行；执行过程逐步写入日志，
              进程崩溃后从日志恢复，事后可以逐步回放。计划由 Kova{" "}
              <MaturityChip level="早期试点" /> 承担；今天这些动作仍由独立脚本完成。
            </p>
            <p className="mt-2">
              <QuietLink href="/kova">Kova →</QuietLink>
            </p>
          </Disclosure>
          <Disclosure summary={<span className="text-[1.0625rem]">回放与报告：用恢复证明备份。</span>}>
            <p>
              备份是否可用，只有一个判据：真的恢复一次，再逐表核对行数。
              每月做一次，并出一份月度证据报告，报告里每个数字附测量方式。
            </p>
            <p className="mt-2">
              <QuietLink href="/approach">方法 →</QuietLink>
            </p>
          </Disclosure>
        </div>
      </Section>

      {/* 构件 */}
      <Section id="components" width="wide" labelledBy="components-title">
        <div className="max-w-[44rem]">
          <SectionTitle id="components-title" eyebrow="构件">
            四个构件，成熟度各自标明。
          </SectionTitle>
        </div>
        <ul className="mt-10 border-t border-[var(--lt-rule)]">
          {components.map((c) => (
            <li key={c.href} className="border-b border-[var(--lt-rule)]">
              <Link
                href={c.href}
                className="group grid gap-x-8 gap-y-1 py-5 md:grid-cols-[14rem_1fr_auto] md:items-baseline"
              >
                <span className="font-medium text-[var(--lt-ink)] group-hover:underline group-hover:decoration-[var(--lt-accent)] group-hover:underline-offset-4">
                  {c.name}
                </span>
                <span className="text-[15px] leading-relaxed text-[var(--color-text-secondary)]">
                  {c.line}
                </span>
                <span className="mt-1 md:mt-0">
                  <MaturityChip level={c.maturity} />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* 边界 */}
      <Section id="boundaries" labelledBy="boundaries-title">
        <SectionTitle id="boundaries-title" eyebrow="边界">
          我们不做的事。
        </SectionTitle>
        <ul className="mt-8 space-y-4 text-base leading-[1.8] text-[var(--color-text-secondary)]">
          <li className="flex gap-3">
            <span aria-hidden="true" className="text-[var(--color-text-muted)]">—</span>
            <span>不做机房与算力转售。我们主张系统留在客户自有的环境里。</span>
          </li>
          <li className="flex gap-3">
            <span aria-hidden="true" className="text-[var(--color-text-muted)]">—</span>
            <span>不在客户环境里跑无人审批的写操作；事先批准的定时任务（如备份）除外。</span>
          </li>
          <li className="flex gap-3">
            <span aria-hidden="true" className="text-[var(--color-text-muted)]">—</span>
            <span>不承诺我们证明不了的数字。</span>
          </li>
        </ul>
      </Section>

      {/* 结尾一句邀请 */}
      <Section labelledBy="invite-title">
        <p
          id="invite-title"
          className="font-display text-xl leading-[1.5] text-[var(--lt-ink)] md:text-2xl"
        >
          想先看看我们怎么做，读{" "}
          <QuietLink href="/approach">方法</QuietLink>
          ；想聊聊你的环境，写信到{" "}
          <a
            href={CONTACT}
            className="text-[var(--lt-ink)] underline decoration-[var(--lt-rule)] underline-offset-4 hover:decoration-[var(--lt-accent)]"
          >
            contact@lurus.cn
          </a>
          。
        </p>
      </Section>
    </>
  );
}
