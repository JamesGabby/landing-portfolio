"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Project } from "@/types";
import Badge from "@/components/ui/Badge";

interface ProjectShowcaseProps {
  projects: Project[];
  onViewDetails: (project: Project) => void;
}

export default function ProjectShowcase({
  projects,
  onViewDetails,
}: ProjectShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const checkScrollability = () => {
    if (!containerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    checkScrollability();
    container.addEventListener("scroll", checkScrollability);
    window.addEventListener("resize", checkScrollability);

    return () => {
      container.removeEventListener("scroll", checkScrollability);
      window.removeEventListener("resize", checkScrollability);
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (!containerRef.current) return;
    const scrollAmount = containerRef.current.clientWidth * 0.8;
    containerRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollLeft, clientWidth } = containerRef.current;
    const cardWidth = clientWidth * 0.8;
    const newIndex = Math.round(scrollLeft / cardWidth);
    setActiveIndex(Math.min(newIndex, projects.length - 1));
  };

  return (
    <div className="relative">
      {/* Navigation buttons */}
      <div className="absolute -top-16 right-0 flex items-center gap-2 z-10">
        <button
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
          className={cn(
            "p-3 rounded-xl border border-border transition-all duration-300",
            canScrollLeft
              ? "bg-card hover:bg-card-hover hover:border-primary/30 text-foreground"
              : "opacity-30 cursor-not-allowed text-muted"
          )}
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
          className={cn(
            "p-3 rounded-xl border border-border transition-all duration-300",
            canScrollRight
              ? "bg-card hover:bg-card-hover hover:border-primary/30 text-foreground"
              : "opacity-30 cursor-not-allowed text-muted"
          )}
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      {/* Scrollable container */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:-mx-8 md:px-8"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {projects.map((project, index) => (
          <ProjectShowcaseCard
            key={project.id}
            project={project}
            index={index}
            isActive={index === activeIndex}
            onViewDetails={onViewDetails}
          />
        ))}
      </div>

      {/* Progress indicators */}
      <div className="flex items-center justify-center gap-2 mt-6">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (!containerRef.current) return;
              const cardWidth = containerRef.current.clientWidth * 0.8;
              containerRef.current.scrollTo({
                left: cardWidth * index,
                behavior: "smooth",
              });
            }}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              index === activeIndex
                ? "w-8 bg-primary"
                : "w-1.5 bg-border hover:bg-muted"
            )}
          />
        ))}
      </div>
    </div>
  );
}

// Individual showcase card
function ProjectShowcaseCard({
  project,
  index,
  isActive,
  onViewDetails,
}: {
  project: Project;
  index: number;
  isActive: boolean;
  onViewDetails: (project: Project) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xPos = (e.clientX - rect.left) / rect.width - 0.5;
    const yPos = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPos);
    y.set(yPos);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        transformStyle: "preserve-3d",
      }}
      className="flex-shrink-0 w-[85vw] md:w-[70vw] lg:w-[60vw] snap-center"
    >
      <div
        className={cn(
          "relative h-[500px] md:h-[600px] rounded-3xl overflow-hidden border transition-all duration-500 group",
          isActive
            ? "border-primary/50 shadow-glow"
            : "border-border hover:border-primary/30"
        )}
      >
        {/* Background Image */}
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="80vw"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
          {/* Category */}
          <Badge variant="default" className="w-fit mb-4">
            {project.category}
          </Badge>

          {/* Title & Subtitle */}
          <h3 className="text-2xl md:text-4xl font-bold text-foreground mb-2">
            {project.title}
          </h3>
          {project.subtitle && (
            <p className="text-lg md:text-xl text-primary mb-4">
              {project.subtitle}
            </p>
          )}

          {/* Description */}
          <p className="text-muted-foreground mb-6 max-w-2xl line-clamp-2 md:line-clamp-3">
            {project.description}
          </p>

          {/* Metrics */}
          {project.metrics && (
            <div className="flex flex-wrap gap-6 mb-8">
              {project.metrics.map((metric, i) => (
                <div key={i}>
                  <div className="text-2xl md:text-3xl font-bold text-gradient">
                    {metric.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-4">
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
                Live Site
              </a>
            )}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-border/50">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-medium bg-card/50 backdrop-blur-sm border border-border/50 rounded-full text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}