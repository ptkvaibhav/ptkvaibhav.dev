import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Download, GitFork, Github, ShieldCheck, Star, Terminal, Sparkles, Activity, Layers, ExternalLink } from "lucide-react";

import { ContactForm } from "@/components/forms/contact-form";
import { SecurityTerminal } from "@/components/interactive/terminal";
import { TriageSimulator } from "@/components/interactive/triage-simulator";
import { Reveal } from "@/components/motion/reveal";
import { AwardsSection } from "@/components/sections/awards";
import { ExperienceSection } from "@/components/sections/experience";
import { ProjectCard } from "@/components/sections/project-card";
import { SkillsSection } from "@/components/sections/skills";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Button } from "@/components/ui/button";
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
  const featuredKeywords = featuredProject
    ? featuredProject.tags
        .filter((tag) => tag.toLowerCase() !== featuredProject.language?.toLowerCase())
        .slice(0, 5)
    : [];

  const stats = [
    {
      label: "Security delivery",
      value: "6+ yrs",
      sub: "Enterprise & Gov",
    },
    {
      label: "False positives cut",
      value: "30%",
      sub: "Near-zero AST noise",
    },
    {
      label: "Performance band",
      value: "Top 1%",
      sub: "Deloitte Advisory",
    },
    {
      label: "Team mentored",
      value: "14",
      sub: "AppSec Engineers",
    },
  ];

  return (
    <div className="space-y-16 md:space-y-24 py-6 md:py-10">
      {/* 1. HERO SECTION WITH LIVE SECURITY CONSOLE */}
      <section id="about" className="section hero-section !py-0">
        <div className="container relative z-10">
          <div className="hero-card p-6 md:p-10 lg:p-12">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-center">
              {/* Left Column: Intro & Core Metrics */}
              <Reveal className="min-w-0 space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-400 shadow-sm backdrop-blur">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="truncate">Senior Product Security Engineer (PSIRT) &bull; Guidewire</span>
                </div>

                <div className="space-y-4">
                  <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-black leading-[0.98] tracking-[-0.05em] text-slate-950 dark:text-white">
                    I build secure systems and prove where they break.
                  </h1>
                  <p className="max-w-[620px] text-base font-medium leading-relaxed text-slate-600 dark:text-slate-300 md:text-lg">
                    Senior Product Security Engineer (PSIRT) at Guidewire Software and ex-Lead Solution Advisor at Deloitte. Specializing in security incident response, TruffleHog secret governance, DevSecOps automation, and offensive validation.
                  </p>
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap gap-3 pt-1">
                  <Button asChild size="lg" className="bg-slate-950 text-white hover:bg-cyan-700 dark:bg-emerald-500 dark:text-slate-950 dark:hover:bg-emerald-400 font-bold">
                    <Link href="#projects">
                      View security projects
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="secondary" className="border-slate-300 dark:border-slate-700">
                    <Link href={resumePath} target="_blank" rel="noopener noreferrer">
                      Download resume
                      <Download className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>

                {/* 4 Stats Grid */}
                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4 pt-2">
                  {stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-2xl border border-slate-200/80 bg-white/80 dark:border-white/10 dark:bg-slate-900/80 p-4 shadow-sm backdrop-blur"
                    >
                      <p className="text-2xl md:text-3xl font-black tracking-tight text-cyan-600 dark:text-cyan-400 font-mono">
                        {stat.value}
                      </p>
                      <p className="mt-1 text-[11px] font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                        {stat.label}
                      </p>
                      <p className="text-[10px] text-slate-500 font-mono mt-0.5">
                        {stat.sub}
                      </p>
                    </div>
                  ))}
                </div>
              </Reveal>

              {/* Right Column: Live Interactive Security Terminal */}
              <Reveal delay={0.1} className="w-full">
                <SecurityTerminal />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 2. INTERACTIVE TRIAGE & FALSE POSITIVE REDUCTION SIMULATOR */}
      <section className="section !py-0">
        <div className="container">
          <Reveal>
            <TriageSimulator />
          </Reveal>
        </div>
      </section>

      {/* 3. SKILLS & TOOLING ARSENAL (Bento Grid with Live Filter) */}
      <section id="skills" className="section !py-0">
        <div className="container">
          <Reveal className="section-panel p-6 md:p-10">
            <SkillsSection />
          </Reveal>
        </div>
      </section>

      {/* 4. PROFESSIONAL EXPERIENCE TIMELINE */}
      <section id="experience" className="section !py-0">
        <div className="container">
          <Reveal className="section-panel p-6 md:p-10">
            <ExperienceSection />
          </Reveal>
        </div>
      </section>

      {/* 5. SECURITY PROJECTS & OPEN SOURCE SHOWCASE */}
      <section id="projects" className="section !py-0">
        <div className="container space-y-10">
          <Reveal className="mx-auto max-w-3xl text-center space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-50 dark:bg-cyan-950/40 px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-400">
              <Github className="h-4 w-4" />
              Automated Security Intelligence
            </div>
            <h2 className={typography.sectionTitle}>Security Projects &amp; Tools</h2>
            <p className={`${typography.sectionDescription} mx-auto`}>
              Open-source security tools, vulnerability scanners, and proof-of-concept exploit correlation engines engineered to automate manual pentesting workflows.
            </p>
          </Reveal>

          {featuredProject ? (
            <div className="space-y-6">
              {/* Flagship Project Spotlight Card */}
              <Reveal>
                <SpotlightCard className="relative overflow-hidden border-cyan-500/30 dark:border-cyan-500/40 bg-gradient-to-br from-slate-900 to-slate-950 text-white p-6 md:p-10 shadow-2xl">
                  <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-cyan-500/15 blur-3xl" />
                  <div className="pointer-events-none absolute -bottom-28 left-12 h-72 w-72 rounded-full bg-emerald-500/15 blur-3xl" />
                  
                  <div className="relative space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="rounded-full border border-emerald-500/40 bg-emerald-500/20 px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider text-emerald-300">
                        Flagship Security Tool
                      </span>
                      {featuredProject.language && (
                        <span className="rounded-full border border-slate-700 bg-slate-800 px-3 py-1 text-xs font-mono font-semibold text-slate-300">
                          {featuredProject.language}
                        </span>
                      )}
                    </div>

                    <h3 className="text-[2.2rem] md:text-[3rem] font-black tracking-tight text-white">
                      {featuredProject.title}
                    </h3>
                    <p className="max-w-3xl text-sm md:text-base leading-relaxed text-slate-300">
                      {featuredProject.excerpt}
                    </p>

                    {featuredKeywords.length ? (
                      <p className="text-xs font-mono font-semibold uppercase tracking-[0.16em] text-cyan-300">
                        {featuredKeywords.join(" / ")}
                      </p>
                    ) : null}
                  </div>

                  <div className="relative mt-6 flex flex-wrap gap-3 text-xs font-mono font-medium text-slate-200">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/10 px-3.5 py-1.5">
                      <Star className="h-4 w-4 text-amber-400" />
                      {featuredProject.stars ?? 0} GitHub Stars
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/10 px-3.5 py-1.5">
                      <GitFork className="h-4 w-4 text-cyan-300" />
                      {featuredProject.forks ?? 0} Forks
                    </span>
                  </div>

                  <ul className="relative mt-6 grid gap-2.5 pl-4 text-xs md:text-sm leading-relaxed text-slate-300 font-mono md:grid-cols-2">
                    <li className="list-disc marker:text-cyan-400">Correlates CVEs, bug bounty writeups, and exploit research</li>
                    <li className="list-disc marker:text-cyan-400">Automates reconnaissance, fuzzing, and vulnerability validation</li>
                    <li className="list-disc marker:text-cyan-400">Designed to reduce manual pentesting effort</li>
                    <li className="list-disc marker:text-cyan-400">Focuses on discovering non-obvious vulnerabilities</li>
                  </ul>

                  <div className="relative mt-8 flex flex-wrap items-center gap-3">
                    {featuredProject.readmeUrl && (
                      <Button asChild variant="secondary" size="sm" className="bg-white/10 text-white hover:bg-white/20 border-white/20">
                        <Link href={featuredProject.readmeUrl} target="_blank" rel="noopener noreferrer">
                          View README
                        </Link>
                      </Button>
                    )}
                    {featuredProject.downloadUrl && (
                      <Button asChild variant="secondary" size="sm" className="bg-white/10 text-white hover:bg-white/20 border-white/20">
                        <Link href={featuredProject.downloadUrl} target="_blank" rel="noopener noreferrer">
                          Download source
                          <Download className="h-4 w-4" />
                        </Link>
                      </Button>
                    )}
                    <Button asChild size="sm" className="bg-emerald-500 text-slate-950 hover:bg-emerald-400 font-bold">
                      <Link href={featuredProject.github} target="_blank" rel="noopener noreferrer">
                        View repo on GitHub
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </SpotlightCard>
              </Reveal>

              {/* Supporting Projects Bento Grid */}
              {supportingProjects.length ? (
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  {supportingProjects.map((project, index) => (
                    <Reveal key={project.slug} delay={index * 0.05}>
                      <ProjectCard project={project} compact />
                    </Reveal>
                  ))}
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </section>

      {/* 6. AWARDS & SPEAKING ENGAGEMENTS */}
      <section id="awards" className="section !py-0">
        <div className="container">
          <Reveal className="section-panel p-6 md:p-10">
            <AwardsSection />
          </Reveal>
        </div>
      </section>

      {/* 7. CONTACT & INQUIRIES */}
      <section id="contact" className="section !py-0">
        <div className="container">
          <div className="section-panel grid gap-10 p-6 md:p-10 lg:grid-cols-[300px_minmax(0,1fr)] lg:items-start">
            <Reveal className="space-y-6">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-mono font-bold uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-400">
                  <Activity className="h-3.5 w-3.5" />
                  Direct Dispatch
                </div>
                <h2 className={typography.sectionTitle}>Get in Touch</h2>
                <p className={typography.sectionDescription}>
                  Whether you are hiring for senior AppSec leadership roles, planning security assessments, or want to collaborate on security tooling, feel free to drop a message.
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                <p className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                  Verified Resume PDF
                </p>
                <Button asChild className="w-full bg-slate-950 text-white dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200 font-bold">
                  <Link href={resumePath} target="_blank" rel="noopener noreferrer">
                    Download Pratik_Vaibhav_Resume.pdf
                    <Download className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
