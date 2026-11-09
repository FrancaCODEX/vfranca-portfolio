import { ArrowRight, Blocks, Plug, ServerCog } from "lucide-react";
import { pick, type Locale } from "@/i18n/config";
import { services } from "@/content/profile";
import { Section } from "../section";

const icons = { api: ServerCog, integration: Plug, system: Blocks } as const;

export function ServicesSection({ lang, title, cta }: { lang: Locale; title: string; cta: string }) {
  return (
    <Section id="servicos" index="05" title={title}>
      <div className="grid gap-4 md:grid-cols-3">
        {services.map((s) => {
          const Icon = icons[s.icon];
          return (
            <article key={s.icon} className="rounded-xl border border-border bg-surface p-6">
              <Icon className="size-6 text-accent" />
              <h3 className="mt-4 font-semibold">{pick(s.title, lang)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{pick(s.description, lang)}</p>
            </article>
          );
        })}
      </div>
      <a
        href="#contato-freela"
        className="mt-8 inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-accent-fg transition hover:opacity-90"
      >
        {cta} <ArrowRight className="size-4" />
      </a>
    </Section>
  );
}
