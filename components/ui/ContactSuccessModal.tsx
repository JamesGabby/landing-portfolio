"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, X, Calendar, ArrowRight, Sparkles } from "lucide-react";
import Button from "./Button";

interface ContactSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactSuccessModal({
  isOpen,
  onClose,
}: ContactSuccessModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50"
          >
            <div className="bg-card border border-border rounded-3xl p-8 mx-4 text-center relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-success/10 rounded-full blur-[60px]" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/10 rounded-full blur-[60px]" />

              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-lg hover:bg-card-hover transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>

              {/* Content */}
              <div className="relative">
                {/* Success icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.1 }}
                  className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6"
                >
                  <CheckCircle className="w-10 h-10 text-success" />
                </motion.div>

                {/* Confetti sparkles */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="absolute top-4 left-1/4"
                >
                  <Sparkles className="w-6 h-6 text-primary/50" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="absolute top-8 right-1/4"
                >
                  <Sparkles className="w-4 h-4 text-accent/50" />
                </motion.div>

                <h3 className="text-2xl font-bold text-foreground mb-3">
                  Message Sent!
                </h3>
                <p className="text-muted-foreground mb-6">
                  Thank you for reaching out! I've received your message and will
                  get back to you within 24 hours.
                </p>

                {/* What's next */}
                <div className="bg-background/50 rounded-xl p-4 mb-6 text-left">
                  <p className="text-sm font-medium text-foreground mb-2">
                    What happens next?
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-primary">1.</span>
                      I'll review your project details
                    </li>
                    <li className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-primary">2.</span>
                      You'll receive a personalized response
                    </li>
                    <li className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-primary">3.</span>
                      We'll schedule a discovery call if needed
                    </li>
                  </ul>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    variant="secondary"
                    fullWidth
                    onClick={onClose}
                  >
                    Close
                  </Button>
                  <Button
                    fullWidth
                    leftIcon={<Calendar className="w-4 h-4" />}
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                    onClick={() => {
                      window.open(
                        "https://calendly.com/jamesgabbitus",
                        "_blank"
                      );
                      onClose();
                    }}
                  >
                    Book a Call Now
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}