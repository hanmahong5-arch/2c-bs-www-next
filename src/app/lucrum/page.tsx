import type { Metadata } from "next";
import { Eyebrow, Lead, Section } from "@/components/site";

// Lucrum 不在主导航。这里只做极简说明与外链，不写收益、准确率、延迟等断言。

export const metadata: Metadata = {
  title: "Lucrum",
  description: "Lucrum：A 股策略描述与回测工具，仅支持模拟盘。当前不在主动开发中。",
};

const LUCRUM_URL = "https://lucrum.lurus.cn";

export default function LucrumPage() {
  return (
    <>
      <section aria-labelledby="lucrum-title" className="px-6">
        <div className="mx-auto max-w-5xl pb-16 pt-24 md:pt-32">
          <div className="max-w-[44rem]">
            <Eyebrow>Lucrum</Eyebrow>
            <h1
              id="lucrum-title"
              className="mt-5 font-display text-[2.125rem] font-semibold leading-[1.2] tracking-[-0.025em] text-[var(--lt-ink)] md:text-[2.75rem] md:leading-[1.15]"
            >
              Lucrum
            </h1>
            <Lead className="mt-7">
              一个面向 A 股的策略描述与回测工具。当前不在主动开发中，只做修复与运维。
            </Lead>
          </div>
        </div>
      </section>

      <Section labelledBy="lucrum-scope-title">
        <h2 id="lucrum-scope-title" className="sr-only">
          范围与入口
        </h2>
        <ul className="space-y-4 text-base leading-[1.8] text-[var(--color-text-secondary)]">
          <li>交易只支持模拟盘，没有接入真实券商账户。</li>
          <li>页面上的回测结果是历史数据上的计算，不代表未来收益。</li>
        </ul>
        <p className="mt-8 text-base leading-[1.8]">
          <a
            href={LUCRUM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--lt-ink)] underline decoration-[var(--lt-rule)] underline-offset-4 hover:decoration-[var(--lt-accent)]"
          >
            lucrum.lurus.cn ↗
          </a>
        </p>
      </Section>
    </>
  );
}
