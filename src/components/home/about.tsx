import Image from "next/image";
import { pick, type Locale } from "@/i18n/config";
import { profile } from "@/content/profile";
import { Section } from "../section";

export function About({ lang, title }: { lang: Locale; title: string }) {
  return (
    <Section id="sobre" index="01" title={title}>
      <div className="grid gap-10 md:grid-cols-[1fr_auto]">
        <div className="space-y-4 text-base leading-relaxed text-muted sm:text-lg">
          {pick(profile.about, lang).map((p) => (
            <p key={p}>{p}</p>
          ))}
          <ul className="flex flex-wrap gap-x-6 gap-y-2 pt-2 font-mono text-sm">
            {profile.languages.map((l) => (
              <li key={l.name.pt}>
                <span className="text-fg">{pick(l.name, lang)}</span> <span className="text-muted">— {pick(l.level, lang)}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="mx-auto md:mx-0">
          <Image
            src={profile.photo}
            alt={profile.fullName}
            width={224}
            height={224}
            className="size-48 rounded-2xl border border-border object-cover sm:size-56"
          />
        </div>
      </div>
    </Section>
  );
}
