"use client";

import { useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";

interface ScrollAnimationOptions {
  offset?: [string, string];
  outputRange?: [number, number];
}

export function useScrollAnimation(options: ScrollAnimationOptions = {}) {
  const { offset = ["start end", "end start"], outputRange = [0, 1] } = options;
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset as any,
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [60, 0, 0, -60]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.95]);

  return { ref, scrollYProgress, opacity, y, scale };
}

export function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance]);
}