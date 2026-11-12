import type { Metadata } from "next";
import { Theme } from "@astryxdesign/core/theme";
import { defaultThemeSlug, themes } from "@/astryx-themes";
import "./astryx-lab.css";

export const metadata: Metadata = {
  title: "Astryx Lab",
  description: "Isolated Astryx runtime probe. Product pages keep the Lurus site chrome.",
  robots: { index: false, follow: false },
};

export default function AstryxLabLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <Theme theme={themes[defaultThemeSlug]}>
      <div data-astryx-lab="" className="min-h-screen p-6">
        {children}
      </div>
    </Theme>
  );
}
