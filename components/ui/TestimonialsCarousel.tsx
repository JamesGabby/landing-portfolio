"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { cn } from "@/lib/utils";
import { Testimonial } from "@/types";
import { Avatar, StarRating } from "./TestimonialCard";

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
  autoPlay?: boolean;
  interval?: number;
}

export default function TestimonialsCarousel({
  testimonials,
  autoPlay = true,
  interval = 5000,
}: TestimonialsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  }, [testimonials.length]);

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Auto-play
  useEffect(() => {
    if (!autoPlay || isPaused) return;

    const timer = setInterval(nextSlide, interval);
    return () => clearInterval(timer);
  }, [autoPlay, interval, isPaused, nextSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  const currentTestimonial = testimonials[currentIndex];

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Main carousel container */}
      <div className="relative overflow-hidden rounded-3xl bg-card border border-border p-8 md:p-12 min-h-[400px]">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-[100px]" />

        {/* Quote icon */}
        <Quote className="absolute top-8 right-8 w-16 h-16 text-primary/10" />

        {/* Testimonial content */}
        <div className="relative">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="flex flex-col items-center text-center"
            >
              {/* Avatar */}
              <div className="mb-6">
                <Avatar
                  src={currentTestimonial.image}
                  name={currentTestimonial.name}
                  size="lg"
                />
              </div>

              {/* Rating */}
              <div className="mb-6">
                <StarRating rating={currentTestimonial.rating} />
              </div>

              {/* Content */}
              <blockquote className="text-xl md:text-2xl text-foreground font-medium leading-relaxed mb-8 max-w-3xl">
                "{currentTestimonial.content}"
              </blockquote>

              {/* Author */}
              <div>
                <p className="text-lg font-semibold text-foreground">
                  {currentTestimonial.name}
                </p>
                <p className="text-muted-foreground">
                  {currentTestimonial.role} at{" "}
                  <span className="text-primary">{currentTestimonial.company}</span>
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-background/80 backdrop-blur-sm border border-border text-foreground hover:bg-background hover:border-primary/50 transition-all duration-300 z-10"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-background/80 backdrop-blur-sm border border-border text-foreground hover:bg-background hover:border-primary/50 transition-all duration-300 z-10"
          aria-label="Next testimonial"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Dots navigation */}
      <div className="flex items-center justify-center gap-2 mt-6">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "transition-all duration-300 rounded-full",
              index === currentIndex
                ? "w-8 h-2 bg-primary"
                : "w-2 h-2 bg-border hover:bg-muted"
            )}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress bar */}
      {autoPlay && (
        <div className="mt-4 h-1 bg-border rounded-full overflow-hidden max-w-xs mx-auto">
          <motion.div
            key={currentIndex}
            initial={{ width: "0%" }}
            animate={{ width: isPaused ? "0%" : "100%" }}
            transition={{ duration: interval / 1000, ease: "linear" }}
            className="h-full bg-primary"
          />
        </div>
      )}
    </div>
  );
}