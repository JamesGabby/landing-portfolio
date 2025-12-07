"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { faqs } from "@/lib/data/process";

interface FAQAccordionProps {
  items?: typeof faqs;
  className?: string;
}

export default function FAQAccordion({
  items = faqs,
  className,
}: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={cn("space-y-4", className)}>
      {items.map((faq, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.05 }}
          className={cn(
            "border rounded-2xl overflow-hidden transition-colors duration-300",
            openIndex === index
              ? "border-primary/30 bg-primary/5"
              : "border-border bg-card hover:border-primary/20"
          )}
        >
          {/* Question header */}
          <button
            onClick={() => toggleItem(index)}
            className="w-full flex items-center justify-between gap-4 p-6 text-left"
          >
            <div className="flex items-start gap-4">
              <div
                className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-300",
                  openIndex === index
                    ? "bg-primary text-white"
                    : "bg-primary/10 text-primary"
                )}
              >
                <HelpCircle className="w-4 h-4" />
              </div>
              <span
                className={cn(
                  "font-medium transition-colors duration-300",
                  openIndex === index ? "text-foreground" : "text-foreground"
                )}
              >
                {faq.question}
              </span>
            </div>

            <motion.div
              animate={{ rotate: openIndex === index ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-300",
                openIndex === index
                  ? "bg-primary text-white"
                  : "bg-card border border-border text-muted-foreground"
              )}
            >
              {openIndex === index ? (
                <Minus className="w-4 h-4" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
            </motion.div>
          </button>

          {/* Answer content */}
          <AnimatePresence>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <div className="px-6 pb-6">
                  <div className="pl-12 text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}