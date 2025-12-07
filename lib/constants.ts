import { seoConfig } from "./seo.config";

export const SITE_CONFIG = {
  name: seoConfig.siteName,
  title: seoConfig.title,
  description: seoConfig.description,
  url: seoConfig.siteUrl,
  email: seoConfig.author.email,
  socials: {
    twitter: seoConfig.author.twitter,
    linkedin: seoConfig.author.linkedin,
    github: seoConfig.author.github,
  },
};

export const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "About", href: "#about" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

// Extended navigation for footer or mobile menu
export const EXTENDED_NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Pricing", href: "#pricing" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "About", href: "#about" },
  { label: "Tech Stack", href: "#stack" },
  { label: "Process", href: "#process" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];