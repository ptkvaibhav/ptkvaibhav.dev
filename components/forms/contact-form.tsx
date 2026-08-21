"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send, CheckCircle2, ShieldCheck, Copy, Check } from "lucide-react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useSound } from "@/components/providers/sound-provider";
import { ContactSchema, type ContactInput } from "@/lib/validation";
import type { ContactApiResponse } from "@/types/contact";

type FormState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export function ContactForm() {
  const [formState, setFormState] = useState<FormState>({ status: "idle" });
  const [toast, setToast] = useState<FormState | null>(null);
  const { playSound } = useSound();

  const form = useForm<ContactInput>({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      organization: "",
      subject: "",
      message: "",
      nickname: "",
    },
  });

  useEffect(() => {
    if (!toast || toast.status === "idle") {
      return;
    }

    const timer = window.setTimeout(() => setToast(null), 4000);
    return () => window.clearTimeout(timer);
  }, [toast]);

  function getCookieValue(name: string) {
    const cookies = document.cookie.split("; ");
    const target = cookies.find((cookie) => cookie.startsWith(`${name}=`));
    return target ? decodeURIComponent(target.split("=").slice(1).join("=")) : "";
  }

  const onSubmit = form.handleSubmit(async (values) => {
    playSound("click");
    setFormState({ status: "idle" });
    setToast(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": getCookieValue("csrf-token"),
        },
        body: JSON.stringify(values),
      });

      const payload = (await response.json()) as ContactApiResponse;

      if (!response.ok || ("error" in payload && payload.error)) {
        playSound("alert");
        const message =
          "error" in payload && payload.error
            ? payload.error
            : "Unable to send message right now. Please try again later.";
        setFormState({ status: "error", message });
        setToast({ status: "error", message });
        return;
      }

      playSound("success");
      const message =
        "message" in payload && payload.message
          ? payload.message
          : "Message delivered securely. Thank you for reaching out!";

      form.reset();
      setFormState({ status: "success", message });
      setToast({ status: "success", message });
    } catch {
      playSound("alert");
      const message = "Unable to send message right now. Please try again later.";
      setFormState({ status: "error", message });
      setToast({ status: "error", message });
    }
  });

  return (
    <div className="space-y-6">
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label htmlFor="name" className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Your Name *
            </label>
            <Input
              id="name"
              placeholder="e.g. Alex Rivera"
              className="rounded-xl border-slate-200 bg-white/90 dark:border-slate-800 dark:bg-slate-950/80 text-xs"
              {...form.register("name")}
            />
            {form.formState.errors.name ? (
              <p className="text-xs text-rose-500 font-mono">{form.formState.errors.name.message}</p>
            ) : null}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="email" className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Email Address *
            </label>
            <Input
              id="email"
              type="email"
              placeholder="alex@company.com"
              className="rounded-xl border-slate-200 bg-white/90 dark:border-slate-800 dark:bg-slate-950/80 text-xs"
              {...form.register("email")}
            />
            {form.formState.errors.email ? (
              <p className="text-xs text-rose-500 font-mono">{form.formState.errors.email.message}</p>
            ) : null}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label htmlFor="organization" className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Organization (Optional)
            </label>
            <Input
              id="organization"
              placeholder="Company / Team name"
              className="rounded-xl border-slate-200 bg-white/90 dark:border-slate-800 dark:bg-slate-950/80 text-xs"
              {...form.register("organization")}
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="subject" className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Subject *
            </label>
            <Input
              id="subject"
              placeholder="AppSec Lead Role / Pentest Inquiry"
              className="rounded-xl border-slate-200 bg-white/90 dark:border-slate-800 dark:bg-slate-950/80 text-xs"
              {...form.register("subject")}
            />
            {form.formState.errors.subject ? (
              <p className="text-xs text-rose-500 font-mono">{form.formState.errors.subject.message}</p>
            ) : null}
          </div>
        </div>

        {/* Honeypot anti-spam */}
        <div className="hidden" aria-hidden="true">
          <Input tabIndex={-1} autoComplete="off" aria-hidden="true" {...form.register("company")} />
          <Input tabIndex={-1} autoComplete="off" {...form.register("nickname")} />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="message" className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Message *
          </label>
          <Textarea
            id="message"
            maxLength={2000}
            rows={4}
            placeholder="Describe your security challenge, project scope, or open role requirements..."
            className="rounded-xl border-slate-200 bg-white/90 dark:border-slate-800 dark:bg-slate-950/80 text-xs resize-none"
            {...form.register("message")}
          />
          {form.formState.errors.message ? (
            <p className="text-xs text-rose-500 font-mono">{form.formState.errors.message.message}</p>
          ) : null}
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pt-2">
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="bg-slate-950 text-white dark:bg-emerald-500 dark:text-slate-950 dark:hover:bg-emerald-400 font-bold text-xs"
          >
            {form.formState.isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Validating &amp; Transmitting...
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Dispatch Message
              </>
            )}
          </Button>

          {formState.message ? (
            <p
              className={
                formState.status === "success"
                  ? "text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold"
                  : "text-xs font-mono text-rose-600 dark:text-rose-400 font-semibold"
              }
            >
              {formState.message}
            </p>
          ) : (
            <p className="text-[11px] font-mono text-slate-500">
              🔒 Rate-limited endpoint &bull; CSRF &amp; HTML sanitized
            </p>
          )}
        </div>
      </form>

      {toast ? (
        <div
          role="status"
          aria-live="polite"
          className={`fixed bottom-6 right-6 z-[80] max-w-sm rounded-2xl border px-4 py-3 text-xs font-mono shadow-2xl backdrop-blur-xl ${
            toast.status === "success"
              ? "border-emerald-500/40 bg-slate-900/95 text-emerald-300"
              : "border-rose-500/40 bg-slate-900/95 text-rose-300"
          }`}
        >
          {toast.message}
        </div>
      ) : null}
    </div>
  );
}
