"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  MessageSquare,
  Calendar,
  Clock,
  CheckCircle,
  Shield,
  RefreshCw,
  HeartHandshake,
  FileCheck,
  Zap,
  Check,
  X,
  Video,
  ExternalLink,
  HelpCircle,
  Plus,
  Minus,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { processSteps, processFeatures, faqs, timeline } from "@/lib/data/process";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";

// ============================================
// PROCESS FEATURES GRID
// ============================================
const ProcessFeatures = () => (
  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
    {processFeatures.map((feature, index) => {
      const Icon = feature.icon;
      return (
        <motion.div
          key={feature.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className="flex items-start gap-4 p-5 bg-card border border-border rounded-2xl hover:border-primary/30 transition-colors duration-300"
        >
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Icon className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-1">{feature.title}</h4>
            <p className="text-sm text-muted-foreground">{feature.description}</p>
          </div>
        </motion.div>
      );
    })}
  </div>
);

// ============================================
// VIEW MODE TOGGLE
// ============================================
const ViewToggle = ({
  view,
  setView,
}: {
  view: "timeline" | "cards" | "accordion";
  setView: (view: "timeline" | "cards" | "accordion") => void;
}) => (
  <div className="flex items-center justify-center gap-2 mb-12">
    {[
      { key: "timeline", label: "Timeline" },
      { key: "cards", label: "Cards" },
      { key: "accordion", label: "Steps" },
    ].map((item) => (
      <button
        key={item.key}
        onClick={() => setView(item.key as typeof view)}
        className={cn(
          "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300",
          view === item.key
            ? "bg-primary text-white"
            : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
        )}
      >
        {item.label}
      </button>
    ))}
  </div>
);

// ============================================
// PROCESS TIMELINE VIEW
// ============================================
const ProcessTimeline = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="relative">
      {/* Horizontal timeline for desktop */}
      <div className="hidden lg:block">
        {/* Timeline track */}
        <div className="relative h-2 bg-border rounded-full mb-12">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${((activeStep + 1) / processSteps.length) * 100}%` }}
            transition={{ duration: 0.5 }}
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-accent rounded-full"
          />

          {/* Step indicators on timeline */}
          <div className="absolute inset-0 flex items-center justify-between px-4">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index <= activeStep;
              const isCurrent = index === activeStep;

              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(index)}
                  className="relative group"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 -mt-5",
                      isCurrent
                        ? "bg-primary text-white scale-125 shadow-glow"
                        : isActive
                        ? "bg-primary/80 text-white"
                        : "bg-card border-2 border-border text-muted-foreground group-hover:border-primary/50"
                    )}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.div>

                  {/* Step label */}
                  <div
                    className={cn(
                      "absolute top-16 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm transition-colors duration-300",
                      isCurrent
                        ? "text-foreground font-medium"
                        : "text-muted-foreground"
                    )}
                  >
                    {step.shortTitle}
                  </div>

                  {/* Tooltip on hover */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-card border border-border rounded-lg text-xs text-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    {step.duration}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active step content */}
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-16 grid md:grid-cols-2 gap-8 items-center"
        >
          {/* Left - Details */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span
                className={cn(
                  "text-sm font-medium px-3 py-1 rounded-full",
                  processSteps[activeStep].color === "primary"
                    ? "bg-primary/10 text-primary"
                    : "bg-accent/10 text-accent"
                )}
              >
                Step {processSteps[activeStep].step} of {processSteps.length}
              </span>
              <span className="text-sm text-muted-foreground">
                {processSteps[activeStep].duration}
              </span>
            </div>

            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              {processSteps[activeStep].title}
            </h3>

            <p className="text-muted-foreground mb-6 leading-relaxed">
              {processSteps[activeStep].description}
            </p>

            {/* Deliverables */}
            <div>
              <p className="text-sm font-medium text-foreground mb-3">
                Deliverables:
              </p>
              <ul className="space-y-2">
                {processSteps[activeStep].deliverables.map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div
                      className={cn(
                        "w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0",
                        processSteps[activeStep].color === "primary"
                          ? "bg-primary/10 text-primary"
                          : "bg-accent/10 text-accent"
                      )}
                    >
                      <Check className="w-3 h-3" />
                    </div>
                    <span className="text-muted-foreground">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right - Visual */}
          <div className="relative">
            <ProcessStepVisual step={processSteps[activeStep]} />
          </div>
        </motion.div>

        {/* Navigation buttons */}
        <div className="flex items-center justify-center gap-4 mt-12">
          <button
            onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
            disabled={activeStep === 0}
            className={cn(
              "px-4 py-2 rounded-lg border transition-all duration-300",
              activeStep === 0
                ? "border-border text-muted opacity-50 cursor-not-allowed"
                : "border-border text-foreground hover:border-primary/50 hover:bg-card"
            )}
          >
            Previous
          </button>
          <div className="flex items-center gap-2">
            {processSteps.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveStep(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  index === activeStep
                    ? "w-6 bg-primary"
                    : "bg-border hover:bg-muted"
                )}
              />
            ))}
          </div>
          <button
            onClick={() =>
              setActiveStep(Math.min(processSteps.length - 1, activeStep + 1))
            }
            disabled={activeStep === processSteps.length - 1}
            className={cn(
              "px-4 py-2 rounded-lg border transition-all duration-300",
              activeStep === processSteps.length - 1
                ? "border-border text-muted opacity-50 cursor-not-allowed"
                : "border-border text-foreground hover:border-primary/50 hover:bg-card"
            )}
          >
            Next
          </button>
        </div>
      </div>

      {/* Vertical timeline for mobile/tablet */}
      <div className="lg:hidden space-y-0">
        {processSteps.map((step, index) => {
          const Icon = step.icon;
          const isLast = index === processSteps.length - 1;

          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative pl-12 pb-8"
            >
              {/* Vertical line */}
              {!isLast && (
                <div className="absolute left-[18px] top-12 bottom-0 w-0.5 bg-border" />
              )}

              {/* Step icon */}
              <div
                className={cn(
                  "absolute left-0 top-0 w-10 h-10 rounded-full flex items-center justify-center",
                  step.color === "primary"
                    ? "bg-primary text-white"
                    : "bg-accent text-background"
                )}
              >
                <Icon className="w-5 h-5" />
              </div>

              {/* Content */}
              <div className="bg-card border border-border rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs text-muted-foreground">
                    Step {step.step}
                  </span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">
                    {step.duration}
                  </span>
                </div>
                <h4 className="font-semibold text-foreground mb-2">
                  {step.title}
                </h4>
                <p className="text-sm text-muted-foreground mb-4">
                  {step.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {step.deliverables.map((item) => (
                    <span
                      key={item}
                      className="px-2 py-1 text-xs bg-background border border-border rounded text-muted-foreground"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

// Visual component for each step
const ProcessStepVisual = ({ step }: { step: (typeof processSteps)[0] }) => {
  const Icon = step.icon;

  return (
    <div className="relative aspect-square max-w-md mx-auto">
      {/* Background glow */}
      <div
        className={cn(
          "absolute inset-0 rounded-3xl blur-3xl opacity-20",
          step.color === "primary" ? "bg-primary" : "bg-accent"
        )}
      />

      {/* Main visual container */}
      <div className="relative h-full bg-card border border-border rounded-3xl p-8 flex items-center justify-center overflow-hidden">
        {/* Grid background */}
        <div className="absolute inset-0 bg-grid opacity-30" />

        {/* Animated elements */}
        <div className="relative text-center">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className={cn(
              "w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-6",
              step.color === "primary"
                ? "bg-primary/20 text-primary"
                : "bg-accent/20 text-accent"
            )}
          >
            <Icon className="w-12 h-12" />
          </motion.div>

          <h4 className="text-xl font-semibold text-foreground mb-2">
            {step.shortTitle}
          </h4>
          <p className="text-muted-foreground text-sm">{step.duration}</p>
        </div>

        {/* Decorative floating elements */}
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-8 right-8 w-8 h-8 rounded-lg bg-primary/10 border border-primary/20"
        />
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-8 left-8 w-6 h-6 rounded-full bg-accent/10 border border-accent/20"
        />
      </div>
    </div>
  );
};

// ============================================
// PROCESS CARDS VIEW
// ============================================
const ProcessCardsView = () => (
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
    {processSteps.map((step, index) => {
      const Icon = step.icon;
      return (
        <motion.div
          key={step.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="group relative bg-card border border-border rounded-2xl p-6 hover:border-primary/30 transition-all duration-300"
        >
          {/* Step number */}
          <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold shadow-lg">
            {step.step}
          </div>

          {/* Icon */}
          <div
            className={cn(
              "w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110",
              step.color === "primary"
                ? "bg-primary/10 text-primary"
                : "bg-accent/10 text-accent"
            )}
          >
            <Icon className="w-7 h-7" />
          </div>

          {/* Content */}
          <div className="flex items-center gap-2 mb-2">
            <h4 className="font-semibold text-foreground">{step.title}</h4>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{step.duration}</span>
          </div>

          <p className="text-sm text-muted-foreground mb-5 line-clamp-3">
            {step.description}
          </p>

          {/* Deliverables */}
          <div className="space-y-2">
            {step.deliverables.map((item) => (
              <div key={item} className="flex items-center gap-2">
                <CheckCircle
                  className={cn(
                    "w-4 h-4 flex-shrink-0",
                    step.color === "primary" ? "text-primary" : "text-accent"
                  )}
                />
                <span className="text-xs text-muted-foreground">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
      );
    })}
  </div>
);

// ============================================
// PROCESS ACCORDION VIEW
// ============================================
const ProcessAccordionView = () => {
  const [activeStep, setActiveStep] = useState<number | null>(0);

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {processSteps.map((step, index) => {
        const Icon = step.icon;
        const isActive = activeStep === index;

        return (
          <motion.div
            key={step.id}
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
            {/* Header */}
            <button
              onClick={() => setActiveStep(isActive ? null : index)}
              className="w-full flex items-center gap-4 p-6 text-left"
            >
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
                <h4 className="text-lg font-semibold text-foreground">
                  {step.title}
                </h4>
              </div>

              <motion.div
                animate={{ rotate: isActive ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="flex-shrink-0 text-muted-foreground"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </motion.div>
            </button>

            {/* Content */}
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
          </motion.div>
        );
      })}
    </div>
  );
};

// ============================================
// PROJECT TIMELINE VISUALIZATION
// ============================================
type ProjectType = keyof typeof timeline;

const ProjectTimelineViz = () => {
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
                  {widthPercent > 12 && (
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
};

// ============================================
// FAQ ACCORDION
// ============================================
const FAQAccordion = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.05 }}
          className={cn(
            "border rounded-2xl overflow-hidden transition-colors duration-300",
            openIndex === index
              ? "border-primary/30 bg-primary/5"
              : "border-border bg-card hover:border-primary/20"
          )}
        >
          {/* Question header */}
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full flex items-center justify-between gap-4 p-6 text-left"
          >
            <div className="flex items-start gap-4">
              <div
                className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-300",
                  openIndex === index
                    ? "bg-primary text-white"
                    : "bg-primary/10 text-primary"
                )}
              >
                <HelpCircle className="w-4 h-4" />
              </div>
              <span
                className={cn(
                  "font-medium transition-colors duration-300 text-foreground"
                )}
              >
                {faq.question}
              </span>
            </div>

            <motion.div
              animate={{ rotate: openIndex === index ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-300",
                openIndex === index
                  ? "bg-primary text-white"
                  : "bg-card border border-border text-muted-foreground"
              )}
            >
              {openIndex === index ? (
                <Minus className="w-4 h-4" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
            </motion.div>
          </button>

          {/* Answer content */}
          {openIndex === index && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="px-6 pb-6">
                <div className="pl-12 text-muted-foreground leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      ))}
    </div>
  );
};

// ============================================
// PROCESS COMPARISON TABLE
// ============================================
const comparisons = [
  {
    aspect: "Communication",
    typical: "Weekly emails if lucky",
    myWay: "Daily updates + weekly video calls",
  },
  {
    aspect: "Timeline",
    typical: "Unclear, often delayed",
    myWay: "Fixed timeline with milestone tracking",
  },
  {
    aspect: "Revisions",
    typical: "Limited, extra charges",
    myWay: "Unlimited until you're happy",
  },
  {
    aspect: "Process",
    typical: "Black box, surprises",
    myWay: "Transparent, you're involved at every step",
  },
  {
    aspect: "Post-launch",
    typical: "Ghost after payment",
    myWay: "Support period included + ongoing availability",
  },
  {
    aspect: "Code Quality",
    typical: "Works, but messy",
    myWay: "Clean, documented, maintainable",
  },
];

const ProcessComparison = () => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="overflow-x-auto"
  >
    <table className="w-full min-w-[600px]">
      <thead>
        <tr>
          <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">
            Aspect
          </th>
          <th className="text-left py-4 px-4">
            <div className="flex items-center gap-2">
              <X className="w-5 h-5 text-red-500" />
              <span className="text-sm font-medium text-muted-foreground">
                Typical Experience
              </span>
            </div>
          </th>
          <th className="text-left py-4 px-4 bg-primary/5 rounded-t-xl">
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-success" />
              <span className="text-sm font-medium text-foreground">
                Working With Me
              </span>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        {comparisons.map((row, index) => (
          <motion.tr
            key={row.aspect}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="border-t border-border"
          >
            <td className="py-4 px-4 font-medium text-foreground">
              {row.aspect}
            </td>
            <td className="py-4 px-4 text-muted-foreground text-sm">
              {row.typical}
            </td>
            <td className="py-4 px-4 bg-primary/5 text-foreground text-sm font-medium">
              {row.myWay}
            </td>
          </motion.tr>
        ))}
      </tbody>
    </table>
  </motion.div>
);

// ============================================
// GUARANTEE SECTION
// ============================================
const guarantees = [
  {
    icon: Shield,
    title: "100% Satisfaction Guarantee",
    description:
      "I'll keep refining until you're completely happy with the result. Your satisfaction is my top priority.",
    color: "primary",
  },
  {
    icon: RefreshCw,
    title: "Unlimited Revisions",
    description:
      "Within the project scope, I offer unlimited revisions. No nickel and diming for small changes.",
    color: "accent",
  },
  {
    icon: Clock,
    title: "On-Time Delivery",
    description:
      "I respect your timeline. If I commit to a deadline, I deliver on time—or I'll let you know well in advance.",
    color: "primary",
  },
  {
    icon: HeartHandshake,
    title: "Transparent Communication",
    description:
      "No surprises. You'll always know the project status, and I'm just a message away for any questions.",
    color: "accent",
  },
];

const GuaranteeSection = () => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="relative overflow-hidden rounded-3xl bg-card border border-border p-8 md:p-12"
  >
    {/* Background decoration */}
    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px]" />
    <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-[100px]" />

    <div className="relative">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-success/10 rounded-full text-success text-sm font-medium mb-4">
          <Shield className="w-4 h-4" />
          My Guarantees
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
          Work with confidence
        </h3>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          I stand behind my work with these promises to every client.
        </p>
      </div>

      {/* Guarantees grid */}
      <div className="grid sm:grid-cols-2 gap-6">
        {guarantees.map((guarantee, index) => {
          const Icon = guarantee.icon;
          return (
            <motion.div
              key={guarantee.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex gap-4 p-6 bg-background border border-border rounded-2xl hover:border-primary/30 transition-colors duration-300"
            >
              <div
                className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0",
                  guarantee.color === "primary"
                    ? "bg-primary/10 text-primary"
                    : "bg-accent/10 text-accent"
                )}
              >
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">
                  {guarantee.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {guarantee.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  </motion.div>
);

// ============================================
// BOOKING CALENDAR
// ============================================
const meetingInfo = {
  duration: "30 minutes",
  type: "Video Call (Google Meet/Zoom)",
  topics: [
    "Discuss your project requirements",
    "Review your goals and timeline",
    "Answer any questions you have",
    "Provide a preliminary quote",
  ],
};

const BookingCalendar = ({
  calendarUrl = "https://calendly.com/jamesgabbitus",
}: {
  calendarUrl?: string;
}) => (
  <div className="bg-card border border-border rounded-2xl overflow-hidden">
    {/* Header */}
    <div className="p-6 border-b border-border">
      <h3 className="text-xl font-semibold text-foreground mb-2">
        Book a Discovery Call
      </h3>
      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          <span>{meetingInfo.duration}</span>
        </div>
        <div className="flex items-center gap-2">
          <Video className="w-4 h-4" />
          <span>{meetingInfo.type}</span>
        </div>
      </div>
    </div>

    <div className="grid md:grid-cols-2">
      {/* Left - What we'll discuss */}
      <div className="p-6 border-b md:border-b-0 md:border-r border-border">
        <h4 className="text-sm font-medium text-foreground mb-4">
          What we'll discuss:
        </h4>
        <ul className="space-y-3">
          {meetingInfo.topics.map((topic, index) => (
            <li key={index} className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
              <span className="text-sm text-muted-foreground">{topic}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Right - CTA */}
      <div className="p-6 flex flex-col justify-center items-center text-center">
        <Calendar className="w-16 h-16 text-primary/30 mb-4" />
        <p className="text-muted-foreground mb-6">
          Choose a time that works best for you
        </p>
        <Button
          size="lg"
          rightIcon={<ExternalLink className="w-4 h-4" />}
          onClick={() => window.open(calendarUrl, "_blank")}
        >
          Open Calendar
        </Button>
        <p className="text-xs text-muted-foreground mt-4">
          Free • No obligation • 30 minutes
        </p>
      </div>
    </div>
  </div>
);

// ============================================
// PROCESS CTA SECTION
// ============================================
const ProcessCTA = () => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 via-card to-accent/10 border border-primary/20 p-8 md:p-12 text-center"
  >
    {/* Background decorations */}
    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px]" />
    <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-[100px]" />

    <div className="relative">
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 rounded-full text-primary text-sm font-medium mb-6">
        <Calendar className="w-4 h-4" />
        Book your free discovery call
      </div>

      <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
        Ready to start your project?
      </h3>

      <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
        Let's discuss your vision and see how I can help bring your AI startup's
        landing page to life. No commitment required.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Button
          size="lg"
          rightIcon={<ArrowRight className="w-5 h-5" />}
          onClick={() => {
            document.getElementById("contact")?.scrollIntoView({
              behavior: "smooth",
            });
          }}
        >
          Start Your Project
        </Button>
        <Button
          variant="secondary"
          size="lg"
          leftIcon={<MessageSquare className="w-5 h-5" />}
          onClick={() => {
            window.open("https://calendly.com/jamesgabbitus", "_blank");
          }}
        >
          Schedule a Call
        </Button>
      </div>

      {/* Quick info */}
      <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-success" />
          <span>Free consultation</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-success" />
          <span>No obligation</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-success" />
          <span>Response within 24h</span>
        </div>
      </div>
    </div>
  </motion.div>
);

// ============================================
// MAIN PROCESS COMPONENT
// ============================================
export default function Process() {
  const [view, setView] = useState<"timeline" | "cards" | "accordion">("timeline");

  return (
    <section id="process" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[128px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[128px]" />

      <div className="relative section-padding">
        <div className="container-custom">
          {/* Header */}
          <SectionHeader
            badge="Process"
            badgeIcon={<Sparkles className="w-3 h-3" />}
            title="A proven process for delivering results"
            titleHighlight="proven process"
            description="Every project follows a structured approach designed to ensure quality, transparency, and your complete satisfaction."
          />

          {/* Process Features */}
          <ProcessFeatures />

          {/* View Toggle */}
          <ViewToggle view={view} setView={setView} />

          {/* Process Steps - different views */}
          <div className="mb-20">
            {view === "timeline" && <ProcessTimeline />}
            {view === "cards" && <ProcessCardsView />}
            {view === "accordion" && <ProcessAccordionView />}
          </div>

          {/* Project Timeline Visualization */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-20"
          >
            <div className="text-center mb-10">
              <h3 className="text-2xl font-bold text-foreground mb-3">
                How long will your project take?
              </h3>
              <p className="text-muted-foreground">
                Select your project type to see an estimated timeline
              </p>
            </div>
            <div className="max-w-3xl mx-auto">
              <ProjectTimelineViz />
            </div>
          </motion.div>

          {/* Process Comparison */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-20"
          >
            <div className="text-center mb-10">
              <h3 className="text-2xl font-bold text-foreground mb-3">
                Working with me vs. typical freelancers
              </h3>
              <p className="text-muted-foreground">
                See the difference a dedicated process makes
              </p>
            </div>
            <ProcessComparison />
          </motion.div>

          {/* Guarantees */}
          <div className="mb-20">
            <GuaranteeSection />
          </div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-20"
          >
            <div className="text-center mb-10">
              <h3 className="text-2xl font-bold text-foreground mb-3">
                Frequently Asked Questions
              </h3>
              <p className="text-muted-foreground">
                Everything you need to know about working with me
              </p>
            </div>
            <div className="max-w-3xl mx-auto">
              <FAQAccordion />
            </div>
          </motion.div>

          {/* Booking Calendar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-20"
          >
            <div className="text-center mb-10">
              <h3 className="text-2xl font-bold text-foreground mb-3">
                Ready to get started?
              </h3>
              <p className="text-muted-foreground">
                Book a free discovery call to discuss your project
              </p>
            </div>
            <div className="max-w-3xl mx-auto">
              <BookingCalendar />
            </div>
          </motion.div>

          {/* CTA */}
          <ProcessCTA />
        </div>
      </div>
    </section>
  );
}