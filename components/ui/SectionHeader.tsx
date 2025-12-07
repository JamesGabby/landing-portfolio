"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Badge from "./Badge";

interface SectionHeaderProps {
  badge?: string;
  badgeIcon?: React.ReactNode;
  title: string;
  titleHighlight?: string;
  description?: string;
  alignment?: "left" | "center";
  className?: string;
}

export default function SectionHeader({
  badge,
  badgeIcon,
  title,
  titleHighlight,
  description,
  alignment = "center",
  className,
}: SectionHeaderProps) {
  // Split title around the highlight
  const renderTitle = () => {
    if (!titleHighlight) {
      return title;
    }
    
    const parts = title.split(titleHighlight);
    return (
      <>
        {parts[0]}
        <span className="text-gradient">{titleHighlight}</span>
        {parts[1]}
      </>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className={cn(
        "mb-12 lg:mb-16",
        alignment === "center" && "text-center",
        className
      )}
    >
      {badge && (
        <Badge icon={badgeIcon} className="mb-4">
          {badge}
        </Badge>
      )}
      <h2 className="section-title mb-4">{renderTitle()}</h2>
      {description && (
        <p
          className={cn(
            "section-subtitle",
            alignment === "center" && "mx-auto"
          )}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}