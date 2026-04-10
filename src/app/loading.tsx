export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        {/* Animated gold pulse */}
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-2 border-[var(--color-ochre)]/20" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[var(--color-ochre)] animate-spin" />
        </div>
        <span className="text-sm text-[var(--color-text-muted)]">
          加载中...
        </span>
      </div>
    </div>
  );
}
