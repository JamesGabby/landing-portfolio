"use client";

import { motion } from "framer-motion";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

const stats = [
  {
    value: 50,
    suffix: "+",
    label: "Projects Completed",
  },
  {
    value: 30,
    suffix: "+",
    label: "AI Startups Served",
  },
  {
    value: 340,
    suffix: "%",
    label: "Avg. Conversion Increase",
  },
  {
    value: 100,
    suffix: "%",
    label: "Client Satisfaction",
  },
];

export default function PortfolioStats() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-2 lg:grid-cols-4 gap-8 p-8 bg-card border border-border rounded-3xl"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="text-center"
        >
          <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">
            <AnimatedCounter
              value={stat.value}
              suffix={stat.suffix}
              duration={2}
            />
          </div>
          <div className="text-sm text-muted-foreground">{stat.label}</div>
        </motion.div>
      ))}
    </motion.div>
  );
}