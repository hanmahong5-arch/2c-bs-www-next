import type { Metadata } from "next";
import Link from "next/link";
import { Disclosure, Eyebrow, Lead, Section } from "@/components/site";

// 关于页：一句话身份 → 我们相信什么 → 联系方式。
// 不写客户名、金额、团队规模、产品数量、模型数量。全部服务端渲染，无 JS 动效。

export const metadata: Metadata = {
  title: "关于",
  description:
    "LurusTech 做企业 AI 交付工程：把客户自有环境里的 AI 系统跑稳，并用证据说明它是稳的。",
};

const CONTACT_EMAIL = "contact@lurus.cn";

const linkClass =
  "text-[var(--lt-ink)] underline decoration-[var(--lt-rule)] underline-offset-4 hover:decoration-[var(--lt-accent)]";

function Point({ children }: { children: React.ReactNode }) {
  return <span className="text-[1.0625rem]">{children}</span>;
}

export default function AboutPage() {
  return (
    <>
      {/* 首屏 */}
      <section aria-labelledby="about-title" className="px-6">
        <div className="mx-auto max-w-5xl pb-20 pt-24 md:pb-24 md:pt-32">
          <div className="max-w-[44rem]">
            <Eyebrow>关于</Eyebrow>
            <h1
              id="about-title"
              className="mt-5 font-display text-[2.125rem] font-semibold leading-[1.2] tracking-[-0.025em] text-[var(--lt-ink)] md:text-[2.75rem] md:leading-[1.15]"
            >
              LurusTech 做企业 AI 交付工程。
            </h1>
            <Lead className="mt-7">
              我们把 AI 系统在客户自己的环境里跑稳，并用证据说明它是稳的：
              状态可核查、数据可恢复、改动有记录。
            </Lead>
          </div>
        </div>
      </section>

      {/* 我们相信什么 */}
      <Section id="beliefs" labelledBy="beliefs-title">
        <Eyebrow>我们相信什么</Eyebrow>
        <h2
          id="beliefs-title"
          className="mt-3 font-display text-[1.625rem] font-semibold leading-[1.25] tracking-[-0.02em] text-[var(--lt-ink)] md:text-[1.875rem]"
        >
          说「没问题」之前，先说凭什么。
        </h2>
        <div className="mt-10">
          <Disclosure summary={<Point>每条状态都标明证据强度。</Point>}>
            <p>
              服务自己报告的、从外部探测推断的、已经过期的，写法不一样。
              不知道的时候，就写「不知道」，而不是「正常」。
            </p>
          </Disclosure>
          <Disclosure summary={<Point>备份只认真恢复。</Point>}>
            <p>
              备份文件存在不算数。判据是真的恢复一次，再逐表核对。
            </p>
          </Disclosure>
          <Disclosure summary={<Point>承认边界。</Point>}>
            <p>
              哪些做到了、哪些还在早期、哪些我们不做，都写出来。
              我们不承诺自己证明不了的数字。
            </p>
          </Disclosure>
        </div>
        <p className="mt-8 text-base leading-[1.8] text-[var(--color-text-secondary)]">
          具体怎么做，见{" "}
          <Link href="/approach" className={linkClass}>
            方法 →
          </Link>
        </p>
      </Section>

      {/* 联系 */}
      <Section labelledBy="contact-title">
        <p
          id="contact-title"
          className="font-display text-xl leading-[1.5] text-[var(--lt-ink)] md:text-2xl"
        >
          写信到{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className={linkClass}>
            {CONTACT_EMAIL}
          </a>
          。
        </p>
      </Section>
    </>
  );
}
