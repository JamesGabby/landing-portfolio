"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Sparkles, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants";
import Image from "next/image";

// Premium Animated Close Button Component
const AnimatedCloseButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <motion.button
      onClick={onClick}
      className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-card to-card/50 border border-border/50 shadow-lg shadow-primary/10 hover:shadow-primary/20 transition-shadow duration-300 group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, rotate: -180, scale: 0.5 }}
      animate={{ opacity: 1, rotate: 0, scale: 1 }}
      exit={{ opacity: 0, rotate: 180, scale: 0.5 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      aria-label="Close menu"
    >
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
      />

      {/* Animated X lines */}
      <div className="relative w-5 h-5">
        <motion.span
          className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-accent rounded-full"
          initial={{ rotate: 0, y: -4 }}
          animate={{ rotate: 45, y: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
        />
        <motion.span
          className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-accent to-primary rounded-full"
          initial={{ rotate: 0, y: 4 }}
          animate={{ rotate: -45, y: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.15 }}
        />
      </div>

      {/* Rotating ring on hover */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-transparent"
        style={{
          background: "linear-gradient(var(--background), var(--background)) padding-box, linear-gradient(135deg, var(--primary), var(--accent)) border-box",
        }}
        initial={{ opacity: 0, scale: 1.2 }}
        whileHover={{
          opacity: 1,
          scale: 1,
          rotate: 90,
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
};

// Premium Hamburger Button Component
const AnimatedMenuButton = ({ onClick, isScrolled }: { onClick: () => void; isScrolled: boolean }) => {
  return (
    <motion.button
      onClick={onClick}
      className={cn(
        "lg:hidden relative w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-300 group",
        isScrolled ? "hover:bg-card" : "hover:bg-white/10"
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Open menu"
    >
      <div className="relative w-5 h-4 flex flex-col justify-between">
        <motion.span
          className="w-full h-0.5 bg-foreground rounded-full origin-left"
          whileHover={{ scaleX: 0.8 }}
          transition={{ duration: 0.2 }}
        />
        <motion.span
          className="w-3/4 h-0.5 bg-foreground rounded-full"
          whileHover={{ scaleX: 1.2, x: 2 }}
          transition={{ duration: 0.2, delay: 0.05 }}
        />
        <motion.span
          className="w-full h-0.5 bg-foreground rounded-full origin-left"
          whileHover={{ scaleX: 0.6 }}
          transition={{ duration: 0.2, delay: 0.1 }}
        />
      </div>
    </motion.button>
  );
};

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle active section detection
  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_LINKS.map((link) => link.href.replace("#", ""));

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);

    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-lg shadow-background/20"
            : "bg-transparent"
        )}
      >
        <nav className="section-padding">
          <div className="container-custom">
            <div className="flex items-center justify-between h-16 lg:h-20">
              {/* Logo */}
              <Link
                href="/"
                className="flex items-center gap-2 group"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent">
                  <Image
                    src={'/jg-logo.png'}
                    height={80}
                    width={80}
                    alt="logo"
                    className="rounded-full w-10 h-10"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-foreground tracking-tight">
                    James
                    <span className="text-gradient"> Gabbitus</span>
                  </span>
                  <span className="text-[10px] text-muted uppercase tracking-widest hidden sm:block">
                    AI Landing Pages
                  </span>
                </div>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center gap-1">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={cn(
                      "relative px-4 py-2 text-sm font-medium transition-colors duration-200",
                      activeSection === link.href.replace("#", "")
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {link.label}
                    {activeSection === link.href.replace("#", "") && (
                      <motion.div
                        layoutId="activeSection"
                        className="absolute inset-0 bg-card rounded-lg -z-10"
                        transition={{ type: "spring", duration: 0.5 }}
                      />
                    )}
                  </a>
                ))}
              </div>

              {/* Desktop CTA */}
              <div className="hidden lg:flex items-center gap-4">
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {SITE_CONFIG.email}
                </a>
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, "#contact")}
                  className="btn-primary text-sm"
                >
                  Let's Talk
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              {/* Mobile Menu Button - Premium Animated */}
              <AnimatedMenuButton
                onClick={() => setIsMobileMenuOpen(true)}
                isScrolled={isScrolled}
              />
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-background border-l border-border z-50 lg:hidden overflow-hidden"
            >
              {/* Premium Animated Close Button */}
              {/* Premium Animated Close Button - Fixed positioning within panel */}
              <div className="absolute top-4 right-4 z-10">
                <motion.button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-card to-card/50 border border-border/50 shadow-lg shadow-primary/10 hover:shadow-primary/20 transition-shadow duration-300 group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, rotate: -180, scale: 0.5 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
                  aria-label="Close menu"
                >
                  {/* Glow effect */}
                  <motion.div
                    className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />

                  {/* Animated X lines */}
                  <div className="relative w-5 h-5">
                    <motion.span
                      className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-accent rounded-full -translate-y-1/2"
                      initial={{ rotate: 0 }}
                      animate={{ rotate: 45 }}
                      transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.3 }}
                    />
                    <motion.span
                      className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-accent to-primary rounded-full -translate-y-1/2"
                      initial={{ rotate: 0 }}
                      animate={{ rotate: -45 }}
                      transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.35 }}
                    />
                  </div>
                </motion.button>
              </div>

              {/* Decorative gradient orbs */}
              <div className="absolute top-20 right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-40 left-10 w-24 h-24 bg-accent/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex flex-col h-full pt-24 pb-8 px-6 relative">
                {/* Navigation Links */}
                <nav className="flex-1 space-y-1">
                  {NAV_LINKS.map((link, index) => (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + index * 0.1 }}
                      className={cn(
                        "flex items-center justify-between py-4 text-lg font-medium border-b border-border/50 transition-all duration-300 group",
                        activeSection === link.href.replace("#", "")
                          ? "text-primary"
                          : "text-foreground hover:text-primary hover:pl-2"
                      )}
                    >
                      <span className="flex items-center gap-3">
                        {activeSection === link.href.replace("#", "") && (
                          <motion.span
                            layoutId="activeMobileIndicator"
                            className="w-1.5 h-1.5 rounded-full bg-primary"
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          />
                        )}
                        {link.label}
                      </span>
                      <motion.div
                        className="text-muted group-hover:text-primary transition-colors"
                        whileHover={{ x: 4 }}
                      >
                        <ArrowRight className="w-5 h-5" />
                      </motion.div>
                    </motion.a>
                  ))}
                </nav>

                {/* Contact Info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-4 pt-8 border-t border-border/50"
                >
                  <p className="text-sm text-muted-foreground">Get in touch</p>
                  <a
                    href={`mailto:${SITE_CONFIG.email}`}
                    className="block text-foreground hover:text-primary transition-colors"
                  >
                    {SITE_CONFIG.email}
                  </a>
                  <motion.a
                    href="#contact"
                    onClick={(e) => handleNavClick(e, "#contact")}
                    className="btn-primary w-full justify-center mt-4"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Start a Project
                    <ArrowRight className="w-4 h-4" />
                  </motion.a>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}