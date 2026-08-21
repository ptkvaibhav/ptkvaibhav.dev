"use client";

import * as React from "react";
import Image from "next/image";
import {
  ShieldCheck,
  Award,
  Terminal as TerminalIcon,
  Download,
  Mail,
  ExternalLink,
  MapPin,
  Sparkles,
  TrendingUp,
  Flame,
  CheckCircle2
} from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { useSound } from "@/components/providers/sound-provider";
import { siteConfig } from "@/lib/site";
import { typography } from "@/styles/design-system";

export function HeroProfileSection({ resumePath = "/resume/pratik-vaibhav-resume.pdf" }: { resumePath?: string }) {
  const { playSound } = useSound();

  const handleAction = (type: string) => {
    playSound("click");
  };

  return (
    <section id="about" className="section !py-0">
      <div className="container relative z-10">
        <div className="hero-card p-6 sm:p-8 md:p-12 transition-all">
          <div className="grid gap-8 lg:grid-cols-[380px_minmax(0,1fr)] lg:items-center">
            
            {/* Left Column: Prominent Portrait & Identity Card */}
            <div className="flex flex-col items-center text-center lg:text-left space-y-6">
              <div className="relative group">
                {/* Glowing Aura Ring */}
                <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-r from-emerald-500 to-cyan-500 opacity-60 blur-lg transition duration-500 group-hover:opacity-100 group-hover:blur-xl animate-pulse" />
                
                {/* High-Resolution Portrait Container */}
                <div className="relative h-64 w-64 sm:h-72 sm:w-72 overflow-hidden rounded-3xl border-2 border-emerald-500/40 bg-slate-950 shadow-2xl">
                  <Image
                    src="/pratik-vaibhav.png"
                    alt="Pratik Vaibhav - Senior Product Security Engineer"
                    width={400}
                    height={400}
                    priority
                    className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-105"
                  />
                  {/* Subtle Scanline Overlay */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                </div>

                {/* Live Status Badge */}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-full border border-emerald-500/60 bg-slate-950/90 px-3.5 py-1 text-[11px] font-mono font-bold text-emerald-400 shadow-lg backdrop-blur flex items-center gap-1.5 whitespace-nowrap">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>Senior PSIRT &bull; Bangalore, IN</span>
                </div>
              </div>

              {/* Quick Profile Meta */}
              <div className="w-full space-y-3 pt-2">
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                  <span className="rounded-full border border-emerald-500/30 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-300 font-mono">
                    Guidewire Software
                  </span>
                  <span className="rounded-full border border-cyan-500/30 bg-cyan-50 dark:bg-cyan-950/60 px-3 py-1 text-xs font-bold text-cyan-700 dark:text-cyan-300 font-mono">
                    Ex-Deloitte Top 1%
                  </span>
                </div>

                {/* Quick Social & Action Links */}
                <div className="flex items-center justify-center lg:justify-start gap-2 pt-1">
                  <a
                    href={siteConfig.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleAction("github")}
                    className="rounded-xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 p-2.5 text-slate-800 dark:text-slate-200 hover:border-emerald-500 hover:text-emerald-400 transition-all shadow-xs"
                    title="GitHub Profile"
                  >
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                  </a>

                  <a
                    href={siteConfig.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleAction("linkedin")}
                    className="rounded-xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 p-2.5 text-slate-800 dark:text-slate-200 hover:border-cyan-500 hover:text-cyan-400 transition-all shadow-xs"
                    title="LinkedIn Profile"
                  >
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>

                  <a
                    href={`mailto:${siteConfig.email}`}
                    onClick={() => handleAction("email")}
                    className="rounded-xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 p-2.5 text-slate-800 dark:text-slate-200 hover:border-amber-500 hover:text-amber-400 transition-all shadow-xs"
                    title="Direct Email"
                  >
                    <Mail className="h-4 w-4" />
                  </a>

                  <a
                    href={resumePath}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleAction("resume")}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-500/50 bg-emerald-500/10 px-3 py-2 text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400 hover:bg-emerald-500/20 transition-all"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Resume</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Pitch & High-Impact Metric Cards */}
            <div className="space-y-6 text-left">
              <div className="space-y-4">
                {/* Role Pill */}
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/15 px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-[0.18em] text-emerald-800 dark:text-emerald-300 shadow-sm backdrop-blur">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="truncate">Senior Product Security Engineer (PSIRT)</span>
                </div>

                {/* Main Heading */}
                <h1 className="text-[clamp(2.2rem,5vw,3.8rem)] font-black leading-[1.02] tracking-[-0.04em] text-slate-950 dark:text-white">
                  I build secure systems and prove where they break.
                </h1>

                {/* High-Readability Bio */}
                <p className="max-w-[660px] text-base font-normal leading-relaxed text-slate-700 dark:text-slate-200 md:text-lg">
                  Senior Product Security Engineer in the Product Security Incident Response Team (PSIRT) at <strong className="font-bold text-slate-950 dark:text-white">Guidewire Software</strong>, and former Lead Solution Advisor at <strong className="font-bold text-slate-950 dark:text-white">Deloitte</strong>. Focused on incident response, TruffleHog secret governance, multi-tool AST correlation, and autonomous AI vulnerability agents.
                </p>
              </div>

              {/* 4 Quantifiable Impact Metric Bento Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 p-3.5 shadow-sm">
                  <p className="text-[11px] font-mono font-semibold text-slate-500 dark:text-slate-400">PSIRT Incidents</p>
                  <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">100+</p>
                  <p className="text-[10px] font-mono text-slate-600 dark:text-slate-300 mt-0.5">33% MTTR Drop</p>
                </div>

                <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 p-3.5 shadow-sm">
                  <p className="text-[11px] font-mono font-semibold text-slate-500 dark:text-slate-400">Secret Invalidation</p>
                  <p className="text-xl font-black text-cyan-600 dark:text-cyan-400 mt-1">70d ➔ 38d</p>
                  <p className="text-[10px] font-mono text-slate-600 dark:text-slate-300 mt-0.5">TruffleHog SLA</p>
                </div>

                <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 p-3.5 shadow-sm">
                  <p className="text-[11px] font-mono font-semibold text-slate-500 dark:text-slate-400">False Positives</p>
                  <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">30% Cut</p>
                  <p className="text-[10px] font-mono text-slate-600 dark:text-slate-300 mt-0.5">Near-Zero Noise</p>
                </div>

                <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 p-3.5 shadow-sm">
                  <p className="text-[11px] font-mono font-semibold text-slate-500 dark:text-slate-400">Performance Band</p>
                  <p className="text-2xl font-black text-purple-600 dark:text-purple-400 mt-1">Top 1%</p>
                  <p className="text-[10px] font-mono text-slate-600 dark:text-slate-300 mt-0.5">Deloitte Advisory</p>
                </div>
              </div>

              {/* Quick Jump Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="#experience"
                  onClick={() => playSound("click")}
                  className="rounded-2xl bg-slate-950 text-white dark:bg-white dark:text-slate-950 px-5 py-2.5 text-xs font-bold uppercase tracking-wider shadow-md hover:opacity-90 transition-all cursor-pointer"
                >
                  View Experience Journey
                </a>

                <a
                  href="#skills"
                  onClick={() => playSound("click")}
                  className="rounded-2xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white shadow-xs hover:border-cyan-500 transition-all cursor-pointer"
                >
                  Explore Core Skills
                </a>

                <a
                  href="#interactive-console"
                  onClick={() => playSound("click")}
                  className="inline-flex items-center gap-2 rounded-2xl border border-cyan-500/40 bg-cyan-500/10 px-4 py-2.5 text-xs font-mono font-bold text-cyan-800 dark:text-cyan-300 hover:bg-cyan-500/20 transition-all cursor-pointer"
                >
                  <TerminalIcon className="h-3.5 w-3.5" />
                  <span>Launch Live Security Console</span>
                </a>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
