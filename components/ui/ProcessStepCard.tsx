"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { processSteps } from "@/lib/data/process";

type ProcessStep = (typeof processSteps)[0];

interface ProcessStepCardProps {
  step: ProcessStep;
  index: number;
  isActive: boolean;
  onClick: () => void;
  variant?: "default" | "compact" | "timeline";
}

export default function ProcessStepCard({
  step,
  index,
  isActive,
  onClick,
  variant = "default",
}: ProcessStepCardProps) {
  const Icon = step.icon;

  // Compact variant for mobile or sidebar
  if (variant === "compact") {
    return (
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
        onClick={onClick}
        className={cn(
          "w-full flex items-center gap-4 p-4 rounded-xl text-left transition-all duration-300",
          isActive
            ? "bg-primary/10 border border-primary/30"
            : "bg-card border border-border hover:border-primary/20"
        )}
      >
        <div
          className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300",
            isActive
              ? step.color === "primary"
                ? "bg-primary text-white"
                : "bg-accent text-background"
              : step.color === "primary"
              ? "bg-primary/10 text-primary"
              : "bg-accent/10 text-accent"
          )}
        >
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">
              Step {step.step}
            </span>
            <span className="text-xs text-muted-foreground">•</span>
            <span className="text-xs text-muted-foreground">{step.duration}</span>
          </div>
          <p
            className={cn(
              "font-medium truncate",
              isActive ? "text-foreground" : "text-muted-foreground"
            )}
          >
            {step.title}
          </p>
        </div>
        {isActive && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0"
          >
            <Check className="w-4 h-4 text-white" />
          </motion.div>
        )}
      </motion.button>
    );
  }

  // Timeline variant
  if (variant === "timeline") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="relative pl-8 pb-12 last:pb-0"
      >
        {/* Timeline line */}
        <div className="absolute left-[11px] top-0 bottom-0 w-0.5 bg-border" />

        {/* Timeline dot */}
        <div
          className={cn(
            "absolute left-0 top-0 w-6 h-6 rounded-full border-4 border-background flex items-center justify-center",
            step.color === "primary" ? "bg-primary" : "bg-accent"
          )}
        >
          <span className="text-[10px] font-bold text-white">{step.step}</span>
        </div>

        {/* Content */}
        <div className="bg-card border border-border rounded-2xl p-6 ml-4 hover:border-primary/30 transition-colors duration-300">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center",
                  step.color === "primary"
                    ? "bg-primary/10 text-primary"
                    : "bg-accent/10 text-accent"
                )}
              >
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">{step.title}</h4>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  {step.duration}
                </div>
              </div>
            </div>
          </div>

          <p className="text-muted-foreground text-sm mb-4">{step.description}</p>

          <div className="space-y-2">
            <p className="text-xs font-medium text-foreground uppercase tracking-wider">
              Deliverables
            </p>
            <ul className="flex flex-wrap gap-2">
              {step.deliverables.map((item) => (
                <li
                  key={item}
                  className="px-2 py-1 text-xs bg-background border border-border rounded-md text-muted-foreground"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    );
  }

  // Default expandable variant
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn(
        "border rounded-2xl overflow-hidden transition-all duration-300",
        isActive
          ? "border-primary/30 bg-card"
          : "border-border bg-card hover:border-primary/20"
      )}
    >
      {/* Header - clickable */}
      <button
        onClick={onClick}
        className="w-full flex items-center gap-4 p-6 text-left"
      >
        {/* Step number */}
        <div
          className={cn(
            "w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-colors duration-300",
            isActive
              ? step.color === "primary"
                ? "bg-primary text-white"
                : "bg-accent text-background"
              : step.color === "primary"
              ? "bg-primary/10 text-primary"
              : "bg-accent/10 text-accent"
          )}
        >
          <Icon className="w-6 h-6" />
        </div>

        {/* Title and meta */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span
              className={cn(
                "text-xs font-medium px-2 py-0.5 rounded-full",
                step.color === "primary"
                  ? "bg-primary/10 text-primary"
                  : "bg-accent/10 text-accent"
              )}
            >
              Step {step.step}
            </span>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {step.duration}
            </span>
          </div>
          <h4 className="text-lg font-semibold text-foreground">{step.title}</h4>
        </div>

        {/* Expand icon */}
        <motion.div
          animate={{ rotate: isActive ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0 text-muted-foreground"
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </button>

      {/* Expanded content */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-6 pb-6 pt-0">
              <div className="pl-16">
                <p className="text-muted-foreground mb-6">{step.description}</p>

                <div>
                  <p className="text-sm font-medium text-foreground mb-3">
                    What you'll receive:
                  </p>
                  <ul className="grid sm:grid-cols-2 gap-2">
                    {step.deliverables.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <Check
                          className={cn(
                            "w-4 h-4 flex-shrink-0",
                            step.color === "primary"
                              ? "text-primary"
                              : "text-accent"
                          )}
                        />
                        <span className="text-sm text-muted-foreground">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}