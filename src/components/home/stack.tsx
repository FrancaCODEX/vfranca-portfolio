import { pick, type Locale } from "@/i18n/config";
import { stack } from "@/content/profile";
import { Section } from "../section";
import { SpotlightCard } from "../fx/spotlight-card";
import { TechIcon, techIcons } from "../fx/tech-icon";

type Props = { lang: Locale; title: string; eyebrow: string };

export function StackSection({ lang, title, eyebrow }: Props) {
  return (
    <Section id="stack" index="06" eyebrow={eyebrow} title={title}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stack.map((group) => (
          <SpotlightCard key={group.title.pt} className="p-6">
            <h3 className="font-mono text-xs uppercase tracking-wider text-muted">{pick(group.title, lang)}</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => {
                const label = typeof item === "string" ? item : pick(item, lang);
                const hasIcon = typeof item === "string" && item in techIcons;
                return (
                  <li
                    key={label}
                    className="group/item flex items-center gap-2 rounded-lg border border-border bg-surface-2/60 px-3 py-1.5 text-sm transition hover:border-accent/50"
                  >
                    {hasIcon && (
                      <TechIcon name={label} className="size-4 text-muted transition group-hover/item:text-accent" />
                    )}
                    {label}
                  </li>
                );
              })}
            </ul>
          </SpotlightCard>
        ))}
      </div>
    </Section>
  );
}
