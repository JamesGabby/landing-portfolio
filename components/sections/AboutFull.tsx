"use client";

import About from "./About";
import Skills from "./Skills";
import Experience from "./Experience";
import TechStack from "./TechStack";
import StatsBand from "./StatsBand";
import PersonalTouch from "./PersonalTouch";

export default function AboutFull() {
  return (
    <>
      <About />
      <StatsBand />
      <Skills />
      <Experience />
      <TechStack />
      <PersonalTouch />
    </>
  );
}