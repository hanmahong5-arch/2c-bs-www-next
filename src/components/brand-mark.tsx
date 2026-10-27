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
        d="M15 26c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2v16c0 3.9 2.7 7 7 7s7-3.1 7-7V26c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2v16c0 8.3-5.8 15-15 15S15 50.3 15 42V26z"
      />
      <path fill="currentColor" d="M17 24 5 4l22 8-3 12H17z" />
      <path fill="currentColor" d="M47 24 59 4 37 12l3 12h7z" />
      <circle cx="32" cy="49" r="3" fill="#FF5D1F" />
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
