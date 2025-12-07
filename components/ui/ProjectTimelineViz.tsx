"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { timeline } from "@/lib/data/process";

type ProjectType = keyof typeof timeline;

export default function ProjectTimelineViz() {
  const [selectedType, setSelectedType] = useState<ProjectType>("landing");

  const projectTypes: { key: ProjectType; label: string }[] = [
    { key: "landing", label: "Landing Page" },
    { key: "website", label: "Multi-page Website" },
    { key: "application", label: "Web Application" },
  ];

  const currentTimeline = timeline[selectedType];
  const totalDays = currentTimeline.phases.reduce((sum, p) => sum + p.days, 0);

  return (
    <div className="space-y-8">
      {/* Project type selector */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {projectTypes.map((type) => (
          <button
            key={type.key}
            onClick={() => setSelectedType(type.key)}
            className={cn(
              "px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300",
              selectedType === type.key
                ? "bg-primary text-white shadow-glow-sm"
                : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
            )}
          >
            {type.label}
          </button>
        ))}
      </div>

      {/* Timeline header */}
      <motion.div
        key={selectedType}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h4 className="text-xl font-semibold text-foreground mb-1">
          {currentTimeline.name}
        </h4>
        <p className="text-muted-foreground">
          Estimated duration:{" "}
          <span className="text-primary font-medium">
            {currentTimeline.duration}
          </span>
        </p>
      </motion.div>

      {/* Timeline visualization */}
      <motion.div
        key={`timeline-${selectedType}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative"
      >
        {/* Timeline bar */}
        <div className="relative h-16 bg-card border border-border rounded-2xl overflow-hidden">
          <div className="absolute inset-0 flex">
            {currentTimeline.phases.map((phase, index) => {
              const widthPercent = (phase.days / totalDays) * 100;
              const colors = [
                "bg-primary/80",
                "bg-accent/80",
                "bg-primary/60",
                "bg-accent/60",
                "bg-primary/40",
                "bg-accent/40",
              ];

              return (
                <motion.div
                  key={phase.name}
                  initial={{ width: 0 }}
                  animate={{ width: `${widthPercent}%` }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={cn(
                    "relative h-full flex items-center justify-center border-r border-background/20 last:border-r-0",
                    colors[index % colors.length]
                  )}
                >
                  {/* Phase name - only show on larger segments */}
                  {widthPercent > 10 && (
                    <span className="text-xs font-medium text-white truncate px-2">
                      {phase.name}
                    </span>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Phase labels below */}
        <div className="flex mt-4">
          {currentTimeline.phases.map((phase, index) => {
            const widthPercent = (phase.days / totalDays) * 100;

            return (
              <motion.div
                key={phase.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                style={{ width: `${widthPercent}%` }}
                className="text-center px-1"
              >
                <p className="text-xs font-medium text-foreground truncate">
                  {phase.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {phase.days} {phase.days === 1 ? "day" : "days"}
                </p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary" />
          <span className="text-muted-foreground">Planning & Design</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-accent" />
          <span className="text-muted-foreground">Development & Launch</span>
        </div>
      </div>
    </div>
  );
}