"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

const stats = [
  {
    value: 50,
    suffix: "+",
    label: "Projects Completed",
  },
  {
    value: 5,
    suffix: "+",
    label: "Years Experience",
  },
  {
    value: 30,
    suffix: "+",
    label: "Happy Clients",
  },
  {
    value: 100,
    suffix: "%",
    label: "Satisfaction Rate",
  },
];

export default function StatsBand() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <section ref={containerRef} className="py-16 lg:py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10" />
      
      {/* Animated background pattern */}
      <motion.div
        style={{ x }}
        className="absolute inset-0 bg-grid opacity-30"
      />

      <div className="relative section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2">
                  <span className="text-gradient">
                    {isInView ? (
                      <AnimatedCounter
                        value={stat.value}
                        suffix={stat.suffix}
                        duration={2}
                      />
                    ) : (
                      `0${stat.suffix}`
                    )}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm md:text-base">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}