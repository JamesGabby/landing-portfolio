"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Quote, Star, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { testimonials,
  getFeaturedTestimonials,
  stats } from "@/lib/data/testimonials";
import SectionHeader from "@/components/ui/SectionHeader";
import TestimonialCard from "../ui/TestimonialCard";
import TestimonialsCarousel from "../ui/TestimonialsCarousel";
import ClientLogos from "../ui/ClientLogos";
import Button from "@/components/ui/Button";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

// Stats display component
const TestimonialStats = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 bg-card border border-border rounded-2xl mb-16"
    >
      <div className="text-center">
        <div className="flex items-center justify-center gap-1 mb-1">
          <span className="text-3xl font-bold text-foreground">
            {stats.averageRating}
          </span>
          <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
        </div>
        <p className="text-sm text-muted-foreground">Average Rating</p>
      </div>

      <div className="text-center">
        <div className="text-3xl font-bold text-foreground mb-1">
          <AnimatedCounter value={stats.totalReviews} suffix="+" />
        </div>
        <p className="text-sm text-muted-foreground">Happy Clients</p>
      </div>

      <div className="text-center">
        <div className="text-3xl font-bold text-foreground mb-1">
          <AnimatedCounter value={stats.satisfactionRate} suffix="%" />
        </div>
        <p className="text-sm text-muted-foreground">Satisfaction Rate</p>
      </div>

      <div className="text-center">
        <div className="text-3xl font-bold text-foreground mb-1">
          <AnimatedCounter value={stats.repeatClients} suffix="%" />
        </div>
        <p className="text-sm text-muted-foreground">Repeat Clients</p>
      </div>
    </motion.div>
  );
};

// View toggle component
const ViewToggle = ({
  view,
  setView,
}: {
  view: "carousel" | "grid";
  setView: (view: "carousel" | "grid") => void;
}) => (
  <div className="flex items-center justify-center gap-2 mb-12">
    <button
      onClick={() => setView("carousel")}
      className={cn(
        "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300",
        view === "carousel"
          ? "bg-primary text-white"
          : "bg-card border border-border text-muted-foreground hover:text-foreground"
      )}
    >
      Carousel
    </button>
    <button
      onClick={() => setView("grid")}
      className={cn(
        "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300",
        view === "grid"
          ? "bg-primary text-white"
          : "bg-card border border-border text-muted-foreground hover:text-foreground"
      )}
    >
      Grid View
    </button>
  </div>
);

export default function Testimonials() {
  const [view, setView] = useState<"carousel" | "grid">("carousel");
  const featuredTestimonials = getFeaturedTestimonials();

  return (
    <section
      id="testimonials"
      className="py-24 lg:py-32 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[128px]" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[128px]" />

      <div className="relative section-padding">
        <div className="container-custom">
          {/* Header */}
          <SectionHeader
            badge="Testimonials"
            badgeIcon={<Sparkles className="w-3 h-3" />}
            title="Loved by AI startups worldwide"
            titleHighlight="AI startups"
            description="Don't just take my word for it. Here's what founders and teams say about working with me."
          />

          {/* Stats */}
          <TestimonialStats />

          {/* View Toggle */}
          <ViewToggle view={view} setView={setView} />

          {/* Testimonials Display */}
          {view === "carousel" ? (
            <TestimonialsCarousel
              testimonials={testimonials}
              autoPlay={true}
              interval={6000}
            />
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={testimonial.id}
                  testimonial={testimonial}
                  index={index}
                  variant="default"
                />
              ))}
            </div>
          )}

          {/* Featured Testimonial Highlight */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-20"
          >
            <div className="text-center mb-10">
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Featured Story
              </h3>
              <p className="text-muted-foreground">
                A closer look at one of our success stories
              </p>
            </div>

            <TestimonialCard
              testimonial={featuredTestimonials[0]}
              variant="featured"
            />
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-16 text-center"
          >
            <p className="text-muted-foreground mb-6">
              Ready to become the next success story?
            </p>
            <Button
              size="lg"
              rightIcon={<ArrowRight className="w-5 h-5" />}
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

      {/* Client Logos Marquee */}
      <div className="mt-16 border-t border-b border-border py-8 bg-card/50">
        <ClientLogos variant="marquee" showTitle={true} />
      </div>
    </section>
  );
}