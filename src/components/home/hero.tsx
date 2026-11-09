import { ArrowRight, FileDown, Mail } from "lucide-react";
import { pick, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { profile } from "@/content/profile";
import { ApiCard } from "../api-card";

export function Hero({ lang, dict }: { lang: Locale; dict: Dictionary["hero"] }) {
  const json = JSON.stringify(
    { stack: profile.apiCard.stack, focus: pick(profile.apiCard.focus, lang), location: profile.location },
    null,
    2,
  );

  return (
    <section className="mx-auto grid max-w-5xl items-center gap-12 px-5 pb-16 pt-16 sm:pt-24 lg:grid-cols-[1.1fr_1fr]">
      <div>
        {profile.available && (
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs text-muted">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            {dict.available}
          </p>
        )}
        <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">{profile.name}</h1>
        <p className="mt-2 text-xl font-medium text-accent sm:text-2xl">{pick(profile.role, lang)}</p>
        <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">{pick(profile.tagline, lang)}</p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#projetos"
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-accent-fg transition hover:opacity-90"
          >
            {dict.viewProjects} <ArrowRight className="size-4" />
          </a>
          <a
            href={profile.cv}
            target="_blank"
            className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-medium transition hover:border-accent hover:text-accent"
          >
            <FileDown className="size-4" /> {dict.downloadCv}
          </a>
          <a
            href="#contato"
            className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium text-muted transition hover:text-fg"
          >
            <Mail className="size-4" /> {dict.contact}
          </a>
        </div>
      </div>

      <ApiCard json={json} />
    </section>
  );
}
