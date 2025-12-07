"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { clientLogos } from "@/lib/data/testimonials";

interface ClientLogosProps {
  variant?: "static" | "marquee";
  showTitle?: boolean;
  className?: string;
}

// Logo placeholder component
const LogoPlaceholder = ({ name }: { name: string }) => (
  <div className="flex items-center gap-2 px-4 py-2">
    <Sparkles className="w-5 h-5 text-muted-foreground" />
    <span className="text-lg font-semibold text-muted-foreground whitespace-nowrap">
      {name}
    </span>
  </div>
);

// Single logo component with fallback
const ClientLogo = ({
  name,
  logo,
  index,
}: {
  name: string;
  logo: string;
  index: number;
}) => {
  const [hasError, setHasError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="flex items-center justify-center px-6 py-4 grayscale hover:grayscale-0 opacity-50 hover:opacity-100 transition-all duration-300"
    >
      {!hasError && logo && !logo.includes("/logos/") ? (
        <div className="relative h-8 w-32">
          <Image
            src={logo}
            alt={name}
            fill
            className="object-contain"
            onError={() => setHasError(true)}
          />
        </div>
      ) : (
        <LogoPlaceholder name={name} />
      )}
    </motion.div>
  );
};

export default function ClientLogos({
  variant = "static",
  showTitle = true,
  className,
}: ClientLogosProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true });

  // Marquee variant with infinite scroll
  if (variant === "marquee") {
    const duplicatedLogos = [...clientLogos, ...clientLogos];

    return (
      <div ref={containerRef} className={cn("relative overflow-hidden py-8", className)}>
        {showTitle && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            className="text-center text-sm text-muted-foreground mb-8"
          >
            Trusted by innovative AI startups
          </motion.p>
        )}

        {/* Gradient masks */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        {/* Scrolling logos */}
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            x: {
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            },
          }}
          className="flex items-center gap-8"
          style={{ width: "fit-content" }}
        >
          {duplicatedLogos.map((client, index) => (
            <div
              key={`${client.name}-${index}`}
              className="flex-shrink-0 px-6 py-4 grayscale hover:grayscale-0 opacity-50 hover:opacity-100 transition-all duration-300"
            >
              <LogoPlaceholder name={client.name} />
            </div>
          ))}
        </motion.div>
      </div>
    );
  }

  // Static grid variant
  return (
    <div ref={containerRef} className={cn("py-8", className)}>
      {showTitle && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          className="text-center text-sm text-muted-foreground mb-8"
        >
          Trusted by innovative AI startups
        </motion.p>
      )}

      <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
        {clientLogos.map((client, index) => (
          <ClientLogo
            key={client.name}
            name={client.name}
            logo={client.logo}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}

// Don't forget the import
import { useState } from "react";