"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

const technologies = [
  {
    name: "Next.js",
    description: "React framework for production",
    color: "#000000",
    bgColor: "bg-white",
    textColor: "text-black",
    level: "Expert",
  },
  {
    name: "React",
    description: "UI component library",
    color: "#61DAFB",
    bgColor: "bg-[#61DAFB]/10",
    textColor: "text-[#61DAFB]",
    level: "Expert",
  },
  {
    name: "TypeScript",
    description: "Type-safe JavaScript",
    color: "#3178C6",
    bgColor: "bg-[#3178C6]/10",
    textColor: "text-[#3178C6]",
    level: "Expert",
  },
  {
    name: "Tailwind CSS",
    description: "Utility-first CSS framework",
    color: "#06B6D4",
    bgColor: "bg-[#06B6D4]/10",
    textColor: "text-[#06B6D4]",
    level: "Expert",
  },
  {
    name: "Supabase",
    description: "Open source Firebase alternative",
    color: "#3ECF8E",
    bgColor: "bg-[#3ECF8E]/10",
    textColor: "text-[#3ECF8E]",
    level: "Advanced",
  },
  {
    name: "Framer Motion",
    description: "Animation library for React",
    color: "#FF0055",
    bgColor: "bg-[#FF0055]/10",
    textColor: "text-[#FF0055]",
    level: "Advanced",
  },
  {
    name: "PostgreSQL",
    description: "Relational database",
    color: "#4169E1",
    bgColor: "bg-[#4169E1]/10",
    textColor: "text-[#4169E1]",
    level: "Advanced",
  },
  {
    name: "Vercel",
    description: "Deployment platform",
    color: "#ffffff",
    bgColor: "bg-white/10",
    textColor: "text-white",
    level: "Expert",
  },
];

// Tech Card Component
const TechCard = ({
  tech,
  index,
}: {
  tech: (typeof technologies)[0];
  index: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      <div
        className={cn(
          "relative p-6 bg-card border border-border rounded-2xl overflow-hidden transition-all duration-300",
          "hover:border-primary/30 hover:shadow-lg"
        )}
      >
        {/* Hover glow effect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at center, ${tech.color}15 0%, transparent 70%)`,
          }}
        />

        <div className="relative z-10">
          {/* Icon placeholder - you can replace with actual logos */}
          <div
            className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center mb-4 font-bold text-lg transition-transform duration-300 group-hover:scale-110",
              tech.bgColor,
              tech.textColor
            )}
          >
            {tech.name.substring(0, 2)}
          </div>

          {/* Name & Level */}
          <div className="flex items-start justify-between mb-2">
            <h4 className="font-semibold text-foreground">{tech.name}</h4>
            <span
              className={cn(
                "text-xs px-2 py-0.5 rounded-full",
                tech.level === "Expert"
                  ? "bg-success/10 text-success"
                  : "bg-primary/10 text-primary"
              )}
            >
              {tech.level}
            </span>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground">{tech.description}</p>
        </div>
      </div>
    </motion.div>
  );
};

// Floating orbit animation
const OrbitingTech = () => {
  const orbitItems = technologies.slice(0, 6);

  return (
    <div className="relative w-80 h-80 mx-auto">
      {/* Center element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center z-10">
        <span className="text-white font-bold text-lg">JG</span>
      </div>

      {/* Orbit rings */}
      <div className="absolute inset-0 rounded-full border border-border/30" />
      <div className="absolute inset-8 rounded-full border border-border/20" />

      {/* Orbiting items */}
      {orbitItems.map((tech, index) => {
        const angle = (index / orbitItems.length) * 360;
        const radius = 140;

        return (
          <motion.div
            key={tech.name}
            animate={{
              rotate: [angle, angle + 360],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: 0,
              height: 0,
            }}
          >
            <motion.div
              animate={{
                rotate: [-angle, -angle - 360],
              }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                transform: `translate(-50%, -50%) translateX(${radius}px)`,
              }}
              className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center text-xs font-bold border border-border shadow-lg",
                tech.bgColor,
                tech.textColor
              )}
            >
              {tech.name.substring(0, 2)}
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default function TechStack() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true });

  return (
    <section
      id="stack"
      ref={sectionRef}
      className="py-16 lg:py-24 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[128px]" />

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
              My Tech Stack
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The modern tools and technologies I use to build fast, scalable,
              and beautiful web experiences.
            </p>
          </motion.div>

          {/* Two column layout */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left - Orbiting animation (hidden on mobile) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="hidden lg:block"
            >
              <OrbitingTech />
            </motion.div>

            {/* Right - Tech grid */}
            <div className="grid grid-cols-2 gap-4">
              {technologies.map((tech, index) => (
                <TechCard key={tech.name} tech={tech} index={index} />
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-16 text-center"
          >
            <p className="text-muted-foreground mb-4">
              Need a different technology? I'm always learning and adapting.
            </p>
            <a
              href="#contact"
              className="text-primary hover:text-primary-hover font-medium inline-flex items-center gap-2 transition-colors"
            >
              Let's discuss your requirements
              <span>→</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}