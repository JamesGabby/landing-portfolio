// src/lib/seo.config.ts
export const seoConfig = {
  siteName: "James Gabbitus",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://jamesgabbitus.com",
  title: "James Gabbitus | AI Landing Page Developer",
  description:
    "I build high-converting landing pages for AI startups and tech companies. Specializing in Next.js, React, and modern web technologies.",
  keywords: [
    "AI landing page developer",
    "Next.js developer",
    "freelance web developer",
    "startup landing pages",
    "conversion optimization",
    "React developer",
    "Tailwind CSS",
    "web development",
    "UI/UX design",
    "web application",
    "AI web application",
    "website developer",
    "app developer",
    "James Gabbitus",
  ],
  author: {
    name: "James Gabbitus",
    email: "jamesgabbitus@gmail.com",
    twitter: "@jamesgabbitus",
    linkedin: "https://linkedin.com/in/james-gabbitus",
    github: "https://github.com/jamesgabby",
  },
  locale: "en_US",
  themeColor: "#6366f1",
  backgroundColor: "#0a0a0b",
} as const;