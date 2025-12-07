"use client";

import { motion } from "framer-motion";
import { Sparkles, Zap, TrendingUp, Users } from "lucide-react";

export default function HeroVisual() {
  return (
    <div className="relative w-full h-[500px]">
      {/* Central glowing orb */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-64 h-64 rounded-full bg-gradient-to-br from-primary to-accent blur-3xl opacity-30"
        />
      </div>

      {/* Floating cards */}
      <motion.div
        initial={{ opacity: 0, y: 50, rotateX: 20 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute top-8 left-1/2 -translate-x-1/2 w-72"
        style={{ perspective: "1000px" }}
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="glass rounded-2xl p-6 border border-primary/20 shadow-glow"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Conversion Rate</div>
              <div className="text-xl font-bold text-foreground">+340%</div>
            </div>
          </div>
          <div className="h-2 bg-card rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "85%" }}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Left floating card */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="absolute top-1/2 left-4 -translate-y-1/2"
      >
        <motion.div
          animate={{ y: [0, 15, 0], rotate: [0, 2, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="glass rounded-2xl p-5 border border-accent/20 shadow-glow-accent"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
              <Users className="w-6 h-6 text-accent" />
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">12.4k</div>
              <div className="text-sm text-muted-foreground">New Users</div>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1 text-success text-sm">
            <TrendingUp className="w-4 h-4" />
            <span>+24% this week</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Right floating card */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="absolute top-1/3 right-4"
      >
        <motion.div
          animate={{ y: [0, -12, 0], rotate: [0, -2, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="glass rounded-2xl p-5 border border-primary/20"
        >
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-foreground">AI-Powered</span>
          </div>
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ height: 20 }}
                animate={{ height: [20, 40, 20] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.1,
                }}
                className="w-2 bg-gradient-to-t from-primary to-accent rounded-full"
              />
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom floating card */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="glass rounded-full px-6 py-3 border border-border/50 flex items-center gap-3"
        >
          <div className="flex -space-x-2">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent border-2 border-background"
                style={{
                  opacity: 1 - i * 0.2,
                }}
              />
            ))}
          </div>
          <div className="text-sm">
            <span className="text-foreground font-medium">50+ startups</span>
            <span className="text-muted-foreground"> trust my work</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Decorative elements */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 border border-dashed border-border/30 rounded-full"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-dashed border-border/20 rounded-full"
      />

      {/* Floating dots */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 3 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
          className="absolute w-2 h-2 bg-primary rounded-full"
          style={{
            top: `${20 + Math.random() * 60}%`,
            left: `${10 + Math.random() * 80}%`,
          }}
        />
      ))}
    </div>
  );
}