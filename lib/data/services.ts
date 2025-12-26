// src/lib/data/services.ts - Complete file

import {
  Rocket,
  Palette,
  Code2,
  Zap,
  Search,
  LineChart,
  Smartphone,
  Shield,
  RefreshCw,
  Sparkles,
} from "lucide-react";

export const servicesWithDetails = [
  {
    id: "ai-landing-pages",
    title: "AI Landing Pages",
    description:
      "High-converting landing pages specifically designed for AI startups. Showcase your AI product with stunning visuals, clear value propositions, and optimized conversion funnels.",
    icon: Sparkles,
    color: "primary",
    features: [
      "AI-focused copywriting guidance",
      "Interactive product demos",
      "Conversion-optimized layouts",
      "A/B testing ready",
      "Analytics integration",
    ],
    popular: true,
    details: {
      process: [
        "Discovery call to understand your AI product and target audience",
        "Wireframe and content strategy development",
        "High-fidelity design with your feedback",
        "Development with Next.js and animations",
        "Testing, optimization, and launch",
      ],
      deliverables: [
        "Figma design files",
        "Next.js source code",
        "Deployment setup",
        "SEO configuration",
        "Analytics dashboard",
        "Documentation",
      ],
      timeline: "1-2 weeks",
    },
  },
  {
    id: "startup-websites",
    title: "Startup Websites",
    description:
      "Complete multi-page websites for startups that need more than a landing page. Perfect for established products needing documentation, blogs, and multiple conversion points.",
    icon: Rocket,
    color: "accent",
    features: [
      "Multi-page architecture",
      "Blog & content system",
      "Documentation pages",
      "Team & about sections",
      "Investor-ready design",
    ],
    popular: false,
    details: {
      process: [
        "In-depth discovery and site architecture planning",
        "Content strategy and page structure",
        "Design system creation and page designs",
        "CMS integration and development",
        "Content migration and launch",
      ],
      deliverables: [
        "Complete design system",
        "All page designs",
        "Full source code",
        "CMS setup (Sanity/Contentful)",
        "Blog system",
        "Team training session",
      ],
      timeline: "1-2 weeks",
    },
  },
  {
    id: "web-applications",
    title: "Web Applications",
    description:
      "Full-stack web applications with authentication, databases, and complex functionality. Built with Next.js and Supabase for scalability and performance.",
    icon: Code2,
    color: "primary",
    features: [
      "User authentication",
      "Database integration",
      "API development",
      "Real-time features",
      "Admin dashboards",
    ],
    popular: false,
    details: {
      process: [
        "Technical requirements gathering",
        "System architecture and database design",
        "UI/UX design for all user flows",
        "Frontend and backend development",
        "Testing, security audit, and deployment",
      ],
      deliverables: [
        "Full application source code",
        "Database schema and setup",
        "API documentation",
        "Admin dashboard",
        "User authentication system",
        "Deployment and CI/CD setup",
      ],
      timeline: "4-8 weeks",
    },
  },
  {
    id: "ai-web-applications",
    title: "AI Web Applications",
    description:
      "Full-stack AI integrated web applications with authentication, databases, and complex functionality. Built with Next.js and Supabase for scalability and performance.",
    icon: Sparkles,
    color: "accent",
    features: [
      "AI integration",
      "User authentication",
      "Database integration",
      "API development",
      "Real-time features",
      "Admin dashboards",
    ],
    popular: false,
    details: {
      process: [
        "Technical requirements gathering",
        "System architecture and database design",
        "UI/UX design for all user flows",
        "Frontend and backend development",
        "Testing, security audit, and deployment",
      ],
      deliverables: [
        "Full application source code",
        "Database schema and setup",
        "API documentation",
        "Admin dashboard",
        "User authentication system",
        "Deployment and CI/CD setup",
      ],
      timeline: "4-8 weeks",
    },
  },
];

export const capabilities = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Sub-second load times with Next.js optimization",
  },
  {
    icon: Search,
    title: "SEO Optimized",
    description: "Built-in SEO best practices for maximum visibility",
  },
  {
    icon: Smartphone,
    title: "Fully Responsive",
    description: "Pixel-perfect on all devices and screen sizes",
  },
  {
    icon: LineChart,
    title: "Conversion Focused",
    description: "Data-driven design decisions for better results",
  },
  {
    icon: Shield,
    title: "Secure & Reliable",
    description: "Enterprise-grade security and 99.9% uptime",
  },
  {
    icon: RefreshCw,
    title: "Easy to Update",
    description: "CMS integration for effortless content management",
  },
];

export const packages = [
  {
    id: "starter",
    name: "Starter",
    description: "Perfect for small businesses", //Perfect for MVPs and early-stage startups
    price: 3500, //3500
    discount_price: 1999, //1999
    duration: "<1 week",
    features: [
      "Single landing page",
      "Mobile responsive",
      "Basic animations",
      "Contact form",
      "SEO setup",
      "1 revision round",
    ],
    notIncluded: [
      "CMS integration",
      "Advanced animations",
      "A/B testing setup",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    id: "professional",
    name: "Professional",
    description: "For businesses ready to scale their presence", //For startups ready to scale their presence
    price: 7500, //7500
    discount_price: 4999, // 4999
    duration: "1-2 weeks",
    features: [
      "Up to 5 pages",
      "Advanced animations",
      "CMS integration",
      "Blog setup",
      "Analytics dashboard",
      "A/B testing ready",
      "3 revision rounds",
      "30 days support",
    ],
    notIncluded: ["Custom web app features"],
    cta: "Most Popular",
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "Full-scale solution for established businesses", //Full-scale solution for established startups"
    price: 15000, // 15000
    discount_price: 11999, // 11999
    duration: "3-6 weeks",
    features: [
      "Unlimited pages",
      "Custom web application",
      "User authentication",
      "Database integration",
      "Admin dashboard",
      "API development",
      "Premium animations",
      "Unlimited revisions",
      "90 days support",
      "Priority communication",
    ],
    notIncluded: [],
    cta: "Contact Me",
    popular: false,
  },
];

// Simple services export for basic usage
export const services = servicesWithDetails.map(({ details, ...service }) => service);