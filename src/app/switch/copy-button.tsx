"use client";

import { useState } from "react";

/** 行内小号「复制」按钮；剪贴板不可用时静默不变。 */
export function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // 非安全上下文或权限被拒：不打扰用户，校验值本身仍可手动选中。
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={label}
      className="ml-2 font-sans text-[var(--color-text-muted)] underline decoration-[var(--lt-rule)] underline-offset-4 hover:text-[var(--lt-ink)]"
    >
      {copied ? "已复制" : "复制"}
    </button>
  );
}
