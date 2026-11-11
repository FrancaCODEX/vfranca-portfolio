"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import {
  briefingSteps,
  briefingErrors,
  emptyBriefing,
  schemaForSteps,
  displayAnswer,
  type BriefingField,
  type BriefingValues,
} from "@/content/briefing";

const draftKey = "vfranca:briefing:v1";
const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
const inputClass =
  "min-h-11 w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-base outline-none placeholder:text-muted focus:border-accent focus:ring-2 focus:ring-accent/40";
const buttonClass =
  "min-h-11 rounded-lg border border-border px-4 py-2.5 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent disabled:opacity-60";

type TurnstileAPI = {
  render: (
    container: HTMLElement,
    options: { sitekey: string; theme: string },
  ) => string;
  remove: (id: string) => void;
};
const turnstile = () =>
  (window as Window & { turnstile?: TurnstileAPI }).turnstile;
function Captcha() {
  const ref = useRef<HTMLDivElement>(null);
  const widget = useRef<string | null>(null);
  useEffect(
    () => () => {
      if (widget.current !== null) turnstile()?.remove(widget.current);
    },
    [],
  );
  if (!siteKey) return null;
  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        onReady={() => {
          if (ref.current && widget.current === null)
            widget.current =
              turnstile()?.render(ref.current, {
                sitekey: siteKey,
                theme: "auto",
              }) ?? null;
        }}
      />
      <div ref={ref} className="overflow-x-auto" />
    </>
  );
}

export function BriefingForm() {
  const [values, setValues] = useState<BriefingValues>(emptyBriefing);
  const [step, setStep] = useState(0);
  const [ready, setReady] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState("");
  const [captchaAttempt, setCaptchaAttempt] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const busy = useRef(false);
  const lastStep = briefingSteps.length - 1;
  const current = briefingSteps[step];

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      try {
        const raw = localStorage.getItem(draftKey);
        if (raw) {
          const saved = JSON.parse(raw);
          const restored = emptyBriefing();
          // Validate every saved field independently; never restore consent.
          for (const s of briefingSteps)
            for (const field of s.fields) {
              if (field.kind === "consent") continue;
              const result = schemaForSteps([
                { title: "", fields: [field] },
              ]).safeParse({ [field.id]: saved[field.id] });
              if (result.success)
                restored[field.id] = result.data[field.id] as string | string[];
            }
          setValues(restored);
        }
      } catch {
        /* Storage may be blocked or the saved JSON damaged. */
      }
      setReady(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!ready || success) return;
    try {
      const draft = { ...values };
      for (const s of briefingSteps)
        for (const f of s.fields) if (f.kind === "consent") delete draft[f.id];
      localStorage.setItem(draftKey, JSON.stringify(draft));
    } catch {
      /* The form works even without browser storage. */
    }
  }, [values, ready, success]);

  function focusField(id: string) {
    requestAnimationFrame(() =>
      document.getElementById(`briefing-${id}`)?.focus(),
    );
  }
  function navigate(index: number) {
    setStep(index);
    setErrors({});
    setFailure("");
    requestAnimationFrame(() => headingRef.current?.focus());
  }
  function validate(index: number) {
    const result = schemaForSteps([briefingSteps[index]]).safeParse(values);
    if (result.success) {
      setErrors({});
      return true;
    }
    const next = briefingErrors(result.error.issues);
    setErrors(next);
    focusField(Object.keys(next)[0]);
    return false;
  }
  function advance() {
    if (validate(step)) navigate(Math.min(step + 1, lastStep));
  }
  function change(id: string, value: string | boolean | string[]) {
    setValues((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }
  async function submit() {
    if (busy.current) return;
    for (let index = 0; index <= lastStep; index++) {
      const result = schemaForSteps([briefingSteps[index]]).safeParse(values);
      if (!result.success) {
        setStep(index);
        setErrors(briefingErrors(result.error.issues));
        focusField(String(result.error.issues[0].path[0]));
        return;
      }
    }
    busy.current = true;
    setPending(true);
    setFailure("");
    const form = new FormData(formRef.current!);
    try {
      const response = await fetch("/api/briefing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers: values,
          website: form.get("website") ?? "",
          token: form.get("cf-turnstile-response") ?? "",
        }),
      });
      const result = await response.json();
      if (response.ok && result.status === "success") {
        setSuccess(true);
        try {
          localStorage.removeItem(draftKey);
        } catch {
          /* Storage unavailable. */
        }
        requestAnimationFrame(() => headingRef.current?.focus());
      } else if (result.status === "invalid" && result.errors) {
        const index = briefingSteps.findIndex((s) =>
          s.fields.some((f) => result.errors[f.id]),
        );
        setStep(index < 0 ? lastStep : index);
        setErrors(result.errors);
        focusField(Object.keys(result.errors)[0]);
      } else {
        setFailure(
          result.status === "captcha"
            ? "Confirme a verificação de segurança e tente novamente."
            : "Não foi possível enviar agora. Tente novamente ou entre em contato por e-mail.",
        );
      }
    } catch {
      setFailure(
        "Não foi possível enviar agora. Confira sua conexão e tente novamente ou entre em contato por e-mail.",
      );
    } finally {
      busy.current = false;
      setPending(false);
      setCaptchaAttempt((n) => n + 1);
    }
  }

  function fieldView(field: BriefingField) {
    const id = `briefing-${field.id}`;
    const error = errors[field.id];
    const value = values[field.id];
    const label = `${field.label}${field.required ? " *" : ""}`;
    const shared = {
      id,
      name: field.id,
      required: field.required,
      "aria-invalid": !!error,
      "aria-describedby": error ? `${id}-error` : undefined,
    };
    const errorView = error && (
      <p id={`${id}-error`} className="mt-1 text-sm text-accent">
        {error}
      </p>
    );
    if (field.kind === "multi")
      return (
        <fieldset
          key={id}
          className="min-w-0"
          aria-describedby={shared["aria-describedby"]}
          aria-invalid={!!error}
        >
          <legend className="mb-2 text-sm font-medium">{label}</legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {field.options?.map((option, i) => (
              <label
                key={option}
                className="flex min-h-11 cursor-pointer items-center gap-3 rounded-lg border border-border bg-surface px-3 py-2"
              >
                <input
                  id={i === 0 ? id : `${id}-${i}`}
                  type="checkbox"
                  name={field.id}
                  value={option}
                  checked={Array.isArray(value) && value.includes(option)}
                  aria-invalid={!!error}
                  aria-describedby={shared["aria-describedby"]}
                  className="size-5 shrink-0 accent-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                  onChange={(e) =>
                    change(
                      field.id,
                      e.target.checked
                        ? [...(Array.isArray(value) ? value : []), option]
                        : (Array.isArray(value) ? value : []).filter(
                            (v) => v !== option,
                          ),
                    )
                  }
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
          {errorView}
        </fieldset>
      );
    if (field.kind === "consent")
      return (
        <div key={id}>
          <label className="flex min-h-11 cursor-pointer items-start gap-3 py-2">
            <input
              {...shared}
              type="checkbox"
              checked={value === true}
              onChange={(e) => change(field.id, e.target.checked)}
              className="mt-1 size-5 shrink-0 accent-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            />
            <span>{label}</span>
          </label>
          {errorView}
        </div>
      );
    return (
      <div key={id}>
        <label htmlFor={id} className="mb-1.5 block text-sm font-medium">
          {label}
        </label>
        {field.kind === "select" ? (
          <select
            {...shared}
            value={typeof value === "string" ? value : ""}
            onChange={(e) => change(field.id, e.target.value)}
            className={inputClass}
          >
            <option value="">Selecione</option>
            {field.options?.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        ) : field.kind === "long" ? (
          <textarea
            {...shared}
            value={String(value ?? "")}
            onChange={(e) => change(field.id, e.target.value)}
            rows={4}
            maxLength={2000}
            className={`${inputClass} resize-y`}
          />
        ) : (
          <input
            {...shared}
            type={field.kind ?? "text"}
            value={String(value ?? "")}
            onChange={(e) => change(field.id, e.target.value)}
            maxLength={200}
            autoComplete={field.autoComplete}
            className={inputClass}
          />
        )}
        {errorView}
      </div>
    );
  }

  if (success)
    return (
      <section
        className="mt-8 rounded-xl border border-accent/40 bg-accent-soft p-6"
        role="status"
      >
        <CheckCircle2 className="size-8 text-accent" />
        <h2
          ref={headingRef}
          tabIndex={-1}
          className="mt-3 text-2xl font-semibold"
        >
          Briefing recebido
        </h2>
        <p className="mt-2">
          Obrigado! Vou analisar suas respostas para preparar a proposta.
        </p>
      </section>
    );

  return (
    <form
      ref={formRef}
      noValidate
      className="mt-8 space-y-6"
      onSubmit={(event) => {
        event.preventDefault();
        if (step < lastStep) advance();
        else void submit();
      }}
      onKeyDown={(event) => {
        if (
          event.key === "Enter" &&
          !event.nativeEvent.isComposing &&
          event.target instanceof HTMLInputElement &&
          !["checkbox", "radio", "submit", "button"].includes(event.target.type)
        ) {
          event.preventDefault();
          if (step < lastStep) advance();
        }
      }}
    >
      <div aria-live="polite">
        <p className="mb-2 text-sm text-muted">
          Etapa {step + 1} de {briefingSteps.length}
        </p>
        <progress
          aria-label="Progresso do briefing"
          value={step + 1}
          max={briefingSteps.length}
          className="h-2 w-full overflow-hidden rounded-full accent-accent"
        />
      </div>
      <fieldset
        disabled={pending || !ready}
        className="min-w-0 space-y-5 rounded-xl border border-border bg-surface p-4 sm:p-6"
      >
        <h2
          ref={headingRef}
          tabIndex={-1}
          className="text-xl font-semibold focus-visible:outline-2 focus-visible:outline-accent"
        >
          {current.title}
        </h2>
        {step === lastStep &&
          briefingSteps.slice(0, lastStep).map((s, index) => (
            <section
              key={s.title}
              className="rounded-lg border border-border p-4"
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-semibold">{s.title}</h3>
                <button
                  type="button"
                  onClick={() => navigate(index)}
                  className={buttonClass}
                  aria-label={`Editar ${s.title}`}
                >
                  Editar
                </button>
              </div>
              <dl className="mt-3 space-y-3">
                {s.fields.map((f) => (
                  <div key={f.id}>
                    <dt className="text-sm text-muted">{f.label}</dt>
                    <dd className="whitespace-pre-wrap break-words [overflow-wrap:anywhere]">
                      {displayAnswer(values[f.id])}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}
        {current.notice && (
          <p className="rounded-lg border border-border bg-surface-2 p-4 text-sm leading-relaxed">
            {current.notice}
          </p>
        )}
        {current.fields.map(fieldView)}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
        />
        {step === lastStep && <Captcha key={captchaAttempt} />}
        {failure && (
          <p role="alert" className="break-words text-sm text-accent">
            {failure}{" "}
            <a className="underline" href="mailto:vfranca.dev@gmail.com">
              vfranca.dev@gmail.com
            </a>
          </p>
        )}
        <div className="flex flex-wrap justify-between gap-3 border-t border-border pt-5">
          <button
            type="button"
            disabled={step === 0}
            onClick={() => navigate(step - 1)}
            className={buttonClass}
          >
            Voltar
          </button>
          <button
            type="submit"
            className={`${buttonClass} border-accent bg-accent text-accent-fg`}
          >
            {pending
              ? "Enviando..."
              : step === lastStep
                ? "Enviar briefing"
                : "Continuar"}
          </button>
        </div>
      </fieldset>
    </form>
  );
}
