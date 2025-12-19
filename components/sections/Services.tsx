"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  Check,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { services, capabilities } from "@/lib/data/services";
import SectionHeader from "../ui/SectionHeader";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

// Service Card Component
const ServiceCard = ({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) => {
  const Icon = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card
        className={cn(
          "relative h-full group overflow-hidden",
          service.popular && "border-primary/50"
        )}
        glow={service.popular}
      >
        {/* Popular badge */}
        {service.popular && (
          <div className="absolute top-4 right-4">
            <Badge variant="default" icon={<Sparkles className="w-3 h-3" />}>
              Most Requested
            </Badge>
          </div>
        )}

        {/* Gradient overlay on hover */}
        <div
          className={cn(
            "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
            service.color === "primary"
              ? "bg-gradient-to-br from-primary/5 to-transparent"
              : "bg-gradient-to-br from-accent/5 to-transparent"
          )}
        />

        <div className="relative">
          {/* Icon */}
          <div
            className={cn(
              "w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110",
              service.color === "primary"
                ? "bg-primary/10 text-primary"
                : "bg-accent/10 text-accent"
            )}
          >
            <Icon className="w-7 h-7" />
          </div>

          {/* Title */}
          <h3 className="text-xl font-semibold text-foreground mb-3">
            {service.title}
          </h3>

          {/* Description */}
          <p className="text-muted-foreground mb-6 leading-relaxed">
            {service.description}
          </p>

          {/* Features */}
          <ul className="space-y-3 mb-6">
            {service.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-3">
                <div
                  className={cn(
                    "w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5",
                    service.color === "primary"
                      ? "bg-primary/10 text-primary"
                      : "bg-accent/10 text-accent"
                  )}
                >
                  <Check className="w-3 h-3" />
                </div>
                <span className="text-sm text-muted-foreground">{feature}</span>
              </li>
            ))}
          </ul>

          {/* CTA Link */}
          <a
            href="#contact"
            className={cn(
              "inline-flex items-center gap-2 text-sm font-medium transition-all duration-300 group/link",
              service.color === "primary"
                ? "text-primary hover:text-primary-hover"
                : "text-accent hover:text-accent-hover"
            )}
          >
            Discuss your project
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1" />
          </a>
        </div>
      </Card>
    </motion.div>
  );
};

// Capability Item Component
const CapabilityItem = ({
  capability,
  index,
}: {
  capability: (typeof capabilities)[0];
  index: number;
}) => {
  const Icon = capability.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="flex items-start gap-4 p-4 rounded-xl hover:bg-card transition-colors duration-300"
    >
      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <div>
        <h4 className="font-medium text-foreground mb-1">{capability.title}</h4>
        <p className="text-sm text-muted-foreground">{capability.description}</p>
      </div>
    </motion.div>
  );
};

// Main Services Component
export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="services" ref={sectionRef} className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid opacity-50" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[128px]" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-[128px]" />

      <div className="relative section-padding">
        <div className="container-custom">
          {/* Section Header */}
          <SectionHeader
            badge="Services"
            badgeIcon={<Sparkles className="w-3 h-3" />}
            title="Everything you need to grow your online presence" /* launch your AI startup*/
            titleHighlight="online presence" //AI startup
            description="From stunning landing pages to full-stack applications, I provide end-to-end development services tailored for your business." /*AI companies.*/
          />

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-20">
            {services.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>

          {/* Capabilities Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            {/* Capabilities header */}
            <div className="text-center mb-12">
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                Built with modern standards
              </h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Every project I deliver comes with these capabilities built-in,
                ensuring your website performs at its best.
              </p>
            </div>

            {/* Capabilities grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {capabilities.map((capability, index) => (
                <CapabilityItem
                  key={capability.title}
                  capability={capability}
                  index={index}
                />
              ))}
            </div>
          </motion.div>

          {/* CTA Banner */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-20"
          >
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 via-card to-accent/10 border border-border p-8 sm:p-12">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px]" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-[80px]" />

              <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="text-center lg:text-left">
                  <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
                    Not sure which service you need?
                  </h3>
                  <p className="text-muted-foreground max-w-xl">
                    Let's have a quick chat about your project. I'll help you
                    figure out the best approach and provide a custom quote.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    rightIcon={<ArrowUpRight className="w-5 h-5" />}
                    onClick={() => {
                      document.getElementById("contact")?.scrollIntoView({
                        behavior: "smooth",
                      });
                    }}
                  >
                    Book a Free Call
                  </Button>
                  <Button
                    variant="secondary"
                    size="lg"
                    onClick={() => {
                      document.getElementById("portfolio")?.scrollIntoView({
                        behavior: "smooth",
                      });
                    }}
                  >
                    See Examples
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}