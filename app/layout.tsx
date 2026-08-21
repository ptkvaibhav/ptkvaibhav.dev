import "./globals.css";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { CommandPalette } from "@/components/interactive/command-palette";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SoundProvider } from "@/components/providers/sound-provider";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site";

const defaultTitle = "Pratik Vaibhav | Senior Product Security Engineer (PSIRT)";
const defaultDescription =
  "Senior Product Security Engineer (PSIRT) at Guidewire Software. Specializing in security incident response, TruffleHog secret governance, DevSecOps automation, and offensive testing.";
const personStructuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Pratik Vaibhav",
  url: "https://ptkvaibhav.dev",
  jobTitle: "Senior Product Security Engineer",
  sameAs: [
    "https://github.com/ptkvaibhav",
    "https://www.linkedin.com/in/ptkvaibhav/",
    "https://x.com/ptkvaibhav",
  ],
};
const serializedPersonStructuredData = JSON.stringify(personStructuredData).replace(
  /</g,
  "\\u003c"
);

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: defaultTitle,
    template: `%s | ${siteConfig.name}`,
  },
  description: defaultDescription,
  openGraph: {
    title: defaultTitle,
    description: defaultDescription,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const nonce = (await headers()).get("x-nonce") ?? undefined;

  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <script
          type="application/ld+json"
          nonce={nonce}
          dangerouslySetInnerHTML={{ __html: serializedPersonStructuredData }}
        />
      </head>
      <body
        className={cn(
          GeistSans.className,
          GeistMono.variable,
          "min-h-screen bg-background text-foreground selection:bg-emerald-500/20 selection:text-emerald-400"
        )}
      >
        <ThemeProvider defaultTheme="dark" storageKey="ptk-theme">
          <SoundProvider>
            <div className="relative overflow-hidden min-h-screen flex flex-col">
              <div aria-hidden className="ambient-layer" />
              <div aria-hidden className="ambient-noise" />
              <SiteHeader />
              <main className="flex-1">{children}</main>
              <SiteFooter />
              <CommandPalette />
            </div>
          </SoundProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
