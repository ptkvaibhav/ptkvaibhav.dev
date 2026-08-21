# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project follows semantic versioning for releases when tagged.

## [2.1.0] - 2026-08-21

### Added
- **Live GitHub GraphQL Contributions & Telemetry**:
  - Integrated real-time GitHub GraphQL API query for `@ptkvaibhav` contribution calendar, daily commit intensity matrix, and verified open-source statistics.
  - Paired the live contribution grid directly with the **Projects & Open Source** section to show open-source tools alongside active contribution frequency.
  - Interactive day hover inspection showing exact contribution dates and counts.
- **Role-Specific Domain Switcher in Experience**:
  - Dynamically switches top banner metadata: Guidewire Software displays `Product Security Incident Response • PSIRT`, while Deloitte displays `Application Security Advisory • Top 1% Rating`.
- **Impeccable Style Edge-to-Edge Visual Polish**:
  - Upgraded dark mode contrast to WCAG AAA standards with `#F8FAFC` high-luminance text, eliminating dark grey text on dark obsidian backgrounds.
  - Expanded container canvas to 1280px full-bleed width with animated glowing avatar rings, subtle cyan/emerald ambient drift, and fluid glassmorphic cards.
  - Clear 6-domain Applied Skills & Production Capabilities matrix (Incident Response & PSIRT, AppSec Governance, Offensive Testing, AI Security Automation, Software Engineering, Cloud Hardening).

## [2.0.0] - 2026-08-21

### Added
- **UI/UX Pro Max Design Intelligence Overhaul**:
  - Implemented Cyber-Stealth Dark Mode & Clean Executive Light Mode with persistent state.
  - Interactive live CLI Security Terminal in the Hero section (`scan --live`, `whoami`, `triage`, `skills`, `projects`, `nullcon`, `contact`).
  - Interactive False-Positive Triage Simulator demonstrating 30% AST noise reduction.
  - Dynamic Bento Grid & Skill Matrix with real-time live search across 50+ tools.
  - Global Command Palette (`Cmd+K` / `Ctrl+K`) with zero-dependency Web Audio tactile FX.
  - Quick Architecture Preview modal for security projects.
- **Guidewire Software (PSIRT) Experience Integration**:
  - Added Senior Product Security Engineer (PSIRT) role at Guidewire Software (May 2026 – Present).
  - Quantifiable metrics: 100+ critical security incidents resolved (33% MTTR reduction), TruffleHog secret invalidation timeline reduced from 70 to 38 days, and custom Claude AI PSIRT / CVE detection framework agents.
- **GitHub Profile README**:
  - Redesigned `README.md` as an elite GitHub Profile showcase for `ptkvaibhav/ptkvaibhav`.

### Security & Dependency Hardening
- Consolidated and resolved 13 open Dependabot security advisories across `package.json` and `package-lock.json`:
  - Bumped `next` to `15.5.23` (PR #78)
  - Bumped `nanoid` to `3.3.18` (PR #77)
  - Bumped `ip-address` to `10.5.0` (PR #76)
  - Bumped `js-yaml` to `4.3.1` (PR #75)
  - Bumped `dompurify` to `3.4.13` (PR #72)
  - Bumped `brace-expansion` to `1.1.18` (PR #70)
  - Bumped `postcss` to `8.5.23` (PR #69)
  - Bumped `fast-uri` to `3.1.5` (PR #68)
  - Bumped `undici` to `7.29.0` (PR #65)
  - Bumped `tar` to `7.5.22` (PR #64)
  - Bumped `@cyclonedx/cyclonedx-npm` to `5.0.0` (PR #56)
- Regenerated software bill of materials (`sbom.json`) via CycloneDX.

---

[2.1.0]: https://github.com/ptkvaibhav/ptkvaibhav/compare/v2.0.0...v2.1.0
[2.0.0]: https://github.com/ptkvaibhav/ptkvaibhav/compare/v1.0.0...v2.0.0
