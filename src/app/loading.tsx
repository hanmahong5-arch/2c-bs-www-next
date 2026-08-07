// 路由级加载态。Next 会用它给整个 app/ 段包一层 Suspense —— 客户端导航到还在
// 取数的路由时立刻出骨架，而不是卡在旧页面上不动。
// 骨架按首屏节奏排（eyebrow / 标题 / 两行正文），不放具体文案，避免闪一下错内容。
export default function Loading() {
  return (
    <div
      role="status"
      aria-label="加载中"
      className="min-h-[70vh] flex items-center justify-center px-6"
    >
      <div className="w-full max-w-lg animate-pulse motion-reduce:animate-none">
        <div className="h-3 w-24 mx-auto mb-7 rounded-full bg-[var(--color-surface)]" />
        <div className="h-9 w-full max-w-sm mx-auto mb-5 rounded-xl bg-[var(--color-surface)]" />
        <div className="h-4 w-3/4 mx-auto mb-3 rounded-full bg-[var(--color-surface)]" />
        <div className="h-4 w-1/2 mx-auto rounded-full bg-[var(--color-surface)]" />
      </div>
    </div>
  );
}
