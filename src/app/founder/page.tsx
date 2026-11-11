import type { Metadata } from "next";
import { Eyebrow, Lead, ProductHeader, Section } from "@/components/site";
import {
  RELEASES_BASE,
  assetUrl,
  fetchReleaseManifest,
  formatDate,
  formatSize,
} from "@/lib/release-manifest";

// /founder：公司内部获客桌面 OS。事实出处：2c-gui-founder README.md、
// Fleet seed（无公网 surface；lifecycle building）。
// 下载 CTA 仅在 releases.lurus.cn/lurus-founder/manifest.json 可读时出现；
// 现网 404 → 保持仅内部、无安装按钮（2026-11-10 核对）。

export const metadata: Metadata = {
  title: "Founder · 获客桌面",
  description:
    "公司内部获客操作系统：本机桌面进程，意图到触达到关系推进。无公网安装包时不对外部自助分发。",
};

const CONTACT = "mailto:contact@lurus.cn";
const MANIFEST_URL =
  process.env.NEXT_PUBLIC_FOUNDER_MANIFEST_URL ??
  `${RELEASES_BASE}/lurus-founder/manifest.json`;

type ReleaseFile = {
  filename: string;
  size: number;
  sha256: string;
};

type FounderManifest = {
  product: string;
  version: string;
  tag: string;
  buildDate: string;
  baseUrl: string;
  files: ReleaseFile[];
};

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

export default async function FounderPage() {
  const manifest = await fetchReleaseManifest<FounderManifest>(MANIFEST_URL);
  const hasRelease = Boolean(
    manifest?.version && Array.isArray(manifest.files) && manifest.files.length > 0,
  );

  return (
    <>
      <ProductHeader
        name="Founder"
        eyebrow="获客桌面 · 仅内部"
        maturity="早期试点"
        tagline="公司内部获客操作系统：本机单进程完成内容、闸控分发与关系推进；登录与计费走 Lurus 平台，默认不对外部自助分发。"
        note="仓库在接驳开发阶段。Fleet 只负责本机启动与计费帽，不收发布表单。真机发布验收未绿前，不对外说真发可用。"
        access={{
          actions: hasRelease
            ? [
                { label: "前往下载", href: "#download", primary: true },
                { label: "写信询问", href: CONTACT, external: true },
                { label: "阅读方法", href: "/approach" },
              ]
            : [
                { label: "写信询问", href: CONTACT, primary: true, external: true },
                { label: "阅读方法", href: "/approach" },
              ],
          nextStep: hasRelease
            ? "有公开安装包时可下载；仍属内部获客工具，真发能力以真机验收为准。外部合作先写信说明场景。"
            : "无公网下载。若你是内部协作者，从本机检出 2c-gui-founder 构建；外部合作先写信说明获客场景与边界。",
        }}
      />

      <Section id="claim" labelledBy="claim-title">
        <SectionTitle id="claim-title" eyebrow="它做什么">
          获客 OS，跑在你自己的电脑上。
        </SectionTitle>
        <Lead className="mt-6">
          不是云 SaaS：没有对外控制台集群。数据落在本机；仅身份、钱包与模型推理经网络调用平台。
          北极星是可核对的关系与价值事件，不是发帖量。
        </Lead>
      </Section>

      <Section id="boundaries" labelledBy="boundaries-title">
        <SectionTitle id="boundaries-title" eyebrow="边界与现状">
          {hasRelease ? "有包也不等于对外自助产品。" : "为什么这里没有安装按钮。"}
        </SectionTitle>
        <ul className="mt-8 space-y-4 text-base leading-[1.8] text-[var(--color-text-secondary)]">
          <Dash>
            {hasRelease
              ? "现状：releases 清单可读；下载仍按内部获客工具理解，不承诺对外 SLA。"
              : "现状：无公网 release 清单（releases.lurus.cn 上尚无 founder 包）；不挂假下载。"}
          </Dash>
          <Dash>受众：公司内部获客与产品线协作，不是自助注册产品。</Dash>
          <Dash>
            发布中心默认草稿；真发须确认，且真机验收未绿前不作对外能力承诺。
          </Dash>
          <Dash>不做机房转售；不编造「本周已获客 N」一类无法核对的数字。</Dash>
        </ul>
        <p className="mt-10 text-base leading-[1.8] text-[var(--color-text-secondary)]">
          想了解是否适合你们的获客边界，写信到{" "}
          <a href={CONTACT} className={linkClass}>
            contact@lurus.cn
          </a>
          。
        </p>
        <p className="mt-4 text-sm leading-[1.7] text-[var(--color-text-muted)]">
          {hasRelease
            ? "下一步：下载后本机运行；外部合作仍先来信。"
            : "下一步：外部先来信；内部从本机仓构建。有公开安装通道后再挂下载。"}
        </p>
      </Section>

      {hasRelease && manifest ? (
        <Section id="download" labelledBy="download-title">
          <SectionTitle id="download-title" eyebrow="安装包">
            Founder {manifest.version}
          </SectionTitle>
          <p className="mt-4 text-sm leading-[1.7] text-[var(--color-text-muted)]">
            构建于 {formatDate(manifest.buildDate)} · 来自 releases.lurus.cn
          </p>
          <ul className="mt-8 space-y-3 text-base leading-[1.8] text-[var(--color-text-secondary)]">
            {manifest.files.map((f) => (
              <li key={f.filename} className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <a
                  href={assetUrl(manifest.baseUrl, f.filename)}
                  className={linkClass}
                  rel="noopener noreferrer"
                >
                  {f.filename}
                </a>
                <span className="text-sm text-[var(--color-text-muted)]">
                  {formatSize(f.size)}
                </span>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}
    </>
  );
}
