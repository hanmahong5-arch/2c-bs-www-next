import type { Metadata } from "next";
import { Disclosure, Eyebrow, Lead, ProductHeader, Section } from "@/components/site";

// Memorus 产品页：给 AI 系统的长期记忆。
// 叙事：一句话 → 核心主张（记忆也需要可核查）→ 形成 / 检索 / 接入 → 边界与现状 → 文档。
// 每一处机制都对应 2b-svc-memorus 仓里真实存在的代码；没有的不写，不放基准数字。
// 全部服务端渲染，无 JS 动效。

export const metadata: Metadata = {
  title: "Memorus — AI 系统的长期记忆",
  description:
    "为 AI 系统保存长期记忆：抽取、去重、衰减、混合检索。可查变更历史；锚定到源文件的记忆，检索时核验是否过时。早期试点。",
};

const DOCS = "https://docs.lurus.cn/memx/";

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

function Summary({ children }: { children: React.ReactNode }) {
  return <span className="text-[1.0625rem]">{children}</span>;
}

function Item({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3">
      <span aria-hidden="true" className="text-[var(--color-text-muted)]">
        —
      </span>
      <span>{children}</span>
    </li>
  );
}

function Code({ children }: { children: React.ReactNode }) {
  return <code className="font-mono text-[0.875em] text-[var(--lt-ink)]">{children}</code>;
}

export default function MemorusPage() {
  return (
    <>
      <ProductHeader
        name="Memorus"
        maturity="早期试点"
        tagline="给 AI 系统的长期记忆：从对话里抽取值得留下的事实，去重，随时间衰减，按混合方式检索。"
        evidence={{
          name: "记忆 · 调用 connect() 连接网关",
          status: "stale",
          source: "锚定于 gateway/client.ts · 两次输入印证 · 锚定的代码片段已不在原文件",
          age: "检索时核验",
        }}
        evidenceCaption="示例 · 一条记忆的锚点、印证次数与核验状态"
      />

      {/* 核心主张 */}
      <Section id="claim" labelledBy="claim-title">
        <SectionTitle id="claim-title" eyebrow="主张">
          记忆也需要可核查。
        </SectionTitle>
        <Lead className="mt-6">
          一条记忆从哪条输入来、被几次输入印证过、何时会衰减、检索时是否还成立，
          都应当查得到。记不住是一种问题；记错了而没人知道，是更大的问题。
        </Lead>
      </Section>

      {/* 形成 / 检索 / 接入 */}
      <Section id="how" labelledBy="how-title">
        <SectionTitle id="how-title" eyebrow="机制">
          形成，检索，接入。
        </SectionTitle>
        <div className="mt-10">
          <Disclosure summary={<Summary>记忆如何形成：抽取、脱敏、去重。</Summary>}>
            <ul className="space-y-3">
              <Item>
                输入先经四步处理：识别、评分、隐私脱敏、提炼成一条条记忆。
                默认使用本地规则，不调用任何外部模型；调用模型的模式需要显式开启。
              </Item>
              <Item>
                脱敏规则不能单独关闭；处理管线默认开启。脱敏步骤失败时，这次写入整条不落库。
              </Item>
              <Item>
                新记忆与已有记忆比对相似度，决定新增、合并或跳过；互相矛盾的记忆会被标记出来。
              </Item>
              <Item>
                数据模型带来源字段：哪个会话、第几轮、谁说的、内容摘要哈希；目前经服务接口写入的记忆还没有来源记录。
                后续输入重复印证同一事实时，印证次数加一。
              </Item>
              <Item>
                写入时发现同一事实有了新值，旧记忆保留为历史，标记「已被取代」并指向新记忆，检索时排在后面。
                新增、修改、删除都写入变更历史，可按条查询。
              </Item>
            </ul>
          </Disclosure>

          <Disclosure summary={<Summary>如何衰减与检索：权重随时间下降，检索时核验是否过时。</Summary>}>
            <ul className="space-y-3">
              <Item>
                衰减按半衰期计算，新记忆有一段保护期；每被检索一次，权重回升一些；
                被检索足够多次的记忆不再衰减。参数都可以配置。
              </Item>
              <Item>
                衰减清理由命令行或 MCP 工具触发，权重低于阈值的记忆在清理时移出存储，
                清理结果报告更新、移出、转为长期的条数。
              </Item>
              <Item>
                检索综合四层信号：精确关键词、词干模糊匹配、元数据、语义相似度，
                再乘以衰减权重与时效因子，得到一个排序分。
              </Item>
              <Item>
                记忆可以锚定到某个源文件里的一段文字。检索时重新核对这段文字是否还在，
                标为「已核验」「陈旧」或「无法核验」，随结果一起返回。
                对陈旧记忆默认只标注；也可以配置为降权或直接剔除。
              </Item>
            </ul>
          </Disclosure>

          <Disclosure summary={<Summary>如何接入：命令行、REST、MCP；可随交付部署进客户环境。</Summary>}>
            <ul className="space-y-3">
              <Item>
                一个引擎，三种接入：命令行工具（<Code>learn</Code> / <Code>search</Code> /{" "}
                <Code>sweep</Code> / <Code>verify</Code> 等）、REST 接口、MCP
                服务（本地 stdio，或服务端 HTTP 端点，后者目前仅支持单租户）。
              </Item>
              <Item>
                REST 服务在非本机地址上启动时必须配置 API 密钥，否则拒绝启动。
                可选按密钥区分租户，并提供按用户擦除数据的接口。
              </Item>
              <Item>
                有面向客户环境的 Docker Compose 部署包：一个应用容器加一个一次性初始化容器，内置 SQLite 存储，
                不依赖我们这边的任何基础设施；镜像可随交付以离线包提供，并附校验和。
              </Item>
            </ul>
          </Disclosure>
        </div>
      </Section>

      {/* 边界与现状 */}
      <Section id="boundaries" labelledBy="boundaries-title">
        <SectionTitle id="boundaries-title" eyebrow="边界与现状">
          还在早期，我们写清楚到哪一步。
        </SectionTitle>
        <ul className="mt-8 space-y-4 text-base leading-[1.8] text-[var(--color-text-secondary)]">
          <Item>当前版本在预发与演示环境运行，未承载客户生产流量，尚未替换正在服务线上流量的上一代实现。</Item>
          <Item>
            检索结果返回总分与核验状态；各层的分项得分目前只在引擎内部计算，还没有通过接口返回。
          </Item>
          <Item>
            「混合检索优于纯向量检索」目前只有机制，没有可复现的基准数字支撑，所以这里不写数字。
          </Item>
          <Item>
            零配置默认使用确定性的哈希向量，不是真实的语义嵌入；要做语义检索，需要配置嵌入服务。
          </Item>
          <Item>数据模型带来源字段；目前经服务接口写入的记忆还没有来源记录。</Item>
        </ul>
      </Section>

      {/* 文档 */}
      <Section labelledBy="docs-title">
        <p
          id="docs-title"
          className="font-display text-xl leading-[1.5] text-[var(--lt-ink)] md:text-2xl"
        >
          概念与架构细节见{" "}
          <a
            href={DOCS}
            className="text-[var(--lt-ink)] underline decoration-[var(--lt-rule)] underline-offset-4 hover:decoration-[var(--lt-accent)]"
          >
            文档
          </a>
          。
        </p>
      </Section>
    </>
  );
}
