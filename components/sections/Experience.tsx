"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Briefcase, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { experience } from "@/lib/data/about";

// Timeline Item Component
const TimelineItem = ({
  item,
  index,
  isLast,
}: {
  item: (typeof experience)[0];
  index: number;
  isLast: boolean;
}) => {
  const itemRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className={cn(
        "relative grid md:grid-cols-2 gap-8 md:gap-16",
        index % 2 === 0 ? "md:text-right" : "md:flex-row-reverse"
      )}
    >
      {/* Content - Left side for even, right side for odd on desktop */}
      <div
        className={cn(
          "space-y-4",
          index % 2 === 0 ? "md:order-1" : "md:order-2 md:text-left"
        )}
      >
        {/* Period */}
        <span className="inline-block px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full">
          {item.period}
        </span>

        {/* Title & Company */}
        <div>
          <h3 className="text-xl font-bold text-foreground">{item.title}</h3>
          <p className="text-primary">{item.company}</p>
        </div>

        {/* Description */}
        <p className="text-muted-foreground">{item.description}</p>

        {/* Highlights */}
        <ul
          className={cn(
            "space-y-2",
            index % 2 === 0 ? "md:ml-auto md:text-right" : ""
          )}
        >
          {item.highlights.map((highlight, i) => (
            <li
              key={i}
              className={cn(
                "flex items-center gap-2 text-sm text-muted-foreground",
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              )}
            >
              <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Timeline line and dot */}
      <div
        className={cn(
          "hidden md:flex flex-col items-center",
          index % 2 === 0 ? "md:order-2" : "md:order-1"
        )}
      >
        {/* Dot */}
        <div className="relative z-10">
          <div className="w-12 h-12 rounded-full bg-card border-4 border-primary flex items-center justify-center">
            <Briefcase className="w-5 h-5 text-primary" />
          </div>
          {/* Ping animation */}
          {index === 0 && (
            <div className="absolute inset-0 w-12 h-12 rounded-full border-4 border-primary animate-ping opacity-20" />
          )}
        </div>

        {/* Line */}
        {!isLast && (
          <div className="w-0.5 flex-1 bg-border mt-4" />
        )}
      </div>

      {/* Mobile timeline dot */}
      <div className="absolute left-0 top-0 md:hidden">
        <div className="w-4 h-4 rounded-full bg-primary" />
        {!isLast && (
          <div className="absolute top-4 left-1.5 w-0.5 h-full bg-border" />
        )}
      </div>
    </motion.div>
  );
};

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="py-16 lg:py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-card/50" />

      <div className="relative section-padding">
        <div className="container-custom">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Professional Journey
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From agency work to freelancing, here's how I got to where I am
              today.
            </p>
          </motion.div>

          {/* Timeline */}
          <div ref={containerRef} className="relative pl-8 md:pl-0 space-y-12 md:space-y-16">
            {/* Animated line for desktop */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2">
              <motion.div
                style={{ height: lineHeight }}
                className="w-full bg-gradient-to-b from-primary to-accent"
              />
            </div>

            {/* Timeline items */}
            {experience.map((item, index) => (
              <TimelineItem
                key={item.period}
                item={item}
                index={index}
                isLast={index === experience.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}