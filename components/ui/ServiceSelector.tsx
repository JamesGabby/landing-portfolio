"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { servicesWithDetails } from "@/lib/data/services";
import Button from "@/components/ui/Button";

export default function ServiceSelector() {
  const [selectedService, setSelectedService] = useState(servicesWithDetails[0]);

  return (
    <div className="grid lg:grid-cols-12 gap-8 items-start">
      {/* Service tabs */}
      <div className="lg:col-span-4 space-y-2">
        {servicesWithDetails.map((service) => {
          const Icon = service.icon;
          const isSelected = selectedService.id === service.id;

          return (
            <motion.button
              key={service.id}
              onClick={() => setSelectedService(service)}
              whileHover={{ x: 4 }}
              className={cn(
                "w-full flex items-center gap-4 p-4 rounded-2xl text-left transition-all duration-300",
                isSelected
                  ? "bg-primary/10 border border-primary/30"
                  : "bg-card border border-border hover:border-primary/20"
              )}
            >
              <div
                className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0",
                  isSelected
                    ? service.color === "primary"
                      ? "bg-primary text-white"
                      : "bg-accent text-background"
                    : service.color === "primary"
                    ? "bg-primary/10 text-primary"
                    : "bg-accent/10 text-accent"
                )}
              >
                <Icon className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <div
                  className={cn(
                    "font-medium truncate",
                    isSelected ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {service.title}
                </div>
                {service.popular && (
                  <span className="text-xs text-primary">Most Requested</span>
                )}
              </div>
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-6 h-6 rounded-full bg-primary flex items-center justify-center"
                >
                  <Check className="w-4 h-4 text-white" />
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Service details */}
      <div className="lg:col-span-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedService.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-card border border-border rounded-3xl p-8"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {selectedService.title}
                </h3>
                <p className="text-muted-foreground">
                  {selectedService.description}
                </p>
              </div>
              {selectedService.details && (
                <span className="text-sm text-muted-foreground whitespace-nowrap ml-4">
                  {selectedService.details.timeline}
                </span>
              )}
            </div>

            {/* Features */}
            <div className="mb-8">
              <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
                What's Included
              </h4>
              <ul className="grid sm:grid-cols-2 gap-3">
                {selectedService.features.map((feature, i) => (
                  <motion.li
                    key={feature}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-3"
                  >
                    <div
                      className={cn(
                        "w-5 h-5 rounded-full flex items-center justify-center",
                        selectedService.color === "primary"
                          ? "bg-primary/10 text-primary"
                          : "bg-accent/10 text-accent"
                      )}
                    >
                      <Check className="w-3 h-3" />
                    </div>
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Process */}
            {selectedService.details && (
              <div className="mb-8">
                <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
                  My Process
                </h4>
                <ol className="space-y-3">
                  {selectedService.details.process.map((step, i) => (
                    <motion.li
                      key={step}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + i * 0.05 }}
                      className="flex items-start gap-4"
                    >
                      <span
                        className={cn(
                          "w-7 h-7 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0",
                          selectedService.color === "primary"
                            ? "bg-primary/10 text-primary"
                            : "bg-accent/10 text-accent"
                        )}
                      >
                        {i + 1}
                      </span>
                      <span className="text-sm text-muted-foreground pt-1">
                        {step}
                      </span>
                    </motion.li>
                  ))}
                </ol>
              </div>
            )}

            {/* Deliverables */}
            {selectedService.details && (
              <div className="mb-8 p-6 bg-background/50 rounded-2xl">
                <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
                  Deliverables
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedService.details.deliverables.map((item, i) => (
                    <motion.span
                      key={item}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + i * 0.03 }}
                      className="px-3 py-1.5 bg-card border border-border rounded-lg text-sm text-muted-foreground"
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                rightIcon={<ArrowRight className="w-5 h-5" />}
                onClick={() => {
                  document.getElementById("contact")?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
              >
                Start This Project
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => {
                  document.getElementById("portfolio")?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
              >
                See Examples
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}