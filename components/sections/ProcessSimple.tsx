"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { processSteps } from "@/lib/data/process";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";

export default function ProcessSimple() {
  return (
    <section id="process" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-30" />

      <div className="relative section-padding">
        <div className="container-custom">
          {/* Header */}
          <SectionHeader
            badge="Process"
            badgeIcon={<Sparkles className="w-3 h-3" />}
            title="How we'll work together"
            titleHighlight="work together"
            description="A simple, transparent process designed to deliver results."
          />

          {/* Steps */}
          <div className="max-w-4xl mx-auto">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              const isLast = index === processSteps.length - 1;

              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative"
                >
                  {/* Connector line */}
                  {!isLast && (
                    <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-border md:left-1/2 md:-translate-x-1/2" />
                  )}

                  <div
                    className={cn(
                      "relative flex flex-col md:flex-row gap-6 pb-12",
                      index % 2 === 1 && "md:flex-row-reverse"
                    )}
                  >
                    {/* Step number and icon */}
                    <div className="flex items-start gap-4 md:w-1/2 md:justify-end">
                      <div
                        className={cn(
                          "relative z-10 w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0",
                          step.color === "primary"
                            ? "bg-primary text-white"
                            : "bg-accent text-background"
                        )}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="md:hidden flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs text-muted-foreground">
                            Step {step.step}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            • {step.duration}
                          </span>
                        </div>
                        <h4 className="text-lg font-semibold text-foreground">
                          {step.title}
                        </h4>
                      </div>
                    </div>

                    {/* Content */}
                    <div
                      className={cn(
                        "md:w-1/2 pl-16 md:pl-0",
                        index % 2 === 0 ? "md:pr-12" : "md:pl-12"
                      )}
                    >
                      <div className="hidden md:block mb-2">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs text-muted-foreground">
                            Step {step.step}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            • {step.duration}
                          </span>
                        </div>
                        <h4 className="text-lg font-semibold text-foreground">
                          {step.title}
                        </h4>
                      </div>
                      <p className="text-muted-foreground text-sm mb-4">
                        {step.description}
                      </p>
                      <ul className="space-y-2">
                        {step.deliverables.map((item) => (
                          <li
                            key={item}
                            className="flex items-center gap-2 text-sm"
                          >
                            <CheckCircle
                              className={cn(
                                "w-4 h-4 flex-shrink-0",
                                step.color === "primary"
                                  ? "text-primary"
                                  : "text-accent"
                              )}
                            />
                            <span className="text-muted-foreground">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
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
          </motion.div>
        </div>
      </div>
    </section>
  );
}