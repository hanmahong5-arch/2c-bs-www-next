import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow, Lead, ProductHeader, Section } from "@/components/site";

// /forge：可视化工作流编排壳。事实出处：2b-bs-forge README.zh-CN.md
// （内部工作流工具 + 网关路由现场演示；非自助注册公开产品；现网 forge.lurus.cn）。
// 成熟度取「内部生产使用」：自用现网在跑，不对外部承诺自助开通。

export const metadata: Metadata = {
  title: "Forge · 工作流编排壳",
  description:
    "可视化画布上搭建、运行与追踪 MCP-native Agent 工作流；执行留痕与崩溃恢复由 Kova 承担。现阶段为 Lurus 内部使用。现网登录页有注册表单，本页不把它当作自助开通。",
};

const CONTACT = "mailto:contact@lurus.cn";
const FORGE_URL = "https://forge.lurus.cn";
const DOCS_JOINT = "https://docs.lurus.cn/kova/triple-joint";

const linkClass =
  "text-[var(--lt-ink)] underline decoration-[var(--color-text-muted)] underline-offset-4 hover:decoration-[var(--lt-ink)]";

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

export default function ForgePage() {
  return (
    <>
      <ProductHeader
        name="Forge"
        eyebrow="编排壳"
        maturity="内部生产使用"
        tagline="在画布上搭建、运行并追踪 MCP-native 的 AI Agent 工作流：连线成 flow，计量 token 成本，需要崩溃恢复的少数步骤交给 Kova。"
        note="代码库以 Apache-2.0 授权；GitHub 仓目前私有。现网实例在 forge.lurus.cn。按仓库定位，这是内部工作流工具与网关路由演示。未登录会到登录页，页上有注册表单。"
        access={{
          actions: [
            { label: "写信询问", href: CONTACT, primary: true, external: true },
            { label: "打开现网 Forge", href: FORGE_URL, external: true },
            { label: "了解 Kova", href: "/kova" },
            { label: "联测账本", href: DOCS_JOINT, external: true },
          ],
          nextStep:
            "要自建，先写信说明上游网关、工作流形态，以及是否需要 Kova。未登录打开现网会到登录页，页上有注册表单；本页不把它当作自助开通。",
        }}
      />

      <Section id="claim" labelledBy="claim-title">
        <SectionTitle id="claim-title" eyebrow="它做什么">
          编排在画布，证明在 Kova。
        </SectionTitle>
        <Lead className="mt-6">
          Forge 负责可视化编排与治理：LLM、MCP 工具、条件分支、人工审批、多 Agent
          手递。需要 WAL 崩溃恢复的步骤经 Kova；看见与回放走 Lumen。三件不要混成一件。
        </Lead>
      </Section>

      <Section id="boundaries" labelledBy="boundaries-title">
        <SectionTitle id="boundaries-title" eyebrow="边界与现状">
          先说清楚它现在是什么。
        </SectionTitle>
        <ul className="mt-8 space-y-4 text-base leading-[1.8] text-[var(--color-text-secondary)]">
          <Dash>
            现状：作为我们自己的工作流工具在 forge.lurus.cn 运行；对外不承诺自助开通或 SLA。
          </Dash>
          <Dash>
            多数进阶能力（durable timer、RAG、定时/webhook、RLS 等）默认关闭，以部署配置为准，不以本页清单为准。
          </Dash>
          <Dash>
            持久执行与证据包见{" "}
            <Link href="/kova" className={linkClass}>
              Kova
            </Link>
            ；联测记录见{" "}
            <a href={DOCS_JOINT} className={linkClass} target="_blank" rel="noopener noreferrer">
              文档站 · 联测账本
            </a>
            。
          </Dash>
          <Dash>不做机房与算力转售；模型调用经平台网关时，计费真源在账号与网关侧。</Dash>
        </ul>
        <p className="mt-10 text-base leading-[1.8] text-[var(--color-text-secondary)]">
          想聊私有部署或演示，写信到{" "}
          <a href={CONTACT} className={linkClass}>
            contact@lurus.cn
          </a>
          。
        </p>
      </Section>
    </>
  );
}
