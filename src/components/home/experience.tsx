import { Check } from "lucide-react";
import { pick, type Locale } from "@/i18n/config";
import { experiences } from "@/content/profile";
import { Section, Tag } from "../section";
import { SpotlightCard } from "../fx/spotlight-card";
import { TimelineLine } from "../fx/timeline-line";

type Props = { lang: Locale; title: string; eyebrow: string; current: string };

export function ExperienceSection({ lang, title, eyebrow, current }: Props) {
  return (
    <Section id="experiencia" index="02" eyebrow={eyebrow} title={title}>
      <TimelineLine>
        <ol className="space-y-10">
          {experiences.map((exp) => (
            <li key={`${exp.company}-${exp.start}`} className="relative">
              <span className="absolute -left-[34px] top-7 grid size-5 place-items-center rounded-full border border-accent bg-bg sm:-left-[45px]">
                <span className="size-2 rounded-full bg-accent shadow-[0_0_10px_var(--accent)]" />
              </span>
              <SpotlightCard className="p-6 sm:p-8">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-semibold">{exp.company}</h3>
                    <p className="text-accent">{pick(exp.role, lang)}</p>
                  </div>
                  <span className="rounded-full border border-border bg-surface-2 px-3 py-1 font-mono text-xs text-muted">
                    {exp.start} – {exp.end ?? current}
                  </span>
                </div>
                <ul className="mt-6 grid gap-3 text-sm text-muted sm:grid-cols-2">
                  {pick(exp.highlights, lang).map((h) => (
                    <li key={h} className="flex gap-3">
                      <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                      {h}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap gap-2">
                  {exp.stack.map((s) => (
                    <Tag key={s}>{s}</Tag>
                  ))}
                </div>
              </SpotlightCard>
            </li>
          ))}
        </ol>
      </TimelineLine>
    </Section>
  );
}
