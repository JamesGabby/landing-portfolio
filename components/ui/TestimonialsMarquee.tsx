"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Testimonial } from "@/types";
import TestimonialCard from "./TestimonialCard";

interface TestimonialsMarqueeProps {
  testimonials: Testimonial[];
  direction?: "left" | "right";
  speed?: "slow" | "normal" | "fast";
  pauseOnHover?: boolean;
  className?: string;
}

export default function TestimonialsMarquee({
  testimonials,
  direction = "left",
  speed = "normal",
  pauseOnHover = true,
  className,
}: TestimonialsMarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const speedMap = {
    slow: 40,
    normal: 25,
    fast: 15,
  };

  const duration = speedMap[speed];

  // Duplicate testimonials for seamless loop
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden",
        pauseOnHover && "group",
        className
      )}
    >
      {/* Gradient masks */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      {/* Scrolling content */}
      <motion.div
        animate={{
          x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{
          x: {
            duration,
            repeat: Infinity,
            ease: "linear",
          },
        }}
        className={cn(
          "flex gap-6",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
        style={{
          width: "fit-content",
        }}
      >
        {duplicatedTestimonials.map((testimonial, index) => (
          <div
            key={`${testimonial.id}-${index}`}
            className="flex-shrink-0 w-[350px] md:w-[400px]"
          >
            <TestimonialCard
              testimonial={testimonial}
              variant="compact"
              index={0} // Disable stagger animation for marquee
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}