"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Eyebrow } from "@/components/site/eyebrow";
import { Lead } from "@/components/site/lead";

const CONTACT = "contact@lurus.cn";

// 路由级错误边界。捕获 page/嵌套 layout 渲染期抛出的异常；根 layout 自身的错误
// 由 global-error.tsx 兜底（本站根 layout 无数据依赖，暂不需要）。
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // 生产环境 message 会被 Next 脱敏，digest 才是能和服务端日志对上的线索。
    console.error(error);
  }, [error]);

  const digest = error.digest;
  const mail = digest
    ? `mailto:${CONTACT}?subject=${encodeURIComponent(`页面错误 ${digest}`)}`
    : `mailto:${CONTACT}`;

  return (
    <div className="px-6">
      <div className="mx-auto flex min-h-[70vh] max-w-5xl flex-col justify-center py-24">
        <div className="max-w-[36rem]">
          <Eyebrow>出错</Eyebrow>
          <h1 className="mt-5 font-display text-[2.125rem] font-semibold leading-[1.2] tracking-[-0.025em] text-[var(--lt-ink)] md:text-[2.75rem]">
            页面出错了
          </h1>
          <Lead className="mt-6">
            这一页没能正常加载。多数情况重试一次就好；如果反复出现，写信到{" "}
            <a
              href={mail}
              className="text-[var(--lt-ink)] underline decoration-[var(--lt-rule)] underline-offset-4 hover:decoration-[var(--lt-accent)]"
            >
              {CONTACT}
            </a>
            ，并附上错误编号（有的话）和打开的地址。
          </Lead>

          {digest ? (
            <p className="mt-8 border-y border-[var(--lt-rule)] py-3 font-mono text-[12px] leading-[1.6] text-[var(--color-text-muted)]">
              错误编号 <span className="text-[var(--lt-ink)]">{digest}</span>
            </p>
          ) : null}

          <p className="mt-10 flex flex-wrap items-baseline gap-x-8 gap-y-3 text-sm">
            <button
              type="button"
              onClick={reset}
              className="text-[var(--lt-ink)] underline decoration-[var(--lt-rule)] underline-offset-4 outline-offset-4 hover:decoration-[var(--lt-accent)] focus-visible:outline focus-visible:outline-1 focus-visible:outline-[var(--lt-ink)]"
            >
              重试
            </button>
            <Link
              href="/"
              className="text-[var(--lt-ink)] underline decoration-[var(--lt-rule)] underline-offset-4 hover:decoration-[var(--lt-accent)]"
            >
              返回首页
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
