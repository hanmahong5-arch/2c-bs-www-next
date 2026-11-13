import type { Metadata } from "next";
import Link from "next/link";
import { siteProfile } from "@/lib/site-profile";

export async function generateMetadata(): Promise<Metadata> {
  if (siteProfile().id === "company") {
    return {
      title: "隐私",
      description: "受托运维的保密以合同为准。系统留在客户自己的环境里。",
    };
  }
  return {
    title: "隐私政策",
    description: "Lurus 隐私政策 — 我们如何收集、使用和保护你的数据。",
  };
}

export default function PrivacyPage() {
  const site = siteProfile();
  if (site.id === "company") {
    return (
      <div className="mx-auto max-w-3xl px-6 py-20 md:py-28">
        <h1 className="mb-4 font-display text-3xl font-semibold tracking-[-0.02em] text-[var(--lt-ink)] md:text-4xl">
          隐私
        </h1>
        <div className="space-y-6 text-[var(--color-text-secondary)] leading-relaxed">
          <p>
            系统留在客户自己的环境里。月报里的读数在你的环境里测，不把客户系统里的数据搬出来出售。
          </p>
          <p>
            来信里的联系方式和环境说明，只用于回复能不能接，以及合同范围内的工作。留存和保密以签署的合同为准。
          </p>
          <p>
            要问一份具体合同怎么写，写信到{" "}
            <a href={`mailto:${site.contactEmail}`} className="text-[var(--lt-ink)] underline underline-offset-4">
              {site.contactEmail}
            </a>
            。
          </p>
        </div>
        <div className="mt-16 border-t border-[var(--color-border)] pt-8">
          <Link href="/" className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]">
            ← 返回首页
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="mx-auto max-w-3xl px-6 pb-20 pt-24 md:pb-28 md:pt-32">
      <h1 className="font-display text-[2.125rem] font-semibold leading-[1.2] tracking-[-0.025em] text-[var(--lt-ink)] md:text-[2.75rem] md:leading-[1.15]">
        隐私政策
      </h1>
      <p className="mt-5 text-sm leading-[1.7] text-[var(--color-text-muted)]">
        最后更新：2026 年 4 月
      </p>

      <div className="mt-12 space-y-10 text-base leading-[1.8] text-[var(--color-text-secondary)]">
        <Section title="1. 信息收集">
          我们收集你在注册和使用服务时主动提供的信息（如邮箱、企业名称），以及服务自动产生的使用数据（如
          API 调用频率、模型选择偏好）。我们不会收集与服务无关的个人信息。
        </Section>

        <Section title="2. 信息使用">
          收集的信息仅用于：提供和改善服务、计费结算、安全监控、以及遵守法律要求。
          我们不会将你的数据出售给第三方。
        </Section>

        <Section title="3. 数据安全">
          所有数据传输使用 TLS 加密。API 密钥以哈希形式存储。我们遵循最小权限原则，
          定期进行安全审计。
        </Section>

        <Section title="4. 数据保留">
          账户数据在你主动删除账户后 30 天内清除。API 使用日志保留 90
          天后自动归档。你可以随时请求导出或删除你的数据。
        </Section>

        <Section title="5. Cookie 使用">
          我们使用必要的 Cookie 维持登录状态。不使用第三方广告追踪 Cookie。
        </Section>

        <Section title="6. 联系我们">
          如有隐私相关问题，请联系{" "}
          <a
            href="mailto:privacy@lurus.cn"
            className="text-[var(--lt-ink)] underline decoration-[var(--color-text-muted)] underline-offset-4 hover:decoration-[var(--lt-ink)]"
          >
            privacy@lurus.cn
          </a>
        </Section>
      </div>

      <div className="mt-16 border-t border-[var(--lt-rule)] pt-8">
        <Link
          href="/"
          className="text-sm text-[var(--lt-ink)] underline decoration-[var(--color-text-muted)] underline-offset-4 hover:decoration-[var(--lt-ink)]"
        >
          ← 返回首页
        </Link>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="mb-3 font-display text-[1.25rem] font-semibold leading-[1.35] tracking-[-0.02em] text-[var(--lt-ink)]">
        {title}
      </h2>
      <p>{children}</p>
    </div>
  );
}
