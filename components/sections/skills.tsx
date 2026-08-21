"use client";

import * as React from "react";
import { Search, Shield, Terminal, Cloud, Cpu, Sparkles, CheckCircle2, Lock, Filter, Layers } from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { useSound } from "@/components/providers/sound-provider";
import { typography } from "@/styles/design-system";
import { cn } from "@/lib/utils";

const skillCategories = [
  {
    id: "appsec",
    title: "AppSec Program & Governance",
    icon: Shield,
    color: "from-cyan-500/20 to-blue-500/20 text-cyan-400",
    description: "Enterprise vulnerability management, threat modeling, and secure SDLC implementation.",
    items: [
      { name: "SAST", highlight: "Static Code Analysis" },
      { name: "DAST", highlight: "Dynamic Runtime Testing" },
      { name: "SCA", highlight: "Software Composition Analysis" },
      { name: "Secure SDLC", highlight: "Shift-Left Security" },
      { name: "Threat Modeling", highlight: "STRIDE & Attack Trees" },
      { name: "Architecture Reviews", highlight: "Zero-Trust Design" },
      { name: "Risk Acceptance", highlight: "Executive Governance" },
      { name: "Remediation Governance", highlight: "SLA Enforcement" },
      { name: "Vulnerability Triage", highlight: "Noise Filtering" },
      { name: "False-Positive Reduction", highlight: "30% Noise Cut" },
    ],
  },
  {
    id: "testing",
    title: "Offensive Testing & Validation",
    icon: Terminal,
    color: "from-emerald-500/20 to-teal-500/20 text-emerald-400",
    description: "Hands-on penetration testing, exploit verification, and logic flaw discovery.",
    items: [
      { name: "Web App Penetration Testing", highlight: "Deep Manual Pentest" },
      { name: "API Security Testing", highlight: "REST / GraphQL / OAuth" },
      { name: "Authentication Testing", highlight: "MFA / SSO / Token Flaws" },
      { name: "Authorization Testing", highlight: "BOLA / IDOR / Privilege Esc" },
      { name: "Business Logic Testing", highlight: "Workflow Bypass" },
      { name: "OWASP Top 10", highlight: "Comprehensive Coverage" },
      { name: "Exploit Reproduction", highlight: "PoC Development" },
      { name: "Evidence Validation", highlight: "Audit-Ready Logs" },
      { name: "Security Reporting", highlight: "Executive & Tech Briefs" },
    ],
  },
  {
    id: "tools",
    title: "Security Tooling Arsenal",
    icon: Lock,
    color: "from-purple-500/20 to-pink-500/20 text-purple-400",
    description: "Industry-standard scanners, proxies, and vulnerability analysis suites.",
    items: [
      { name: "Burp Suite Pro", highlight: "Advanced Extensions & Macro" },
      { name: "Fortify SSC / SCA", highlight: "Enterprise Static Rulepacks" },
      { name: "WebInspect", highlight: "Automated DAST Fuzzing" },
      { name: "Checkmarx", highlight: "CxSAST Code Scans" },
      { name: "Veracode", highlight: "Cloud AppSec Platform" },
      { name: "Snyk", highlight: "Container & Package SCA" },
      { name: "Prisma Cloud", highlight: "Cloud Workload Security" },
      { name: "Nessus", highlight: "Infrastructure Scanning" },
      { name: "CycloneDX SBOM", highlight: "Supply Chain Compliance" },
      { name: "GitHub Dependabot", highlight: "Automated Pull Alerts" },
      { name: "npm audit", highlight: "Ecosystem Package Audit" },
    ],
  },
  {
    id: "cloud",
    title: "Cloud & DevSecOps Infrastructure",
    icon: Cloud,
    color: "from-blue-500/20 to-indigo-500/20 text-blue-400",
    description: "Cloud-native platform hardening, container security, and CI/CD pipelines.",
    items: [
      { name: "OpenShift", highlight: "Enterprise Kubernetes" },
      { name: "Docker", highlight: "Container Hardening" },
      { name: "Linux / POSIX", highlight: "Kernel & OS Security" },
      { name: "CI/CD Pipelines", highlight: "Automated Gate Checks" },
      { name: "GitHub Actions", highlight: "Security Workflows" },
      { name: "Vercel Edge", highlight: "Edge Middleware Security" },
      { name: "Supabase", highlight: "PostgreSQL RLS Policies" },
      { name: "Upstash Redis", highlight: "Sliding Window Rate Limit" },
      { name: "Security Headers & CSP", highlight: "Nonce-based Strict CSP" },
      { name: "Rate Limiting", highlight: "DDoS & Abuse Prevention" },
    ],
  },
  {
    id: "engineering",
    title: "Software Engineering & Languages",
    icon: Cpu,
    color: "from-amber-500/20 to-orange-500/20 text-amber-400",
    description: "Full-stack development capabilities for parser engineering and automation.",
    items: [
      { name: "Python", highlight: "Exploit Scripts & Scanners" },
      { name: "Java", highlight: "Enterprise Backend Security" },
      { name: "TypeScript", highlight: "Type-safe Architecture" },
      { name: "JavaScript", highlight: "Node.js & Runtime Internals" },
      { name: "Next.js 15", highlight: "App Router & Server Actions" },
      { name: "React 19", highlight: "Modern Frontend Architecture" },
      { name: "REST APIs", highlight: "Secure Endpoint Design" },
      { name: "SQL", highlight: "Injection Defense & Tuning" },
      { name: "Shell Scripting", highlight: "Bash / Zsh Automation" },
      { name: "Git", highlight: "Security Branching & Audit" },
    ],
  },
  {
    id: "automation",
    title: "AI Security & Workflow Automation",
    icon: Sparkles,
    color: "from-rose-500/20 to-amber-500/20 text-rose-400",
    description: "Agentic testing workflows, finding normalization, and custom AST parsers.",
    items: [
      { name: "DevSecOps Automation", highlight: "Zero-friction Pipelines" },
      { name: "AI-assisted Testing", highlight: "Burp & LLM Augmentation" },
      { name: "Agentic Workflows", highlight: "Autonomous Triage" },
      { name: "Parser Development", highlight: "Custom Scan Parsers" },
      { name: "Scanner Orchestration", highlight: "Multi-tool Pipeline" },
      { name: "Finding Normalization", highlight: "Unified SARIF Format" },
      { name: "Evidence Pipelines", highlight: "Audit Trail Automation" },
    ],
  },
];

export function SkillsSection() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [activeCategory, setActiveCategory] = React.useState<string>("all");
  const { playSound } = useSound();

  const handleCategoryChange = (catId: string) => {
    playSound("click");
    setActiveCategory(catId);
  };

  const filteredCategories = React.useMemo(() => {
    return skillCategories
      .map((cat) => {
        if (activeCategory !== "all" && cat.id !== activeCategory) {
          return null;
        }

        if (!searchQuery.trim()) {
          return cat;
        }

        const q = searchQuery.toLowerCase();
        const matchesCategory =
          cat.title.toLowerCase().includes(q) ||
          cat.description.toLowerCase().includes(q);

        const matchingItems = cat.items.filter(
          (item) =>
            item.name.toLowerCase().includes(q) ||
            item.highlight.toLowerCase().includes(q)
        );

        if (matchesCategory || matchingItems.length > 0) {
          return {
            ...cat,
            items: matchingItems.length > 0 ? matchingItems : cat.items,
          };
        }

        return null;
      })
      .filter((cat): cat is (typeof skillCategories)[0] => Boolean(cat));
  }, [activeCategory, searchQuery]);

  const totalSkillsCount = React.useMemo(() => {
    return skillCategories.reduce((acc, cat) => acc + cat.items.length, 0);
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-400">
            <Layers className="h-3.5 w-3.5" />
            Security Arsenal &bull; {totalSkillsCount}+ Capabilities
          </div>
          <h2 className={typography.sectionTitle}>
            Technical Expertise &amp; Tooling
          </h2>
          <p className={typography.sectionDescription}>
            Comprehensive coverage spanning enterprise AppSec governance, deep offensive penetration testing, DevSecOps automation, and security tooling orchestration.
          </p>
        </div>

        {/* Live Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search skills (e.g. Burp, DAST, Python)..."
            className="w-full rounded-2xl border border-slate-200 bg-white/90 pl-10 pr-4 py-2 text-xs text-slate-900 placeholder-slate-400 shadow-sm focus:border-cyan-500 focus:outline-none dark:border-slate-800 dark:bg-slate-900/80 dark:text-white dark:placeholder-slate-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-white"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-slate-800/80 pb-4">
        <button
          onClick={() => handleCategoryChange("all")}
          className={cn(
            "rounded-xl px-3.5 py-2 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer",
            activeCategory === "all"
              ? "bg-slate-950 text-white dark:bg-white dark:text-slate-950 shadow-md font-bold"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800/50 dark:text-slate-400 dark:hover:text-white"
          )}
        >
          All Categories ({totalSkillsCount})
        </button>

        {skillCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleCategoryChange(cat.id)}
            className={cn(
              "rounded-xl px-3.5 py-2 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer",
              activeCategory === cat.id
                ? "bg-cyan-600 text-white dark:bg-cyan-500 dark:text-slate-950 shadow-md font-bold"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800/50 dark:text-slate-400 dark:hover:text-white"
            )}
          >
            {cat.title.split(" ")[0]}
          </button>
        ))}
      </div>

      {/* Grid of Bento Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCategories.map((cat) => {
          const Icon = cat.icon;
          return (
            <SpotlightCard
              key={cat.id}
              className="flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="rounded-xl border border-slate-200/80 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 p-2 text-cyan-600 dark:text-cyan-400">
                      <Icon className="h-4 w-4" />
                    </div>
                    <h3 className="text-base font-black tracking-tight text-slate-950 dark:text-white">
                      {cat.title}
                    </h3>
                  </div>
                  <span className="rounded-full bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[10px] font-mono font-bold text-slate-500">
                    {cat.items.length}
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {cat.description}
                </p>
              </div>

              {/* Items Badge Cloud */}
              <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-200/60 dark:border-slate-800/60">
                {cat.items.map((item) => (
                  <div
                    key={item.name}
                    title={item.highlight}
                    className="group/item relative rounded-xl border border-slate-200/80 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm transition-all hover:border-cyan-400 hover:bg-cyan-50 dark:border-slate-700/80 dark:bg-slate-950/80 dark:text-slate-200 dark:hover:border-cyan-500/50 dark:hover:bg-cyan-950/30 cursor-default"
                  >
                    <span>{item.name}</span>
                  </div>
                ))}
              </div>
            </SpotlightCard>
          );
        })}
      </div>
    </div>
  );
}
