import type { Metadata } from "next";
import Link from "next/link";
import { Disclosure, Eyebrow, Lead, Section } from "@/components/site";
import { siteProfile } from "@/lib/site-profile";

// 关于页：身份 → 信条 → 联系方式。信条两边相同。
// 不写客户名、金额、团队规模、产品数量、模型数量。全部服务端渲染，无 JS 动效。

export async function generateMetadata(): Promise<Metadata> {
  const site = siteProfile();
  return {
    title: "关于",
    description: site.aboutDescription,
  };
}

const linkClass =
  "text-[var(--lt-ink)] underline decoration-[var(--color-text-muted)] underline-offset-4 hover:decoration-[var(--lt-ink)]";

function Point({ children }: { children: React.ReactNode }) {
  return <span className="text-[1.0625rem]">{children}</span>;
}

export default function AboutPage() {
  const site = siteProfile();
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
              {site.aboutH1}
            </h1>
            <Lead className="mt-7">{site.aboutLead}</Lead>
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
      <Section id="contact" labelledBy="contact-title">
        <p
          id="contact-title"
          className="font-display text-xl leading-[1.5] text-[var(--lt-ink)] md:text-2xl"
        >
          写信到{" "}
          <a href={`mailto:${site.contactEmail}`} className={linkClass}>
            {site.contactEmail}
          </a>
          。
        </p>
      </Section>
    </>
  );
}
