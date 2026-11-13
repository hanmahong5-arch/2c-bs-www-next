import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Astryx Lab",
  description: "Isolated probe. Not part of the product.",
  robots: { index: false, follow: false },
};

export default function AstryxLabLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="min-h-screen p-6">{children}</div>;
}
