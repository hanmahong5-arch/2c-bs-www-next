"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

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

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        <ExclamationTriangleIcon
          className="w-14 h-14 mx-auto mb-6 text-[var(--lt-accent)]"
          aria-hidden="true"
        />
        <h1 className="text-2xl font-semibold text-[var(--color-text-primary)] mb-3">
          页面出错了
        </h1>
        <p className="text-[var(--color-text-secondary)] mb-8">
          这一页没能正常加载。多数情况重试一次就好；如果反复出现，把下面的错误编号发给我们，能直接定位到日志。
        </p>

        {error.digest && (
          <div className="card-flat px-4 py-3 mb-8 text-xs text-[var(--color-text-muted)]">
            错误编号{" "}
            <code className="font-mono break-all text-[var(--color-text-primary)]">
              {error.digest}
            </code>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-center gap-3">
          <button type="button" onClick={reset} className="btn-primary">
            重试
          </button>
          <Link href="/" className="btn-secondary">
            返回首页
          </Link>
        </div>
      </div>
    </div>
  );
}
