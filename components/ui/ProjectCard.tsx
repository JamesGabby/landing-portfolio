"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, ExternalLink, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { Project } from "@/types";
import Badge from "@/components/ui/Badge";
import ProjectImagePlaceholder from "@/components/ui/ProjectImagePlaceholder";

interface ProjectCardProps {
  project: Project;
  index: number;
  onViewDetails: (project: Project) => void;
  variant?: "default" | "featured";
}

// Project Image with Fallback
function ProjectImage({
  src,
  alt,
  title,
  category,
  fill = true,
  className,
  sizes,
}: {
  src: string;
  alt: string;
  title: string;
  category?: string;
  fill?: boolean;
  className?: string;
  sizes?: string;
}) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check if it's a placeholder path or empty
  const isPlaceholder = !src || src.startsWith("/projects/");

  if (hasError || isPlaceholder) {
    return (
      <ProjectImagePlaceholder
        title={title}
        category={category}
        variant="gradient"
      />
    );
  }

  return (
    <>
      {isLoading && (
        <div className="absolute inset-0 bg-card animate-pulse" />
      )}
      <Image
        src={src}
        alt={alt}
        fill={fill}
        className={cn(
          className,
          isLoading ? "opacity-0" : "opacity-100",
          "transition-opacity duration-300"
        )}
        sizes={sizes}
        onError={() => setHasError(true)}
        onLoadingComplete={() => setIsLoading(false)}
      />
    </>
  );
}

export default function ProjectCard({
  project,
  index,
  onViewDetails,
  variant = "default",
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  // Featured variant
  if (variant === "featured") {
    return (
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          transformStyle: "preserve-3d",
        }}
        className="group relative"
      >
        <div className="grid lg:grid-cols-2 gap-8 items-center bg-card border border-border rounded-3xl overflow-hidden hover:border-primary/30 transition-colors duration-300">
          {/* Image */}
          <div className="relative aspect-[4/3] lg:aspect-auto lg:h-full min-h-[300px] lg:min-h-[450px] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent z-10 lg:hidden" />
            <ProjectImage
              src={project.image}
              alt={project.title}
              title={project.title}
              category={project.category}
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Overlay on hover */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              className="absolute inset-0 bg-primary/10 z-10"
            />
          </div>

          {/* Content */}
          <div className="p-8 lg:p-12">
            {/* Category & Year */}
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="default">{project.category}</Badge>
              {project.year && (
                <span className="text-sm text-muted-foreground">
                  {project.year}
                </span>
              )}
            </div>

            {/* Title & Description */}
            <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
              {project.title}
            </h3>
            {project.subtitle && (
              <p className="text-lg text-primary mb-4">{project.subtitle}</p>
            )}
            <p className="text-muted-foreground mb-6 line-clamp-3">
              {project.description}
            </p>

            {/* Metrics */}
            {project.metrics && project.metrics.length > 0 && (
              <div className="grid grid-cols-3 gap-4 mb-8 p-4 bg-background/50 rounded-2xl">
                {project.metrics.map((metric, i) => (
                  <div key={i} className="text-center">
                    <div className="text-xl font-bold text-foreground">
                      {metric.value}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs font-medium bg-card border border-border rounded-full text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => onViewDetails(project)}
                className="btn-primary"
              >
                View Case Study
                <ArrowUpRight className="w-4 h-4" />
              </button>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Site
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Default card variant
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        transformStyle: "preserve-3d",
      }}
      className="group relative"
    >
      <div className="relative bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-300 hover:shadow-glow-sm h-full flex flex-col">
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <ProjectImage
            src={project.image}
            alt={project.title}
            title={project.title}
            category={project.category}
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Hover Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent flex items-end justify-center pb-6"
          >
            <div className="flex items-center gap-3">
              <button
                onClick={() => onViewDetails(project)}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors"
              >
                <Eye className="w-4 h-4" />
                View Details
              </button>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg text-white hover:bg-white/20 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </motion.div>

          {/* Category badge */}
          <div className="absolute top-4 left-4 z-10">
            <Badge variant="default" className="backdrop-blur-sm bg-background/80">
              {project.category}
            </Badge>
          </div>

          {/* Featured badge */}
          {project.featured && (
            <div className="absolute top-4 right-4 z-10">
              <Badge variant="accent" className="backdrop-blur-sm bg-background/80">
                Featured
              </Badge>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          {project.subtitle && (
            <p className="text-sm text-muted-foreground mb-3">
              {project.subtitle}
            </p>
          )}

          {/* Description - only show on larger cards */}
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mt-auto">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-xs bg-background border border-border rounded text-muted-foreground"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="px-2 py-0.5 text-xs text-muted-foreground">
                +{project.tags.length - 3}
              </span>
            )}
          </div>

          {/* Metrics preview for default cards */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border">
              {project.metrics.slice(0, 2).map((metric, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-primary">
                    {metric.value}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {metric.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}