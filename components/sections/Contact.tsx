"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  MessageSquare,
  Calendar,
  ArrowRight,
  CheckCircle,
  Zap,
  Clock,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { contactReasons } from "@/lib/data/contact";
import SectionHeader from "@/components/ui/SectionHeader";
import ContactForm from "../ui/ContactForm";
import ContactInfoCard from "../ui/ContactInfoCard";
import NewsletterForm from "../ui/NewsletterForm";
import Button from "@/components/ui/Button";

// Quick contact reasons - improved responsive grid
const ContactReasons = ({
  selected,
  onSelect,
}: {
  selected: string | null;
  onSelect: (id: string) => void;
}) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
    {contactReasons.map((reason, index) => {
      const Icon = reason.icon;
      const isSelected = selected === reason.title;

      return (
        <motion.button
          key={reason.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          onClick={() => onSelect(reason.title)}
          className={cn(
            "p-3 sm:p-4 rounded-xl border text-left transition-all duration-300",
            "flex sm:flex-col items-center sm:items-start gap-3 sm:gap-0",
            isSelected
              ? "bg-primary/10 border-primary/30"
              : "bg-card border-border hover:border-primary/20 active:scale-[0.98]"
          )}
        >
          <div
            className={cn(
              "w-10 h-10 min-w-[2.5rem] rounded-lg flex items-center justify-center sm:mb-3 transition-colors duration-300",
              isSelected
                ? "bg-primary text-white"
                : "bg-primary/10 text-primary"
            )}
          >
            <Icon className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-foreground mb-0.5 sm:mb-1 text-sm sm:text-base">
              {reason.title}
            </h4>
            <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
              {reason.description}
            </p>
          </div>
        </motion.button>
      );
    })}
  </div>
);

// Trust badges - improved wrapping and spacing
const TrustBadges = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-muted-foreground"
  >
    <div className="flex items-center gap-1.5 sm:gap-2 justify-center sm:justify-start">
      <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-success flex-shrink-0" />
      <span className="whitespace-nowrap">Free consultation</span>
    </div>
    <div className="flex items-center gap-1.5 sm:gap-2 justify-center sm:justify-start">
      <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
      <span className="whitespace-nowrap">Quick response</span>
    </div>
    <div className="flex items-center gap-1.5 sm:gap-2 justify-center sm:justify-start">
      <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent flex-shrink-0" />
      <span className="whitespace-nowrap">No obligation</span>
    </div>
    <div className="flex items-center gap-1.5 sm:gap-2 justify-center sm:justify-start">
      <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-success flex-shrink-0" />
      <span className="whitespace-nowrap">NDA available</span>
    </div>
  </motion.div>
);

// Newsletter section - improved padding and typography
const NewsletterSection = () => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="mt-12 sm:mt-16 lg:mt-20 p-5 sm:p-8 md:p-12 bg-card border border-border rounded-2xl sm:rounded-3xl text-center"
  >
    <div className="max-w-xl mx-auto">
      <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 bg-primary/10 rounded-full text-primary text-xs sm:text-sm font-medium mb-3 sm:mb-4">
        <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        Stay Updated
      </div>
      <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2 sm:mb-3 px-2">
        Get tips on building better AI landing pages
      </h3>
      <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 px-2">
        Join 500+ founders and developers. I share insights on design,
        development, and conversion optimization. No spam, unsubscribe anytime.
      </p>
      <NewsletterForm variant="inline" />
    </div>
  </motion.div>
);

// Main Contact Component
export default function Contact() {
  const [selectedReason, setSelectedReason] = useState<string | null>(null);

  return (
    <section 
      id="contact" 
      className="py-16 sm:py-20 lg:py-24 xl:py-32 relative overflow-hidden"
    >
      {/* Background - adjusted for mobile */}
      <div className="absolute inset-0 bg-grid opacity-20 sm:opacity-30" />
      <div className="absolute top-0 right-0 sm:right-1/4 w-48 sm:w-72 lg:w-96 h-48 sm:h-72 lg:h-96 bg-primary/5 rounded-full blur-[64px] sm:blur-[96px] lg:blur-[128px]" />
      <div className="absolute bottom-0 left-0 sm:left-1/4 w-48 sm:w-72 lg:w-96 h-48 sm:h-72 lg:h-96 bg-accent/5 rounded-full blur-[64px] sm:blur-[96px] lg:blur-[128px]" />

      <div className="relative section-padding">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <SectionHeader
            badge="Get in Touch"
            badgeIcon={<MessageSquare className="w-3 h-3" />}
            title="Let's build something amazing together"
            titleHighlight="amazing together"
            description="Have a project in mind? I'd love to hear about it. Fill out the form below or schedule a call, and I'll get back to you within 24 hours."
          />

          {/* Trust badges */}
          <div className="mb-8 sm:mb-10 lg:mb-12">
            <TrustBadges />
          </div>

          {/* Contact reasons */}
          <ContactReasons
            selected={selectedReason}
            onSelect={setSelectedReason}
          />

          {/* Main content grid - improved responsive layout */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-12 xl:gap-16">
            {/* Contact Form - Takes more space */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-3 order-2 lg:order-1"
            >
              <div className="bg-card border border-border rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8">
                <div className="mb-4 sm:mb-6">
                  <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-1.5 sm:mb-2">
                    Send me a message
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    Fill out the form below and I'll get back to you as soon as
                    possible.
                  </p>
                </div>
                <ContactForm variant="full" />
              </div>
            </motion.div>

            {/* Contact Info Sidebar - shows first on mobile */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-2 order-1 lg:order-2"
            >
              <ContactInfoCard />
            </motion.div>
          </div>

          {/* Newsletter Section */}
          <NewsletterSection />

          {/* Bottom CTA - improved mobile layout */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-12 sm:mt-16 lg:mt-20 text-center"
          >
            <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4">
              Prefer to talk? Let's schedule a call.
            </p>
            <Button
              size="lg"
              variant="secondary"
              leftIcon={<Calendar className="w-4 h-4 sm:w-5 sm:h-5" />}
              rightIcon={<ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />}
              onClick={() => {
                window.open(
                  "https://calendly.com/jamesgabbitus/",
                  "_blank"
                );
              }}
              className="w-full sm:w-auto text-sm sm:text-base px-4 sm:px-6"
            >
              Book a Free Discovery Call
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}