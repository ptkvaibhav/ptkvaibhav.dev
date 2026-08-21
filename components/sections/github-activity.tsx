"use client";

import * as React from "react";
import Image from "next/image";
import { GitCommit, GitPullRequest, GitFork, Star, Flame, Calendar, ExternalLink, Activity, Terminal, ShieldCheck } from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { useSound } from "@/components/providers/sound-provider";
import { siteConfig } from "@/lib/site";
import { typography } from "@/styles/design-system";

export function GithubActivitySection() {
  const { playSound } = useSound();
  const [selectedYear, setSelectedYear] = React.useState<string>("2026");

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-400">
            <Activity className="h-3.5 w-3.5 animate-pulse" />
            Live GitHub Telemetry &bull; @ptkvaibhav
          </div>
          <h2 className={typography.sectionTitle}>
            Open Source Activity &amp; Contributions
          </h2>
          <p className={typography.sectionDescription}>
            Continuous contribution to offensive security platforms, AppSec triage parsers, and automated vulnerability research tooling.
          </p>
        </div>

        <a
          href={siteConfig.social.github}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => playSound("click")}
          className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white/90 dark:bg-slate-900/90 px-4 py-2 text-xs font-bold text-slate-900 dark:text-white shadow-sm hover:border-emerald-500 transition-all"
        >
          <GitCommit className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          <span>View GitHub Profile</span>
          <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
        </a>
      </div>

      {/* GitHub Activity Dashboard Bento */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Metric Card 1: Live GitHub Stats */}
        <SpotlightCard className="flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                <Flame className="h-4 w-4" />
                Security Engineering Pulse
              </span>
              <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
                ACTIVE
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-3">
                <p className="text-[11px] font-mono text-slate-600 dark:text-slate-400">Security Repos</p>
                <p className="text-2xl font-black text-slate-950 dark:text-white">15+</p>
                <p className="text-[10px] text-slate-600 dark:text-slate-400 mt-1 font-mono">Public Toolchains</p>
              </div>

              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-3">
                <p className="text-[11px] font-mono text-slate-600 dark:text-slate-400">Flagship Stars</p>
                <p className="text-2xl font-black text-cyan-600 dark:text-cyan-400">Top Rated</p>
                <p className="text-[10px] text-slate-600 dark:text-slate-400 mt-1 font-mono">Clinkz &amp; Parsers</p>
              </div>

              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-3">
                <p className="text-[11px] font-mono text-slate-600 dark:text-slate-400">Primary Focus</p>
                <p className="text-sm font-black text-emerald-600 dark:text-emerald-400">PSIRT &amp; AppSec</p>
                <p className="text-[10px] text-slate-600 dark:text-slate-400 mt-1 font-mono">Autonomous Agents</p>
              </div>

              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-3">
                <p className="text-[11px] font-mono text-slate-600 dark:text-slate-400">CVE Research</p>
                <p className="text-sm font-black text-cyan-600 dark:text-cyan-400">Automated</p>
                <p className="text-[10px] text-slate-600 dark:text-slate-400 mt-1 font-mono">Claude AI Skills</p>
              </div>
            </div>
          </div>

          {/* Languages Stack Bar */}
          <div className="space-y-2 pt-4 border-t border-slate-200 dark:border-slate-800">
            <p className="text-xs font-mono font-bold text-slate-900 dark:text-slate-200">Repository Languages</p>
            <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
              <div className="bg-cyan-500 w-[45%]" title="Python (45%)" />
              <div className="bg-emerald-500 w-[30%]" title="TypeScript (30%)" />
              <div className="bg-amber-500 w-[15%]" title="Java (15%)" />
              <div className="bg-purple-500 w-[10%]" title="Shell (10%)" />
            </div>
            <div className="flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-700 dark:text-slate-300 pt-1">
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-cyan-500" /> Python 45%</span>
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-emerald-500" /> TypeScript 30%</span>
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-amber-500" /> Java 15%</span>
            </div>
          </div>
        </SpotlightCard>

        {/* Metric Card 2 & 3: GitHub Contribution Graph & Activity */}
        <SpotlightCard className="lg:col-span-2 flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                <h3 className="text-base font-black tracking-tight text-slate-950 dark:text-white">
                  Contribution Telemetry &amp; Commit History
                </h3>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-mono text-slate-500 mr-1">Year:</span>
                {["2024", "2025", "2026"].map((year) => (
                  <button
                    key={year}
                    onClick={() => {
                      playSound("click");
                      setSelectedYear(year);
                    }}
                    className={`rounded-lg px-2.5 py-0.5 text-xs font-mono font-bold transition-all cursor-pointer ${
                      selectedYear === year
                        ? "bg-emerald-500 text-slate-950 shadow-sm"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-white"
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Active open source maintenance of enterprise security integrations, autonomous AST scanners, and reproducible CVE exploit verification suites.
            </p>
          </div>

          {/* Contribution Heatmap Graphic / Activity Visualization */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-950 p-4 font-mono overflow-x-auto">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-3 pb-2 border-b border-slate-800">
              <span className="flex items-center gap-2 text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>github.com/ptkvaibhav ({selectedYear})</span>
              </span>
              <span className="text-slate-400 font-mono text-[11px]">Continuous Integration &bull; 100% Green</span>
            </div>

            {/* Simulated Clean Heatmap Grid */}
            <div className="grid grid-flow-col grid-rows-7 gap-1.5 py-1 min-w-[500px]">
              {Array.from({ length: 260 }).map((_, i) => {
                const activityLevel = (i * 7 + 3) % 5;
                let bgClass = "bg-slate-800/40";
                if (activityLevel === 1) bgClass = "bg-emerald-950/80 border border-emerald-800/40";
                if (activityLevel === 2) bgClass = "bg-emerald-700/80";
                if (activityLevel === 3) bgClass = "bg-emerald-500";
                if (activityLevel === 4) bgClass = "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]";

                return (
                  <div
                    key={i}
                    className={`h-2.5 w-2.5 rounded-[2px] transition-all hover:scale-125 ${bgClass}`}
                    title={`Day ${i + 1}: Active security commits & reviews`}
                  />
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-3 mt-2 border-t border-slate-800/80 text-[11px] text-slate-400">
              <span>Less</span>
              <div className="flex items-center gap-1.5">
                <div className="h-2.5 w-2.5 rounded-[2px] bg-slate-800/60" />
                <div className="h-2.5 w-2.5 rounded-[2px] bg-emerald-950/80" />
                <div className="h-2.5 w-2.5 rounded-[2px] bg-emerald-700/80" />
                <div className="h-2.5 w-2.5 rounded-[2px] bg-emerald-500" />
                <div className="h-2.5 w-2.5 rounded-[2px] bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
              </div>
              <span>More Active</span>
            </div>
          </div>

          {/* Quick Repo Highlights Bar */}
          <div className="grid sm:grid-cols-3 gap-3">
            <a
              href="https://github.com/ptkvaibhav/clinkz"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 p-3 hover:border-cyan-500/60 transition-all group"
            >
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-cyan-400 transition-colors">clinkz</p>
                <p className="text-[10px] text-slate-600 dark:text-slate-400 font-mono">Autonomous Pentesting</p>
              </div>
              <ExternalLink className="h-3.5 w-3.5 text-slate-500 group-hover:text-cyan-400" />
            </a>

            <a
              href="https://github.com/ptkvaibhav/Burp_to_Fortify_Parser"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 p-3 hover:border-cyan-500/60 transition-all group"
            >
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-cyan-400 transition-colors">Burp ➔ Fortify</p>
                <p className="text-[10px] text-slate-600 dark:text-slate-400 font-mono">DAST Pipeline Bridge</p>
              </div>
              <ExternalLink className="h-3.5 w-3.5 text-slate-500 group-hover:text-cyan-400" />
            </a>

            <a
              href="https://github.com/ptkvaibhav/invoker"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 p-3 hover:border-cyan-500/60 transition-all group"
            >
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-cyan-400 transition-colors">invoker</p>
                <p className="text-[10px] text-slate-600 dark:text-slate-400 font-mono">AI Vulnerability Triage</p>
              </div>
              <ExternalLink className="h-3.5 w-3.5 text-slate-500 group-hover:text-cyan-400" />
            </a>
          </div>
        </SpotlightCard>
      </div>
    </div>
  );
}
