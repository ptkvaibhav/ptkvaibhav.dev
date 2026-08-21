"use client";

import { Award, Mic, Sparkles, ShieldCheck, Trophy, Star } from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { typography } from "@/styles/design-system";

export function AwardsSection() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-50 dark:bg-amber-950/60 px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-[0.2em] text-amber-800 dark:text-amber-300">
          <Trophy className="h-3.5 w-3.5" />
          Honors, Recognition &amp; Speaking
        </div>
        <h2 className={typography.sectionTitle}>
          Awards &amp; Conference Presentations
        </h2>
        <p className={typography.sectionDescription}>
          Recognition tied to measurable cybersecurity leadership, enterprise impact, and speaking at premier security conferences.
        </p>
      </div>

      {/* Grid of Honor Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* NULLCON 2025 Speaker Spotlight */}
        <SpotlightCard className="relative overflow-hidden md:col-span-2 lg:col-span-1 border-rose-500/30 dark:border-rose-500/40">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-500/40 bg-rose-50 dark:bg-rose-950/70 px-3 py-1 text-xs font-bold text-rose-700 dark:text-rose-300">
                <Mic className="h-3.5 w-3.5 text-rose-600 dark:text-rose-400" />
                NULLCON 2025 Speaker
              </span>
              <span className="font-mono text-xs font-bold text-slate-500 dark:text-slate-400">Goa, India</span>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-black tracking-tight text-slate-950 dark:text-white">
                Smart Automation using Artificial Intelligence
              </h3>
              <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-200">
                Delivered technical presentation at NULLCON 2025 on utilizing modern AI agentic workflows to automate repetitive penetration testing tasks, vulnerability triage, and AST finding normalization.
              </p>
            </div>

            <div className="rounded-xl border border-rose-500/30 bg-rose-50/70 dark:bg-rose-950/40 p-3 text-xs text-rose-900 dark:text-rose-200 font-mono">
              &gt;&gt; Practical AI augmentation for offensive &amp; defensive AppSec teams
            </div>
          </div>
        </SpotlightCard>

        {/* Outstanding Performance Award */}
        <SpotlightCard className="border-amber-500/30 dark:border-amber-500/40">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/40 bg-amber-50 dark:bg-amber-950/70 px-3 py-1 text-xs font-bold text-amber-800 dark:text-amber-300">
                <Star className="h-3.5 w-3.5 fill-current text-amber-500" />
                Top 1% Performance Rating
              </span>
              <span className="font-mono text-xs font-bold text-slate-500 dark:text-slate-400">Deloitte</span>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-black tracking-tight text-slate-950 dark:text-white">
                Outstanding Performance Award
              </h3>
              <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-200">
                Awarded for excellence in delivering high-assurance cybersecurity programs for US government healthcare systems, establishing robust secure SDLC pipelines, and leading incident triage.
              </p>
            </div>

            <div className="rounded-xl border border-amber-500/30 bg-amber-50/70 dark:bg-amber-950/40 p-3 text-xs text-amber-900 dark:text-amber-200 font-mono">
              &gt;&gt; Ranked in the top percentile among advisory professionals
            </div>
          </div>
        </SpotlightCard>

        {/* Applause Awards */}
        <SpotlightCard className="border-cyan-500/30 dark:border-cyan-500/40">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/40 bg-cyan-50 dark:bg-cyan-950/70 px-3 py-1 text-xs font-bold text-cyan-800 dark:text-cyan-300">
                <Award className="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-400" />
                Delivery Impact
              </span>
              <span className="font-mono text-xs font-bold text-slate-500 dark:text-slate-400">Multiple</span>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-black tracking-tight text-slate-950 dark:text-white">
                Applause Awards
              </h3>
              <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-200">
                Recognized repeatedly for building scalable security automation scripts, mentoring 14+ team members, and cutting vulnerability false positive noise by 30%.
              </p>
            </div>

            <div className="rounded-xl border border-cyan-500/30 bg-cyan-50/70 dark:bg-cyan-950/40 p-3 text-xs text-cyan-900 dark:text-cyan-200 font-mono">
              &gt;&gt; Consistent stakeholder acclaim for zero-friction AppSec delivery
            </div>
          </div>
        </SpotlightCard>
      </div>
    </div>
  );
}
