"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/motion";

interface SectionProps {
  id?: string;
  title?: string;
  highlight?: string; // gradient gold part
  description?: string;
  children: React.ReactNode;
  className?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "full";
  divider?: boolean;
}

const maxWidthMap = {
  sm: "max-w-3xl",
  md: "max-w-4xl",
  lg: "max-w-5xl",
  xl: "max-w-7xl",
  full: "",
};

/**
 * Reusable section layout primitive.
 * Handles: section wrapper, heading, description, max-width, divider, scroll target.
 */
export function Section({
  id,
  title,
  highlight,
  description,
  children,
  className = "",
  maxWidth = "xl",
  divider = false,
}: SectionProps) {
  return (
    <section id={id} className={`py-24 scroll-mt-20 ${className}`}>
      {divider && <div className="section-divider mb-24" />}

      <div className={`mx-auto ${maxWidthMap[maxWidth]} px-6`}>
        {(title || highlight) && (
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">
              {highlight && (
                <span className="text-gradient-gold">{highlight}</span>
              )}
              {highlight && title && " "}
              {title && (
                <span className="text-[var(--color-text-primary)]">
                  {title}
                </span>
              )}
            </h2>
            {description && (
              <p className="mt-4 text-[var(--color-text-secondary)] max-w-xl mx-auto">
                {description}
              </p>
            )}
          </motion.div>
        )}

        {children}
      </div>
    </section>
  );
}
