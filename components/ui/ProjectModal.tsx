"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ExternalLink,
  ArrowLeft,
  ArrowRight,
  Quote,
  Calendar,
  Clock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Project } from "@/types";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
  hasNext?: boolean;
  hasPrevious?: boolean;
}

export default function ProjectModal({
  project,
  isOpen,
  onClose,
  onNext,
  onPrevious,
  hasNext = false,
  hasPrevious = false,
}: ProjectModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageLoading, setIsImageLoading] = useState(true);

  // Reset image index when project changes
  useEffect(() => {
    setCurrentImageIndex(0);
    setIsImageLoading(true);
  }, [project]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && hasNext) onNext?.();
      if (e.key === "ArrowLeft" && hasPrevious) onPrevious?.();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose, onNext, onPrevious, hasNext, hasPrevious]);

  if (!project) return null;

  const allImages = [project.image, ...(project.images || [])];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
    setIsImageLoading(true);
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
    setIsImageLoading(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/90 backdrop-blur-md z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-4 md:inset-8 lg:inset-12 z-50 overflow-hidden"
          >
            <div className="relative w-full h-full bg-card border border-border rounded-3xl overflow-hidden flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-4 md:p-6 border-b border-border">
                <div className="flex items-center gap-4">
                  {/* Navigation */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={onPrevious}
                      disabled={!hasPrevious}
                      className={cn(
                        "p-2 rounded-lg border border-border transition-all duration-300",
                        hasPrevious
                          ? "hover:bg-card-hover hover:border-primary/30 text-foreground"
                          : "opacity-30 cursor-not-allowed text-muted"
                      )}
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={onNext}
                      disabled={!hasNext}
                      className={cn(
                        "p-2 rounded-lg border border-border transition-all duration-300",
                        hasNext
                          ? "hover:bg-card-hover hover:border-primary/30 text-foreground"
                          : "opacity-30 cursor-not-allowed text-muted"
                      )}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="h-6 w-px bg-border hidden sm:block" />

                  {/* Project title */}
                  <div className="hidden sm:block">
                    <h2 className="font-semibold text-foreground">{project.title}</h2>
                  </div>
                </div>

                {/* Close button */}
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg border border-border hover:bg-card-hover hover:border-primary/30 transition-all duration-300"
                >
                  <X className="w-5 h-5 text-foreground" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto">
                <div className="grid lg:grid-cols-2 min-h-full">
                  {/* Left - Image Gallery */}
                  <div className="relative bg-background/50 p-4 md:p-8 flex flex-col">
                    {/* Main Image */}
                    <div className="relative flex-1 min-h-[300px] md:min-h-[400px] rounded-2xl overflow-hidden bg-card">
                      {isImageLoading && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                        </div>
                      )}
                      <Image
                        src={allImages[currentImageIndex]}
                        alt={`${project.title} - Image ${currentImageIndex + 1}`}
                        fill
                        className={cn(
                          "object-cover transition-opacity duration-300",
                          isImageLoading ? "opacity-0" : "opacity-100"
                        )}
                        onLoadingComplete={() => setIsImageLoading(false)}
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />

                      {/* Image navigation */}
                      {allImages.length > 1 && (
                        <>
                          <button
                            onClick={previousImage}
                            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:bg-background transition-colors"
                          >
                            <ChevronLeft className="w-5 h-5 text-foreground" />
                          </button>
                          <button
                            onClick={nextImage}
                            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:bg-background transition-colors"
                          >
                            <ChevronRight className="w-5 h-5 text-foreground" />
                          </button>
                        </>
                      )}
                    </div>

                    {/* Image indicators */}
                    {allImages.length > 1 && (
                      <div className="flex items-center justify-center gap-2 mt-4">
                        {allImages.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              setCurrentImageIndex(index);
                              setIsImageLoading(true);
                            }}
                            className={cn(
                              "w-2 h-2 rounded-full transition-all duration-300",
                              currentImageIndex === index
                                ? "bg-primary w-6"
                                : "bg-border hover:bg-muted"
                            )}
                          />
                        ))}
                      </div>
                    )}

                    {/* Thumbnail strip */}
                    {allImages.length > 1 && (
                      <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                        {allImages.map((image, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              setCurrentImageIndex(index);
                              setIsImageLoading(true);
                            }}
                            className={cn(
                              "relative flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all duration-300",
                              currentImageIndex === index
                                ? "border-primary"
                                : "border-transparent opacity-60 hover:opacity-100"
                            )}
                          >
                            <Image
                              src={image}
                              alt={`Thumbnail ${index + 1}`}
                              fill
                              className="object-cover"
                              sizes="80px"
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Right - Details */}
                  <div className="p-6 md:p-8 lg:p-12 overflow-y-auto">
                    {/* Category & Meta */}
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <Badge variant="default">{project.category}</Badge>
                      {project.year && (
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          {project.year}
                        </div>
                      )}
                      {project.duration && (
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          {project.duration}
                        </div>
                      )}
                    </div>

                    {/* Title */}
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2">
                      {project.title}
                    </h1>
                    {project.subtitle && (
                      <p className="text-lg text-primary mb-6">{project.subtitle}</p>
                    )}

                    {/* Description */}
                    <div className="prose prose-invert max-w-none mb-8">
                      <p className="text-muted-foreground leading-relaxed">
                        {project.longDescription || project.description}
                      </p>
                    </div>

                    {/* Metrics */}
                    {project.metrics && project.metrics.length > 0 && (
                      <div className="mb-8">
                        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
                          Results
                        </h3>
                        <div className="grid grid-cols-3 gap-4">
                          {project.metrics.map((metric, index) => (
                            <motion.div
                              key={metric.label}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="text-center p-4 bg-background/50 rounded-xl border border-border"
                            >
                              <div className="text-2xl font-bold text-gradient">
                                {metric.value}
                              </div>
                              <div className="text-xs text-muted-foreground mt-1">
                                {metric.label}
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Technologies */}
                    <div className="mb-8">
                      <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
                        Technologies Used
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1.5 text-sm bg-card border border-border rounded-lg text-muted-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Testimonial */}
                    {project.testimonial && (
                      <div className="mb-8 p-6 bg-primary/5 rounded-2xl border border-primary/20">
                        <Quote className="w-8 h-8 text-primary/40 mb-4" />
                        <blockquote className="text-foreground mb-4 italic">
                          "{project.testimonial.quote}"
                        </blockquote>
                        <div className="flex items-center gap-3">
                          {project.testimonial.avatar && (
                            <div className="relative w-10 h-10 rounded-full overflow-hidden">
                              <Image
                                src={project.testimonial.avatar}
                                alt={project.testimonial.author}
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}
                          <div>
                            <div className="font-medium text-foreground">
                              {project.testimonial.author}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {project.testimonial.role}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-border">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary flex-1 justify-center"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Visit Live Site
                        </a>
                      )}
                      <Button
                        variant="secondary"
                        className="flex-1 justify-center"
                        onClick={() => {
                          onClose();
                          document.getElementById("contact")?.scrollIntoView({
                            behavior: "smooth",
                          });
                        }}
                      >
                        Start Similar Project
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}