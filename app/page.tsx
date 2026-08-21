import Link from "next/link";
import { ArrowUpRight, ShieldCheck, Terminal, Layers, Activity, Trophy, Mail, Sparkles, FolderGit2 } from "lucide-react";

import { ContactForm } from "@/components/forms/contact-form";
import { Reveal } from "@/components/motion/reveal";
import { HeroProfileSection } from "@/components/sections/hero-profile";
import { ExperienceSection } from "@/components/sections/experience";
import { SkillsSection } from "@/components/sections/skills";
import { ProjectCard } from "@/components/sections/project-card";
import { InteractiveLabSection } from "@/components/sections/interactive-lab";
import { GithubActivitySection } from "@/components/sections/github-activity";
import { AwardsSection } from "@/components/sections/awards";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { getFeaturedProjects } from "@/lib/projects";
import { typography } from "@/styles/design-system";

export const revalidate = 3600;

const resumePath = "/resume/Pratik_Vaibhav_Resume.pdf";

export default async function HomePage() {
  const projects = await getFeaturedProjects();
  const featuredProject =
    projects.find((project) => project.slug.toLowerCase() === "clinkz") ?? projects[0];
  const supportingProjects = projects
    .filter((project) => project.slug !== featuredProject?.slug)
    .slice(0, 5);

  return (
    <div className="space-y-16 md:space-y-24 py-6 md:py-10">
      {/* 1. HERO PROFILE CARD WITH PHOTO */}
      <Reveal>
        <HeroProfileSection resumePath={resumePath} />
      </Reveal>

      {/* 2. PROFESSIONAL EXPERIENCE SECTION */}
      <section id="experience" className="section">
        <div className="container relative z-10">
          <Reveal>
            <div className="section-panel p-6 sm:p-8 md:p-12">
              <ExperienceSection />
            </div>
          </Reveal>
        </div>
      </section>

      {/* 3. CORE SKILLS & TECHNICAL CAPABILITIES */}
      <section id="skills" className="section">
        <div className="container relative z-10">
          <Reveal>
            <div className="section-panel p-6 sm:p-8 md:p-12">
              <SkillsSection />
            </div>
          </Reveal>
        </div>
      </section>

      {/* 4. FLAGSHIP SECURITY PROJECTS & REPOSITORIES */}
      <section id="projects" className="section">
        <div className="container relative z-10 space-y-8">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-400">
                  <FolderGit2 className="h-3.5 w-3.5" />
                  Engineering &bull; Flagship Security Toolchains
                </div>
                <h2 className={typography.sectionTitle}>
                  Open Source Security Tools &amp; Systems
                </h2>
                <p className={typography.sectionDescription}>
                  Offensive security automation frameworks, enterprise DAST parsers, and vulnerability triage platforms engineered for reproducible evidence.
                </p>
              </div>

              <a
                href="https://github.com/ptkvaibhav"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white/90 dark:bg-slate-900/90 px-4 py-2 text-xs font-bold text-slate-900 dark:text-white shadow-sm hover:border-cyan-500 transition-all"
              >
                <span>Browse All Repositories</span>
                <ArrowUpRight className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
              </a>
            </div>
          </Reveal>

          {/* Featured Clinkz Card + Supporting Projects Grid */}
          <div className="space-y-6">
            {featuredProject && (
              <Reveal>
                <ProjectCard project={featuredProject} featured />
              </Reveal>
            )}

            <div className="grid gap-6 md:grid-cols-2">
              {supportingProjects.map((project) => (
                <Reveal key={project.slug}>
                  <ProjectCard project={project} />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE SECURITY CONSOLE & TELEMETRY LAB */}
      <section id="interactive-console" className="section">
        <div className="container relative z-10">
          <Reveal>
            <div className="section-panel p-6 sm:p-8 md:p-12">
              <InteractiveLabSection />
            </div>
          </Reveal>
        </div>
      </section>

      {/* 6. GITHUB ACTIVITY & CONTRIBUTIONS TELEMETRY */}
      <section id="github-activity" className="section">
        <div className="container relative z-10">
          <Reveal>
            <div className="section-panel p-6 sm:p-8 md:p-12">
              <GithubActivitySection />
            </div>
          </Reveal>
        </div>
      </section>

      {/* 7. AWARDS & NULLCON SPEAKER SPOTLIGHT */}
      <section id="awards" className="section">
        <div className="container relative z-10">
          <Reveal>
            <div className="section-panel p-6 sm:p-8 md:p-12">
              <AwardsSection />
            </div>
          </Reveal>
        </div>
      </section>

      {/* 8. CONTACT & SECURE INQUIRIES */}
      <section id="contact" className="section">
        <div className="container relative z-10">
          <Reveal>
            <div className="section-panel p-6 sm:p-8 md:p-12">
              <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] items-start">
                <div className="space-y-6">
                  <div className="space-y-3">
                    <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-400">
                      <Mail className="h-3.5 w-3.5" />
                      Encrypted Channels
                    </div>
                    <h2 className={typography.sectionTitle}>
                      Initiate Contact
                    </h2>
                    <p className="text-sm font-normal leading-relaxed text-slate-700 dark:text-slate-200">
                      Direct inquiries for product security incident response, application security leadership, conference speaking engagements, or offensive security automation tooling.
                    </p>
                  </div>

                  <div className="space-y-3 font-mono text-xs text-slate-600 dark:text-slate-300">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                      <span>PGP Fingerprint: Verified Security Key Available</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-cyan-500" />
                      <span>Response SLA: Within 24 hours for security inquiries</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 p-6 md:p-8 shadow-md">
                  <ContactForm />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
