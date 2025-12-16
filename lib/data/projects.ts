import { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "lessonly",
    title: "Lessonly",
    subtitle: "AI Lesson Planning Platform",
    description:
      "Generate fully curriculum-aligned lessons in seconds, with AI that actually understands the UK National Curriculum and adapts content to different key stages and abilities.",
    longDescription:
      "Generate fully curriculum-aligned lessons in seconds, with AI that actually understands the UK National Curriculum and adapts content to different key stages and abilities. Everything then lives in one clean, unified dashboard, so whether you’re teaching a class or tutoring one-to-one, you’re not jumping between tools.",
    image: "/lessonlyy.png",
    images: [
      "/projects/neural-ai-1.jpg",
      "/projects/neural-ai-2.jpg",
      "/projects/neural-ai-3.jpg",
    ],
    tags: ["Next.js", "Tailwind CSS", "Framer Motion", "AI/ML", "Supabase", "three.js"],
    category: "AI Web Application",
    liveUrl: "https://lessonly.vercel.app",
    caseStudyUrl: "/case-studies/neural-ai",
    featured: true,
    metrics: [
      // { label: "Conversion Rate", value: "+340%" },
      // { label: "Page Speed", value: "98/100" },
      // { label: "Time on Site", value: "+180%" },
      { label: "Performance", value: "99%" },
      { label: "Best Practices", value: "100%" },
      { label: "SEO", value: "100%" },
    ],
    // testimonial: {
    //   quote:
    //     "James transformed our complex AI product into a compelling story. Our conversion rates have never been higher.",
    //   author: "Sarah Chen",
    //   role: "CEO, Neural AI",
    //   avatar: "/testimonials/sarah.jpg",
    // },
    year: "2025",
    duration: "8 weeks",
  },
  {
    id: "repurpose-ai",
    title: "RepurposeAI",
    subtitle: "Repurpose AI Landing Page",
    description:
      "A comprehensive landing page for an AI Content Repurposing Tool that automatically converts blog posts into social media threads, newsletters, video scripts, and podcasts. ",
    longDescription:
      "A comprehensive landing page for an AI Content Repurposing Tool that automatically converts blog posts into social media threads, newsletters, video scripts, and podcasts. The design focuses on demonstrating the product's capabilities through interactive demos and clear value propositions.",
    image: "/repurpose.png",
    images: [
      "/projects/neural-ai-1.jpg",
      "/projects/neural-ai-2.jpg",
      "/projects/neural-ai-3.jpg",
    ],
    tags: ["Next.js", "Tailwind CSS", "Framer Motion", "Shadcn"],
    category: "AI Landing Page",
    liveUrl: "https://repurpose-ai-delta.vercel.app/",
    caseStudyUrl: "/case-studies/neural-ai",
    featured: true,
    metrics: [
      { label: "Performance", value: "100%" },
      { label: "Best Practices", value: "100%" },
      { label: "SEO", value: "100%" },
    ],
    // testimonial: {
    //   quote:
    //     "James transformed our complex AI product into a compelling story. Our conversion rates have never been higher.",
    //   author: "Sarah Chen",
    //   role: "CEO, Neural AI",
    //   avatar: "/testimonials/sarah.jpg",
    // },
    year: "2025",
    duration: "4 days",
  },
  // {
  //   id: "neural-ai",
  //   title: "Neural AI",
  //   subtitle: "AI Writing Assistant Platform",
  //   description:
  //     "A comprehensive landing page for an AI-powered writing assistant startup. The design focuses on demonstrating the product's capabilities through interactive demos and clear value propositions.",
  //   longDescription:
  //     "Neural AI needed a landing page that could effectively communicate their complex AI technology to a non-technical audience. I created an immersive experience with live demos, animated feature showcases, and a conversion-optimized layout that increased their sign-up rate by 340%.",
  //   image: "/projects/neural-ai.jpg",
  //   images: [
  //     "/projects/neural-ai-1.jpg",
  //     "/projects/neural-ai-2.jpg",
  //     "/projects/neural-ai-3.jpg",
  //   ],
  //   tags: ["Next.js", "Tailwind CSS", "Framer Motion", "AI/ML"],
  //   category: "AI Landing Page",
  //   liveUrl: "https://neural-ai.example.com",
  //   caseStudyUrl: "/case-studies/neural-ai",
  //   featured: true,
  //   metrics: [
  //     { label: "Conversion Rate", value: "+340%" },
  //     { label: "Page Speed", value: "98/100" },
  //     { label: "Time on Site", value: "+180%" },
  //   ],
  //   testimonial: {
  //     quote:
  //       "James transformed our complex AI product into a compelling story. Our conversion rates have never been higher.",
  //     author: "Sarah Chen",
  //     role: "CEO, Neural AI",
  //     avatar: "/testimonials/sarah.jpg",
  //   },
  //   year: "2024",
  //   duration: "2 weeks",
  // },
  // {
  //   id: "synthwave-labs",
  //   title: "Synthwave Labs",
  //   subtitle: "AI Music Generation Platform",
  //   description:
  //     "An immersive landing page for an AI music generation startup featuring audio visualizations, interactive demos, and a unique visual identity.",
  //   longDescription:
  //     "Synthwave Labs wanted to stand out in the crowded AI music space. I designed and developed a visually striking landing page with real-time audio visualizations, an interactive music generation demo, and seamless Stripe integration for their subscription plans.",
  //   image: "/projects/synthwave-labs.jpg",
  //   images: [
  //     "/projects/synthwave-1.jpg",
  //     "/projects/synthwave-2.jpg",
  //     "/projects/synthwave-3.jpg",
  //   ],
  //   tags: ["Next.js", "Web Audio API", "Supabase", "Stripe"],
  //   category: "Web Application",
  //   liveUrl: "https://synthwave-labs.example.com",
  //   featured: true,
  //   metrics: [
  //     { label: "User Sign-ups", value: "12k+" },
  //     { label: "MRR Growth", value: "+250%" },
  //     { label: "Bounce Rate", value: "-45%" },
  //   ],
  //   testimonial: {
  //     quote:
  //       "The interactive demo James built has become our #1 conversion driver. Absolutely incredible work.",
  //     author: "Marcus Johnson",
  //     role: "Founder, Synthwave Labs",
  //     avatar: "/testimonials/marcus.jpg",
  //   },
  //   year: "2024",
  //   duration: "3 weeks",
  // },
  // {
  //   id: "datamind",
  //   title: "DataMind",
  //   subtitle: "AI Analytics Dashboard",
  //   description:
  //     "A full-stack analytics platform with real-time data visualization, user authentication, and a powerful admin dashboard.",
  //   longDescription:
  //     "DataMind needed more than a landing page—they needed a complete web application. I built a full-stack solution with Next.js and Supabase featuring real-time analytics, role-based access control, and a beautiful dashboard interface.",
  //   image: "/projects/datamind.jpg",
  //   images: [
  //     "/projects/datamind-1.jpg",
  //     "/projects/datamind-2.jpg",
  //     "/projects/datamind-3.jpg",
  //   ],
  //   tags: ["Next.js", "Supabase", "PostgreSQL", "Charts"],
  //   category: "Web Application",
  //   liveUrl: "https://datamind.example.com",
  //   featured: true,
  //   metrics: [
  //     { label: "Active Users", value: "5k+" },
  //     { label: "Data Points", value: "10M+" },
  //     { label: "Uptime", value: "99.9%" },
  //   ],
  //   year: "2024",
  //   duration: "6 weeks",
  // },
  // {
  //   id: "quantum-compute",
  //   title: "Quantum Compute",
  //   subtitle: "Quantum Computing SaaS",
  //   description:
  //     "A premium landing page for a quantum computing startup targeting enterprise clients with sophisticated design and technical credibility.",
  //   longDescription:
  //     "Quantum Compute needed to appeal to enterprise decision-makers while explaining complex quantum computing concepts. I created a sophisticated, premium design with animated diagrams, interactive explanations, and enterprise-focused social proof.",
  //   image: "/projects/quantum-compute.jpg",
  //   images: [
  //     "/projects/quantum-1.jpg",
  //     "/projects/quantum-2.jpg",
  //     "/projects/quantum-3.jpg",
  //   ],
  //   tags: ["Next.js", "Three.js", "GSAP", "Enterprise"],
  //   category: "AI Landing Page",
  //   liveUrl: "https://quantum-compute.example.com",
  //   featured: false,
  //   metrics: [
  //     { label: "Enterprise Leads", value: "+420%" },
  //     { label: "Avg. Deal Size", value: "$50k+" },
  //     { label: "Sales Cycle", value: "-30%" },
  //   ],
  //   year: "2024",
  //   duration: "2 weeks",
  // },
  // {
  //   id: "ai-copilot",
  //   title: "AI Copilot",
  //   subtitle: "Developer Productivity Tool",
  //   description:
  //     "A developer-focused landing page for an AI coding assistant with code examples, VS Code integration demos, and technical documentation.",
  //   longDescription:
  //     "AI Copilot needed to speak directly to developers—a notoriously skeptical audience. I built a landing page with real code examples, live integration demos, and performance benchmarks that resonated with the technical community.",
  //   image: "/projects/ai-copilot.jpg",
  //   images: [
  //     "/projects/copilot-1.jpg",
  //     "/projects/copilot-2.jpg",
  //     "/projects/copilot-3.jpg",
  //   ],
  //   tags: ["Next.js", "MDX", "Shiki", "Developer Tools"],
  //   category: "AI Landing Page",
  //   liveUrl: "https://ai-copilot.example.com",
  //   featured: false,
  //   metrics: [
  //     { label: "GitHub Stars", value: "15k+" },
  //     { label: "Weekly Downloads", value: "50k+" },
  //     { label: "Dev Satisfaction", value: "4.9/5" },
  //   ],
  //   year: "2023",
  //   duration: "2 weeks",
  // },
  // {
  //   id: "clarity-health",
  //   title: "Clarity Health",
  //   subtitle: "AI Medical Imaging Platform",
  //   description:
  //     "A HIPAA-compliant landing page for an AI-powered medical imaging startup with trust signals, compliance badges, and clinical validation data.",
  //   longDescription:
  //     "Healthcare requires a different approach—trust and compliance are paramount. I designed a landing page that balanced technical capability with accessibility, featuring prominent trust signals, compliance certifications, and clinical study results.",
  //   image: "/projects/clarity-health.jpg",
  //   images: [
  //     "/projects/clarity-1.jpg",
  //     "/projects/clarity-2.jpg",
  //     "/projects/clarity-3.jpg",
  //   ],
  //   tags: ["Next.js", "Healthcare", "HIPAA", "Accessibility"],
  //   category: "AI Landing Page",
  //   liveUrl: "https://clarity-health.example.com",
  //   featured: false,
  //   metrics: [
  //     { label: "Hospital Partners", value: "50+" },
  //     { label: "Scans Processed", value: "1M+" },
  //     { label: "Accuracy Rate", value: "99.2%" },
  //   ],
  //   year: "2023",
  //   duration: "3 weeks",
  // },
];

export const projectCategories = [
  "All",
  "AI Landing Page",
  "Web Application",
  "AI Web Application",
  "Startup Website",
];

export const getFeaturedProjects = () => projects.filter((p) => p.featured);

export const getProjectBySlug = (slug: string) =>
  projects.find((p) => p.id === slug);

export const getProjectsByCategory = (category: string) =>
  category === "All"
    ? projects
    : projects.filter((p) => p.category === category);