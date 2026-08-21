"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Github, Linkedin, Menu, X, Search, Moon, Sun, Volume2, VolumeX, Shield, Sparkles } from "lucide-react";
import gsap from "gsap";

import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/providers/theme-provider";
import { useSound } from "@/components/providers/sound-provider";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

type SectionNavigationProps = {
  activeSection: string;
  linkRefs?: React.MutableRefObject<Record<string, HTMLAnchorElement | null>>;
  onNavigate?: () => void;
};

function SectionNavigation({
  activeSection,
  linkRefs,
  onNavigate,
}: SectionNavigationProps) {
  const { playSound } = useSound();

  function isActiveRoute(href: string) {
    return href === `#${activeSection}`;
  }

  return (
    <>
      {siteConfig.nav.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          ref={(element) => {
            if (linkRefs) {
              linkRefs.current[item.href] = element;
            }
          }}
          aria-current={isActiveRoute(item.href) ? "page" : undefined}
          className={cn(
            "relative rounded-xl px-3 py-2 text-xs font-semibold uppercase tracking-wider transition-all md:rounded-none md:px-0 md:text-xs",
            isActiveRoute(item.href)
              ? "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-bold md:bg-transparent"
              : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
          )}
          onClick={() => {
            playSound("click");
            if (onNavigate) onNavigate();
          }}
        >
          {item.label}
        </Link>
      ))}
    </>
  );
}

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const navRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const { resolvedTheme, toggleTheme } = useTheme();
  const { isMuted, toggleMute, playSound } = useSound();

  const resumePath = "/resume/Pratik_Vaibhav_Resume.pdf";
  const sectionIds = useMemo(
    () => siteConfig.nav.map((item) => item.href.replace("#", "")),
    []
  );

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (!sections.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => right.intersectionRatio - left.intersectionRatio);

        if (visibleEntries[0]) {
          setActiveSection(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: "-25% 0px -50% 0px",
        threshold: [0.15, 0.35, 0.6],
      }
    );

    sections.forEach((section) => observer.observe(section));

    const syncActiveSection = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash && sectionIds.includes(hash)) {
        setActiveSection(hash);
      }
    };

    syncActiveSection();
    window.addEventListener("hashchange", syncActiveSection);

    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", syncActiveSection);
    };
  }, [sectionIds]);

  useEffect(() => {
    const updateIndicator = () => {
      const nav = navRef.current;
      const indicator = indicatorRef.current;
      const activeLink = linkRefs.current[`#${activeSection}`];

      if (!nav || !indicator || !activeLink) {
        return;
      }

      const navBounds = nav.getBoundingClientRect();
      const linkBounds = activeLink.getBoundingClientRect();

      gsap.to(indicator, {
        x: linkBounds.left - navBounds.left,
        width: linkBounds.width,
        autoAlpha: 1,
        duration: 0.28,
        ease: "power2.out",
      });
    };

    updateIndicator();
    window.addEventListener("resize", updateIndicator);

    return () => {
      window.removeEventListener("resize", updateIndicator);
    };
  }, [activeSection]);

  const openCommandPalette = () => {
    playSound("click");
    window.dispatchEvent(new CustomEvent("open-command-palette"));
  };

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/85 dark:border-white/10 dark:bg-slate-950/80 backdrop-blur-xl transition-colors duration-200">
      <div className="container relative flex items-center justify-between gap-4 py-3">
        {/* Brand / Logo */}
        <div className="flex items-center gap-6">
          <Link
            href="#about"
            onClick={() => {
              playSound("click");
              closeMenu();
            }}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-emerald-500 text-slate-950 font-black text-sm shadow-md group-hover:scale-105 transition-transform">
              <Shield className="h-4 w-4 fill-current" />
            </div>
            <span className="font-mono font-bold text-base tracking-tight text-slate-900 dark:text-white">
              pratik<span className="text-cyan-600 dark:text-cyan-400">.dev</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav
            ref={navRef}
            aria-label="Primary navigation"
            className="hidden md:flex md:items-center md:gap-6 relative text-sm"
          >
            <span
              ref={indicatorRef}
              className="pointer-events-none absolute bottom-0 left-0 hidden h-0.5 w-0 bg-cyan-500 dark:bg-cyan-400 opacity-0 md:block rounded-full shadow-[0_0_8px_rgba(0,210,255,0.6)]"
            />
            <SectionNavigation
              activeSection={activeSection}
              linkRefs={linkRefs}
              onNavigate={closeMenu}
            />
          </nav>
        </div>

        {/* Right Action Bar */}
        <div className="flex items-center gap-2">
          {/* Quick Search Button (Cmd+K) */}
          <button
            onClick={openCommandPalette}
            className="hidden sm:inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100/80 px-3 py-1.5 text-xs text-slate-600 hover:border-cyan-400/50 hover:bg-slate-200/70 dark:border-white/10 dark:bg-slate-900/80 dark:text-slate-400 dark:hover:border-cyan-500/40 dark:hover:text-white transition-all cursor-pointer"
          >
            <Search className="h-3.5 w-3.5 text-cyan-500" />
            <span>Search &amp; Run</span>
            <kbd className="rounded bg-white dark:bg-slate-800 px-1.5 py-0.5 text-[10px] font-mono border border-slate-200 dark:border-slate-700 shadow-sm">
              ⌘K
            </kbd>
          </button>

          {/* Sound FX Toggle */}
          <button
            onClick={() => {
              toggleMute();
              if (isMuted) playSound("success");
            }}
            aria-label={isMuted ? "Unmute sound effects" : "Mute sound effects"}
            title={isMuted ? "Unmute sound effects" : "Mute sound effects"}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-white/10 dark:bg-slate-900 dark:text-slate-400 dark:hover:text-white transition-all cursor-pointer"
          >
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4 text-emerald-500" />}
          </button>

          {/* Dark / Light Theme Toggle */}
          <button
            onClick={() => {
              playSound("toggle");
              toggleTheme();
            }}
            aria-label="Toggle dark/light mode"
            title="Toggle theme mode"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-white/10 dark:bg-slate-900 dark:text-slate-400 dark:hover:text-white transition-all cursor-pointer"
          >
            {resolvedTheme === "dark" ? (
              <Sun className="h-4 w-4 text-amber-400" />
            ) : (
              <Moon className="h-4 w-4 text-slate-700" />
            )}
          </button>

          {/* Resume Button */}
          <Button asChild size="sm" variant="secondary" className="hidden lg:inline-flex">
            <Link href={resumePath} target="_blank" rel="noopener noreferrer">
              Resume
            </Link>
          </Button>

          {/* Let's Talk Primary CTA */}
          <Button asChild size="sm" className="hidden sm:inline-flex bg-slate-950 text-white hover:bg-cyan-700 dark:bg-emerald-500 dark:text-slate-950 dark:hover:bg-emerald-400 font-bold">
            <Link href="#contact">Let&apos;s talk</Link>
          </Button>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 dark:border-white/10 dark:bg-slate-900 dark:text-slate-300 transition hover:bg-slate-50 dark:hover:bg-slate-800 md:hidden cursor-pointer"
            onClick={() => {
              playSound("click");
              setIsMenuOpen((current) => !current);
            }}
          >
            {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 px-5 py-4 shadow-xl backdrop-blur-xl space-y-3">
          <div className="flex flex-col gap-1">
            <SectionNavigation
              activeSection={activeSection}
              linkRefs={linkRefs}
              onNavigate={closeMenu}
            />
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
            <Button asChild size="sm" variant="secondary" className="col-span-2">
              <Link href={resumePath} target="_blank" rel="noopener noreferrer" onClick={closeMenu}>
                Download Resume
              </Link>
            </Button>
            <Button asChild size="sm" variant="ghost">
              <Link href={siteConfig.social.github} target="_blank" rel="noopener noreferrer" onClick={closeMenu}>
                <Github className="h-4 w-4" /> GitHub
              </Link>
            </Button>
            <Button asChild size="sm" variant="ghost">
              <Link href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" onClick={closeMenu}>
                <Linkedin className="h-4 w-4" /> LinkedIn
              </Link>
            </Button>
            <Button asChild size="sm" className="col-span-2 bg-emerald-500 text-slate-950 hover:bg-emerald-400 font-bold">
              <Link href="#contact" onClick={closeMenu}>
                Let&apos;s talk
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
