"use client";

import { forwardRef } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline" | "danger";
type ButtonSize = "sm" | "md" | "lg" | "xl";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const variants: Record<ButtonVariant, string> = {
  primary: `
    bg-primary text-white font-semibold
    hover:bg-primary-hover hover:shadow-glow
    focus:ring-primary/50
  `,
  secondary: `
    bg-transparent text-foreground font-semibold
    border border-border
    hover:bg-card hover:border-primary/50
    focus:ring-primary/50
  `,
  ghost: `
    bg-transparent text-muted-foreground font-medium
    hover:text-foreground hover:bg-card
    focus:ring-primary/50
  `,
  outline: `
    bg-transparent text-primary font-semibold
    border border-primary/50
    hover:bg-primary/10 hover:border-primary
    focus:ring-primary/50
  `,
  danger: `
    bg-red-500/10 text-red-500 font-semibold
    border border-red-500/20
    hover:bg-red-500/20 hover:border-red-500/40
    focus:ring-red-500/50
  `,
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm rounded-lg gap-1.5",
  md: "px-4 py-2.5 text-sm rounded-xl gap-2",
  lg: "px-6 py-3 text-base rounded-xl gap-2",
  xl: "px-8 py-4 text-lg rounded-2xl gap-3",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
        whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
        className={cn(
          "inline-flex items-center justify-center transition-all duration-300",
          "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
          variants[variant],
          sizes[size],
          fullWidth && "w-full",
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Loading...</span>
          </>
        ) : (
          <>
            {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
          </>
        )}
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export default Button;