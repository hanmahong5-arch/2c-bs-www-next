import { Suspense } from "react";
import type { Metadata } from "next";
import { Eyebrow, Lead, ProductHeader, Section } from "@/components/site";
import { ReferralNotice } from "./referral";
import { SwitchDownloadSection, SwitchDownloadSkeleton } from "./switch-download";

// /switch：桌面客户端 Switch 的介绍与下载页，也是推广链接 /switch?ref=<code> 的落地页。
// 文案只取自 2c-gui-switch 的 README 与产品说明；没有的能力、价格不写。
// 下载区读 releases.lurus.cn 的发布清单（与 /download 的 Lutu 共用 src/lib/release-manifest）。

export const metadata: Metadata = {
  title: "Switch — 桌面 AI CLI 管家",
  description:
    "桌面应用：在一处配置 Claude Code、Codex、Gemini CLI 等 AI 编程 CLI，本地网关统一转发与记账，管理 MCP 服务器，配置快照随时还原。Windows 版可下载。",
};

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

export default function SwitchPage() {
  return (
    <>
      <ProductHeader
        name="Switch"
        eyebrow="桌面客户端"
        maturity="早期试点"
        tagline="桌面上的 AI CLI 管家：主流 AI 编程 CLI 的配置、代理、MCP、快照与账单，在一处管。"
        note={
          <>
            <a
              href="#download"
              className="text-[var(--lt-ink)] underline decoration-[var(--lt-rule)] underline-offset-4 hover:decoration-[var(--lt-accent)]"
            >
              前往下载
            </a>
            <ReferralNotice />
          </>
        }
      />

      <Section id="what" labelledBy="what-title">
        <SectionTitle id="what-title" eyebrow="能做什么">
          同时在用几个 AI CLI 时，少折腾一些。
        </SectionTitle>
        <Lead className="mt-6">
          Key、代理、MCP 和账单分散在每个工具各自的配置里。Switch 把它们收到一个桌面应用里管理。
        </Lead>
        <ul className="mt-8 space-y-4 text-base leading-[1.8] text-[var(--color-text-secondary)]">
          <Item>
            一处配置 Claude Code、Codex、Gemini CLI 等工具：表单与文本两种视图编辑，带校验和预设。
          </Item>
          <Item>
            本地网关：各 CLI 指向本机，由网关转发到上游，出错时按顺序切换备用线路；按请求记录 token
            用量，看清每个模型花了多少，也可以设一道硬性的花费上限。
          </Item>
          <Item>管理 MCP 服务器；每个工具的配置都能做快照，改坏了随时还原。</Item>
          <Item>盯着每个 CLI 的运行状态，任务完成、卡住或触到预算时推送到飞书、Telegram 或 Slack。</Item>
          <Item>
            本地优先：Windows 上密钥用系统 DPAPI 加密保存；配置原子写入，崩溃不会写坏文件；退出
            Switch 时不留下仍在消耗 token 的 CLI 进程。
          </Item>
        </ul>
      </Section>

      {/* 只有下载区依赖外部 releases.lurus.cn；Suspense 圈住，清单慢或挂时页面其余部分照常先出。 */}
      <Suspense fallback={<SwitchDownloadSkeleton />}>
        <SwitchDownloadSection />
      </Suspense>
    </>
  );
}
