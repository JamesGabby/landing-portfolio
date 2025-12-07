"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Quote, Star, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { Testimonial } from "@/types";

interface TestimonialCardProps {
  testimonial: Testimonial;
  index?: number;
  variant?: "default" | "featured" | "compact";
  className?: string;
}

// Star Rating Component
const StarRating = ({ rating = 5 }: { rating?: number }) => (
  <div className="flex items-center gap-1">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={cn(
          "w-4 h-4",
          i < rating ? "text-yellow-500 fill-yellow-500" : "text-muted"
        )}
      />
    ))}
  </div>
);

// Avatar Component with Fallback
const Avatar = ({
  src,
  name,
  size = "md",
}: {
  src?: string;
  name: string;
  size?: "sm" | "md" | "lg";
}) => {
  const [hasError, setHasError] = useState(false);

  const sizeClasses = {
    sm: "w-10 h-10 text-sm",
    md: "w-12 h-12 text-base",
    lg: "w-16 h-16 text-lg",
  };

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  if (hasError || !src) {
    return (
      <div
        className={cn(
          "rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center font-semibold text-white",
          sizeClasses[size]
        )}
      >
        {initials}
      </div>
    );
  }

  return (
    <div className={cn("relative rounded-full overflow-hidden", sizeClasses[size])}>
      <Image
        src={src}
        alt={name}
        fill
        className="object-cover"
        onError={() => setHasError(true)}
      />
    </div>
  );
};

export default function TestimonialCard({
  testimonial,
  index = 0,
  variant = "default",
  className,
}: TestimonialCardProps) {
  // Featured variant - larger, more prominent
  if (variant === "featured") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className={cn(
          "relative p-8 md:p-10 bg-gradient-to-br from-primary/10 via-card to-accent/10 border border-primary/20 rounded-3xl",
          className
        )}
      >
        {/* Quote icon */}
        <Quote className="absolute top-6 right-6 w-12 h-12 text-primary/20" />

        {/* Rating */}
        <div className="mb-6">
          <StarRating rating={testimonial.rating} />
        </div>

        {/* Content */}
        <blockquote className="text-xl md:text-2xl text-foreground font-medium leading-relaxed mb-8">
          "{testimonial.content}"
        </blockquote>

        {/* Author */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar src={testimonial.image} name={testimonial.name} size="lg" />
            <div>
              <p className="font-semibold text-foreground text-lg">
                {testimonial.name}
              </p>
              <p className="text-muted-foreground">
                {testimonial.role} at{" "}
                <span className="text-primary">{testimonial.company}</span>
              </p>
            </div>
          </div>

          {testimonial.projectId && (
            <a
              href={`#portfolio`}
              className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              View Project
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </motion.div>
    );
  }

  // Compact variant - smaller, for grids
  if (variant === "compact") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
        className={cn(
          "p-5 bg-card border border-border rounded-xl hover:border-primary/30 transition-colors duration-300",
          className
        )}
      >
        {/* Rating */}
        <div className="mb-3">
          <StarRating rating={testimonial.rating} />
        </div>

        {/* Content */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
          "{testimonial.content}"
        </p>

        {/* Author */}
        <div className="flex items-center gap-3">
          <Avatar src={testimonial.image} name={testimonial.name} size="sm" />
          <div>
            <p className="text-sm font-medium text-foreground">
              {testimonial.name}
            </p>
            <p className="text-xs text-muted-foreground">{testimonial.company}</p>
          </div>
        </div>
      </motion.div>
    );
  }

  // Default variant
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn(
        "relative p-6 md:p-8 bg-card border border-border rounded-2xl hover:border-primary/30 transition-all duration-300 group",
        className
      )}
    >
      {/* Hover glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative">
        {/* Quote icon */}
        <Quote className="w-8 h-8 text-primary/30 mb-4" />

        {/* Rating */}
        <div className="mb-4">
          <StarRating rating={testimonial.rating} />
        </div>

        {/* Content */}
        <blockquote className="text-foreground leading-relaxed mb-6">
          "{testimonial.content}"
        </blockquote>

        {/* Author */}
        <div className="flex items-center gap-4">
          <Avatar src={testimonial.image} name={testimonial.name} size="md" />
          <div>
            <p className="font-semibold text-foreground">{testimonial.name}</p>
            <p className="text-sm text-muted-foreground">
              {testimonial.role}, {testimonial.company}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Export sub-components for reuse
export { StarRating, Avatar };