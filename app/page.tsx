"use client";

import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import SkillsSection from "@/components/skills-section";
import ProjectsSection from "@/components/projects-section";
import TimelineSection from "@/components/timeline-section";

export default function Home() {
  return (
    <>
      <HeroSection />

      <AboutSection />

      <SkillsSection />

      <ProjectsSection />

      <TimelineSection />

      <footer className="py-12 px-4 bg-background border-t border-border">
        <div className="max-w-5xl mx-auto text-center text-sm text-muted-foreground">
          © 2026 Ryu Byeongsun. Built with Next.js & Tailwind.
        </div>
      </footer>
    </>
  );
}
