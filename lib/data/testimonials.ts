import { Testimonial } from "@/types";

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Chen",
    role: "CEO & Co-founder",
    company: "Neural AI",
    image: "/testimonials/sarah-chen.jpg",
    content:
      "James transformed our complex AI product into a compelling story. Our conversion rates increased by 340% within the first month of launching the new landing page. He truly understands what makes visitors convert into customers.",
    rating: 5,
    projectId: "neural-ai",
    featured: true,
  },
  {
    id: "2",
    name: "Marcus Johnson",
    role: "Founder",
    company: "Synthwave Labs",
    image: "/testimonials/marcus-johnson.jpg",
    content:
      "The interactive demo James built has become our #1 conversion driver. He didn't just build a website—he created an experience that perfectly showcases our AI music generation platform. Absolutely incredible work.",
    rating: 5,
    projectId: "synthwave-labs",
    featured: true,
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    role: "Head of Marketing",
    company: "DataMind",
    image: "/testimonials/emily-rodriguez.jpg",
    content:
      "Working with James was a game-changer for our startup. He delivered a stunning dashboard interface that our users love. The attention to detail and performance optimization exceeded our expectations.",
    rating: 5,
    projectId: "datamind",
    featured: true,
  },
  {
    id: "4",
    name: "David Park",
    role: "CTO",
    company: "Quantum Compute",
    image: "/testimonials/david-park.jpg",
    content:
      "James has a rare ability to translate technical complexity into beautiful, intuitive interfaces. Our enterprise clients are consistently impressed by the professionalism of our landing page. He's now our go-to developer.",
    rating: 5,
    projectId: "quantum-compute",
    featured: false,
  },
  {
    id: "5",
    name: "Lisa Wang",
    role: "Product Manager",
    company: "AI Copilot",
    image: "/testimonials/lisa-wang.jpg",
    content:
      "As a developer tool, we needed to appeal to a skeptical technical audience. James nailed it with real code examples and live demos. Our GitHub stars doubled within weeks of launch.",
    rating: 5,
    projectId: "ai-copilot",
    featured: false,
  },
  {
    id: "6",
    name: "Dr. Michael Foster",
    role: "CEO",
    company: "Clarity Health",
    image: "/testimonials/michael-foster.jpg",
    content:
      "Healthcare requires trust and compliance. James understood this perfectly and created a landing page that conveys both innovation and reliability. Our hospital partnerships have grown significantly.",
    rating: 5,
    projectId: "clarity-health",
    featured: false,
  },
  {
    id: "7",
    name: "Amanda Torres",
    role: "Founder",
    company: "VoiceAI Studio",
    image: "/testimonials/amanda-torres.jpg",
    content:
      "From concept to launch in just 10 days—James delivered beyond what we thought possible. The animations and micro-interactions make our AI voice platform feel alive. Our investors were blown away.",
    rating: 5,
    featured: false,
  },
  {
    id: "8",
    name: "Robert Kim",
    role: "VP of Growth",
    company: "PredictML",
    image: "/testimonials/robert-kim.jpg",
    content:
      "We've worked with many developers, but James stands out. His focus on conversion optimization helped us reduce our CAC by 40%. He doesn't just build websites—he builds growth engines.",
    rating: 5,
    featured: false,
  },
];

export const clientLogos = [
  { name: "Neural AI", logo: "/logos/neural-ai.svg" },
  { name: "Synthwave Labs", logo: "/logos/synthwave.svg" },
  { name: "DataMind", logo: "/logos/datamind.svg" },
  { name: "Quantum Compute", logo: "/logos/quantum.svg" },
  { name: "AI Copilot", logo: "/logos/copilot.svg" },
  { name: "Clarity Health", logo: "/logos/clarity.svg" },
  { name: "VoiceAI Studio", logo: "/logos/voiceai.svg" },
  { name: "PredictML", logo: "/logos/predictml.svg" },
];

export const stats = {
  averageRating: 5.0,
  totalReviews: 50,
  satisfactionRate: 100,
  repeatClients: 85,
};

export const getFeaturedTestimonials = () =>
  testimonials.filter((t) => t.featured);

export const getTestimonialByProject = (projectId: string) =>
  testimonials.find((t) => t.projectId === projectId);