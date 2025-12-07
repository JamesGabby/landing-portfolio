"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Play,
  Sparkles,
  MousePointer2,
  Star,
  Zap,
  Code2,
  Cpu,
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

// Floating orb component for background
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
        y: [0, -20, 0],
        x: [0, 10, 0],
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

// Animated code block for visual interest
const CodeBlock = () => {
  const codeLines = [
    { text: "const", color: "text-purple-400" },
    { text: " landing", color: "text-blue-400" },
    { text: " = ", color: "text-foreground" },
    { text: "await", color: "text-purple-400" },
    { text: " createAI", color: "text-cyan-400" },
    { text: "({", color: "text-foreground" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      className="absolute -right-4 top-1/2 -translate-y-1/2 hidden xl:block"
    >
      <div className="relative">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-3xl" />
        
        {/* Code card */}
        <div className="relative glass rounded-2xl p-6 border border-border/50 shadow-2xl">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="ml-2 text-xs text-muted font-mono">landing.tsx</span>
          </div>
          
          <pre className="font-mono text-sm leading-relaxed">
            <code>
              <span className="text-muted">{"// AI-powered conversion"}</span>
              {"\n"}
              <span className="text-purple-400">const</span>
              <span className="text-blue-400"> landing</span>
              <span className="text-foreground"> = </span>
              <span className="text-purple-400">await</span>
              <span className="text-cyan-400"> buildPage</span>
              <span className="text-foreground">{"({"}</span>
              {"\n"}
              <span className="text-foreground">{"  "}</span>
              <span className="text-blue-400">startup</span>
              <span className="text-foreground">: </span>
              <span className="text-green-400">"your-vision"</span>
              <span className="text-foreground">,</span>
              {"\n"}
              <span className="text-foreground">{"  "}</span>
              <span className="text-blue-400">conversion</span>
              <span className="text-foreground">: </span>
              <span className="text-orange-400">{"∞"}</span>
              <span className="text-foreground">,</span>
              {"\n"}
              <span className="text-foreground">{"  "}</span>
              <span className="text-blue-400">design</span>
              <span className="text-foreground">: </span>
              <span className="text-green-400">"premium"</span>
              {"\n"}
              <span className="text-foreground">{"});"}</span>
            </code>
          </pre>
          
          {/* Typing cursor */}
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="inline-block w-2 h-5 bg-primary ml-1 align-middle"
          />
        </div>
        
        {/* Floating badges around code */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-4 -right-4"
        >
          <Badge variant="accent" icon={<Zap className="w-3 h-3" />}>
            Fast
          </Badge>
        </motion.div>
        
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -bottom-4 -left-4"
        >
          <Badge variant="success" icon={<Cpu className="w-3 h-3" />}>
            AI-Ready
          </Badge>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Animated metrics display
const MetricCard = ({
  value,
  label,
  delay,
}: {
  value: string;
  label: string;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="text-center"
  >
    <div className="text-2xl sm:text-3xl font-bold text-foreground mb-1">
      {value}
    </div>
    <div className="text-sm text-muted-foreground">{label}</div>
  </motion.div>
);

// Client logos (placeholder - you'll replace with actual logos)
const ClientLogos = () => {
  const clients = [
    "TechFlow AI",
    "Neural Labs",
    "Synth.io",
    "DataMind",
    "AICore",
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 1 }}
      className="mt-16 pt-16 border-t border-border/50"
    >
      <p className="text-sm text-muted-foreground text-center mb-8">
        Trusted by innovative AI startups
      </p>
      <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
        {clients.map((client, index) => (
          <motion.div
            key={client}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 1.2 + index * 0.1 }}
            className="text-muted hover:text-muted-foreground transition-colors duration-300"
          >
            {/* Replace with actual logo images */}
            <div className="flex items-center gap-2 text-lg font-semibold opacity-50 hover:opacity-80 transition-opacity">
              <Sparkles className="w-5 h-5" />
              {client}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// Main Hero Component
export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  
  // Parallax effects
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  // Track mouse for subtle interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 lg:pt-28">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid" />
        
        {/* Gradient orbs */}
        <motion.div
          style={{ y: y1 }}
          className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/30 rounded-full blur-[128px]"
        />
        <motion.div
          style={{ y: y2 }}
          className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/20 rounded-full blur-[128px]"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px]" />
        
        {/* Animated floating elements */}
        <FloatingOrb
          delay={0}
          className="absolute top-1/4 right-1/4 w-4 h-4 bg-primary/40 rounded-full blur-sm"
        />
        <FloatingOrb
          delay={1}
          className="absolute bottom-1/3 left-1/4 w-3 h-3 bg-accent/40 rounded-full blur-sm"
        />
        <FloatingOrb
          delay={2}
          className="absolute top-1/3 left-1/3 w-2 h-2 bg-primary/60 rounded-full"
        />
        
        {/* Noise texture overlay */}
        <div className="absolute inset-0 bg-noise pointer-events-none" />
      </div>

      {/* Main Content */}
      <div className="relative section-padding w-full">
        <div className="container-custom">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Text Content */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="lg:col-span-7 text-center lg:text-left"
            >
              {/* Badge */}
              <motion.div variants={itemVariants}>
                <Badge
                  icon={<Sparkles className="w-3 h-3" />}
                  className="mb-6"
                >
                  Available for Q1 2026 Projects
                </Badge>
              </motion.div>

              {/* Main Headline */}
              <motion.h1
                variants={itemVariants}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-display-lg font-heading font-bold tracking-tight mb-6"
              >
                I build{" "}
                <span className="relative">
                  <span className="text-gradient">AI landing pages</span>
                  <motion.svg
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                    className="absolute -bottom-2 left-0 w-full"
                    viewBox="0 0 200 12"
                    fill="none"
                  >
                    <path
                      d="M2 10C50 4 150 4 198 10"
                      stroke="url(#gradient)"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#6366f1" />
                        <stop offset="100%" stopColor="#22d3ee" />
                      </linearGradient>
                    </defs>
                  </motion.svg>
                </span>
                <br />
                that convert visitors into{" "}
                <span className="relative inline-block">
                  users
                  <motion.span
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                    className="absolute bottom-2 left-0 h-3 bg-accent/20 -z-10"
                  />
                </span>
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                variants={itemVariants}
                className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0"
              >
                Freelance Next.js developer specializing in high-converting, 
                stunning landing pages for AI startups. I combine modern tech 
                with persuasive design to help you{" "}
                <span className="text-foreground font-medium">
                  launch faster and convert better
                </span>
                .
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row items-center gap-4 mb-12 justify-center lg:justify-start"
              >
                <Button
                  size="lg"
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                  onClick={() => {
                    document.getElementById("contact")?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }}
                >
                  Start Your Project
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  leftIcon={<Play className="w-5 h-5" />}
                  onClick={() => {
                    document.getElementById("portfolio")?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }}
                >
                  View My Work
                </Button>
              </motion.div>

              {/* Quick Stats */}
              <motion.div
                variants={itemVariants}
                className="grid grid-cols-3 gap-8 max-w-md mx-auto lg:mx-0"
              >
                <MetricCard value="50+" label="Projects Shipped" delay={0.8} />
                <MetricCard value="3x" label="Avg. Conversion Lift" delay={0.9} />
                <MetricCard value="<48h" label="Response Time" delay={1.0} />
              </motion.div>
            </motion.div>

            {/* Visual Element */}
            <div className="lg:col-span-5 relative hidden lg:block">
              <CodeBlock />
            </div>
          </div>

          {/* Client Logos */}
          <ClientLogos />
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-sm text-muted-foreground">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-border flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ y: [0, 8, 0], opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-1.5 rounded-full bg-primary"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}