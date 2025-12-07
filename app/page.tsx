import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Portfolio from "@/components/sections/Portfolio";
import Pricing from "@/components/sections/Pricing";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import TechStack from "@/components/sections/TechStack";
import StatsBand from "@/components/sections/StatsBand";
import PersonalTouch from "@/components/sections/PersonalTouch";
import Testimonials from "@/components/sections/Testimonials";
import Process from "@/components/sections/Process";
import Contact from "@/components/sections/Contact";
import FloatingContactButton from "@/components/ui/FloatingContactButton";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Services />
      <Portfolio />
      <Pricing />
      <About />
      <StatsBand />
      <Skills />
      <Experience />
      <TechStack />
      <PersonalTouch />
      <Testimonials />
      <Process />
      <Contact />
      
      {/* Floating contact button */}
      <FloatingContactButton />
    </div>
  );
}