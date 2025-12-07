"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Loader2, CheckCircle, AlertCircle, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Button from "./Button";

interface NewsletterFormProps {
  variant?: "inline" | "stacked";
  className?: string;
}

export default function NewsletterForm({
  variant = "inline",
  className,
}: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setStatus("error");
      setMessage("Please enter a valid email address");
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to subscribe");
      }

      setStatus("success");
      setMessage(data.message);
      setEmail("");
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error ? error.message : "Something went wrong"
      );
    }
  };

  // Success state
  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          "flex items-center gap-3 p-4 bg-success/10 border border-success/20 rounded-xl",
          className
        )}
      >
        <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
        <p className="text-sm text-success">{message}</p>
      </motion.div>
    );
  }

  if (variant === "stacked") {
    return (
      <form onSubmit={handleSubmit} className={cn("space-y-3", className)}>
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status === "error") setStatus("idle");
            }}
            placeholder="Enter your email"
            className={cn(
              "w-full pl-12 pr-4 py-3 bg-card border rounded-xl text-foreground placeholder:text-muted transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-0",
              status === "error"
                ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                : "border-border focus:border-primary focus:ring-primary/20"
            )}
          />
        </div>

        <AnimatePresence>
          {status === "error" && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="text-sm text-red-500 flex items-center gap-2"
            >
              <AlertCircle className="w-4 h-4" />
              {message}
            </motion.p>
          )}
        </AnimatePresence>

        <Button
          type="submit"
          fullWidth
          disabled={status === "submitting"}
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Subscribing...
            </>
          ) : (
            <>
              Subscribe
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </Button>
      </form>
    );
  }

  // Inline variant
  return (
    <form onSubmit={handleSubmit} className={cn("", className)}>
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status === "error") setStatus("idle");
            }}
            placeholder="Enter your email"
            className={cn(
              "w-full pl-12 pr-4 py-3 bg-card border rounded-xl text-foreground placeholder:text-muted transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-0",
              status === "error"
                ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                : "border-border focus:border-primary focus:ring-primary/20"
            )}
          />
        </div>
        <Button
          type="submit"
          disabled={status === "submitting"}
          className="sm:w-auto"
        >
          {status === "submitting" ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            "Subscribe"
          )}
        </Button>
      </div>

      <AnimatePresence>
        {status === "error" && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="text-sm text-red-500 mt-2 flex items-center gap-2"
          >
            <AlertCircle className="w-4 h-4" />
            {message}
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  );
}