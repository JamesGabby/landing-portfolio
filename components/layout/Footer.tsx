"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowUpRight,
  Mail,
  Github,
  Linkedin,
  Twitter,
  Heart,
  ArrowUp,
} from "lucide-react";
import { SITE_CONFIG, NAV_LINKS } from "@/lib/constants";

const footerLinks = {
  navigation: NAV_LINKS,
  services: [
    { label: "AI Landing Pages", href: "#services" },
    { label: "Startup Websites", href: "#services" },
    { label: "Web Applications", href: "#services" },
    { label: "UI/UX Design", href: "#services" },
  ],
  resources: [
    { label: "Case Studies", href: "#portfolio" },
    { label: "Process", href: "#process" },
    { label: "Tech Stack", href: "#stack" },
    { label: "Blog", href: "/blog" },
  ],
};

const socialLinks = [
  { label: "Twitter", href: SITE_CONFIG.socials.twitter, icon: Twitter },
  { label: "GitHub", href: SITE_CONFIG.socials.github, icon: Github },
  { label: "LinkedIn", href: SITE_CONFIG.socials.linkedin, icon: Linkedin },
  { label: "Email", href: `mailto:${SITE_CONFIG.email}`, icon: Mail },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-card border-t border-border overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid opacity-50" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 blur-[120px] rounded-full" />

      <div className="relative section-padding">
        <div className="container-custom">
          {/* CTA Section */}
          <div className="py-16 lg:py-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-3xl mx-auto"
            >
              <span className="badge mb-6">Available for new projects</span>
              <h2 className="text-display-sm sm:text-display-md lg:text-display-lg font-heading font-bold mb-6">
                Ready to build your{" "}
                <span className="text-gradient">AI startup's</span> dream landing
                page?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Let's create something exceptional together. I'm currently taking
                on select projects for Q1 2026.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="#contact" className="btn-primary text-base px-8 py-4">
                  Start Your Project
                  <ArrowUpRight className="w-5 h-5" />
                </a>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="btn-secondary text-base px-8 py-4"
                >
                  <Mail className="w-5 h-5" />
                  {SITE_CONFIG.email}
                </a>
              </div>
            </motion.div>
          </div>

          {/* Main Footer Content */}
          <div className="py-12 border-t border-border">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
              {/* Brand Column */}
              <div className="lg:col-span-4">
                <Link href="/" className="flex items-center gap-2 mb-6">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg font-bold text-foreground tracking-tight">
                      James <span className="text-gradient">Gabbitus</span>
                    </span>
                    <span className="text-[10px] text-muted uppercase tracking-widest">
                      AI Landing Pages
                    </span>
                  </div>
                </Link>
                <p className="text-muted-foreground mb-6 max-w-sm">
                  I help AI startups convert visitors into users with stunning,
                  high-performance landing pages built with modern technologies.
                </p>
                {/* Social Links */}
                <div className="flex items-center gap-2">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target={social.href.startsWith("http") ? "_blank" : undefined}
                      rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="flex items-center justify-center w-10 h-10 rounded-lg bg-background border border-border text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all duration-300"
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Navigation Column */}
              <div className="lg:col-span-2">
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
                  Navigation
                </h3>
                <ul className="space-y-3">
                  {footerLinks.navigation.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Services Column */}
              <div className="lg:col-span-2">
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
                  Services
                </h3>
                <ul className="space-y-3">
                  {footerLinks.services.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Resources Column */}
              <div className="lg:col-span-2">
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
                  Resources
                </h3>
                <ul className="space-y-3">
                  {footerLinks.resources.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Status Column */}
              <div className="lg:col-span-2">
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
                  Status
                </h3>
                <div className="space-y-4">
                  {/* Availability Status */}
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-success"></span>
                    </span>
                    <span className="text-sm text-muted-foreground">
                      Available for work
                    </span>
                  </div>
                  {/* Response Time */}
                  <p className="text-sm text-muted-foreground">
                    Typical response time:{" "}
                    <span className="text-foreground">~2 hours</span>
                  </p>
                  {/* Timezone */}
                  <p className="text-sm text-muted-foreground">
                    Based in: <span className="text-foreground">GMT/UTC</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

                    {/* Bottom Bar */}
          <div className="py-6 border-t border-border">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground text-center sm:text-left">
                © {currentYear} James Gabbitus. Crafted with{" "}
                <Heart className="inline-block w-4 h-4 text-red-500 mx-1" /> and lots of coffee.
              </p>
              
              <div className="flex items-center gap-6">
                <a
                  href="/privacy"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Privacy
                </a>
                <a
                  href="/terms"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Terms
                </a>
                
                {/* Back to Top Button */}
                <button
                  onClick={scrollToTop}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                  aria-label="Back to top"
                >
                  Back to top
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-background border border-border group-hover:border-primary/50 group-hover:bg-card transition-all duration-300">
                    <ArrowUp className="w-4 h-4" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}