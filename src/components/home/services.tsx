import { ArrowRight, Blocks, Plug, ServerCog } from "lucide-react";
import { pick, type Locale } from "@/i18n/config";
import { services } from "@/content/profile";
import { Section } from "../section";
import { SpotlightCard } from "../fx/spotlight-card";

const icons = { api: ServerCog, integration: Plug, system: Blocks } as const;

type Props = { lang: Locale; title: string; eyebrow: string; cta: string };

export function ServicesSection({ lang, title, eyebrow, cta }: Props) {
  return (
    <Section id="servicos" index="05" eyebrow={eyebrow} title={title}>
      <div className="grid gap-4 md:grid-cols-3">
        {services.map((s, i) => {
          const Icon = icons[s.icon];
          return (
            <SpotlightCard key={s.icon} className="group relative overflow-hidden p-7">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-2 -top-6 font-mono text-8xl font-bold text-fg/[0.04] transition group-hover:text-accent/10"
              >
                0{i + 1}
              </span>
              <span className="grid size-12 place-items-center rounded-xl border border-accent/30 bg-accent-soft shadow-[0_0_30px_-10px_var(--accent)]">
                <Icon className="size-6 text-accent" />
              </span>
              <h3 className="mt-6 text-lg font-semibold">{pick(s.title, lang)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{pick(s.description, lang)}</p>
            </SpotlightCard>
          );
        })}
      </div>
      <a
        href="#contato-freela"
        className="group mt-10 inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-accent-fg shadow-[0_0_40px_-8px_var(--accent)] transition hover:shadow-[0_0_60px_-6px_var(--accent)]"
      >
        {cta} <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
      </a>
    </Section>
  );
}
