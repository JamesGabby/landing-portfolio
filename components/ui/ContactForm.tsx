"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Loader2,
  CheckCircle,
  AlertCircle,
  User,
  Mail,
  Building,
  MessageSquare,
  DollarSign,
  Clock,
  Briefcase,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { projectTypes,
  budgetRanges,
  timelineOptions, } from "@/lib/data/contact";
import {
  ContactFormData,
  ContactFormErrors,
  validateContactForm,
  hasErrors,
} from "@/lib/validations/contact";
import Button from "./Button";

interface ContactFormProps {
  variant?: "full" | "compact";
  className?: string;
  onSuccess?: () => void;
}

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function ContactForm({
  variant = "full",
  className,
  onSuccess,
}: ContactFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    company: "",
    projectType: "",
    budget: "",
    timeline: "",
    message: "",
  });
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [statusMessage, setStatusMessage] = useState("");

  // Honeypot field (hidden from users, bots fill it out)
  const [honeypot, setHoneypot] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name as keyof ContactFormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    const validationErrors = validateContactForm(formData);
    if (hasErrors(validationErrors)) {
      setErrors(validationErrors);
      return;
    }

    setStatus("submitting");
    setErrors({});

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          website: honeypot, // Honeypot field
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit form");
      }

      setStatus("success");
      setStatusMessage(data.message);
      setFormData({
        name: "",
        email: "",
        company: "",
        projectType: "",
        budget: "",
        timeline: "",
        message: "",
      });
      onSuccess?.();
    } catch (error) {
      setStatus("error");
      setStatusMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    }
  };

  const resetForm = () => {
    setStatus("idle");
    setStatusMessage("");
  };

  // Success state
  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={cn(
          "p-8 bg-card border border-border rounded-2xl text-center",
          className
        )}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.1 }}
          className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4"
        >
          <CheckCircle className="w-8 h-8 text-success" />
        </motion.div>
        <h3 className="text-xl font-semibold text-foreground mb-2">
          Message Sent!
        </h3>
        <p className="text-muted-foreground mb-6">{statusMessage}</p>
        <Button variant="secondary" onClick={resetForm}>
          Send Another Message
        </Button>
      </motion.div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className={cn("space-y-6", className)}
    >
      {/* Error banner */}
      <AnimatePresence>
        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3"
          >
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-red-500 font-medium">
                {statusMessage}
              </p>
              <button
                type="button"
                onClick={resetForm}
                className="text-xs text-red-400 hover:text-red-300 mt-1"
              >
                Dismiss
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Honeypot field - hidden from users */}
      <input
        type="text"
        name="website"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        className="absolute opacity-0 pointer-events-none"
        aria-hidden="true"
      />

      {/* Name and Email row */}
      <div className="grid sm:grid-cols-2 gap-4">
        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-foreground mb-2"
          >
            Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className={cn(
                "w-full pl-12 pr-4 py-3 bg-card border rounded-xl text-foreground placeholder:text-muted transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-0",
                errors.name
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                  : "border-border focus:border-primary focus:ring-primary/20"
              )}
            />
          </div>
          {errors.name && (
            <p className="text-sm text-red-500 mt-1">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-foreground mb-2"
          >
            Email <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@company.com"
              className={cn(
                "w-full pl-12 pr-4 py-3 bg-card border rounded-xl text-foreground placeholder:text-muted transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-0",
                errors.email
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                  : "border-border focus:border-primary focus:ring-primary/20"
              )}
            />
          </div>
          {errors.email && (
            <p className="text-sm text-red-500 mt-1">{errors.email}</p>
          )}
        </div>
      </div>

            {/* Company (optional) */}
      {variant === "full" && (
        <div>
          <label
            htmlFor="company"
            className="block text-sm font-medium text-foreground mb-2"
          >
            Company <span className="text-muted-foreground">(optional)</span>
          </label>
          <div className="relative">
            <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Your company name"
              className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-xl text-foreground placeholder:text-muted transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:border-primary focus:ring-primary/20"
            />
          </div>
        </div>
      )}

      {/* Project Type, Budget, Timeline row */}
      {variant === "full" && (
        <div className="grid sm:grid-cols-3 gap-4">
          {/* Project Type */}
          <div>
            <label
              htmlFor="projectType"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Project Type
            </label>
            <div className="relative">
              <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted pointer-events-none" />
              <select
                id="projectType"
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
                className="w-full pl-12 pr-10 py-3 bg-card border border-border rounded-xl text-foreground appearance-none cursor-pointer transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:border-primary focus:ring-primary/20"
              >
                <option value="">Select type</option>
                {projectTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg
                  className="w-4 h-4 text-muted"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Budget */}
          <div>
            <label
              htmlFor="budget"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Budget
            </label>
            <div className="relative">
              <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted pointer-events-none" />
              <select
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full pl-12 pr-10 py-3 bg-card border border-border rounded-xl text-foreground appearance-none cursor-pointer transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:border-primary focus:ring-primary/20"
              >
                <option value="">Select budget</option>
                {budgetRanges.map((range) => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg
                  className="w-4 h-4 text-muted"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div>
            <label
              htmlFor="timeline"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Timeline
            </label>
            <div className="relative">
              <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted pointer-events-none" />
              <select
                id="timeline"
                name="timeline"
                value={formData.timeline}
                onChange={handleChange}
                className="w-full pl-12 pr-10 py-3 bg-card border border-border rounded-xl text-foreground appearance-none cursor-pointer transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:border-primary focus:ring-primary/20"
              >
                <option value="">Select timeline</option>
                {timelineOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg
                  className="w-4 h-4 text-muted"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Message */}
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-foreground mb-2"
        >
          Message <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-muted" />
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell me about your project, goals, and any specific requirements..."
            rows={variant === "full" ? 6 : 4}
            className={cn(
              "w-full pl-12 pr-4 py-3 bg-card border rounded-xl text-foreground placeholder:text-muted resize-none transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-0",
              errors.message
                ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                : "border-border focus:border-primary focus:ring-primary/20"
            )}
          />
        </div>
        <div className="flex items-center justify-between mt-1">
          {errors.message ? (
            <p className="text-sm text-red-500">{errors.message}</p>
          ) : (
            <p className="text-xs text-muted-foreground">
              Minimum 10 characters
            </p>
          )}
          <p
            className={cn(
              "text-xs",
              formData.message.length > 4500
                ? "text-red-500"
                : "text-muted-foreground"
            )}
          >
            {formData.message.length}/5000
          </p>
        </div>
      </div>

      {/* Submit button */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Button
          type="submit"
          size="lg"
          disabled={status === "submitting"}
          className="w-full sm:w-auto"
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Send Message
            </>
          )}
        </Button>
        <p className="text-sm text-muted-foreground">
          I'll get back to you within 24 hours
        </p>
      </div>
    </form>
  );
}