"use client";

import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import SkillsSection from "@/components/skills-section";
import ProjectsSection from "@/components/projects-section";
import PlanSection from "@/components/plan-section";

export default function Home() {
  return (
    <>
      <HeroSection />

      <AboutSection />

      <SkillsSection />

      <ProjectsSection />

      <PlanSection />

      <footer className="py-12 px-4 bg-[#060f0b] border-t border-zinc-800">
        <div className="max-w-5xl mx-auto text-center text-sm text-zinc-600">
          © 2026 Ryu Byeongsun. Built with Next.js & Tailwind.
        </div>
      </footer>
    </>
  );
}
