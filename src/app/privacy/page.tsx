import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "隐私政策",
  description: "Lurus 隐私政策 — 我们如何收集、使用和保护你的数据。",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20 md:py-28">
      <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-4">
        隐私政策
      </h1>
      <p className="text-sm text-[var(--color-text-muted)] mb-12">
        最后更新：2026 年 4 月
      </p>

      <div className="space-y-10 text-[var(--color-text-secondary)] leading-relaxed">
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
            className="text-[var(--color-ochre)] hover:underline"
          >
            privacy@lurus.cn
          </a>
        </Section>
      </div>

      <div className="mt-16 pt-8 border-t border-[var(--color-border)]">
        <Link
          href="/"
          className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] transition-colors"
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
      <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-3">
        {title}
      </h2>
      <p>{children}</p>
    </div>
  );
}
