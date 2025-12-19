"use client";

import { motion } from "framer-motion";
import { Heart, MessageCircle, Zap, Target } from "lucide-react";
import { cn } from "@/lib/utils";

const workingStyle = [
  {
    icon: MessageCircle,
    title: "Clear Communication",
    description:
      "I provide daily updates on WhatsApp and weekly video calls. You'll never be left wondering about project status.",
    color: "primary",
  },
  {
    icon: Zap,
    title: "Fast Turnaround",
    description:
      "I respect your time and deadlines. Most landing pages are delivered within 1-2 weeks, fully polished.",
    color: "accent",
  },
  {
    icon: Target,
    title: "Goal-Oriented",
    description:
      "Every design decision is backed by data and focused on your conversion goals. No fluff, just results.",
    color: "primary",
  },
  {
    icon: Heart,
    title: "Genuine Care",
    description:
      "Your success is my success. I treat every project as if it were my own product launching.",
    color: "accent",
  },
];

export default function PersonalTouch() {
  return (
    <section className="py-16 lg:py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-card/50" />

      <div className="relative section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left - Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-6">
                Working with me feels like having a{" "}
                <span className="text-gradient">dedicated team member</span>
              </h3>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                I'm not just another freelancer who disappears after the invoice
                is paid. I'm invested in your success and here to support you
                long after launch.
              </p>

              {/* Testimonial snippet */}
              <div className="p-6 bg-background border border-border rounded-2xl">
                <p className="text-foreground italic mb-4"> {/*"James feels less like a contractor and more like a co-founder. His dedication to our project was incredible." */}
                  "James was a real asset to the team. A master of juggling multiple tasks, keeping them to a high standard, all while continuing to improve and master his development skills. Always conscientious and diligent, James would approach every task with enthusiasm and out the box thinking. I wouldn't hesitate to work with James again."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-sm font-medium text-primary">OG</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Oli Galvin-Jones
                    </p>
                    <p className="text-xs text-muted-foreground">Client Manager, FLOAT</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right - Working style cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              {workingStyle.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="p-6 bg-background border border-border rounded-2xl hover:border-primary/30 transition-colors duration-300"
                  >
                    <div
                      className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center mb-4",
                        item.color === "primary"
                          ? "bg-primary/10 text-primary"
                          : "bg-accent/10 text-accent"
                      )}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="font-semibold text-foreground mb-2">
                      {item.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}