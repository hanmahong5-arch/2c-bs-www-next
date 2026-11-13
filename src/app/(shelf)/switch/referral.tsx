"use client";

import { useEffect, useSyncExternalStore } from "react";
import { CopyButton } from "./copy-button";

// 推广链接落地：桌面 PromoterHub 生成 https://lurus.cn/switch?ref=<code>
// （shareLinkBase）。线上 apex → www 为 308，且保留 ?ref=（2026-11-10 实测
// Location: https://www.lurus.cn/switch?ref=…）——与本站真源一致，无需改桌面
// 域名或 www 再写一条假跳转。
// 本组件只做两件事：展示推荐人代码；记在本机（localStorage + 一方 cookie）。
// 桌面路径（ReferrerBindCard）：安装并登录 Lurus 账号后，在「开始」页填写
// （注册 7 天内、选填、只能一次）；已装可用 switch://import?type=referral。

const REF_PATTERN = /^[A-Za-z0-9_-]{1,32}$/;
const STORAGE_KEY = "lurus_switch_ref";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30;

function validRef(v: string | null | undefined): string | null {
  return v && REF_PATTERN.test(v) ? v : null;
}

function refFromUrl(): string | null {
  return validRef(new URLSearchParams(window.location.search).get("ref"));
}

function readRef(): string | null {
  const fromUrl = refFromUrl();
  if (fromUrl) return fromUrl;
  try {
    return validRef(window.localStorage.getItem(STORAGE_KEY));
  } catch {
    return null;
  }
}

const noopSubscribe = () => () => {};

/** switch://import?type=referral&data=<base64url {"code":…}>，与客户端 deeplink 约定一致。 */
function switchReferralLink(code: string): string {
  const data = btoa(JSON.stringify({ code }))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
  return `switch://import?type=referral&data=${data}`;
}

export function ReferralNotice() {
  // 服务端与首帧水合为 null，客户端挂载后再读 URL / 本地存储，不阻塞渲染。
  const ref = useSyncExternalStore(noopSubscribe, readRef, () => null);

  useEffect(() => {
    const fromUrl = refFromUrl();
    if (!fromUrl) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, fromUrl);
    } catch {
      // 隐私模式等场景写不进去，忽略。
    }
    document.cookie = `${STORAGE_KEY}=${fromUrl}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
  }, []);

  if (!ref) return null;
  return (
    <span className="mt-2 block text-xs text-[var(--color-text-muted)]">
      <span className="font-mono">
        由推荐人 <span className="text-[var(--lt-ink)]">{ref}</span> 邀请
      </span>
      <CopyButton value={ref} label="复制推广码" />
      <span className="mt-1 block">
        安装后在 Switch 登录 Lurus 账号，于「开始」页填写这个推广码（注册 7
        天内、选填、只能一次）。已安装？
        <a
          href={switchReferralLink(ref)}
          className="ml-1 underline decoration-[var(--color-text-muted)] underline-offset-4 hover:text-[var(--lt-ink)]"
        >
          在 Switch 中打开
        </a>
      </span>
    </span>
  );
}
