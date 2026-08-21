import Link from "next/link";
import { Github, Linkedin, ShieldCheck, Terminal, Heart, ArrowUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

const resumePath = "/resume/Pratik_Vaibhav_Resume.pdf";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200/80 bg-white/85 dark:border-white/10 dark:bg-slate-950/90 py-10 backdrop-blur-xl transition-colors duration-200 font-sans">
      <div className="container space-y-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl space-y-2">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              <p className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">
                {siteConfig.name} &bull; Security Status: Active (A+ Grade)
              </p>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">{siteConfig.bio}</p>
            <p className="text-xs text-slate-500 font-mono">
              Enforcing Strict CSP, Subresource Integrity, Nonce Validation, and Edge Rate Limiting.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button asChild size="sm" variant="secondary">
              <Link href={resumePath} target="_blank" rel="noopener noreferrer">
                Resume PDF
              </Link>
            </Button>
            <Button asChild size="sm" variant="ghost">
              <Link
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5"
              >
                <Github className="h-4 w-4" />
                GitHub
              </Link>
            </Button>
            <Button asChild size="sm" variant="ghost">
              <Link
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </Link>
            </Button>
            <Button asChild size="sm" className="bg-emerald-500 text-slate-950 hover:bg-emerald-400 font-bold">
              <Link href="#contact">Contact</Link>
            </Button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200/80 dark:border-slate-800/80 pt-6 text-xs text-slate-500 font-mono">
          <p>© {new Date().getFullYear()} Pratik Vaibhav. Engineered for verifiable security.</p>
          <a
            href="#about"
            className="flex items-center gap-1 text-slate-500 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
