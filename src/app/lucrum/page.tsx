import type { Metadata } from "next";
import { AccessStation, Eyebrow, Lead, MaturityChip, Section } from "@/components/site";

// Lucrum 不在主导航。这里只做极简说明与外链，不写收益、准确率、延迟等断言。
// 产品冻结：只修运维，不主动扩功能。

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
            <Eyebrow>产品 · 冻结维护</Eyebrow>
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
              <h1
                id="lucrum-title"
                className="font-display text-[2.125rem] font-semibold leading-[1.2] tracking-[-0.025em] text-[var(--lt-ink)] md:text-[2.75rem] md:leading-[1.15]"
              >
                Lucrum
              </h1>
              <MaturityChip level="内部生产使用" />
            </div>
            <Lead className="mt-7">
              一个面向 A 股的策略描述与回测工具。当前不在主动开发中，只做修复与运维。
            </Lead>
            <AccessStation
              className="mt-8"
              actions={[
                {
                  label: "打开 Lucrum",
                  href: LUCRUM_URL,
                  primary: true,
                  external: true,
                },
                { label: "写信询问", href: "mailto:contact@lurus.cn", external: true },
              ]}
              nextStep="仅模拟盘；结果是历史计算，不代表未来收益。现网首页写着免费注册，并另有价目；本页不转述那些额度与行情数字。报障写信说明用途。"
            />
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
          <li>现网首页写着免费注册，并另有价目。本页不转述那些额度与行情数字。</li>
          <li>产品线冻结：不承诺新功能时间表。</li>
        </ul>
      </Section>
    </>
  );
}
