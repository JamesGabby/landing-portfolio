"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

export default function FloatingContactButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 500px
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({
      behavior: "smooth",
    });
    setIsOpen(false);
  };

  const openCalendly = () => {
    window.open("https://calendly.com/jamesgabbitus/discovery-call", "_blank");
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed bottom-6 right-6 z-40">
          {/* Options menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute bottom-16 right-0 mb-2 w-56"
              >
                <div className="bg-card border border-border rounded-2xl shadow-xl overflow-hidden">
                  <div className="p-3 border-b border-border">
                    <p className="text-sm font-medium text-foreground">
                      Get in touch
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Choose an option below
                    </p>
                  </div>
                  <div className="p-2">
                    <button
                      onClick={scrollToContact}
                      className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-card-hover transition-colors text-left"
                    >
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Send className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          Send Message
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Fill out the form
                        </p>
                      </div>
                    </button>
                    <button
                      onClick={openCalendly}
                      className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-card-hover transition-colors text-left"
                    >
                      <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                        <Calendar className="w-4 h-4 text-accent" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          Book a Call
                        </p>
                        <p className="text-xs text-muted-foreground">
                          30-min consultation
                        </p>
                      </div>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main button */}
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300",
              isOpen
                ? "bg-card border border-border text-foreground"
                : "bg-primary text-white shadow-glow"
            )}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="open"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <MessageCircle className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Pulse animation when closed */}
          {!isOpen && (
            <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20 pointer-events-none" />
          )}
        </div>
      )}
    </AnimatePresence>
  );
}