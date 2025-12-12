"use client";

import { motion } from "framer-motion";
import { Sparkles, Zap, Cpu, Code2 } from "lucide-react";
import Badge from "@/components/ui/Badge";

// Floating orb component
const FloatingOrb = ({
  className,
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1, delay }}
    className={className}
  >
    <motion.div
      animate={{
        y: [0, -15, 0],
        x: [0, 8, 0],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
      className="w-full h-full rounded-full"
    />
  </motion.div>
);

// Compact code preview
const CodePreview = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="relative"
    >
      <div className="relative">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-2xl" />
        
        {/* Code card */}
        <div className="relative glass rounded-xl p-4 border border-border/50 shadow-xl">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-red-500" />
            <div className="w-2 h-2 rounded-full bg-yellow-500" />
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="ml-2 text-[10px] text-muted font-mono">landing.tsx</span>
          </div>
          
          <pre className="font-mono text-[10px] leading-relaxed">
            <code>
              <span className="text-purple-400">const</span>
              <span className="text-blue-400"> landing</span>
              <span className="text-foreground"> = </span>
              <span className="text-purple-400">await</span>
              {"\n"}
              <span className="text-cyan-400">  buildPage</span>
              <span className="text-foreground">{"({"}</span>
              {"\n"}
              <span className="text-blue-400">    startup</span>
              <span className="text-foreground">: </span>
              <span className="text-green-400">&quot;vision&quot;</span>
              <span className="text-foreground">,</span>
              {"\n"}
              <span className="text-blue-400">    conversion</span>
              <span className="text-foreground">: </span>
              <span className="text-orange-400">{"∞"}</span>
              {"\n"}
              <span className="text-foreground">{"  });"}</span>
            </code>
          </pre>
          
          {/* Typing cursor */}
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="inline-block w-1.5 h-3 bg-primary ml-1 align-middle"
          />
        </div>
        
        {/* Floating badges */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-3 -right-3"
        >
          <Badge variant="accent" icon={<Zap className="w-2.5 h-2.5" />} className="text-xs px-2 py-0.5">
            Fast
          </Badge>
        </motion.div>
        
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -bottom-3 -left-3"
        >
          <Badge variant="success" icon={<Cpu className="w-2.5 h-2.5" />} className="text-xs px-2 py-0.5">
            AI-Ready
          </Badge>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Stats display
const StatBadge = ({
  value,
  label,
  delay,
}: {
  value: string;
  label: string;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="flex items-center gap-2 px-3 py-2 bg-card/50 border border-border/50 rounded-lg backdrop-blur-sm"
  >
    <div className="text-sm font-bold text-primary">{value}</div>
    <div className="text-xs text-muted-foreground">{label}</div>
  </motion.div>
);

// Tech stack badges
const TechBadge = ({ icon: Icon, name }: { icon: any; name: string }) => (
  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-background/50 border border-border/50 rounded-md">
    <Icon className="w-3 h-3 text-primary" />
    <span className="text-xs font-medium text-foreground">{name}</span>
  </div>
);

export default function LinkedInCover() {
  return (
    <div 
      className="relative w-[1584px] h-[396px] bg-background overflow-hidden"
      style={{ aspectRatio: "1584/396" }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid opacity-40" />
        
        {/* Gradient orbs */}
        <div className="absolute top-0 -left-24 w-80 h-80 bg-primary/30 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 -right-24 w-80 h-80 bg-accent/20 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[80px]" />
        
        {/* Floating elements */}
        <FloatingOrb
          delay={0}
          className="absolute top-1/4 right-1/3 w-3 h-3 bg-primary/40 rounded-full blur-sm"
        />
        <FloatingOrb
          delay={1}
          className="absolute bottom-1/3 left-1/4 w-2 h-2 bg-accent/40 rounded-full blur-sm"
        />
        
        {/* Noise texture */}
        <div className="absolute inset-0 bg-noise pointer-events-none opacity-20" />
      </div>

      {/* Main Content */}
      <div className="relative h-full flex items-center px-16">
        <div className="flex items-center justify-between w-full gap-12">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 max-w-2xl"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-4"
            >
              <Badge
                icon={<Sparkles className="w-3 h-3" />}
                className="text-xs px-3 py-1"
              >
                Available for Q1 2026 Projects
              </Badge>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mb-2"
            >
              <h2 className="text-2xl font-bold text-foreground">
                James Gabbitus
              </h2>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-3xl font-heading font-bold tracking-tight mb-3 leading-tight"
            >
              Building{" "}
              <span className="relative inline-block">
                <span className="text-gradient">AI landing pages</span>
                <motion.svg
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.8 }}
                  className="absolute -bottom-1 left-0 w-full h-2"
                  viewBox="0 0 200 12"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 10C50 4 150 4 198 10"
                    stroke="url(#gradient-cover)"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="gradient-cover" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="100%" stopColor="#22d3ee" />
                    </linearGradient>
                  </defs>
                </motion.svg>
              </span>
              {" "}that convert
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-sm text-muted-foreground mb-5 leading-relaxed max-w-lg"
            >
              Next.js Developer • High-Converting Landing Pages • AI Startups
            </motion.p>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-center gap-3 mb-5"
            >
              <StatBadge value="20+" label="Projects" delay={0.5} />
              <StatBadge value="99/100" label="Lighthouse" delay={0.6} />
              <StatBadge value="<24h" label="Response" delay={0.7} />
            </motion.div>

            {/* Tech Stack */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div className="flex items-center gap-2 flex-wrap">
                <TechBadge icon={Code2} name="Next.js" />
                <TechBadge icon={Sparkles} name="Tailwind" />
                <TechBadge icon={Cpu} name="Supabase" />
                <TechBadge icon={Zap} name="Framer Motion" />
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Code Preview */}
          <div className="flex-shrink-0">
            <CodePreview />
          </div>
        </div>
      </div>
    </div>
  );
}