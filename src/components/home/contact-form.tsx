"use client";

import Script from "next/script";
import { useActionState, useEffect, useRef, useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import type { Dictionary } from "@/i18n/dictionaries";
import { sendContact } from "@/app/actions/contact";
import type { ContactState, ContactType } from "@/lib/contact-schema";
import { cn } from "@/lib/cn";

const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

type Props = { dict: Dictionary["contact"]; email: string };

const inputClass =
  "w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-sm outline-none transition placeholder:text-muted focus:border-accent focus:ring-2 focus:ring-accent/20";

export function ContactForm({ dict, email }: Props) {
  const [state, action, pending] = useActionState<ContactState, FormData>(sendContact, { status: "idle" });
  const [type, setType] = useState<ContactType>("job");
  const formRef = useRef<HTMLFormElement>(null);

  // O botão "Tem um projeto?" da seção Serviços aponta para #contato-freela.
  useEffect(() => {
    const sync = () => {
      if (window.location.hash === "#contato-freela") setType("freela");
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  useEffect(() => {
    if (state.status === "success") formRef.current?.reset();
    // Turnstile: um token só vale uma vez — gera outro depois de cada envio.
    if (state.status !== "idle") (window as { turnstile?: { reset: () => void } }).turnstile?.reset();
  }, [state]);

  const errors = state.status === "invalid" ? state.errors : {};

  if (state.status === "success") {
    return (
      <div role="status" className="flex items-center gap-3 rounded-xl border border-accent/40 bg-accent-soft p-6">
        <CheckCircle2 className="size-6 shrink-0 text-accent" />
        <p>{dict.success}</p>
      </div>
    );
  }

  const types: { value: ContactType; label: string }[] = [
    { value: "job", label: dict.typeJob },
    { value: "freela", label: dict.typeFreela },
    { value: "other", label: dict.typeOther },
  ];

  return (
    <form ref={formRef} action={action} noValidate className="space-y-4">
      <fieldset>
        <legend className="mb-2 text-sm font-medium">{dict.type}</legend>
        <div className="flex flex-wrap gap-2">
          {types.map((t) => (
            <label
              key={t.value}
              className={cn(
                "cursor-pointer rounded-lg border px-3 py-1.5 text-sm transition",
                type === t.value ? "border-accent bg-accent-soft text-accent" : "border-border text-muted hover:text-fg",
              )}
            >
              <input
                type="radio"
                name="type"
                value={t.value}
                checked={type === t.value}
                onChange={() => setType(t.value)}
                className="sr-only"
              />
              {t.label}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={dict.name} error={errors.name && dict.errors.name}>
          <input name="name" autoComplete="name" required className={inputClass} aria-invalid={!!errors.name} />
        </Field>
        <Field label={dict.email} error={errors.email && dict.errors.email}>
          <input name="email" type="email" autoComplete="email" required className={inputClass} aria-invalid={!!errors.email} />
        </Field>
      </div>

      <Field label={dict.message} error={errors.message && dict.errors.message}>
        <textarea name="message" rows={5} required className={cn(inputClass, "resize-y")} aria-invalid={!!errors.message} />
      </Field>

      {/* Honeypot — invisível para pessoas. */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      {siteKey && (
        <>
          <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />
          <div className="cf-turnstile" data-sitekey={siteKey} data-theme="auto" />
          {errors.captcha && <p className="text-sm text-red-500">{dict.errors.captcha}</p>}
        </>
      )}

      {state.status === "error" && (
        <p role="alert" className="text-sm text-red-500">
          {dict.error}{" "}
          <a href={`mailto:${email}`} className="underline">
            {email}
          </a>
          .
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-accent-fg transition hover:opacity-90 disabled:opacity-60"
      >
        {pending ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
        {pending ? dict.sending : dict.send}
      </button>
    </form>
  );
}

function Field({ label, error, children }: { label: string; error?: string | false; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-red-500">{error}</span>}
    </label>
  );
}
