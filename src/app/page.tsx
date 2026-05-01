import { Hero } from "@/components/hero";
import { TrustBand } from "@/components/trust-band";
import { QuickStart } from "@/components/quickstart";
import { CostCalculator } from "@/components/cost-calculator";
import { ArchitectureVisual } from "@/components/architecture-visual";
import { FeaturesShowcase } from "@/components/features-showcase";
import { Comparison } from "@/components/comparison";
import { ProductGrid } from "@/components/product-grid";
import { PersonaRouter } from "@/components/persona-router";
import { CTA } from "@/components/cta";
import { FloatingCTA } from "@/components/floating-cta";

// Section narrative:
// 1.  Hero            — the promise: "一行代码，接入所有 AI"
// 2.  TrustBand       — credibility: live metrics + 12 providers
// 3.  QuickStart      — activation: 3 steps, live diff + first call result
// 4.  CostCalculator  — ROI: visitor enters their volume, math does the talking
// 5.  Architecture    — proof: 45ms request trace shows it actually works
// 6.  Features        — depth: 6 core capabilities explained
// 7.  Comparison      — decision: why not build it yourself?
// 8.  ProductGrid     — ecosystem: full P0 → P1 → P2 catalog
// 9.  PersonaRouter   — navigation: find your path in the ecosystem
// 10. CTA             — conversion: start tonight, ship tomorrow

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBand />
      <QuickStart />
      <CostCalculator />
      <ArchitectureVisual />
      <FeaturesShowcase />
      <Comparison />
      <ProductGrid />
      <PersonaRouter />
      <CTA />
      <FloatingCTA />
    </>
  );
}
