import type { Metadata } from "next";
import Link from "next/link";
import {
  Disclosure,
  Eyebrow,
  EvidenceLine,
  EvidenceList,
  IntakeBrief,
  Lead,
  LedgerRow,
  NextStep,
  RestoreReceipt,
  ScopeSplit,
  Section,
} from "@/components/site";
import { DELIVERY_EXCLUDED, DELIVERY_INCLUDED, DELIVERY_NOTE } from "@/lib/engagement-delivery";
import { CONTACT_EMAIL, intakeMailto } from "@/lib/engagement-intake";
import { RESTORE_RECEIPT_INTRO } from "@/lib/restore-receipt";

// 方法页：怎么证明系统稳（个人项目站）。
// 不写客户名、行业名单、金额、案例数量。每个区块一句主张，细节放进 Disclosure。
// 可核对一节只列已经发布的入口，不重述数字。
// 全部服务端渲染，无 JS 动效。

export const metadata: Metadata = {
  title: "方法",
  description:
    "怎么把已经做出来的 AI 系统在你自己的环境里跑稳：硬化、持续负责、按月交付证据。",
};

// 买方可核对。右列种类只写这四个词。
// 页内锚点已在源码核对：/hub/pricing 的 Section id="prices"，/witness 的 Section id="report"。
// /hub/pricing.md 不在 SITE_ROUTES（accept 按纯文本另查），route handler 在
// src/app/hub/pricing.md/route.ts，本波点名，用普通链接打开，不走页面预取。
// 表内已有 /witness#report，不再重复。表下两行 LedgerRow 只补尚未出现的
// /llms.txt 与 /approach#receipt。
// 不链 /security（仓库里没有这个路由），不编 GitHub 地址。
const PROOF: readonly {
  href: string;
  title: string;
  kind: "基准" | "价目" | "日志" | "产品";
  plain?: boolean;
}[] = [
  { href: "/memorus/benchmarks", title: "Memorus 公开基准报告", kind: "基准" },
  { href: "/hub/pricing#prices", title: "Hub 按量价格", kind: "价目" },
  { href: "/hub/pricing.md", title: "Hub 价目纯文本", kind: "价目", plain: true },
  { href: "/blog", title: "更新日志", kind: "日志" },
  { href: "/witness#report", title: "见证", kind: "产品" },
  { href: "/kova", title: "Kova", kind: "产品" },
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
      <span className="text-[15px] leading-[1.6] text-[var(--lt-ink)] underline decoration-[var(--color-text-muted)] underline-offset-4 group-hover:decoration-[var(--lt-ink)]">
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
              怎么证明：已经做出来的 AI 系统，在你自己的环境里跑稳。
            </h1>
            <Lead className="mt-7">
              这一页写接什么样的活、分几步做、认哪些判据、个人项目合作怎么计价，以及不做什么。
            </Lead>
            <p className="mt-6 text-[13px] leading-[1.7]">
              <a
                href="/approach.md"
                className="text-[var(--color-text-muted)] underline decoration-[var(--color-text-muted)] underline-offset-4 hover:text-[var(--lt-ink)] hover:decoration-[var(--lt-ink)]"
              >
                同一份说明的纯文本
              </a>
            </p>
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
                className="text-[var(--lt-ink)] underline decoration-[var(--color-text-muted)] underline-offset-4 hover:decoration-[var(--lt-ink)]"
              >
                见证 →
              </Link>
            </p>
          </Disclosure>
        </div>
      </Section>

      {/* 交付分界：阶段之后、判据之前。复用 ScopeSplit，不另做皮。 */}
      <Section id="delivery" width="wide" labelledBy="delivery-title">
        <div className="max-w-[44rem]">
          <SectionTitle id="delivery-title" eyebrow="范围">
            硬化与受托运维，各包含什么。
          </SectionTitle>
          <Lead className="mt-6">
            每个环境不同，具体以合同约定为准。这里只写我们通常怎么分界，不是价目，也不是 SLA。
          </Lead>
        </div>
        <ScopeSplit className="mt-10" included={DELIVERY_INCLUDED} excluded={DELIVERY_EXCLUDED} />
        <p className="mt-8 max-w-[64ch] text-[13px] leading-[1.7] text-[var(--color-text-muted)]">
          {DELIVERY_NOTE}
        </p>
        <p className="mt-3 text-[13px] leading-[1.7]">
          <Link
            href="/witness#report"
            className="text-[var(--color-text-muted)] underline decoration-[var(--color-text-muted)] underline-offset-4 hover:text-[var(--lt-ink)] hover:decoration-[var(--lt-ink)]"
          >
            报告结构见见证页
          </Link>
        </p>
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

      {/* 回执：判据之后。留空示例，不填某一次演练。 */}
      <Section id="receipt" width="wide" labelledBy="receipt-title">
        <div className="max-w-[44rem]">
          <SectionTitle id="receipt-title" eyebrow="回执">
            演练之后，写下这一张。
          </SectionTitle>
          <Lead className="mt-6">{RESTORE_RECEIPT_INTRO}</Lead>
        </div>
        <RestoreReceipt className="mt-10" />
        <LedgerRow
          href="/witness#restore"
          label="演练步骤见见证页"
          meta="只认真恢复"
          className="mt-8"
        />
      </Section>

      {/* 可核对：不改上面的主张，只加一张细线索引 */}
      <Section id="proof" labelledBy="proof-title">
        <SectionTitle id="proof-title" eyebrow="可核对">
          公开的材料都在这些页面上。
        </SectionTitle>
        <Lead className="mt-6">这里不重述数字。打开原页自己看。</Lead>
        <ul className="mt-8 border-t border-[var(--lt-rule)]">
          {PROOF.map((row) => (
            <li key={row.href} className="border-b border-[var(--lt-rule)]">
              <ProofLink {...row} />
            </li>
          ))}
        </ul>
        <LedgerRow
          href="/llms.txt"
          label="索引 /llms.txt"
          meta="六条已有入口"
          className="mt-8"
        />
        <LedgerRow
          href="/approach#receipt"
          label="演练回执"
          meta="字段留空，不写可用率"
          className="-mt-px"
        />
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
          一次性硬化，加按环境的月度负责。
        </SectionTitle>
        <div className="mt-10">
          <Disclosure summary={<Point>不公开价目；个人项目合作按范围报价。</Point>}>
            <p>
              这不是公司标书价目。每个系统的规模、环境和验收要求都不一样。先看环境，
              再按硬化工作量和需要持续负责的环境数量报价，具体以书面约定为准。
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

      {/* 首信：联系收束之前，先把第一封邮件的范围写清 */}
      <Section id="intake" width="wide" labelledBy="intake-title">
        <div className="max-w-[44rem]">
          <SectionTitle id="intake-title" eyebrow="首信">
            来信请先写清这些。
          </SectionTitle>
          <Lead className="mt-6">
            每个环境不一样，我们不在这页报价，也不收集密码。下面是要在你第一封邮件里说清的范围。具体以合同约定为准。
          </Lead>
        </div>
        <IntakeBrief className="mt-10" />
        <LedgerRow
          href={intakeMailto()}
          label="写第一封邮件"
          meta="不报价，不收集密码"
          className="mt-8"
        />
        <NextStep>
          按上面的清单写清环境现状与目标，寄到 {CONTACT_EMAIL}；我回复是否适合现阶段，以及硬化与受托运维怎么分期。
        </NextStep>
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
            className="text-[var(--lt-ink)] underline decoration-[var(--color-text-muted)] underline-offset-4 hover:decoration-[var(--lt-ink)]"
          >
            {CONTACT_EMAIL}
          </a>
          。
        </p>
      </Section>
    </>
  );
}
