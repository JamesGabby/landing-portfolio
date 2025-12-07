"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

const stats = [
  {
    value: 50,
    suffix: "+",
    label: "Projects Delivered",
    description: "For AI startups worldwide",
  },
  {
    value: 340,
    suffix: "%",
    label: "Avg. Conversion Lift",
    description: "Compared to previous sites",
  },
  {
    value: 98,
    suffix: "%",
    label: "Client Satisfaction",
    description: "Based on project feedback",
  },
  {
    value: 48,
    suffix: "h",
    label: "Avg. Response Time",
    description: "For all inquiries",
  },
];

export default function ServicesStats() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="py-12 lg:py-16"
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="text-center"
          >
            <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-2">
              {isInView ? (
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  duration={2}
                />
              ) : (
                `0${stat.suffix}`
              )}
            </div>
            <div className="text-base font-medium text-foreground mb-1">
              {stat.label}
            </div>
            <div className="text-sm text-muted-foreground">
              {stat.description}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}