"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import Button from "./Button";

interface QuickContactFormProps {
  className?: string;
  title?: string;
  description?: string;
}

export default function QuickContactForm({
  className,
  title = "Quick Message",
  description = "Have a quick question? Send me a message.",
}: QuickContactFormProps) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setStatus("error");
      setErrorMessage("Please enter a valid email");
      return;
    }
    if (!message || message.length < 10) {
      setStatus("error");
      setErrorMessage("Message must be at least 10 characters");
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Quick Contact",
          email,
          message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      setStatus("success");
      setEmail("");
      setMessage("");
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong"
      );
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={cn(
          "p-6 bg-card border border-border rounded-2xl text-center",
          className
        )}
      >
        <CheckCircle className="w-12 h-12 text-success mx-auto mb-3" />
        <p className="font-medium text-foreground mb-1">Message Sent!</p>
        <p className="text-sm text-muted-foreground mb-4">
          I'll get back to you soon.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="text-sm text-primary hover:underline"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "p-6 bg-card border border-border rounded-2xl",
        className
      )}
    >
      {title && (
        <h4 className="font-semibold text-foreground mb-1">{title}</h4>
      )}
      {description && (
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
      )}

      {status === "error" && (
        <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg mb-4">
          <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
          <p className="text-sm text-red-500">{errorMessage}</p>
        </div>
      )}

      <div className="space-y-3">
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          placeholder="Your email"
          className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-foreground placeholder:text-muted text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
        <textarea
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          placeholder="Your message..."
          rows={3}
          className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-foreground placeholder:text-muted text-sm resize-none focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
        <Button
          type="submit"
          size="sm"
          fullWidth
          disabled={status === "submitting"}
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              Send Message
            </>
          )}
        </Button>
      </div>
    </form>
  );
}