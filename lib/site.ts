export const siteConfig = {
  name: "Pratik Vaibhav",
  description: "Senior Product Security Engineer (PSIRT) | AppSec & DevSecOps",
  bio: "Senior Product Security Engineer (PSIRT) at Guidewire Software & ex-Deloitte AppSec Lead. Specializing in security incident response, secret governance, and security automation.",
  email: "ptkvaibhav@gmail.com",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  social: {
    github: "https://github.com/ptkvaibhav",
    linkedin: "https://www.linkedin.com/in/ptkvaibhav/",
    x: "https://x.com/ptkvaibhav",
  },
  nav: [
    { href: "#about", label: "Profile" },
    { href: "#experience", label: "Experience" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#interactive-console", label: "Console" },
    { href: "#github-activity", label: "GitHub" },
    { href: "#awards", label: "Awards" },
    { href: "#contact", label: "Contact" },
  ],
} as const;
