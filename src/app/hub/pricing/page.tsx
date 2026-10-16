import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow, Lead, Section } from "@/components/site";
import { HubPriceTable, HubPriceTableSkeleton } from "./price-table";

// Hub 按量价格页：标题 → 价目表（实时读取）→ 怎么付 → 鹿途 → 边界。
// 价格不写死在本站：价目表读 hub.lurus.cn/api/v1/models（lurus-newhub
// internal/adapter/handler/public_models.go），其人民币列就是钱包扣费所用单价。
// 充值入口与统一钱包：lurus-platform web/src/pages/Topup、/topup?amount=&return_to= 约定。

export const metadata: Metadata = {
  title: "Hub 按量价格",
  description:
    "hub.lurus.cn 的模型调用按量计费：先往钱包充值，用多少扣多少。价目表实时读取自 Hub 的公开价格接口，与实际扣费同源。",
};

const TOPUP_URL = "https://identity.lurus.cn/topup";
const CONTACT = "mailto:contact@lurus.cn";

const linkClass =
  "text-[var(--lt-ink)] underline decoration-[var(--lt-rule)] underline-offset-4 hover:decoration-[var(--lt-accent)]";

export const revalidate = 300;

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

export default function HubPricingPage() {
  return (
    <>
      <section aria-labelledby="pricing-title" className="px-6">
        <div className="mx-auto max-w-5xl pb-16 pt-24 md:pt-32">
          <div className="max-w-[44rem]">
            <Eyebrow>价格</Eyebrow>
            <h1
              id="pricing-title"
              className="mt-5 font-display text-[2.125rem] font-semibold leading-[1.2] tracking-[-0.025em] text-[var(--lt-ink)] md:text-[2.75rem] md:leading-[1.15]"
            >
              按量计费，用多少扣多少。
            </h1>
            <Lead className="mt-7">
              我们自己运营的 hub.lurus.cn 按调用量收费：先往钱包充值，每次调用按下表单价从余额里扣。
              下面的数字不是抄进网页的，而是打开页面时从 Hub 的公开价格接口读来的，和实际扣费用的是同一套单价。
            </Lead>
          </div>
        </div>
      </section>

      <Section id="prices" width="wide" labelledBy="prices-title">
        <div className="max-w-[44rem]">
          <SectionTitle id="prices-title" eyebrow="价目表">
            每个模型的单价。
          </SectionTitle>
          <p className="mt-4 text-base leading-[1.8] text-[var(--color-text-secondary)]">
            对话类模型按 token 计价，输入与输出分开算；图像等按次计价的模型看最后一列。
            表中是匿名访客可用的默认分组价格，账号所在分组不同时单价可能不同，以控制台里显示的为准。
          </p>
        </div>
        <Suspense fallback={<HubPriceTableSkeleton />}>
          <HubPriceTable />
        </Suspense>
      </Section>

      <Section id="pay" labelledBy="pay-title">
        <SectionTitle id="pay-title" eyebrow="怎么付">
          一个账号，一个钱包。
        </SectionTitle>
        <ul className="mt-8 space-y-4 text-base leading-[1.8] text-[var(--color-text-secondary)]">
          <Dash>
            用 Lurus 账号登录后在{" "}
            <a href={TOPUP_URL} className={linkClass}>
              钱包充值
            </a>
            ，余额以人民币计。
          </Dash>
          <Dash>调用时按上表单价从钱包扣费；余额不足时请求会被拒绝，不会先欠费再催缴。</Dash>
        </ul>
      </Section>

      <Section id="lutu" labelledBy="lutu-title">
        <SectionTitle id="lutu-title" eyebrow="鹿途">
          鹿途不另收会员费。
        </SectionTitle>
        <Lead className="mt-6">
          鹿途目前没有会员套餐。鹿途里的 AI 调用经 Hub 计费，单价与上表相同，从同一个钱包扣。
        </Lead>
      </Section>

      <Section id="boundaries" labelledBy="boundaries-title">
        <SectionTitle id="boundaries-title" eyebrow="边界">
          这页不承诺什么。
        </SectionTitle>
        <ul className="mt-8 space-y-4 text-base leading-[1.8] text-[var(--color-text-secondary)]">
          <Dash>单价会随上游调整；以调用发生时的单价为准，本页最多晚 5 分钟反映改价。</Dash>
          <Dash>价目表读不到时，本页宁可空着，也不显示一份可能过期的旧价格。</Dash>
          <Dash>不对延迟、可用率给出承诺数字。</Dash>
          <Dash>
            想把 Hub 装进你自己的环境、用自己的上游与价格，见{" "}
            <Link href="/hub" className={linkClass}>
              Hub 产品页
            </Link>
            ，或写信到{" "}
            <a href={CONTACT} className={linkClass}>
              contact@lurus.cn
            </a>
            。
          </Dash>
        </ul>
      </Section>
    </>
  );
}
