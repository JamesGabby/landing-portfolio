"use client";

import { motion } from "framer-motion";
import { Star, Users, Award, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface SocialProofBannerProps {
  variant?: "default" | "minimal" | "detailed";
  className?: string;
}

const proofPoints = [
  {
    icon: Star,
    value: "5.0",
    label: "Rating",
    color: "text-yellow-500",
  },
  {
    icon: Users,
    value: "50+",
    label: "Clients",
    color: "text-primary",
  },
  {
    icon: TrendingUp,
    value: "340%",
    label: "Avg. Conversion Lift",
    color: "text-success",
  },
  {
    icon: Award,
    value: "100%",
    label: "Satisfaction",
    color: "text-accent",
  },
];

export default function SocialProofBanner({
  variant = "default",
  className,
}: SocialProofBannerProps) {
  if (variant === "minimal") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={cn(
          "inline-flex items-center gap-4 px-4 py-2 bg-card border border-border rounded-full",
          className
        )}
      >
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className="w-4 h-4 text-yellow-500 fill-yellow-500"
            />
          ))}
        </div>
        <span className="text-sm text-muted-foreground">
          Trusted by <span className="text-foreground font-medium">50+</span> AI startups
        </span>
      </motion.div>
    );
  }

  if (variant === "detailed") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={cn(
          "p-6 bg-card border border-border rounded-2xl",
          className
        )}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {proofPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <motion.div
                key={point.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className={cn("mb-2", point.color)}>
                  <Icon className="w-6 h-6 mx-auto" />
                </div>
                <div className="text-2xl font-bold text-foreground">
                  {point.value}
                </div>
                <div className="text-xs text-muted-foreground">
                  {point.label}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    );
  }

  // Default variant
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn(
        "flex flex-wrap items-center justify-center gap-6 md:gap-10 py-6",
        className
      )}
    >
      {proofPoints.map((point, index) => {
        const Icon = point.icon;
        return (
          <motion.div
            key={point.label}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-2"
          >
            <Icon className={cn("w-5 h-5", point.color)} />
            <span className="text-foreground font-semibold">{point.value}</span>
            <span className="text-muted-foreground text-sm">{point.label}</span>
          </motion.div>
        );
      })}
    </motion.div>
  );
}