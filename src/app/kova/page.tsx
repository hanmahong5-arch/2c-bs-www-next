import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  Disclosure,
  Eyebrow,
  Lead,
  MaturityChip,
  ProductHeader,
  Section,
} from "@/components/site";

// /kova：见证体系里的「执行」层。
// 结构：ProductHeader → 核心主张 → 三个展开（崩溃恢复 / 执行留痕与回放 / 嵌入方式）
//       → 受托运维为什么需要它 → 边界与现状 → 文档链接。
// 页面不放性能数字：旧版引用的实测文档已不在仓库当前版本中，指不到出处就不写。

export const metadata: Metadata = {
  title: "Kova · 嵌入式持久执行引擎",
  description:
    "Kova 把每一步执行先写入预写日志再算完成：进程中断后从日志继续，执行过程留痕、可离线回放。目前在我们自己的环境中使用。早期试点。",
};

const DOCS = "https://docs.lurus.cn/kova/";

function SectionTitle({ id, eyebrow, children }: { id: string; eyebrow: string; children: ReactNode }) {
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

function Mono({ children }: { children: ReactNode }) {
  return <code className="font-mono text-[13px] text-[var(--lt-ink)]">{children}</code>;
}

function Dash({ children }: { children: ReactNode }) {
  return (
    <li className="flex gap-3">
      <span aria-hidden="true" className="text-[var(--color-text-muted)]">
        —
      </span>
      <span>{children}</span>
    </li>
  );
}

export default function KovaPage() {
  return (
    <>
      <ProductHeader
        name="Kova"
        maturity="早期试点"
        tagline="嵌入式持久执行引擎。每一步先写进日志，再算完成；进程中断后从日志接着走，走过的路可以回放。"
        note="专有软件，按商业许可提供；目前只在我们自己的环境里运行。"
        evidence={{
          name: "workflow #42",
          version: null,
          status: "ok",
          label: "第 3 步已落盘",
          source: "状态来自预写日志记录 · 重启后从第 4 步继续，不重做前三步",
        }}
        evidenceCaption="示例 · 字段为示意"
      />

      {/* 核心主张 */}
      <Section id="claim" labelledBy="claim-title">
        <SectionTitle id="claim-title" eyebrow="核心">
          中断不可避免，重来可以避免。
        </SectionTitle>
        <Lead className="mt-6">
          多步任务做到一半，进程被杀、机器重启，都是常事。Kova 让每一步的结果先落盘，
          恢复时读日志就知道做到了哪里——不靠记忆，也不靠猜。
        </Lead>

        <div className="mt-10">
          <Disclosure summary={<span className="text-[1.0625rem]">崩溃恢复是怎么做到的</span>}>
            <p>
              每条指令和它的执行结果，都先追加进一份预写日志（WAL），写成功才算完成；
              每条记录带 CRC32 校验，可选再加逐条 HMAC（默认关闭）。
            </p>
            <p className="mt-3">
              对需要调用工具的步骤，调用的决定在执行前就写进日志；每完成一次调用，再写一条结果。
              重启后，已有结果的调用直接跳过，没有结果的按记录重新执行，不再重新请求模型做决定。
            </p>
            <p className="mt-3">
              这意味着「已经在跑、但没来得及记下结果」的那一步会再执行一次。
              所以写操作本身要能安全重试——这一点由调用方负责，Kova 不替你保证。
            </p>
          </Disclosure>

          <Disclosure summary={<span className="text-[1.0625rem]">执行留痕与回放</span>}>
            <p>
              日志本身就是执行记录。命令行工具可以从一份日志目录导出证据包：清单、分节文件与校验和，
              可选 Ed25519 签名；第三方只凭公钥就能校验，不需要服务器，也不需要原始日志。
            </p>
            <p className="mt-3">
              也可以只针对某一次运行，离线还原它做了什么、按什么顺序做的：
            </p>
            <p className="mt-2">
              <Mono>kova evidence reconstruct --task-id 42 --wal-dir ./wal</Mono>
            </p>
            <p className="mt-5">
              <span className="text-[var(--lt-ink)]">Lumen</span>{" "}
              是配套的回放与成本审计命令行：从运行记录逐步回放一次历史运行（不产生新的模型调用费用），
              按智能体和模型汇总花费并标出离群的那一次。它仍在早期试点，没有发布到任何包仓库；
              目前回放读的是运行记录文件，直接从预写日志回放还在计划中。
            </p>
          </Disclosure>

          <Disclosure summary={<span className="text-[1.0625rem]">嵌入方式</span>}>
            <p>
              核心是一个 Rust 库，直接链接进你的程序，不需要单独部署的调度服务；
              日志就是本地目录里的文件，外部数据库是可选项。
            </p>
            <p className="mt-3">
              在同一套持久化内核之上，另有 REST、MCP 与 Python 绑定几种接入方式；gRPC 服务标注为实验性，
              默认只监听本机。仓库里有一个刻意放在工作区之外的示例，用来验证外部程序链接、被杀、再恢复这一整条路径。
            </p>
          </Disclosure>
        </div>
      </Section>

      {/* 受托运维为什么需要它 */}
      <Section id="why-ops" labelledBy="why-ops-title">
        <SectionTitle id="why-ops-title" eyebrow="为什么">
          受托运维里的动作，也该可中断、可恢复、有记录。
        </SectionTitle>
        <Lead className="mt-6">
          续证书、做备份、跑恢复演练，都是多步操作。中途断掉时，应该能知道做到了哪一步，
          从那里继续；事后能说清每一步做了什么；动到客户数据之前，先有人批准。
        </Lead>
        <ul className="mt-8 space-y-4 text-base leading-[1.8] text-[var(--color-text-secondary)]">
          <Dash>
            可中断、可恢复、每一步留痕：Kova 已经具备，见上文。
          </Dash>
          <Dash>
            写操作先审批：Kova 的工作流可以停在一个审批点，等人批准或拒绝后再继续，
            审批本身也记在日志里。
          </Dash>
          <Dash>
            <span>
              把我们现有的续证书、备份与恢复演练脚本迁到 Kova 上执行：
              <MaturityChip level="设计中" className="ml-1.5" />
              。这些动作今天仍由独立脚本完成。
            </span>
          </Dash>
        </ul>
      </Section>

      {/* 边界与现状 */}
      <Section id="boundaries" labelledBy="boundaries-title">
        <SectionTitle id="boundaries-title" eyebrow="边界与现状">
          先说清楚它还不是什么。
        </SectionTitle>
        <ul className="mt-8 space-y-4 text-base leading-[1.8] text-[var(--color-text-secondary)]">
          <Dash>
            成熟度是 <MaturityChip level="早期试点" />
            ：只在我们自有环境试运行，未承载客户流量。外部接入还早。
          </Dash>
          <Dash>
            声明式工作流的注册表已按租户分区，但隔离只做到接口层；
            互不信任的团队不应共用一个实例。
          </Dash>
          <Dash>
            不保证「恰好一次」。中断时正在执行的那一步会重做，写操作需要自己做到可安全重试。
          </Dash>
          <Dash>不是开源软件，也没有发布到公共包仓库。</Dash>
        </ul>
      </Section>

      {/* 文档 */}
      <Section labelledBy="docs-title">
        <p
          id="docs-title"
          className="font-display text-xl leading-[1.5] text-[var(--lt-ink)] md:text-2xl"
        >
          接口、配置与恢复语义的细节，见{" "}
          <a
            href={DOCS}
            className="text-[var(--lt-ink)] underline decoration-[var(--lt-rule)] underline-offset-4 hover:decoration-[var(--lt-accent)]"
          >
            Kova 文档
          </a>
          。
        </p>
      </Section>
    </>
  );
}
