import { pick, type Locale } from "@/i18n/config";
import { stack } from "@/content/profile";
import { Section } from "../section";

export function StackSection({ lang, title }: { lang: Locale; title: string }) {
  return (
    <Section id="stack" index="06" title={title}>
      <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {stack.map((group) => (
          <div key={group.title.pt}>
            <h3 className="font-mono text-xs uppercase tracking-wider text-muted">{pick(group.title, lang)}</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {group.items.map((item) => {
                const label = typeof item === "string" ? item : pick(item, lang);
                return (
                  <li key={label} className="rounded-lg border border-border bg-surface px-3 py-1.5 text-sm">
                    {label}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
