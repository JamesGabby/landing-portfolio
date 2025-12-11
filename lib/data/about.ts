import {
  Code2,
  Palette,
  Zap,
  Database,
  Globe,
  Sparkles,
  Rocket,
  Users,
  Award,
  Coffee,
  Headphones,
  Mountain,
  Github,
  Twitter,
  Linkedin,
  Mail,
} from "lucide-react";

export const personalInfo = {
  name: "James Gabbitus",
  title: "Freelance Next.js Developer",
  tagline: "I help AI startups convert visitors into users",
  location: "Available Worldwide (Remote)",
  email: "jamesgabbitus@gmail.com",
  availability: "Available for new projects",
  responseTime: "Usually responds within 2 hours",
  experience: "5+ years",
  projectsCompleted: "50+",
  bio: `I'm a freelance developer who fell in love with the intersection of beautiful design and powerful technology. After years of working with startups across various industries, I found my niche: helping AI companies tell their story through stunning, high-converting landing pages.

There's something magical about taking a complex AI product and transforming it into an experience that anyone can understand and want to use. That's what I do best.

I specialize in Next.js, Supabase, and Tailwind CSS—a stack that lets me build fast, scalable, and beautiful websites without compromise. Every project I take on is crafted with one goal in mind: turning your visitors into customers.`,
  shortBio:
    "Freelance Next.js developer specializing in high-converting landing pages for AI startups. I combine modern technology with persuasive design to help you launch faster and convert better.",
  philosophy:
    "I believe great websites aren't just about looking good—they're about creating experiences that guide visitors toward action. Every animation, every word, every pixel should serve a purpose.",
};

export const skills = [
  {
    category: "Frontend",
    icon: Code2,
    color: "primary",
    items: [
      { name: "Next.js", level: 95 },
      { name: "React", level: 95 },
      { name: "TypeScript", level: 90 },
      { name: "Tailwind CSS", level: 95 },
      { name: "Framer Motion", level: 85 },
    ],
  },
  {
    category: "Backend",
    icon: Database,
    color: "accent",
    items: [
      { name: "Supabase", level: 90 },
      { name: "PostgreSQL", level: 80 },
      { name: "Node.js", level: 85 },
      { name: "REST APIs", level: 90 },
      { name: "Authentication", level: 85 },
    ],
  },
  {
    category: "Design",
    icon: Palette,
    color: "primary",
    items: [
      { name: "UI/UX Design", level: 85 },
      { name: "Figma", level: 80 },
      { name: "Responsive Design", level: 95 },
      { name: "Design Systems", level: 85 },
      { name: "Prototyping", level: 80 },
    ],
  },
  {
    category: "Other",
    icon: Zap,
    color: "accent",
    items: [
      { name: "SEO", level: 85 },
      { name: "Performance", level: 90 },
      { name: "Analytics", level: 80 },
      { name: "Git/GitHub", level: 90 },
      { name: "Vercel/Netlify", level: 95 },
    ],
  },
];

export const expertise = [
  {
    icon: Sparkles,
    title: "AI Landing Pages",
    description:
      "Specialized in creating landing pages that effectively communicate complex AI products to diverse audiences.",
  },
  {
    icon: Rocket,
    title: "Startup Speed",
    description:
      "I understand startup timelines. Fast delivery without sacrificing quality—typically 1-2 weeks for landing pages.",
  },
  {
    icon: Zap,
    title: "Performance First",
    description:
      "Every site I build scores 90+ on Core Web Vitals. Speed isn't optional—it's essential for conversions.",
  },
  {
    icon: Users,
    title: "Conversion Focused",
    description:
      "Data-driven design decisions based on proven UX patterns that turn visitors into paying customers.",
  },
];

export const experience = [
  {
    period: "2022 - Present",
    title: "Freelance Next.js Developer",
    company: "Self-employed",
    description:
      "Specializing in AI startup landing pages and web applications. Worked with 30+ startups across the globe.",
    highlights: [
      "Built 50+ landing pages for AI startups",
      "Average conversion increase of 340%",
      "Maintained 100% client satisfaction rate",
    ],
  },
  {
    period: "2020 - 2022",
    title: "Senior Frontend Developer",
    company: "Tech Startup (YC-backed)",
    description:
      "Led frontend development for a Series A startup, building their customer-facing platform from scratch.",
    highlights: [
      "Grew platform to 100k+ users",
      "Reduced load time by 60%",
      "Led team of 3 developers",
    ],
  },
  {
    period: "2018 - 2020",
    title: "Full Stack Developer",
    company: "Digital Agency",
    description:
      "Built websites and web applications for clients across various industries, from e-commerce to SaaS.",
    highlights: [
      "Delivered 40+ client projects",
      "Introduced React/Next.js to the team",
      "Created reusable component library",
    ],
  },
];

export const funFacts = [
  {
    icon: Coffee,
    label: "Coffee consumed",
    value: "∞ cups",
  },
  {
    icon: Headphones,
    label: "Coding playlist",
    value: "Podcasts",
  },
  {
    icon: Mountain,
    label: "When not coding",
    value: "At the gym, travelling or gaming",
  },
  {
    icon: Award,
    label: "Favorite framework",
    value: "Next.js",
  },
];

export const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/jamesgabby",
    icon: Github,
  },
  {
    name: "Twitter",
    url: "https://twitter.com/jamesgabbitus",
    icon: Twitter,
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/james-gabbitus",
    icon: Linkedin,
  },
  {
    name: "Email",
    url: "mailto:jamesgabbitus@gmail.com",
    icon: Mail,
  },
];

export const values = [
  {
    title: "Quality Over Quantity",
    description:
      "I take on a limited number of projects to ensure each client gets my full attention and best work.",
  },
  {
    title: "Clear Communication",
    description:
      "No jargon, no surprises. I keep you informed at every step with regular updates and honest feedback.",
  },
  {
    title: "Results Driven",
    description:
      "Beautiful design is great, but conversions pay the bills. Everything I build is optimized for results.",
  },
  {
    title: "Long-term Thinking",
    description:
      "I build scalable, maintainable code that grows with your business—not technical debt that slows you down.",
  },
];