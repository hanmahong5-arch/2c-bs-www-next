import Link from "next/link";
import { Eyebrow, Lead } from "@/components/site";

const suggestions = [
  { name: "首页", href: "/", desc: "回到起点" },
  { name: "方法", href: "/approach", desc: "我们怎么工作" },
  { name: "Memorus", href: "/memorus", desc: "记得住，也查得清" },
  { name: "文档", href: "https://docs.lurus.cn", desc: "docs.lurus.cn", external: true },
] as const;

const linkClass =
  "block border-b border-[var(--lt-rule)] py-4 text-left transition-colors hover:border-[var(--lt-accent)]";

export default function NotFound() {
  return (
    <div className="px-6">
      <div className="mx-auto flex min-h-[70vh] max-w-5xl flex-col justify-center py-24">
        <div className="max-w-[36rem]">
          <Eyebrow>404</Eyebrow>
          <h1 className="mt-5 font-display text-[2.125rem] font-semibold leading-[1.2] tracking-[-0.025em] text-[var(--lt-ink)] md:text-[2.75rem]">
            没有这一页。
          </h1>
          <Lead className="mt-6">
            地址可能写错了，或者内容已经挪走。下面几条常有人去：
          </Lead>

          <ul className="mt-10 border-t border-[var(--lt-rule)]">
            {suggestions.map((s) => {
              const inner = (
                <>
                  <span className="font-display text-base font-semibold text-[var(--lt-ink)]">
                    {s.name}
                  </span>
                  <span className="mt-1 block text-sm text-[var(--color-text-muted)]">
                    {s.desc}
                  </span>
                </>
              );
              if ("external" in s && s.external) {
                return (
                  <li key={s.href}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={linkClass}
                    >
                      {inner}
                    </a>
                  </li>
                );
              }
              return (
                <li key={s.href}>
                  <Link href={s.href} className={linkClass}>
                    {inner}
                  </Link>
                </li>
              );
            })}
          </ul>

          <p className="mt-10 text-sm text-[var(--color-text-secondary)]">
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
