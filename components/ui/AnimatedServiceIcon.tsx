"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedServiceIconProps {
  icon: React.ComponentType<{ className?: string }>;
  color?: "primary" | "accent";
  size?: "sm" | "md" | "lg";
  animated?: boolean;
  className?: string;
}

const sizes = {
  sm: {
    container: "w-10 h-10",
    icon: "w-5 h-5",
    rounded: "rounded-xl",
  },
  md: {
    container: "w-14 h-14",
    icon: "w-7 h-7",
    rounded: "rounded-2xl",
  },
  lg: {
    container: "w-20 h-20",
    icon: "w-10 h-10",
    rounded: "rounded-3xl",
  },
};

export default function AnimatedServiceIcon({
  icon: Icon,
  color = "primary",
  size = "md",
  animated = true,
  className,
}: AnimatedServiceIconProps) {
  const sizeConfig = sizes[size];

  return (
    <motion.div
      whileHover={animated ? { scale: 1.1, rotate: 5 } : undefined}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      className={cn(
        "relative flex items-center justify-center",
        sizeConfig.container,
        sizeConfig.rounded,
        color === "primary" ? "bg-primary/10" : "bg-accent/10",
        className
      )}
    >
      {/* Glow effect on hover */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        className={cn(
          "absolute inset-0",
          sizeConfig.rounded,
          color === "primary"
            ? "bg-primary/20 blur-xl"
            : "bg-accent/20 blur-xl"
        )}
      />

      {/* Icon */}
      <Icon
        className={cn(
          "relative z-10",
          sizeConfig.icon,
          color === "primary" ? "text-primary" : "text-accent"
        )}
      />

      {/* Animated ring */}
      {animated && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileHover={{ opacity: 1, scale: 1.2 }}
          transition={{ duration: 0.3 }}
          className={cn(
            "absolute inset-0 border-2",
            sizeConfig.rounded,
            color === "primary" ? "border-primary/30" : "border-accent/30"
          )}
        />
      )}
    </motion.div>
  );
}