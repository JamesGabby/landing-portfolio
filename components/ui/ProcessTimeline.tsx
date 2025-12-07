"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { processSteps } from "@/lib/data/process";

export default function ProcessTimeline() {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={containerRef} className="relative">
      {/* Horizontal timeline for desktop */}
      <div className="hidden lg:block">
        {/* Timeline track */}
        <div className="relative h-2 bg-border rounded-full mb-12">
          <motion.div
            style={{ width: progressWidth }}
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
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
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
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
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
}

// Visual component for each step
function ProcessStepVisual({ step }: { step: (typeof processSteps)[0] }) {
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

        {/* Animated elements based on step */}
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
}