"use client";

import Link from "next/link";

interface SmartLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  showExternalIndicator?: boolean;
}

/**
 * Unified link component that auto-detects link type:
 * - Internal routes → Next.js <Link> (client-side navigation)
 * - External URLs → <a target="_blank"> with ↗ indicator
 * - mailto: → <a> without target
 */
export function SmartLink({
  href,
  children,
  className = "",
  showExternalIndicator = true,
}: SmartLinkProps) {
  const isExternal = href.startsWith("http://") || href.startsWith("https://");
  const isMailto = href.startsWith("mailto:");

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {children}
        {showExternalIndicator && (
          <span className="inline-block ml-1 opacity-40 text-[10px]">↗</span>
        )}
      </a>
    );
  }

  if (isMailto) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
