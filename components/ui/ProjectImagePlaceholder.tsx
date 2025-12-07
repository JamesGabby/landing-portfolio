"use client";

import { motion } from "framer-motion";
import { Image as ImageIcon, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectImagePlaceholderProps {
  title: string;
  category?: string;
  className?: string;
  variant?: "default" | "gradient" | "pattern";
}

export default function ProjectImagePlaceholder({
  title,
  category,
  className,
  variant = "gradient",
}: ProjectImagePlaceholderProps) {
  // Generate consistent colors based on title
  const hash = title.split("").reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);

  const hue1 = Math.abs(hash % 360);
  const hue2 = (hue1 + 40) % 360;

  return (
    <div
      className={cn(
        "relative w-full h-full overflow-hidden",
        className
      )}
    >
      {variant === "gradient" && (
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, 
              hsl(${hue1}, 70%, 20%) 0%, 
              hsl(${hue2}, 60%, 15%) 50%, 
              hsl(${hue1}, 50%, 10%) 100%
            )`,
          }}
        />
      )}

      {variant === "pattern" && (
        <div className="absolute inset-0 bg-card">
          <div className="absolute inset-0 bg-grid opacity-30" />
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(
                circle at 30% 30%, 
                hsl(${hue1}, 70%, 30%, 0.3) 0%, 
                transparent 50%
              ), radial-gradient(
                circle at 70% 70%, 
                hsl(${hue2}, 60%, 25%, 0.3) 0%, 
                transparent 50%
              )`,
            }}
          />
        </div>
      )}

      {variant === "default" && (
        <div className="absolute inset-0 bg-card" />
      )}

      {/* Decorative elements */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          {/* Animated icon */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-20 h-20 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center mx-auto mb-4"
          >
            <Sparkles className="w-8 h-8 text-white/40" />
          </motion.div>

          {/* Title */}
          <h4 className="text-lg font-semibold text-white/80 mb-1">{title}</h4>
          {category && (
            <p className="text-sm text-white/40">{category}</p>
          )}
        </div>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-4 left-4 w-16 h-16 border-l-2 border-t-2 border-white/10 rounded-tl-xl" />
      <div className="absolute bottom-4 right-4 w-16 h-16 border-r-2 border-b-2 border-white/10 rounded-br-xl" />

      {/* Floating shapes */}
      <motion.div
        animate={{
          y: [0, -10, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 right-1/4 w-12 h-12 rounded-xl bg-white/5 border border-white/10"
      />
      <motion.div
        animate={{
          y: [0, 10, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute bottom-1/3 left-1/4 w-8 h-8 rounded-lg bg-white/5 border border-white/10"
      />
    </div>
  );
}