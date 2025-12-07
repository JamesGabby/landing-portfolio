// src/app/error.tsx
"use client";

import { useEffect } from "react";
import { RefreshCw, Home } from "lucide-react";
import Button from "@/components/ui/Button";
import Link from "next/link";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log error to analytics/monitoring service
    console.error("Application error:", error);
  }, [error]);

  return (
    <section className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* Error icon */}
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-500/10 flex items-center justify-center">
          <span className="text-4xl">⚠️</span>
        </div>

        {/* Message */}
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
          Something Went Wrong
        </h1>
        <p className="text-muted-foreground mb-8">
          An unexpected error occurred. Please try again or return to the homepage.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={reset}>
            <RefreshCw className="w-4 h-4" />
            Try Again
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">
              <Home className="w-4 h-4" />
              Go Home
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}