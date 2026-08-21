"use client";

import * as React from "react";
import { Search, Terminal, Download, ShieldCheck, Briefcase, Award, FolderGit2, Mail, Moon, Sun, Volume2, VolumeX, ExternalLink, X, CornerDownLeft, Sparkles, Activity } from "lucide-react";
import { useTheme } from "@/components/providers/theme-provider";
import { useSound } from "@/components/providers/sound-provider";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

type CommandItem = {
  id: string;
  title: string;
  category: "Navigation" | "Actions" | "Socials";
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
  shortcut?: string;
};

export function CommandPalette() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const { resolvedTheme, toggleTheme } = useTheme();
  const { isMuted, toggleMute, playSound } = useSound();

  const resumePath = "/resume/Pratik_Vaibhav_Resume.pdf";

  const close = React.useCallback(() => {
    setIsOpen(false);
    setQuery("");
    setSelectedIndex(0);
  }, []);

  const navigateTo = React.useCallback((hash: string) => {
    close();
    const el = document.getElementById(hash.replace("#", ""));
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, [close]);

  const items: CommandItem[] = React.useMemo(
    () => [
      {
        id: "nav-about",
        title: "Profile & Identity",
        category: "Navigation",
        icon: ShieldCheck,
        action: () => navigateTo("#about"),
      },
      {
        id: "nav-experience",
        title: "Professional Experience (Guidewire & Deloitte)",
        category: "Navigation",
        icon: Briefcase,
        action: () => navigateTo("#experience"),
      },
      {
        id: "nav-skills",
        title: "Core Skills & Applied Capabilities",
        category: "Navigation",
        icon: Sparkles,
        action: () => navigateTo("#skills"),
      },
      {
        id: "nav-projects",
        title: "Security Projects & Open Source",
        category: "Navigation",
        icon: FolderGit2,
        action: () => navigateTo("#projects"),
      },
      {
        id: "nav-console",
        title: "Live Security Console & Triage Lab",
        category: "Navigation",
        icon: Terminal,
        action: () => navigateTo("#interactive-console"),
      },
      {
        id: "nav-github",
        title: "GitHub Contributions & Telemetry",
        category: "Navigation",
        icon: Activity,
        action: () => navigateTo("#github-activity"),
      },
      {
        id: "nav-awards",
        title: "Awards & NULLCON 2025 Speaker",
        category: "Navigation",
        icon: Award,
        action: () => navigateTo("#awards"),
      },
      {
        id: "nav-contact",
        title: "Contact & Inquiries",
        category: "Navigation",
        icon: Mail,
        action: () => navigateTo("#contact"),
      },
      {
        id: "act-resume",
        title: "Download Resume PDF",
        category: "Actions",
        icon: Download,
        action: () => {
          close();
          window.open(resumePath, "_blank", "noopener,noreferrer");
        },
        shortcut: "PDF",
      },
      {
        id: "act-theme",
        title: `Switch to ${resolvedTheme === "dark" ? "Light Executive" : "Dark Cyber"} Mode`,
        category: "Actions",
        icon: resolvedTheme === "dark" ? Sun : Moon,
        action: () => {
          playSound("toggle");
          toggleTheme();
          close();
        },
        shortcut: "Theme",
      },
      {
        id: "act-sound",
        title: `${isMuted ? "Unmute" : "Mute"} UI Audio FX`,
        category: "Actions",
        icon: isMuted ? Volume2 : VolumeX,
        action: () => {
          toggleMute();
          close();
        },
        shortcut: "Audio",
      },
      {
        id: "soc-github",
        title: "Visit GitHub Profile",
        category: "Socials",
        icon: ExternalLink,
        action: () => {
          close();
          window.open(siteConfig.social.github, "_blank", "noopener,noreferrer");
        },
      },
      {
        id: "soc-linkedin",
        title: "Connect on LinkedIn",
        category: "Socials",
        icon: ExternalLink,
        action: () => {
          close();
          window.open(siteConfig.social.linkedin, "_blank", "noopener,noreferrer");
        },
      },
    ],
    [navigateTo, close, resumePath, resolvedTheme, toggleTheme, isMuted, toggleMute, playSound]
  );

  const filteredItems = React.useMemo(() => {
    if (!query.trim()) return items;
    const q = query.toLowerCase();
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
    );
  }, [items, query]);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => {
          const next = !prev;
          if (next) playSound("click");
          return next;
        });
      } else if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        close();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, close, playSound]);

  React.useEffect(() => {
    const handleOpenPalette = () => {
      playSound("click");
      setIsOpen(true);
    };
    window.addEventListener("open-command-palette", handleOpenPalette);
    return () => window.removeEventListener("open-command-palette", handleOpenPalette);
  }, [playSound]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      playSound("terminal-key");
      setSelectedIndex((prev) => (prev + 1) % (filteredItems.length || 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      playSound("terminal-key");
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % (filteredItems.length || 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const selected = filteredItems[selectedIndex];
      if (selected) {
        playSound("click");
        selected.action();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[14vh] px-4">
      <div
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-md transition-opacity"
        onClick={close}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-xl overflow-hidden rounded-[26px] border border-slate-700/80 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-[0_30px_90px_rgba(0,0,0,0.5)] z-10 font-sans">
        {/* Search Bar */}
        <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 px-4 py-3.5">
          <Search className="h-5 w-5 text-cyan-500 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Type a command, search skills, or jump to section..."
            className="flex-1 bg-transparent text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none"
          />
          <button
            onClick={close}
            aria-label="Close command palette"
            className="rounded-lg p-1 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[340px] overflow-y-auto p-2 space-y-1 scrollbar-thin">
          {filteredItems.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-500">
              No matching commands or destinations found.
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    playSound("click");
                    item.action();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-medium transition-all text-left cursor-pointer",
                    isSelected
                      ? "bg-cyan-500/15 text-cyan-800 dark:bg-cyan-500/20 dark:text-cyan-300 font-semibold"
                      : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span className={cn("p-1.5 rounded-lg border", isSelected ? "border-cyan-500/40 bg-cyan-500/20 text-cyan-700 dark:text-cyan-300" : "border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 text-slate-500")}>
                      <Icon className="h-3.5 w-3.5" />
                    </span>
                    <span>{item.title}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500">
                      {item.category}
                    </span>
                    {isSelected && (
                      <CornerDownLeft className="h-3 w-3 text-cyan-600 dark:text-cyan-400" />
                    )}
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="flex items-center justify-between border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/80 px-4 py-2 text-[11px] text-slate-500">
          <div className="flex items-center gap-3">
            <span><strong className="text-slate-700 dark:text-slate-300">↑↓</strong> Navigate</span>
            <span><strong className="text-slate-700 dark:text-slate-300">↵</strong> Select</span>
            <span><strong className="text-slate-700 dark:text-slate-300">esc</strong> Close</span>
          </div>
          <span className="font-mono text-cyan-600 dark:text-cyan-400">PTK-SEC OS</span>
        </div>
      </div>
    </div>
  );
}

