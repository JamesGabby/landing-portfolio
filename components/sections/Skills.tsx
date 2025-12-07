"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { skills } from "@/lib/data/about";

// Skill Bar Component
const SkillBar = ({
  name,
  level,
  index,
  color,
}: {
  name: string;
  level: number;
  index: number;
  color: string;
}) => {
  const barRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(barRef, { once: true, margin: "-50px" });

  return (
    <div ref={barRef} className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">{name}</span>
        <span className="text-sm text-muted-foreground">{level}%</span>
      </div>
      <div className="h-2 bg-card border border-border rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
          className={cn(
            "h-full rounded-full",
            color === "primary"
              ? "bg-gradient-to-r from-primary to-primary-hover"
              : "bg-gradient-to-r from-accent to-accent-hover"
          )}
        />
      </div>
    </div>
  );
};

// Skill Category Card
const SkillCategory = ({
  category,
  index,
}: {
  category: (typeof skills)[0];
  index: number;
}) => {
  const Icon = category.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="p-6 bg-card border border-border rounded-2xl hover:border-primary/30 transition-colors duration-300"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div
          className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center",
            category.color === "primary"
              ? "bg-primary/10 text-primary"
              : "bg-accent/10 text-accent"
          )}
        >
          <Icon className="w-5 h-5" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">
          {category.category}
        </h3>
      </div>

      {/* Skills */}
      <div className="space-y-4">
        {category.items.map((skill, skillIndex) => (
          <SkillBar
            key={skill.name}
            name={skill.name}
            level={skill.level}
            index={skillIndex}
            color={category.color}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default function Skills() {
  return (
    <section className="py-16 lg:py-24 relative">
      <div className="section-padding">
        <div className="container-custom">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Technical Skills
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A snapshot of my technical expertise across frontend, backend,
              design, and more.
            </p>
          </motion.div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {skills.map((category, index) => (
              <SkillCategory
                key={category.category}
                category={category}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}