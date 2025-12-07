"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Testimonial } from "@/types";
import TestimonialCard from "./TestimonialCard";

interface TestimonialsWallProps {
  testimonials: Testimonial[];
  columns?: 2 | 3 | 4;
  className?: string;
}

export default function TestimonialsWall({
  testimonials,
  columns = 3,
  className,
}: TestimonialsWallProps) {
  // Distribute testimonials across columns for masonry effect
  const columnArrays: Testimonial[][] = Array.from(
    { length: columns },
    () => []
  );

  testimonials.forEach((testimonial, index) => {
    columnArrays[index % columns].push(testimonial);
  });

  const columnClasses = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-2 lg:grid-cols-3",
    4: "md:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div className={cn("grid gap-6", columnClasses[columns], className)}>
      {columnArrays.map((columnTestimonials, columnIndex) => (
        <div key={columnIndex} className="flex flex-col gap-6">
          {columnTestimonials.map((testimonial, itemIndex) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.5,
                delay: (columnIndex * 0.1) + (itemIndex * 0.05),
              }}
            >
              <TestimonialCard
                testimonial={testimonial}
                variant="compact"
                index={0}
              />
            </motion.div>
          ))}
        </div>
      ))}
    </div>
  );
}