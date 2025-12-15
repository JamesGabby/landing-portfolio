"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Filter, Grid3X3, LayoutList } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  projects,
  projectCategories,
  getFeaturedProjects,
} from "@/lib/data/projects";
import { Project } from "@/types";
import SectionHeader from "@/components/ui/SectionHeader";
import ProjectCard from "@/components/ui/ProjectCard";
import ProjectModal from "@/components/ui/ProjectModal";
import Button from "@/components/ui/Button";

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "featured">("featured");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const featuredProjects = getFeaturedProjects();

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") return projects;
    return projects.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const handleViewDetails = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  const handleNextProject = () => {
    if (!selectedProject) return;
    const currentIndex = filteredProjects.findIndex(
      (p) => p.id === selectedProject.id
    );
    const nextIndex = (currentIndex + 1) % filteredProjects.length;
    setSelectedProject(filteredProjects[nextIndex]);
  };

  const handlePreviousProject = () => {
    if (!selectedProject) return;
    const currentIndex = filteredProjects.findIndex(
      (p) => p.id === selectedProject.id
    );
    const prevIndex =
      (currentIndex - 1 + filteredProjects.length) % filteredProjects.length;
    setSelectedProject(filteredProjects[prevIndex]);
  };

  const currentProjectIndex = selectedProject
    ? filteredProjects.findIndex((p) => p.id === selectedProject.id)
    : -1;

  return (
    <>
      <section
        id="portfolio"
        className="py-24 lg:py-32 relative overflow-hidden"
      >
        {/* Background */}
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[128px]" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[128px]" />

        <div className="relative section-padding">
          <div className="container-custom">
            {/* Header */}
            <SectionHeader
              badge="Portfolio"
              badgeIcon={<Sparkles className="w-3 h-3" />}
              title="Featured projects that drive results"
              titleHighlight="drive results"
              description="Every project is crafted to convert visitors into customers. Here's a selection of my recent work for AI startups."
            />

            {/* Controls */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
              {/* Category filters */}
              <div className="flex flex-wrap items-center gap-2">
                {projectCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={cn(
                      "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                      activeCategory === category
                        ? "bg-primary text-white"
                        : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
                    )}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* View toggle */}
              <div className="flex items-center gap-1 p-1 bg-card border border-border rounded-lg">
                <button
                  onClick={() => setViewMode("featured")}
                  className={cn(
                    "flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-300",
                    viewMode === "featured"
                      ? "bg-primary text-white"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <LayoutList className="w-4 h-4" />
                  <span className="hidden sm:inline">Featured</span>
                </button>
                <button
                  onClick={() => setViewMode("grid")}
                  className={cn(
                    "flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-300",
                    viewMode === "grid"
                      ? "bg-primary text-white"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Grid3X3 className="w-4 h-4" />
                  <span className="hidden sm:inline">Grid</span>
                </button>
              </div>
            </div>

            {/* Projects */}
            <AnimatePresence mode="wait">
              {viewMode === "featured" ? (
                <motion.div
                  key="featured"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-8"
                >
                  {(activeCategory === "All"
                    ? featuredProjects
                    : filteredProjects.filter((p) => p.featured)
                  ).map((project, index) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      index={index}
                      onViewDetails={handleViewDetails}
                      variant="featured"
                    />
                  ))}

                  {/* More projects in grid below */}
                  {activeCategory === "All" &&
                    projects.filter((p) => !p.featured).length > 0 && (
                      <>
                        <div className="pt-12">
                          <h3 className="text-xl font-semibold text-foreground mb-8 text-center">
                            More Projects
                          </h3>
                          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {projects
                              .filter((p) => !p.featured)
                              .map((project, index) => (
                                <ProjectCard
                                  key={project.id}
                                  project={project}
                                  index={index}
                                  onViewDetails={handleViewDetails}
                                  variant="default"
                                />
                              ))}
                          </div>
                        </div>
                      </>
                    )}
                </motion.div>
              ) : (
                <motion.div
                  key="grid"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {filteredProjects.map((project, index) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      index={index}
                      onViewDetails={handleViewDetails}
                      variant="default"
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Empty state */}
            {filteredProjects.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16"
              >
                <Filter className="w-12 h-12 text-muted mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">
                  No projects found
                </h3>
                <p className="text-muted-foreground mb-6">
                  No projects match the selected category.
                </p>
                <Button
                  variant="secondary"
                  onClick={() => setActiveCategory("All")}
                >
                  View All Projects
                </Button>
              </motion.div>
            )}

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mt-16 text-center"
            >
              <p className="text-muted-foreground mb-6">
                Like what you see? Let's create something amazing together.
              </p>
              <Button
                size="lg"
                onClick={() => {
                  document.getElementById("contact")?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
              >
                Start Your Project
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onNext={handleNextProject}
        onPrevious={handlePreviousProject}
        hasNext={currentProjectIndex < filteredProjects.length - 1}
        hasPrevious={currentProjectIndex > 0}
      />
    </>
  );
}