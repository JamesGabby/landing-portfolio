"use client";

import { forwardRef } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLMotionProps<"div"> {
  variant?: "default" | "glass" | "gradient" | "outline";
  hover?: boolean;
  glow?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

const cardVariants = {
  default: "bg-card border border-border",
  glass: "bg-card/80 backdrop-blur-xl border border-border/50",
  gradient: "bg-card-gradient border border-border/50",
  outline: "bg-transparent border border-border",
};

const paddingVariants = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      variant = "default",
      hover = true,
      glow = false,
      padding = "md",
      className,
      ...props
    },
    ref
  ) => {
    return (
      <motion.div
        ref={ref}
        whileHover={hover ? { y: -4 } : undefined}
        transition={{ duration: 0.3 }}
        className={cn(
          "rounded-2xl transition-all duration-300",
          cardVariants[variant],
          paddingVariants[padding],
          hover && "hover:border-primary/30 hover:bg-card-hover",
          glow && "hover:shadow-glow-sm",
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = "Card";

export default Card;

// Card Header
export const CardHeader = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("mb-4", className)} {...props} />
));
CardHeader.displayName = "CardHeader";

// Card Title
export const CardTitle = forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-xl font-semibold text-foreground", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

// Card Description
export const CardDescription = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-muted-foreground text-sm mt-1", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

// Card Content
export const CardContent = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("", className)} {...props} />
));
CardContent.displayName = "CardContent";

// Card Footer
export const CardFooter = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("mt-4 pt-4 border-t border-border", className)} {...props} />
));
CardFooter.displayName = "CardFooter";