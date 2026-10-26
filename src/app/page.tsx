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
import { updates } from "@/app/blog/updates-data";

// 首页叙事：先让买方知道买的是什么，再展开做法。
// 受托运维（可恢复 + 月报）→ 一行证据 → 方法 → 观测/执行/回放 → 交付所用构件 → 近况 → 边界 → 邀请。
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
    line: "记得住，也查得清：保留原文、可按时点追问；CLI / REST / MCP。",
    maturity: "早期试点",
  },
  {
    name: "Lurus Hub",
    href: "/hub",
    line: "私有部署的多租户 LLM 网关，基于开源 New API（AGPLv3）。",
    maturity: "内部生产使用",
  },
  {
    name: "Lugo · 账号与计费",
    href: "/lugo",
    line: "每客户独立安装的登录、钱包与收款：多渠道一本账，退款与对账留痕。",
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
      {/* 首屏：买方能买到的结果 */}
      <section aria-labelledby="home-title" className="px-6">
        <div className="mx-auto max-w-5xl pb-20 pt-24 md:pb-28 md:pt-36">
          <div className="max-w-[44rem]">
            <Eyebrow>企业 AI · 受托运维</Eyebrow>
            <h1
              id="home-title"
              className="mt-5 font-display text-[2.125rem] font-semibold leading-[1.2] tracking-[-0.025em] text-[var(--lt-ink)] md:text-[3.125rem] md:leading-[1.15]"
            >
              在你自己的环境里，按月受托运维。
            </h1>
            <Lead className="mt-7">
              系统可恢复，月报里每个数字都写明测量方式。你的服务器上如果已经跑着 Dify、n8n 这类开源 AI，我们接手的就是把它稳住。
            </Lead>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/approach" className="btn-primary">
                阅读方法
              </Link>
              <a href={CONTACT} className="btn-secondary">
                写信给 contact@lurus.cn
              </a>
            </div>
            <p className="mt-8 max-w-[64ch] text-base leading-[1.8] text-[var(--color-text-secondary)]">
              环境留在你那里：先硬化到可以验收，再按月巡检和变更。备份要真的恢复一次才算数。我们不做机房与算力转售。
            </p>
            <p className="mt-6">
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
        <p className="mt-6 max-w-[64ch] text-base leading-[1.8] text-[var(--color-text-secondary)]">
          月报里的一条状态，就按这个格式写：从哪来、有多新、是实证还是推断。硬化、受托运维和这份报告怎么衔接，写在{" "}
          <QuietLink href="/approach">方法</QuietLink>
          。
        </p>
      </Section>

      {/* 受托运维里的三件事 */}
      <Section id="how" labelledBy="how-title">
        <SectionTitle id="how-title" eyebrow="运维时的三件事">
          看清状态，执行留痕，用恢复证明备份。
        </SectionTitle>
        <Lead className="mt-6">
          这三件事撑住受托运维：状态说得清来历，改动可以回放，备份用一次真恢复来证明。
        </Lead>
        <div className="mt-10">
          <Disclosure summary={<span className="text-[1.0625rem]">观测：月报里的「正常」，要说清凭什么。</span>}>
            <p>
              在你的环境里放只读采集器（目前在自有环境试点），另从一台不在被测机器上的主机做外部探测。
              采样缺了就记为「未采样」，不默认算作正常。
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
          <Disclosure summary={<span className="text-[1.0625rem]">回放：每月真恢复一次，再写进报告。</span>}>
            <p>
              备份文件在，只说明有备份。判据只有一个：真的恢复一次，再逐表核对行数。
              每月做一次，并出一份月度报告，报告里每个数字附测量方式。
            </p>
            <p className="mt-2">
              <QuietLink href="/approach">方法 →</QuietLink>
            </p>
          </Disclosure>
        </div>
      </Section>

      {/* 构件：交付手段，不是价目 */}
      <Section id="components" width="wide" labelledBy="components-title">
        <div className="max-w-[44rem]">
          <SectionTitle id="components-title" eyebrow="交付时用到">
            这些构件分担观测、执行留痕和月报。
          </SectionTitle>
          <Lead className="mt-6">
            成熟度各自标明。它们一起支撑客户自有环境里的受托运维。
          </Lead>
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
        <p className="mt-6 text-[15px] leading-relaxed text-[var(--color-text-secondary)]">
          另有桌面客户端{" "}
          <QuietLink href="/switch">Switch</QuietLink>
          ：在一处管理多个 AI 编程 CLI。
        </p>
      </Section>

      {/* 近况：更新日志真源的前三条，不另写一份，也不写成客户案例 */}
      <Section id="recent" width="wide" labelledBy="recent-title">
        <div className="max-w-[44rem]">
          <SectionTitle id="recent-title" eyebrow="近况">
            更新日志里，最近三条。
          </SectionTitle>
          <Lead className="mt-6">
            受托运维看重可恢复、执行留痕，以及报告里写清的测量方式。下面按时间取公开日志的前三条。
          </Lead>
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

      {/* 边界 */}
      <Section id="boundaries" labelledBy="boundaries-title">
        <SectionTitle id="boundaries-title" eyebrow="边界">
          我们不做的事。
        </SectionTitle>
        <ul className="mt-8 space-y-4 text-base leading-[1.8] text-[var(--color-text-secondary)]">
          <li className="flex gap-3">
            <span aria-hidden="true" className="text-[var(--color-text-muted)]">—</span>
            <span>不做机房与算力转售。系统留在你自有的环境里。</span>
          </li>
          <li className="flex gap-3">
            <span aria-hidden="true" className="text-[var(--color-text-muted)]">—</span>
            <span>不在你的环境里跑没有审批的写操作；事先批准的定时任务（如备份）除外。</span>
          </li>
          <li className="flex gap-3">
            <span aria-hidden="true" className="text-[var(--color-text-muted)]">—</span>
            <span>不从零做一套新的应用。接手的是已经在你环境里跑着的系统。</span>
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
          想看硬化、受托运维和月报怎么衔接，读{" "}
          <QuietLink href="/approach">方法</QuietLink>
          ；想让我们看你的环境，写信到{" "}
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
