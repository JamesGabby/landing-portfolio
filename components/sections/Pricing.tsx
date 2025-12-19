"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  X,
  Sparkles,
  ArrowRight,
  HelpCircle,
  Zap,
  Tag,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { packages } from "@/lib/data/services";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

// Calculate discount percentage
const getDiscountPercentage = (original: number, discounted: number) => {
  return Math.round(((original - discounted) / original) * 100);
};

// Utility function to format price with commas
const formatPrice = (price: number) => {
  return price.toLocaleString('en-US');
};

// Pricing Card Component
const PricingCard = ({
  pkg,
  index,
}: {
  pkg: (typeof packages)[0];
  index: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const hasDiscount = pkg.discount_price && pkg.discount_price < pkg.price;
  const discountPercentage = hasDiscount 
    ? getDiscountPercentage(pkg.price, pkg.discount_price!) 
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative rounded-3xl transition-all duration-500",
        pkg.popular
          ? "bg-gradient-to-b from-primary/20 via-card to-card border-2 border-primary/50 shadow-glow"
          : "bg-card border border-border hover:border-primary/30"
      )}
    >
      {/* Popular badge */}
      {pkg.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <Badge
            variant="default"
            icon={<Zap className="w-3 h-3" />}
            className="shadow-lg"
          >
            Most Popular
          </Badge>
        </div>
      )}

      {/* Discount badge */}
      {hasDiscount && !pkg.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <Badge
            variant="accent"
            icon={<Tag className="w-3 h-3" />}
            className="shadow-lg bg-gradient-to-r from-emerald-500 to-green-500 text-white border-0"
          >
            Save {discountPercentage}%
          </Badge>
        </div>
      )}

      {/* Popular + Discount badge - stacked */}
      {hasDiscount && pkg.popular && (
        <div className="absolute -top-4 right-4">
          <Badge
            variant="accent"
            icon={<Tag className="w-3 h-3" />}
            className="shadow-lg bg-gradient-to-r from-emerald-500 to-green-500 text-white border-0"
          >
            Save {discountPercentage}%
          </Badge>
        </div>
      )}

      <div className="p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h3 className="text-xl font-semibold text-foreground mb-2">
            {pkg.name}
          </h3>
          <p className="text-sm text-muted-foreground mb-6">{pkg.description}</p>

          {/* Price with discount */}
          <div className="flex flex-col items-center gap-1">
            {hasDiscount && (
              <div className="flex items-center gap-2">
                <span className="text-lg text-muted-foreground line-through decoration-2">
                  £{formatPrice(pkg.price)}
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500">
                  -{discountPercentage}% OFF
                </span>
              </div>
            )}
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-2xl text-muted-foreground">£</span>
              <span className={cn(
                "font-bold text-foreground",
                hasDiscount ? "text-4xl text-emerald-500" : "text-5xl"
              )}>
                {hasDiscount ? formatPrice(pkg.discount_price!) : formatPrice(pkg.price)}
              </span>
            </div>
            {hasDiscount && (
              <p className="text-xs text-emerald-500 font-medium mt-1">
                You save £{formatPrice(pkg.price - pkg.discount_price!)}
              </p>
            )}
          </div>
          <p className="text-sm text-muted-foreground mt-3">
            Delivery: {pkg.duration}
          </p>
        </div>

        {/* Divider */}
        <div className="h-px bg-border mb-8" />

        {/* Features */}
        <ul className="space-y-4 mb-8">
          {pkg.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="w-3 h-3 text-success" />
              </div>
              <span className="text-sm text-foreground">{feature}</span>
            </li>
          ))}
          {pkg.notIncluded.map((feature, i) => (
            <li key={i} className="flex items-start gap-3 opacity-50">
              <div className="w-5 h-5 rounded-full bg-muted/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <X className="w-3 h-3 text-muted" />
              </div>
              <span className="text-sm text-muted-foreground">{feature}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Button
          variant={pkg.popular ? "primary" : "secondary"}
          size="lg"
          fullWidth
          rightIcon={<ArrowRight className="w-4 h-4" />}
          onClick={() => {
            document.getElementById("contact")?.scrollIntoView({
              behavior: "smooth",
            });
          }}
        >
          {pkg.cta}
        </Button>

        {/* Limited time indicator for discounted items */}
        {hasDiscount && (
          <p className="text-center text-xs text-muted-foreground mt-4 flex items-center justify-center gap-1">
            <Sparkles className="w-3 h-3 text-emerald-500" />
            Limited time offer
          </p>
        )}
      </div>

      {/* Hover glow effect */}
      <AnimatePresence>
        {isHovered && !pkg.popular && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 rounded-3xl bg-gradient-to-b from-primary/5 to-transparent pointer-events-none"
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// FAQ Item for pricing section
const PricingFAQ = () => {
  const faqs = [
    {
      q: "What's included in the price?",
      a: "All packages include design, development, deployment, and basic SEO setup. You'll receive full source code and ownership.",
    },
    {
      q: "Do you offer payment plans?",
      a: "Yes! I offer 50/50 payment terms - half upfront and half upon completion. Custom arrangements available for larger projects.",
    },
    {
      q: "What if I need changes after delivery?",
      a: "Minor tweaks within the revision rounds are included. Additional changes can be arranged at an hourly rate or through a retainer.",
    },
    {
      q: "How do we communicate during the project?",
      a: "I use WhatsApp for daily communication, with weekly video calls for updates. You'll always know the project status.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mt-20 max-w-3xl mx-auto"
    >
      <div className="text-center mb-10">
        <h3 className="text-2xl font-bold text-foreground mb-3">
          Common Questions
        </h3>
        <p className="text-muted-foreground">
          Quick answers about pricing and process
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="border border-border rounded-2xl overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-center justify-between p-6 text-left hover:bg-card/50 transition-colors"
            >
              <span className="font-medium text-foreground pr-4">{faq.q}</span>
              <motion.div
                animate={{ rotate: openIndex === index ? 45 : 0 }}
                transition={{ duration: 0.2 }}
                className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center"
              >
                <span className="text-primary text-lg leading-none">+</span>
              </motion.div>
            </button>
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="px-6 pb-6 text-muted-foreground">
                    {faq.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// Main Pricing Component
export default function Pricing() {
  // Check if any package has a discount
  const hasAnyDiscount = packages.some(pkg => pkg.discount_price && pkg.discount_price < pkg.price);

  return (
    <section id="pricing" className="py-24 lg:py-32 relative overflow-hidden bg-card/50">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[128px]" />

      <div className="relative section-padding">
        <div className="container-custom">
          {/* Limited Time Banner */}
          {hasAnyDiscount && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-12 flex justify-center"
            >
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-emerald-500/10 via-green-500/10 to-emerald-500/10 border border-emerald-500/20">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-sm font-semibold text-emerald-500">
                    Limited Time Offer
                  </span>
                </div>
                <span className="text-sm text-muted-foreground">
                  Save up to {Math.max(...packages.map(pkg => 
                    pkg.discount_price ? getDiscountPercentage(pkg.price, pkg.discount_price) : 0
                  ))}% on select packages
                </span>
              </div>
            </motion.div>
          )}

          {/* Section Header */}
          <SectionHeader
            badge="Pricing"
            badgeIcon={<Sparkles className="w-3 h-3" />}
            title="Transparent pricing for every stage"
            titleHighlight="every stage"
            description="Choose a package that fits your needs. All prices are project-based with no hidden fees or surprises."
          />

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-6 max-w-6xl mx-auto">
            {packages.map((pkg, index) => (
              <PricingCard key={pkg.id} pkg={pkg} index={index} />
            ))}
          </div>

          {/* Custom Project CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-16 text-center"
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-card border border-border">
              <HelpCircle className="w-5 h-5 text-muted-foreground" />
              <span className="text-muted-foreground">
                Need something custom?
              </span>
              <a
                href="#contact"
                className="text-primary hover:text-primary-hover font-medium transition-colors"
              >
                Let's discuss your project
              </a>
            </div>
          </motion.div>

          {/* FAQ Section */}
          <PricingFAQ />
        </div>
      </div>
    </section>
  );
}