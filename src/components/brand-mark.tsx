import Image from "next/image";

/**
 * Urus mark — letter U + bison horns.
 * Small: reads as U (LURUS peel). Large: 野牛 trademark cue.
 * currentColor follows theme ink; ochre tip is brand accent.
 */
export function BrandMark({
  className = "h-7 w-7",
}: {
  className?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        d="M16 22c0-1.1.9-2 2-2h5c1.1 0 2 .9 2 2v20c0 3.3 2.2 6 5 6s5-2.7 5-6V22c0-1.1.9-2 2-2h5c1.1 0 2 .9 2 2v20c0 7.7-5.4 14-14 14S16 49.7 16 42V22z"
      />
      <path fill="currentColor" d="M18 20 8 6l16 6-2 8h-4z" />
      <path fill="currentColor" d="M46 20 56 6 40 12l2 8h4z" />
      <circle cx="32" cy="48" r="2.75" fill="#FF5D1F" />
    </svg>
  );
}

export function BrandLockup({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <BrandMark className="h-7 w-7 text-[var(--lt-ink)]" />
      <span className="font-display text-lg font-semibold tracking-[-0.02em] text-[var(--lt-ink)]">
        LurusTech
      </span>
    </span>
  );
}

/** Large mark study for brand story panel. */
export function UrusMarkPanel({
  className = "",
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src="/images/brand/urus-mark-study-u-horns.jpg"
      alt="Urus 商标：字母 U 与野牛角"
      width={1024}
      height={1024}
      priority={priority}
      className={className}
    />
  );
}
