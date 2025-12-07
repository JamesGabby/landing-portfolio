export interface Project {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  longDescription?: string;
  image: string;
  images?: string[];
  tags: string[];
  category: string;
  liveUrl?: string;
  caseStudyUrl?: string;
  featured?: boolean;
  metrics?: {
    label: string;
    value: string;
  }[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
    avatar?: string;
  };
  year?: string;
  duration?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  features: string[];
  popular?: boolean;
  details?: {
    process: string[];
    deliverables: string[];
    timeline: string;
  };
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  image?: string;
  content: string;
  rating?: number;
  projectId?: string;
}

export interface ProcessStep {
  id: string;
  step: number;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  budget?: string;
  projectType?: string;
  message: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  image?: string;
  content: string;
  rating?: number;
  projectId?: string;
  featured?: boolean;
}