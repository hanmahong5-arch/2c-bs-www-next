"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface CounterProps {
  value: string;
  label: string;
}

function parseTarget(value: string): { prefix: string; num: number; suffix: string } {
  const match = value.match(/^([<>≈]?)(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return { prefix: "", num: 0, suffix: value };
  return {
    prefix: match[1],
    num: parseFloat(match[2]),
    suffix: match[3],
  };
}

function AnimatedNumber({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!isInView) return;

    const { prefix, num, suffix } = parseTarget(value);
    if (num === 0) {
      setDisplay(value);
      return;
    }

    const duration = 1500;
    const steps = 40;
    const stepTime = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = num * eased;

      const formatted = num % 1 !== 0
        ? current.toFixed(String(num).split(".")[1]?.length || 1)
        : Math.round(current).toString();

      setDisplay(`${prefix}${formatted}${suffix}`);

      if (step >= steps) {
        clearInterval(timer);
        setDisplay(value);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return <span ref={ref}>{display}</span>;
}

export function AnimatedStat({ value, label }: CounterProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center group"
    >
      <div className="text-3xl md:text-4xl font-bold text-gradient-gold">
        <AnimatedNumber value={value} />
      </div>
      <div className="mt-1.5 text-sm text-[var(--color-text-muted)] group-hover:text-[var(--color-text-secondary)] transition-colors">
        {label}
      </div>
    </motion.div>
  );
}
