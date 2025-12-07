"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, MessageSquare, CheckCircle } from "lucide-react";
import Button from "./Button";

const benefits = [
  "Dedicated communication channel",
  "Weekly progress updates",
  "Post-launch support included",
  "100% satisfaction guarantee",
];

export default function TestimonialCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/20 via-card to-accent/20 border border-primary/20 p-8 md:p-12"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px]" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-[80px]" />

      <div className="relative grid md:grid-cols-2 gap-8 items-center">
        {/* Left content */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/20 rounded-full text-primary text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            Join 50+ happy clients
          </div>

          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Ready to be our next{" "}
            <span className="text-gradient">success story?</span>
          </h3>

          <p className="text-muted-foreground mb-6">
            Every project I take on receives my full attention and expertise.
            Let's create something amazing together.
          </p>

          {/* Benefits list */}
          <ul className="space-y-3 mb-8">
            {benefits.map((benefit, index) => (
              <motion.li
                key={benefit}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3"
              >
                <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                <span className="text-muted-foreground">{benefit}</span>
              </motion.li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-4">
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
            <Button
              variant="secondary"
              size="lg"
              leftIcon={<MessageSquare className="w-5 h-5" />}
              onClick={() => {
                window.open("https://calendly.com/jamesgabbitus", "_blank");
              }}
            >
              Book a Call
            </Button>
          </div>
        </div>

        {/* Right - Testimonial preview */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="p-6 bg-card border border-border rounded-2xl"
          >
            <div className="flex items-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-5 h-5 text-yellow-500 fill-yellow-500"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>

            <p className="text-foreground italic mb-4">
              "James transformed our complex AI product into a compelling story.
              Our conversion rates have never been higher."
            </p>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-semibold text-sm">
                SC
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Sarah Chen</p>
                <p className="text-xs text-muted-foreground">CEO, Neural AI</p>
              </div>
            </div>
          </motion.div>

          {/* Floating elements */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-4 -right-4 px-3 py-2 bg-success/20 border border-success/30 rounded-lg"
          >
            <span className="text-success text-sm font-medium">+340% conversions</span>
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-4 -left-4 px-3 py-2 bg-primary/20 border border-primary/30 rounded-lg"
          >
            <span className="text-primary text-sm font-medium">2 week delivery</span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}