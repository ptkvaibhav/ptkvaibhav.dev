"use client";

import { useState } from "react";
import Image from "next/image";
import { Briefcase, Calendar, CheckCircle2, TrendingUp, Users, ShieldCheck, Award, ChevronRight, Building2, Sparkles } from "lucide-react";

import { SpotlightCard } from "@/components/ui/spotlight-card";
import { professionalExperience } from "@/lib/content";
import { useSound } from "@/components/providers/sound-provider";
import { typography } from "@/styles/design-system";
import { cn } from "@/lib/utils";

export function ExperienceSection() {
  const [selectedRoleIdx, setSelectedRoleIdx] = useState(0);
  const { playSound } = useSound();

  const activeRole = professionalExperience.roles[selectedRoleIdx] || professionalExperience.roles[0];
  const isGuidewire = activeRole.company.toLowerCase().includes("guidewire");

  return (
    <div className="space-y-8">
      {/* Top Banner / Dynamic Company & Role Overview */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="flex items-center gap-4">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-3 shadow-md">
            <Image
              src={activeRole.logo}
              alt={`${activeRole.brand} logo`}
              width={140}
              height={36}
              className="h-6 w-auto opacity-95 dark:invert"
            />
          </div>
          <div>
            <h3 className="text-xl font-black tracking-tight text-slate-950 dark:text-white">
              {activeRole.company}
            </h3>
            <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 font-mono">
              {activeRole.location} &bull; {activeRole.period}
            </p>
          </div>
        </div>

        {/* Dynamic Domain Badge based on whether Guidewire (PSIRT) or Deloitte (AppSec Leadership) */}
        {isGuidewire ? (
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-50 dark:bg-emerald-950/70 px-4 py-1.5 text-xs font-bold text-emerald-800 dark:text-emerald-300 shadow-sm">
            <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            <span>Product Security Incident Response &bull; PSIRT</span>
          </div>
        ) : (
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/40 bg-cyan-50 dark:bg-cyan-950/70 px-4 py-1.5 text-xs font-bold text-cyan-800 dark:text-cyan-300 shadow-sm">
            <Award className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
            <span>Application Security Advisory &bull; Top 1% Rating</span>
          </div>
        )}
      </div>

      {/* Interactive Career Stepper & Details */}
      <div className="grid gap-8 lg:grid-cols-[330px_minmax(0,1fr)] items-start">
        {/* Role Selector List */}
        <div className="space-y-2.5">
          <p className="text-xs font-mono font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-3">
            Career Progression (2019 — Present)
          </p>
          {professionalExperience.roles.map((role, idx) => {
            const isSelected = idx === selectedRoleIdx;
            const isCurrent = idx === 0;
            const isRoleGuidewire = role.company.toLowerCase().includes("guidewire");

            return (
              <button
                key={`${role.title}-${role.period}`}
                onClick={() => {
                  playSound("click");
                  setSelectedRoleIdx(idx);
                }}
                className={cn(
                  "w-full rounded-2xl border p-4 text-left transition-all duration-200 flex items-center justify-between cursor-pointer",
                  isSelected
                    ? "border-cyan-500 bg-cyan-500/10 dark:border-cyan-400/90 dark:bg-cyan-950/50 shadow-md ring-1 ring-cyan-500/30"
                    : "border-slate-200 dark:border-slate-800/90 bg-white dark:bg-slate-900/90 hover:bg-slate-50 dark:hover:bg-slate-850 hover:border-slate-300 dark:hover:border-slate-700"
                )}
              >
                <div className="space-y-1.5 pr-2">
                  <div className="flex items-center gap-2">
                    <span className={cn(
                      "text-xs font-black uppercase tracking-wider font-mono",
                      isRoleGuidewire ? "text-emerald-600 dark:text-emerald-400" : "text-cyan-600 dark:text-cyan-400"
                    )}>
                      {role.brand}
                    </span>
                    {isCurrent && (
                      <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[9px] font-bold text-emerald-700 dark:text-emerald-300 font-mono">
                        CURRENT
                      </span>
                    )}
                  </div>
                  <p className={cn(
                    "text-sm font-bold leading-snug",
                    isSelected ? "text-slate-950 dark:text-white font-extrabold" : "text-slate-800 dark:text-slate-200"
                  )}>
                    {role.title}
                  </p>
                  <p className="text-[11px] font-mono text-slate-600 dark:text-slate-400 flex items-center gap-1">
                    <Calendar className="h-3 w-3 text-slate-500" />
                    {role.period}
                  </p>
                </div>
                <ChevronRight className={cn(
                  "h-4 w-4 shrink-0 transition-transform",
                  isSelected ? "text-cyan-600 dark:text-cyan-400 translate-x-1" : "text-slate-400"
                )} />
              </button>
            );
          })}
        </div>

        {/* Selected Role Deep Dive */}
        <SpotlightCard className="space-y-6">
          <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-200 dark:border-slate-800/80 pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className={cn(
                  "rounded-full border px-3 py-0.5 text-xs font-bold font-mono",
                  isGuidewire
                    ? "border-emerald-500/40 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300"
                    : "border-cyan-500/40 bg-cyan-50 dark:bg-cyan-950/60 text-cyan-800 dark:text-cyan-300"
                )}>
                  {activeRole.company}
                </span>
              </div>
              <h3 className="text-2xl font-black tracking-tight text-slate-950 dark:text-white">
                {activeRole.title}
              </h3>
            </div>
            <span className="rounded-full border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 px-3.5 py-1 text-xs font-mono font-bold text-slate-800 dark:text-slate-100 shadow-xs">
              {activeRole.period}
            </span>
          </div>

          {/* Key Metrics Chips */}
          {activeRole.metrics && activeRole.metrics.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {activeRole.metrics.map((metric) => (
                <div
                  key={metric}
                  className="flex items-center gap-1.5 rounded-xl border border-emerald-500/40 bg-emerald-50 dark:bg-emerald-950/60 px-3.5 py-1.5 text-xs font-bold text-emerald-800 dark:text-emerald-300 font-mono shadow-xs"
                >
                  <TrendingUp className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>{metric}</span>
                </div>
              ))}
            </div>
          )}

          {/* Responsibilities & Focus Points */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              Core Security Mandates &amp; Impact
            </h4>
            <div className="grid gap-2.5 sm:grid-cols-2">
              {activeRole.focus.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-2.5 rounded-xl border border-slate-200/90 dark:border-slate-800/90 bg-slate-50/90 dark:bg-slate-950/90 p-3.5 text-xs leading-relaxed text-slate-800 dark:text-slate-100 font-sans shadow-xs"
                >
                  <CheckCircle2 className="h-4 w-4 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </SpotlightCard>
      </div>
    </div>
  );
}

