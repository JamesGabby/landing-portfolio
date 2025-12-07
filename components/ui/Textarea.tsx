"use client";

import { forwardRef } from "react";
import { AlertCircle, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  success?: string;
  hint?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, success, hint, className, id, ...props }, ref) => {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-medium text-foreground mb-2"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={cn(
            "w-full px-4 py-3 bg-card border rounded-xl",
            "text-foreground placeholder:text-muted",
            "transition-all duration-300 resize-none",
            "focus:outline-none focus:ring-2 focus:ring-offset-0",
            error
              ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
              : success
              ? "border-success focus:border-success focus:ring-success/20"
              : "border-border focus:border-primary focus:ring-primary/20",
            className
          )}
          {...props}
        />
        {(error || success || hint) && (
          <div className="mt-2 flex items-start gap-1.5">
            {error && (
              <>
                <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-500">{error}</p>
              </>
            )}
            {success && !error && (
              <>
                <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                <p className="text-sm text-success">{success}</p>
              </>
            )}
            {hint && !error && !success && (
              <p className="text-sm text-muted-foreground">{hint}</p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;