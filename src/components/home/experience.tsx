import { pick, type Locale } from "@/i18n/config";
import { experiences } from "@/content/profile";
import { Section, Tag } from "../section";

export function ExperienceSection({ lang, title, current }: { lang: Locale; title: string; current: string }) {
  return (
    <Section id="experiencia" index="02" title={title}>
      <ol className="relative space-y-10 border-l border-border pl-8">
        {experiences.map((exp) => (
          <li key={`${exp.company}-${exp.start}`} className="relative">
            <span className="absolute -left-[37px] top-1.5 size-2.5 rounded-full bg-accent ring-4 ring-bg" />
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-lg font-semibold">
                {pick(exp.role, lang)} <span className="text-accent">@ {exp.company}</span>
              </h3>
              <span className="font-mono text-xs text-muted">
                {exp.start} — {exp.end ?? current}
              </span>
            </div>
            <ul className="mt-4 space-y-2 text-muted">
              {pick(exp.highlights, lang).map((h) => (
                <li key={h} className="flex gap-3">
                  <span className="mt-2.5 size-1 shrink-0 rounded-full bg-muted" />
                  {h}
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap gap-2">
              {exp.stack.map((s) => (
                <Tag key={s}>{s}</Tag>
              ))}
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
