"use client";

import { useRef, useState } from "react";
// import Image from "next/image";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  Download,
  MapPin,
  Clock,
  CheckCircle,
  Sparkles,
  Quote,
} from "lucide-react";
import {
  personalInfo,
  expertise,
  funFacts,
  socialLinks,
  values,
} from "@/lib/data/about";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import SectionHeader from "../ui/SectionHeader";
import Image from "next/image";

// Profile Image Component with fallback
const ProfileImage = () => {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="relative">
      {/* Decorative elements */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-2xl"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="absolute -inset-px bg-gradient-to-br from-primary to-accent rounded-3xl"
      />

      {/* Image container */}
      <div className="relative aspect-[4/5] w-full max-w-md rounded-3xl overflow-hidden bg-card">
        {!hasError ? (
          <>
          <Image
            src="/me.jpg"
            alt="James Gabbitus"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 400px"
            onError={() => setHasError(true)}
            priority
          />
          </>
        ) : (
          <ProfileImagePlaceholder />
        )}
      </div>

      {/* Floating badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="absolute -bottom-6 -right-6 bg-card border border-border rounded-2xl p-4 shadow-xl"
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-3 h-3 bg-success rounded-full" />
            <div className="absolute inset-0 w-3 h-3 bg-success rounded-full animate-ping" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">Available Now</p>
            <p className="text-xs text-muted-foreground">For new projects</p>
          </div>
        </div>
      </motion.div>

      {/* Experience badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="absolute -top-4 -left-4 bg-primary text-white rounded-2xl px-4 py-3 shadow-xl"
      >
        <p className="text-2xl font-bold">5+</p>
        <p className="text-xs opacity-80">Years Exp.</p>
      </motion.div>
    </div>
  );
};

// Placeholder when no image is available
const ProfileImagePlaceholder = () => (
  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
    <div className="text-center">
      <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
        <span className="text-4xl font-bold text-primary">JG</span>
      </div>
      <p className="text-lg font-medium text-foreground">James Gabbitus</p>
      <p className="text-sm text-muted-foreground">Next.js Developer</p>
    </div>
  </div>
);

// Expertise Card Component
const ExpertiseCard = ({
  item,
  index,
}: {
  item: (typeof expertise)[0];
  index: number;
}) => {
  const Icon = item.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group p-6 bg-card border border-border rounded-2xl hover:border-primary/30 transition-all duration-300 hover:shadow-glow-sm"
    >
      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">
        {item.title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {item.description}
      </p>
    </motion.div>
  );
};

// Value Item Component
const ValueItem = ({
  value,
  index,
}: {
  value: (typeof values)[0];
  index: number;
}) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="flex gap-4"
  >
    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mt-1">
      <CheckCircle className="w-4 h-4 text-primary" />
    </div>
    <div>
      <h4 className="font-medium text-foreground mb-1">{value.title}</h4>
      <p className="text-sm text-muted-foreground">{value.description}</p>
    </div>
  </motion.div>
);

// Fun Fact Item
const FunFactItem = ({
  fact,
  index,
}: {
  fact: (typeof funFacts)[0];
  index: number;
}) => {
  const Icon = fact.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="flex items-center gap-3 p-3 bg-card border border-border rounded-xl"
    >
      <Icon className="w-5 h-5 text-primary" />
      <div>
        <p className="text-xs text-muted-foreground">{fact.label}</p>
        <p className="text-sm font-medium text-foreground">{fact.value}</p>
      </div>
    </motion.div>
  );
};

// Main About Component
export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 lg:py-32 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-50" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[128px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[128px]" />

      <div className="relative section-padding">
        <div className="container-custom">
          {/* Header */}
          <SectionHeader
            badge="About Me"
            badgeIcon={<Sparkles className="w-3 h-3" />}
            title="The developer behind your next successful launch"
            titleHighlight="successful launch"
            description="I'm James Gabbitus, a freelance developer passionate about helping AI startups make their mark on the web."
          />

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-16 items-start mb-20">
            {/* Left - Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <ProfileImage />
            </motion.div>

            {/* Right - Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              {/* Quick Info */}
              <div className="flex flex-wrap items-center gap-4">
                <Badge variant="accent" icon={<MapPin className="w-3 h-3" />}>
                  {personalInfo.location}
                </Badge>
                <Badge variant="default" icon={<Clock className="w-3 h-3" />}>
                  {personalInfo.responseTime}
                </Badge>
              </div>

              {/* Title */}
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                  {personalInfo.name}
                </h3>
                <p className="text-lg text-primary">{personalInfo.title}</p>
              </div>

              {/* Bio */}
              <div className="space-y-4">
                {personalInfo.bio.split("\n\n").map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-muted-foreground leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Philosophy Quote */}
              <div className="relative p-6 bg-primary/5 border border-primary/20 rounded-2xl">
                <Quote className="absolute top-4 left-4 w-8 h-8 text-primary/20" />
                <p className="text-foreground italic pl-8">
                  "{personalInfo.philosophy}"
                </p>
              </div>

              {/* Values */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-foreground">
                  What I Stand For
                </h4>
                <div className="grid gap-4">
                  {values.map((value, index) => (
                    <ValueItem key={value.title} value={value} index={index} />
                  ))}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                <Button
                  size="lg"
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                  onClick={() => {
                    document.getElementById("contact")?.scrollIntoView({
                      behavior: "smooth",
                    });
                  }}
                >
                  Work With Me
                </Button>
                {/* <Button
                  variant="secondary"
                  size="lg"
                  leftIcon={<Download className="w-5 h-5" />}
                  onClick={() => {
                    // You can link to an actual resume PDF
                    window.open("/james-gabbitus-resume.pdf", "_blank");
                  }}
                >
                  Download Resume
                </Button> */}
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-3 pt-4">
                <span className="text-sm text-muted-foreground">Find me on:</span>
                <div className="flex items-center gap-2">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-lg bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all duration-300"
                        aria-label={social.name}
                      >
                        <Icon className="w-5 h-5" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Expertise Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Why Work With Me?
              </h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                I bring a unique combination of skills that help AI startups
                succeed online.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {expertise.map((item, index) => (
                <ExpertiseCard key={item.title} item={item} index={index} />
              ))}
            </div>
          </motion.div>

          {/* Fun Facts */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {funFacts.map((fact, index) => (
              <FunFactItem key={fact.label} fact={fact} index={index} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}