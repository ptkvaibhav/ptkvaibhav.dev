"use client";

import * as React from "react";
import { Terminal as TerminalIcon, Cpu, Activity, Sparkles, ShieldAlert, Sliders } from "lucide-react";
import { SecurityTerminal } from "@/components/interactive/terminal";
import { TriageSimulator } from "@/components/interactive/triage-simulator";
import { useSound } from "@/components/providers/sound-provider";
import { typography } from "@/styles/design-system";
import { cn } from "@/lib/utils";

export function InteractiveLabSection() {
  const [activeTab, setActiveTab] = React.useState<"terminal" | "simulator">("terminal");
  const { playSound } = useSound();

  return (
    <div className="space-y-8" id="interactive-console">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-400">
            <TerminalIcon className="h-3.5 w-3.5" />
            Interactive Security Console &bull; Live Telemetry
          </div>
          <h2 className={typography.sectionTitle}>
            Live Security Lab &amp; Simulations
          </h2>
          <p className={typography.sectionDescription}>
            Test interactive security commands, execute real-time simulated AST scans, and benchmark false-positive noise reduction models.
          </p>
        </div>

        {/* Lab Mode Switcher Tabs */}
        <div className="flex items-center gap-2 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 p-1.5 shadow-sm">
          <button
            onClick={() => {
              playSound("click");
              setActiveTab("terminal");
            }}
            className={cn(
              "flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-mono font-bold transition-all cursor-pointer",
              activeTab === "terminal"
                ? "bg-slate-950 text-white dark:bg-cyan-500 dark:text-slate-950 shadow-md"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            )}
          >
            <TerminalIcon className="h-3.5 w-3.5" />
            <span>CLI Terminal</span>
          </button>

          <button
            onClick={() => {
              playSound("click");
              setActiveTab("simulator");
            }}
            className={cn(
              "flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-mono font-bold transition-all cursor-pointer",
              activeTab === "simulator"
                ? "bg-slate-950 text-white dark:bg-cyan-500 dark:text-slate-950 shadow-md"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            )}
          >
            <Sliders className="h-3.5 w-3.5" />
            <span>Triage Benchmark</span>
          </button>
        </div>
      </div>

      {/* Interactive Display Card */}
      <div className="transition-all duration-300">
        {activeTab === "terminal" ? (
          <div className="space-y-4">
            <SecurityTerminal />
          </div>
        ) : (
          <div className="space-y-4">
            <TriageSimulator />
          </div>
        )}
      </div>
    </div>
  );
}

