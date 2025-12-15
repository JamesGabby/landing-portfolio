"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, ExternalLink, Eye, Zap } from "lucide-react";
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
  quality = 85,
}: {
  src: string;
  alt: string;
  title: string;
  category?: string;
  fill?: boolean;
  className?: string;
  sizes?: string;
  quality?: number;
}) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
        unoptimized  
        quality={quality}
        priority
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
  const [isMobile, setIsMobile] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Detect mobile devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024 || 'ontouchstart' in window);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 3D tilt effect (disabled on mobile)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || !cardRef.current) return;

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
        onMouseEnter={() => !isMobile && setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: !isMobile && isHovered ? rotateX : 0,
          rotateY: !isMobile && isHovered ? rotateY : 0,
          transformStyle: "preserve-3d",
        }}
        className="group relative"
      >
        <div className="grid lg:grid-cols-2 gap-0 lg:gap-6 items-center bg-card border border-border rounded-2xl lg:rounded-3xl overflow-hidden hover:border-primary/30 transition-colors duration-300">
          {/* Image - Reduced by 20% */}
          <div className="relative aspect-[16/10] sm:aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[320px] xl:min-h-[360px] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent z-10 lg:hidden" />
            <ProjectImage
              src={project.image}
              alt={project.title}
              title={project.title}
              category={project.category}
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 640px) 80vw, (max-width: 1024px) 40vw, 640px"
              quality={90}
            />
            
            {/* Desktop Overlay on hover */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              className="absolute inset-0 bg-primary/10 z-10 hidden lg:block"
            />

            {/* Mobile: Category & Featured badges on image */}
            <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between lg:hidden">
              <Badge variant="default" className="backdrop-blur-sm bg-background/90 text-xs">
                {project.category}
              </Badge>
              {project.featured && (
                <Badge variant="accent" className="backdrop-blur-sm bg-background/90 text-xs">
                  Featured
                </Badge>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-5 lg:p-6 xl:p-10">
            {/* Category & Year - Desktop only */}
            <div className="hidden lg:flex items-center gap-3 mb-3">
              <Badge variant="default">{project.category}</Badge>
              {project.year && (
                <span className="text-sm text-muted-foreground">
                  {project.year}
                </span>
              )}
            </div>

            {/* Title & Description */}
            <h3 className="text-lg sm:text-xl lg:text-xl xl:text-2xl font-bold text-foreground mb-2">
              {project.title}
            </h3>
            {project.subtitle && (
              <p className="text-sm sm:text-base text-primary mb-2 sm:mb-3">
                {project.subtitle}
              </p>
            )}
            <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-5 line-clamp-3 sm:line-clamp-4">
              {project.description}
            </p>

            {/* Metrics */}
            {project.metrics && project.metrics.length > 0 && (
              <div className="mb-5 sm:mb-6">
                <div className="p-2.5 sm:p-3 bg-background/50 rounded-lg sm:rounded-xl border border-border/30">
                  {/* Inline Banner */}
                  <div className="flex items-center justify-center gap-1.5 mb-2.5 pb-2.5 border-b border-border/30">
                    <Zap className="w-3 h-3 text-yellow-500" />
                    <span className="text-[10px] sm:text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Lighthouse Scores
                    </span>
                  </div>
                  
                  {/* Metrics Grid */}
                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    {project.metrics.map((metric, i) => (
                      <div key={i} className="text-center">
                        <div className="text-sm sm:text-base xl:text-lg font-bold text-foreground">
                          {metric.value}
                        </div>
                        <div className="text-[10px] sm:text-xs text-muted-foreground leading-tight mt-0.5">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-4 sm:mb-5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 sm:px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium bg-card border border-border rounded-full text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
              <button
                onClick={() => onViewDetails(project)}
                className="btn-primary flex-1 sm:flex-initial justify-center text-sm"
              >
                View Case Study
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary flex-1 sm:flex-initial justify-center text-sm"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Live Site</span>
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
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: !isMobile && isHovered ? rotateX : 0,
        rotateY: !isMobile && isHovered ? rotateY : 0,
        transformStyle: "preserve-3d",
      }}
      className="group relative h-full"
    >
      <div className="relative bg-card border border-border rounded-lg sm:rounded-xl overflow-hidden hover:border-primary/30 transition-all duration-300 hover:shadow-glow-sm h-full flex flex-col">
        {/* Image - Reduced by 20% */}
        <div className="relative aspect-[16/9] sm:aspect-[16/8] overflow-hidden">
          <ProjectImage
            src={project.image}
            alt={project.title}
            title={project.title}
            category={project.category}
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 640px) 80vw, (max-width: 1024px) 40vw, 26vw"
          />

          {/* Hover Overlay - Desktop only */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: !isMobile && isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="hidden sm:flex absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent items-end justify-center pb-5"
          >
            <div className="flex items-center gap-2">
              <button
                onClick={() => onViewDetails(project)}
                className="flex items-center gap-2 px-3 py-1.5 bg-primary text-white rounded-lg text-xs font-medium hover:bg-primary-hover transition-colors"
              >
                <Eye className="w-3.5 h-3.5" />
                View Details
              </button>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-8 h-8 bg-white/10 backdrop-blur-sm rounded-lg text-white hover:bg-white/20 transition-colors"
                  aria-label="View live site"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </motion.div>

          {/* Category & Featured badges */}
          <div className="absolute top-2 sm:top-3 left-2 sm:left-3 right-2 sm:right-3 z-10 flex items-center justify-between">
            <Badge variant="default" className="backdrop-blur-sm bg-background/90 text-[10px] sm:text-xs">
              {project.category}
            </Badge>
            {project.featured && (
              <Badge variant="accent" className="backdrop-blur-sm bg-background/90 text-[10px] sm:text-xs">
                Featured
              </Badge>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-3 sm:p-4 lg:p-5 flex-1 flex flex-col">
          <h3 className="text-sm sm:text-base font-semibold text-foreground mb-1 group-hover:text-primary transition-colors line-clamp-2">
            {project.title}
          </h3>
          {project.subtitle && (
            <p className="text-[10px] sm:text-xs text-muted-foreground mb-1.5 sm:mb-2 line-clamp-1">
              {project.subtitle}
            </p>
          )}

          {/* Description */}
          <p className="text-[10px] sm:text-xs text-muted-foreground mb-2 sm:mb-3 line-clamp-2 flex-1">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-2 sm:mb-0">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-1.5 py-0.5 text-[9px] sm:text-[10px] bg-background border border-border rounded text-muted-foreground"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="px-1.5 py-0.5 text-[9px] sm:text-[10px] text-muted-foreground">
                +{project.tags.length - 3}
              </span>
            )}
          </div>

          {/* Metrics preview */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="flex items-center gap-2 sm:gap-3 mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-border">
              {project.metrics.slice(0, 2).map((metric, i) => (
                <div key={i} className="flex items-center gap-1 sm:gap-1.5">
                  <span className="text-[10px] sm:text-xs font-semibold text-primary">
                    {metric.value}
                  </span>
                  <span className="text-[9px] sm:text-[10px] text-muted-foreground">
                    {metric.label}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Mobile: Action button */}
          <button
            onClick={() => onViewDetails(project)}
            className="sm:hidden mt-3 w-full btn-primary text-xs justify-center"
          >
            View Details
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}