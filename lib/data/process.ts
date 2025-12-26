import {
  MessageSquare,
  Lightbulb,
  PenTool,
  Code2,
  Rocket,
  HeartHandshake,
  Search,
  FileCheck,
  Zap,
  RefreshCw,
} from "lucide-react";

export const processSteps = [
  {
    id: "discovery",
    step: 1,
    title: "Discovery Call",
    shortTitle: "Discover",
    description:
      "We start with a free 30-minute call to understand your product, target audience, and goals. I'll ask questions about your AI technology, competitive landscape, and what success looks like for you.",
    icon: MessageSquare,
    duration: "30 min",
    deliverables: [
      "Project scope document",
      "Timeline estimate",
      "Custom quote",
    ],
    color: "primary",
  },
  {
    id: "strategy",
    step: 2,
    title: "Strategy & Planning",
    shortTitle: "Strategy",
    description:
      "Based on our discovery call, I create a comprehensive strategy document outlining the site structure, key messaging, conversion points, and technical approach. We refine this together until it's perfect.",
    icon: Lightbulb,
    duration: "1-2 days",
    deliverables: [
      "Content strategy",
      "Site architecture",
      "Wireframe concepts",
    ],
    color: "accent",
  },
  // {
  //   id: "design",
  //   step: 3,
  //   title: "UI/UX Design",
  //   shortTitle: "Design",
  //   description:
  //     "I design high-fidelity mockups in Figma, focusing on visual hierarchy, user experience, and conversion optimization.", //You'll see exactly how your site will look before any code is written.
  //   icon: PenTool,
  //   duration: "1-2 days",
  //   deliverables: [
  //     "Figma design files",
  //     "Desktop & mobile designs",
  //     "Interactive prototype",
  //   ],
  //   color: "primary",
  // },
  {
    id: "development",
    step: 3,
    title: "Development",
    shortTitle: "Develop",
    description:
      "Using Next.js, Tailwind CSS, and Framer Motion, I focus on visual hierarchy, user experience, and conversion optimization with pixel-perfect precision. Performance, SEO, and accessibility are built-in from the start.",
    icon: Code2,
    duration: "2-4 days",
    deliverables: [
      "Fully functional website",
      "CMS integration",
      "Performance optimization",
    ],
    color: "accent",
  },
  {
    id: "review",
    step: 4,
    title: "Review & Refine",
    shortTitle: "Refine",
    description:
      "You'll review the site on a staging URL and provide feedback. I make revisions until you're 100% satisfied. This iterative process ensures the final product exceeds your expectations.",
    icon: RefreshCw,
    duration: "1-2 days",
    deliverables: [
      "Revision rounds",
      "Cross-browser testing",
      "Mobile QA",
    ],
    color: "primary",
  },
  {
    id: "launch",
    step: 5,
    title: "Launch & Support",
    shortTitle: "Launch",
    description:
      "I handle the deployment to your preferred platform (Vercel, Netlify, etc.), set up analytics, and ensure everything is running smoothly. Plus, you get post-launch support included.",
    icon: Rocket,
    duration: "1 day",
    deliverables: [
      "Production deployment",
      "Analytics setup",
      "Documentation",
    ],
    color: "accent",
  },
];

export const processFeatures = [
  {
    icon: MessageSquare,
    title: "Daily Updates",
    description: "Stay informed with daily progress updates via WhatsApp or email.",
  },
  {
    icon: FileCheck,
    title: "Milestone Reviews",
    description: "Review and approve each phase before moving forward.",
  },
  {
    icon: Zap,
    title: "Fast Turnaround",
    description: "Most projects completed in 1-3 weeks, not months.",
  },
  {
    icon: HeartHandshake,
    title: "Satisfaction Guaranteed",
    description: "Unlimited revisions until you're 100% happy.",
  },
];

export const faqs = [
  {
    question: "How long does a typical project take?",
    answer:
      "A single landing page typically can take 3 days to a week from start to finish. Multi-page websites take 1-2 weeks, and full web applications can take 2-8 weeks depending on complexity. I'll give you a precise timeline during our discovery call.",
  },
  {
    question: "What do you need from me to get started?",
    answer:
      "I'll need your brand assets (logo, colors, fonts if you have them), content/copy for the site (or I can guide you), any existing design references you like, and access to necessary accounts (domain, hosting, etc.).",
  },
  {
    question: "Do you write the website copy?",
    answer:
      "While I'm not a professional copywriter, I provide comprehensive guidance and templates for conversion-focused copy. I can also recommend trusted copywriting partners if you need that service.",
  },
  {
    question: "What if I need changes after the site launches?",
    answer:
      "All packages include a support period (7-90 days depending on package) for bug fixes and minor tweaks. For ongoing maintenance or new features, I offer retainer packages or hourly rates.",
  },
  {
    question: "How do payments work?",
    answer:
      "I typically work on a 50/50 basis—50% upfront to begin work, and 50% upon completion before launch. For larger projects, we can arrange milestone-based payments. I accept bank transfer, Wise, and PayPal.",
  },
  {
    question: "Do you sign NDAs?",
    answer:
      "Absolutely. I'm happy to sign NDAs before our discovery call if you're working on something sensitive. Your ideas and business information are always kept confidential.",
  },
  {
    question: "Will I own the code and designs?",
    answer:
      "Yes, 100%. Upon final payment, you receive full ownership of all code, design files, and assets. I'll hand over everything in an organized manner with documentation.",
  },
  {
    question: "Can you work with my existing team?",
    answer:
      "Definitely. I frequently collaborate with in-house designers, developers, and marketing teams. I'm flexible with communication tools and workflows to fit your existing processes.",
  },
];

export const timeline = {
  landing: {
    name: "Landing Page",
    duration: "<1 week",
    phases: [
      { name: "Discovery", days: 1 },
      { name: "Strategy", days: 1 },
      { name: "Design", days: 1 },
      { name: "Development", days: 2 },
      { name: "Review", days: 1 },
      { name: "Launch", days: 1 },
    ],
  },
  website: {
    name: "Multi-page Website",
    duration: "1-2 weeks",
    phases: [
      { name: "Discovery", days: 2 },
      { name: "Strategy", days: 2 },
      { name: "Design", days: 2 },
      { name: "Development", days: 4 },
      { name: "Review", days: 2 },
      { name: "Launch", days: 1 },
    ],
  },
  application: {
    name: "Web Application",
    duration: "2-8 weeks",
    phases: [
      { name: "Discovery", days: 3 },
      { name: "Strategy", days: 3 },
      { name: "Design", days: 4 },
      { name: "Development", days: 15 },
      { name: "Review", days: 4 },
      { name: "Launch", days: 2 },
    ],
  },
  ai_application: {
    name: "AI Web Application",
    duration: "3-8 weeks",
    phases: [
      { name: "Discovery", days: 3 },
      { name: "Strategy", days: 4 },
      { name: "Design", days: 4 },
      { name: "Development", days: 17 },
      { name: "Review", days: 4 },
      { name: "Launch", days: 2 },
    ],
  },
};