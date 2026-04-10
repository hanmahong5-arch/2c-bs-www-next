import { Hero } from "@/components/hero";
import { TrustBand } from "@/components/trust-band";
import { PersonaRouter } from "@/components/persona-router";
import { FeaturesShowcase } from "@/components/features-showcase";
import { ArchitectureVisual } from "@/components/architecture-visual";
import { Comparison } from "@/components/comparison";
import { ProductGrid } from "@/components/product-grid";
import { CTA } from "@/components/cta";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBand />
      <PersonaRouter />
      <FeaturesShowcase />
      <ArchitectureVisual />
      <Comparison />
      <ProductGrid />
      <CTA />
    </>
  );
}
