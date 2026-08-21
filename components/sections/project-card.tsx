"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowDownToLine, ArrowUpRight, GitFork, Star, Eye, ShieldAlert } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ReadmeModal } from "@/components/interactive/readme-modal";
import { useSound } from "@/components/providers/sound-provider";
import { cn } from "@/lib/utils";
import { typography } from "@/styles/design-system";
import type { Project } from "@/types/project";

type ProjectCardProps = {
  project: Project;
  compact?: boolean;
  featured?: boolean;
};

export function ProjectCard({ project, compact = false, featured = false }: ProjectCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { playSound } = useSound();

  const visibleTags = project.tags
    .filter((tag) => tag.toLowerCase() !== project.language?.toLowerCase())
    .slice(0, featured ? 5 : compact ? 3 : 4);
  const summary = project.excerpt?.trim() || project.title;
  const shouldRenderSummary = summary.toLowerCase() !== project.title.trim().toLowerCase();
  const updatedLabel = project.lastUpdated
    ? new Intl.DateTimeFormat("en", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }).format(new Date(project.lastUpdated))
    : null;

  return (
    <>
      <article
        className={cn(
          "group relative flex h-full min-w-0 flex-col overflow-hidden rounded-[26px] border border-slate-200/80 bg-white/85 dark:border-white/10 dark:bg-slate-900/70 p-5 md:p-6 shadow-[0_18px_46px_rgba(15,23,42,0.06)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.4)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:hover:border-cyan-500/30",
          featured ? "min-h-[340px]" : "min-h-[300px]"
        )}
      >
        {/* Accent Bar & Ambient Glow */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-400 via-emerald-400 to-amber-400 opacity-80" />
        <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-cyan-500/10 blur-3xl transition duration-300 group-hover:bg-cyan-500/20" />

        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              {project.language ? (
                <span className="rounded-full border border-slate-200 dark:border-slate-700 bg-slate-950 px-2.5 py-0.5 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white">
                  {project.language}
                </span>
              ) : null}
              <span className="rounded-full border border-emerald-500/30 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-0.5 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-400">
                {project.status}
              </span>
            </div>

            <button
              onClick={() => {
                playSound("click");
                setIsModalOpen(true);
              }}
              title="Quick Architecture Preview"
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors cursor-pointer"
            >
              <Eye className="h-3.5 w-3.5" />
              <span>Details</span>
            </button>
          </div>

          <div className="space-y-2">
            <h3 className={cn("break-words text-slate-950 dark:text-white", typography.cardTitle, featured && "text-2xl md:text-3xl")}>
              {project.title}
            </h3>
            {shouldRenderSummary ? (
              <div className="space-y-1">
                <p className="text-[0.68rem] font-mono font-bold uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-400">
                  Target &bull; Purpose
                </p>
                <p
                  className={cn(
                    "text-xs leading-relaxed text-slate-600 dark:text-slate-300",
                    featured ? "line-clamp-4 max-w-3xl" : "line-clamp-3"
                  )}
                >
                  {summary}
                </p>
              </div>
            ) : null}
          </div>
        </div>

        {/* GitHub Metrics */}
        <div className="mt-4 flex flex-wrap gap-2 text-xs font-medium font-mono text-slate-600 dark:text-slate-400">
          <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 px-2.5 py-0.5">
            <Star className="h-3.5 w-3.5 text-amber-500" />
            {project.stars ?? 0} stars
          </span>
          <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 px-2.5 py-0.5">
            <GitFork className="h-3.5 w-3.5 text-cyan-500" />
            {project.forks ?? 0} forks
          </span>
          {updatedLabel ? (
            <span className="inline-flex items-center rounded-full border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 px-2.5 py-0.5">
              {updatedLabel}
            </span>
          ) : null}
        </div>

        {/* Tags */}
        {visibleTags.length ? (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {visibleTags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-slate-200/80 bg-slate-50 dark:border-slate-800 dark:bg-slate-950 px-2.5 py-0.5 text-[11px] font-medium text-slate-600 dark:text-slate-400"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}

        {/* Action Links */}
        <div className="mt-auto grid grid-cols-2 gap-2 pt-5">
          <Button
            variant="secondary"
            size="sm"
            className="w-full text-xs cursor-pointer"
            onClick={() => {
              playSound("click");
              setIsModalOpen(true);
            }}
          >
            <Eye className="h-3.5 w-3.5" />
            Overview
          </Button>

          <Button asChild size="sm" className="w-full text-xs bg-slate-950 text-white dark:bg-emerald-500 dark:text-slate-950 dark:hover:bg-emerald-400 font-bold">
            <Link href={project.github} target="_blank" rel="noopener noreferrer">
              Repo
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </article>

      <ReadmeModal project={isModalOpen ? project : null} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
