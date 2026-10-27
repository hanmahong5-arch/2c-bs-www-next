import Image from "next/image";

/**
 * Urus mark — reads as letter U. Minimal tip flare = horn hint only.
 * No face / animal. currentColor follows theme ink.
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
        d="M18 8c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2v26c0 4.4 2.7 8 8 8s8-3.6 8-8V8c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2v26c0 8.8-5.8 16-16 16S18 42.8 18 34V8z"
      />
      <circle cx="32" cy="46" r="3" fill="#FF5D1F" />
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

/** Large abstract mark for brand story panel. */
export function UrusMarkPanel({
  className = "",
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src="/images/brand/urus-mark-abstract.jpg"
      alt="Urus 商标：字母 U"
      width={1024}
      height={1024}
      priority={priority}
      className={className}
    />
  );
}
