"use client";

import { forwardRef, useState } from "react";
import { Eye, EyeOff, AlertCircle, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      success,
      hint,
      leftIcon,
      rightIcon,
      type = "text",
      className,
      id,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");
    const isPassword = type === "password";

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-foreground mb-2"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            type={isPassword && showPassword ? "text" : type}
            className={cn(
              "w-full px-4 py-3 bg-card border rounded-xl",
              "text-foreground placeholder:text-muted",
              "transition-all duration-300",
              "focus:outline-none focus:ring-2 focus:ring-offset-0",
              leftIcon && "pl-12",
              (rightIcon || isPassword) && "pr-12",
              error
                ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                : success
                ? "border-success focus:border-success focus:ring-success/20"
                : "border-border focus:border-primary focus:ring-primary/20",
              className
            )}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition-colors"
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          )}
          {rightIcon && !isPassword && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted">
              {rightIcon}
            </div>
          )}
        </div>
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

Input.displayName = "Input";

export default Input;