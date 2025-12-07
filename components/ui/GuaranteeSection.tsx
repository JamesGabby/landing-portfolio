"use client";

import { motion } from "framer-motion";
import { Shield, RefreshCw, Clock, HeartHandshake } from "lucide-react";
import { cn } from "@/lib/utils";

const guarantees = [
  {
    icon: Shield,
    title: "100% Satisfaction Guarantee",
    description:
      "I'll keep refining until you're completely happy with the result. Your satisfaction is my top priority.",
    color: "primary",
  },
  {
    icon: RefreshCw,
    title: "Unlimited Revisions",
    description:
      "Within the project scope, I offer unlimited revisions. No nickel and diming for small changes.",
    color: "accent",
  },
  {
    icon: Clock,
    title: "On-Time Delivery",
    description:
      "I respect your timeline. If I commit to a deadline, I deliver on time—or I'll let you know well in advance.",
    color: "primary",
  },
  {
    icon: HeartHandshake,
    title: "Transparent Communication",
    description:
      "No surprises. You'll always know the project status, and I'm just a message away for any questions.",
    color: "accent",
  },
];

export default function GuaranteeSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-3xl bg-card border border-border p-8 md:p-12"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-[100px]" />

      <div className="relative">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-success/10 rounded-full text-success text-sm font-medium mb-4">
            <Shield className="w-4 h-4" />
            My Guarantees
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            Work with confidence
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            I stand behind my work with these promises to every client.
          </p>
        </div>

        {/* Guarantees grid */}
        <div className="grid sm:grid-cols-2 gap-6">
          {guarantees.map((guarantee, index) => {
            const Icon = guarantee.icon;
            return (
              <motion.div
                key={guarantee.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex gap-4 p-6 bg-background border border-border rounded-2xl hover:border-primary/30 transition-colors duration-300"
              >
                <div
                  className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0",
                    guarantee.color === "primary"
                      ? "bg-primary/10 text-primary"
                      : "bg-accent/10 text-accent"
                  )}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">
                    {guarantee.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {guarantee.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}