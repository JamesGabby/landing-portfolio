"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  MessageSquare,
  Calendar,
  Send,
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

// Quick contact reasons
const ContactReasons = ({
  selected,
  onSelect,
}: {
  selected: string | null;
  onSelect: (id: string) => void;
}) => (
  <div className="grid sm:grid-cols-3 gap-4 mb-8">
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
            "p-4 rounded-xl border text-left transition-all duration-300",
            isSelected
              ? "bg-primary/10 border-primary/30"
              : "bg-card border-border hover:border-primary/20"
          )}
        >
          <div
            className={cn(
              "w-10 h-10 rounded-lg flex items-center justify-center mb-3 transition-colors duration-300",
              isSelected
                ? "bg-primary text-white"
                : "bg-primary/10 text-primary"
            )}
          >
            <Icon className="w-5 h-5" />
          </div>
          <h4 className="font-medium text-foreground mb-1">{reason.title}</h4>
          <p className="text-sm text-muted-foreground">{reason.description}</p>
        </motion.button>
      );
    })}
  </div>
);

// Trust badges
const TrustBadges = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground"
  >
    <div className="flex items-center gap-2">
      <CheckCircle className="w-4 h-4 text-success" />
      <span>Free consultation</span>
    </div>
    <div className="flex items-center gap-2">
      <Zap className="w-4 h-4 text-primary" />
      <span>Quick response</span>
    </div>
    <div className="flex items-center gap-2">
      <Clock className="w-4 h-4 text-accent" />
      <span>No obligation</span>
    </div>
    <div className="flex items-center gap-2">
      <Shield className="w-4 h-4 text-success" />
      <span>NDA available</span>
    </div>
  </motion.div>
);

// Newsletter section
const NewsletterSection = () => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="mt-20 p-8 md:p-12 bg-card border border-border rounded-3xl text-center"
  >
    <div className="max-w-xl mx-auto">
      <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4">
        <Sparkles className="w-4 h-4" />
        Stay Updated
      </div>
      <h3 className="text-2xl font-bold text-foreground mb-3">
        Get tips on building better AI landing pages
      </h3>
      <p className="text-muted-foreground mb-6">
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
    <section id="contact" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[128px]" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[128px]" />

      <div className="relative section-padding">
        <div className="container-custom">
          {/* Header */}
          <SectionHeader
            badge="Get in Touch"
            badgeIcon={<MessageSquare className="w-3 h-3" />}
            title="Let's build something amazing together"
            titleHighlight="amazing together"
            description="Have a project in mind? I'd love to hear about it. Fill out the form below or schedule a call, and I'll get back to you within 24 hours."
          />

          {/* Trust badges */}
          <div className="mb-12">
            <TrustBadges />
          </div>

          {/* Contact reasons */}
          <ContactReasons
            selected={selectedReason}
            onSelect={setSelectedReason}
          />

          {/* Main content grid */}
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Contact Form - Takes more space */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-3"
            >
              <div className="bg-card border border-border rounded-3xl p-6 md:p-8">
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Send me a message
                  </h3>
                  <p className="text-muted-foreground">
                    Fill out the form below and I'll get back to you as soon as
                    possible.
                  </p>
                </div>
                <ContactForm variant="full" />
              </div>
            </motion.div>

            {/* Contact Info Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-2"
            >
              <ContactInfoCard />
            </motion.div>
          </div>

          {/* Newsletter Section */}
          <NewsletterSection />

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-20 text-center"
          >
            <p className="text-muted-foreground mb-4">
              Prefer to talk? Let's schedule a call.
            </p>
            <Button
              size="lg"
              variant="secondary"
              leftIcon={<Calendar className="w-5 h-5" />}
              rightIcon={<ArrowRight className="w-5 h-5" />}
              onClick={() => {
                window.open(
                  "https://calendly.com/jamesgabbitus/discovery-call",
                  "_blank"
                );
              }}
            >
              Book a Free Discovery Call
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}