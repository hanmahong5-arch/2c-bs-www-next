import Image from "next/image";

/** Urus (aurochs) trademark mark — inline SVG so currentColor tints with theme. */
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
        d="M8.5 6.5c-.8 0-1.5.7-1.5 1.6 0 6.2 2.4 12.8 6.2 17.4.4.5 1.2.5 1.6 0 1.8-2.4 3-5.4 3.5-8.9.2-1.5-.9-2.6-2.3-2.6H8.5zM55.5 6.5c.8 0 1.5.7 1.5 1.6 0 6.2-2.4 12.8-6.2 17.4-.4.5-1.2.5-1.6 0-1.8-2.4-3-5.4-3.5-8.9-.2-1.5.9-2.6 2.3-2.6h7.5z"
      />
      <path
        fill="currentColor"
        d="M18 12h6c1.1 0 2 .9 2 2v18c0 5 3.1 9 8 9s8-4 8-9V14c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2v18c0 10.5-7 19-18 19S16 40.5 16 30V14c0-1.1.9-2 2-2z"
      />
      <circle cx="32" cy="42" r="3" fill="#FF5D1F" />
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

/** Illustrated trademark portrait for brand story sections */
export function UrusPortrait({
  className = "",
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src="/images/brand/urus-mark.jpg"
      alt="Urus · 原牛商标形象"
      width={1024}
      height={1024}
      priority={priority}
      className={className}
    />
  );
}
