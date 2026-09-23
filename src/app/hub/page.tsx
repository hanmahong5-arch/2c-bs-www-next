import type { Metadata } from "next";
import Link from "next/link";
import {
  Disclosure,
  Eyebrow,
  EvidenceLine,
  EvidenceList,
  Lead,
  ProductHeader,
  Section,
} from "@/components/site";

// Lurus Hub 产品页：ProductHeader → 核心主张 → 三个展开（接入与路由 / 租户与计量 / 日志与留痕）
// → 许可与来源 → 边界与现状。全部服务端渲染，无 JS 动效。
// 事实出处：2b-svc-newhub 的 README.md、LICENSE、internal/app/governance/chain_verify.go。

export const metadata: Metadata = {
  title: "Lurus Hub",
  description:
    "部署在你自己环境里的多租户 LLM 网关：统一接入多家上游模型服务，按租户计量，调用日志可检索，管理操作留审计。基于开源 New API，AGPLv3。",
};

const CONTACT = "mailto:contact@lurus.cn";

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

function Summary({ children }: { children: React.ReactNode }) {
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

export default function HubPage() {
  return (
    <>
      <ProductHeader
        name="Lurus Hub"
        maturity="内部生产使用"
        tagline="部署在你自己环境里的多租户 LLM 网关：多家上游模型服务走同一个入口，用量按租户记账，调用日志默认开启。"
        note="基于开源 New API（源自 One API），AGPLv3。"
      />

      {/* 核心主张 */}
      <Section id="claim" labelledBy="claim-title">
        <SectionTitle id="claim-title" eyebrow="它做什么">
          一个入口，看得见每一次调用。
        </SectionTitle>
        <Lead className="mt-6">
          应用只对接一套接口，背后接哪几家上游、怎么分配，由网关决定。
          谁调了什么、用了多少、结果如何，都留在你自己的数据库里。
        </Lead>
      </Section>

      {/* 三个展开 */}
      <Section id="details" labelledBy="details-title">
        <SectionTitle id="details-title" eyebrow="细节">
          三件事，按需展开。
        </SectionTitle>
        <div className="mt-10">
          <Disclosure summary={<Summary>接入与路由：应用只认一套接口。</Summary>}>
            <p>
              对话、嵌入、图像、音频、重排序等调用走统一的接口，网关在几种不同的上游接口形态之间转换请求与响应格式。
            </p>
            <p className="mt-2">
              选哪条上游通道，按权重加健康评分决定；评分随时间衰减，旧的观测不会一直左右今天的选择。
            </p>
          </Disclosure>

          <Disclosure summary={<Summary>租户与计量：用量按租户、模型、通道分开记。</Summary>}>
            <p>
              多租户接口以租户标识划分边界，按角色分级授权；
              另保留一套单租户兼容接口，给已有的集成用。
            </p>
            <p className="mt-2">
              用量按「租户 × 模型 × 通道」在时间窗内汇总请求数、错误数与用量，独立于转发路径本身。
            </p>
            <p className="mt-2">
              登录默认用网关自带的会话；也可以接入任何符合标准的 OIDC 身份源（默认关闭，按部署开启）。
            </p>
          </Disclosure>

          <Disclosure summary={<Summary>日志与留痕：调用可查，管理操作可校验。</Summary>}>
            <p>
              调用日志按租户隔离，可以按条件筛选、汇总、导出。全文检索是可选组件，默认关闭。
            </p>
            <p className="mt-2">
              管理类写操作进入审计记录，按租户串成哈希链。校验时逐行重算哈希、核对前后链接：
              内容被改过，会被指出来；链上少了一行，也会被指出来，但要先对照保留期清理日志，
              才能判断是不是篡改。
            </p>
            <EvidenceList className="mt-6" caption="示例 · 审计链校验的两类结果">
              <EvidenceLine
                name="审计链 · 内容"
                status="ok"
                label="一致"
                source="逐行重算哈希，与写入时一致"
              />
              <EvidenceLine
                name="审计链 · 链接"
                status="warn"
                label="断点"
                source="前后链接中断 —— 可能是保留期清理，需对照清理日志，不直接判为篡改"
              />
            </EvidenceList>
            <p className="mt-6">
              运行指标以 Prometheus 文本格式暴露；链路追踪可经 OTLP 导出，默认关闭。
            </p>
          </Disclosure>
        </div>
      </Section>

      {/* 许可与来源 */}
      <Section id="license" labelledBy="license-title">
        <SectionTitle id="license-title" eyebrow="许可与来源">
          基于开源 New API，AGPLv3。
        </SectionTitle>
        <div className="mt-6 space-y-4 text-base leading-[1.8] text-[var(--color-text-secondary)]">
          <p>
            Lurus Hub 不是从零写起的。它是开源项目 New API 的定制衍生版本，New API 本身源自
            One API（MIT）。我们在转发层之上加了通道评分、用量汇总、多租户与审计。
          </p>
          <p>
            许可沿用上游：默认 AGPLv3。按 AGPLv3，修改后的版本通过网络提供服务或对外分发时，
            须向用户提供相应的完整源代码。在只用开源许可的情况下，上游的品牌标识与版权声明须完整保留。
          </p>
          <p>具体条款以仓库中的 LICENSE 与 NOTICE 为准。</p>
        </div>
      </Section>

      {/* 边界与现状 */}
      <Section id="boundaries" labelledBy="boundaries-title">
        <SectionTitle id="boundaries-title" eyebrow="边界与现状">
          它现在在哪儿，不做什么。
        </SectionTitle>
        <ul className="mt-8 space-y-4 text-base leading-[1.8] text-[var(--color-text-secondary)]">
          <Dash>
            现状：作为我们自己产品背后的网关，在我们的准生产环境运行。
          </Dash>
          <Dash>
            OIDC 登录、全文日志检索、链路追踪、外部账务对接，默认都是关闭的。
            在你的部署里开启并验证之前，请把它们当作「可用但未开」，不是「已交付」。
          </Dash>
          <Dash>接口文档与路由的一致性有自动检查；但检查不发真实请求，文档里的请求体、响应体和状态码仍可能有出入。</Dash>
          <Dash>不转售上游模型服务，也不做机房与算力转售。</Dash>
          <Dash>不对延迟、可用率或成本给出承诺数字。</Dash>
        </ul>
        <p className="mt-10 text-base leading-[1.8] text-[var(--color-text-secondary)]">
          想了解它放进你的环境会是什么样，写信到{" "}
          <a
            href={CONTACT}
            className="text-[var(--lt-ink)] underline decoration-[var(--lt-rule)] underline-offset-4 hover:decoration-[var(--lt-accent)]"
          >
            contact@lurus.cn
          </a>
          ；或先读{" "}
          <Link
            href="/approach"
            className="text-[var(--lt-ink)] underline decoration-[var(--lt-rule)] underline-offset-4 hover:decoration-[var(--lt-accent)]"
          >
            方法
          </Link>
          。
        </p>
      </Section>
    </>
  );
}
