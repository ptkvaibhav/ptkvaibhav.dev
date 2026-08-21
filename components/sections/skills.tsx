"use client";

import * as React from "react";
import {
  Search,
  Shield,
  Terminal,
  Cloud,
  Cpu,
  Sparkles,
  CheckCircle2,
  Lock,
  Filter,
  Layers,
  KeyRound,
  AlertTriangle,
  Zap,
  Check,
  Award
} from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { useSound } from "@/components/providers/sound-provider";
import { typography } from "@/styles/design-system";
import { cn } from "@/lib/utils";

export type CompetencyDomain = {
  id: string;
  title: string;
  badge: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  summary: string;
  practicalApplications: string[];
  toolsAndStandards: { name: string; tag: string }[];
  proficiencyLevel: "Production Lead" | "Core Competency" | "Advanced Mastery";
};

const competencyDomains: CompetencyDomain[] = [
  {
    id: "psirt",
    title: "Product Security Incident Response (PSIRT)",
    badge: "Current Focus & Specialization",
    icon: Shield,
    accentColor: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
    summary:
      "Direct ownership of enterprise security incident response lifecycles, exploit reachability validation, TruffleHog secret governance, and rapid cross-functional mitigation.",
    practicalApplications: [
      "Triaged and resolved 100+ production security incidents with a 33% reduction in MTTR.",
      "Spearheaded enterprise TruffleHog secret remediation, shrinking invalidation time from 70 to 38 days.",
      "Engineered autonomous Claude AI skills & custom CVE triage agents for new vulnerability intake.",
      "Conducted root-cause investigations, emergency patch governance, and executive post-mortems.",
    ],
    toolsAndStandards: [
      { name: "TruffleHog", tag: "Secret Governance" },
      { name: "CVE / NVD Analysis", tag: "Vulnerability Intel" },
      { name: "Incident Triage", tag: "33% Faster MTTR" },
      { name: "Claude AI Skills", tag: "Agentic Automation" },
      { name: "Emergency Patching", tag: "Risk Mitigation" },
    ],
    proficiencyLevel: "Production Lead",
  },
  {
    id: "appsec",
    title: "Application Security & DevSecOps Governance",
    badge: "Enterprise Leadership",
    icon: Lock,
    accentColor: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
    summary:
      "Designing and operating end-to-end Secure SDLC programs, multi-scanner correlation pipelines (SAST + DAST + SCA), and zero-friction CI/CD security gate enforcement.",
    practicalApplications: [
      "Correlated SAST, DAST, and SCA findings to reduce false positives from 30% to near-zero.",
      "Owned application security architecture & threat modeling across US government healthcare systems.",
      "Led, mentored, and upskilled a 14-member Application Security engineering team at Deloitte.",
      "Automated security quality gates across GitHub Actions, GitLab CI, and enterprise Jenkins pipelines.",
    ],
    toolsAndStandards: [
      { name: "Fortify SSC / SCA", tag: "Enterprise SAST" },
      { name: "Fortify WebInspect", tag: "Automated DAST" },
      { name: "Checkmarx & Snyk", tag: "Code & Package SCA" },
      { name: "STRIDE Modeling", tag: "Architecture Review" },
      { name: "CycloneDX SBOM", tag: "Supply Chain Security" },
    ],
    proficiencyLevel: "Production Lead",
  },
  {
    id: "offensive",
    title: "Offensive Security & Penetration Testing",
    badge: "Hands-on Verification",
    icon: Terminal,
    accentColor: "text-amber-400 border-amber-500/30 bg-amber-500/10",
    summary:
      "Deep manual penetration testing across modern web applications, microservice APIs, and identity protocols to uncover high-impact logic flaws beyond automated scanners.",
    practicalApplications: [
      "Discovered critical vulnerabilities (SQLi, IDOR, Auth Bypass, SSRF) in enterprise production applications.",
      "Evaluated complex business logic workflows to identify privilege escalation paths and state manipulation.",
      "Developed custom Burp Suite extensions to bridge DAST evidence directly into tracking platforms.",
      "Created reproducible exploit proofs-of-concept (PoCs) to validate actual attacker reachability.",
    ],
    toolsAndStandards: [
      { name: "Burp Suite Professional", tag: "Advanced Testing" },
      { name: "API Security Testing", tag: "REST, GraphQL, OAuth" },
      { name: "OWASP Top 10 / ASVS", tag: "Standard Compliance" },
      { name: "Authentication Flaws", tag: "MFA / SSO / JWT" },
      { name: "Custom Exploit PoCs", tag: "Evidence Validation" },
    ],
    proficiencyLevel: "Advanced Mastery",
  },
  {
    id: "ai-automation",
    title: "AI-Driven Security Automation & Agents",
    badge: "Conference Speaker Topic",
    icon: Sparkles,
    accentColor: "text-purple-400 border-purple-500/30 bg-purple-500/10",
    summary:
      "Engineering autonomous agentic testing loops, model-assisted vulnerability verification, and intelligent scanner orchestration to eliminate manual analyst toil.",
    practicalApplications: [
      "Delivered speaker session at NULLCON 2025: 'Smart Automation using Artificial Intelligence'.",
      "Created Clinkz, an autonomous pentesting system with AI agent loops and evidence-driven reporting.",
      "Engineered custom Claude AI skills to automate routine PSIRT secret validation and triage handoffs.",
      "Built Invoker, an AI-assisted scanner signal discovery framework for high-confidence vulnerability ranking.",
    ],
    toolsAndStandards: [
      { name: "Claude AI Skills", tag: "PSIRT Workflows" },
      { name: "Clinkz Platform", tag: "Autonomous Pentesting" },
      { name: "SARIF Normalization", tag: "Unified Findings" },
      { name: "Agentic Loop Control", tag: "Recon & Exploits" },
      { name: "Invoker Framework", tag: "Vulnerability Triage" },
    ],
    proficiencyLevel: "Production Lead",
  },
  {
    id: "engineering",
    title: "Security Software Engineering",
    badge: "Core Engineering",
    icon: Cpu,
    accentColor: "text-blue-400 border-blue-500/30 bg-blue-500/10",
    summary:
      "Writing clean, hardened code in Python, Java, TypeScript, and SQL to build production-grade security parsers, CLI tools, and distributed cloud applications.",
    practicalApplications: [
      "Engineered the Burp to Fortify Parser plugin (Java & Python) to normalize DAST telemetry for enterprise intake.",
      "Developed nyx, a safety-first local file intelligence tool using SHA-256 fingerprinting.",
      "Designed secure REST APIs, database schemas, and cryptographic signing utilities.",
      "Hardened full-stack Next.js and Node.js applications with strict nonce CSP, double-submit CSRF, and rate limits.",
    ],
    toolsAndStandards: [
      { name: "Python", tag: "Tooling & Exploit Scripts" },
      { name: "Java", tag: "Enterprise Plugins & APIs" },
      { name: "TypeScript / Node.js", tag: "Type-Safe Systems" },
      { name: "PostgreSQL / Redis", tag: "State & Rate Limiting" },
      { name: "Bash / Shell", tag: "Linux Automation" },
    ],
    proficiencyLevel: "Advanced Mastery",
  },
  {
    id: "cloud-infra",
    title: "Cloud Infrastructure & Platform Hardening",
    badge: "DevSecOps",
    icon: Cloud,
    accentColor: "text-teal-400 border-teal-500/30 bg-teal-500/10",
    summary:
      "Securing cloud workloads, containerized orchestration environments, and HTTP transport layers against misconfigurations, privilege abuse, and lateral movement.",
    practicalApplications: [
      "Hardened enterprise OpenShift / Kubernetes clusters and container base images against CVEs.",
      "Configured strict defense-in-depth HTTP headers (HSTS Preload, Nonce CSP, X-Frame-Options DENY).",
      "Implemented distributed sliding-window rate limiting via Redis to prevent automated API scraping and DDoS.",
      "Enforced least-privilege RBAC, secret management boundaries, and network segregation.",
    ],
    toolsAndStandards: [
      { name: "Docker", tag: "Container Hardening" },
      { name: "OpenShift / K8s", tag: "Cluster Security" },
      { name: "Strict CSP & HSTS", tag: "Web Transport Security" },
      { name: "Upstash Redis", tag: "Rate Limiting" },
      { name: "Linux / POSIX", tag: "Kernel Hardening" },
    ],
    proficiencyLevel: "Core Competency",
  },
];

export function SkillsSection() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedDomain, setSelectedDomain] = React.useState<string>("all");
  const { playSound } = useSound();

  const handleDomainFilter = (domainId: string) => {
    playSound("click");
    setSelectedDomain(domainId);
  };

  const filteredDomains = React.useMemo(() => {
    return competencyDomains
      .map((domain) => {
        if (selectedDomain !== "all" && domain.id !== selectedDomain) {
          return null;
        }

        if (!searchQuery.trim()) {
          return domain;
        }

        const q = searchQuery.toLowerCase();
        const matchesTitle = domain.title.toLowerCase().includes(q);
        const matchesSummary = domain.summary.toLowerCase().includes(q);
        const matchesApps = domain.practicalApplications.some((app) =>
          app.toLowerCase().includes(q)
        );
        const matchingTools = domain.toolsAndStandards.filter(
          (t) =>
            t.name.toLowerCase().includes(q) || t.tag.toLowerCase().includes(q)
        );

        if (matchesTitle || matchesSummary || matchesApps || matchingTools.length > 0) {
          return {
            ...domain,
            toolsAndStandards: matchingTools.length > 0 ? matchingTools : domain.toolsAndStandards,
          };
        }

        return null;
      })
      .filter((domain): domain is CompetencyDomain => Boolean(domain));
  }, [selectedDomain, searchQuery]);

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-400">
            <Layers className="h-3.5 w-3.5" />
            Core Competencies &amp; Applied Security Skills
          </div>
          <h2 className={typography.sectionTitle}>
            Skills &amp; Technical Capabilities
          </h2>
          <p className={typography.sectionDescription}>
            A transparent view of the specific security capabilities, practical engineering skills, and production methodologies I bring to enterprise teams.
          </p>
        </div>

        {/* Live Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter capabilities (e.g. TruffleHog, PSIRT, Burp)..."
            className="w-full rounded-2xl border border-slate-300 bg-white/95 pl-10 pr-10 py-2.5 text-xs text-slate-950 placeholder-slate-500 shadow-sm focus:border-cyan-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900/90 dark:text-white dark:placeholder-slate-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-slate-400 hover:text-slate-200"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Domain Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-4">
        <button
          onClick={() => handleDomainFilter("all")}
          className={cn(
            "rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer",
            selectedDomain === "all"
              ? "bg-slate-950 text-white dark:bg-white dark:text-slate-950 shadow-md"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800/70 dark:text-slate-300 dark:hover:text-white"
          )}
        >
          All Domains (6)
        </button>

        {competencyDomains.map((domain) => {
          const isSelected = selectedDomain === domain.id;
          return (
            <button
              key={domain.id}
              onClick={() => handleDomainFilter(domain.id)}
              className={cn(
                "rounded-xl px-3.5 py-2 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5",
                isSelected
                  ? "bg-cyan-600 text-white dark:bg-cyan-500 dark:text-slate-950 shadow-md"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800/70 dark:text-slate-300 dark:hover:text-white"
              )}
            >
              <span>{domain.title.split(" ")[0]}</span>
            </button>
          );
        })}
      </div>

      {/* Competency Mastery Bento Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-stretch">
        {filteredDomains.map((domain) => {
          const Icon = domain.icon;
          return (
            <SpotlightCard
              key={domain.id}
              className="flex flex-col justify-between space-y-5 h-full"
            >
              <div className="space-y-4">
                {/* Header Badge & Level */}
                <div className="flex items-start justify-between gap-2 border-b border-slate-200/80 dark:border-slate-800 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800/90 p-2.5 text-cyan-600 dark:text-cyan-400 shadow-sm">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-black tracking-tight text-slate-950 dark:text-white">
                        {domain.title}
                      </h3>
                      <p className="text-[11px] font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                        {domain.badge}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Plain-English Summary */}
                <p className="text-xs font-normal leading-relaxed text-slate-700 dark:text-slate-200">
                  {domain.summary}
                </p>

                {/* Concrete What I Deliver Bullets */}
                <div className="space-y-2 pt-1">
                  <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Demonstrated Capabilities &amp; Impact
                  </p>
                  <ul className="space-y-2">
                    {domain.practicalApplications.map((app, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-xs text-slate-800 dark:text-slate-200 font-sans leading-snug"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                        <span>{app}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Tools & Standards Tag Cloud */}
              <div className="space-y-2 pt-4 border-t border-slate-200/80 dark:border-slate-800">
                <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Tooling &amp; Standards Mastered
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {domain.toolsAndStandards.map((tool) => (
                    <span
                      key={tool.name}
                      className="inline-flex items-center gap-1 rounded-lg border border-slate-200/90 dark:border-slate-700/90 bg-slate-50 dark:bg-slate-900/90 px-2.5 py-1 text-[11px] font-medium text-slate-800 dark:text-slate-200 hover:border-cyan-500/60 transition-colors shadow-xs"
                      title={tool.tag}
                    >
                      <span className="font-semibold">{tool.name}</span>
                      <span className="text-[9px] text-slate-500 font-mono">({tool.tag})</span>
                    </span>
                  ))}
                </div>
              </div>
            </SpotlightCard>
          );
        })}
      </div>
    </div>
  );
}
