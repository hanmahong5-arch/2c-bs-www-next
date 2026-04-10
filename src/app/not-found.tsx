import Link from "next/link";

const suggestions = [
  { name: "首页", href: "/", desc: "回到起点" },
  { name: "Platform", href: "/platform", desc: "企业 AI 基础设施" },
  { name: "定价", href: "/pricing", desc: "查看方案与价格" },
  { name: "文档", href: "https://docs.lurus.cn", desc: "开发者文档" },
];

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        <div className="text-8xl font-bold text-gradient-gold mb-4">404</div>
        <h1 className="text-2xl font-semibold text-[var(--color-text-primary)] mb-3">
          页面未找到
        </h1>
        <p className="text-[var(--color-text-secondary)] mb-10">
          你访问的页面不存在或已移动。以下是一些你可能在找的内容：
        </p>

        <div className="grid grid-cols-2 gap-3 mb-10">
          {suggestions.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="card p-4 text-left hover:border-[var(--color-ochre)]/40 transition-all"
            >
              <div className="text-sm font-medium text-[var(--color-text-primary)]">
                {s.name}
              </div>
              <div className="text-xs text-[var(--color-text-muted)] mt-1">
                {s.desc}
              </div>
            </Link>
          ))}
        </div>

        <Link
          href="/"
          className="inline-flex px-6 py-3 rounded-xl bg-gradient-gold text-black font-semibold hover:opacity-90 transition-opacity"
        >
          返回首页
        </Link>
      </div>
    </div>
  );
}
