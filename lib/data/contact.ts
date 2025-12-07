import {
  Mail,
  MapPin,
  Clock,
  Calendar,
  MessageSquare,
  Github,
  Twitter,
  Linkedin,
  Send,
} from "lucide-react";

export const contactInfo = {
  email: "jamesgabbitus@gmail.com",
  location: "Available Worldwide (Remote)",
  timezone: "Flexible hours (UTC-friendly)",
  responseTime: "Usually within 2 hours",
  availability: "Currently accepting new projects",
  calendlyUrl: "https://calendly.com/jamesgabbitus/discovery-call",
};

export const socialLinks = [
  {
    name: "Email",
    href: "mailto:jamesgabbitus@gmail.com",
    icon: Mail,
    username: "jamesgabbitus@gmail.com",
  },
  {
    name: "Twitter",
    href: "https://twitter.com/jamesgabbitus",
    icon: Twitter,
    username: "@jamesgabbitus",
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/jamesgabbitus",
    icon: Linkedin,
    username: "jamesgabbitus",
  },
  {
    name: "GitHub",
    href: "https://github.com/jamesgabbitus",
    icon: Github,
    username: "jamesgabbitus",
  },
];

export const projectTypes = [
  { value: "ai-landing", label: "AI Landing Page" },
  { value: "startup-website", label: "Startup Website" },
  { value: "web-application", label: "Web Application" },
  { value: "ui-ux-design", label: "UI/UX Design" },
  { value: "consulting", label: "Consulting / Advisory" },
  { value: "other", label: "Other" },
];

export const budgetRanges = [
  { value: "3k-5k", label: "$3,000 - $5,000" },
  { value: "5k-10k", label: "$5,000 - $10,000" },
  { value: "10k-20k", label: "$10,000 - $20,000" },
  { value: "20k+", label: "$20,000+" },
  { value: "not-sure", label: "Not sure yet" },
];

export const timelineOptions = [
  { value: "asap", label: "ASAP" },
  { value: "1-2-weeks", label: "1-2 weeks" },
  { value: "2-4-weeks", label: "2-4 weeks" },
  { value: "1-2-months", label: "1-2 months" },
  { value: "flexible", label: "Flexible" },
];

export const contactReasons = [
  {
    icon: Send,
    title: "Start a Project",
    description: "Ready to build something amazing? Let's discuss your vision.",
  },
  {
    icon: MessageSquare,
    title: "Ask a Question",
    description: "Have questions about my services or process? I'm happy to help.",
  },
  {
    icon: Calendar,
    title: "Schedule a Call",
    description: "Prefer to talk? Book a free 30-minute discovery call.",
  },
];