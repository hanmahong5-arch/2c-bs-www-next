"use client";

import { useEffect, useSyncExternalStore } from "react";

// 推广链接 https://lurus.cn/switch?ref=<code> 的落地处理。
// 只做两件事：展示推荐人代码；把它记在本机（localStorage + 一方 cookie），
// 换页、稍后再来都还在。不上报、不做其他追踪。

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
    <span className="mt-2 block font-mono text-xs text-[var(--color-text-muted)]">
      由推荐人 <span className="text-[var(--lt-ink)]">{ref}</span> 邀请
    </span>
  );
}
