"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Badge from "@/components/ui/Badge";

interface ServiceCardExpandedProps {
  service: {
    id: string;
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    features: string[];
    popular?: boolean;
    details?: {
      process: string[];
      deliverables: string[];
      timeline: string;
    };
  };
  index: number;
}

export default function ServiceCardExpanded({
  service,
  index,
}: ServiceCardExpandedProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const Icon = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn(
        "relative rounded-3xl border transition-all duration-500 overflow-hidden",
        service.popular
          ? "border-primary/50 bg-gradient-to-b from-primary/10 to-card"
          : "border-border bg-card hover:border-primary/30"
      )}
    >
      {/* Popular badge */}
      {service.popular && (
        <div className="absolute top-4 right-4 z-10">
          <Badge variant="default">Most Requested</Badge>
        </div>
      )}

      {/* Main content */}
      <div className="p-8">
        {/* Icon */}
        <div
          className={cn(
            "w-14 h-14 rounded-2xl flex items-center justify-center mb-6",
            service.color === "primary"
              ? "bg-primary/10 text-primary"
              : "bg-accent/10 text-accent"
          )}
        >
          <Icon className="w-7 h-7" />
        </div>

        {/* Title & Description */}
        <h3 className="text-xl font-semibold text-foreground mb-3">
          {service.title}
        </h3>
        <p className="text-muted-foreground mb-6 leading-relaxed">
          {service.description}
        </p>

        {/* Quick features */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {service.features.slice(0, 4).map((feature, i) => (
            <li key={i} className="flex items-center gap-2">
              <Check
                className={cn(
                  "w-4 h-4",
                  service.color === "primary" ? "text-primary" : "text-accent"
                )}
              />
              <span className="text-sm text-muted-foreground">{feature}</span>
            </li>
          ))}
        </ul>

        {/* Expand button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-hover transition-colors"
        >
          {isExpanded ? "Show less" : "Learn more"}
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </button>
      </div>

      {/* Expanded content */}
      <AnimatePresence>
        {isExpanded && service.details && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <div className="px-8 pb-8 border-t border-border pt-6 space-y-6">
              {/* Process */}
              <div>
                <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3">
                  Process
                </h4>
                <ol className="space-y-2">
                  {service.details.process.map((step, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span
                        className={cn(
                          "w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0",
                          service.color === "primary"
                            ? "bg-primary/10 text-primary"
                            : "bg-accent/10 text-accent"
                        )}
                      >
                        {i + 1}
                      </span>
                      <span className="text-sm text-muted-foreground pt-0.5">
                        {step}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Deliverables */}
              <div>
                <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3">
                  What You Get
                </h4>
                <ul className="grid grid-cols-2 gap-2">
                  {service.details.deliverables.map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-success" />
                      <span className="text-sm text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Timeline & CTA */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-border">
                <div>
                  <span className="text-sm text-muted-foreground">
                    Typical timeline:
                  </span>
                  <span className="text-sm font-medium text-foreground ml-2">
                    {service.details.timeline}
                  </span>
                </div>
                <a
                  href="#contact"
                  className={cn(
                    "inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300",
                    service.color === "primary"
                      ? "bg-primary text-white hover:bg-primary-hover"
                      : "bg-accent text-background hover:bg-accent-hover"
                  )}
                >
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}