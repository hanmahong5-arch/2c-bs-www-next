import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "服务条款",
  description: "Lurus 服务条款 — 使用 Lurus 服务的条件和协议。",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20 md:py-28">
      <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-4">
        服务条款
      </h1>
      <p className="text-sm text-[var(--color-text-muted)] mb-12">
        最后更新：2026 年 4 月
      </p>

      <div className="space-y-10 text-[var(--color-text-secondary)] leading-relaxed">
        <Section title="1. 服务说明">
          Lurus 提供企业 AI 基础设施服务，包括但不限于：LLM API
          网关、账户计费系统、AI 记忆引擎、通知服务。服务内容可能随产品迭代调整，
          重大变更将提前通知。
        </Section>

        <Section title="2. 账户责任">
          你对账户下的所有活动负责，包括 API Key
          的安全保管。发现未授权使用应立即通知我们。
          我们不对因 API Key 泄露导致的损失承担责任。
        </Section>

        <Section title="3. 计费与付款">
          按量付费部分以实际使用量计算，订阅制部分按周期预付。
          逾期未付款可能导致服务降级或暂停。详细定价见
          <Link href="/pricing" className="text-[var(--color-ochre)] hover:underline mx-1">
            定价页面
          </Link>
          。
        </Section>

        <Section title="4. 使用限制">
          禁止使用 Lurus 服务进行：违法活动、发送垃圾信息、DDoS 攻击、
          绕过安全机制、或任何违反上游 AI 模型提供商使用条款的行为。
        </Section>

        <Section title="5. 服务可用性">
          我们以 99.9% 可用性为目标，但不保证零中断。计划内维护将提前通知。
          对于免费版用户，不提供 SLA 保障。
        </Section>

        <Section title="6. 责任限制">
          在法律允许的最大范围内，Lurus 对间接损失、利润损失、数据丢失不承担赔偿责任。
          最大赔偿额不超过事故前 12 个月的已付费用。
        </Section>

        <Section title="7. 争议解决">
          本条款受中华人民共和国法律管辖。争议优先协商解决，协商不成由服务商所在地法院管辖。
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
