import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow, Lead, ProductHeader, Section } from "@/components/site";

// /lux：编码 Agent CLI（@lurus/lux）。事实出处：2c-cli-lux docs/PRODUCT.md、
// package.json（"private": true）、Fleet seed（delivery: cli；不开 GUI）。
// 公开分发闸：仅当 package 非 private，或出现受控安装通道（文档化的安装脚本/
// 内部 registry）时，才把 AccessStation 主 CTA 改成安装；现网仍「写信询问」。
// 不是桌面 GUI；公司网关专用，Anthropic 公网出站被拦。成熟度「早期试点」。

export const metadata: Metadata = {
  title: "Lux · 编码 Agent CLI",
  description:
    "Lurus 编码 Agent 命令行：只走公司网关，不是桌面 GUI，也不是公开 npm 包。控制面在 lux-control；桌面侧可由 Switch 注入环境并拉起。",
};

const CONTACT = "mailto:contact@lurus.cn";
const DOCS = "https://docs.lurus.cn";

const linkClass =
  "text-[var(--lt-ink)] underline decoration-[var(--lt-rule)] underline-offset-4 hover:decoration-[var(--lt-accent)]";

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

export default function LuxPage() {
  return (
    <>
      <ProductHeader
        name="Lux"
        eyebrow="编码 Agent · CLI"
        maturity="早期试点"
        tagline="终端里的编码 Agent：只连公司 Messages 网关与 lux-control，不把 Anthropic 公网当默认出口。它是 CLI，不是另一套桌面 GUI。"
        note="包名 @lurus/lux 目前 private；GitHub 仓私有。Fleet 只登记，不把 CLI 当 GUI 拉起。桌面侧可由 Switch 配置网关并在终端启动 lux。"
        access={{
          actions: [
            { label: "写信询问", href: CONTACT, primary: true, external: true },
            { label: "了解 Switch", href: "/switch" },
            { label: "了解 Kova", href: "/kova" },
            { label: "文档站", href: DOCS, external: true },
          ],
          nextStep:
            "无公开安装命令。内部：检出 2c-cli-lux，用 Bun 跑 bin/lux.js，并配 LUX_BASE_URL + lux-control。外部合作先写信说明网关与终端环境。",
        }}
      />

      <Section id="claim" labelledBy="claim-title">
        <SectionTitle id="claim-title" eyebrow="它做什么">
          在终端里干活，凭证与网关在公司侧。
        </SectionTitle>
        <Lead className="mt-6">
          Lux 走公司 New API 的 Messages 面；短期钥与策略由 lux-control 下发。长任务经
          MCP 交给{" "}
          <Link href="/kova" className={linkClass}>
            Kova
          </Link>
          ；个人记忆可接 Memorus。项目文件优先 LUX.md / .lux/*，并兼容部分 Claude Code
          路径名。
        </Lead>
      </Section>

      <Section id="boundaries" labelledBy="boundaries-title">
        <SectionTitle id="boundaries-title" eyebrow="边界与现状">
          为什么这里没有一键安装。
        </SectionTitle>
        <ul className="mt-8 space-y-4 text-base leading-[1.8] text-[var(--color-text-secondary)]">
          <Dash>形态：CLI（@lurus/lux），不是 Wails/WebView 桌面应用。</Dash>
          <Dash>
            分发：package.json 为 private；无公开 npm / 安装脚本挂在本页。不要把「能 clone
            编译」写成「可自助安装」。
          </Dash>
          <Dash>
            出站：缺公司 BASE_URL 会硬失败；默认不连 Anthropic 公网、不开 Anthropic 分析与
            Remote Control。
          </Dash>
          <Dash>
            桌面入口：{" "}
            <Link href="/switch" className={linkClass}>
              Switch
            </Link>{" "}
            可注入网关环境并拉起 lux；那是启动器，不是把 Lux 做成 GUI。
          </Dash>
        </ul>
        <p className="mt-10 text-base leading-[1.8] text-[var(--color-text-secondary)]">
          想试用或对接公司网关，写信到{" "}
          <a href={CONTACT} className={linkClass}>
            contact@lurus.cn
          </a>
          。
        </p>
        <p className="mt-4 text-sm leading-[1.7] text-[var(--color-text-muted)]">
          下一步：内部配好 LUX_BASE_URL 与 lux-control 再跑；外部先来信。有公开包或安装通道后再改本页 CTA。
        </p>
      </Section>
    </>
  );
}
