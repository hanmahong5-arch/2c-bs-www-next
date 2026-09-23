import type { Metadata } from "next";
import Link from "next/link";
import {
  Disclosure,
  Eyebrow,
  EvidenceLine,
  EvidenceList,
  Lead,
  Section,
} from "@/components/site";

// 方法页：把企业 AI 交付工程的做法讲给潜在客户。
// 不写客户名、行业名单、金额、案例数量。每个区块一句主张，细节放进 Disclosure。
// 全部服务端渲染，无 JS 动效。

export const metadata: Metadata = {
  title: "方法",
  description:
    "我们怎样接手客户自有环境里已经做出来、但还没稳住的 AI 系统：硬化、受托运维、按月交付证据。",
};

const CONTACT_EMAIL = "contact@lurus.cn";

function SectionTitle({
  id,
  eyebrow,
  children,
}: {
  id: string;
  eyebrow: string;
  children: React.ReactNode;
}) {
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

function Point({ children }: { children: React.ReactNode }) {
  return <span className="text-[1.0625rem]">{children}</span>;
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

export default function ApproachPage() {
  return (
    <>
      {/* 首屏 */}
      <section aria-labelledby="approach-title" className="px-6">
        <div className="mx-auto max-w-5xl pb-20 pt-24 md:pb-24 md:pt-32">
          <div className="max-w-[44rem]">
            <Eyebrow>方法</Eyebrow>
            <h1
              id="approach-title"
              className="mt-5 font-display text-[2.125rem] font-semibold leading-[1.2] tracking-[-0.025em] text-[var(--lt-ink)] md:text-[2.75rem] md:leading-[1.15]"
            >
              把已经做出来的 AI 系统，在你自己的环境里跑稳。
            </h1>
            <Lead className="mt-7">
              这一页写我们接什么样的活、分几步做、认哪些判据、怎样计价，以及不做什么。
            </Lead>
          </div>
        </div>
      </section>

      {/* 1. 接什么样的活 */}
      <Section id="scope" labelledBy="scope-title">
        <SectionTitle id="scope-title" eyebrow="接什么样的活">
          已经做出来、但还没稳住的 AI 系统。
        </SectionTitle>
        <div className="mt-10">
          <Disclosure summary={<Point>我们称它为「半成品」，这不是贬义。</Point>}>
            <p>
              功能能演示，但备份没恢复过、状态说不清、改动没人记录——这是多数
              AI 系统上线前后的真实样子。我们接手的是这一段：从「能跑」到「能被验收」。
            </p>
          </Disclosure>
          <Disclosure summary={<Point>系统留在你自己的环境里。</Point>}>
            <p>
              服务器、数据库和数据都归你。我们在你的环境里工作，不把系统搬到我们这里，
              也不提供机房或算力。
            </p>
          </Disclosure>
        </div>
      </Section>

      {/* 2. 三个阶段 */}
      <Section id="stages" labelledBy="stages-title">
        <SectionTitle id="stages-title" eyebrow="三个阶段">
          硬化，受托运维，按月交付证据。
        </SectionTitle>
        <div className="mt-10">
          <Disclosure summary={<Point>一 · 硬化：让它能被验收。</Point>}>
            <p>
              补上备份与恢复、外部可用性采样、证书与密钥的管理，把「能跑」变成一份
              可以逐项核对的验收清单。这一步通常是一次性的，具体以合同约定为准。
            </p>
          </Disclosure>
          <Disclosure summary={<Point>二 · 受托运维：客户自有环境，不含机房与算力转售。</Point>}>
            <p>
              硬化之后，我们按月对系统负责：巡检、处理告警、做变更。
              所有操作发生在你的环境里，范围以合同约定为准。
            </p>
          </Disclosure>
          <Disclosure summary={<Point>三 · 按月交付证据：见证报告。</Point>}>
            <p>
              每月一份报告，每个数字都附上它是怎么测出来的；恢复演练的结果、
              没采到样本的时段，也一并写进去。
            </p>
            <p className="mt-2">
              <Link
                href="/witness"
                className="text-[var(--lt-ink)] underline decoration-[var(--lt-rule)] underline-offset-4 hover:decoration-[var(--lt-accent)]"
              >
                见证 →
              </Link>
            </p>
          </Disclosure>
        </div>
      </Section>

      {/* 3. 判据 */}
      <Section id="criteria" width="wide" labelledBy="criteria-title">
        <div className="max-w-[44rem]">
          <SectionTitle id="criteria-title" eyebrow="我们认的判据">
            说「没问题」之前，先说凭什么。
          </SectionTitle>
        </div>
        <EvidenceList
          className="mt-10"
          caption="示例 · 恢复演练与外部采样各一行"
        >
          <EvidenceLine
            name="每月恢复演练"
            status="ok"
            label="通过"
            source="恢复进一次性实例 · 逐表行数与备份文件一致"
            age="本月"
          />
          <EvidenceLine
            name="外部可用性采样"
            status="unknown"
            label="未采样"
            source="该时段没有样本 —— 不计为可用"
          />
        </EvidenceList>
        <div className="mt-10 max-w-[44rem]">
          <Disclosure summary={<Point>备份只认真恢复。</Point>}>
            <p>
              备份文件存在、列表能读出来，都不算。判据只有一个：真的恢复一次，
              再逐表核对行数。
            </p>
          </Disclosure>
          <Disclosure summary={<Point>每条状态标明证据强度。</Point>}>
            <p>
              服务自己报告的、从外部探测推断的、已经过期的，写法不一样。
              仅凭可达性得出的「正常」，会标成推断。
            </p>
          </Disclosure>
          <Disclosure summary={<Point>未采样不算正常。</Point>}>
            <p>
              可用率分本机与外部两路并列；外部一路缺样本的时段记为「未采样」，不计为成功。
            </p>
          </Disclosure>
          <Disclosure summary={<Point>写操作先审批、可撤销——这一条正在建设。</Point>}>
            <p>
              目标是：在你的环境里，每一次写操作都先经审批，执行留痕，并且有撤销路径。
              这套机制还没有覆盖到全部交付，当前覆盖范围具体以合同约定为准。
            </p>
          </Disclosure>
        </div>
      </Section>

      {/* 4. 可接管 */}
      <Section id="handover" labelledBy="handover-title">
        <SectionTitle id="handover-title" eyebrow="可接管">
          哪天不用我们，你也接得住。
        </SectionTitle>
        <div className="mt-10">
          <Disclosure summary={<Point>这是我们的原则，也是交付时的承诺方向。</Point>}>
            <p>
              运行手册、凭证移交流程、历史证据，随系统一并交给你，具体以合同约定为准。
              我们不把系统做成只有我们能维护的样子。
            </p>
            <p className="mt-2">
              这些材料的格式还在随交付逐步成形，还不是一套标准化产品。
            </p>
          </Disclosure>
        </div>
      </Section>

      {/* 5. 计价 */}
      <Section id="pricing" labelledBy="pricing-title">
        <SectionTitle id="pricing-title" eyebrow="计价方式">
          一次性硬化，加按环境的月度受托运维。
        </SectionTitle>
        <div className="mt-10">
          <Disclosure summary={<Point>不公开价目，按范围报价。</Point>}>
            <p>
              每个系统的规模、环境和验收要求都不一样。我们先看你的环境，
              再按硬化的工作量和需要运维的环境数量报价，具体以合同约定为准。
            </p>
          </Disclosure>
        </div>
      </Section>

      {/* 6. 不做什么 */}
      <Section id="boundaries" labelledBy="boundaries-title">
        <SectionTitle id="boundaries-title" eyebrow="边界">
          我们不做的事。
        </SectionTitle>
        <ul className="mt-8 space-y-4 text-base leading-[1.8] text-[var(--color-text-secondary)]">
          <Dash>不做机房与算力转售。我们主张系统留在你自有的环境里。</Dash>
          <Dash>不在你的环境里跑没有审批的写操作；事先批准的定时任务（如备份）除外。</Dash>
          <Dash>不承诺我们证明不了的数字。</Dash>
        </ul>
      </Section>

      {/* 结尾 */}
      <Section labelledBy="contact-title">
        <p
          id="contact-title"
          className="font-display text-xl leading-[1.5] text-[var(--lt-ink)] md:text-2xl"
        >
          想聊聊你的环境，写信到{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-[var(--lt-ink)] underline decoration-[var(--lt-rule)] underline-offset-4 hover:decoration-[var(--lt-accent)]"
          >
            {CONTACT_EMAIL}
          </a>
          。
        </p>
      </Section>
    </>
  );
}
