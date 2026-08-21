export const typography = {
  sectionLabel: "text-xs font-mono font-bold uppercase tracking-[0.22em] text-cyan-700 dark:text-cyan-400",
  sectionTitle: "text-[2.2rem] font-black leading-[1.02] tracking-[-0.04em] text-slate-950 dark:text-white md:text-[3rem]",
  sectionDescription: "max-w-[700px] text-sm leading-6 text-slate-700 dark:text-slate-200 md:text-[0.95rem] font-normal",
  pageTitle: "text-[2.5rem] font-extrabold leading-[1.02] tracking-tight text-slate-950 dark:text-white md:text-[2.9rem]",
  pageDescription: "text-sm leading-6 text-slate-700 dark:text-slate-200 md:text-[0.95rem]",
  cardTitle: "text-[1.375rem] font-black tracking-tight text-slate-950 dark:text-white",
  cardText: "text-sm leading-6 text-slate-700 dark:text-slate-200 md:text-[0.95rem]",
  panelLabel: "text-sm uppercase tracking-[0.16em] text-slate-600 dark:text-slate-400 font-mono font-bold",
  statValue: "text-2xl font-black tracking-tight text-slate-950 dark:text-white md:text-3xl",
  statLabel: "text-xs uppercase tracking-wide text-slate-600 dark:text-slate-400 font-mono",
} as const;

export const spacing = {
  section: "py-20",
  sectionHeader: "mb-12 space-y-4",
  card: "p-6",
  cardLarge: "p-8",
} as const;
